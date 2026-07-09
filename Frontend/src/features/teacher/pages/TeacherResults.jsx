import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Award, Search, Filter, ClipboardList, 
  CheckCircle2, Loader2, Save, Target,
  BookOpen, ChevronRight, AlertCircle, TrendingUp
} from "lucide-react";
import api from "../../../lib/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const TeacherResults = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [marks, setMarks] = useState({});
  const queryClient = useQueryClient();

  const { data: examsData, isLoading: loadingExams } = useQuery({
    queryKey: ["teacher-exams"],
    queryFn: () => api.get("/exams/my-center"), // Teacher sees center exams they are involved in
  });

  const exams = examsData?.data?.data || [];

  const { data: studentsData, isLoading: loadingStudents } = useQuery({
    queryKey: ["exam-students", selectedExam?._id],
    queryFn: () => api.get(`/exams/${selectedExam._id}/students`),
    enabled: !!selectedExam,
    onSuccess: (res) => {
      const existingResults = res.data.data.results || [];
      const newMarks = {};
      existingResults.forEach(r => newMarks[r.studentId] = r.marksObtained);
      setMarks(newMarks);
    }
  });

  const students = studentsData?.data?.data?.students || [];

  const mutation = useMutation({
    mutationFn: (data) => api.post(`/exams/${selectedExam._id}/results`, data),
    onSuccess: () => {
      toast.success("Examination results published!");
      queryClient.invalidateQueries(["exam-students", selectedExam?._id]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to save marks")
  });

  const handleMarkChange = (studentId, value) => {
    setMarks(prev => ({ ...prev, [studentId]: Number(value) }));
  };

  const handleSave = () => {
    const payload = Object.entries(marks).map(([studentId, marksObtained]) => ({
      studentId,
      marksObtained
    }));
    mutation.mutate({ results: payload });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Grading Center</h1>
          <p className="text-gray-500 font-medium">Evaluate student performance and publish results.</p>
        </div>
        {selectedExam && (
          <button 
            onClick={handleSave}
            disabled={mutation.isLoading}
            className="btn-primary py-3 px-8 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> <span>Publish Marks</span></>}
          </button>
        )}
      </div>

      {!selectedExam ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingExams ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse"></div>
            ))
          ) : exams.map((exam) => (
            <motion.div 
              key={exam._id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedExam(exam)}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{exam.title}</h3>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{exam.courseId?.title}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-500">{new Date(exam.examDate).toLocaleDateString()}</span>
                <span className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
                  Grade Now <ChevronRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <button onClick={() => setSelectedExam(null)} className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors">
            <ChevronRight className="rotate-180" size={18} />
            Back to Exams
          </button>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-inner"><Target size={32} /></div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">{selectedExam.title}</h2>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedExam.courseId?.title}</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Max Marks</p>
                <p className="text-2xl font-black text-gray-900">{selectedExam.totalMarks}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Pass Marks</p>
                <p className="text-2xl font-black text-accent">{selectedExam.passingMarks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                  <th className="px-8 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Marks Obtained</th>
                  <th className="px-8 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loadingStudents ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse"><td colSpan="3" className="p-8"><div className="h-4 bg-gray-100 rounded w-full"></div></td></tr>
                  ))
                ) : students.map((student) => {
                  const score = marks[student._id] || 0;
                  const isPassed = score >= selectedExam.passingMarks;
                  return (
                    <tr key={student._id}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center font-bold">{student.name.charAt(0)}</div>
                          <div><p className="font-bold text-gray-900">{student.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{student.enrollmentNo}</p></div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <input 
                          type="number"
                          max={selectedExam.totalMarks}
                          value={marks[student._id] || ""}
                          onChange={(e) => handleMarkChange(student._id, e.target.value)}
                          className="w-24 text-center py-2 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-xl outline-none font-black text-primary transition-all"
                          placeholder="00"
                        />
                      </td>
                      <td className="px-8 py-6 text-center">
                        {marks[student._id] !== undefined && (
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            isPassed ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                          }`}>
                            {isPassed ? 'Pass' : 'Fail'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResults;
