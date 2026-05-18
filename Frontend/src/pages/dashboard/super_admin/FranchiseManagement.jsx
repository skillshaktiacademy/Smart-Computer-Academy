import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Building2, Plus, Edit3, Trash2, 
  CheckCircle2, XCircle, MoreVertical, 
  ExternalLink, Loader2, X, ShieldCheck, Mail, Phone, MapPin, User
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { adminAPI } from "../../../api/admin.api";
import { toast } from "react-toastify";
import DataTable from "../../../components/ui/DataTable";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { motion, AnimatePresence } from "framer-motion";

const franchiseSchema = z.object({
  name: z.string().min(3, "Franchise name is required"),
  ownerName: z.string().min(3, "Owner name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  }),
});

const FranchiseManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false });
  const queryClient = useQueryClient();

  const { data: franchisesData, isLoading } = useQuery({
    queryKey: ["franchises"],
    queryFn: adminAPI.getAllFranchises,
  });

  const franchises = franchisesData?.data?.data || [];

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(franchiseSchema),
    defaultValues: {
      address: { state: "Bihar" }
    }
  });

  const createMutation = useMutation({
    mutationFn: adminAPI.createFranchise,
    onSuccess: () => {
      queryClient.invalidateQueries(["franchises"]);
      toast.success("Franchise created successfully!");
      setIsAddModalOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create franchise");
    }
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => adminAPI.updateFranchise(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["franchises"]);
      toast.success("Status updated!");
      setConfirmConfig({ isOpen: false });
    }
  });

  const columns = [
    { 
      key: "name", 
      label: "Franchise", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{val}</p>
            <p className="text-xs text-gray-400 font-medium">{row.code}</p>
          </div>
        </div>
      )
    },
    { 
      key: "ownerName", 
      label: "Owner",
      render: (val, row) => (
        <div>
          <p className="font-bold text-gray-700">{val}</p>
          <p className="text-[10px] text-gray-400">{row.email}</p>
        </div>
      )
    },
    { 
      key: "address", 
      label: "City",
      render: (val) => <span className="font-medium text-gray-600">{val?.city}</span>
    },
    { 
      key: "studentCount", 
      label: "Students",
      render: (val) => <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-black text-gray-600">{val || 0}</span>
    },
    { 
      key: "status", 
      label: "Status",
      render: (val) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          val === "active" ? "bg-success/10 text-success" : "bg-error/10 text-error"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${val === "active" ? "bg-success" : "bg-error"}`}></div>
          {val}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Franchise Network</h1>
          <p className="text-gray-500 font-medium">Manage and monitor all institute centers.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary py-3 px-6 flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Add New Franchise</span>
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={franchises} 
        isLoading={isLoading}
        actions={(row) => (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setConfirmConfig({
                  isOpen: true,
                  title: row.status === "active" ? "Deactivate Franchise?" : "Activate Franchise?",
                  message: `Are you sure you want to change the status of ${row.name}?`,
                  onConfirm: () => statusMutation.mutate({ id: row._id, status: row.status === "active" ? "inactive" : "active" }),
                  confirmLabel: row.status === "active" ? "Deactivate" : "Activate",
                  confirmColor: row.status === "active" ? "bg-error" : "bg-success"
                });
              }}
              className={`p-2 rounded-lg transition-all ${
                row.status === "active" ? "text-error hover:bg-error/10" : "text-success hover:bg-success/10"
              }`}
            >
              {row.status === "active" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
            </button>
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
              <Edit3 size={18} />
            </button>
          </div>
        )}
      />

      {/* Add Franchise Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Building2 className="text-primary" />
                    Setup New Franchise
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(createMutation.mutate)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Franchise Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input {...register("name")} className="input-field pl-10" placeholder="Skill Shakti Patna" />
                      </div>
                      {errors.name && <p className="text-[10px] text-error mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Owner Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input {...register("ownerName")} className="input-field pl-10" placeholder="Amit Kumar" />
                      </div>
                      {errors.ownerName && <p className="text-[10px] text-error mt-1">{errors.ownerName.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input {...register("email")} className="input-field pl-10" placeholder="patna@skillshakti.com" />
                      </div>
                      {errors.email && <p className="text-[10px] text-error mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input {...register("phone")} className="input-field pl-10" placeholder="9876543210" />
                      </div>
                      {errors.phone && <p className="text-[10px] text-error mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Owner Password</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="password" {...register("password")} className="input-field pl-10" placeholder="••••••••" />
                      </div>
                      {errors.password && <p className="text-[10px] text-error mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input {...register("address.city")} className="input-field pl-10" placeholder="Patna" />
                      </div>
                      {errors.address?.city && <p className="text-[10px] text-error mt-1">{errors.address.city.message}</p>}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 py-4 px-6 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createMutation.isLoading}
                      className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    >
                      {createMutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          <Plus size={20} />
                          <span>Create Franchise</span>
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

      <ConfirmDialog 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmLabel={confirmConfig.confirmLabel}
        confirmColor={confirmConfig.confirmColor}
        isLoading={statusMutation.isLoading}
      />
    </div>
  );
};

export default FranchiseManagement;
