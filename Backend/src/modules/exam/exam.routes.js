import { Router } from "express";
import { scheduleExam, getExams, publishResults } from "./exam.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard(["teacher", "franchise_owner"]), scheduleExam);
router.get("/", getExams);
router.post("/:id/publish", roleGuard(["super_admin", "franchise_owner"]), publishResults);

export default router;
