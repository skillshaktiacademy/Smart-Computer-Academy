import mongoose, { Schema } from "mongoose";

const inquirySchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });

const testimonialSchema = new Schema({
  name: String,
  role: String,
  content: String,
  avatar: String,
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const gallerySchema = new Schema({
  title: String,
  imageUrl: String,
  category: String,
}, { timestamps: true });

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export const Gallery = mongoose.model("Gallery", gallerySchema);
