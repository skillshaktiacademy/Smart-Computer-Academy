import { Franchise } from "./franchise.model.js";
import { User } from "../user/user.model.js";
import { Student } from "../student/student.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Course } from "../course/course.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../config/cloudinary.js";
import mongoose from "mongoose";

/**
 * Create a new franchise and its owner account (Super Admin only)
 */
export const createFranchise = asyncHandler(async (req, res) => {
  const { name, ownerName, ownerEmail, ownerPhone, ownerPassword, address, phone, email, affiliationCertificateNo, isHeadBranch } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create Owner User Account
    const existingUser = await User.findOne({ email: ownerEmail }).session(session);
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create([{
      name: ownerName,
      email: ownerEmail,
      phone: ownerPhone,
      password: ownerPassword,
      role: "franchise_owner",
      isEmailVerified: true, // Auto-verified by admin action
    }], { session });

    // 2. Create Franchise
    const franchise = await Franchise.create([{
      name,
      ownerUserId: user[0]._id,
      address,
      phone,
      email,
      affiliationCertificateNo,
      isHeadBranch: isHeadBranch || false,
      status: "active", // Default active when created by admin
      approvedBy: req.user._id,
      approvedAt: new Date(),
    }], { session });

    // 3. Link user to franchise
    user[0].franchiseId = franchise[0]._id;
    await user[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(new ApiResponse(201, franchise[0], "Franchise and Owner account created successfully"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

/**
 * Get all franchises with pagination
 */
export const getAllFranchises = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const aggregate = Franchise.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "ownerUserId",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        "owner.password": 0,
        "owner.refreshToken": 0,
      },
    },
  ]);

  // If not super_admin, only show their own
  if (req.user.role !== "super_admin") {
    aggregate.match({ _id: req.user.franchiseId });
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const franchises = await Franchise.aggregatePaginate(aggregate, options);

  return res.status(200).json(new ApiResponse(200, franchises, "Franchises fetched successfully"));
});

/**
 * Update franchise details
 */
export const updateFranchise = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, affiliationCertificateNo } = req.body;

  const franchise = await Franchise.findById(id);
  if (!franchise) {
    throw new ApiError(404, "Franchise not found");
  }

  // Permission check
  if (req.user.role !== "super_admin" && req.user.franchiseId.toString() !== id) {
    throw new ApiError(403, "You do not have permission to update this franchise");
  }

  if (name) franchise.name = name;
  if (address) franchise.address = address;
  if (phone) franchise.phone = phone;
  if (email) franchise.email = email;
  if (affiliationCertificateNo) franchise.affiliationCertificateNo = affiliationCertificateNo;

  if (req.file) {
    const logoLocalPath = req.file.path;
    const logo = await uploadOnCloudinary(logoLocalPath);
    if (logo) {
      franchise.logo = { url: logo.url, public_id: logo.public_id };
    }
  }

  await franchise.save();

  return res.status(200).json(new ApiResponse(200, franchise, "Franchise updated successfully"));
});

/**
 * Update franchise status (Super Admin only)
 */
export const updateFranchiseStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive", "pending"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const franchise = await Franchise.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!franchise) {
    throw new ApiError(404, "Franchise not found");
  }

  return res.status(200).json(new ApiResponse(200, franchise, `Franchise status updated to ${status}`));
});

/**
 * Get franchise stats
 */
export const getFranchiseStats = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const studentCount = await Student.countDocuments({ franchiseId: id });
  const activeCoursesCount = await Course.countDocuments({ 
    isActive: true,
    $or: [{ franchiseId: null }, { franchiseId: id }]
  });
  
  const revenueData = await Enrollment.aggregate([
    { $match: { franchiseId: new mongoose.Types.ObjectId(id) } },
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } }
  ]);

  const stats = {
    studentCount,
    activeCoursesCount,
    totalRevenue: revenueData.length > 0 ? revenueData[0].totalRevenue : 0,
  };

  return res.status(200).json(new ApiResponse(200, stats, "Franchise stats fetched successfully"));
});
