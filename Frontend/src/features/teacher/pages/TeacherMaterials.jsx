import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Box, Plus, FileText, Video, Download, 
  Trash2, Loader2, X, CheckCircle2, 
  Upload, BookOpen, Clock, LayoutGrid
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../../../lib/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "../../../components/ui/DataTable";

const materialSchema = z.object({
  title: z.string().min(5, "Title is required"),
  courseId: z.string().min(1, "Course is required"),
  type: z.enum(["pdf", "video", "notes"]),
});

const TeacherMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();

  const { data: materialsData, isLoading } = useQuery({
    queryKey: ["teacher-materials"],
    queryFn: () => api.get("/materials/my-center"), // Scoped to teacher/center
  });

  const { data: coursesData } = useQuery({
    queryKey: ["center-courses"],
    queryFn: () => api.get("/public/courses"),
  });

  const materials = materialsData?.data?.data || [];
  const courses = coursesData?.data?.data || [];

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(materialSchema)
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      if (file) formData.append("file", file);
      return api.post("/materials", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    },
    onSuccess: () => {
      toast.success("Study material shared!");
      queryClient.invalidateQueries(["teacher-materials"]);
      setIsModalOpen(false);
      reset();
      setFile(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Upload failed")
  });

  const columns = [
    { 
      key: "title", 
      label: "Resource", 
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            row.type === 'video' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
          }`}>
            {row.type === 'video' ? <Video size={18} /> : <FileText size={18} />}
          </div>
          <div><p className="font-bold text-gray-900">{val}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{row.courseId?.title}</p></div>
        </div>
      )
    },
    { 
      key: "type", 
      label: "Format", 
      render: (val) => <span className="text-xs font-black text-gray-500 uppercase">{val}</span>
    },
    { 
      key: "createdAt", 
      label: "Shared On",
      render: (val) => <span className="text-sm font-medium text-gray-500">{new Date(val).toLocaleDateString()}</span>
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Academic Library</h1>
          <p className="text-gray-500 font-medium">Contribute and manage digital resources for your courses.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-3 px-6 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Upload size={20} />
          <span>Upload Resource</span>
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={materials} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><Download size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-error hover:bg-error/5 rounded-lg transition-all"><Trash2 size={18} /></button>
          </div>
        )}
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                    <Box className="text-primary" /> Share Material
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Resource Title</label>
                    <input {...register("title")} className="input-field py-3" placeholder="e.g. Logic Gates - Digital Electronics" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Target Course</label>
                      <select {...register("courseId")} className="input-field py-3 bg-white">
                        <option value="">Select course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Resource Type</label>
                      <select {...register("type")} className="input-field py-3 bg-white">
                        <option value="pdf">PDF Document</option>
                        <option value="video">Video Link/File</option>
                        <option value="notes">Lecture Notes</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Select Resource File</label>
                    <div className="border-4 border-dashed border-gray-100 rounded-3xl p-10 text-center hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden group">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary mb-4 transition-all">
                          <Upload size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-600">{file ? file.name : "Click to select or drag and drop"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                    <button type="submit" disabled={mutation.isLoading} className="flex-1 btn-primary py-4 flex items-center justify-center gap-2">
                      {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={20} /> <span>Publish Resource</span></>}
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

export default TeacherMaterials;
