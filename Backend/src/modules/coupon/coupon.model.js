import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: { values: ["percentage", "flat"], message: "{VALUE} is not a valid coupon type" },
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    maxUses: {
      type: Number,
      default: null, // null = unlimited
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    validFrom: Date,
    validTo: Date,
    applicableCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // empty = all courses
    applicableFranchises: [{ type: Schema.Types.ObjectId, ref: "Franchise" }], // empty = all franchises
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
