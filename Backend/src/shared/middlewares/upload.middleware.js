import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { ApiError } from "../utils/api.utils.js";

// Ensure temporary directory exists
const tempDir = "public/temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/**
 * Study materials (unlike avatars/photos/logos/thumbnails) are explicitly
 * modeled as pdf/video/image per StudyMaterial.fileType — the shared `upload`
 * above rejects everything but images, which silently blocked teachers from
 * ever uploading a PDF or video material. This filter allows the actual
 * media types the feature is meant to support, with a size limit generous
 * enough for short lecture videos.
 */
const materialFileFilter = (req, file, cb) => {
  const allowed = /^(image|video|audio)\//.test(file.mimetype) || file.mimetype === "application/pdf";
  if (allowed) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only images, videos, audio, or PDF files are allowed"), false);
  }
};

const materialUpload = multer({
  storage,
  fileFilter: materialFileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB — accommodates short lecture videos
});

/**
 * Middleware to resize uploaded avatar to 200x200 using sharp
 */
export const resizeAvatar = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = req.file.path;
    const outputFileName = `resized-${req.file.filename}`;
    const outputPath = path.join(tempDir, outputFileName);

    await sharp(filePath)
      .resize(200, 200)
      .toFile(outputPath);

    // Delete the original file and update req.file.path to resized one
    fs.unlinkSync(filePath);
    req.file.path = outputPath;
    req.file.filename = outputFileName;

    next();
  } catch (error) {
    next(new ApiError(500, "Error processing image"));
  }
};

/** Deletes a multer temp file if it still exists (defensive cleanup on error paths). */
export const cleanupTempFile = (file) => {
  if (file?.path && fs.existsSync(file.path)) {
    try {
      fs.unlinkSync(file.path);
    } catch {
      /* ignore cleanup errors */
    }
  }
};

export const cleanupTempFiles = (files) => {
  if (!files) return;
  const list = Array.isArray(files) ? files : Object.values(files).flat();
  list.forEach(cleanupTempFile);
};

export { upload, materialUpload };
