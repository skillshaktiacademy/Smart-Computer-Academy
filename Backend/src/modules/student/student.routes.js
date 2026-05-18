import { Router } from "express";
import {
  getAllStudents,
  addStudent,
  getStudentByEnrollmentNo,
  updateStudent,
  getStudentCertificate,
} from "./student.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { addStudentSchema } from "./student.validator.js";
import { ApiError } from "../../utils/ApiError.js";

const router = Router();

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors?.map((err) => err.message).join(", ") || error.message;
    next(new ApiError(400, errorMessage));
  }
};

router.use(verifyJWT);

// Franchise Owner/Teacher only: Add new student
router.post("/", roleGuard(["franchise_owner", "teacher"]), upload.single("photo"), validate(addStudentSchema), addStudent);

// List all (Role based)
router.get("/", roleGuard(["super_admin", "franchise_owner", "teacher"]), getAllStudents);

// Get by Enrollment Number
router.get("/:enrollmentNo", getStudentByEnrollmentNo);

// Update student info
router.patch("/:id", roleGuard(["super_admin", "franchise_owner", "teacher"]), upload.single("photo"), validate(addStudentSchema.partial()), updateStudent);

// Get/View Certificate
router.get("/:id/certificate", getStudentCertificate);

export default router;
