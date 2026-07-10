import api from "./axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const authAPI = {
  login: (credentials) => api.post(ENDPOINTS.AUTH.LOGIN, credentials),
  register: (data) => api.post(ENDPOINTS.AUTH.REGISTER, data),
  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
  verifyOTP: (data) => api.post(ENDPOINTS.AUTH.VERIFY, data),
  resendOTP: (data) => api.post(ENDPOINTS.AUTH.RESEND, data),
  forgotPassword: (data) => api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data),
  resetPassword: (token, data) => api.post(ENDPOINTS.AUTH.RESET_PASSWORD(token), data),
  getCurrentUser: () => api.get(ENDPOINTS.AUTH.CURRENT_USER),
  updateProfile: (data) => api.patch(ENDPOINTS.AUTH.UPDATE_PROFILE, data),
  changePassword: (data) => api.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
};
