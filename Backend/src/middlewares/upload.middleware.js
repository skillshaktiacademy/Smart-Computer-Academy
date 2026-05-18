import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { ApiError } from "../utils/ApiError.js";

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

export { upload };
