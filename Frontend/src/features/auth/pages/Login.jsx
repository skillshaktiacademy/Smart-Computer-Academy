import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle, GraduationCap, Building, UserCheck, ShieldCheck, LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { authAPI } from "../api/auth.api";
import { toast } from "react-toastify";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher", "franchise_owner", "super_admin"]),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "student" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Backend expects email or phone, so we need to check which one it is
      const payload = {
        password: data.password,
        role: data.role,
        [data.identifier.includes("@") ? "email" : "phone"]: data.identifier,
      };

      const response = await authAPI.login(payload);
      const { user, accessToken } = response.data.data;

      dispatch(setCredentials({ user, token: accessToken }));
      toast.success(`Welcome back, ${user.name}!`);
      
      // Redirect based on role
      navigate(`/dashboard/${user.role}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "teacher", label: "Teacher", icon: UserCheck },
    { id: "franchise_owner", label: "Franchise", icon: Building },
    { id: "super_admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border-[40px] border-white rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] border-[60px] border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
          >
            <span className="text-primary font-black text-4xl">SCA</span>
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">
            Elevate Your <span className="text-accent">Skills</span>, Shape Your Future.
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Access the most advanced computer institute management system in India. 
            Streamline your learning journey with Smart Computer Academy.
          </p>
          
          <ul className="space-y-4">
            {[
              "QR-Based Digital Certification",
              "Live Attendance Tracking",
              "Unified Student & Fee Management",
              "Multi-Tenant Franchise Support"
            ].map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center text-white space-x-3"
              >
                <CheckCircle className="text-accent" size={24} />
                <span className="text-lg font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-grow flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login to Account</h2>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setValue("role", role.id);
                }}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-300 ${
                  selectedRole === role.id 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <role.icon size={20} className="mb-1" />
                <span className="text-xs font-bold">{role.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email or Phone Number
              </label>
              <input
                {...register("identifier")}
                type="text"
                placeholder="Enter email or phone"
                className={`input-field ${errors.identifier ? "border-error focus:ring-error" : ""}`}
              />
              {errors.identifier && (
                <p className="mt-1 text-xs text-error">{errors.identifier.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password Bird" className="text-sm font-bold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input-field ${errors.password ? "border-error focus:ring-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-error">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
