import { Attendance } from "./attendance.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * Mark attendance for multiple students (Teacher only)
 */
export const markAttendance = asyncHandler(async (req, res) => {
  const { students, date, courseId } = req.body; // students = [{studentId, status}]

  if (!students || !Array.isArray(students)) {
    throw new ApiError(400, "Students array is required");
  }

  const attendanceRecords = await Promise.all(
    students.map(async (item) => {
      const enrollment = await Enrollment.findOne({
        studentId: item.studentId,
        courseId,
        status: "active",
      });

      if (!enrollment) return null;

      // Update if already exists for this date, otherwise create
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return await Attendance.findOneAndUpdate(
        {
          studentId: item.studentId,
          date: { $gte: startOfDay, $lte: endOfDay },
        },
        {
          studentId: item.studentId,
          enrollmentId: enrollment._id,
          franchiseId: req.user.franchiseId,
          teacherId: req.user._id,
          date: new Date(date),
          status: item.status,
          markedBy: req.user._id,
        },
        { upsert: true, new: true }
      );
    })
  );

  return res.status(200).json(new ApiResponse(200, attendanceRecords.filter(r => r !== null), "Attendance marked successfully"));
});

/**
 * Get attendance history of a student
 */
export const getStudentAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.find({ studentId: id }).sort({ date: -1 });
  return res.status(200).json(new ApiResponse(200, attendance, "Student attendance history fetched"));
});

/**
 * Franchise-wise attendance report
 */
export const getAttendanceReport = asyncHandler(async (req, res) => {
  const { franchiseId, startDate, endDate } = req.query;

  const query = {};
  if (franchiseId) query.franchiseId = franchiseId;
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const report = await Attendance.aggregate([
    { $match: query },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, report, "Attendance report fetched"));
});
