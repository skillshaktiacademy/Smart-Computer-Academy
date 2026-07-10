import { ExamService } from "./exam.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Schedule an exam (Teacher/Owner)
 */
export const scheduleExam = asyncHandler(async (req, res) => {
  const exam = await ExamService.scheduleExam(req.body, req.user);
  return res.status(201).json(new ApiResponse(201, exam, "Exam scheduled successfully"));
});

/**
 * List exams
 */
export const getExams = asyncHandler(async (req, res) => {
  const exams = await ExamService.getExams(req.query, req.user);
  return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

/**
 * Publish results (Admin/Owner)
 */
export const publishResults = asyncHandler(async (req, res) => {
  await ExamService.publishResults(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, "Results published successfully"));
});
