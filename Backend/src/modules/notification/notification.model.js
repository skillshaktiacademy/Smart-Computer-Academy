import mongoose, { Schema } from "mongoose";

/**
 * Internal-only log of every notification attempt (email/SMS). No
 * controller/route on this module by design — it's invoked internally by
 * other services via NotificationService.notify(), matching the reference
 * project's "notification" module shape (model+service, no HTTP surface).
 */
const notificationSchema = new Schema(
  {
    recipientType: {
      type: String,
      enum: ["student", "franchise", "user"],
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    channel: {
      type: String,
      enum: ["sms", "email"],
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "failed", "skipped"],
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
    },
    error: {
      type: String,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
