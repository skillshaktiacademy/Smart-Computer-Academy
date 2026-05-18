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
import Meta from "../../components/common/Meta";
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
      answer: "You can book a free demo class by submitting the contact form on this page or by calling Director Praveen Sir directly at +91 99057 88324. We welcome you to visit our S.S.V. College Road campus to experience our individual PC labs!"
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

  return (
    <>
      <Meta 
        title="Contact Us | Smart Computer Academy Kahalgaon" 
        description="Get in touch with Smart Computer Academy Kahalgaon. Contact Director Praveen Sir for course details, admission help, Tally certifications, or cyber office inquiries." 
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

        {/* 2. Contact Information Cards grid */}
        <section className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
          
          {/* Card 1: Address */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-md flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Our Location</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                S.S.V. College Road, Near STS Coaching, Kahalgaon, Bihar - 813203
              </p>
            </div>
          </motion.div>

          {/* Card 2: Phone */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-md flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Call Support</h4>
              <a href="tel:+919905788324" className="text-xs font-bold text-red-600 block hover:underline">
                +91 99057 88324
              </a>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Founder Praveen Sir</p>
            </div>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-md flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Email Inquiry</h4>
              <a href="mailto:info@smartcomputeracademy.com" className="text-xs font-bold text-red-600 block hover:underline">
                info@smartcomputeracademy.com
              </a>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">24/7 Digital Support</p>
            </div>
          </motion.div>

          {/* Card 4: Working Hours */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-md flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Office Hours</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Mon - Sat: 8:00 AM - 7:00 PM
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Sunday: Closed</p>
            </div>
          </motion.div>
        </section>

        {/* 3. Form & Social Media column split */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 items-stretch">
          
          {/* Left Column: Form Info and Social media handles */}
          <motion.div 
            variants={sectionVariants}
            className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="inline-flex items-center space-x-2 text-red-600 font-black uppercase tracking-widest text-xs mb-3">
                <MessageSquare size={16} />
                <span>Immediate Support</span>
              </div>
              <h3 className="text-2xl font-black text-gray-950 mb-2">Visit Our Central Branch</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Our central smart computer laboratory campus is located in the heart of S.S.V College Road. Walk in anytime to inspect our infrastructure, practice sheets, and check out ISO student verification logs.
              </p>
            </div>

            {/* Glowing Admission WhatsApp Support CTA */}
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/919905788324?text=Hi%20Praveen%20Sir,%20I%20am%2520interested%20in%20taking%20admission%20at%20Smart%20Computer%20Academy%20Kahalgaon.%20Please%20guide%20me!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold p-4 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.977 14.113.953 11.487.953c-5.43 0-9.85 4.37-9.854 9.8.001 1.722.463 3.4 1.34 4.9L2 21.623l6.26-1.62c.38.22.76.43 1.15.58-.29-.25-.56-.56-.76-.89zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
              </svg>
              <span className="text-xs uppercase tracking-wider font-extrabold">Instant WhatsApp Support</span>
            </motion.a>

            <div>
              <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Follow Us Online</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/60 border border-white/80 rounded-xl flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/60 border border-white/80 rounded-xl flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm hover:scale-110"
                >
                  <Youtube size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/60 border border-white/80 rounded-xl flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Beautiful Contact Form (Glassmorphism) */}
          <motion.div 
            variants={sectionVariants}
            className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-black text-gray-950 flex items-center gap-3">
                <MessageSquare className="text-red-600" size={24} />
                <span>Send Admission Enquiry</span>
              </h3>
              <p className="text-xs text-gray-500">Praveen Sir and our counselors will respond within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Name</label>
                  <input 
                    {...register("name")} 
                    className="w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold" 
                    placeholder="e.g. Amit Kumar" 
                  />
                  {errors.name && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                  <input 
                    {...register("email")} 
                    className="w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold" 
                    placeholder="e.g. name@domain.com" 
                  />
                  {errors.email && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                  <input 
                    {...register("phone")} 
                    className="w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold" 
                    placeholder="10-digit number" 
                  />
                  {errors.phone && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Course Interested</label>
                  <select 
                    {...register("course")} 
                    className="w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold text-gray-700"
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
                  {errors.course && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.course.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Message</label>
                <textarea 
                  {...register("message")} 
                  className="w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-xs font-semibold h-32 resize-none" 
                  placeholder="Tell us about your qualification or time slot preferences..."
                ></textarea>
                {errors.message && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.message.message}</p>}
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-gray-950 text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <Send size={16} />
                    <span className="text-xs uppercase tracking-wider font-extrabold">Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* 4. Google Map section (Kahalgaon, Bihar) */}
        <section className="max-w-7xl mx-auto w-full z-10 h-[450px] rounded-3xl overflow-hidden shadow-lg border border-white/50 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14421.433917812975!2d87.21142999999999!3d25.275390000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0464f1dc0b007%3A0xc3cf90a5976b92f4!2sKahalgaon%2C%20Bihar%20813203!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Smart Computer Academy Kahalgaon Map"
          ></iframe>
        </section>

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
