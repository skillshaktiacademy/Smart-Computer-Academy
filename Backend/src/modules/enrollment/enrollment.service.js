import mongoose from "mongoose";
import { Enrollment } from "./enrollment.model.js";
import { Student } from "../student/student.model.js";
import { Course } from "../course/course.model.js";
import { CouponService } from "../coupon/coupon.service.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { ROLES } from "../../shared/constants/roles.js";

export class EnrollmentService {
  /**
   * Enroll a student in a course, optionally applying a coupon code to
   * discount the fee. Coupon validation, redemption (usedCount increment),
   * and enrollment creation all happen inside one transaction, so a coupon
   * can never be consumed by an enrollment that ends up not being created
   * (and vice versa) even under concurrent requests for a capped code.
   */
  static async enrollStudent(data, requestingUser) {
    const { studentId, courseId, totalFee, enrollmentDate, expectedCompletionDate, couponCode } = data;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) throw new ApiError(404, "Student or Course not found");

    const existing = await Enrollment.findOne({ studentId, courseId, status: "active" });
    if (existing) throw new ApiError(400, "Student is already actively enrolled in this course");

    const franchiseId = requestingUser.franchiseId || student.franchiseId;
    let finalFee = totalFee || course.fee;

    if (!couponCode) {
      return Enrollment.create({
        studentId,
        courseId,
        franchiseId,
        totalFee: finalFee,
        enrollmentDate: enrollmentDate || new Date(),
        expectedCompletionDate,
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const coupon = await CouponService.validate(couponCode, { courseId, franchiseId, session });
      const discountAmount = CouponService.computeDiscount(coupon, finalFee);
      finalFee = finalFee - discountAmount;

      const [enrollment] = await Enrollment.create(
        [{
          studentId,
          courseId,
          franchiseId,
          totalFee: finalFee,
          enrollmentDate: enrollmentDate || new Date(),
          expectedCompletionDate,
          appliedCoupon: { couponId: coupon._id, code: coupon.code, discountAmount },
        }],
        { session }
      );

      await CouponService.redeem(couponCode, { session });

      await session.commitTransaction();
      return enrollment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async getStudentEnrollments(studentId) {
    return Enrollment.find({ studentId }).populate("courseId");
  }

  static async updateFeePayment(id, paidAmount, requestingUser) {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) throw new ApiError(404, "Enrollment not found");

    if (
      requestingUser.role !== ROLES.SUPER_ADMIN &&
      enrollment.franchiseId.toString() !== requestingUser.franchiseId.toString()
    ) {
      throw new ApiError(403, "Unauthorized to update this enrollment fee");
    }

    enrollment.paidAmount += parseFloat(paidAmount);
    await enrollment.save();
    return enrollment;
  }
}
