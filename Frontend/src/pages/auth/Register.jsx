import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Loader2, Building, GraduationCap, ChevronLeft, CheckCircle } from "lucide-react";
import { authAPI } from "../../api/auth.api";
import { publicAPI } from "../../api/public.api";
import { toast } from "react-toastify";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["student", "franchise_owner"]),
  franchiseId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.role === "franchise_owner" || !!data.franchiseId, {
  message: "Please select a franchise center",
  path: ["franchiseId"],
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [franchises, setFranchises] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await publicAPI.getFranchises();
        setFranchises(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch franchises");
      }
    };
    if (selectedRole === "student") {
      fetchFranchises();
    }
  }, [selectedRole]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(data);
      toast.success(response.data.message || "Registration successful! Verification code sent.");
      // Redirect to Verify OTP with email in state
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Info Panel */}
        <div className="md:w-1/3 bg-primary p-8 text-white">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
            <UserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Join Skill Shakti Academy</h2>
          <p className="text-white/70 mb-8 text-sm">
            Unlock professional courses and certifications to advance your career in technology.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
              <span className="text-sm">Access to 20+ specialized courses</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
              <span className="text-sm">Nationally recognized certification</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-2/3 p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Create Account</h3>
            <p className="text-gray-500 text-sm">Fill in the details to register yourself.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setValue("role", "student")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${selectedRole === "student" ? "bg-white text-primary shadow-sm" : "text-gray-500"
                  }`}
              >
                <GraduationCap size={18} />
                <span className="text-sm font-bold">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setValue("role", "franchise_owner")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${selectedRole === "franchise_owner" ? "bg-white text-primary shadow-sm" : "text-gray-500"
                  }`}
              >
                <Building size={18} />
                <span className="text-sm font-bold">Franchise Owner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className={`input-field py-2 ${errors.name ? "border-error" : ""}`}
                />
                {errors.name && <p className="text-[10px] text-error mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className={`input-field py-2 ${errors.email ? "border-error" : ""}`}
                />
                {errors.email && <p className="text-[10px] text-error mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                <input
                  {...register("phone")}
                  type="text"
                  placeholder="9876543210"
                  className={`input-field py-2 ${errors.phone ? "border-error" : ""}`}
                />
                {errors.phone && <p className="text-[10px] text-error mt-1">{errors.phone.message}</p>}
              </div>
              {selectedRole === "student" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Center</label>
                  <select
                    {...register("franchiseId")}
                    className={`input-field py-2 bg-white ${errors.franchiseId ? "border-error" : ""}`}
                  >
                    <option value="">Choose a franchise</option>
                    {franchises.map((f) => (
                      <option key={f._id} value={f._id}>{f.name}</option>
                    ))}
                  </select>
                  {errors.franchiseId && <p className="text-[10px] text-error mt-1">{errors.franchiseId.message}</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={`input-field py-2 ${errors.password ? "border-error" : ""}`}
                />
                {errors.password && <p className="text-[10px] text-error mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Confirm Password</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className={`input-field py-2 ${errors.confirmPassword ? "border-error" : ""}`}
                />
                {errors.confirmPassword && <p className="text-[10px] text-error mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2 mt-6 shadow-primary/20"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Create My Account</span>}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
