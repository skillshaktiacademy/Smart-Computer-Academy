import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, Search, Filter, GraduationCap, 
  MapPin, BookOpen, Calendar, ExternalLink,
  Download, UserCheck, UserX, Loader2,
  Building2, Eye
} from "lucide-react";
import { adminAPI } from "../api/admin.api";
import { publicAPI } from "../../public-site/api/public.api";
import DataTable from "../../../components/ui/DataTable";
import { motion } from "framer-motion";

const StudentManagement = () => {
  const [filters, setFilters] = useState({
    franchiseId: "",
    courseId: "",
    search: ""
  });

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["all-students", filters],
    queryFn: () => adminAPI.getAllStudents(filters),
  });

  const { data: franchisesData } = useQuery({
    queryKey: ["franchises-list"],
    queryFn: adminAPI.getAllFranchises,
  });

  const { data: coursesData } = useQuery({
    queryKey: ["courses-list"],
    queryFn: publicAPI.getCourses,
  });

  const students = studentsData?.data?.data || [];
  const franchises = franchisesData?.data?.data || [];
  const courses = coursesData?.data?.data || [];

  const columns = [
    { 
      key: "name", 
      label: "Student", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center font-bold text-accent">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{val}</p>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{row.enrollmentNo}</p>
          </div>
        </div>
      )
    },
    { 
      key: "franchiseId", 
      label: "Center",
      render: (val) => (
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-gray-400" />
          <span className="font-medium text-gray-600">{val?.name || "N/A"}</span>
        </div>
      )
    },
    { 
      key: "courseId", 
      label: "Course",
      render: (val) => <span className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-xs font-black">{val?.title || "N/A"}</span>
    },
    { 
      key: "createdAt", 
      label: "Joined",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600">{new Date(val).toLocaleDateString()}</span>
          <span className="text-[10px] text-gray-400">Regular</span>
        </div>
      )
    },
    { 
      key: "isActive", 
      label: "Status",
      render: (val) => (
        <div className={`flex items-center gap-1.5 font-black uppercase text-[10px] ${val ? 'text-success' : 'text-error'}`}>
          {val ? <UserCheck size={14} /> : <UserX size={14} />}
          {val ? "Active" : "Disabled"}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Student Directory</h1>
          <p className="text-gray-500 font-medium">Browse and manage students across all centers.</p>
        </div>
        <button 
          onClick={() => toast.info("Exporting students data...")}
          className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-primary shadow-sm transition-all"
        >
          <Download size={22} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Building2 className="text-gray-400" size={20} />
          <select 
            className="flex-grow bg-transparent border-none outline-none text-sm font-bold text-gray-700"
            value={filters.franchiseId}
            onChange={(e) => setFilters({...filters, franchiseId: e.target.value})}
          >
            <option value="">All Franchises</option>
            {franchises.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <BookOpen className="text-gray-400" size={20} />
          <select 
            className="flex-grow bg-transparent border-none outline-none text-sm font-bold text-gray-700"
            value={filters.courseId}
            onChange={(e) => setFilters({...filters, courseId: e.target.value})}
          >
            <option value="">All Courses</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or ID..."
            className="flex-grow bg-transparent border-none outline-none text-sm font-bold text-gray-700"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={students} 
        isLoading={isLoading}
        actions={(row) => (
          <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
            <Eye size={18} />
          </button>
        )}
      />
    </div>
  );
};

export default StudentManagement;
