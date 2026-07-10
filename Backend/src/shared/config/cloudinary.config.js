import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import logger from "../utils/logger.js";

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
 * @param {{resourceType?: string}} [options]
 * @returns {Promise<object|null>}
 */
const uploadOnCloudinary = async (localFilePath, options = {}) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: options.resourceType || "auto",
      folder: "smart_computer_academy",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    logger.error("Cloudinary upload failed", error);
    return null;
  }
};

/**
 * Uploads an in-memory buffer to Cloudinary (no local temp file involved).
 * @param {Buffer} buffer
 * @param {{resourceType?: string, folder?: string}} [options]
 * @returns {Promise<object|null>}
 */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resourceType || "auto",
        folder: options.folder || "smart_computer_academy",
      },
      (error, result) => {
        if (error) {
          logger.error("Cloudinary buffer upload failed", error);
          return resolve(null);
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
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

export { uploadOnCloudinary, uploadBufferToCloudinary, deleteFromCloudinary };
