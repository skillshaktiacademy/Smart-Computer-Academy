import api from "../../../lib/axios";

export const adminAPI = {
  // Franchise Management
  getAllFranchises: () => api.get("/franchises"),
  createFranchise: (data) => api.post("/franchises", data),
  updateFranchise: (id, data) => api.patch(`/franchises/${id}`, data),
  deleteFranchise: (id) => api.delete(`/franchises/${id}`),

  // Course Management
  createCourse: (data) => api.post("/courses", data),
  updateCourse: (id, data) => api.patch(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),

  // Notice Management
  getAllNotices: () => api.get("/notices"),
  createNotice: (data) => api.post("/notices", data),
  updateNotice: (id, data) => api.patch(`/notices/${id}`, data),
  deleteNotice: (id) => api.delete(`/notices/${id}`),

  // Student Management
  getAllStudents: (params) => api.get("/students", { params }),

  // Certificate Management
  issueCertificate: (data) => api.post("/certificates", data),
  getAllCertificates: () => api.get("/certificates"),

  // Reports
  getReports: (params) => api.get("/dashboard/admin/reports", { params }),
};
