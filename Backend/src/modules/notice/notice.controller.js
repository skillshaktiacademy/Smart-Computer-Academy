import { NoticeService } from "./notice.service.js";
import { ApiResponse, asyncHandler } from "../../shared/utils/api.utils.js";

/**
 * Create a notice
 */
export const createNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.createNotice(req.body, req.user);
  return res.status(201).json(new ApiResponse(201, notice, "Notice created successfully"));
});

/**
 * Get notices for the current user
 */
export const getMyNotices = asyncHandler(async (req, res) => {
  const notices = await NoticeService.getMyNotices(req.user);
  return res.status(200).json(new ApiResponse(200, notices, "Notices fetched successfully"));
});
