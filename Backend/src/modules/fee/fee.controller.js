import { Fee } from "./fee.model.js";
import { Student } from "../student/student.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { nanoid } from "nanoid";

/**
 * Record a fee payment
 */
export const collectFee = asyncHandler(async (req, res) => {
  const { studentId, courseId, amount, paymentMethod, transactionId } = req.body;

  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const receiptNumber = `REC-${nanoid(8).toUpperCase()}`;

  const fee = await Fee.create({
    studentId,
    courseId,
    amount,
    paymentMethod,
    transactionId,
    receiptNumber,
    franchiseId: student.franchiseId,
  });

  return res.status(201).json(new ApiResponse(201, fee, "Fee payment recorded successfully"));
});

/**
 * Get fee history for a student
 */
export const getFeeHistory = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const history = await Fee.find({ studentId }).sort({ paymentDate: -1 });
  return res.status(200).json(new ApiResponse(200, history, "Fee history fetched"));
});

/**
 * Get all fees (Franchise or Super Admin)
 */
export const getAllFees = asyncHandler(async (req, res) => {
  const query = {};
  if (req.user.role !== 'super_admin') {
    query.franchiseId = req.user.franchiseId;
  }

  const fees = await Fee.find(query).populate("studentId", "registrationNumber").populate("courseId", "name");
  return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
});
