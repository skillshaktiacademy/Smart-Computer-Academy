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
      <div className="w-full relative">
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
        className="w-full flex flex-col min-h-screen relative overflow-hidden bg-slate-50/20"
      >
        {/* Soft, ultra-subtle glowing meshes (kept minimal to protect clean visuals) */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/[0.015] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.015] rounded-full blur-[140px] pointer-events-none -z-10"></div>
        
        {/* Section 1: Modern SaaS Split-Layout Hero */}
        <div className="w-full bg-alternate-white border-b border-gray-100 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10">
            <Homeslider />
          </div>
        </div>

        {/* Section 2: Trusted Partners & Accreditation Strip (Notion/Stripe style) */}
        <div className="w-full bg-alternate-gray py-10">
          <motion.section 
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6 z-10"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-450">Trusted By & Accredited Under</span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-sm font-extrabold tracking-tight text-gray-800">ISO 9001:2015</span>
              <span className="text-sm font-extrabold tracking-tight text-gray-800">GOVT. OF INDIA REGISTRY</span>
              <span className="text-sm font-extrabold tracking-tight text-gray-800">UDYAM CERTIFIED</span>
              <span className="text-sm font-extrabold tracking-tight text-gray-800">SKILL INDIA INITIATIVES</span>
            </div>
          </motion.section>
        </div>

        {/* Section 3: Popular Courses Section (Spacious layout, clean cards) */}
        <div className="w-full bg-alternate-white py-20 md:py-24">
          <motion.div 
            id="student-choices"
            variants={sectionVariants} 
            className="max-w-7xl mx-auto px-6 sm:px-12 text-center z-10"
          >
            <span className="eyebrow-label">
              Job Oriented Syllabus
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Explore Our <span className="text-red-650">Top Courses</span>
            </h2>
            <p className="text-base text-gray-650 max-w-2xl mx-auto leading-[1.7] mb-16 font-normal">
              Discover Kahalgaon's most comprehensive computer courses. From foundational skills to advanced accounting and web development, we have the perfect program for your career.
            </p>

            {/* Decluttered, clean course cards */}
            <div className="my-6">
              <CourseCards />
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="mt-12 z-20">
              <button 
                onClick={() => navigate('/courses')}
                className="btn-primary py-4 px-10 text-xs uppercase tracking-widest font-bold mx-auto"
              >
                View All Courses
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Section 4: Why Choose Us (Clean whitespace feature cards) */}
        <div className="w-full bg-alternate-gray py-20 md:py-24">
          <motion.section 
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10"
          >
            <div className="text-center mb-16">
              <span className="eyebrow-label">
                Our Key Strengths
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Why Choose Smart Computer Academy?
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
                We stand apart in deliverable excellence, central Kahalgaon labs, and accredited certifications that actually help you get hired.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((feat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="premium-card group text-left"
                >
                  <div className="w-10 h-10 bg-red-50 text-red-650 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <feat.icon size={20} />
                  </div>
                  <h4 className="text-[18px] font-bold text-gray-900 mb-2 leading-snug">{feat.title}</h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed font-medium mb-0">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Section 5: Statistics Section (Dashboard style minimal cards) */}
        <div className="w-full bg-alternate-white py-20 md:py-24">
          <motion.section 
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10"
          >
             <div className="text-center mb-16">
              <span className="eyebrow-label">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Delivering Excellence In Computer Education
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
                We stand apart in deliverable excellence, central Kahalgaon labs, and accredited certifications that actually help you get hired.
              </p>
            </div>  
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-gray-50/50 border border-gray-100 rounded-3xl p-8 sm:p-12">
              {trustMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <metric.icon size={18} />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-0">{metric.value}</h4>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1 mb-0">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Section 6: Student Success Stories Testimonials */}
        <div className="w-full bg-alternate-gray py-20 md:py-24">
          <motion.section 
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6 sm:px-12 w-full z-10"
          >
            <div className="text-center mb-16">
              <span className="eyebrow-label">
                Alumni Success
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Testimonials & Career Success
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
                Read how our graduates established themselves in clerical, corporate accounting, and coding jobs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The ADCA practical course at Smart Computer Academy changed my career. Praveen Sir's personal lab guidelines and the accounting ledger practical sheets prepared me completely for my accountant job.",
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
                  className="bg-white/45 backdrop-blur-md p-8 rounded-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:bg-white/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testi.rating)].map((_, idx) => (
                        <Star key={idx} size={13} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="testimonial-quote">
                      "{testi.quote}"
                    </p>
                  </div>
                  <div className="pt-5 border-t border-gray-100 mt-6 flex items-center gap-3">
                    <div className="testimonial-avatar">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="testimonial-name">{testi.name}</h5>
                      <p className="testimonial-designation">{testi.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Section 7: Certificate Gallery (Clean Masonry) */}
        <div className="w-full bg-alternate-white py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <CertificateGallery />
            </motion.div>
          </div>
        </div>

        {/* Section 8: FAQ Block */}
        <div className="w-full bg-alternate-gray py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Faq />
            </motion.div>
          </div>
        </div>

        {/* Section 9: Admission CTA Premium Banner */}
        <div className="w-full bg-alternate-white py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full"
            >
              <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden z-10 border border-gray-800">
                {/* Ultra subtle background gradient node */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 via-transparent to-blue-600/10 pointer-events-none -z-10" />
                
                <span className="eyebrow-label bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
                  Admissions Ongoing
                </span>
                <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight max-w-3xl mx-auto text-white">
                  Secure Your Seat At Kahalgaon's Most Advanced Computer Academy
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mt-6 max-w-xl mx-auto font-normal leading-relaxed">
                  Join thousands of successful students. Get online verifiable ISO-certified training under expert guidance. Apply today for a free demo class.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-10">
                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate("/contact")}
                    className="btn-primary py-4 px-8 text-xs uppercase tracking-widest font-bold"
                  >
                    Apply Admission Now
                  </motion.button>
                  
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href="tel:+919905788324"
                    className="border border-slate-800 hover:bg-slate-850 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={14} className="text-gray-400" />
                    <span>Call support</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 10: Callback Form Block */}
        <div className="w-full bg-alternate-gray py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Callback />
            </motion.div>
          </div>
        </div>

      </motion.div>
    </>
  );
}

export default Home;
