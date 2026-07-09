import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, Search, Filter, Eye, Edit3, 
  Trash2, Download, Printer, UserPlus,
  Building2, BookOpen, UserCircle, Loader2
} from "lucide-react";
import api from "../../../lib/axios";
import DataTable from "../../../components/ui/DataTable";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FranchiseStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["franchise-students"],
    queryFn: () => api.get("/students/my-center"), // Endpoint for franchise center students
  });

  const { data: coursesData } = useQuery({
    queryKey: ["center-courses"],
    queryFn: () => api.get("/public/courses"),
  });

  const students = studentsData?.data?.data || [];
  const courses = coursesData?.data?.data || [];

  const columns = [
    { 
      key: "name", 
      label: "Student", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{val}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{row.enrollmentNo}</p>
          </div>
        </div>
      )
    },
    { 
      key: "courseId", 
      label: "Course",
      render: (val) => <span className="text-xs font-black text-gray-500 uppercase">{val?.title || "N/A"}</span>
    },
    { 
      key: "phone", 
      label: "Contact",
      render: (val) => <span className="text-sm font-medium text-gray-600">{val}</span>
    },
    { 
      key: "feeStatus", 
      label: "Fee",
      render: (val, row) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          val === 'paid' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
        }`}>
          {val || "Pending"}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Student Directory</h1>
          <p className="text-gray-500 font-medium">Manage your center's enrolled students.</p>
        </div>
        <Link to="/dashboard/franchise/admission" className="btn-primary py-3 px-6 flex items-center gap-2 shadow-lg shadow-primary/20">
          <UserPlus size={20} />
          <span>New Admission</span>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center"><Users size={24} /></div>
          <div><p className="text-2xl font-black text-gray-900">{students.length}</p><p className="text-xs font-bold text-gray-400 uppercase">Total Enrolled</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-success/5 text-success rounded-xl flex items-center justify-center"><UserCircle size={24} /></div>
          <div><p className="text-2xl font-black text-gray-900">{students.filter(s => s.isActive).length}</p><p className="text-xs font-bold text-gray-400 uppercase">Active Students</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center"><Building2 size={24} /></div>
          <div><p className="text-2xl font-black text-gray-900">{courses.length}</p><p className="text-xs font-bold text-gray-400 uppercase">Offered Courses</p></div>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={students} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="View Details">
              <Eye size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all" title="Print ID Card">
              <Printer size={18} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default FranchiseStudents;
