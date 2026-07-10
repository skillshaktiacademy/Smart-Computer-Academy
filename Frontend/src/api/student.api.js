import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const studentAPI = {
  getProfile: (enrollmentNo) => api.get(ENDPOINTS.STUDENT.PROFILE(enrollmentNo)),
  getMyAttendance: (params) => api.get(ENDPOINTS.STUDENT.MY_ATTENDANCE, { params }),
  getMyResults: () => api.get(ENDPOINTS.STUDENT.MY_RESULTS),
  getMyFees: () => api.get(ENDPOINTS.STUDENT.MY_FEES),
  getMyCertificates: () => api.get(ENDPOINTS.STUDENT.MY_CERTIFICATES),
  getMyMaterials: () => api.get(ENDPOINTS.STUDENT.MY_MATERIALS),
};
