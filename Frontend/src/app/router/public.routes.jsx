import { lazy } from "react";
import PublicLayout from "../../components/layout/PublicLayout";

// Public site pages (lazy loaded)
const Home = lazy(() => import("../../features/public-site/pages/Home"));
const Courses = lazy(() => import("../../features/public-site/pages/Courses"));
const CourseDetail = lazy(() => import("../../features/public-site/pages/CourseDetail"));
const About = lazy(() => import("../../features/public-site/pages/About"));
const Gallery = lazy(() => import("../../features/public-site/pages/Gallery"));
const Contact = lazy(() => import("../../features/public-site/pages/Contact"));
const Franchise = lazy(() => import("../../features/public-site/pages/Franchise"));
const VerifyCertificate = lazy(() => import("../../features/public-site/pages/VerifyCertificate"));
const StudentResult = lazy(() => import("../../features/public-site/pages/StudentResult"));
const Enquiry = lazy(() => import("../../features/public-site/pages/Enquiry"));

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:slug", element: <CourseDetail /> },
      { path: "/about", element: <About /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/contact", element: <Contact /> },
      { path: "/franchise", element: <Franchise /> },
      { path: "/verify-certificate", element: <VerifyCertificate /> },
      { path: "/student-result", element: <StudentResult /> },
      { path: "/enquiry/:slug", element: <Enquiry /> },
    ],
  },
];

export default publicRoutes;
