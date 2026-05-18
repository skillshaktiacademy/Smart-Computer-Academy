/**
 * HTML Template for OTP Verification
 * @param {string} otp 
 * @param {string} name 
 * @returns {string}
 */
export const otpTemplate = (otp, name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4a90e2; text-align: center;">Skill Shakti Academy</h2>
  <hr style="border: 0; border-top: 1px solid #eeeeee;" />
  <p>Hello ${name},</p>
  <p>Thank you for choosing Skill Shakti Academy. Use the following OTP to verify your email address:</p>
  <div style="text-align: center; margin: 30px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 5px; border: 1px dashed #4a90e2;">${otp}</span>
  </div>
  <p style="color: #ff4d4d; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
  <p>If you didn't request this, please ignore this email.</p>
  <hr style="border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;" />
  <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Skill Shakti Academy. All rights reserved.</p>
</div>
`;

/**
 * HTML Template for Password Reset
 * @param {string} resetUrl 
 * @param {string} name 
 * @returns {string}
 */
export const resetPasswordTemplate = (resetUrl, name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4a90e2; text-align: center;">Skill Shakti Academy</h2>
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
  <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Skill Shakti Academy. All rights reserved.</p>
</div>
`;
