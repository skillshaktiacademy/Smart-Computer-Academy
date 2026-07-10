import { FeeService } from "./fee.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Record a fee payment
 */
export const collectFee = asyncHandler(async (req, res) => {
  const fee = await FeeService.collectFee(req.body);
  return res.status(201).json(new ApiResponse(201, fee, "Fee payment recorded successfully"));
});

/**
 * Get fee history for a student
 */
export const getFeeHistory = asyncHandler(async (req, res) => {
  const history = await FeeService.getFeeHistory(req.params.studentId);
  return res.status(200).json(new ApiResponse(200, history, "Fee history fetched"));
});

/**
 * Self-service: fee payment history for the logged-in student
 */
export const getMyFeeHistory = asyncHandler(async (req, res) => {
  const history = await FeeService.getMyFeeHistory(req.user._id);
  return res.status(200).json(new ApiResponse(200, history, "My fee history fetched"));
});

/**
 * Get all fees (Franchise or Super Admin)
 */
export const getAllFees = asyncHandler(async (req, res) => {
  const fees = await FeeService.getAllFees(req.user);
  return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
});
