import { Router } from "express";
import {
  uploadMaterial,
  getCourseMaterial,
  getMyCourseMaterials,
  getMyCenterMaterials,
} from "./material.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post(
  "/",
  roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]),
  upload.single("file"),
  uploadMaterial
);
router.get("/my-course", roleGuard([ROLES.STUDENT]), getMyCourseMaterials);
router.get("/my-center", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getMyCenterMaterials);
router.get("/course/:courseId", getCourseMaterial);

export default router;
