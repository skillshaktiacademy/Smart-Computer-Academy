import { useQuery } from "@tanstack/react-query";
import {
  Users, BookOpen, CalendarCheck, Clock,
  ArrowRight, Bell, ClipboardList, TrendingUp,
  Target, Award, FileText
} from "lucide-react";
import StatsCard from "../../../components/ui/StatsCard";
import api from "../../../api/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const { data: teacherStats, isLoading } = useQuery({
    queryKey: ["teacher-dashboard-stats"],
    queryFn: () => api.get("/dashboard/teacher/stats"),
  });

  const stats = teacherStats?.data?.data || {
    totalStudents: 0,
    classesToday: 0,
    pendingResults: 0,
    attendanceRate: 0,
    recentExams: [],
    notices: []
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Teacher Panel</h1>
          <p className="text-gray-500 font-medium">Hello, Academic Professional. Here's your class summary for today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/teacher/attendance" className="btn-primary py-2.5 px-6 flex items-center gap-2 text-sm shadow-lg shadow-primary/20">
            <CalendarCheck size={18} />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="My Students" value={stats.totalStudents} icon={Users} color="primary" />
        <StatsCard title="Classes Today" value={stats.classesToday} icon={Clock} color="accent" />
        <StatsCard title="Pending Marks" value={stats.pendingResults} icon={ClipboardList} color="error" />
        <StatsCard title="Avg Attendance" value={`${stats.attendanceRate}%`} icon={TrendingUp} color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule/Quick Links */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <CalendarCheck className="text-primary" /> Today's Action Items
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/dashboard/teacher/attendance" className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <CalendarCheck size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Daily Attendance</h4>
              <p className="text-xs text-gray-500">Mark or update attendance for your assigned batches.</p>
            </Link>

            <Link to="/dashboard/teacher/results" className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent/20 hover:bg-accent/5 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Enter Marks</h4>
              <p className="text-xs text-gray-500">Update examination results and grade student performance.</p>
            </Link>

            <Link to="/dashboard/teacher/materials" className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-success/20 hover:bg-success/5 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-success mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Study Materials</h4>
              <p className="text-xs text-gray-500">Share lecture notes, PDFs, and video links with students.</p>
            </Link>

            <div className="p-6 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <h4 className="font-black text-lg mb-2">Notice Board</h4>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">Stay updated with the latest institutional announcements.</p>
                <Link to="/dashboard/teacher" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-accent">
                  View Notices <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Exams Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
              <Target className="text-error" /> Recent Exams
            </h3>
            <div className="space-y-6">
              {(stats.recentExams.length > 0 ? stats.recentExams : [
                { title: 'Tally Practical', date: '20th Mar', status: 'Pending' },
                { title: 'MS Office Test', date: '15th Mar', status: 'Graded' },
              ]).map((exam, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{exam.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{exam.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${exam.status === 'Graded' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                    {exam.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border-2 border-gray-50 text-xs font-black text-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
              Show All Exams
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-accent/10 p-8 rounded-3xl border border-accent/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                <Bell size={20} />
              </div>
              <h4 className="font-black text-accent text-lg uppercase tracking-tight">System Notice</h4>
            </div>
            <p className="text-sm font-medium text-accent-700 leading-relaxed text-accent">
              Attendance must be marked before 11:00 AM daily for the morning batches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
