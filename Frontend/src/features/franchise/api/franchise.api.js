import api from "../../../lib/axios";

export const franchiseAPI = {
  admitStudent: (data) => api.post("/students", data),
  getStudents: (params) => api.get("/students", { params }),
  getStudentsMyCenter: () => api.get("/students/my-center"),
  collectFee: (enrollmentId, data) => api.patch(`/enrollments/${enrollmentId}/fee`, data),
  getStudentFeeHistory: (studentId) => api.get(`/fees/student/${studentId}`),
  getFeeHistory: (params) => api.get("/fees", { params }),
  getExamsMyCenter: () => api.get("/exams/my-center"),
  createExam: (data) => api.post("/exams", data),
  getMaterialsMyCenter: () => api.get("/materials/my-center"),
  getAttendanceByDate: (date) => api.get(`/attendance/date/${date}`),
};
