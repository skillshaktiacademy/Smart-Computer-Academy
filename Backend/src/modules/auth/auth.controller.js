import { User } from "../user/user.model.js";
import { OTP } from "./otp.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateOTP } from "../../utils/otpGenerator.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { otpTemplate, resetPasswordTemplate } from "../../utils/emailTemplates.js";
import { generateAccessAndRefreshTokens } from "../../utils/generateTokens.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../../config/cloudinary.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

/**
 * Register a new user and send OTP
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, franchiseId } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or phone already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role || "student",
    franchiseId: franchiseId || null,
  });

  const otpValue = generateOTP();
  await OTP.create({
    userId: user._id,
    otp: otpValue,
    type: "email_verify",
  });

  await sendEmail({
    email: user.email,
    subject: "Verify your email - Skill Shakti Academy",
    html: otpTemplate(otpValue, user.name),
  });

  return res.status(201).json(
    new ApiResponse(201, { userId: user._id }, "Registration successful. Please verify your email with the OTP sent.")
  );
});

/**
 * Verify OTP and activate user
 */
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otpRecord = await OTP.findOne({
    userId: user._id,
    otp,
    type: "email_verify",
    isUsed: false,
  });

  if (!otpRecord) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  otpRecord.isUsed = true;
  await otpRecord.save();

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(
      new ApiResponse(200, { user, accessToken, refreshToken }, "Email verified successfully")
    );
});

/**
 * Resend verification OTP
 */
const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  // Invalidate old OTPs
  await OTP.deleteMany({ userId: user._id, type: "email_verify" });

  const otpValue = generateOTP();
  await OTP.create({
    userId: user._id,
    otp: otpValue,
    type: "email_verify",
  });

  await sendEmail({
    email: user.email,
    subject: "New OTP - Skill Shakti Academy",
    html: otpTemplate(otpValue, user.name),
  });

  return res.status(200).json(new ApiResponse(200, {}, "OTP resent successfully"));
});

/**
 * Login user
 */
const login = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(403, "Please verify your email before logging in");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
    );
});

/**
 * Logout user
 */
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // remove the refresh token from the document
      },
    },
    {
      new: true,
    }
  );

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

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
      .cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json(
        new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed")
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

/**
 * Forgot password - send reset link
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const resetToken = nanoid(32);
  user.passwordResetToken = resetToken;
  user.passwordResetExpiry = Date.now() + 30 * 60 * 1000; // 30 mins
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Reset your password - Skill Shakti Academy",
    html: resetPasswordTemplate(resetUrl, user.name),
  });

  return res.status(200).json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

/**
 * Reset password using token
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  await user.save();

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
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Update profile and avatar
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  const user = await User.findById(req.user?._id);

  if (name) user.name = name;
  if (phone) user.phone = phone;

  if (req.file) {
    const avatarLocalPath = req.file.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Error while uploading avatar");
    }

    // Delete old avatar from cloudinary if exists
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    user.avatar = {
      url: avatar.url,
      public_id: avatar.public_id,
    };
  }

  await user.save();

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
