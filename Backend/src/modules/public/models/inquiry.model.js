import mongoose, { Schema } from "mongoose";

const inquirySchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
