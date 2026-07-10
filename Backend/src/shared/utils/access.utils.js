import { ApiError } from "./api.utils.js";
import { ROLES } from "../constants/roles.js";

/**
 * Authorization check shared by every "fetch a specific student's records"
 * endpoint (profile, attendance, fees, results, certificates, enrollments).
 * Without this, any authenticated user could pass an arbitrary studentId/
 * enrollmentNo and read another student's data — a broken-access-control
 * (IDOR) issue, made worse by enrollment numbers being sequential
 * (SSA-2026-00001, 00002, ...) and therefore trivially enumerable.
 *
 * - super_admin: full access.
 * - franchise_owner / teacher: only students belonging to their own franchise.
 * - student: only their own linked profile.
 *
 * @param {object} requestingUser - req.user (from verifyJWT)
 * @param {object} student - the Student document being accessed
 */
export function assertCanAccessStudent(requestingUser, student) {
  if (!student) throw new ApiError(404, "Student not found");

  if (requestingUser.role === ROLES.SUPER_ADMIN) return;

  if (requestingUser.role === ROLES.FRANCHISE_OWNER || requestingUser.role === ROLES.TEACHER) {
    if (student.franchiseId?.toString() === requestingUser.franchiseId?.toString()) return;
    throw new ApiError(403, "You do not have permission to access this student's records");
  }

  if (requestingUser.role === ROLES.STUDENT) {
    if (student.userId?.toString() === requestingUser._id?.toString()) return;
    throw new ApiError(403, "You do not have permission to access this student's records");
  }

  throw new ApiError(403, "You do not have permission to access this student's records");
}
