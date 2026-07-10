import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema(
  {
    title: String,
    imageUrl: String,
    category: String,
  },
  { timestamps: true }
);

export const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
