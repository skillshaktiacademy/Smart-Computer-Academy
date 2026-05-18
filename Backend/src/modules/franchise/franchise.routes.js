import { Router } from "express";
import {
  createFranchise,
  getAllFranchises,
  updateFranchise,
  updateFranchiseStatus,
  getFranchiseStats,
} from "./franchise.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { createFranchiseSchema, updateFranchiseSchema } from "./franchise.validator.js";
import { ApiError } from "../../utils/ApiError.js";

const router = Router();

/**
 * Middleware to validate request body using Zod schema
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors?.map((err) => err.message).join(", ") || error.message;
    next(new ApiError(400, errorMessage));
  }
};

router.use(verifyJWT);

// Super Admin only: Create franchise + owner
router.post("/", roleGuard(["super_admin"]), validate(createFranchiseSchema), createFranchise);

// Super Admin: List all; Franchise Owner: their own
router.get("/", roleGuard(["super_admin", "franchise_owner"]), getAllFranchises);

// Update details
router.patch("/:id", roleGuard(["super_admin", "franchise_owner"]), upload.single("logo"), validate(updateFranchiseSchema), updateFranchise);

// Super Admin only: Update status
router.patch("/:id/status", roleGuard(["super_admin"]), updateFranchiseStatus);

// Get stats
router.get("/:id/stats", roleGuard(["super_admin", "franchise_owner"]), getFranchiseStats);

export default router;
