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
import { verifyJWT } from "../../shared/middlewares/auth.middleware.js";
import { upload, resizeAvatar } from "../../shared/middlewares/upload.middleware.js";
import {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} from "../../shared/middlewares/rateLimiter.middleware.js";

const router = Router();

// Public routes (validation now happens inside each controller via Zod schema.parse)
router.post("/register", registerLimiter, register);
router.post("/verify", verifyEmail);
router.post("/resend", resendOtp);
router.post("/login", loginLimiter, login);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.post("/logout", verifyJWT, logout);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get("/me", verifyJWT, getCurrentUser); // Alias for current-user
router.post("/change-password", verifyJWT, changePassword);
router.patch(
  "/update-profile",
  verifyJWT,
  upload.single("avatar"),
  resizeAvatar,
  updateProfile
);

export default router;
