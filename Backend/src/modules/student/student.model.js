import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { generatePrefixedId } from "../../shared/utils/generator.utils.js";

const studentSchema = new Schema(
  {
    enrollmentNo: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: String,
    motherName: String,
    dob: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: String,
    photo: {
      url: String,
      public_id: String,
    },
    aadhar: {
      type: String, // Stored masked or encrypted. Instruction says masked last 4 digits.
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
      index: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    /**
     * Links this academic profile to the student's own login account.
     * Null until a franchise admits + provisions login credentials for
     * this student (see student.service.js, Phase 4) — a self-registered
     * `student`-role User with no Student record yet is a valid, empty state.
     * Indexed since every "my-X" self-service endpoint resolves via this
     * field on the logged-in student's every dashboard page load.
     */
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
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

/**
 * Pre-save hook to generate enrollment number (SSA-YYYY-XXXXX) via the
 * atomic Counter collection (avoids the race condition of a
 * countDocuments()-based read-then-write).
 */
studentSchema.pre("save", async function (next) {
  if (!this.enrollmentNo) {
    const year = new Date().getFullYear();
    const sequence = await generatePrefixedId(`student-${year}`);
    this.enrollmentNo = `SSA-${year}-${sequence}`;
  }
  next();
});

studentSchema.plugin(mongooseAggregatePaginate);

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
