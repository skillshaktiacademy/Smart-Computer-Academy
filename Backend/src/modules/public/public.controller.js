import { InquiryService, TestimonialService, GalleryService, PublicCatalogService } from "./public.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Submit contact inquiry
 */
export const submitInquiry = asyncHandler(async (req, res) => {
  const inquiry = await InquiryService.submit(req.body);
  return res.status(201).json(new ApiResponse(201, inquiry, "Inquiry submitted successfully"));
});

/**
 * Get all public courses
 */
export const getPublicCourses = asyncHandler(async (req, res) => {
  const courses = await PublicCatalogService.getPublicCourses();
  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched"));
});

/**
 * Get public gallery
 */
export const getGallery = asyncHandler(async (req, res) => {
  const images = await GalleryService.getAll();
  return res.status(200).json(new ApiResponse(200, images, "Gallery fetched"));
});

/**
 * Get approved testimonials
 */
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await TestimonialService.getApproved();
  return res.status(200).json(new ApiResponse(200, testimonials, "Testimonials fetched"));
});

/**
 * Get active franchises for student registration
 */
export const getPublicFranchises = asyncHandler(async (req, res) => {
  const franchises = await PublicCatalogService.getPublicFranchises();
  return res.status(200).json(new ApiResponse(200, franchises, "Franchises fetched"));
});
