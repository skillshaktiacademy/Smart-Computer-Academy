import api from "./axios";

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (data) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  verifyOTP: (data) => api.post("/auth/verify", data),
  resendOTP: (data) => api.post("/auth/resend", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  getCurrentUser: () => api.get("/auth/current-user"),
  updateProfile: (data) => api.patch("/auth/update-profile", data),
  changePassword: (data) => api.post("/auth/change-password", data),
};
