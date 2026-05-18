import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
} from "./course.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { courseSchema } from "./course.validator.js";
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

// Public routes
router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);

// Protected routes (Super Admin only)
router.use(verifyJWT, roleGuard(["super_admin"]));

router.post("/", upload.single("thumbnail"), validate(courseSchema), createCourse);
router.patch("/:id", upload.single("thumbnail"), validate(courseSchema.partial()), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
