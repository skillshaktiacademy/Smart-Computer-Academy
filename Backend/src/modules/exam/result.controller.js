import { ResultService } from "./result.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Submit results for multiple students (Teacher)
 */
export const submitResults = asyncHandler(async (req, res) => {
  const results = await ResultService.submitResults(req.body);
  return res.status(200).json(new ApiResponse(200, results, "Results submitted successfully"));
});

/**
 * Get results for a student
 */
export const getStudentResults = asyncHandler(async (req, res) => {
  const results = await ResultService.getStudentResults(req.params.id, req.user);
  return res.status(200).json(new ApiResponse(200, results, "Student results fetched"));
});

/**
 * Self-service: results for the logged-in student
 */
export const getMyResults = asyncHandler(async (req, res) => {
  const results = await ResultService.getMyResults(req.user._id);
  return res.status(200).json(new ApiResponse(200, results, "My results fetched"));
});

/**
 * Get all results for an exam
 */
export const getExamResults = asyncHandler(async (req, res) => {
  const results = await ResultService.getExamResults(req.params.examId);
  return res.status(200).json(new ApiResponse(200, results, "Exam results fetched"));
});
