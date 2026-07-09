import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { authAPI } from "../api/auth.api";
import { toast } from "react-toastify";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or expired reset token.");
      return;
    }
    setIsLoading(true);
    try {
      await authAPI.resetPassword(token, data);
      toast.success("Password reset successful! You can now login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password</h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`input-field ${errors.password ? "border-error" : ""}`}
            />
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={`input-field ${errors.confirmPassword ? "border-error" : ""}`}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <CheckCircle size={18} />
                <span>Reset Password</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
