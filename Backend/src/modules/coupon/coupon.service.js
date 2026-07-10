import { Coupon } from "./coupon.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";

export class CouponService {
  static async createCoupon(data, userId) {
    return Coupon.create({ ...data, createdBy: userId });
  }

  static async getAllCoupons() {
    return Coupon.find().sort({ createdAt: -1 });
  }

  static async updateCoupon(id, data) {
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!coupon) throw new ApiError(404, "Coupon not found");
    return coupon;
  }

  static async deleteCoupon(id) {
    const coupon = await Coupon.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!coupon) throw new ApiError(404, "Coupon not found");
    return coupon;
  }

  /**
   * Validates a coupon code against usage caps, date window, and course/
   * franchise applicability. Throws a specific ApiError(400,...) reason
   * rather than a generic failure so the enrollment form can surface it.
   */
  static async validate(code, { courseId, franchiseId, session } = {}) {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() }).session(session || null);
    if (!coupon || !coupon.isActive) throw new ApiError(400, "Invalid coupon code");

    const now = new Date();
    if (coupon.validFrom && now < coupon.validFrom) throw new ApiError(400, "Coupon is not yet valid");
    if (coupon.validTo && now > coupon.validTo) throw new ApiError(400, "Coupon has expired");

    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      throw new ApiError(400, "Coupon usage limit has been reached");
    }

    if (
      courseId &&
      coupon.applicableCourses.length > 0 &&
      !coupon.applicableCourses.some((c) => c.toString() === courseId)
    ) {
      throw new ApiError(400, "Coupon is not applicable to this course");
    }

    if (
      franchiseId &&
      coupon.applicableFranchises.length > 0 &&
      !coupon.applicableFranchises.some((f) => f.toString() === franchiseId)
    ) {
      throw new ApiError(400, "Coupon is not applicable to this franchise");
    }

    return coupon;
  }

  /** Computes the discount amount (never exceeding totalFee). */
  static computeDiscount(coupon, totalFee) {
    const discount = coupon.type === "percentage" ? (totalFee * coupon.value) / 100 : coupon.value;
    return Math.min(discount, totalFee);
  }

  /**
   * Atomically increments usedCount. When maxUses is set, the increment is
   * conditioned on usedCount still being below the cap so concurrent
   * redemptions of the same single/limited-use code can't oversell it.
   * Pass `session` to run as part of a caller's transaction (e.g.
   * enrollment.service.js, so a failed enrollment never consumes a use).
   */
  static async redeem(code, { session } = {}) {
    const query = { code: code.toUpperCase() };
    const coupon = await Coupon.findOne(query).session(session || null);
    if (!coupon) throw new ApiError(404, "Coupon not found");

    const filter =
      coupon.maxUses !== null
        ? { ...query, $expr: { $lt: ["$usedCount", coupon.maxUses] } }
        : query;

    const updated = await Coupon.findOneAndUpdate(
      filter,
      { $inc: { usedCount: 1 } },
      { new: true, session }
    );
    if (!updated) throw new ApiError(400, "Coupon usage limit has been reached");
    return updated;
  }
}
