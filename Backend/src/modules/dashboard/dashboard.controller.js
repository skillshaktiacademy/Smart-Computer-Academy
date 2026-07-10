import { DashboardService } from "./dashboard.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Get Student Dashboard Stats
 */
export const getStudentStats = asyncHandler(async (req, res) => {
  const stats = await DashboardService.getStudentStats(req.user);
  return res.status(200).json(new ApiResponse(200, stats, "Student stats fetched successfully"));
});

/**
 * Get Teacher Dashboard Stats
 */
export const getTeacherStats = asyncHandler(async (req, res) => {
  const stats = await DashboardService.getTeacherStats(req.user);
  return res.status(200).json(new ApiResponse(200, stats, "Teacher stats fetched successfully"));
});

/**
 * Get Franchise Dashboard Stats
 */
export const getFranchiseStats = asyncHandler(async (req, res) => {
  const stats = await DashboardService.getFranchiseStats(req.user);
  return res.status(200).json(new ApiResponse(200, stats, "Franchise stats fetched successfully"));
});

/**
 * Get Super Admin Stats
 */
export const getAdminStats = asyncHandler(async (req, res) => {
  const stats = await DashboardService.getAdminStats();
  return res.status(200).json(new ApiResponse(200, stats, "Admin stats fetched successfully"));
});
