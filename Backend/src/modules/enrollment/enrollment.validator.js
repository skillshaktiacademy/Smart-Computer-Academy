import { z } from "zod";

export const enrollmentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  totalFee: z.number().optional(),
  enrollmentDate: z.string().optional(),
  expectedCompletionDate: z.string().optional(),
});

export const updateFeeSchema = z.object({
  paidAmount: z.number().min(0, "Amount must be positive"),
});
