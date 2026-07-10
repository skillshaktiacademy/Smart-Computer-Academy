import { Router } from "express";
import { markAttendance, getStudentAttendance, getMyAttendance, getAttendanceReport } from "./attendance.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/mark", roleGuard([ROLES.TEACHER]), markAttendance);
router.get("/my-records", roleGuard([ROLES.STUDENT]), getMyAttendance);
router.get("/student/:id", getStudentAttendance);
router.get("/report", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), getAttendanceReport);

export default router;
