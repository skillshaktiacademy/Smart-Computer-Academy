import { Router } from "express";
import {
  getStudentStats,
  getTeacherStats,
  getFranchiseStats,
  getAdminStats,
} from "./dashboard.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.get("/student/stats", roleGuard([ROLES.STUDENT]), getStudentStats);
router.get("/teacher/stats", roleGuard([ROLES.TEACHER]), getTeacherStats);
router.get("/franchise/stats", roleGuard([ROLES.FRANCHISE_OWNER]), getFranchiseStats);
router.get("/admin/stats", roleGuard([ROLES.SUPER_ADMIN]), getAdminStats);

export default router;
