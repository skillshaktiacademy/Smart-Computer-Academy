import { useQuery } from "@tanstack/react-query";
import {
  Users, Building2, CreditCard, BookOpen,
  TrendingUp, Calendar, ArrowRight, Activity
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import StatsCard from "../../../components/ui/StatsCard";
import { adminAPI } from "../api/admin.api";
import { dashboardAPI } from "../api/dashboard.api";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  // Fetch dashboard stats
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: dashboardAPI.getAdminStats,
  });

  const stats = statsData?.data?.data || {
    totalFranchises: 0,
    totalStudents: 0,
    totalRevenue: 0,
    activeCourses: 0,
    enrollmentHistory: [],
    recentActivity: [],
    topFranchises: []
  };

  const chartData = stats.enrollmentHistory.length > 0 ? stats.enrollmentHistory : [
    { name: "Jan", count: 40 },
    { name: "Feb", count: 30 },
    { name: "Mar", count: 60 },
    { name: "Apr", count: 80 },
    { name: "May", count: 50 },
    { name: "Jun", count: 90 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Platform Overview</h1>
          <p className="text-gray-500 font-medium">Welcome back, Super Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-bold text-gray-600">
            <Calendar size={18} className="text-primary" />
            <span>Today, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Franchises"
          value={stats.totalFranchises}
          icon={Building2}
          trend="up"
          trendValue="12"
          color="primary"
        />
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          trend="up"
          trendValue="8"
          color="success"
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue?.toLocaleString()}`}
          icon={CreditCard}
          trend="up"
          trendValue="15"
          color="accent"
        />
        <StatsCard
          title="Active Courses"
          value={stats.activeCourses}
          icon={BookOpen}
          color="error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Enrollment Growth</h3>
            <select className="bg-gray-50 border-none text-xs font-black uppercase tracking-widest rounded-lg px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a3c6e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1a3c6e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#1a3c6e"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Recent Activity</h3>
            <button className="text-primary hover:text-accent transition-colors">
              <Activity size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {(stats.recentActivity.length > 0 ? stats.recentActivity : [
              { id: 1, type: 'franchise', msg: 'New franchise "Patna West" registered', time: '2h ago', icon: Building2, color: 'text-primary bg-primary/10' },
              { id: 2, type: 'student', msg: '12 new students enrolled in Tally Prime', time: '4h ago', icon: Users, color: 'text-success bg-success/10' },
              { id: 3, type: 'payment', msg: 'Payment of ₹45,000 received from Gaya center', time: '6h ago', icon: CreditCard, color: 'text-accent bg-accent/10' },
              { id: 4, type: 'course', msg: 'New course "Data Science" added', time: '1d ago', icon: BookOpen, color: 'text-error bg-error/10' },
            ]).map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.msg}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 rounded-xl border-2 border-gray-50 text-sm font-black text-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
            View All Activity
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Top Franchises Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900">Top Performing Franchises</h3>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Franchise</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Students</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Revenue</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(stats.topFranchises.length > 0 ? stats.topFranchises : [
                { name: 'SSA Patna Main', code: 'SSA-P01', students: 450, revenue: '₹4.5L', rating: 4.8 },
                { name: 'SSA Gaya City', code: 'SSA-G05', students: 320, revenue: '₹3.2L', rating: 4.6 },
                { name: 'SSA Muzaffarpur', code: 'SSA-M02', students: 280, revenue: '₹2.8L', rating: 4.7 },
              ]).map((franchise, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center font-bold text-primary">
                        {franchise.name.charAt(4)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{franchise.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{franchise.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center text-sm font-bold text-gray-700">{franchise.students}</td>
                  <td className="px-8 py-5 text-center text-sm font-bold text-primary">{franchise.revenue}</td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-1 text-accent font-black text-sm">
                      <TrendingUp size={16} />
                      {franchise.rating}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
