import { Router } from "express";
import {
  submitInquiry,
  getPublicCourses,
  getGallery,
  getTestimonials,
  getPublicFranchises,
} from "./public.controller.js";

const router = Router();

router.post("/contact", submitInquiry);
router.get("/courses", getPublicCourses);
router.get("/gallery", getGallery);
router.get("/testimonials", getTestimonials);
router.get("/franchises", getPublicFranchises);

// Certificate verification lives at GET /api/v1/certificates/verify/:certificateNo
// (see certificate.routes.js) — this module's old duplicate/broken
// verify-certificate handler has been removed.

export default router;
