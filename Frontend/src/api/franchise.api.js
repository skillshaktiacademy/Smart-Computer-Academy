import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const franchiseAPI = {
  admitStudent: (data) => api.post(ENDPOINTS.FRANCHISE.ADMIT_STUDENT, data),
  getStudents: (params) => api.get(ENDPOINTS.FRANCHISE.STUDENTS, { params }),
  getStudentsMyCenter: () => api.get(ENDPOINTS.FRANCHISE.MY_CENTER_STUDENTS),
  collectFee: (enrollmentId, data) => api.patch(ENDPOINTS.FRANCHISE.COLLECT_FEE(enrollmentId), data),
  getStudentFeeHistory: (studentId) => api.get(ENDPOINTS.FRANCHISE.STUDENT_FEE_HISTORY(studentId)),
  getFeeHistory: (params) => api.get(ENDPOINTS.FRANCHISE.FEE_HISTORY, { params }),
  getExamsMyCenter: () => api.get(ENDPOINTS.FRANCHISE.MY_CENTER_EXAMS),
  createExam: (data) => api.post(ENDPOINTS.FRANCHISE.CREATE_EXAM, data),
  getMaterialsMyCenter: () => api.get(ENDPOINTS.FRANCHISE.MY_CENTER_MATERIALS),
  getAttendanceByDate: (date) => api.get(ENDPOINTS.FRANCHISE.ATTENDANCE_BY_DATE(date)),
  validateCoupon: (data) => api.post(ENDPOINTS.ADMIN.VALIDATE_COUPON, data),
};
