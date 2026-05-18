import api from "./axios";

export const studentAPI = {
  getProfile: (enrollmentNo) => api.get(`/students/${enrollmentNo}`),
  getMyAttendance: (params) => api.get("/attendance/my-records", { params }),
  getMyResults: () => api.get("/exams/my-results"),
  getMyFees: () => api.get("/fees/my-history"),
  getMyCertificates: () => api.get("/certificates/my"),
  getMyMaterials: () => api.get("/materials/my-course"),
};
