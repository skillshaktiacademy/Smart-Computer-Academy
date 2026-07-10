import { Router } from "express";
import { createNotice, getMyNotices } from "./notice.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), createNotice);
router.get("/my", getMyNotices);

export default router;
