import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Laptop, Award, ShieldCheck, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homeslider = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
      
      {/* Left Column: High-Impact Typography & CTA */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="lg:col-span-6 space-y-6 text-left"
      >
        {/* Modern Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50/80 border border-red-100 rounded-full text-red-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
          <ShieldCheck size={14} className="text-red-600" />
          <span>Govt. Regd. ISO 9001:2015 Center</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
          Empower Your Future With <span className="text-red-600 relative inline-block">
            Digital Skills
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Short Subtitle */}
        <p className="text-lg sm:text-[19px] text-gray-600 max-w-xl leading-[1.6] font-normal">
          Welcome to Kahalgaon's premier IT training institute. We provide 100% practical, industry-focused training in Tally Prime (GST), ADCA, DCA, and Web Development. Build a career that stands out.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.getElementById("student-choices");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/courses");
              }
            }}
            className="btn-primary px-8 py-4 text-xs uppercase tracking-widest font-bold"
          >
            <span>Explore Courses</span>
            <ArrowRight size={16} />
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="btn-secondary px-8 py-4 text-xs uppercase tracking-widest font-bold"
          >
            <Play size={13} className="text-red-500 fill-red-500" />
            <span>Book Free Demo</span>
          </motion.button>
        </div>

        {/* Stats Row */}
        <div className="pt-8 mt-4 border-t border-gray-100 flex items-center justify-between sm:justify-start sm:gap-12">
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-black text-gray-900">5k+</h4>
            <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest mt-1">Students</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-black text-gray-900">100%</h4>
            <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest mt-1">Practical</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-black text-gray-900">ISO</h4>
            <p className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest mt-1">Certified</p>
          </div>
        </div>

      </motion.div>

      {/* Right Column: Clean SaaS Mockup Illustration */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="lg:col-span-6 relative flex justify-center items-center mt-10 lg:mt-0"
      >
        {/* Gradient Behind Image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-blue-600/5 rounded-[40px] blur-[50px] pointer-events-none -z-10" />

        {/* High Quality Minimal Hero Image */}
        <div className="w-full max-w-md lg:max-w-none rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white/80 bg-white/20 aspect-[4/3] relative group">
          <img 
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" 
            alt="Smart computer education mockup lab" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle Overlay to match SaaS aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating Premium Card (SaaS Style) */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-white shadow-xl flex items-center gap-3 max-w-[260px]"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
              <Laptop size={18} />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Hands-on Labs</h5>
              <p className="text-[10px] text-gray-500 font-bold mt-0.5">1-to-1 computer practical.</p>
            </div>
          </motion.div>

          {/* Floating Verified Badge */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-white shadow-xl flex items-center gap-3 max-w-[240px]"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Award size={18} />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Govt. Registered</h5>
              <p className="text-[10px] text-gray-500 font-bold mt-0.5">UDYAM-BR-07-00328832</p>
            </div>
          </motion.div>
        </div>

      </motion.div>

    </div>
  );
};

export default Homeslider;
