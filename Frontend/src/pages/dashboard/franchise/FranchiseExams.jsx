import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ClipboardList, Plus, Search, Calendar, 
  Clock, BookOpen, UserCheck, AlertCircle,
  Loader2, X, CheckCircle2, ChevronRight,
  Target, BarChart3
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "../../../components/ui/DataTable";

const examSchema = z.object({
  title: z.string().min(5, "Title is required"),
  courseId: z.string().min(1, "Course is required"),
  examDate: z.string().min(1, "Exam date is required"),
  totalMarks: z.coerce.number().min(1),
  passingMarks: z.coerce.number().min(1),
});

const FranchiseExams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: examsData, isLoading } = useQuery({
    queryKey: ["franchise-exams"],
    queryFn: () => api.get("/exams/my-center"),
  });

  const { data: coursesData } = useQuery({
    queryKey: ["center-courses"],
    queryFn: () => api.get("/public/courses"),
  });

  const exams = examsData?.data?.data || [];
  const courses = coursesData?.data?.data || [];

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(examSchema)
  });

  const mutation = useMutation({
    mutationFn: franchiseAPI.createExam,
    onSuccess: () => {
      toast.success("Exam scheduled successfully!");
      queryClient.invalidateQueries(["franchise-exams"]);
      setIsModalOpen(false);
      reset();
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to schedule exam")
  });

  const columns = [
    { 
      key: "title", 
      label: "Examination", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center"><ClipboardList size={20} /></div>
          <div><p className="font-bold text-gray-900">{val}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{row.courseId?.title}</p></div>
        </div>
      )
    },
    { 
      key: "examDate", 
      label: "Date", 
      render: (val) => (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Calendar size={14} className="text-gray-400" />
          {new Date(val).toLocaleDateString()}
        </div>
      )
    },
    { 
      key: "totalMarks", 
      label: "Total/Pass",
      render: (val, row) => <span className="font-black text-gray-700">{val} / {row.passingMarks}</span>
    },
    { 
      key: "status", 
      label: "Status",
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          val === 'scheduled' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
        }`}>
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Exam Management</h1>
          <p className="text-gray-500 font-medium">Plan, schedule and manage center examinations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-3 px-6 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>Schedule New Exam</span>
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={exams} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            {row.status === 'scheduled' && (
              <button className="btn-primary py-1.5 px-4 text-xs">Enter Results</button>
            )}
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><BarChart3 size={18} /></button>
          </div>
        )}
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Target className="text-primary" /> Schedule Examination
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Exam Title</label>
                    <input {...register("title")} className="input-field py-3" placeholder="e.g. Unit Test 1 - Computer Basics" />
                    {errors.title && <p className="text-[10px] text-error mt-1">{errors.title.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Select Course</label>
                      <select {...register("courseId")} className="input-field py-3 bg-white">
                        <option value="">Select course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                      </select>
                      {errors.courseId && <p className="text-[10px] text-error mt-1">{errors.courseId.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Examination Date</label>
                      <input type="date" {...register("examDate")} className="input-field py-3" />
                      {errors.examDate && <p className="text-[10px] text-error mt-1">{errors.examDate.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Total Marks</label>
                      <input type="number" {...register("totalMarks")} className="input-field py-3" placeholder="100" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Passing Marks</label>
                      <input type="number" {...register("passingMarks")} className="input-field py-3" placeholder="33" />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-xs font-bold text-gray-500 leading-relaxed">
                      All students enrolled in the selected course will be automatically notified about this examination.
                    </p>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                    <button type="submit" disabled={mutation.isLoading} className="flex-1 btn-primary py-4 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={20} /> <span>Save Exam</span></>}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FranchiseExams;
