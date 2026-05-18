import { Router } from "express";
import { 
  getStudentStats, 
  getTeacherStats, 
  getFranchiseStats, 
  getAdminStats 
} from "./dashboard.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/student/stats", roleGuard(["student"]), getStudentStats);
router.get("/teacher/stats", roleGuard(["teacher"]), getTeacherStats);
router.get("/franchise/stats", roleGuard(["franchise_owner"]), getFranchiseStats);
router.get("/admin/stats", roleGuard(["super_admin"]), getAdminStats);

export default router;
