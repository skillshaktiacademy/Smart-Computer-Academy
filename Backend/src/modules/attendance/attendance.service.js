import { Attendance } from "./attendance.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Student } from "../student/student.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { NotificationService } from "../../shared/services/notification.service.js";
import logger from "../../shared/utils/logger.js";
import { assertCanAccessStudent } from "../../shared/utils/access.utils.js";

export class AttendanceService {
  /**
   * Marks attendance for multiple students. Students marked absent are
   * notified via SMS, fire-and-forget so a notification failure never
   * fails the attendance-marking request itself.
   */
  static async markAttendance({ students, date, courseId }, requestingUser) {
    if (!students || !Array.isArray(students)) {
      throw new ApiError(400, "Students array is required");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const records = await Promise.all(
      students.map(async (item) => {
        const enrollment = await Enrollment.findOne({
          studentId: item.studentId,
          courseId,
          status: "active",
        });
        if (!enrollment) return null;

        return Attendance.findOneAndUpdate(
          { studentId: item.studentId, date: { $gte: startOfDay, $lte: endOfDay } },
          {
            studentId: item.studentId,
            enrollmentId: enrollment._id,
            franchiseId: requestingUser.franchiseId,
            teacherId: requestingUser._id,
            date: new Date(date),
            status: item.status,
            markedBy: requestingUser._id,
          },
          { upsert: true, new: true }
        );
      })
    );

    const marked = records.filter((r) => r !== null);

    marked
      .filter((r) => r.status === "absent")
      .forEach((r) => {
        Student.findById(r.studentId)
          .then((student) => student && NotificationService.notifyAttendanceAbsent(student, r.date))
          .catch((err) => logger.error(`Attendance-absent notification failed: ${err.message}`));
      });

    return marked;
  }

  static async getStudentAttendance(studentId, requestingUser) {
    const student = await Student.findById(studentId);
    assertCanAccessStudent(requestingUser, student);
    return Attendance.find({ studentId }).sort({ date: -1 });
  }

  /**
   * Self-service: attendance history for the logged-in student's own
   * profile. Returns an empty list (not an error) if the account isn't
   * linked to a Student record yet — see student.service.js getMyProfile.
   */
  static async getMyAttendance(userId) {
    const student = await Student.findOne({ userId });
    if (!student) return [];
    return Attendance.find({ studentId: student._id }).sort({ date: -1 });
  }

  static async getAttendanceReport({ franchiseId, startDate, endDate }) {
    const query = {};
    if (franchiseId) query.franchiseId = franchiseId;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    return Attendance.aggregate([
      { $match: query },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
  }
}
