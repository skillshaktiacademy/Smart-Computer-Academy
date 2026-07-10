import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { generatePrefixedId } from "../../shared/utils/generator.utils.js";

const franchiseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Franchise name is required"],
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
    },
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    logo: {
      url: String,
      public_id: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    affiliationCertificateNo: {
      type: String,
    },
    isHeadBranch: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to generate a unique franchise code via the atomic
 * Counter collection (avoids the race condition of a countDocuments() read).
 */
franchiseSchema.pre("save", async function () {
  if (!this.code) {
    const seq = await generatePrefixedId("franchise", { pad: 4 });
    this.code = `SSA-F-${seq}`;
  }
});

franchiseSchema.plugin(mongooseAggregatePaginate);

export const Franchise = mongoose.models.Franchise || mongoose.model("Franchise", franchiseSchema);
