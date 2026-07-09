import { lazy } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Super Admin pages (lazy loaded)
const AdminDashboard = lazy(() => import("../../features/admin/pages/AdminDashboard"));
const FranchiseManagement = lazy(() => import("../../features/admin/pages/FranchiseManagement"));
const CourseManagement = lazy(() => import("../../features/admin/pages/CourseManagement"));
const StudentManagement = lazy(() => import("../../features/admin/pages/StudentManagement"));
const CertificateManagement = lazy(() => import("../../features/admin/pages/CertificateManagement"));
const NoticeManagement = lazy(() => import("../../features/admin/pages/NoticeManagement"));
const AdminReports = lazy(() => import("../../features/admin/pages/AdminReports"));

// Franchise pages (lazy loaded)
const FranchiseDashboard = lazy(() => import("../../features/franchise/pages/FranchiseDashboard"));
const StudentAdmission = lazy(() => import("../../features/franchise/pages/StudentAdmission"));
const FranchiseStudents = lazy(() => import("../../features/franchise/pages/FranchiseStudents"));
const FeeCollection = lazy(() => import("../../features/franchise/pages/FeeCollection"));
const FranchiseAttendance = lazy(() => import("../../features/franchise/pages/FranchiseAttendance"));
const FranchiseExams = lazy(() => import("../../features/franchise/pages/FranchiseExams"));
const FranchiseMaterials = lazy(() => import("../../features/franchise/pages/FranchiseMaterials"));

// Teacher pages (lazy loaded)
const TeacherDashboard = lazy(() => import("../../features/teacher/pages/TeacherDashboard"));
const TeacherAttendance = lazy(() => import("../../features/teacher/pages/TeacherAttendance"));
const TeacherResults = lazy(() => import("../../features/teacher/pages/TeacherResults"));
const TeacherMaterials = lazy(() => import("../../features/teacher/pages/TeacherMaterials"));

// Student pages (lazy loaded)
const StudentDashboard = lazy(() => import("../../features/student/pages/StudentDashboard"));
const MyAttendance = lazy(() => import("../../features/student/pages/MyAttendance"));
const MyResults = lazy(() => import("../../features/student/pages/MyResults"));
const MyCertificates = lazy(() => import("../../features/student/pages/MyCertificates"));
const MyFees = lazy(() => import("../../features/student/pages/MyFees"));
const MyMaterials = lazy(() => import("../../features/student/pages/MyMaterials"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Super Admin section
      {
        element: <ProtectedRoute allowedRoles={["super_admin"]} />,
        children: [
          {
            path: "super_admin",
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "franchises", element: <FranchiseManagement /> },
              { path: "courses", element: <CourseManagement /> },
              { path: "students", element: <StudentManagement /> },
              { path: "certificates", element: <CertificateManagement /> },
              { path: "notices", element: <NoticeManagement /> },
              { path: "reports", element: <AdminReports /> },
            ],
          },
        ],
      },
      // Franchise section
      {
        element: <ProtectedRoute allowedRoles={["franchise"]} />,
        children: [
          {
            path: "franchise",
            children: [
              { index: true, element: <FranchiseDashboard /> },
              { path: "admission", element: <StudentAdmission /> },
              { path: "students", element: <FranchiseStudents /> },
              { path: "fees", element: <FeeCollection /> },
              { path: "attendance", element: <FranchiseAttendance /> },
              { path: "exams", element: <FranchiseExams /> },
              { path: "materials", element: <FranchiseMaterials /> },
            ],
          },
        ],
      },
      // Teacher section
      {
        element: <ProtectedRoute allowedRoles={["teacher"]} />,
        children: [
          {
            path: "teacher",
            children: [
              { index: true, element: <TeacherDashboard /> },
              { path: "attendance", element: <TeacherAttendance /> },
              { path: "results", element: <TeacherResults /> },
              { path: "materials", element: <TeacherMaterials /> },
            ],
          },
        ],
      },
      // Student section
      {
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
          {
            path: "student",
            children: [
              { index: true, element: <StudentDashboard /> },
              { path: "attendance", element: <MyAttendance /> },
              { path: "results", element: <MyResults /> },
              { path: "certificates", element: <MyCertificates /> },
              { path: "fees", element: <MyFees /> },
              { path: "materials", element: <MyMaterials /> },
            ],
          },
        ],
      },
      // Default dashboard landing
      { index: true, element: <Navigate to="student" replace /> },
    ],
  },
];

export default dashboardRoutes;
