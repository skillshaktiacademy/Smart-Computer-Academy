import { Router } from "express";
import {
  createFranchise,
  getAllFranchises,
  updateFranchise,
  updateFranchiseStatus,
  getFranchiseStats,
} from "./franchise.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

// Super Admin only: Create franchise + owner
router.post("/", roleGuard([ROLES.SUPER_ADMIN]), createFranchise);

// Super Admin: List all; Franchise Owner: their own
router.get("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), getAllFranchises);

// Update details
router.patch("/:id", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), upload.single("logo"), updateFranchise);

// Super Admin only: Update status
router.patch("/:id/status", roleGuard([ROLES.SUPER_ADMIN]), updateFranchiseStatus);

// Get stats
router.get("/:id/stats", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), getFranchiseStats);

export default router;
