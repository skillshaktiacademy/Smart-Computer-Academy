/**
 * Centralized registry of backend API paths (relative to VITE_API_BASE_URL,
 * see src/api/axios.js). Keeps every literal path string in one place so a
 * backend route rename only ever needs to happen here, not hunted across
 * every api/*.js module.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY: "/auth/verify",
    RESEND: "/auth/resend",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
    CURRENT_USER: "/auth/current-user",
    UPDATE_PROFILE: "/auth/update-profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  DASHBOARD: {
    STUDENT_STATS: "/dashboard/student/stats",
    TEACHER_STATS: "/dashboard/teacher/stats",
    FRANCHISE_STATS: "/dashboard/franchise/stats",
    ADMIN_STATS: "/dashboard/admin/stats",
  },

  PUBLIC: {
    COURSES: "/public/courses",
    COURSE_BY_SLUG: (slug) => `/public/courses/${slug}`,
    FRANCHISES: "/public/franchises",
    GALLERY: "/public/gallery",
    TESTIMONIALS: "/public/testimonials",
    RESULT_BY_ENROLLMENT_NO: (enrollmentNo) => `/public/results/${enrollmentNo}`,
    CONTACT: "/public/contact",
  },

  ADMIN: {
    FRANCHISES: "/franchises",
    FRANCHISE_BY_ID: (id) => `/franchises/${id}`,
    COURSES: "/courses",
    COURSE_BY_ID: (id) => `/courses/${id}`,
    NOTICES: "/notices",
    NOTICE_BY_ID: (id) => `/notices/${id}`,
    STUDENTS: "/students",
    CERTIFICATES: "/certificates",
    COUPONS: "/coupons",
    COUPON_BY_ID: (id) => `/coupons/${id}`,
    VALIDATE_COUPON: "/coupons/validate",
  },

  FRANCHISE: {
    ADMIT_STUDENT: "/students",
    STUDENTS: "/students",
    MY_CENTER_STUDENTS: "/students/my-center",
    COLLECT_FEE: (enrollmentId) => `/enrollments/${enrollmentId}/fee`,
    STUDENT_FEE_HISTORY: (studentId) => `/fees/student/${studentId}`,
    FEE_HISTORY: "/fees",
    MY_CENTER_EXAMS: "/exams/my-center",
    CREATE_EXAM: "/exams",
    MY_CENTER_MATERIALS: "/materials/my-center",
    ATTENDANCE_BY_DATE: (date) => `/attendance/date/${date}`,
    CREATE_ENROLLMENT: "/enrollments",
  },

  STUDENT: {
    PROFILE: (enrollmentNo) => `/students/${enrollmentNo}`,
    MY_ATTENDANCE: "/attendance/my-records",
    MY_RESULTS: "/results/my-results",
    MY_FEES: "/fees/my-history",
    MY_CERTIFICATES: "/certificates/my",
    MY_MATERIALS: "/materials/my-course",
  },

  TEACHER: {
    STUDENTS: "/students",
    MY_STUDENTS: "/students/my-students",
    MARK_ATTENDANCE: "/attendance/mark",
    ATTENDANCE_BY_DATE: (date) => `/attendance/date/${date}`,
    ATTENDANCE_HISTORY: "/attendance",
    MY_CENTER_EXAMS: "/exams/my-center",
    EXAM_STUDENTS: (examId) => `/exams/${examId}/students`,
    ADD_RESULT: "/results",
    RESULTS: "/results",
    UPLOAD_MATERIAL: "/materials",
    MY_MATERIALS: "/materials",
    MY_CENTER_MATERIALS: "/materials/my-center",
    MATERIAL_BY_ID: (id) => `/materials/${id}`,
  },

  CERTIFICATE: {
    VERIFY: (certificateNo) => `/certificates/verify/${certificateNo}`,
    GENERATE: (enrollmentId) => `/certificates/generate/${enrollmentId}`,
  },
};
