import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["super_admin", "franchise_owner", "teacher", "student"]).optional(),
  franchiseId: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  password: z.string().min(1, "Password is required"),
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email", "phone"]
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  type: z.enum(["email_verify", "password_reset"]),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").optional(),
});
