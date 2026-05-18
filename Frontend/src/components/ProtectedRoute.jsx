import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ROLE_HOME = {
  student:    "/dashboard/student",
  teacher:    "/dashboard/teacher",
  franchise:  "/dashboard/franchise",
  super_admin: "/dashboard/super_admin",
};

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Not logged in → go to login, preserve intended destination
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role not allowed → redirect to their own dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const home = ROLE_HOME[user.role] ?? "/";
    return <Navigate to={home} replace />;
  }

  // 3. Authorised → render child routes
  return <Outlet />;
}
