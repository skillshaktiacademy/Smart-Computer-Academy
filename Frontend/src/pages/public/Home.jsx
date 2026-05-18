import React from 'react';
import { motion } from 'framer-motion';
import Homeslider from '../../components/Homeslider';
import CourseCards from '../../components/CourseCards';
import CertificateGallery from '../../components/certificategallrey';
import Faq from '../../components/Faq';
import Callback from '../../components/Callback';
import Meta from '../../components/common/Meta';
import { useNavigate } from 'react-router-dom';
import { 
  Laptop, ShieldCheck, Award, Users, 
  BookOpen, Star, GraduationCap, ArrowRight,
  Sparkles, CheckCircle2, ChevronRight, PhoneCall
} from 'lucide-react';
import ImageSlider from '../../components/Slider';

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

function Home() {
  const navigate = useNavigate();

  const trustMetrics = [
    { label: "Students Trained", value: "5,000+", icon: Users },
    { label: "Approved Courses", value: "50+", icon: BookOpen },
    { label: "ISO 9001:2015 Center", value: "Certified", icon: ShieldCheck },
    { label: "Job Placements", value: "100+", icon: Award }
  ];

  const whyChooseUs = [
    {
      title: "100% Practical Lab Training",
      desc: "Every student gets dedicated computer access in our modern labs. Learn by doing, not just reading.",
      icon: Laptop
    },
    {
      title: "ISO 9001:2015 Certified Certificate",
      desc: "Receive government registered, globally verifiable certificates that boost your resume value.",
      icon: ShieldCheck
    },
    {
      title: "Industry-Oriented Course Syllabi",
      desc: "Learn Tally Prime with GST, ADCA, coding, and web skills matching active corporate job demands.",
      icon: GraduationCap
    },
    {
      title: "Expert Mentor Support",
      desc: "Get individual attention and direct counseling from Director Praveen Sir and technical staff.",
      icon: Users
    },
    {
      title: "Flexible Batch Schedules",
      desc: "Convenient batch timings from 8:00 AM to 7:00 PM for school, college, and working students.",
      icon: Sparkles
    },
    {
      title: "Central Kahalgaon Location",
      desc: "Easily accessible premium classrooms on S.S.V. College Road, right near STS Coaching.",
      icon: CheckCircle2
    }
  ];

  return (
    <>

     {/* image slider section  */}
        <div>
          <ImageSlider />
        </div>

        
      <Meta 
        title="Smart Computer Academy Kahalgaon | ISO Certified Technical Training Center" 
        description="Premium vocational computer education center on S.S.V. College Road, Kahalgaon. Learn ADCA, DCA, Tally Prime + GST, coding and web skills with 100% practical lab training."
        keywords="computer classes Kahalgaon, computer courses Kahalgaon, Tally Prime GST coaching Kahalgaon, ADCA DCA Kahalgaon, Praveen Sir computer Kahalgaon"
      />

      {/* Main Container with highly spacious minimal Stripe/Apple aesthetic */}
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50/45 min-h-screen relative overflow-hidden pb-16 space-y-24"
      >
        {/* Soft, ultra-subtle glowing meshes (kept minimal to protect clean visuals) */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10"></div>
        


        
        {/* Section 1: Modern SaaS Split-Layout Hero */}
        <motion.div variants={sectionVariants} className="max-w-7xl mx-auto w-full z-10">
          <Homeslider />
        </motion.div>

        {/* Section 2: Trusted Partners & Accreditation Strip (Notion/Stripe style) */}
        <motion.section 
          variants={sectionVariants}
          className="max-w-7xl mx-auto w-full py-8 border-y border-gray-100 bg-white/40 rounded-3xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Trusted By & Accredited Under</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-sm font-extrabold tracking-tight text-gray-800">ISO 9001:2015</span>
            <span className="text-sm font-extrabold tracking-tight text-gray-800">GOVT. OF INDIA REGISTRY</span>
            <span className="text-sm font-extrabold tracking-tight text-gray-800">UDYAM CERTIFIED</span>
            <span className="text-sm font-extrabold tracking-tight text-gray-800">SKILL INDIA INITIATIVES</span>
          </div>
        </motion.section>

        {/* Section 3: Popular Courses Section (Spacious layout, clean cards) */}
        <motion.div 
          id="student-choices"
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full text-center z-10"
        >
          <span className="inline-block px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm">
            Our Job Oriented Syllabus
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            Student’s Top Choices
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed mb-12 font-medium">
            Explore our most popular and career-focused <strong className="font-extrabold text-red-600">computer courses in Kahalgaon</strong>, designed with hands-on labs and direct corporate placement guidance.
          </p>

          {/* Decluttered, clean course cards */}
          <div className="my-6">
            <CourseCards />
          </div>

          <motion.div whileTap={{ scale: 0.95 }} className="mt-10 z-20">
            <button 
              onClick={() => navigate('/courses')}
              className="bg-red-600 hover:bg-gray-900 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:shadow-md transition-all duration-300 transform active:scale-95 shadow-sm cursor-pointer"
            >
              View All Courses
            </button>
          </motion.div>
        </motion.div>

        {/* Section 4: Why Choose Us (Clean whitespace feature cards) */}
        <motion.section 
          variants={sectionVariants}
          className="max-w-7xl mx-auto w-full z-10"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm">
              Our Key Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              Why Learn At Smart Computer Academy?
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
              We stand apart in deliverable excellence, central Kahalgaon labs, and accredited certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, borderColor: "rgba(220, 38, 38, 0.2)" }}
                className="bg-white p-6 rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-left group"
              >
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <feat.icon size={20} />
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 mb-2">{feat.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Statistics Section (Dashboard style minimal cards) */}
        <motion.section 
          variants={sectionVariants}
          className="max-w-7xl mx-auto w-full bg-white border border-gray-100 shadow-sm rounded-3xl p-8 sm:p-12 z-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {trustMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <metric.icon size={18} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{metric.value}</h4>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Student Success Stories Testimonials */}
        <motion.section 
          variants={sectionVariants}
          className="max-w-7xl mx-auto w-full z-10"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm">
              Alumni Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              Testimonials & Career Success
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
              Read how our graduates established themselves in clerical, corporate accounting, and coding jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The ADCA practical course at Smart Computer Academy changed my career. Prairie Sir's personal lab guidelines and the accounting ledger practical sheets prepared me completely for my accountant job.",
                name: "Rahul Kumar",
                role: "Office Accountant, Kahalgaon",
                rating: 5,
              },
              {
                quote: "Tally Prime with GST course is highly detailed. I got hands-on experience in billing, taxation, and payroll. The ISO certificate was extremely useful for my resume clearance.",
                name: "Pooja Kumari",
                role: "Commerce Graduate",
                rating: 5,
              },
              {
                quote: "Typing speed is very vital for clerical exams. Smart Computer Academy's touch typing keys and regular speed tests helped me achieve 45 WPM in Hindi & English, securing my clerk exam criteria.",
                name: "Amit Mandal",
                role: "Govt. Clerk Aspirant",
                rating: 5,
              }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} size={13} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-550 leading-relaxed font-medium italic">
                    "{testi.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-50 mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-xs font-black">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-900">{testi.name}</h5>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Supporting Modules with clean spacing */}
        <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
          
          {/* Section 7: Certificate Gallery (Clean Masonry) */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <CertificateGallery />
          </motion.div>

          {/* Section 8: FAQ Block */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Faq />
          </motion.div>

          {/* Section 9: Admission CTA Premium Banner (Stripe minimal style) */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full"
          >
            <div className="bg-gray-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-md relative overflow-hidden z-10">
              {/* Ultra subtle background gradient node */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/[0.08] to-blue-500/[0.04] pointer-events-none -z-10" />
              
              <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4">
                Admissions Ongoing
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight max-w-xl mx-auto">
                Secure Your Seat At Kahalgaon's Central Computer Academy
              </h3>
              <p className="text-xs text-slate-400 mt-3 max-w-md mx-auto font-medium">
                Get online verifiable ISO-certified training under Praveen Sir. Apply today for a free demo class.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/contact")}
                  className="bg-red-600 hover:bg-white text-white hover:text-red-600 text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Apply Admission Now
                </motion.button>
                
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  href="tel:+919905788324"
                  className="border border-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <PhoneCall size={14} className="text-gray-400" />
                  <span>Call support</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Section 10: Callback Form Block */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Callback />
          </motion.div>

        </div>

      </motion.div>
    </>
  );
}

export default Home;
