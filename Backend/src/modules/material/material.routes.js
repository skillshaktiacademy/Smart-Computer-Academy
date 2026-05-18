import { Router } from "express";
import { uploadMaterial, getCourseMaterial } from "./material.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard(["super_admin", "franchise_owner", "teacher"]), upload.single("file"), uploadMaterial);
router.get("/course/:courseId", getCourseMaterial);

export default router;
