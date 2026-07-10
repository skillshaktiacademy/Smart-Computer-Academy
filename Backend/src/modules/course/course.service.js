import { Course } from "./course.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { uploadOnCloudinary } from "../../shared/config/cloudinary.config.js";

export class CourseService {
  static async getAllCourses({ page = 1, limit = 10, category, search = "" }) {
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

    return Course.aggregatePaginate(aggregate, { page: parseInt(page), limit: parseInt(limit) });
  }

  static async createCourse(data, userId, file) {
    const { title, description, duration, fee, category, syllabus } = data;

    let thumbnail = null;
    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) thumbnail = { url: uploaded.url, public_id: uploaded.public_id };
    }

    return Course.create({
      title,
      description,
      duration,
      fee,
      category,
      syllabus: typeof syllabus === "string" ? JSON.parse(syllabus) : syllabus,
      thumbnail,
      createdBy: userId,
    });
  }

  static async updateCourse(id, data, file) {
    const course = await Course.findById(id);
    if (!course) throw new ApiError(404, "Course not found");

    const { title, description, duration, fee, category, syllabus, isActive } = data;
    if (title) course.title = title;
    if (description) course.description = description;
    if (duration) course.duration = duration;
    if (fee) course.fee = fee;
    if (category) course.category = category;
    if (syllabus) course.syllabus = typeof syllabus === "string" ? JSON.parse(syllabus) : syllabus;
    if (typeof isActive !== "undefined") course.isActive = isActive;

    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) course.thumbnail = { url: uploaded.url, public_id: uploaded.public_id };
    }

    await course.save();
    return course;
  }

  static async deleteCourse(id) {
    const course = await Course.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!course) throw new ApiError(404, "Course not found");
  }

  static async getCourseBySlug(slug) {
    const course = await Course.findOne({ slug, isActive: true });
    if (!course) throw new ApiError(404, "Course not found");
    return course;
  }
}
