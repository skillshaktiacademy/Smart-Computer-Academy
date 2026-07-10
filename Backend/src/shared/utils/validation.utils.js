import mongoose from "mongoose";
import { ApiError } from "./api.utils.js";

/**
 * Throws ApiError(400) if value (or any value in an array) is not a valid
 * Mongo ObjectId.
 * @param {string|string[]} value
 * @param {string} [fieldName]
 */
export function validateObjectId(value, fieldName = "id") {
  const values = Array.isArray(value) ? value : [value];
  for (const v of values) {
    if (!v || !mongoose.Types.ObjectId.isValid(v)) {
      throw new ApiError(400, `Invalid ${fieldName}`);
    }
  }
}

/**
 * Indian 10-digit mobile number check (optionally prefixed with +91/91/0).
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(String(phone || "").trim());
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

/**
 * user@example.com -> u***@example.com
 */
export function maskEmail(email) {
  if (!email || !email.includes("@")) return email;
  const [local, domain] = email.split("@");
  const masked = local.length <= 1 ? "*" : `${local[0]}${"*".repeat(local.length - 1)}`;
  return `${masked}@${domain}`;
}

/**
 * 9876543210 -> ******3210
 */
export function maskPhone(phone) {
  const s = String(phone || "");
  if (s.length <= 4) return s;
  return "*".repeat(s.length - 4) + s.slice(-4);
}
