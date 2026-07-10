import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const teacherAPI = {
  getFranchiseStudents: () => api.get(ENDPOINTS.TEACHER.STUDENTS),
  getMyStudents: () => api.get(ENDPOINTS.TEACHER.MY_STUDENTS),
  markAttendance: (data) => api.post(ENDPOINTS.TEACHER.MARK_ATTENDANCE, data),
  getAttendanceByDate: (date) => api.get(ENDPOINTS.TEACHER.ATTENDANCE_BY_DATE(date)),
  getAttendanceHistory: (params) => api.get(ENDPOINTS.TEACHER.ATTENDANCE_HISTORY, { params }),
  getExamsMyCenter: () => api.get(ENDPOINTS.TEACHER.MY_CENTER_EXAMS),
  getExamStudents: (examId) => api.get(ENDPOINTS.TEACHER.EXAM_STUDENTS(examId)),
  addResult: (data) => api.post(ENDPOINTS.TEACHER.ADD_RESULT, data),
  getResults: (params) => api.get(ENDPOINTS.TEACHER.RESULTS, { params }),
  uploadMaterial: (data) => api.post(ENDPOINTS.TEACHER.UPLOAD_MATERIAL, data),
  getMyMaterials: () => api.get(ENDPOINTS.TEACHER.MY_MATERIALS),
  getMaterialsMyCenter: () => api.get(ENDPOINTS.TEACHER.MY_CENTER_MATERIALS),
  deleteMaterial: (id) => api.delete(ENDPOINTS.TEACHER.MATERIAL_BY_ID(id)),
};
