import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { User } from "../user/user.model.js";
import { OTP } from "./otp.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { generateOTP } from "../../shared/utils/generator.utils.js";
import { generateAccessAndRefreshTokens } from "../../shared/utils/token.utils.js";
import { MailService } from "../../shared/services/mail.service.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../../shared/config/cloudinary.config.js";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const ACCESS_COOKIE_MAX_AGE = 15 * 60 * 1000;
const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

/**
 * All auth business logic — controllers only parse input, call these
 * methods, and shape the HTTP response (cookies/status/ApiResponse).
 */
export class AuthService {
  static async register({ name, email, phone, password, role, franchiseId }) {
    const existedUser = await User.findOne({ $or: [{ email }, { phone }] });
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
    await OTP.create({ userId: user._id, otp: otpValue, type: "email_verify" });
    await MailService.sendOtpEmail(user.email, user.name, otpValue);

    return { userId: user._id };
  }

  static async verifyEmail({ email, otp }) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    const otpRecord = await OTP.findOne({
      userId: user._id,
      otp,
      type: "email_verify",
      isUsed: false,
    });
    if (!otpRecord) throw new ApiError(400, "Invalid or expired OTP");

    otpRecord.isUsed = true;
    await otpRecord.save();

    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    return { user, accessToken, refreshToken };
  }

  static async resendOtp({ email }) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");
    if (user.isEmailVerified) throw new ApiError(400, "Email is already verified");

    await OTP.deleteMany({ userId: user._id, type: "email_verify" });

    const otpValue = generateOTP();
    await OTP.create({ userId: user._id, otp: otpValue, type: "email_verify" });
    await MailService.sendOtpEmail(user.email, user.name, otpValue);
  }

  static async login({ email, phone, password }) {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) throw new ApiError(404, "User does not exist");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    if (!user.isEmailVerified) {
      throw new ApiError(403, "Please verify your email before logging in");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return { user: loggedInUser, accessToken, refreshToken };
  }

  static async logout(userId) {
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } }, { new: true });
  }

  static async refreshAccessToken(incomingRefreshToken) {
    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

    try {
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id);
      if (!user) throw new ApiError(401, "Invalid refresh token");
      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
  }

  static async forgotPassword({ email }) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    const resetToken = nanoid(32);
    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = Date.now() + 30 * 60 * 1000; // 30 mins
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await MailService.sendResetPasswordEmail(user.email, user.name, resetUrl);
  }

  static async resetPassword(token, password) {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: Date.now() },
    });
    if (!user) throw new ApiError(400, "Invalid or expired reset token");

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

    user.password = newPassword;
    await user.save();
  }

  static async updateProfile(userId, { name, phone }, file) {
    const user = await User.findById(userId);

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (file) {
      const avatar = await uploadOnCloudinary(file.path, { folder: "images/avatars", resourceType: "image" });
      if (!avatar) throw new ApiError(400, "Error while uploading avatar");

      if (user.avatar?.public_id) {
        await deleteFromCloudinary(user.avatar.public_id);
      }
      user.avatar = { url: avatar.url, public_id: avatar.public_id };
    }

    await user.save();
    return user;
  }
}

export { ACCESS_COOKIE_MAX_AGE, REFRESH_COOKIE_MAX_AGE };
