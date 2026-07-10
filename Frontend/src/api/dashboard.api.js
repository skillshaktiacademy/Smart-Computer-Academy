import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const dashboardAPI = {
  getStudentStats: () => api.get(ENDPOINTS.DASHBOARD.STUDENT_STATS),
  getTeacherStats: () => api.get(ENDPOINTS.DASHBOARD.TEACHER_STATS),
  getFranchiseStats: () => api.get(ENDPOINTS.DASHBOARD.FRANCHISE_STATS),
  getAdminStats: () => api.get(ENDPOINTS.DASHBOARD.ADMIN_STATS),
};
