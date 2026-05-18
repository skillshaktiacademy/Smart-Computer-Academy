import { Router } from "express";
import {
  enrollStudent,
  getStudentEnrollments,
  updateFeePayment,
} from "./enrollment.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";
import { enrollmentSchema, updateFeeSchema } from "./enrollment.validator.js";
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

// Enroll student
router.post("/", roleGuard(["franchise_owner", "teacher"]), validate(enrollmentSchema), enrollStudent);

// Get student enrollments
router.get("/student/:studentId", getStudentEnrollments);

// Update fee
router.patch("/:id/fee", roleGuard(["super_admin", "franchise_owner", "teacher"]), validate(updateFeeSchema), updateFeePayment);

export default router;
