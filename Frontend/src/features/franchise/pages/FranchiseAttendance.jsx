import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  CalendarCheck, UserCheck, UserX, Clock, 
  Calendar, Search, Loader2, Save, 
  ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";
import api from "../../../lib/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const FranchiseAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const queryClient = useQueryClient();

  const { data: studentsData, isLoading: loadingStudents } = useQuery({
    queryKey: ["attendance-students"],
    queryFn: () => api.get("/students/my-center"),
  });

  const students = studentsData?.data?.data || [];

  const { data: attendanceData, isLoading: loadingAttendance } = useQuery({
    queryKey: ["attendance-record", selectedDate],
    queryFn: () => api.get(`/attendance/date/${selectedDate}`),
    onSuccess: (res) => {
      const records = res.data.data || [];
      const newAttendance = {};
      records.forEach(r => newAttendance[r.studentId] = r.status);
      setAttendance(newAttendance);
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/attendance/mark", data), // Using shared endpoint
    onSuccess: () => {
      toast.success("Attendance saved successfully!");
      queryClient.invalidateQueries(["attendance-record", selectedDate]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to save attendance")
  });

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status) => {
    const newAttendance = {};
    students.forEach(s => newAttendance[s._id] = status);
    setAttendance(newAttendance);
  };

  const handleSave = () => {
    const payload = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status,
      date: selectedDate
    }));
    mutation.mutate({ attendance: payload });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Attendance Portal</h1>
          <p className="text-gray-500 font-medium">Record and monitor daily student attendance.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-2 pl-2">
              <Calendar size={18} className="text-primary" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent border-none text-sm font-black outline-none" 
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={mutation.isLoading || students.length === 0}
            className="btn-primary py-3 px-8 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> <span>Save Changes</span></>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleMarkAll("present")}
                className="w-full flex items-center justify-between p-4 bg-success/5 text-success rounded-2xl hover:bg-success/10 transition-all font-bold text-sm"
              >
                <span>Mark All Present</span>
                <CheckCircle2 size={18} />
              </button>
              <button 
                onClick={() => handleMarkAll("absent")}
                className="w-full flex items-center justify-between p-4 bg-error/5 text-error rounded-2xl hover:bg-error/10 transition-all font-bold text-sm"
              >
                <span>Mark All Absent</span>
                <UserX size={18} />
              </button>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-3xl shadow-xl shadow-primary/20 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><CalendarCheck size={20} /></div>
              <h4 className="font-bold">Daily Stats</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black">{Object.values(attendance).filter(s => s === "present").length}</p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Present</p>
              </div>
              <div>
                <p className="text-2xl font-black">{Object.values(attendance).filter(s => s === "absent").length}</p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Absent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl outline-none text-sm font-medium"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                    <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingStudents ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                        <td className="px-6 py-6"><div className="h-10 bg-gray-100 rounded-xl w-48 mx-auto"></div></td>
                      </tr>
                    ))
                  ) : students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary/5 text-primary rounded-full flex items-center justify-center font-bold">{student.name.charAt(0)}</div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{student.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{student.enrollmentNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-black text-gray-500 uppercase">{student.courseId?.title}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {[
                            { id: "present", icon: UserCheck, color: "success" },
                            { id: "absent", icon: UserX, color: "error" },
                            { id: "late", icon: Clock, color: "accent" }
                          ].map((status) => (
                            <button
                              key={status.id}
                              onClick={() => handleStatusChange(student._id, status.id)}
                              className={`p-2.5 rounded-xl transition-all ${
                                attendance[student._id] === status.id 
                                ? `bg-${status.color} text-white shadow-lg shadow-${status.color}/20` 
                                : `bg-gray-100 text-gray-400 hover:bg-gray-200`
                              }`}
                            >
                              <status.icon size={20} />
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseAttendance;
