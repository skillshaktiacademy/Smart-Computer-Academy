import { Router } from "express";
import { markAttendance, getStudentAttendance, getAttendanceReport } from "./attendance.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/mark", roleGuard(["teacher"]), markAttendance);
router.get("/student/:id", getStudentAttendance);
router.get("/report", roleGuard(["super_admin", "franchise_owner"]), getAttendanceReport);

export default router;
