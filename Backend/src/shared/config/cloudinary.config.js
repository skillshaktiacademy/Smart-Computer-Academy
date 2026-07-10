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

/** Every upload lands under this root, then a media-type subfolder (see resolveMediaType). */
const ROOT_FOLDER = "smart_computer_academy";

/**
 * Maps a file's mimetype to the Cloudinary resource_type it must be uploaded
 * as, and the top-level media folder it belongs in — so images, videos,
 * audio, and documents (PDFs etc.) never land in the same folder. Cloudinary
 * has no separate "audio" resource_type; audio files are uploaded as
 * resource_type "video" (its transcoding pipeline handles both) but still
 * get their own "audio" folder for organization.
 * @param {string} [mimetype]
 * @returns {{resourceType: string, mediaFolder: string}}
 */
export function resolveMediaType(mimetype = "") {
  if (mimetype.startsWith("image/")) return { resourceType: "image", mediaFolder: "images" };
  if (mimetype.startsWith("video/")) return { resourceType: "video", mediaFolder: "videos" };
  if (mimetype.startsWith("audio/")) return { resourceType: "video", mediaFolder: "audio" };
  return { resourceType: "raw", mediaFolder: "documents" };
}

/**
 * Uploads a local file to Cloudinary and deletes the local file after upload.
 * @param {string} localFilePath
 * @param {{resourceType?: string, folder?: string}} [options] - folder is a
 *   sub-path under ROOT_FOLDER, e.g. "images/students" or "documents/certificates".
 * @returns {Promise<object|null>}
 */
const uploadOnCloudinary = async (localFilePath, options = {}) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: options.resourceType || "auto",
      folder: `${ROOT_FOLDER}/${options.folder || "misc"}`,
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
 * @param {{resourceType?: string, folder?: string}} [options] - folder is a
 *   sub-path under ROOT_FOLDER, e.g. "documents/certificates".
 * @returns {Promise<object|null>}
 */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resourceType || "auto",
        folder: `${ROOT_FOLDER}/${options.folder || "misc"}`,
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
