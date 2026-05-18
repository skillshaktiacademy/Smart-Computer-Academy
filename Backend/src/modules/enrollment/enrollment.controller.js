import { Enrollment } from "./enrollment.model.js";
import { Student } from "../student/student.model.js";
import { Course } from "../course/course.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * Enroll student in a course
 */
export const enrollStudent = asyncHandler(async (req, res) => {
  const { studentId, courseId, totalFee, enrollmentDate, expectedCompletionDate } = req.body;

  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student || !course) {
    throw new ApiError(404, "Student or Course not found");
  }

  // Check if already enrolled in this course
  const existing = await Enrollment.findOne({ studentId, courseId, status: "active" });
  if (existing) {
    throw new ApiError(400, "Student is already actively enrolled in this course");
  }

  const enrollment = await Enrollment.create({
    studentId,
    courseId,
    franchiseId: req.user.franchiseId || student.franchiseId,
    totalFee: totalFee || course.fee,
    enrollmentDate: enrollmentDate || new Date(),
    expectedCompletionDate,
  });

  return res.status(201).json(new ApiResponse(201, enrollment, "Student enrolled successfully"));
});

/**
 * List all enrollments of a student
 */
export const getStudentEnrollments = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const enrollments = await Enrollment.find({ studentId }).populate("courseId");
  return res.status(200).json(new ApiResponse(200, enrollments, "Enrollments fetched successfully"));
});

/**
 * Update fee payment
 */
export const updateFeePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paidAmount } = req.body;

  const enrollment = await Enrollment.findById(id);
  if (!enrollment) {
    throw new ApiError(404, "Enrollment not found");
  }

  // Permission check
  if (req.user.role !== "super_admin" && enrollment.franchiseId.toString() !== req.user.franchiseId.toString()) {
    throw new ApiError(403, "Unauthorized to update this enrollment fee");
  }

  enrollment.paidAmount += parseFloat(paidAmount);
  await enrollment.save();

  return res.status(200).json(new ApiResponse(200, enrollment, "Fee payment updated successfully"));
});
