import { Router } from "express";
import {
  enrollStudent,
  getStudentEnrollments,
  updateFeePayment,
} from "./enrollment.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

// Enroll student
router.post("/", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), enrollStudent);

// Get student enrollments
router.get("/student/:studentId", getStudentEnrollments);

// Update fee
router.patch(
  "/:id/fee",
  roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]),
  updateFeePayment
);

export default router;
