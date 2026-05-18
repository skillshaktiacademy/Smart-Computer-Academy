import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Bell, Plus, Edit3, Trash2, 
  CheckCircle2, XCircle, MoreVertical, 
  Loader2, X, Users, Building2,
  Calendar, Eye, Send, Info
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { adminAPI } from "../../../api/admin.api";
import { toast } from "react-toastify";
import DataTable from "../../../components/ui/DataTable";
import { motion, AnimatePresence } from "framer-motion";

const noticeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  targetRole: z.enum(["all", "franchise_owner", "teacher", "student"]),
  franchiseId: z.string().optional(),
});

const NoticeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const queryClient = useQueryClient();

  const { data: noticesData, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: adminAPI.getAllNotices,
  });

  const { data: franchisesData } = useQuery({
    queryKey: ["franchises-list"],
    queryFn: adminAPI.getAllFranchises,
  });

  const notices = noticesData?.data?.data || [];
  const franchises = franchisesData?.data?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(noticeSchema),
    defaultValues: { targetRole: "all" }
  });

  const targetRole = watch("targetRole");

  const mutation = useMutation({
    mutationFn: (data) => {
      if (editingNotice) return adminAPI.updateNotice(editingNotice._id, data);
      return adminAPI.createNotice(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notices"]);
      toast.success(editingNotice ? "Notice updated!" : "Notice broadcasted!");
      setIsModalOpen(false);
      reset();
      setEditingNotice(null);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to save notice")
  });

  const columns = [
    { 
      key: "title", 
      label: "Notice", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
            <Bell size={18} />
          </div>
          <div>
            <p className="font-bold text-gray-900">{val}</p>
            <p className="text-xs text-gray-400 font-medium line-clamp-1">{row.content}</p>
          </div>
        </div>
      )
    },
    { 
      key: "targetRole", 
      label: "Target",
      render: (val) => (
        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
          {val.replace('_', ' ')}
        </span>
      )
    },
    { 
      key: "createdAt", 
      label: "Date",
      render: (val) => (
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Calendar size={14} />
          {new Date(val).toLocaleDateString()}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Communication Center</h1>
          <p className="text-gray-500 font-medium">Broadcast notices and announcements to the platform.</p>
        </div>
        <button 
          onClick={() => { setEditingNotice(null); reset(); setIsModalOpen(true); }}
          className="btn-primary py-3 px-6 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Notice</span>
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={notices} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
              <Edit3 size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-error hover:bg-error/5 rounded-lg transition-all">
              <Trash2 size={18} />
            </button>
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
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Info className="text-accent" />
                    Broadcast Notice
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Notice Title</label>
                    <input {...register("title")} className="input-field py-3" placeholder="e.g. System Maintenance Schedule" />
                    {errors.title && <p className="text-[10px] text-error mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Target Audience</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["all", "franchise_owner", "teacher", "student"].map(role => (
                        <label key={role} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          targetRole === role ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-500'
                        }`}>
                          <input type="radio" {...register("targetRole")} value={role} className="hidden" />
                          <span className="text-xs font-black uppercase tracking-wider">{role.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {targetRole === "franchise_owner" && (
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Specific Center (Optional)</label>
                      <select {...register("franchiseId")} className="input-field py-3 bg-white">
                        <option value="">All Centers</option>
                        {franchises.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content Message</label>
                    <textarea {...register("content")} className="input-field py-3 h-32" placeholder="Write the notice details here..."></textarea>
                    {errors.content && <p className="text-[10px] text-error mt-1">{errors.content.message}</p>}
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      disabled={mutation.isLoading}
                      className="flex-1 py-4 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          <Send size={18} />
                          <span>Send Broadcast</span>
                        </>
                      )}
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

export default NoticeManagement;
