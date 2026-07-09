import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarCheck, UserCheck, UserX, Clock,
  Calendar, Search, Loader2, Save,
  ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const queryClient = useQueryClient();

  const { data: studentsData, isLoading: loadingStudents } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: () => api.get("/students/my-students"), // Scoped to teacher
  });

  const students = studentsData?.data?.data || [];

  const { data: attendanceData, isLoading: loadingAttendance } = useQuery({
    queryKey: ["teacher-attendance-record", selectedDate],
    queryFn: () => api.get(`/attendance/date/${selectedDate}`),
    onSuccess: (res) => {
      const records = res.data.data || [];
      const newAttendance = {};
      records.forEach(r => newAttendance[r.studentId] = r.status);
      setAttendance(newAttendance);
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/attendance/mark", data),
    onSuccess: () => {
      toast.success("Daily attendance recorded!");
      queryClient.invalidateQueries(["teacher-attendance-record", selectedDate]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to mark attendance")
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
          <h1 className="text-3xl font-black text-gray-900">Daily Attendance</h1>
          <p className="text-gray-500 font-medium">Manage student presence for your scheduled classes.</p>
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
            {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> <span>Submit Record</span></>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Mark</h3>
            <div className="space-y-3">
              <button onClick={() => handleMarkAll("present")} className="w-full flex items-center justify-between p-4 bg-success/5 text-success rounded-2xl hover:bg-success/10 transition-all font-bold text-sm">
                <span>All Present</span><CheckCircle2 size={18} />
              </button>
              <button onClick={() => handleMarkAll("absent")} className="w-full flex items-center justify-between p-4 bg-error/5 text-error rounded-2xl hover:bg-error/10 transition-all font-bold text-sm">
                <span>All Absent</span><UserX size={18} />
              </button>
            </div>
          </div>
          <div className="bg-accent/10 p-8 rounded-3xl border border-accent/20">
            <h4 className="font-black text-accent text-lg mb-2">Class Summary</h4>
            <p className="text-xs text-accent-700 font-medium">Batch: ADCA Morning (8 AM)</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-xl font-black text-accent">{Object.values(attendance).filter(s => s === "present").length}</p>
                <p className="text-[9px] font-black uppercase text-accent/60">Present</p>
              </div>
              <div className="w-px h-8 bg-accent/20"></div>
              <div className="text-center">
                <p className="text-xl font-black text-accent">{Object.values(attendance).filter(s => s === "absent").length}</p>
                <p className="text-[9px] font-black uppercase text-accent/60">Absent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Status Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingStudents ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse"><td colSpan="2" className="p-6"><div className="h-4 bg-gray-100 rounded w-full"></div></td></tr>
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
                        <div className="flex items-center justify-center gap-2">
                          {[
                            { id: "present", icon: UserCheck, color: "success" },
                            { id: "absent", icon: UserX, color: "error" },
                            { id: "late", icon: Clock, color: "accent" }
                          ].map((status) => (
                            <button
                              key={status.id}
                              onClick={() => handleStatusChange(student._id, status.id)}
                              className={`p-2.5 rounded-xl transition-all ${attendance[student._id] === status.id
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

export default TeacherAttendance;
