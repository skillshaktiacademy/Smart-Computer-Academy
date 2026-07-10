import { Router } from "express";
import { collectFee, getFeeHistory, getMyFeeHistory, getAllFees } from "./fee.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), collectFee);
router.get("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), getAllFees);
router.get("/my-history", roleGuard([ROLES.STUDENT]), getMyFeeHistory);
router.get("/student/:studentId", getFeeHistory);

export default router;
