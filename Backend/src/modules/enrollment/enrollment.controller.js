import { EnrollmentService } from "./enrollment.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import { enrollmentSchema, updateFeeSchema } from "./enrollment.validator.js";

/**
 * Enroll student in a course
 */
export const enrollStudent = asyncHandler(async (req, res) => {
  const data = enrollmentSchema.parse(req.body);
  const enrollment = await EnrollmentService.enrollStudent(data, req.user);
  return res.status(201).json(new ApiResponse(201, enrollment, "Student enrolled successfully"));
});

/**
 * List all enrollments of a student
 */
export const getStudentEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await EnrollmentService.getStudentEnrollments(req.params.studentId, req.user);
  return res.status(200).json(new ApiResponse(200, enrollments, "Enrollments fetched successfully"));
});

/**
 * Update fee payment
 */
export const updateFeePayment = asyncHandler(async (req, res) => {
  const { paidAmount } = updateFeeSchema.parse(req.body);
  const enrollment = await EnrollmentService.updateFeePayment(req.params.id, paidAmount, req.user);
  return res.status(200).json(new ApiResponse(200, enrollment, "Fee payment updated successfully"));
});
