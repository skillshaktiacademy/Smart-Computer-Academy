import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
} from "./course.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);

// Protected routes (Super Admin only)
router.use(verifyJWT, roleGuard([ROLES.SUPER_ADMIN]));

router.post("/", upload.single("thumbnail"), createCourse);
router.patch("/:id", upload.single("thumbnail"), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
