import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: String,
    role: String,
    content: String,
    avatar: String,
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
