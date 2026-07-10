import { rateLimit } from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registration requests per hour
  message: "Too many registration attempts, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 forgot-password requests per windowMs
  message: "Too many forgot-password attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 OTP resend requests per windowMs
  message: "Too many OTP requests, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
