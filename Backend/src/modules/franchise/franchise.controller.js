import { FranchiseService } from "./franchise.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import { createFranchiseSchema, updateFranchiseSchema } from "./franchise.validator.js";

/**
 * Create a new franchise and its owner account (Super Admin only)
 */
export const createFranchise = asyncHandler(async (req, res) => {
  const data = createFranchiseSchema.parse(req.body);
  const franchise = await FranchiseService.createFranchise(data, req.user._id);
  return res.status(201).json(new ApiResponse(201, franchise, "Franchise and Owner account created successfully"));
});

/**
 * Get all franchises with pagination
 */
export const getAllFranchises = asyncHandler(async (req, res) => {
  const franchises = await FranchiseService.getAllFranchises(req.query, req.user);
  return res.status(200).json(new ApiResponse(200, franchises, "Franchises fetched successfully"));
});

/**
 * Update franchise details
 */
export const updateFranchise = asyncHandler(async (req, res) => {
  const data = updateFranchiseSchema.parse(req.body);
  const franchise = await FranchiseService.updateFranchise(req.params.id, data, req.user, req.file);
  return res.status(200).json(new ApiResponse(200, franchise, "Franchise updated successfully"));
});

/**
 * Update franchise status (Super Admin only)
 */
export const updateFranchiseStatus = asyncHandler(async (req, res) => {
  const franchise = await FranchiseService.updateFranchiseStatus(req.params.id, req.body.status);
  return res.status(200).json(new ApiResponse(200, franchise, `Franchise status updated to ${franchise.status}`));
});

/**
 * Get franchise stats
 */
export const getFranchiseStats = asyncHandler(async (req, res) => {
  const stats = await FranchiseService.getFranchiseStats(req.params.id);
  return res.status(200).json(new ApiResponse(200, stats, "Franchise stats fetched successfully"));
});
