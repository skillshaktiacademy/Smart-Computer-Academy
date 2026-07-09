
import api from "./axios";

export const teacherAPI = {
  getFranchiseStudents: () => api.get("/students"),
  getMyStudents: () => api.get("/students/my-students"),
  markAttendance: (data) => api.post("/attendance/mark", data),
  getAttendanceByDate: (date) => api.get(`/attendance/date/${date}`),
  getAttendanceHistory: (params) => api.get("/attendance", { params }),
  getExamsMyCenter: () => api.get("/exams/my-center"),
  getExamStudents: (examId) => api.get(`/exams/${examId}/students`),
  addResult: (data) => api.post("/results", data),
  getResults: (params) => api.get("/results", { params }),
  uploadMaterial: (data) => api.post("/materials", data),
  getMyMaterials: () => api.get("/materials"),
  getMaterialsMyCenter: () => api.get("/materials/my-center"),
  deleteMaterial: (id) => api.delete(`/materials/${id}`),
};
