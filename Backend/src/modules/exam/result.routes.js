import { Router } from "express";
import { submitResults, getStudentResults, getMyResults, getExamResults } from "./result.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard([ROLES.TEACHER]), submitResults);
router.get("/my-results", roleGuard([ROLES.STUDENT]), getMyResults);
router.get("/student/:id", getStudentResults);
router.get("/exam/:examId", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getExamResults);

export default router;
