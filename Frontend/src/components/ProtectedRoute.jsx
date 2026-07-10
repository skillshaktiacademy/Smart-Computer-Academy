import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleHome } from "../utils/roleHome";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Not logged in → go to login, preserve intended destination
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role not allowed → redirect to their own dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  // 3. Authorised → render child routes
  return <Outlet />;
}
