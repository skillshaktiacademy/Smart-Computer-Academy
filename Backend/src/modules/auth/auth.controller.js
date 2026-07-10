import {
  AuthService,
  cookieOptions,
  ACCESS_COOKIE_MAX_AGE,
  REFRESH_COOKIE_MAX_AGE,
} from "./auth.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "./auth.validator.js";

const setAuthCookies = (res, accessToken, refreshToken) =>
  res
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: ACCESS_COOKIE_MAX_AGE })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: REFRESH_COOKIE_MAX_AGE });

/**
 * Register a new user and send OTP
 */
const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const result = await AuthService.register(data);
  return res
    .status(201)
    .json(new ApiResponse(201, result, "Registration successful. Please verify your email with the OTP sent."));
});

/**
 * Verify OTP and activate user
 */
const verifyEmail = asyncHandler(async (req, res) => {
  const data = verifyOtpSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await AuthService.verifyEmail(data);
  return setAuthCookies(res.status(200), accessToken, refreshToken).json(
    new ApiResponse(200, { user, accessToken, refreshToken }, "Email verified successfully")
  );
});

/**
 * Resend verification OTP
 */
const resendOtp = asyncHandler(async (req, res) => {
  await AuthService.resendOtp(req.body);
  return res.status(200).json(new ApiResponse(200, {}, "OTP resent successfully"));
});

/**
 * Login user
 */
const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await AuthService.login(data);
  return setAuthCookies(res.status(200), accessToken, refreshToken).json(
    new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully")
  );
});

/**
 * Logout user
 */
const logout = asyncHandler(async (req, res) => {
  await AuthService.logout(req.user._id);
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"));
});

/**
 * Refresh access token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  const { accessToken, refreshToken } = await AuthService.refreshAccessToken(incomingRefreshToken);
  return setAuthCookies(res.status(200), accessToken, refreshToken).json(
    new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed")
  );
});

/**
 * Forgot password - send reset link
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const data = forgotPasswordSchema.parse(req.body);
  await AuthService.forgotPassword(data);
  return res.status(200).json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

/**
 * Reset password using token
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = resetPasswordSchema.parse(req.body);
  await AuthService.resetPassword(req.params.token, password);
  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

/**
 * Get current user
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

/**
 * Change password (protected)
 */
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);
  await AuthService.changePassword(req.user._id, oldPassword, newPassword);
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Update profile and avatar
 */
const updateProfile = asyncHandler(async (req, res) => {
  const data = updateProfileSchema.parse(req.body);
  const user = await AuthService.updateProfile(req.user?._id, data, req.file);
  return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});

export {
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
};
