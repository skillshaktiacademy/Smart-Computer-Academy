import { useQuery } from "@tanstack/react-query";
import {
  Users, CreditCard, GraduationCap, CalendarCheck,
  ArrowRight, Bell, ClipboardList, TrendingUp,
  PieChart as PieChartIcon
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import StatsCard from "../../../components/ui/StatsCard";
import api from "../../../lib/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

const FranchiseDashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["franchise-stats"],
    queryFn: () => api.get("/dashboard/franchise/stats"),
  });

  const stats = statsData?.data?.data || {
    totalStudents: 0,
    activeEnrollments: 0,
    totalRevenue: 0,
    pendingFees: 0,
    attendanceData: [
      { name: 'Present', value: 85 },
      { name: 'Absent', value: 10 },
      { name: 'Late', value: 5 },
    ],
    recentAdmissions: [],
    notices: [],
    upcomingExams: []
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Center Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back! Manage your franchise center efficiently.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/franchise/admission" className="btn-primary py-2.5 px-6 flex items-center gap-2 text-sm">
            <Users size={18} />
            <span>New Admission</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Students" value={stats.totalStudents} icon={GraduationCap} color="primary" />
        <StatsCard title="Active Enrollments" value={stats.activeEnrollments} icon={ClipboardList} color="success" />
        <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue?.toLocaleString()}`} icon={TrendingUp} color="accent" />
        <StatsCard title="Pending Fees" value={`₹${stats.pendingFees?.toLocaleString()}`} icon={CreditCard} color="error" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Summary */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <CalendarCheck className="text-success" /> Attendance Overview
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {stats.attendanceData.map((entry, index) => (
              <div key={entry.name} className="text-center">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{entry.name}</p>
                <p className="text-lg font-black text-gray-900">{entry.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Recent Admissions</h3>
            <Link to="/dashboard/franchise/students" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(stats.recentAdmissions.length > 0 ? stats.recentAdmissions : [
                  { name: 'Rahul Kumar', course: 'DCA', date: '2024-03-20', status: 'Partial' },
                  { name: 'Sita Kumari', course: 'ADCA', date: '2024-03-18', status: 'Paid' },
                  { name: 'Pankaj Singh', course: 'Tally', date: '2024-03-15', status: 'Pending' },
                ]).map((stu, i) => (
                  <tr key={i}>
                    <td className="px-4 py-4 font-bold text-gray-900 text-sm">{stu.name}</td>
                    <td className="px-4 py-4 text-gray-500 text-xs font-black">{stu.course}</td>
                    <td className="px-4 py-4 text-gray-400 text-xs">{stu.date}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stu.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                        }`}>
                        {stu.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notices */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <Bell className="text-accent" /> Latest Announcements
          </h3>
          <div className="space-y-6">
            {(stats.notices.length > 0 ? stats.notices : [
              { title: 'Exam Date Sheet Published', date: '1 day ago' },
              { title: 'New Study Material for Python', date: '2 days ago' },
            ]).map((notice, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-900 text-sm mb-1">{notice.title}</p>
                <p className="text-xs text-gray-400">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <ClipboardList className="text-primary" /> Upcoming Examinations
          </h3>
          <div className="space-y-6">
            {(stats.upcomingExams.length > 0 ? stats.upcomingExams : [
              { title: 'Monthly Quiz - DCA', date: '25th March' },
              { title: 'Tally Prime Final', date: '28th March' },
            ]).map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{exam.title}</p>
                  <p className="text-xs text-primary font-black uppercase tracking-widest">{exam.date}</p>
                </div>
                <ArrowRight size={20} className="text-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseDashboard;
