import { Router } from "express";
import {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "./coupon.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), createCoupon);
router.get("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), getAllCoupons);
router.patch("/:id", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), updateCoupon);
router.delete("/:id", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), deleteCoupon);

// Live discount preview from the enrollment/admission form
router.post("/validate", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), validateCoupon);

export default router;
