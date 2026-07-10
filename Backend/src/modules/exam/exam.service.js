import { Exam } from "./exam.model.js";
import { Result } from "./result.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { ROLES } from "../../shared/constants/roles.js";

/**
 * Owns exam-definition CRUD only. Result submission/fetching lives in
 * result.service.js / result.controller.js (see Phase 2.5 split).
 */
export class ExamService {
  static async scheduleExam({ title, courseId, examDate, totalMarks, passingMarks }, requestingUser) {
    return Exam.create({
      title,
      courseId,
      franchiseId: requestingUser.franchiseId,
      examDate,
      totalMarks,
      passingMarks,
      createdBy: requestingUser._id,
    });
  }

  static async getExams({ franchiseId, courseId }, requestingUser) {
    const query = {};
    if (franchiseId) query.franchiseId = franchiseId;
    else if (requestingUser.role !== ROLES.SUPER_ADMIN) query.franchiseId = requestingUser.franchiseId;
    if (courseId) query.courseId = courseId;

    return Exam.find(query).populate("courseId", "title");
  }

  /**
   * Marks the exam completed and stamps publishedAt on its results.
   * Notification hook (Phase 6): notify students once results are published.
   */
  static async publishResults(id) {
    const exam = await Exam.findById(id);
    if (!exam) throw new ApiError(404, "Exam not found");

    exam.status = "completed";
    await exam.save();

    await Result.updateMany({ examId: id }, { publishedAt: new Date() });
  }
}
