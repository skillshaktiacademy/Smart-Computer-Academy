import { Notice } from "./notice.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * Create a notice
 */
export const createNotice = asyncHandler(async (req, res) => {
  const { title, content, targetRoles } = req.body;

  const notice = await Notice.create({
    title,
    content,
    targetRoles,
    franchiseId: req.user.role === 'super_admin' ? null : req.user.franchiseId,
  });

  return res.status(201).json(new ApiResponse(201, notice, "Notice created successfully"));
});

/**
 * Get notices for the current user
 */
export const getMyNotices = asyncHandler(async (req, res) => {
  const query = {
    isActive: true,
    $or: [
      { targetRoles: "all" },
      { targetRoles: req.user.role },
    ],
    $and: [
      { $or: [{ franchiseId: null }, { franchiseId: req.user.franchiseId }] }
    ]
  };

  const notices = await Notice.find(query).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, notices, "Notices fetched successfully"));
});
