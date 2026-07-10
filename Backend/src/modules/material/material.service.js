import { StudyMaterial } from "./studyMaterial.model.js";
import { Student } from "../student/student.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { uploadOnCloudinary, resolveMediaType } from "../../shared/config/cloudinary.config.js";

export class MaterialService {
  static async uploadMaterial({ title, description, courseId, fileType }, requestingUser, file) {
    if (!file) throw new ApiError(400, "File is required");

    // Route by the file's actual mimetype (not the client-supplied fileType
    // string) so images/videos/audio/PDFs always land in their own
    // top-level Cloudinary folder regardless of what the form field said.
    const { resourceType, mediaFolder } = resolveMediaType(file.mimetype);
    const uploadedFile = await uploadOnCloudinary(file.path, {
      resourceType,
      folder: `${mediaFolder}/materials`,
    });
    if (!uploadedFile) throw new ApiError(400, "Error uploading file to Cloudinary");

    return StudyMaterial.create({
      title,
      description,
      courseId,
      file: { url: uploadedFile.url, public_id: uploadedFile.public_id },
      fileType: fileType || mediaFolder,
      franchiseId: requestingUser.franchiseId,
    });
  }

  static async getCourseMaterial(courseId) {
    return StudyMaterial.find({ courseId }).sort({ createdAt: -1 });
  }

  /** Self-service: materials for the courses the logged-in student is actively enrolled in. */
  static async getMyCourseMaterials(userId) {
    const student = await Student.findOne({ userId });
    if (!student) return [];

    const enrollments = await Enrollment.find({ studentId: student._id, status: "active" }).select("courseId");
    const courseIds = enrollments.map((e) => e.courseId);
    return StudyMaterial.find({ courseId: { $in: courseIds } }).sort({ createdAt: -1 });
  }

  /** Franchise/teacher's own center's materials. */
  static async getMyCenterMaterials(requestingUser) {
    return StudyMaterial.find({ franchiseId: requestingUser.franchiseId }).sort({ createdAt: -1 });
  }
}
