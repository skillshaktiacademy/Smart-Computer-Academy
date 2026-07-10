import { StudentService } from "./student.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import { addStudentSchema } from "./student.validator.js";

/**
 * List students with pagination
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await StudentService.getAllStudents(req.query, req.user);
  return res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
});

/**
 * Add a new student (Franchise Owner/Teacher)
 */
export const addStudent = asyncHandler(async (req, res) => {
  const data = addStudentSchema.parse(req.body);
  const student = await StudentService.addStudent(data, req.user, req.file);
  return res.status(201).json(new ApiResponse(201, student, "Student added successfully"));
});

/**
 * Franchise/teacher's own center's students
 */
export const getMyCenterStudents = asyncHandler(async (req, res) => {
  const students = await StudentService.getMyCenterStudents(req.user);
  return res.status(200).json(new ApiResponse(200, students, "Center students fetched successfully"));
});

/**
 * Get student details by enrollment number
 */
export const getStudentByEnrollmentNo = asyncHandler(async (req, res) => {
  const student = await StudentService.getStudentByEnrollmentNo(req.params.enrollmentNo);
  return res.status(200).json(new ApiResponse(200, student, "Student details fetched"));
});

/**
 * Update student info
 */
export const updateStudent = asyncHandler(async (req, res) => {
  const data = addStudentSchema.partial().parse(req.body);
  const student = await StudentService.updateStudent(req.params.id, data, req.user, req.file);
  return res.status(200).json(new ApiResponse(200, student, "Student updated successfully"));
});

/**
 * View/Generate student certificate
 */
export const getStudentCertificate = asyncHandler(async (req, res) => {
  const certificate = await StudentService.getStudentCertificate(req.params.id);
  return res.status(200).json(new ApiResponse(200, certificate, "Certificate fetched"));
});
