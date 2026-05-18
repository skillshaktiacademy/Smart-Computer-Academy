import mongoose, { Schema } from "mongoose";

const studyMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    file: {
      url: {
        type: String,
        required: true,
      },
      public_id: String,
    },
    fileType: {
      type: String, // e.g., "pdf", "video", "image"
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
