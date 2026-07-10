import authRouter from "./modules/auth/auth.routes.js";
import franchiseRouter from "./modules/franchise/franchise.routes.js";
import studentRouter from "./modules/student/student.routes.js";
import courseRouter from "./modules/course/course.routes.js";
import attendanceRouter from "./modules/attendance/attendance.routes.js";
import feeRouter from "./modules/fee/fee.routes.js";
import examRouter from "./modules/exam/exam.routes.js";
import certificateRouter from "./modules/certificate/certificate.routes.js";
import noticeRouter from "./modules/notice/notice.routes.js";
import materialRouter from "./modules/material/material.routes.js";
import publicRouter from "./modules/public/public.routes.js";
import enrollmentRouter from "./modules/enrollment/enrollment.routes.js";
import resultRouter from "./modules/exam/result.routes.js";
import dashboardRouter from "./modules/dashboard/dashboard.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";

/**
 * Central route registry. Mount paths are byte-for-byte identical to the
 * previous inline app.use(...) calls in app.js — this is a pure refactor,
 * not a route change (except /coupons, which is new).
 */
export function registerRoutes(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/franchises", franchiseRouter);
  app.use("/api/v1/students", studentRouter);
  app.use("/api/v1/courses", courseRouter);
  app.use("/api/v1/attendance", attendanceRouter);
  app.use("/api/v1/fees", feeRouter);
  app.use("/api/v1/exams", examRouter);
  app.use("/api/v1/certificates", certificateRouter);
  app.use("/api/v1/notices", noticeRouter);
  app.use("/api/v1/materials", materialRouter);
  app.use("/api/v1/public", publicRouter);
  app.use("/api/v1/enrollments", enrollmentRouter);
  app.use("/api/v1/results", resultRouter);
  app.use("/api/v1/dashboard", dashboardRouter);
  app.use("/api/v1/coupons", couponRouter);
}
