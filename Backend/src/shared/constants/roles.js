/**
 * Centralized role enum for SCA. Import ROLES instead of hardcoding role
 * strings so a rename only ever needs to happen here.
 */
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  FRANCHISE_OWNER: "franchise_owner",
  TEACHER: "teacher",
  STUDENT: "student",
};

export const ALL_ROLES = Object.values(ROLES);

/** Roles that manage a franchise center's day-to-day operations. */
export const STAFF_ROLES = [ROLES.FRANCHISE_OWNER, ROLES.TEACHER];

export function isValidRole(role) {
  return ALL_ROLES.includes(role);
}
