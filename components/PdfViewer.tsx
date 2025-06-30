"use client";
import { useEffect, useState } from "react";

const PdfViewer = ({ reportId }: { reportId: any }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const res = await fetch(`/api/pdf/${reportId}`);
      if (res.ok) {
        const blob = await res.blob();
        setPdfUrl(URL.createObjectURL(blob));
        console.log("PDF fetched successfully");
      } else {
        console.error("Failed to fetch PDF");
      }
    };
    fetchPdf();
  }, []);
  return (
    <div className="mt-4">
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px"></iframe>}
    </div>
  );
};

export default PdfViewer;
