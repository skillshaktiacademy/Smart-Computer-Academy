import { useQuery } from "@tanstack/react-query";
import {
  CalendarCheck, Clock, UserCheck, UserX,
  ChevronLeft, ChevronRight, Filter,
  TrendingUp, TrendingDown, Info
} from "lucide-react";
import api from "../../../api/axios";
import { motion } from "framer-motion";
import { useState } from "react";

const MyAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ["my-attendance", currentMonth.getMonth(), currentMonth.getFullYear()],
    queryFn: () => api.get("/attendance/my-records", {
      params: {
        month: currentMonth.getMonth() + 1,
        year: currentMonth.getFullYear()
      }
    }),
  });

  const records = attendanceData?.data?.data || [];
  const overallRate = records.length > 0 ? Math.round((records.filter(r => r.status === 'present').length / records.length) * 100) : 0;

  // Simple calendar generator for current month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const getStatus = (day) => {
    const record = records.find(r => new Date(r.date).getDate() === day);
    return record?.status || null;
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Attendance History</h1>
          <p className="text-gray-500 font-medium">Track your presence and punctuality throughout the course.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-2 hover:bg-gray-50 rounded-xl transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-black uppercase tracking-widest text-gray-900 px-4">
            {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-2 hover:bg-gray-50 rounded-xl transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-white/50">Overall Score</h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-5xl font-black">{overallRate}%</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2">Attendance Rate</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${overallRate >= 75 ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                {overallRate >= 75 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Status Legend</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="text-sm font-bold text-gray-600">Present (Full Session)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-error rounded-full"></div>
                <span className="text-sm font-bold text-gray-600">Absent (Not Reported)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <span className="text-sm font-bold text-gray-600">Late Entry / Half Day</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10 flex items-start gap-4">
            <Info className="text-accent shrink-0" size={20} />
            <p className="text-xs font-bold text-accent-700 leading-relaxed text-accent">
              Attendance records are updated daily by the course instructor. Contact support for discrepancies.
            </p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const status = getStatus(day);
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group transition-all cursor-default ${status === 'present' ? 'bg-success/10 text-success' :
                      status === 'absent' ? 'bg-error/10 text-error' :
                        status === 'late' ? 'bg-accent/10 text-accent' :
                          'bg-gray-50 text-gray-300'
                    } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                >
                  <span className="text-sm font-black">{day}</span>
                  {status && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${status === 'present' ? 'bg-success' :
                        status === 'absent' ? 'bg-error' : 'bg-accent'
                      }`}></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
