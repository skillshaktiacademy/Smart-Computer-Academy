import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Laptop, Award, ShieldCheck, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homeslider = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      
      {/* Left Column: High-Impact Typography & CTA */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="lg:col-span-6 space-y-6 text-left"
      >
        {/* Modern Trust Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
          <ShieldCheck size={12} className="text-red-600" />
          <span>ISO 9001:2015 Certified Center</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.08]">
          Build Your Career With <span className="text-red-600">Modern Computer</span> Skills
        </h1>

        {/* Short Subtitle */}
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg leading-relaxed font-medium">
          Industry-focused practical training with government-certified courses. Master Tally Prime with GST, ADCA, DCA, and web coding under expert instructors on S.S.V. College Road, Kahalgaon.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.getElementById("student-choices");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/courses");
              }
            }}
            className="bg-red-600 hover:bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Courses</span>
            <ArrowRight size={14} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="border border-gray-200 bg-white hover:bg-slate-50 text-gray-700 text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={12} className="text-gray-400 fill-gray-400" />
            <span>Free Demo Class</span>
          </motion.button>
        </div>

        {/* Stats Row */}
        <div className="pt-6 border-t border-gray-100 flex items-center gap-8">
          <div>
            <h4 className="text-xl font-black text-gray-900">5,000+</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Trained Students</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <h4 className="text-xl font-black text-gray-900">98%</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Practical Success</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <h4 className="text-xl font-black text-gray-900">100%</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Online Verified</p>
          </div>
        </div>

      </motion.div>

      {/* Right Column: Clean SaaS Mockup Illustration */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="lg:col-span-6 relative flex justify-center items-center"
      >
        {/* Gradient Behind Image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-blue-500/5 rounded-3xl blur-[40px] pointer-events-none -z-10" />

        {/* High Quality Minimal Hero Image */}
        <div className="w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white/20 aspect-[4/3] relative">
          <img 
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" 
            alt="Smart computer education mockup lab" 
            className="w-full h-full object-cover"
          />
          {/* Subtle Overlay to match SaaS aesthetics */}
          <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />

          {/* Floating Premium Card (SaaS Style) */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/80 shadow-md flex items-center gap-3 max-w-[240px]"
          >
            <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
              <Laptop size={16} />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Hands-on Labs</h5>
              <p className="text-[10px] text-gray-500 font-semibold">1-to-1 computer practical access.</p>
            </div>
          </motion.div>

          {/* Floating Verified Badge */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/80 shadow-md flex items-center gap-3 max-w-[220px]"
          >
            <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Award size={16} />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Govt. Registered</h5>
              <p className="text-[10px] text-gray-500 font-semibold">UDYAM-BR-07-00328832</p>
            </div>
          </motion.div>
        </div>

      </motion.div>

    </div>
  );
};

export default Homeslider;
