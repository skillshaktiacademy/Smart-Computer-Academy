import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, PhoneCall, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    eyebrow: "PROGRAM FOR PRACTITIONERS",
    title: "Accelerate Your Productivity with GenAI",
    gradient: "from-[#5b21b6] via-[#6d28d9] to-[#7c3aed]",
    themeColor: "text-purple-600",
    buttonText: "Explore Programs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    link: "/courses/python-programming",
  },
  {
    id: 2,
    eyebrow: "PROGRAM FOR STUDENTS",
    title: "GenAI for Smarter, Faster Learning",
    gradient: "from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb]",
    themeColor: "text-blue-600",
    buttonText: "Explore Program",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    link: "/courses/basic-computer-course",
  },
  {
    id: 3,
    eyebrow: "AGENTIC AI SYSTEMS",
    title: "Agents for Every Ambition",
    gradient: "from-[#0f172a] via-[#1e293b] to-[#3b82f6]",
    themeColor: "text-slate-600",
    buttonText: "Explore Program",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    link: "/courses/python-programming",
  },
  {
    id: 4,
    eyebrow: "DATA ANALYTICS WITH GENAI",
    title: "Turn Data into Decisions with AI",
    gradient: "from-[#a16207] via-[#ca8a04] to-[#eab308]",
    themeColor: "text-yellow-600",
    buttonText: "Explore Program",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    link: "/courses/tally-prime",
  },
  {
    id: 5,
    eyebrow: "FULL-STACK DEVELOPMENT WITH GENAI",
    title: "Build Scalable, Intelligent Apps",
    gradient: "from-[#065f46] via-[#047857] to-[#10b981]",
    themeColor: "text-emerald-600",
    buttonText: "Explore Program",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
    link: "/courses/office-automation",
  }
];

const Homeslider = () => {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Auto-slide effect every 3 seconds, paused on hover
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % slidesData.length);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const activeSlide = slidesData[activeIdx];

  const handleCardClick = (e, link) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div className="w-full py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
      
      {/* ── LEFT COLUMN: High Impact Eyebrow, Heading & Actions ── */}
      <motion.div 
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        className="lg:col-span-6 flex flex-col items-start space-y-7 text-left"
      >
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/10">
          <Sparkles size={14} className="animate-pulse text-amber-300" />
          <span>🚀 1-Year Fast Track & Short-Term Software Courses</span>
        </div>

        {/* Dynamic Bold Typography */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-900 tracking-tight leading-[1.15]">
          Build Your Career <br />
          in <span className="text-blue-600 relative inline-block">
            Software & GenAI
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span> <br />
          in Under 1 Year
        </h1>

        {/* Premium Description Paragraph */}
        <p className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
          Get certified in ADCA, DCA, Tally Prime + GST, coding, and modern web application skills. Experience 100% practical lab-based training at Kahalgaon's ISO 9001:2015 accredited academy and prepare for high-paying corporate clerk & software job tracks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 w-full sm:w-auto pt-2">
          {/* Explore Button */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/courses")}
            className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 border-2 border-transparent"
          >
            <Compass size={16} />
            <span>Explore Programs</span>
          </motion.button>

          {/* Talk to Advisor Button */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="flex-1 sm:flex-initial bg-white hover:bg-slate-50 text-blue-600 border-2 border-blue-600/30 hover:border-blue-600/60 font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            <PhoneCall size={16} />
            <span>Talk to Program Advisor</span>
          </motion.button>
        </div>

        {/* Small Bottom Link */}
        <div 
          onClick={() => navigate("/courses")}
          className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 tracking-wide cursor-pointer transition-colors group mt-2"
        >
          <span>Find your ideal career track in 30 seconds</span>
          <Sparkles size={14} className="group-hover:scale-125 transition-transform" />
        </div>
      </motion.div>

      {/* ── RIGHT COLUMN: Gorgeous 3-Second Responsive Auto-Slider Card ── */}
      <motion.div 
        initial={{ opacity: 0, x: 35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        className="lg:col-span-6 flex flex-col items-center justify-center w-full mt-8 lg:mt-0"
      >
        {/* Active Slide Wrapper */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => handleCardClick(e, activeSlide.link)}
          className="relative w-full max-w-xl aspect-[1.15/1] min-h-[380px] sm:min-h-[420px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden cursor-pointer group select-none border border-white/20 transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
        >
          {/* Background Gradient & Animated Base */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.gradient} transition-all duration-700 ease-out`} />

          {/* Abstract Design Elements */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C50,40 50,60 100,100" stroke="white" strokeWidth="8" fill="none" />
              <path d="M100,0 C50,40 50,60 0,100" stroke="white" strokeWidth="4" fill="none" />
            </svg>
          </div>

          {/* Dynamic Slide Content (Animated with Framer Motion) */}
          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 text-white">
            
            {/* Top Text Details */}
            <div className="max-w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Eyebrow Label */}
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/95">
                    {activeSlide.eyebrow}
                  </div>
                  
                  {/* Bold Title */}
                  <h3 className="text-2xl sm:text-[2.2rem] font-extrabold leading-[1.2] tracking-tight drop-shadow-sm min-h-[5.5rem] sm:min-h-[7rem] h-auto">
                    {activeSlide.title}
                  </h3>

                  {/* White Oval CTA Button */}
                  <div className="pt-2">
                    <button 
                      onClick={(e) => handleCardClick(e, activeSlide.link)}
                      className="bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <span>Explore Programs</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Translucent Stats Bar (Glassmorphic) */}
            <div className="w-full bg-black/15 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl grid grid-cols-3 gap-2 mt-4 text-center">
              <div>
                <h5 className="text-sm sm:text-lg font-black tracking-tight">15,000+</h5>
                <p className="text-[8px] sm:text-[9px] text-white/70 font-extrabold uppercase tracking-widest mt-0.5">LEARNERS</p>
              </div>
              <div className="border-x border-white/10">
                <h5 className="text-sm sm:text-lg font-black tracking-tight">120+</h5>
                <p className="text-[8px] sm:text-[9px] text-white/70 font-extrabold uppercase tracking-widest mt-0.5">FRANCHISES</p>
              </div>
              <div>
                <h5 className="text-sm sm:text-lg font-black tracking-tight">100%</h5>
                <p className="text-[8px] sm:text-[9px] text-white/70 font-extrabold uppercase tracking-widest mt-0.5">PRACTICAL</p>
              </div>
            </div>

          </div>

          {/* Right Side: Learner Graphic Portrait */}
          <div className="absolute bottom-16 right-0 w-[40%] sm:w-[35%] h-[80%] z-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 0.9, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.3 }}
                src={activeSlide.image} 
                alt={activeSlide.title} 
                className="w-full h-full object-cover rounded-t-3xl object-top"
              />
            </AnimatePresence>
            {/* Smooth Vignette on Left of Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
          </div>

        </div>

        {/* ── PAGINATION DOTS (Manual Selector & Visual indicator) ── */}
        <div className="flex gap-2.5 mt-6 items-center">
          {slidesData.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx 
                ? "w-8 bg-blue-600" 
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </motion.div>

    </div>
  );
};

export default Homeslider;
