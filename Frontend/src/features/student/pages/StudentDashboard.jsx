import { useQuery } from "@tanstack/react-query";
import { 
  User, BookOpen, CalendarCheck, Award, 
  ArrowRight, Bell, FileText, TrendingUp,
  CreditCard, LayoutGrid, CheckCircle2
} from "lucide-react";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer 
} from "recharts";
import StatsCard from "../../../components/ui/StatsCard";
import api from "../../../lib/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const COLORS = ['#1a3c6e', '#f59e0b'];

const StudentDashboard = () => {
  const { user } = useSelector(state => state.auth);

  const { data: studentStats, isLoading } = useQuery({
    queryKey: ["student-dashboard-stats"],
    queryFn: () => api.get("/dashboard/student/stats"),
  });

  const stats = studentStats?.data?.data || {
    attendanceRate: 0,
    courseProgress: 0,
    pendingFees: 0,
    earnedCertificates: 0,
    recentNotices: [],
    upcomingExams: []
  };

  const attendanceData = [
    { name: 'Present', value: stats.attendanceRate },
    { name: 'Total', value: 100 - stats.attendanceRate },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Enrollment ID: {user?.enrollmentNo || 'SSA-2024-XXXX'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Hello, {user?.name.split(' ')[0]}! 👋</h1>
          <p className="text-white/60 text-lg font-medium max-w-xl leading-relaxed">
            Ready to continue your learning journey? You've completed {stats.courseProgress}% of your current course module. Keep up the great work!
          </p>
          
          <div className="mt-10 max-w-md">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Course Progress</span>
              <span className="text-lg font-black text-accent">{stats.courseProgress}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.courseProgress}%` }}
                className="h-full bg-accent"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Summary */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-gray-900 mb-8 self-start flex items-center gap-2">
            <CalendarCheck className="text-primary" /> Attendance Rate
          </h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#1a3c6e" />
                  <Cell fill="#f1f5f9" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-black text-gray-900">{stats.attendanceRate}%</p>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Presence</p>
            </div>
          </div>
          <p className="text-center text-xs font-medium text-gray-400 mt-6 px-4">
            Maintain at least 75% attendance to be eligible for final examinations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "My Results", icon: Award, link: "/dashboard/student/results", color: "text-accent bg-accent/5" },
              { label: "Attendance", icon: CalendarCheck, link: "/dashboard/student/attendance", color: "text-primary bg-primary/5" },
              { label: "Materials", icon: FileText, link: "/dashboard/student/materials", color: "text-success bg-success/5" },
              { label: "Certificates", icon: GraduationCap, link: "/dashboard/student/certificates", color: "text-error bg-error/5" }
            ].map((action, i) => (
              <Link key={i} to={action.link} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-50 hover:border-primary/20 hover:bg-gray-50/50 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-gray-700">{action.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm">
                <CreditCard size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Pending Fees</h4>
                <p className="text-xs text-gray-500">Next payment due by 10th of next month.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-gray-900">₹{stats.pendingFees}</p>
              <Link to="/dashboard/student/fees" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Pay Now</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Notices */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Bell className="text-accent" /> Latest Notices
            </h3>
            <Link to="/dashboard/student" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">See All</Link>
          </div>
          <div className="space-y-6">
            {(stats.recentNotices.length > 0 ? stats.recentNotices : [
              { title: 'New Batch for Advanced Tally starts Monday', date: '2 hours ago' },
              { title: 'Holiday Notice: Holi Festival Celebrations', date: '1 day ago' },
            ]).map((notice, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-900 text-sm mb-1">{notice.title}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <LayoutGrid className="text-primary" /> Exam Schedule
            </h3>
          </div>
          <div className="space-y-6">
            {(stats.upcomingExams.length > 0 ? stats.upcomingExams : [
              { title: 'Theory Exam - Fundamentals', date: '25th March' },
              { title: 'Practical Lab - Windows OS', date: '28th March' },
            ]).map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-black text-sm">{i+1}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{exam.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{exam.date}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
