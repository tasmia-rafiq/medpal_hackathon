import { connectToDatabase } from "@/lib/database";
import PdfReport from "@/models/PdfReport";
import { Readable } from "stream";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const pdfDoc = await PdfReport.findById(new ObjectId(params.id)).exec();
    if (!pdfDoc) return new Response("Not found", { status: 404 });

    const buf: Buffer =
      pdfDoc.data instanceof Buffer
        ? pdfDoc.data
        : Buffer.from((pdfDoc.data as any).buffer);

    // Convert Buffer to ReadableStream
    const stream = new Readable({
      read() {
        this.push(buf);
        this.push(null);
      },
    });

    return new Response(stream as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${pdfDoc.filename}"`,
        "Content-Length": buf.length.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("PDF stream error:", e);
    return new Response("Server error", { status: 500 });
  }
}
