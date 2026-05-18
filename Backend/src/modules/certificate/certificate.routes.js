import { Router } from "express";
import {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
  downloadCertificate,
} from "./certificate.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

// Public verification
router.get("/verify/:certificateNo", verifyCertificate);

// Protected routes
router.use(verifyJWT);

router.post("/generate/:enrollmentId", roleGuard(["super_admin", "franchise_owner"]), generateCertificate);
router.get("/student/:studentId", getStudentCertificates);
router.get("/:id/download", downloadCertificate);

export default router;
