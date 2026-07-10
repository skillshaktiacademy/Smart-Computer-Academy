import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const publicAPI = {
  getCourses: () => api.get(ENDPOINTS.PUBLIC.COURSES),
  getFranchises: () => api.get(ENDPOINTS.PUBLIC.FRANCHISES),
  getGallery: () => api.get(ENDPOINTS.PUBLIC.GALLERY),
  getTestimonials: () => api.get(ENDPOINTS.PUBLIC.TESTIMONIALS),
  getCourseBySlug: (slug) => api.get(ENDPOINTS.PUBLIC.COURSE_BY_SLUG(slug)),
  getResultByEnrollmentNo: (enrollmentNo) => api.get(ENDPOINTS.PUBLIC.RESULT_BY_ENROLLMENT_NO(enrollmentNo)),
  // Verification lives in the certificate module's own public endpoint,
  // not under /public — the old /public/verify-certificate handler was a
  // broken duplicate and has been removed from the backend.
  verifyCertificate: (certNo) => api.get(ENDPOINTS.CERTIFICATE.VERIFY(certNo)),
  submitInquiry: (data) => api.post(ENDPOINTS.PUBLIC.CONTACT, data),
};
