import { Enrollment } from "../enrollment/enrollment.model.js";
import { Attendance } from "../attendance/attendance.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { Notice } from "../notice/notice.model.js";
import { Exam } from "../exam/exam.model.js";
import { Student } from "../student/student.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { Course } from "../course/course.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";

export class DashboardService {
  /**
   * Resolves the Student profile linked to a logged-in student user via
   * the userId link set at admission time (student.service.js addStudent).
   * Falls back to an email/phone match for students admitted before that
   * link existed.
   */
  static async getStudentStats(user) {
    const student =
      (await Student.findOne({ userId: user._id })) ||
      (await Student.findOne({ $or: [{ email: user.email }, { phone: user.phone }] }));

    if (!student) {
      return {
        attendanceRate: 0,
        courseProgress: 0,
        pendingFees: 0,
        earnedCertificates: 0,
        recentNotices: [],
        upcomingExams: [],
      };
    }

    const attendance = await Attendance.find({ studentId: student._id });
    const presentCount = attendance.filter((a) => a.status === "present").length;
    const attendanceRate = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

    const enrollments = await Enrollment.find({ studentId: student._id });
    const pendingFees = enrollments.reduce((acc, curr) => acc + (curr.totalFee - curr.paidAmount), 0);
    const courseProgress = enrollments.length > 0 ? 45 : 0; // placeholder

    const earnedCertificates = await Certificate.countDocuments({ studentId: student._id });

    const recentNotices = await Notice.find({
      isActive: true,
      $or: [{ targetRoles: "all" }, { targetRoles: "student" }],
      $and: [{ $or: [{ franchiseId: null }, { franchiseId: student.franchiseId }] }],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const upcomingExams = await Exam.find({
      franchiseId: student.franchiseId,
      examDate: { $gte: new Date() },
    })
      .sort({ examDate: 1 })
      .limit(5);

    return { attendanceRate, courseProgress, pendingFees, earnedCertificates, recentNotices, upcomingExams };
  }

  static async getTeacherStats(user) {
    const franchiseId = user.franchiseId;

    if (!franchiseId) {
      return { totalStudents: 0, pendingResults: 0, todayAttendance: false, assignedCourses: 0 };
    }

    const totalStudents = await Student.countDocuments({ franchiseId, isActive: true });

    const upcomingExams = await Exam.find({ franchiseId, examDate: { $lte: new Date() } });
    const pendingResults = upcomingExams.length; // placeholder

    const todayAttendance = await Attendance.findOne({
      franchiseId,
      date: { $gte: new Date().setHours(0, 0, 0, 0), $lte: new Date().setHours(23, 59, 59, 999) },
    });

    const assignedCourses = await Course.countDocuments({ $or: [{ franchiseId }, { franchiseId: null }] });

    return { totalStudents, pendingResults, todayAttendance: !!todayAttendance, assignedCourses };
  }

  static async getFranchiseStats(user) {
    const franchiseId = user.franchiseId;
    if (!franchiseId) throw new ApiError(400, "Franchise ID not found in user session");

    const totalStudents = await Student.countDocuments({ franchiseId });

    const enrollments = await Enrollment.find({ franchiseId });
    const totalRevenue = enrollments.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const pendingFees = enrollments.reduce((acc, curr) => acc + (curr.totalFee - curr.paidAmount), 0);

    const activeCourses = await Course.countDocuments({
      $or: [{ franchiseId }, { franchiseId: null }],
      isActive: true,
    });

    return { totalStudents, totalRevenue, activeCourses, pendingFees };
  }

  static async getAdminStats() {
    const totalFranchises = await Franchise.countDocuments();
    const totalStudents = await Student.countDocuments();

    const enrollments = await Enrollment.find();
    const totalRevenue = enrollments.reduce((acc, curr) => acc + curr.paidAmount, 0);

    const activeNoticeCount = await Notice.countDocuments({ isActive: true, franchiseId: null });

    return { totalFranchises, totalStudents, totalRevenue, activeNoticeCount };
  }
}
