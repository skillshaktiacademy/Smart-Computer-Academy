import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { 
  Send, MessageCircle, User, Phone, Mail, 
  MapPin, GraduationCap, BookOpen, MonitorPlay,
  ArrowLeft, CheckCircle, Loader2
} from "lucide-react";
import Meta from "../../../components/common/Meta";
import { publicAPI } from "../api/public.api";
import { mockCoursesData } from "../data/coursesData";

import { breadcrumbJsonLd } from "../../../utils/seo";

const Enquiry = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { data: courseData, isLoading: loadingCourse } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => publicAPI.getCourseBySlug(slug),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!slug,
  });

  const apiCourse = courseData?.data?.data;
  const mockCourse = useMemo(() => mockCoursesData.find(c => c.slug === slug), [slug]);
  const course = apiCourse || mockCourse;

  useEffect(() => {
    if (course?.title) {
      setValue("interestedCourse", course.title);
    }
  }, [course, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call for saving enquiry
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Enquiry submitted successfully!");
      setIsSuccess(true);
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = `Hi, I want to enquire about the ${course?.title || "course"}. My name is ${"student"}.`;
    window.open(`https://wa.me/918789302254?text=${encodeURIComponent(message)}`, "_blank");
  };

  const enquirySchema = useMemo(() => {
    if (!course) return null;
    return breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Courses", path: "/courses" },
      { name: course.title, path: `/courses/${course.slug}` },
      { name: "Enquiry", path: `/enquiry/${course.slug}` }
    ]);
  }, [course]);

  if (loadingCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-gray-500 font-bold animate-pulse">Loading Enquiry Form...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/45 backdrop-blur-md max-w-lg w-full p-10 rounded-3xl shadow-2xl border border-white/60 text-center"
        >
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-success" size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
             Thank you for your interest in <span className="font-bold text-gray-900">{course?.title}</span>. 
             Our academic counselor will get in touch with you shortly.
          </p>
          <div className="flex flex-col space-y-4">
            <Link to="/courses" className="btn-primary w-full py-4 rounded-xl text-lg font-bold">
              Explore More Courses
            </Link>
            <button 
              onClick={() => navigate("/")}
              className="text-gray-500 font-bold hover:text-primary transition-colors py-2"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Meta 
        title={`Enquire Now | Admission Inquiry for ${course?.title || "Computer Course"}`} 
        description={`Submit your admission inquiry or request a call back for the ${course?.title || "computer course"} at Smart Computer Academy Kahalgaon. Get fee structures and details.`} 
        keywords={`enquiry ${course?.title || "course"}, computer academy Kahalgaon admissions, call back Smart Computer Academy`} 
        schema={enquirySchema}
      />
      
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <Link to={`/courses/${slug}`} className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-bold transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Course
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content */}
            <div className="lg:w-5/12 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
              >
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                  Admissions Open
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Take the Next Step in Your <span className="text-accent">Career</span>.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Fill out the form to request a callback from our academic counselors. 
                  Get all your questions answered before you enroll.
                </p>
              </motion.div>

              <div className="bg-white/45 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/60 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
                <h3 className="text-sm uppercase text-gray-400 font-black tracking-widest mb-2">Selected Course</h3>
                <h2 className="text-2xl font-black text-gray-900 mb-4">{course?.title}</h2>
                <div className="flex items-center text-gray-600 mb-2 font-medium">
                  <BookOpen size={18} className="mr-3 text-primary" /> Category: {course?.category}
                </div>
                <div className="flex items-center text-gray-600 font-medium">
                  <MonitorPlay size={18} className="mr-3 text-primary" /> Duration: {course?.duration}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-7/12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/45 backdrop-blur-md p-8 lg:p-12 rounded-[2.5rem] shadow-2xl border border-white/60"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-8">Enquiry Form</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <User size={16} className="mr-2 text-primary" /> Full Name
                      </label>
                      <input 
                        {...register("fullName", { required: "Name is required" })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <Phone size={16} className="mr-2 text-primary" /> Phone Number
                      </label>
                      <input 
                        {...register("phone", { required: "Phone is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" } })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <Mail size={16} className="mr-2 text-primary" /> Email Address
                      </label>
                      <input 
                        type="email"
                        {...register("email")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Qualification */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <GraduationCap size={16} className="mr-2 text-primary" /> Qualification
                      </label>
                      <select 
                        {...register("qualification", { required: "Qualification is required" })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                      >
                        <option value="">Select Qualification</option>
                        <option value="10th">10th Pass</option>
                        <option value="12th">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                      {errors.qualification && <p className="text-red-500 text-xs font-bold mt-1">{errors.qualification.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <MapPin size={16} className="mr-2 text-primary" /> City
                      </label>
                      <input 
                        {...register("city", { required: "City is required" })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Patna"
                      />
                      {errors.city && <p className="text-red-500 text-xs font-bold mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Preferred Mode */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        <MonitorPlay size={16} className="mr-2 text-primary" /> Preferred Mode
                      </label>
                      <select 
                        {...register("preferredMode", { required: "Please select mode" })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                      >
                        <option value="">Select Mode</option>
                        <option value="Offline">Offline (Classroom)</option>
                        <option value="Online">Online (Live Classes)</option>
                      </select>
                      {errors.preferredMode && <p className="text-red-500 text-xs font-bold mt-1">{errors.preferredMode.message}</p>}
                    </div>
                  </div>

                  {/* Interested Course */}
                  <div className="space-y-2 hidden">
                    <input {...register("interestedCourse")} type="hidden" />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <MessageCircle size={16} className="mr-2 text-primary" /> Message / Query
                    </label>
                    <textarea 
                      {...register("message")}
                      rows="3"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Any specific questions about the course?"
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 btn-primary py-4 rounded-xl flex items-center justify-center font-bold text-lg disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={20} />}
                      {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleWhatsAppEnquiry}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-colors shadow-lg shadow-green-500/20"
                    >
                      <MessageCircle className="mr-2" size={20} />
                      WhatsApp Us
                    </button>
                  </div>
                  
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiry;
