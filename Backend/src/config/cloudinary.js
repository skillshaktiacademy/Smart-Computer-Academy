import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import logger from "./logger.js";

/**
 * Configure Cloudinary with environment variables
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local file to Cloudinary and deletes the local file after upload
 * @param {string} localFilePath 
 * @returns {Promise<object|null>}
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "skill_shakti_academy",
    });

    // File has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Remove the locally saved temporary file as the upload operation failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    logger.error("Cloudinary upload failed", error);
    return null;
  }
};

/**
 * Deletes a file from Cloudinary using its public ID
 * @param {string} publicId 
 * @returns {Promise<object|null>}
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    logger.error("Cloudinary deletion failed", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
