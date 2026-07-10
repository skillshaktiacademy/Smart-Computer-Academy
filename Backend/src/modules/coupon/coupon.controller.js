import { CouponService } from "./coupon.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";
import { createCouponSchema, updateCouponSchema, applyCouponSchema } from "./coupon.validator.js";

/**
 * Create a coupon (Super Admin / Franchise Owner)
 */
export const createCoupon = asyncHandler(async (req, res) => {
  const data = createCouponSchema.parse(req.body);
  const coupon = await CouponService.createCoupon(data, req.user._id);
  return res.status(201).json(new ApiResponse(201, coupon, "Coupon created successfully"));
});

/**
 * List all coupons
 */
export const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await CouponService.getAllCoupons();
  return res.status(200).json(new ApiResponse(200, coupons, "Coupons fetched successfully"));
});

/**
 * Update a coupon
 */
export const updateCoupon = asyncHandler(async (req, res) => {
  const data = updateCouponSchema.parse(req.body);
  const coupon = await CouponService.updateCoupon(req.params.id, data);
  return res.status(200).json(new ApiResponse(200, coupon, "Coupon updated successfully"));
});

/**
 * Soft-delete (deactivate) a coupon
 */
export const deleteCoupon = asyncHandler(async (req, res) => {
  await CouponService.deleteCoupon(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, "Coupon deactivated successfully"));
});

/**
 * Validate a coupon code and preview its discount (used by the enrollment form)
 */
export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, courseId, franchiseId, totalFee } = applyCouponSchema.parse(req.body);
  const coupon = await CouponService.validate(code, { courseId, franchiseId });
  const discount = totalFee ? CouponService.computeDiscount(coupon, totalFee) : null;
  return res.status(200).json(new ApiResponse(200, { coupon, discount }, "Coupon is valid"));
});
