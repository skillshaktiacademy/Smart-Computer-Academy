import { Router } from "express";
import { createNotice, getMyNotices } from "./notice.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard(["super_admin", "franchise_owner"]), createNotice);
router.get("/my", getMyNotices);

export default router;
