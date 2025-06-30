import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPdfReport extends Document {
  userId: Types.ObjectId;         // Mongo _id from your User collection
  filename: string;
  mimetype: string;               // "application/pdf"
  size: number;                   // in bytes
  data: Buffer;                   // raw PDF (≤ 16 MB)
  createdAt: Date;
}

const PdfSchema = new Schema<IPdfReport>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, default: "application/pdf" },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.PdfReport ||
  mongoose.model<IPdfReport>("PdfReport", PdfSchema);
