import nodemailer from "nodemailer";

/**
 * Brevo's SMTP relay. The "SMTP key" shown on Brevo's SMTP & API page
 * (format `xsmtpsib-...`) is an SMTP AUTH password, not a REST API key
 * (`xkeysib-...`) — it only works via this relay, not Brevo's transactional
 * email REST endpoint. BREVO_SMTP_LOGIN defaults to FROM_EMAIL since Brevo
 * commonly uses the account's own email as the SMTP login, but this can be
 * overridden if a Brevo account's SMTP "Login" value differs.
 */
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN || process.env.FROM_EMAIL,
    pass: process.env.BREVO_API_KEY,
  },
});

export default transporter;
