"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OcrReader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ocrStatus, setOcrStatus] = useState<string>("");
  const [reportId, setReportId] = useState<string | null>(null);
  const [formattedText, setFormattedText] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const router = useRouter();

  // Convert file to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setOcrStatus("");
      setReportId(null);
      setFormattedText("");

      const base64 = await toBase64(file);
      setImageBase64(base64);
    }
  };

  const readImageText = async () => {
    if (!selectedImage) return;

    setOcrStatus("Processing OCR...");
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");

    try {
      const ocrRes = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: { apikey: "K81374568588957" },
        body: formData,
      });

      const ocrResult = await ocrRes.json();
      const text = ocrResult.ParsedResults?.[0]?.ParsedText || "No text found.";
      console.log("OCR SPACE Response:", text);

      setOcrStatus("Formatting report with AI...");

      // Step 2: Send text to your formatting API using TOGETHER AI
      const fmtRes = await fetch("/api/chatai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const fmtData = await fmtRes.json();
      console.log("AI Response:", fmtData);

      if (!fmtData.success) {
        setOcrStatus("AI formatting failed.");
        return;
      }

      const formatted = fmtData.formatted;
      setFormattedText(formatted);
      setOcrStatus("AI analysis completed. Ready to save.");
    } catch (err) {
      console.error(err);
      setOcrStatus("An error occurred.");
    }
  };

  const handleSaveReport = async () => {
    try {
      setOcrStatus("Saving report...");

      const sessionRes = await fetch("/api/get-session");
      const sessionData = await sessionRes.json();

      if (!sessionData?.user?.email) {
        setOcrStatus("User not authenticated");
        return;
      }

      const saveRes = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: formattedText,
          formattedText,
          image: imageBase64,
          userEmail: sessionData.user.email,
        }),
      });

      const saveResult = await saveRes.json();
      if (saveResult.success) {
        setReportId(saveResult.reportId);
        setOcrStatus("Report saved!");
      } else {
        setOcrStatus("Error saving report.");
      }
    } catch (err) {
      console.error(err);
      setOcrStatus("An error occurred while saving.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-primary text-center">
        Upload Your Medical Report Image
      </h2>

      <div className="flex items-center gap-4">
      <label className=" w-[120px] text-sm font-medium text-gray-900 bg-blue-200 px-2 py-1 rounded">Upload file</label>

      
      <input type="file" className="cursor-pointer w-[800px] py-1 text-sm text-gray-900 border border-gray-500 rounded-lg 
       bg-gray-50 dark:text-gray-400 focus:outline-none hover:bg-gray-200
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " id="file_input" onChange={handleImageChange} accept="image/*" />
      </div>
      
      
      
      <button
        onClick={readImageText}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload & Extract
      </button>

      <p>Status: {ocrStatus}</p>

      {formattedText && (
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">
            AI-Generated Insights
          </h3>

          <div
            className="space-y-6 text-justify"
            dangerouslySetInnerHTML={{
              __html: formattedText
                // Cleanly format section titles
                .replace(
                  /\*\*(Abnormal test results|Next Steps):\*\*/g,
                  (_, title) =>
                    `<h3 class='text-xl font-semibold text-gray-800 border-b pb-1 mt-6'>${title}</h3>`
                )

                // Format abnormal test values into cards
                .replace(
                  /🩺\s*([^:\n]+):\s*([^\n(]+)(?:\s*\(([^)]+)\))?/g,
                  (_, testName, value, note) => {
                    return `
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-1">
          <div class="text-md font-semibold text-gray-700">${testName.trim()}</div>
          <div class="text-sm text-gray-600"><strong>Value:</strong> ${value.trim()}</div>
          ${
            note
              ? `<div class="text-sm text-gray-600"><strong>Note:</strong> ${note.trim()}</div>`
              : ""
          }
        </div>`;
                  }
                )

                // Format Next Steps as a checklist (each bullet starting with "-")
                .replace(
                  /(?:^|\n)- ([^\n]+)/g,
                  (_, step) => `
      <div class="flex items-start gap-2 text-sm text-gray-700 mt-1">
        <span class="mt-1 text-green-600">✔️</span>
        <div>${step.trim()}</div>
      </div>`
                ),
            }}
          />

          {!reportId && (
            <button
              onClick={handleSaveReport}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Report
            </button>
          )}
        </div>
      )}

      {reportId && (
        <div className="mt-4">
          <p className="text-green-600 font-medium">
            Report saved successfully!
          </p>
          <button
            onClick={() => router.push(`/report-details/${reportId}`)}
            className="text-blue-600 underline"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default OcrReader;
