import { AttendanceService } from "./attendance.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Mark attendance for multiple students (Teacher only)
 */
export const markAttendance = asyncHandler(async (req, res) => {
  const records = await AttendanceService.markAttendance(req.body, req.user);
  return res.status(200).json(new ApiResponse(200, records, "Attendance marked successfully"));
});

/**
 * Get attendance history of a student
 */
export const getStudentAttendance = asyncHandler(async (req, res) => {
  const attendance = await AttendanceService.getStudentAttendance(req.params.id, req.user);
  return res.status(200).json(new ApiResponse(200, attendance, "Student attendance history fetched"));
});

/**
 * Self-service: attendance history for the logged-in student
 */
export const getMyAttendance = asyncHandler(async (req, res) => {
  const attendance = await AttendanceService.getMyAttendance(req.user._id);
  return res.status(200).json(new ApiResponse(200, attendance, "My attendance history fetched"));
});

/**
 * Franchise-wise attendance report
 */
export const getAttendanceReport = asyncHandler(async (req, res) => {
  const report = await AttendanceService.getAttendanceReport(req.query);
  return res.status(200).json(new ApiResponse(200, report, "Attendance report fetched"));
});
