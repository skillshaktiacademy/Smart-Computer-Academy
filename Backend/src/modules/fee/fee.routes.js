import { Router } from "express";
import { collectFee, getFeeHistory, getAllFees } from "./fee.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard(["super_admin", "franchise_owner"]), collectFee);
router.get("/", roleGuard(["super_admin", "franchise_owner"]), getAllFees);
router.get("/student/:studentId", getFeeHistory);

export default router;
