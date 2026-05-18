import { Router } from "express";
import {
  register,
  verifyEmail,
  resendOtp,
  login,
  logout,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  changePassword,
  updateProfile,
} from "./auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload, resizeAvatar } from "../../middlewares/upload.middleware.js";
import {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} from "../../middlewares/rateLimiter.middleware.js";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "./auth.validator.js";
import { ApiError } from "../../utils/ApiError.js";

const router = Router();

/**
 * Middleware to validate request body using Zod schema
 * @param {import("zod").ZodSchema} schema 
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors?.map((err) => err.message).join(", ") || error.message;
    next(new ApiError(400, errorMessage));
  }
};

// Public routes
router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/verify", validate(verifyOtpSchema), verifyEmail);
router.post("/resend", resendOtp);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPasswordLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);

// Protected routes
router.post("/logout", verifyJWT, logout);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get("/me", verifyJWT, getCurrentUser); // Alias for current-user
router.post("/change-password", verifyJWT, validate(changePasswordSchema), changePassword);
router.patch(
  "/update-profile",
  verifyJWT,
  upload.single("avatar"),
  resizeAvatar,
  validate(updateProfileSchema),
  updateProfile
);

export default router;
