// Single source of truth for user role -> dashboard home path.
//
// Note: a franchise owner's role value is "franchise_owner" (matches the
// backend User enum), while its URL segment is "franchise". Keep this map as
// the only place that bridges the two so navigation and guards stay in sync.
export const ROLE_HOME = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  franchise_owner: "/dashboard/franchise",
  super_admin: "/dashboard/super_admin",
};

export const getRoleHome = (role) => ROLE_HOME[role] ?? "/";
