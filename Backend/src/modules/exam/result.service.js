import { Exam } from "./exam.model.js";
import { Result } from "./result.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Student } from "../student/student.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { NotificationService } from "../../shared/services/notification.service.js";
import logger from "../../shared/utils/logger.js";


export class ResultService {
  /**
   * Submit results for multiple students (Teacher). Each student whose
   * result is recorded here is notified by email (fire-and-forget).
   */
  static async submitResults({ examId, marksData }) {
    const exam = await Exam.findById(examId);
    if (!exam) throw new ApiError(404, "Exam not found");

    const results = await Promise.all(
      marksData.map(async (item) => {
        const enrollment = await Enrollment.findOne({
          studentId: item.studentId,
          courseId: exam.courseId,
          status: "active",
        });
        if (!enrollment) return null;

        return Result.findOneAndUpdate(
          { studentId: item.studentId, examId },
          {
            studentId: item.studentId,
            examId,
            enrollmentId: enrollment._id,
            franchiseId: exam.franchiseId,
            marksObtained: item.marksObtained,
          },
          { upsert: true, new: true }
        );
      })
    );

    const saved = results.filter((r) => r !== null);

    saved.forEach((result) => {
      Student.findById(result.studentId)
        .then((student) => student && NotificationService.notifyResultPublished(student, exam.title, result.grade))
        .catch((err) => logger.error(`Result-published notification failed: ${err.message}`));
    });

    return saved;
  }

  static async getStudentResults(studentId) {
    return Result.find({ studentId }).populate("examId").sort({ createdAt: -1 });
  }

  /** Self-service: results for the logged-in student's own profile. */
  static async getMyResults(userId) {
    const student = await Student.findOne({ userId });
    if (!student) return [];
    return Result.find({ studentId: student._id }).populate("examId").sort({ createdAt: -1 });
  }

  static async getExamResults(examId) {
    return Result.find({ examId }).populate("studentId", "name enrollmentNo").sort({ marksObtained: -1 });
  }
}
