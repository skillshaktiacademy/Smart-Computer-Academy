import mongoose from "mongoose";
import { Franchise } from "./franchise.model.js";
import { User } from "../user/user.model.js";
import { Student } from "../student/student.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { Course } from "../course/course.model.js";
import { ApiError } from "../../shared/utils/api.utils.js";
import { uploadOnCloudinary } from "../../shared/config/cloudinary.config.js";
import { ROLES } from "../../shared/constants/roles.js";

export class FranchiseService {
  /**
   * Creates a franchise and its owner User account atomically (both writes
   * succeed or both roll back).
   */
  static async createFranchise(data, approvedByUserId) {
    const {
      name, ownerName, ownerEmail, ownerPhone, ownerPassword,
      address, phone, email, affiliationCertificateNo, isHeadBranch,
    } = data;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({ email: ownerEmail }).session(session);
      if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
      }

      const user = await User.create(
        [{
          name: ownerName,
          email: ownerEmail,
          phone: ownerPhone,
          password: ownerPassword,
          role: ROLES.FRANCHISE_OWNER,
          isEmailVerified: true, // Auto-verified by admin action
        }],
        { session }
      );

      const franchise = await Franchise.create(
        [{
          name,
          ownerUserId: user[0]._id,
          address,
          phone,
          email,
          affiliationCertificateNo,
          isHeadBranch: isHeadBranch || false,
          status: "active", // Default active when created by admin
          approvedBy: approvedByUserId,
          approvedAt: new Date(),
        }],
        { session }
      );

      user[0].franchiseId = franchise[0]._id;
      await user[0].save({ session });

      await session.commitTransaction();
      return franchise[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async getAllFranchises({ page = 1, limit = 10, search = "" }, requestingUser) {
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
      { $project: { "owner.password": 0, "owner.refreshToken": 0 } },
    ]);

    if (requestingUser.role !== ROLES.SUPER_ADMIN) {
      aggregate.match({ _id: requestingUser.franchiseId });
    }

    return Franchise.aggregatePaginate(aggregate, { page: parseInt(page), limit: parseInt(limit) });
  }

  static async updateFranchise(id, data, requestingUser, file) {
    const franchise = await Franchise.findById(id);
    if (!franchise) throw new ApiError(404, "Franchise not found");

    if (requestingUser.role !== ROLES.SUPER_ADMIN && requestingUser.franchiseId.toString() !== id) {
      throw new ApiError(403, "You do not have permission to update this franchise");
    }

    const { name, address, phone, email, affiliationCertificateNo } = data;
    if (name) franchise.name = name;
    if (address) franchise.address = address;
    if (phone) franchise.phone = phone;
    if (email) franchise.email = email;
    if (affiliationCertificateNo) franchise.affiliationCertificateNo = affiliationCertificateNo;

    if (file) {
      const logo = await uploadOnCloudinary(file.path, { folder: "images/franchises", resourceType: "image" });
      if (logo) franchise.logo = { url: logo.url, public_id: logo.public_id };
    }

    await franchise.save();
    return franchise;
  }

  static async updateFranchiseStatus(id, status) {
    if (!["active", "inactive", "pending"].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const franchise = await Franchise.findByIdAndUpdate(id, { status }, { new: true });
    if (!franchise) throw new ApiError(404, "Franchise not found");
    return franchise;
  }

  static async getFranchiseStats(id) {
    const studentCount = await Student.countDocuments({ franchiseId: id });
    const activeCoursesCount = await Course.countDocuments({
      isActive: true,
      $or: [{ franchiseId: null }, { franchiseId: id }],
    });

    const revenueData = await Enrollment.aggregate([
      { $match: { franchiseId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    ]);

    return {
      studentCount,
      activeCoursesCount,
      totalRevenue: revenueData.length > 0 ? revenueData[0].totalRevenue : 0,
    };
  }
}
