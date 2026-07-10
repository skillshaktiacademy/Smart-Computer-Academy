import { MaterialService } from "./material.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Upload study material
 */
export const uploadMaterial = asyncHandler(async (req, res) => {
  const material = await MaterialService.uploadMaterial(req.body, req.user, req.file);
  return res.status(201).json(new ApiResponse(201, material, "Study material uploaded successfully"));
});

/**
 * Get study material for a course
 */
export const getCourseMaterial = asyncHandler(async (req, res) => {
  const materials = await MaterialService.getCourseMaterial(req.params.courseId);
  return res.status(200).json(new ApiResponse(200, materials, "Study materials fetched"));
});

/**
 * Self-service: materials for the logged-in student's enrolled courses
 */
export const getMyCourseMaterials = asyncHandler(async (req, res) => {
  const materials = await MaterialService.getMyCourseMaterials(req.user._id);
  return res.status(200).json(new ApiResponse(200, materials, "My course materials fetched"));
});

/**
 * Franchise/teacher's own center's materials
 */
export const getMyCenterMaterials = asyncHandler(async (req, res) => {
  const materials = await MaterialService.getMyCenterMaterials(req.user);
  return res.status(200).json(new ApiResponse(200, materials, "Center materials fetched"));
});
