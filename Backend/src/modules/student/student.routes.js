import { Router } from "express";
import {
  getAllStudents,
  addStudent,
  getMyCenterStudents,
  getStudentByEnrollmentNo,
  updateStudent,
  getStudentCertificate,
} from "./student.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

// Franchise Owner/Teacher only: Add new student
router.post("/", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), upload.single("photo"), addStudent);

// List all (Role based)
router.get("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getAllStudents);

// Franchise/teacher's own center's students — must come before the
// "/:enrollmentNo" catch-all param route below.
router.get("/my-center", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getMyCenterStudents);
router.get("/my-students", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getMyCenterStudents);

// Get by Enrollment Number
router.get("/:enrollmentNo", getStudentByEnrollmentNo);

// Update student info
router.patch(
  "/:id",
  roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]),
  upload.single("photo"),
  updateStudent
);

// Get/View Certificate
router.get("/:id/certificate", getStudentCertificate);

export default router;
