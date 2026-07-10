import { Enrollment } from "../enrollment/enrollment.model.js";
import { Attendance } from "../attendance/attendance.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { Notice } from "../notice/notice.model.js";
import { Exam } from "../exam/exam.model.js";
import { Student } from "../student/student.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { Course } from "../course/course.model.js";
import { Result } from "../exam/result.model.js";
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

    // Time-elapsed estimate (enrollmentDate -> expectedCompletionDate) for the
    // student's active enrollment. There's no lesson/module completion
    // tracking in the data model yet, so this is a real, grounded proxy
    // rather than a fixed placeholder number shown to every student alike.
    const activeEnrollment = enrollments.find((e) => e.status === "active") || enrollments[0];
    let courseProgress = 0;
    if (activeEnrollment?.expectedCompletionDate) {
      const start = new Date(activeEnrollment.enrollmentDate).getTime();
      const end = new Date(activeEnrollment.expectedCompletionDate).getTime();
      if (end > start) {
        courseProgress = Math.round(Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100)));
      }
    }

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

    // "Pending results" = exams that have already happened but don't yet
    // have a single Result recorded for them (i.e. still awaiting data
    // entry) — not a count of upcoming exams, which was the prior bug here.
    const pastExams = await Exam.find({
      franchiseId,
      status: "completed",
    }).select("_id");
    const pastExamIds = pastExams.map((e) => e._id);
    const examIdsWithResults = await Result.distinct("examId", { examId: { $in: pastExamIds } });
    const pendingResults = pastExamIds.length - examIdsWithResults.length;

    const todayAttendance = await Attendance.findOne({
      franchiseId,
      date: { $gte: new Date().setHours(0, 0, 0, 0), $lte: new Date().setHours(23, 59, 59, 999) },
    });

    const assignedCourses = await Course.countDocuments({ $or: [{ franchiseId }, { franchiseId: null }] });

    return { totalStudents, pendingResults, todayAttendance: !!todayAttendance, assignedCourses };
  }

  /**
   * Sums an Enrollment collection's paidAmount/pendingFees via a MongoDB
   * $group instead of pulling every document into Node and reducing in JS —
   * matters here because these two callers scale with an entire franchise's
   * or the whole platform's enrollment count, unlike getStudentStats' single
   * student's enrollments (a handful of rows, not worth aggregating).
   */
  static async _sumEnrollmentFees(match) {
    const [totals] = await Enrollment.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$paidAmount" },
          pendingFees: { $sum: { $subtract: ["$totalFee", "$paidAmount"] } },
        },
      },
    ]);
    return { totalRevenue: totals?.totalRevenue || 0, pendingFees: totals?.pendingFees || 0 };
  }

  static async getFranchiseStats(user) {
    const franchiseId = user.franchiseId;
    if (!franchiseId) throw new ApiError(400, "Franchise ID not found in user session");

    const [totalStudents, { totalRevenue, pendingFees }, activeCourses] = await Promise.all([
      Student.countDocuments({ franchiseId }),
      DashboardService._sumEnrollmentFees({ franchiseId }),
      Course.countDocuments({ $or: [{ franchiseId }, { franchiseId: null }], isActive: true }),
    ]);

    return { totalStudents, totalRevenue, activeCourses, pendingFees };
  }

  static async getAdminStats() {
    const [totalFranchises, totalStudents, { totalRevenue }, activeNoticeCount] = await Promise.all([
      Franchise.countDocuments(),
      Student.countDocuments(),
      DashboardService._sumEnrollmentFees({}),
      Notice.countDocuments({ isActive: true, franchiseId: null }),
    ]);

    return { totalFranchises, totalStudents, totalRevenue, activeNoticeCount };
  }
}
