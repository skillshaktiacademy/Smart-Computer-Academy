import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const adminAPI = {
  // Franchise Management
  getAllFranchises: () => api.get(ENDPOINTS.ADMIN.FRANCHISES),
  createFranchise: (data) => api.post(ENDPOINTS.ADMIN.FRANCHISES, data),
  updateFranchise: (id, data) => api.patch(ENDPOINTS.ADMIN.FRANCHISE_BY_ID(id), data),
  deleteFranchise: (id) => api.delete(ENDPOINTS.ADMIN.FRANCHISE_BY_ID(id)),

  // Course Management
  createCourse: (data) => api.post(ENDPOINTS.ADMIN.COURSES, data),
  updateCourse: (id, data) => api.patch(ENDPOINTS.ADMIN.COURSE_BY_ID(id), data),
  deleteCourse: (id) => api.delete(ENDPOINTS.ADMIN.COURSE_BY_ID(id)),

  // Notice Management
  getAllNotices: () => api.get(ENDPOINTS.ADMIN.NOTICES),
  createNotice: (data) => api.post(ENDPOINTS.ADMIN.NOTICES, data),
  updateNotice: (id, data) => api.patch(ENDPOINTS.ADMIN.NOTICE_BY_ID(id), data),
  deleteNotice: (id) => api.delete(ENDPOINTS.ADMIN.NOTICE_BY_ID(id)),

  // Student Management
  getAllStudents: (params) => api.get(ENDPOINTS.ADMIN.STUDENTS, { params }),

  // Certificate Management
  issueCertificate: (data) => api.post(ENDPOINTS.ADMIN.CERTIFICATES, data),
  getAllCertificates: () => api.get(ENDPOINTS.ADMIN.CERTIFICATES),

  // Coupon Management
  getAllCoupons: () => api.get(ENDPOINTS.ADMIN.COUPONS),
  createCoupon: (data) => api.post(ENDPOINTS.ADMIN.COUPONS, data),
  updateCoupon: (id, data) => api.patch(ENDPOINTS.ADMIN.COUPON_BY_ID(id), data),
  deleteCoupon: (id) => api.delete(ENDPOINTS.ADMIN.COUPON_BY_ID(id)),
  validateCoupon: (data) => api.post(ENDPOINTS.ADMIN.VALIDATE_COUPON, data),
};
