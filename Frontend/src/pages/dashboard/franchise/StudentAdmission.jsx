import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, BookOpen, CreditCard, ArrowRight, 
  ArrowLeft, CheckCircle2, Upload, Loader2,
  Camera, FileText, Calendar, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import { publicAPI } from "../../../api/public.api";
import { franchiseAPI } from "../../../api/franchise.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const studentSchema = z.object({
  name: z.string().min(3, "Name is required"),
  fatherName: z.string().min(3, "Father's name is required"),
  motherName: z.string().min(3, "Mother's name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(10, "Address is too short"),
  courseId: z.string().min(1, "Course is required"),
  admissionFee: z.coerce.number().min(0),
  totalFee: z.coerce.number().min(0),
  couponCode: z.string().optional().or(z.literal("")),
});

const StudentAdmission = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({ photo: null, aadhar: null });
  const [couponPreview, setCouponPreview] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: coursesData } = useQuery({
    queryKey: ["courses-list"],
    queryFn: () => publicAPI.getCourses(),
  });

  const courses = coursesData?.data?.data || [];

  const { register, handleSubmit, formState: { errors, isValid }, watch, setValue, getValues } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { gender: "Male" }
  });

  const selectedCourseId = watch("courseId");
  const selectedCourse = courses.find(c => c._id === selectedCourseId);

  // Update total fee when course changes
  useState(() => {
    if (selectedCourse) setValue("totalFee", selectedCourse.fee);
  }, [selectedCourseId]);

  const handleCheckCoupon = async () => {
    const code = getValues("couponCode");
    if (!code) return;

    setIsCheckingCoupon(true);
    setCouponError("");
    setCouponPreview(null);
    try {
      const response = await franchiseAPI.validateCoupon({
        code,
        courseId: selectedCourseId,
        totalFee: selectedCourse?.fee,
      });
      setCouponPreview(response.data.data);
      toast.success("Coupon applied!");
    } catch (err) {
      setCouponError(err.response?.data?.message || "Invalid coupon code");
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "courseId" && key !== "admissionFee" && key !== "totalFee" && key !== "couponCode") {
          formData.append(key, value);
        }
      });
      if (files.photo) formData.append("photo", files.photo);
      if (files.aadhar) formData.append("aadhar", files.aadhar);

      const studentRes = await api.post("/students", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const student = studentRes.data.data;

      return franchiseAPI.createEnrollment({
        studentId: student._id,
        courseId: data.courseId,
        totalFee: data.totalFee,
        couponCode: data.couponCode || undefined,
      });
    },
    onSuccess: () => {
      toast.success("Student admitted and enrolled successfully!");
      queryClient.invalidateQueries(["franchise-stats"]);
      navigate("/dashboard/franchise/students");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Admission failed")
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-900">New Student Admission</h1>
        <p className="text-gray-500 font-medium">Complete the 3-step process to enroll a new student.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center space-x-4 mb-12">
        {[
          { icon: User, label: "Personal" },
          { icon: Camera, label: "Documents" },
          { icon: CreditCard, label: "Enrollment" }
        ].map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              step >= i + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-100 text-gray-400"
            }`}>
              <s.icon size={22} />
            </div>
            {i < 2 && (
              <div className={`w-12 h-1 bg-gray-100 mx-2 rounded-full overflow-hidden`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: step > i + 1 ? "100%" : "0%" }}
                  className="h-full bg-primary"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit(mutation.mutate)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 space-y-8"
              >
                <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Student Full Name</label>
                    <input {...register("name")} className="input-field py-3" placeholder="John Doe" />
                    {errors.name && <p className="text-[10px] text-error mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase mb-2">DOB</label>
                      <input type="date" {...register("dob")} className="input-field py-3" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase mb-2">Gender</label>
                      <select {...register("gender")} className="input-field py-3 bg-white">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Father's Name</label>
                    <input {...register("fatherName")} className="input-field py-3" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Mother's Name</label>
                    <input {...register("motherName")} className="input-field py-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Phone Number</label>
                    <input {...register("phone")} className="input-field py-3" placeholder="10 digits" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Email Address</label>
                    <input {...register("email")} className="input-field py-3" placeholder="optional" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Full Address</label>
                  <textarea {...register("address")} className="input-field py-3 h-24" placeholder="Complete residential address"></textarea>
                </div>

                <div className="flex justify-end pt-8">
                  <button type="button" onClick={nextStep} className="btn-primary py-4 px-12 flex items-center gap-2">
                    <span>Next Step</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 space-y-12"
              >
                <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-4">Document Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-gray-400 uppercase">Student Passport Photo</label>
                    <div className="border-4 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden group">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFiles({...files, photo: e.target.files[0]})} />
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary mb-4">
                          <Camera size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-600">{files.photo ? files.photo.name : "Click to upload photo"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black text-gray-400 uppercase">Aadhar Card Copy</label>
                    <div className="border-4 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden group">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFiles({...files, aadhar: e.target.files[0]})} />
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary mb-4">
                          <FileText size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-600">{files.aadhar ? files.aadhar.name : "Click to upload Aadhar"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button type="button" onClick={prevStep} className="px-10 py-4 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Back</button>
                  <button type="button" onClick={nextStep} className="btn-primary py-4 px-12 flex items-center gap-2">
                    <span>Next Step</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 space-y-10"
              >
                <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-4">Course & Fee Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Target Course</label>
                    <select {...register("courseId")} className="input-field py-3 bg-white">
                      <option value="">Select a course</option>
                      {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Admission Fee Paid (₹)</label>
                    <input type="number" {...register("admissionFee")} className="input-field py-3" placeholder="e.g. 1000" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Coupon / Scholarship Code (optional)</label>
                  <div className="flex gap-3">
                    <input
                      {...register("couponCode")}
                      className="input-field py-3 uppercase"
                      placeholder="e.g. WELCOME10"
                    />
                    <button
                      type="button"
                      onClick={handleCheckCoupon}
                      disabled={isCheckingCoupon || !selectedCourseId}
                      className="px-6 py-3 font-bold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-all whitespace-nowrap"
                    >
                      {isCheckingCoupon ? <Loader2 className="animate-spin" size={18} /> : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-error mt-2">{couponError}</p>}
                  {couponPreview && (
                    <p className="text-xs font-bold text-success mt-2">
                      Discount applied: ₹{couponPreview.discount} off
                    </p>
                  )}
                </div>

                {selectedCourse && (
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-gray-400 uppercase mb-2 tracking-widest">Total Course Fee</h4>
                      <p className="text-4xl font-black text-primary">
                        ₹{couponPreview ? selectedCourse.fee - couponPreview.discount : selectedCourse.fee}
                      </p>
                      {couponPreview && (
                        <p className="text-xs font-bold text-gray-400 line-through">₹{selectedCourse.fee}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 mb-1">Includes all study materials</p>
                      <p className="text-xs font-bold text-gray-500">Duration: {selectedCourse.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-8">
                  <button type="button" onClick={prevStep} className="px-10 py-4 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Back</button>
                  <button type="submit" disabled={mutation.isLoading} className="btn-primary py-4 px-12 flex items-center gap-2">
                    {mutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        <CheckCircle2 size={20} />
                        <span>Complete Admission</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default StudentAdmission;
