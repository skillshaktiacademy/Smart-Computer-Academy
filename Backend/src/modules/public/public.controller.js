import { Inquiry, Testimonial, Gallery } from "./public.model.js";
import { Franchise } from "../franchise/franchise.model.js";
import { Course } from "../course/course.model.js";
import { Certificate } from "../certificate/certificate.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * Submit contact inquiry
 */
export const submitInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  return res.status(201).json(new ApiResponse(201, inquiry, "Inquiry submitted successfully"));
});

/**
 * Get all public courses
 */
export const getPublicCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isActive: true, franchiseId: null });
  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched"));
});

/**
 * Verify certificate via number or QR
 */
export const verifyCertificate = asyncHandler(async (req, res) => {
  const { certificateNumber } = req.params;
  const certificate = await Certificate.findOne({ certificateNumber })
    .populate({
      path: "studentId",
      populate: { path: "userId", select: "name" }
    })
    .populate("courseId", "name duration");

  if (!certificate) {
    throw new ApiError(404, "Invalid certificate number");
  }

  return res.status(200).json(new ApiResponse(200, certificate, "Certificate verified"));
});

/**
 * Get public gallery
 */
export const getGallery = asyncHandler(async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, images, "Gallery fetched"));
});

/**
 * Get approved testimonials
 */
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isApproved: true });
  return res.status(200).json(new ApiResponse(200, testimonials, "Testimonials fetched"));
});

/**
 * Get active franchises for student registration
 */
export const getPublicFranchises = asyncHandler(async (req, res) => {
  const franchises = await Franchise.find({ status: 'active' }).select('name _id');
  return res.status(200).json(new ApiResponse(200, franchises, 'Franchises fetched'));
});
