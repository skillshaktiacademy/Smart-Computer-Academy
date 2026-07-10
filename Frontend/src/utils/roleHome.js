/**
 * Maps a backend role value (User.role) to its dashboard landing route.
 * Single source of truth so role→path never drifts out of sync again —
 * the dashboard URL segment for franchise owners is "/dashboard/franchise"
 * (a shorter, human-friendly path) while the actual role value is
 * "franchise_owner"; every place that redirects by role must go through
 * this map rather than templating `/dashboard/${user.role}` directly.
 */
export const ROLE_HOME = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  franchise_owner: "/dashboard/franchise",
  super_admin: "/dashboard/super_admin",
};

export const getRoleHome = (role) => ROLE_HOME[role] ?? "/";
