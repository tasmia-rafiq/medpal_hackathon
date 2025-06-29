import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("user_id");

    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or user_id" }, { status: 400 });
    }

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

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
