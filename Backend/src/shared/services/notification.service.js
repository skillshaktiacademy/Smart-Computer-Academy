import twilio from "twilio";
import logger from "../utils/logger.js";
import { MailService } from "./mail.service.js";
import { Notification } from "../../modules/notification/notification.model.js";

let twilioClient = null;
let twilioInitAttempted = false;

/**
 * Lazily builds the Twilio client the first time an SMS is sent. Returns
 * null (rather than throwing) when credentials are absent so the app can
 * run locally/in dev without SMS configured — sends are logged as
 * "skipped" instead of failing the caller's request.
 */
function getTwilioClient() {
  if (twilioInitAttempted) return twilioClient;
  twilioInitAttempted = true;

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    logger.warn("Twilio credentials not configured — SMS notifications will be skipped.");
    return null;
  }

  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  return twilioClient;
}

/**
 * Central dispatch point for all outbound student/franchise notifications.
 * Every method is fire-and-forget safe: callers should invoke with
 * `.catch(err => logger.error(...))` rather than awaiting inline on a
 * critical request path, since a notification failure must never fail the
 * primary action (e.g. marking attendance, admitting a student).
 */
export class NotificationService {
  static async sendSms(to, message, { recipientType, recipientId, event }) {
    const client = getTwilioClient();
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    if (!client || !fromNumber || !to) {
      await Notification.create({
        recipientType,
        recipientId,
        channel: "sms",
        event,
        status: "skipped",
        payload: { to, message },
      });
      return { status: "skipped" };
    }

    try {
      await client.messages.create({ to: `+91${to}`.replace(/^\+91\+/, "+"), from: fromNumber, body: message });
      await Notification.create({
        recipientType,
        recipientId,
        channel: "sms",
        event,
        status: "sent",
        payload: { to, message },
      });
      return { status: "sent" };
    } catch (error) {
      logger.error(`SMS send failed for event ${event}: ${error.message}`);
      await Notification.create({
        recipientType,
        recipientId,
        channel: "sms",
        event,
        status: "failed",
        payload: { to, message },
        error: error.message,
      });
      return { status: "failed" };
    }
  }

  static async sendEmail({ email, subject, html }, { recipientType, recipientId, event }) {
    try {
      await MailService.send({ email, subject, html });
      await Notification.create({
        recipientType,
        recipientId,
        channel: "email",
        event,
        status: "sent",
        payload: { email, subject },
      });
      return { status: "sent" };
    } catch (error) {
      logger.error(`Email send failed for event ${event}: ${error.message}`);
      await Notification.create({
        recipientType,
        recipientId,
        channel: "email",
        event,
        status: "failed",
        payload: { email, subject },
        error: error.message,
      });
      return { status: "failed" };
    }
  }

  /** Student marked absent for a class. */
  static async notifyAttendanceAbsent(student, date) {
    if (!student?.phone) return;
    const dateStr = new Date(date).toLocaleDateString("en-IN");
    return NotificationService.sendSms(
      student.phone,
      `Dear ${student.name}, you were marked ABSENT on ${dateStr}. - Smart Computer Academy`,
      { recipientType: "student", recipientId: student._id, event: "attendance_absent" }
    );
  }

  /** Exam result published for a student. */
  static async notifyResultPublished(student, examTitle, grade) {
    if (!student?.email) return;
    return NotificationService.sendEmail(
      {
        email: student.email,
        subject: `Your result for ${examTitle} is out - Smart Computer Academy`,
        html: `<p>Dear ${student.name},</p><p>Your result for <b>${examTitle}</b> has been published. Grade: <b>${grade}</b>.</p><p>Log in to your student portal to view details.</p>`,
      },
      { recipientType: "student", recipientId: student._id, event: "result_published" }
    );
  }

  /** New notice posted, targeting a franchise/all students. */
  static async notifyNoticePosted(student, noticeTitle) {
    if (!student?.email) return;
    return NotificationService.sendEmail(
      {
        email: student.email,
        subject: `New notice: ${noticeTitle} - Smart Computer Academy`,
        html: `<p>Dear ${student.name},</p><p>A new notice has been posted: <b>${noticeTitle}</b>. Log in to your student portal to view it.</p>`,
      },
      { recipientType: "student", recipientId: student._id, event: "notice_posted" }
    );
  }

  /** New student admitted — deliver their portal login credentials. */
  static async notifyStudentCredentials(student, loginId, tempPassword) {
    const results = [];
    if (student.email) {
      const { studentCredentialsTemplate } = await import("./mail.service.js");
      results.push(
        await NotificationService.sendEmail(
          {
            email: student.email,
            subject: "Your Smart Computer Academy student login",
            html: studentCredentialsTemplate(student.name, loginId, tempPassword),
          },
          { recipientType: "student", recipientId: student._id, event: "student_credentials_issued" }
        )
      );
    }
    if (student.phone) {
      results.push(
        await NotificationService.sendSms(
          student.phone,
          `Welcome to Smart Computer Academy! Login ID: ${loginId}, Temp Password: ${tempPassword}`,
          { recipientType: "student", recipientId: student._id, event: "student_credentials_issued" }
        )
      );
    }
    return results;
  }
}
