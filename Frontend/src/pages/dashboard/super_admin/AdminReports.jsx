import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Filter, Download, Calendar, RefreshCw, Loader2,
  TrendingUp, Users, CreditCard, Building2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, 
  LineChart, Line, Legend, AreaChart, Area
} from "recharts";
import { adminAPI } from "../../../api/admin.api";
import { motion } from "framer-motion";

const COLORS = ['#1a3c6e', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

const AdminReports = () => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ["admin-reports", dateRange],
    queryFn: () => adminAPI.getReports(dateRange),
  });

  const reports = reportsData?.data?.data || {
    revenueByMonth: [
      { name: 'Jan', revenue: 4000 },
      { name: 'Feb', revenue: 3000 },
      { name: 'Mar', revenue: 5000 },
      { name: 'Apr', revenue: 8000 },
      { name: 'May', revenue: 6000 },
    ],
    enrollmentByCategory: [
      { name: 'DCA', value: 400 },
      { name: 'ADCA', value: 300 },
      { name: 'Tally', value: 300 },
      { name: 'PGDCA', value: 200 },
    ],
    centerPerformance: [
      { name: 'Patna', students: 120, revenue: 15000 },
      { name: 'Gaya', students: 80, revenue: 10000 },
      { name: 'Muz.', students: 95, revenue: 12000 },
      { name: 'Darb.', students: 60, revenue: 7000 },
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 font-medium">Deep insights into platform growth and revenue.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-2 pl-2">
              <Calendar size={18} className="text-gray-400" />
              <input type="date" className="bg-transparent border-none text-xs font-bold outline-none" />
            </div>
            <div className="h-6 w-px bg-gray-100"></div>
            <div className="flex items-center gap-2 pr-2">
              <input type="date" className="bg-transparent border-none text-xs font-bold outline-none" />
            </div>
          </div>
          <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="text-primary" /> Revenue Analytics
            </h3>
            <span className="text-xs font-black text-success uppercase tracking-widest">+22% Growth</span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reports.revenueByMonth}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a3c6e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1a3c6e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#1a3c6e" strokeWidth={4} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enrollment Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-2">
            <PieChartIcon className="text-accent" /> Course Distribution
          </h3>
          <div className="h-[350px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reports.enrollmentByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {reports.enrollmentByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Center Performance Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Building2 className="text-error" /> Center Wise Performance
            </h3>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reports.centerPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Bar dataKey="students" fill="#1a3c6e" radius={[4, 4, 0, 0]} name="Total Students" />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Revenue Index" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReports;
