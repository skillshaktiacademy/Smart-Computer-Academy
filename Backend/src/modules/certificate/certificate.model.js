import mongoose, { Schema } from "mongoose";

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
 * Pre-save hook to generate certificate number (SSA/CERT/YYYY/XXXXX)
 */
certificateSchema.pre("save", async function (next) {
  if (!this.certificateNo) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Certificate").countDocuments();
    const sequence = (count + 1).toString().padStart(5, "0");
    this.certificateNo = `SSA/CERT/${year}/${sequence}`;
  }
  next();
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
