import { nanoid } from "nanoid";
import { Fee } from "./fee.model.js";
import { Student } from "../student/student.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { ROLES } from "../../shared/constants/roles.js";

/** Resolves the Student profile linked to a logged-in student's account. */
async function resolveStudentForUser(userId) {
  return Student.findOne({ userId });
}

export class FeeService {
  static async collectFee({ studentId, courseId, amount, paymentMethod, transactionId }) {
    const student = await Student.findById(studentId);
    if (!student) throw new ApiError(404, "Student not found");

    const receiptNumber = `REC-${nanoid(8).toUpperCase()}`;

    return Fee.create({
      studentId,
      courseId,
      amount,
      paymentMethod,
      transactionId,
      receiptNumber,
      franchiseId: student.franchiseId,
    });
  }

  static async getFeeHistory(studentId) {
    return Fee.find({ studentId }).sort({ paymentDate: -1 });
  }

  /** Self-service: fee payment history for the logged-in student. */
  static async getMyFeeHistory(userId) {
    const student = await resolveStudentForUser(userId);
    if (!student) return [];
    return Fee.find({ studentId: student._id }).sort({ paymentDate: -1 });
  }

  static async getAllFees(requestingUser) {
    const query = {};
    if (requestingUser.role !== ROLES.SUPER_ADMIN) {
      query.franchiseId = requestingUser.franchiseId;
    }

    return Fee.find(query).populate("studentId", "registrationNumber").populate("courseId", "name");
  }
}
