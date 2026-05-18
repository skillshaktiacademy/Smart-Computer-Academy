import { User } from "../modules/user/user.model.js";
import { ApiError } from "./ApiError.js";

/**
 * Generates both access and refresh tokens for a user
 * @param {string} userId 
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export { generateAccessAndRefreshTokens };
