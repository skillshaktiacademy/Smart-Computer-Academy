import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingMarks: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

export const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
