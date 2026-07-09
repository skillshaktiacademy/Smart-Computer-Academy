import { Router } from "express";

// Feature module routers
import authRouter from "../modules/auth/auth.routes.js";
import franchiseRouter from "../modules/franchise/franchise.routes.js";
import studentRouter from "../modules/student/student.routes.js";
import courseRouter from "../modules/course/course.routes.js";
import attendanceRouter from "../modules/attendance/attendance.routes.js";
import feeRouter from "../modules/fee/fee.routes.js";
import examRouter from "../modules/exam/exam.routes.js";
import resultRouter from "../modules/exam/result.routes.js";
import certificateRouter from "../modules/certificate/certificate.routes.js";
import noticeRouter from "../modules/notice/notice.routes.js";
import materialRouter from "../modules/material/material.routes.js";
import publicRouter from "../modules/public/public.routes.js";
import enrollmentRouter from "../modules/enrollment/enrollment.routes.js";
import dashboardRouter from "../modules/dashboard/dashboard.routes.js";

const router = Router();

/**
 * Central route registry.
 * Each feature module owns its router; this file is the single place that maps
 * a URL segment to a module. To expose a new module, add one line here.
 */
const moduleRoutes = [
  { path: "/auth", router: authRouter },
  { path: "/franchises", router: franchiseRouter },
  { path: "/students", router: studentRouter },
  { path: "/courses", router: courseRouter },
  { path: "/attendance", router: attendanceRouter },
  { path: "/fees", router: feeRouter },
  { path: "/exams", router: examRouter },
  { path: "/results", router: resultRouter },
  { path: "/certificates", router: certificateRouter },
  { path: "/notices", router: noticeRouter },
  { path: "/materials", router: materialRouter },
  { path: "/public", router: publicRouter },
  { path: "/enrollments", router: enrollmentRouter },
  { path: "/dashboard", router: dashboardRouter },
];

moduleRoutes.forEach(({ path, router: moduleRouter }) => {
  router.use(path, moduleRouter);
});

export default router;
