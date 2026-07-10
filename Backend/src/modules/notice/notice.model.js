import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    targetRoles: {
      type: [String],
      enum: ["franchise_owner", "teacher", "student", "all"],
      default: ["all"],
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      default: null, // null means global notice from super_admin
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
