import { Counter } from "../models/counter.model.js";

/**
 * Generates a 6-digit numeric OTP
 * @returns {string}
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Atomically increments and returns the next sequence number for a given
 * counter key (e.g. "student-2026", "certificate-2026", "franchise"),
 * zero-padded. Uses findByIdAndUpdate($inc) so concurrent callers can never
 * receive the same sequence number.
 * @param {string} key
 * @param {{pad?: number}} [options]
 * @returns {Promise<string>} zero-padded sequence, e.g. "00042"
 */
export async function generatePrefixedId(key, { pad = 5 } = {}) {
  const doc = await Counter.findByIdAndUpdate(
    key,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return doc.seq.toString().padStart(pad, "0");
}
