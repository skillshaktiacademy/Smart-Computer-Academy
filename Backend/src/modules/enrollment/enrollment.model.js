import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const enrollmentSchema = new Schema(
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
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
      index: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    expectedCompletionDate: {
      type: Date,
    },
    totalFee: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    feeStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },
    appliedCoupon: {
      couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
      code: String,
      discountAmount: Number,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to update fee status based on paid amount
 */
enrollmentSchema.pre("save", function (next) {
  if (this.paidAmount >= this.totalFee) {
    this.feeStatus = "paid";
  } else if (this.paidAmount > 0) {
    this.feeStatus = "partial";
  } else {
    this.feeStatus = "pending";
  }
  next();
});

// Speeds up enrollStudent's "already actively enrolled" duplicate check.
enrollmentSchema.index({ studentId: 1, courseId: 1, status: 1 });

enrollmentSchema.plugin(mongooseAggregatePaginate);

export const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
