import { z } from "zod";

const couponBaseSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20, "Code must be at most 20 characters"),
  type: z.enum(["percentage", "flat"]),
  value: z.number().positive("Value must be positive"),
  maxUses: z.number().int().positive().optional().nullable(),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
  applicableCourses: z.array(z.string()).optional(),
  applicableFranchises: z.array(z.string()).optional(),
});

const percentageCapMessage = { message: "Percentage discount cannot exceed 100", path: ["value"] };

export const createCouponSchema = couponBaseSchema.refine(
  (data) => data.type !== "percentage" || data.value <= 100,
  percentageCapMessage
);

export const updateCouponSchema = couponBaseSchema
  .partial()
  .extend({ isActive: z.boolean().optional() })
  .refine(
    // Only enforce the cap when both fields are actually present in a partial update.
    (data) => data.type === undefined || data.value === undefined || data.type !== "percentage" || data.value <= 100,
    percentageCapMessage
  );

export const applyCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  courseId: z.string().optional(),
  franchiseId: z.string().optional(),
  totalFee: z.number().positive().optional(),
});
