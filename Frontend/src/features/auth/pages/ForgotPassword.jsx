import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, Send } from "lucide-react";
import { authAPI } from "../api/auth.api";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authAPI.forgotPassword(data);
      setIsSent(true);
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link.");
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
        {!isSent ? (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Forgot Password?</h2>
            <p className="text-gray-500 text-center mb-8">
              No worries, we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className={`input-field pl-11 ${errors.email ? "border-error" : ""}`}
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <Send size={18} />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-500 mb-8">
              We've sent a password reset link to your email. Please check your inbox and spam folder.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-primary font-bold hover:underline"
            >
              Didn't receive email? Try again
            </button>
          </div>
        )}

        <Link to="/login" className="mt-8 flex items-center justify-center space-x-2 text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft size={18} />
          <span>Back to Login</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
