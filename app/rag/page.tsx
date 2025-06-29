// app/rag/RagPage.tsx
"use client";

import { useState } from "react";

export default function RagPage({ userId }: { userId: string }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chunksUsed, setChunksUsed] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  };
const handleAsk = async () => {
  try {
    setLoading(true);
    setAnswer("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }), // no userId
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Query failed");

    setAnswer(data.answer);
    setChunksUsed(data.chunks_used);
  } catch (err) {
    console.error("Ask error:", err);
    alert("Failed to get answer.");
  } finally {
    setLoading(false);
  }
};


  return (
    // your existing UI
    <div className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      {/* <h1>{userId}</h1> */}
      <h2 className="text-2xl font-semibold text-blue-600 text-center">
        Upload Your Medical Report PDF
      </h2>

      <div className="flex items-center gap-4">
        <label className="w-[120px] text-sm font-medium text-gray-900 bg-blue-200 px-2 py-1 rounded">
          Upload file
        </label>

        <input
          type="file"
          accept="application/pdf"
          className="cursor-pointer w-full py-1 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleUpload}
          disabled={!pdfFile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Upload PDF
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Ask a question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What is my blood sugar level?"
          className="w-full px-3 py-2 border border-gray-400 rounded-lg"
        />
        <button
          onClick={handleAsk}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading || !question}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="p-4 mt-4 border rounded-lg bg-gray-100">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Answer:</h3>
          <p className="text-gray-700 whitespace-pre-line">{answer}</p>
          <p className="text-sm text-gray-500 mt-2">Chunks used: {chunksUsed}</p>
        </div>
      )}
    </div>
  );
}
