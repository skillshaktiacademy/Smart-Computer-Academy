import { CourseService } from "./course.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import { courseSchema } from "./course.validator.js";

/**
 * List all active courses (Public)
 */
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await CourseService.getAllCourses(req.query);
  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

/**
 * Create a new course (Super Admin only)
 */
export const createCourse = asyncHandler(async (req, res) => {
  const data = courseSchema.parse(req.body);
  const course = await CourseService.createCourse(data, req.user._id, req.file);
  return res.status(201).json(new ApiResponse(201, course, "Course created successfully"));
});

/**
 * Update course details (Super Admin)
 */
export const updateCourse = asyncHandler(async (req, res) => {
  const data = courseSchema.partial().parse(req.body);
  const course = await CourseService.updateCourse(req.params.id, data, req.file);
  return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"));
});

/**
 * Soft delete course (Super Admin)
 */
export const deleteCourse = asyncHandler(async (req, res) => {
  await CourseService.deleteCourse(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, "Course deactivated successfully"));
});

/**
 * Get single course detail by slug (Public)
 */
export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await CourseService.getCourseBySlug(req.params.slug);
  return res.status(200).json(new ApiResponse(200, course, "Course details fetched"));
});
