import mongoose, { Schema } from "mongoose";
import { generatePrefixedId } from "../../shared/utils/generator.utils.js";

const certificateSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
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
    certificateNo: {
      type: String,
      unique: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    qrCode: {
      type: String, // Verification URL or Base64
    },
    file: {
      url: String,
      public_id: String,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to generate certificate number (SSA/CERT/YYYY/XXXXX) via the
 * atomic Counter collection (avoids the race condition of a
 * countDocuments()-based read-then-write, and guarantees the number is
 * final before any QR code is generated against it).
 */
certificateSchema.pre("save", async function (next) {
  if (!this.certificateNo) {
    const year = new Date().getFullYear();
    const sequence = await generatePrefixedId(`certificate-${year}`);
    this.certificateNo = `SSA/CERT/${year}/${sequence}`;
  }
  next();
});

export const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
