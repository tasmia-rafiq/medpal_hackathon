import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs/promises";
import { writeFileSync, createReadStream } from "fs";
import path from "path";
import FormData from "form-data";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const userId = form.get("user_id")?.toString() || "unknown";

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
  }

  try {
    // Save PDF to /tmp
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = path.join("/tmp", file.name);
    writeFileSync(tempPath, buffer);

    // Forward to FastAPI
    const formData = new FormData();
    formData.append("file", createReadStream(tempPath), file.name);
    formData.append("user_id", userId);
    console.log("📤 Uploading PDF to FastAPI backend...");


    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: formData.getHeaders(),
    });

    await fs.unlink(tempPath); // cleanup

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
