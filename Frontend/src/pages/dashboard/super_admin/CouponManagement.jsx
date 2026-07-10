import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Ticket, Plus, Trash2,
  Loader2, X, Percent, IndianRupee, Info,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { adminAPI } from "../../../api/admin.api";
import { toast } from "react-toastify";
import DataTable from "../../../components/ui/DataTable";
import { motion, AnimatePresence } from "framer-motion";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20),
  type: z.enum(["percentage", "flat"]),
  value: z.coerce.number().positive("Value must be positive"),
  maxUses: z.coerce.number().int().positive().optional().or(z.literal("")),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

const CouponManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: adminAPI.getAllCoupons,
  });

  const coupons = couponsData?.data?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: { type: "percentage" },
  });

  const type = watch("type");

  const mutation = useMutation({
    mutationFn: (data) =>
      adminAPI.createCoupon({ ...data, maxUses: data.maxUses || null }),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      toast.success("Coupon created!");
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to create coupon"),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id) => adminAPI.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      toast.success("Coupon deactivated");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to deactivate coupon"),
  });

  const columns = [
    {
      key: "code",
      label: "Coupon",
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <Ticket size={18} />
          </div>
          <div>
            <p className="font-black text-gray-900 tracking-widest">{val}</p>
            <p className="text-xs text-gray-400 font-medium">
              {row.type === "percentage" ? `${row.value}% off` : `₹${row.value} off`}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "usedCount",
      label: "Usage",
      render: (val, row) => (
        <span className="text-xs font-bold text-gray-600">
          {val} / {row.maxUses ?? "∞"}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (val) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            val ? "bg-success/10 text-success" : "bg-gray-100 text-gray-400"
          }`}
        >
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Coupons & Scholarships</h1>
          <p className="text-gray-500 font-medium">Manage discount codes applied at student admission.</p>
        </div>
        <button
          onClick={() => { reset(); setIsModalOpen(true); }}
          className="btn-primary py-3 px-6 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Coupon</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={coupons}
        isLoading={isLoading}
        actions={(row) => (
          <button
            onClick={() => deactivateMutation.mutate(row._id)}
            disabled={!row.isActive}
            className="p-2 text-gray-400 hover:text-error hover:bg-error/5 rounded-lg transition-all disabled:opacity-30"
          >
            <Trash2 size={18} />
          </button>
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
                    <Info className="text-primary" />
                    Create Coupon
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Coupon Code</label>
                    <input {...register("code")} className="input-field py-3 uppercase" placeholder="e.g. WELCOME10" />
                    {errors.code && <p className="text-[10px] text-error mt-1">{errors.code.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Discount Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${type === "percentage" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-500"}`}>
                        <input type="radio" {...register("type")} value="percentage" className="hidden" />
                        <Percent size={16} />
                        <span className="text-xs font-black uppercase tracking-wider">Percentage</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${type === "flat" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-500"}`}>
                        <input type="radio" {...register("type")} value="flat" className="hidden" />
                        <IndianRupee size={16} />
                        <span className="text-xs font-black uppercase tracking-wider">Flat Amount</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                        Value {type === "percentage" ? "(%)" : "(₹)"}
                      </label>
                      <input type="number" {...register("value")} className="input-field py-3" />
                      {errors.value && <p className="text-[10px] text-error mt-1">{errors.value.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Max Uses (blank = unlimited)</label>
                      <input type="number" {...register("maxUses")} className="input-field py-3" placeholder="e.g. 50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid From</label>
                      <input type="date" {...register("validFrom")} className="input-field py-3" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid To</label>
                      <input type="date" {...register("validTo")} className="input-field py-3" />
                    </div>
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
                      {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Create Coupon</span>}
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

export default CouponManagement;
