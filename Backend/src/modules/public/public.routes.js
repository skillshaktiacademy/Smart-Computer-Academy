import { Router } from "express";
import {
  submitInquiry,
  getPublicCourses,
  verifyCertificate,
  getGallery,
  getTestimonials,
  getPublicFranchises,
} from "./public.controller.js";

const router = Router();

router.post("/contact", submitInquiry);
router.get("/courses", getPublicCourses);
router.get("/verify-certificate/:certificateNumber", verifyCertificate);
router.get("/gallery", getGallery);
router.get("/testimonials", getTestimonials);
router.get("/franchises", getPublicFranchises);

export default router;
