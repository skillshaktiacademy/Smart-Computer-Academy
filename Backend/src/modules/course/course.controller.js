import { Course } from "./course.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../config/cloudinary.js";

/**
 * List all active courses (Public)
 */
export const getAllCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search = "" } = req.query;

  const aggregate = Course.aggregate([
    {
      $match: {
        isActive: true,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
        ...(category ? { category } : {}),
      },
    },
  ]);

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const courses = await Course.aggregatePaginate(aggregate, options);

  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

/**
 * Create a new course (Super Admin only)
 */
export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, duration, fee, category, syllabus } = req.body;

  let thumbnail = null;
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded) {
      thumbnail = { url: uploaded.url, public_id: uploaded.public_id };
    }
  }

  const course = await Course.create({
    title,
    description,
    duration,
    fee,
    category,
    syllabus: typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus,
    thumbnail,
    createdBy: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, course, "Course created successfully"));
});

/**
 * Update course details (Super Admin)
 */
export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, fee, category, syllabus, isActive } = req.body;

  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (title) course.title = title;
  if (description) course.description = description;
  if (duration) course.duration = duration;
  if (fee) course.fee = fee;
  if (category) course.category = category;
  if (syllabus) course.syllabus = typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus;
  if (typeof isActive !== 'undefined') course.isActive = isActive;

  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded) {
      course.thumbnail = { url: uploaded.url, public_id: uploaded.public_id };
    }
  }

  await course.save();

  return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"));
});

/**
 * Soft delete course (Super Admin)
 */
export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Course deactivated successfully"));
});

/**
 * Get single course detail by slug (Public)
 */
export const getCourseBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await Course.findOne({ slug, isActive: true });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, course, "Course details fetched"));
});
