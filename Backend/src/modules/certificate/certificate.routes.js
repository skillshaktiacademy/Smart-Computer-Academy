import { Router } from "express";
import {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
  getMyCertificates,
  downloadCertificate,
} from "./certificate.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

// Public verification
router.get("/verify/:certificateNo", verifyCertificate);

// Protected routes
router.use(verifyJWT);

router.post("/generate/:enrollmentId", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), generateCertificate);
router.get("/my", roleGuard([ROLES.STUDENT]), getMyCertificates);
router.get("/student/:studentId", getStudentCertificates);
router.get("/:id/download", downloadCertificate);

export default router;
