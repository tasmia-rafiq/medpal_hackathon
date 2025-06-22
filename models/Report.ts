import mongoose, { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  formattedText: {
    type: Schema.Types.Mixed,
  },
  image: {
    type: String, // base64
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;
