import { Router } from "express";
import { submitResults, getStudentResults, getExamResults } from "./exam.controller.js";
import { verifyJWT, roleGuard } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard(["teacher"]), submitResults);
router.get("/student/:id", getStudentResults);
router.get("/exam/:examId", roleGuard(["super_admin", "franchise_owner", "teacher"]), getExamResults);

export default router;
