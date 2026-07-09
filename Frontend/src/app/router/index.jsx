import { useRoutes, Link } from "react-router-dom";
import publicRoutes from "./public.routes";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";

const NotFound = () => (
  <div className="flex items-center justify-center h-screen flex-col">
    <h1 className="text-4xl font-black mb-4">404 - Page Not Found</h1>
    <Link to="/" className="text-primary font-bold hover:underline">
      Go Back Home
    </Link>
  </div>
);

// Central route registry — each access area contributes its own route config.
export default function AppRouter() {
  return useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...dashboardRoutes,
    { path: "*", element: <NotFound /> },
  ]);
}
