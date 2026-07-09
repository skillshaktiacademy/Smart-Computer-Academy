import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  FileText, Award, Bell, Box, BarChart3, 
  CalendarCheck, CreditCard, ClipboardList, LogOut,
  ChevronLeft, ChevronRight, Menu, BellRing, UserCircle
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/store/authSlice";
import { toggleSidebar } from "../../store/slices/uiSlice";
import { motion, AnimatePresence } from "framer-motion";

const SidebarItem = ({ item, isCollapsed, isActive }) => (
  <Link
    to={item.path}
    className={`flex items-center px-4 py-3 mb-1 rounded-xl transition-all duration-200 group ${
      isActive 
      ? "bg-primary text-white shadow-lg shadow-primary/20" 
      : "text-gray-500 hover:bg-gray-100 hover:text-primary"
    }`}
  >
    <div className={`flex-shrink-0 ${isActive ? "text-white" : "group-hover:text-primary"}`}>
      <item.icon size={22} />
    </div>
    <AnimatePresence>
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="ml-4 font-semibold whitespace-nowrap overflow-hidden"
        >
          {item.label}
        </motion.span>
      )}
    </AnimatePresence>
    {!isCollapsed && isActive && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
      />
    )}
  </Link>
);

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleMenus = {
    super_admin: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/super_admin" },
      { label: "Franchises", icon: Users, path: "/dashboard/super_admin/franchises" },
      { label: "Courses", icon: BookOpen, path: "/dashboard/super_admin/courses" },
      { label: "Students", icon: GraduationCap, path: "/dashboard/super_admin/students" },
      { label: "Exams", icon: FileText, path: "/dashboard/super_admin/exams" },
      { label: "Certificates", icon: Award, path: "/dashboard/super_admin/certificates" },
      { label: "Notices", icon: Bell, path: "/dashboard/super_admin/notices" },
      { label: "Materials", icon: Box, path: "/dashboard/super_admin/materials" },
      { label: "Reports", icon: BarChart3, path: "/dashboard/super_admin/reports" },
    ],
    franchise_owner: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/franchise" },
      { label: "Students", icon: GraduationCap, path: "/dashboard/franchise/students" },
      { label: "Enrollments", icon: ClipboardList, path: "/dashboard/franchise/enrollments" },
      { label: "Attendance", icon: CalendarCheck, path: "/dashboard/franchise/attendance" },
      { label: "Fees", icon: CreditCard, path: "/dashboard/franchise/fees" },
      { label: "Exams", icon: FileText, path: "/dashboard/franchise/exams" },
      { label: "Notices", icon: Bell, path: "/dashboard/franchise/notices" },
      { label: "Materials", icon: Box, path: "/dashboard/franchise/materials" },
    ],
    teacher: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/teacher" },
      { label: "Students", icon: GraduationCap, path: "/dashboard/teacher/students" },
      { label: "Attendance", icon: CalendarCheck, path: "/dashboard/teacher/attendance" },
      { label: "Exams", icon: FileText, path: "/dashboard/teacher/exams" },
      { label: "Results", icon: ClipboardList, path: "/dashboard/teacher/results" },
      { label: "Materials", icon: Box, path: "/dashboard/teacher/materials" },
    ],
    student: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/student" },
      { label: "My Courses", icon: BookOpen, path: "/dashboard/student/courses" },
      { label: "Attendance", icon: CalendarCheck, path: "/dashboard/student/attendance" },
      { label: "Results", icon: ClipboardList, path: "/dashboard/student/results" },
      { label: "Certificates", icon: Award, path: "/dashboard/student/certificates" },
      { label: "Materials", icon: Box, path: "/dashboard/student/materials" },
      { label: "Fees", icon: CreditCard, path: "/dashboard/student/fees" },
    ],
  };

  const menuItems = roleMenus[user?.role] || [];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 280 : 80 }}
      className="bg-white h-screen sticky top-0 border-r border-gray-100 flex flex-col z-30 shadow-sm"
    >
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">SCA</div>
              <span className="font-bold text-primary truncate">Smart Computer</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-primary transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-grow px-4 mt-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            isCollapsed={!isSidebarOpen}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-error/10 hover:text-error rounded-xl transition-colors font-semibold"
        >
          <LogOut size={22} />
          {isSidebarOpen && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
