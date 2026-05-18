import api from "./axios";

export const dashboardAPI = {
  getStudentStats: () => api.get("/dashboard/student/stats"),
  getTeacherStats: () => api.get("/dashboard/teacher/stats"),
  getFranchiseStats: () => api.get("/dashboard/franchise/stats"),
  getAdminStats: () => api.get("/dashboard/super_admin/stats"),
};
