import api from "../../../lib/axios";

export const publicAPI = {
  getCourses: () => api.get("/public/courses"),
  getFranchises: () => api.get("/public/franchises"),
  getGallery: () => api.get("/public/gallery"),
  getTestimonials: () => api.get("/public/testimonials"),
  getCourseBySlug: (slug) => api.get(`/public/courses/${slug}`),
  getResultByEnrollmentNo: (enrollmentNo) => api.get(`/public/results/${enrollmentNo}`),
  verifyCertificate: (certNo) => api.get(`/public/verify-certificate/${certNo}`),
  submitInquiry: (data) => api.post("/public/contact", data),
};
