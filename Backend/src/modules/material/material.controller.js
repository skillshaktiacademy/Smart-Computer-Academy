import { StudyMaterial } from "./studyMaterial.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../config/cloudinary.js";

/**
 * Upload study material
 */
export const uploadMaterial = asyncHandler(async (req, res) => {
  const { title, description, courseId, fileType } = req.body;

  if (!req.file) {
    throw new ApiError(400, "File is required");
  }

  const uploadedFile = await uploadOnCloudinary(req.file.path);
  if (!uploadedFile) {
    throw new ApiError(400, "Error uploading file to Cloudinary");
  }

  const material = await StudyMaterial.create({
    title,
    description,
    courseId,
    file: { url: uploadedFile.url, public_id: uploadedFile.public_id },
    fileType,
    franchiseId: req.user.franchiseId,
  });

  return res.status(201).json(new ApiResponse(201, material, "Study material uploaded successfully"));
});

/**
 * Get study material for a course
 */
export const getCourseMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const materials = await StudyMaterial.find({ courseId }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, materials, "Study materials fetched"));
});
