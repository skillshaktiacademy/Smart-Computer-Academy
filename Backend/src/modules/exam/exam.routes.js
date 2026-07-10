import { Router } from "express";
import { scheduleExam, getExams, publishResults } from "./exam.controller.js";
import { verifyJWT, roleGuard } from "../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(verifyJWT);

router.post("/", roleGuard([ROLES.TEACHER, ROLES.FRANCHISE_OWNER]), scheduleExam);
router.get("/", getExams);
// getExams already scopes to the requester's own franchise for non-admins,
// so /my-center is just a clearer alias for that same behavior.
router.get("/my-center", roleGuard([ROLES.FRANCHISE_OWNER, ROLES.TEACHER]), getExams);
router.post("/:id/publish", roleGuard([ROLES.SUPER_ADMIN, ROLES.FRANCHISE_OWNER]), publishResults);

export default router;
