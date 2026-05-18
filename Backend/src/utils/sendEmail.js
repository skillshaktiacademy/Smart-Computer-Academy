import transporter from "../config/email.js";
import logger from "../config/logger.js";
import { ApiError } from "./ApiError.js";

/**
 * Helper function to send HTML emails
 * @param {object} options 
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body (HTML)
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `Skill Shakti Academy <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error("Email send failed", error);
    throw new ApiError(500, "Email could not be sent");
  }
};

export { sendEmail };
