import { lazy } from "react";

// Auth pages (lazy loaded)
const Register = lazy(() => import("../../features/auth/pages/Register"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const VerifyOTP = lazy(() => import("../../features/auth/pages/VerifyOTP"));
const ForgotPassword = lazy(() => import("../../features/auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../../features/auth/pages/ResetPassword"));

const authRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
];

export default authRoutes;
