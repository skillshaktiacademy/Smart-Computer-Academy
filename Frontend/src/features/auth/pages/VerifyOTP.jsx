import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ShieldCheck, Loader2, RefreshCw, ChevronLeft } from "lucide-react";
import { authAPI } from "../api/auth.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { getRoleHome } from "../../../lib/roles";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.verifyOTP({ 
        email: location.state.email, 
        otp: otpValue 
      });
      const { user, accessToken } = response.data.data;
      
      dispatch(setCredentials({ user, token: accessToken }));
      toast.success("Email verified successfully! Welcome.");
      navigate(getRoleHome(user.role));
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await authAPI.resendOTP({ email });
      setTimer(600);
      setCanResend(false);
      toast.success("New OTP sent to your email.");
    } catch (error) {
      toast.error("Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <ShieldCheck size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
        <p className="text-gray-500 mb-8">
          We've sent a 6-digit verification code to <br />
          <span className="font-bold text-gray-900">{email}</span>
        </p>

        <div className="flex justify-between mb-8 gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full btn-primary py-3 mb-6 flex items-center justify-center space-x-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Verify Account</span>}
        </button>

        <div className="text-sm">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-primary font-bold hover:underline flex items-center justify-center mx-auto space-x-2"
            >
              <RefreshCw size={16} />
              <span>Resend Verification Code</span>
            </button>
          ) : (
            <p className="text-gray-500">
              Resend code in <span className="font-bold text-primary">{formatTime(timer)}</span>
            </p>
          )}
        </div>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 flex items-center justify-center mx-auto text-gray-400 hover:text-gray-600 font-medium"
        >
          <ChevronLeft size={20} />
          <span>Back to Login</span>
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
