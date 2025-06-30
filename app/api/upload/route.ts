import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/database";
import PdfReport from "@/models/PdfReport";

export const runtime = "nodejs"; // ensure Buffer API is available

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("user_id");

    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or user_id" }, { status: 400 });
    }

    // ---------- 1.  connect to Mongo ----------
    await connectToDatabase();

    // ---------- 2.  convert File -> Buffer ----------
    const arrayBuffer = await file.arrayBuffer();   // ⬅️ Web API
    const buffer = Buffer.from(arrayBuffer);

    // ---------- 3.  save PDF ----------
    const pdf = await PdfReport.create({
      userId,
      filename: file.name,
      mimetype: file.type,
      size: file.size,
      data: buffer,
    });

    // Rebuild FormData to send to FastAPI
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("user_id", userId.toString());

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: uploadFormData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Upload to FastAPI failed");
    }

    // return NextResponse.json(data);
    return NextResponse.json({
      success: true,
      pdfId: pdf._id.toString(),
      message: "PDF stored in MongoDB",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
