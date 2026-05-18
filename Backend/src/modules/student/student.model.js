import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
 * Pre-save hook to generate enrollment number (SSA-YYYY-XXXXX)
 */
studentSchema.pre("save", async function (next) {
  if (!this.enrollmentNo) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Student").countDocuments();
    const sequence = (count + 1).toString().padStart(5, "0");
    this.enrollmentNo = `SSA-${year}-${sequence}`;
  }
  next();
});

studentSchema.plugin(mongooseAggregatePaginate);

export const Student = mongoose.model("Student", studentSchema);
