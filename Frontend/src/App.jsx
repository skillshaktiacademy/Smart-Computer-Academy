import { Routes, Route, Navigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/public/Home";
import Courses from "./pages/public/Courses";
import CourseDetail from "./pages/public/CourseDetail";
import About from "./pages/public/About";
import Gallery from "./pages/public/Gallery";
import Contact from "./pages/public/Contact";
import Franchise from "./pages/public/Franchise";
import VerifyCertificate from "./pages/public/VerifyCertificate";
import StudentResult from "./pages/public/StudentResult";

// Auth Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Super Admin Pages
import AdminDashboard from "./pages/dashboard/super_admin/AdminDashboard";
import FranchiseManagement from "./pages/dashboard/super_admin/FranchiseManagement";
import CourseManagement from "./pages/dashboard/super_admin/CourseManagement";
import StudentManagement from "./pages/dashboard/super_admin/StudentManagement";
import CertificateManagement from "./pages/dashboard/super_admin/CertificateManagement";
import NoticeManagement from "./pages/dashboard/super_admin/NoticeManagement";
import AdminReports from "./pages/dashboard/super_admin/AdminReports";

// Franchise Pages
import FranchiseDashboard from "./pages/dashboard/franchise/FranchiseDashboard";
import StudentAdmission from "./pages/dashboard/franchise/StudentAdmission";
import FranchiseStudents from "./pages/dashboard/franchise/FranchiseStudents";
import FeeCollection from "./pages/dashboard/franchise/FeeCollection";
import FranchiseAttendance from "./pages/dashboard/franchise/FranchiseAttendance";
import FranchiseExams from "./pages/dashboard/franchise/FranchiseExams";
import FranchiseMaterials from "./pages/dashboard/franchise/FranchiseMaterials";

// Teacher Pages
import TeacherDashboard from "./pages/dashboard/teacher/TeacherDashboard";
import TeacherAttendance from "./pages/dashboard/teacher/TeacherAttendance";
import TeacherResults from "./pages/dashboard/teacher/TeacherResults";
import TeacherMaterials from "./pages/dashboard/teacher/TeacherMaterials";

// Student Pages
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import MyAttendance from "./pages/dashboard/student/MyAttendance";
import MyResults from "./pages/dashboard/student/MyResults";
import MyCertificates from "./pages/dashboard/student/MyCertificates";
import MyFees from "./pages/dashboard/student/MyFees";
import MyMaterials from "./pages/dashboard/student/MyMaterials";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/student-result" element={<StudentResult />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Super Admin Section */}
          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route path="super_admin">
              <Route index element={<AdminDashboard />} />
              <Route path="franchises" element={<FranchiseManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="certificates" element={<CertificateManagement />} />
              <Route path="notices" element={<NoticeManagement />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
          </Route>

          {/* Franchise Section */}
          <Route element={<ProtectedRoute allowedRoles={["franchise"]} />}>
            <Route path="franchise">
              <Route index element={<FranchiseDashboard />} />
              <Route path="admission" element={<StudentAdmission />} />
              <Route path="students" element={<FranchiseStudents />} />
              <Route path="fees" element={<FeeCollection />} />
              <Route path="attendance" element={<FranchiseAttendance />} />
              <Route path="exams" element={<FranchiseExams />} />
              <Route path="materials" element={<FranchiseMaterials />} />
            </Route>
          </Route>

          {/* Teacher Section */}
          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="teacher">
              <Route index element={<TeacherDashboard />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="results" element={<TeacherResults />} />
              <Route path="materials" element={<TeacherMaterials />} />
            </Route>
          </Route>

          {/* Student Section */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="student">
              <Route index element={<StudentDashboard />} />
              <Route path="attendance" element={<MyAttendance />} />
              <Route path="results" element={<MyResults />} />
              <Route path="certificates" element={<MyCertificates />} />
              <Route path="fees" element={<MyFees />} />
              <Route path="materials" element={<MyMaterials />} />
            </Route>
          </Route>
          
          <Route index element={<Navigate to="student" replace />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<div className="flex items-center justify-center h-screen flex-col">
          <h1 className="text-4xl font-black mb-4">404 - Page Not Found</h1>
          <Link to="/" className="text-primary font-bold hover:underline">Go Back Home</Link>
        </div>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
