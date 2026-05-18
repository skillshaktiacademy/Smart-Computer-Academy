import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Attendance } from "../attendance/attendance.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { Notice } from "../notice/notice.model.js";
import { Exam } from "../exam/exam.model.js";
import { Student } from "../student/student.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { Course } from "../course/course.model.js";

/**
 * Get Student Dashboard Stats
 */
export const getStudentStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the student profile linked to this user
  // Assuming student is linked via phone or email for now if not direct link
  const student = await Student.findOne({ 
    $or: [{ email: req.user.email }, { phone: req.user.phone }] 
  });

  if (!student) {
    return res.status(200).json(new ApiResponse(200, {
      attendanceRate: 0,
      courseProgress: 0,
      pendingFees: 0,
      earnedCertificates: 0,
      recentNotices: [],
      upcomingExams: []
    }, "No student profile found for this user"));
  }

  // 1. Attendance Rate
  const attendance = await Attendance.find({ studentId: student._id });
  const presentCount = attendance.filter(a => a.status === "present").length;
  const attendanceRate = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

  // 2. Fees & Progress
  const enrollments = await Enrollment.find({ studentId: student._id });
  const pendingFees = enrollments.reduce((acc, curr) => acc + (curr.totalFee - curr.paidAmount), 0);
  
  // Progress is placeholder for now
  const courseProgress = enrollments.length > 0 ? 45 : 0; 

  // 3. Certificates
  const earnedCertificates = await Certificate.countDocuments({ studentId: student._id });

  // 4. Notices
  const recentNotices = await Notice.find({
    isActive: true,
    $or: [
      { targetRoles: "all" },
      { targetRoles: "student" }
    ],
    $or: [
      { franchiseId: null },
      { franchiseId: student.franchiseId }
    ]
  }).sort({ createdAt: -1 }).limit(5);

  // 5. Upcoming Exams
  const upcomingExams = await Exam.find({
    franchiseId: student.franchiseId,
    examDate: { $gte: new Date() }
  }).sort({ examDate: 1 }).limit(5);

  return res.status(200).json(new ApiResponse(200, {
    attendanceRate,
    courseProgress,
    pendingFees,
    earnedCertificates,
    recentNotices,
    upcomingExams
  }, "Student stats fetched successfully"));
});

/**
 * Get Teacher Dashboard Stats
 */
export const getTeacherStats = asyncHandler(async (req, res) => {
  const franchiseId = req.user.franchiseId;

  if (!franchiseId) {
    return res.status(200).json(new ApiResponse(200, {
      totalStudents: 0,
      pendingResults: 0,
      todayAttendance: false,
      assignedCourses: 0
    }, "No franchise assigned to this teacher"));
  }

  const totalStudents = await Student.countDocuments({ franchiseId, isActive: true });
  
  const upcomingExams = await Exam.find({ franchiseId, examDate: { $lte: new Date() } });
  // Placeholder for pending results
  const pendingResults = upcomingExams.length;

  const todayAttendance = await Attendance.findOne({
    franchiseId,
    date: { 
      $gte: new Date().setHours(0,0,0,0), 
      $lte: new Date().setHours(23,59,59,999) 
    }
  });

  const assignedCourses = await Course.countDocuments({ 
    $or: [{ franchiseId }, { franchiseId: null }] 
  });

  return res.status(200).json(new ApiResponse(200, {
    totalStudents,
    pendingResults,
    todayAttendance: !!todayAttendance,
    assignedCourses
  }, "Teacher stats fetched successfully"));
});

/**
 * Get Franchise Dashboard Stats
 */
export const getFranchiseStats = asyncHandler(async (req, res) => {
  const franchiseId = req.user.franchiseId;

  if (!franchiseId) {
    throw new ApiError(400, "Franchise ID not found in user session");
  }

  const totalStudents = await Student.countDocuments({ franchiseId });
  
  const enrollments = await Enrollment.find({ franchiseId });
  const totalRevenue = enrollments.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const pendingFees = enrollments.reduce((acc, curr) => acc + (curr.totalFee - curr.paidAmount), 0);

  const activeCourses = await Course.countDocuments({ 
    $or: [{ franchiseId }, { franchiseId: null }],
    isActive: true 
  });

  return res.status(200).json(new ApiResponse(200, {
    totalStudents,
    totalRevenue,
    activeCourses,
    pendingFees
  }, "Franchise stats fetched successfully"));
});

/**
 * Get Super Admin Stats
 */
export const getAdminStats = asyncHandler(async (req, res) => {
  const totalFranchises = await Franchise.countDocuments();
  const totalStudents = await Student.countDocuments();
  
  const enrollments = await Enrollment.find();
  const totalRevenue = enrollments.reduce((acc, curr) => acc + curr.paidAmount, 0);
  
  const activeNoticeCount = await Notice.countDocuments({ isActive: true, franchiseId: null });

  return res.status(200).json(new ApiResponse(200, {
    totalFranchises,
    totalStudents,
    totalRevenue,
    activeNoticeCount
  }, "Admin stats fetched successfully"));
});
