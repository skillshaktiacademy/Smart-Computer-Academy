import mongoose, { Schema } from "mongoose";

/**
 * Generic atomic sequence counter used to mint human-readable IDs
 * (enrollment numbers, certificate numbers, franchise codes, etc.)
 * without the race conditions of a countDocuments()-based approach.
 */
const counterSchema = new Schema({
  _id: { type: String, required: true }, // e.g. "student-2026", "certificate-2026", "franchise"
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
