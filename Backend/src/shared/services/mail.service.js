import transporter from "../config/email.config.js";
import logger from "../utils/logger.js";
import { ApiError } from "../utils/api.utils.js";

const ACADEMY_NAME = "Smart Computer Academy";

/**
 * HTML Template for OTP Verification
 * @param {string} otp
 * @param {string} name
 * @returns {string}
 */
const otpTemplate = (otp, name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4a90e2; text-align: center;">${ACADEMY_NAME}</h2>
  <hr style="border: 0; border-top: 1px solid #eeeeee;" />
  <p>Hello ${name},</p>
  <p>Thank you for choosing ${ACADEMY_NAME}. Use the following OTP to verify your email address:</p>
  <div style="text-align: center; margin: 30px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 5px; border: 1px dashed #4a90e2;">${otp}</span>
  </div>
  <p style="color: #ff4d4d; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
  <p>If you didn't request this, please ignore this email.</p>
  <hr style="border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;" />
  <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} ${ACADEMY_NAME}. All rights reserved.</p>
</div>
`;

/**
 * HTML Template for Password Reset
 * @param {string} resetUrl
 * @param {string} name
 * @returns {string}
 */
const resetPasswordTemplate = (resetUrl, name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4a90e2; text-align: center;">${ACADEMY_NAME}</h2>
  <hr style="border: 0; border-top: 1px solid #eeeeee;" />
  <p>Hello ${name},</p>
  <p>We received a request to reset your password. Click the button below to proceed:</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${resetUrl}" style="background-color: #4a90e2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
  </div>
  <p>If the button doesn't work, copy and paste this link into your browser:</p>
  <p style="word-break: break-all; color: #4a90e2;">${resetUrl}</p>
  <p style="color: #ff4d4d; font-size: 14px;">This link is valid for a limited time. If you didn't request this, you can safely ignore this email.</p>
  <hr style="border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;" />
  <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} ${ACADEMY_NAME}. All rights reserved.</p>
</div>
`;

/**
 * HTML template for delivering newly-created student login credentials
 * after a franchise admits them (see student.service.js addStudent).
 */
const studentCredentialsTemplate = (name, loginId, tempPassword) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4a90e2; text-align: center;">${ACADEMY_NAME}</h2>
  <hr style="border: 0; border-top: 1px solid #eeeeee;" />
  <p>Hello ${name},</p>
  <p>Welcome to ${ACADEMY_NAME}! Your student portal account has been created. Use the credentials below to log in:</p>
  <div style="text-align: center; margin: 30px 0; background: #f4f4f4; padding: 15px; border-radius: 5px;">
    <p style="margin: 5px 0;"><strong>Login ID:</strong> ${loginId}</p>
    <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
  </div>
  <p style="color: #ff4d4d; font-size: 14px;">Please log in and change your password as soon as possible.</p>
  <hr style="border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;" />
  <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} ${ACADEMY_NAME}. All rights reserved.</p>
</div>
`;

/**
 * Sends an HTML email.
 * @param {object} options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body (HTML)
 */
export class MailService {
  static async send({ email, subject, html }) {
    try {
      const mailOptions = {
        from: `${ACADEMY_NAME} <${process.env.EMAIL_FROM}>`,
        to: email,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error("Email send failed", error);
      throw new ApiError(500, "Email could not be sent");
    }
  }

  static async sendOtpEmail(email, name, otp) {
    return MailService.send({
      email,
      subject: `Verify your email - ${ACADEMY_NAME}`,
      html: otpTemplate(otp, name),
    });
  }

  static async sendResetPasswordEmail(email, name, resetUrl) {
    return MailService.send({
      email,
      subject: `Reset your password - ${ACADEMY_NAME}`,
      html: resetPasswordTemplate(resetUrl, name),
    });
  }

  static async sendStudentCredentialsEmail(email, name, loginId, tempPassword) {
    return MailService.send({
      email,
      subject: `Your ${ACADEMY_NAME} student login`,
      html: studentCredentialsTemplate(name, loginId, tempPassword),
    });
  }
}

export { otpTemplate, resetPasswordTemplate, studentCredentialsTemplate };
