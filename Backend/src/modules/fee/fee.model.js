import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online", "check"],
      default: "cash",
    },
    transactionId: String,
    receiptNumber: {
      type: String,
      unique: true,
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);
