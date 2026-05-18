import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

// Loading Fallback Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="w-10 h-10 animate-spin text-primary" />
  </div>
);

// Layouts (Keep eager if they are small and used everywhere)
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/public/Home"));
const Courses = lazy(() => import("./pages/public/Courses"));
const CourseDetail = lazy(() => import("./pages/public/CourseDetail"));
const About = lazy(() => import("./pages/public/About"));
const Gallery = lazy(() => import("./pages/public/Gallery"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Franchise = lazy(() => import("./pages/public/Franchise"));
const VerifyCertificate = lazy(() => import("./pages/public/VerifyCertificate"));
const StudentResult = lazy(() => import("./pages/public/StudentResult"));
const Enquiry = lazy(() => import("./pages/public/Enquiry"));

// Auth Pages (Lazy Loaded)
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const VerifyOTP = lazy(() => import("./pages/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// Super Admin Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import("./pages/dashboard/super_admin/AdminDashboard"));
const FranchiseManagement = lazy(() => import("./pages/dashboard/super_admin/FranchiseManagement"));
const CourseManagement = lazy(() => import("./pages/dashboard/super_admin/CourseManagement"));
const StudentManagement = lazy(() => import("./pages/dashboard/super_admin/StudentManagement"));
const CertificateManagement = lazy(() => import("./pages/dashboard/super_admin/CertificateManagement"));
const NoticeManagement = lazy(() => import("./pages/dashboard/super_admin/NoticeManagement"));
const AdminReports = lazy(() => import("./pages/dashboard/super_admin/AdminReports"));

// Franchise Pages (Lazy Loaded)
const FranchiseDashboard = lazy(() => import("./pages/dashboard/franchise/FranchiseDashboard"));
const StudentAdmission = lazy(() => import("./pages/dashboard/franchise/StudentAdmission"));
const FranchiseStudents = lazy(() => import("./pages/dashboard/franchise/FranchiseStudents"));
const FeeCollection = lazy(() => import("./pages/dashboard/franchise/FeeCollection"));
const FranchiseAttendance = lazy(() => import("./pages/dashboard/franchise/FranchiseAttendance"));
const FranchiseExams = lazy(() => import("./pages/dashboard/franchise/FranchiseExams"));
const FranchiseMaterials = lazy(() => import("./pages/dashboard/franchise/FranchiseMaterials"));

// Teacher Pages (Lazy Loaded)
const TeacherDashboard = lazy(() => import("./pages/dashboard/teacher/TeacherDashboard"));
const TeacherAttendance = lazy(() => import("./pages/dashboard/teacher/TeacherAttendance"));
const TeacherResults = lazy(() => import("./pages/dashboard/teacher/TeacherResults"));
const TeacherMaterials = lazy(() => import("./pages/dashboard/teacher/TeacherMaterials"));

// Student Pages (Lazy Loaded)
const StudentDashboard = lazy(() => import("./pages/dashboard/student/StudentDashboard"));
const MyAttendance = lazy(() => import("./pages/dashboard/student/MyAttendance"));
const MyResults = lazy(() => import("./pages/dashboard/student/MyResults"));
const MyCertificates = lazy(() => import("./pages/dashboard/student/MyCertificates"));
const MyFees = lazy(() => import("./pages/dashboard/student/MyFees"));
const MyMaterials = lazy(() => import("./pages/dashboard/student/MyMaterials"));

function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/enquiry/:slug" element={<Enquiry />} />
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
    </Suspense>

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
