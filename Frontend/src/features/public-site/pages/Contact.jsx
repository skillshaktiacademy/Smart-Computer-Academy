import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, Send, 
  Loader2, Facebook, Youtube, Instagram, 
  Clock, MessageSquare, ShieldCheck, ArrowRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Meta from "../../../components/common/Meta";
import { useNavigate } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email id"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().min(6, "Message is too short"),
});

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

import { breadcrumbJsonLd, faqJsonLd } from "../../../utils/seo";

const Contact = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      alert(`Thank you ${data.name}! Your enquiry for ${data.course} has been successfully submitted. Praveen Sir will contact you on ${data.phone} within 24 hours.`);
      setIsLoading(false);
      reset();
    }, 1000);
  };

  const faqData = [
    {
      question: "How can I book a free demo class at Smart Computer Academy?",
      answer: "You can book a free demo class by submitting the contact form on this page or by calling Director Praveen Sir directly at +91 80925 78834. We welcome you to visit our S.S.V. College Road campus to experience our individual PC labs!"
    },
    {
      question: "Are there any installment options for Tally or ADCA fees?",
      answer: "Yes, we support flexible low-cost monthly installments for ADCA (12 Months - ₹3500) and Tally Prime (6 Months - ₹2500) to support all financial backgrounds."
    },
    {
      question: "Do you provide batch timings for working professionals or college students?",
      answer: "Absolutely! We offer multiple batches starting early morning at 8:00 AM up to 7:00 PM in the evening. You can select any flexible hourly slot that suits your schedule."
    }
  ];

  const contactSchemaMarkup = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact Us", path: "/contact" }
    ]),
    faqJsonLd(faqData)
  ];

  return (
    <>
      <Meta 
        title="Contact Us | Phone, Address & Map Kahalgaon" 
        description="Contact Praveen Sir at Smart Computer Academy Kahalgaon on S.S.V. College Road. Call +91 80925 78834 or submit your admission enquiry online today." 
        keywords="contact computer institute Kahalgaon, Praveen Sir phone number, Smart Computer Academy address, computer classes near me Kahalgaon"
        schema={contactSchemaMarkup}
      />

      {/* Main Container with subtle mesh background and blurred neon nodes */}
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 bg-slate-50/50 min-h-screen relative overflow-hidden pb-24"
      >
        {/* Soft background glow meshes */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* 1. Contact Hero Section with Breadcrumbs */}
        <motion.div 
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full text-center py-16 px-6 sm:px-12 bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl relative z-10 overflow-hidden"
        >
          {/* Breadcrumb */}
          <nav className="flex justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            <span className="hover:text-red-600 transition-colors cursor-pointer" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="text-red-600">Contact Us</span>
          </nav>
          
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Let's <span className="text-red-600 italic">Connect & Learn</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions about our government approved certifications, Tally Accounting coaching, or admissions? Reach out to us immediately!
          </p>
        </motion.div>

        {/* 2. Unified Contact Section (Form Left, Info/Map Right) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 items-start">
          
          {/* Left Column: Enquiry Form (col-span-7) */}
          <motion.div 
            variants={sectionVariants}
            className="lg:col-span-7 bg-white/40 backdrop-blur-xl p-8 lg:p-10 rounded-[32px] border border-white/50 shadow-lg space-y-6"
          >
            <div>
              <h3 className="text-3xl font-black text-gray-950 flex items-center gap-3">
                <MessageSquare className="text-red-600" size={28} />
                <span>Send Admission Enquiry</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">Praveen Sir and our counselors will respond within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">Your Name</label>
                  <input 
                    {...register("name")} 
                    className="w-full px-4 py-3 border border-white/80 bg-white/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold shadow-sm" 
                    placeholder="e.g. Amit Kumar" 
                  />
                  {errors.name && <p className="text-[10px] text-red-600 mt-1.5 font-bold">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input 
                    {...register("email")} 
                    className="w-full px-4 py-3 border border-white/80 bg-white/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold shadow-sm" 
                    placeholder="e.g. name@domain.com" 
                  />
                  {errors.email && <p className="text-[10px] text-red-600 mt-1.5 font-bold">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input 
                    {...register("phone")} 
                    className="w-full px-4 py-3 border border-white/80 bg-white/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold shadow-sm" 
                    placeholder="10-digit number" 
                  />
                  {errors.phone && <p className="text-[10px] text-red-600 mt-1.5 font-bold">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">Course Interested</label>
                  <select 
                    {...register("course")} 
                    className="w-full px-4 py-3 border border-white/80 bg-white/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold text-gray-700 shadow-sm"
                  >
                    <option value="">Select computer program</option>
                    <option value="ADCA">ADCA (Advanced Diploma) - ₹3500</option>
                    <option value="DCA">DCA (Diploma Course) - ₹1500</option>
                    <option value="Tally">Tally Prime + GST - ₹2500</option>
                    <option value="DTP">DTP (Desktop Publishing)</option>
                    <option value="Typing">Hindi & English Typing</option>
                    <option value="DataEntry">Data Entry Operator</option>
                    <option value="WebDev">Full-Stack Web Development</option>
                  </select>
                  {errors.course && <p className="text-[10px] text-red-600 mt-1.5 font-bold">{errors.course.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">Message</label>
                <textarea 
                  {...register("message")} 
                  className="w-full px-4 py-3 border border-white/80 bg-white/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold h-32 resize-none shadow-sm" 
                  placeholder="Tell us about your qualification or time slot preferences..."
                ></textarea>
                {errors.message && <p className="text-[10px] text-red-600 mt-1.5 font-bold">{errors.message.message}</p>}
              </div>

              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-gray-950 text-white font-extrabold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <Send size={16} />
                    <span className="text-xs uppercase tracking-wider font-extrabold">Send Enquiry</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Info & Map (col-span-5) */}
          <motion.div 
            variants={sectionVariants}
            className="lg:col-span-5 flex flex-col gap-6 h-full"
          >
            {/* Info Box */}
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/50 shadow-lg space-y-8">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-950 uppercase tracking-widest mb-1.5">Working Hours</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-bold">Mon - Sat: 8:00 AM - 7:00 PM</p>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mt-1">Sunday: Closed</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200/50"></div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-950 uppercase tracking-widest mb-1.5">Campus Location</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-bold pr-4">
                    S.S.V. College Road, Near STS Coaching, Kahalgaon, Bihar - 813203
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200/50"></div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-950 uppercase tracking-widest mb-1.5">Call Support</h4>
                  <a href="tel:+919905788324" className="text-sm font-black text-red-600 block hover:underline">
                    +91 99057 88324
                  </a>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mt-1">Direct to Praveen Sir</p>
                </div>
              </div>

            </div>

            {/* Map Box */}
            <div className="bg-white/40 backdrop-blur-xl p-3 rounded-[32px] border border-white/50 shadow-lg flex-grow min-h-[300px]">
              <iframe 
                src="https://www.google.com/maps?q=Smart+Computer+Academy+Kahalgaon&output=embed" 
                width="100%" 
                height="100%" 
                className="rounded-[20px] border-0"
                allowFullScreen="" 
                loading="lazy"
                title="Smart Computer Academy Kahalgaon Map"
              ></iframe>
            </div>

          </motion.div>
        </div>

        {/* 5. Branch FAQ accordions */}
        <section className="max-w-4xl mx-auto w-full z-10 space-y-4">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
              FAQs
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-950">Quick Admission FAQ</h3>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  key={i} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-red-200/80 bg-white/60' : 'border-white/60 bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left font-bold text-gray-950 text-xs sm:text-sm flex items-center justify-between outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-xs">{isOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-5 text-xs text-gray-600 leading-relaxed bg-white/40 border-t border-white/50 font-medium"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </motion.div>
    </>
  );
};

export default Contact;
