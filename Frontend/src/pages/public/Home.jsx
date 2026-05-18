import React from 'react';
import { motion } from 'framer-motion';
import Homeslider from '../../components/Homeslider';
import CourseCards from '../../components/CourseCards';
import CertificateGallery from '../../components/certificategallrey';
import Faq from '../../components/Faq';
import Callback from '../../components/Callback';
import Meta from '../../components/common/Meta';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 } 
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Optimization Meta Tags */}
      <Meta 
        title="Smart Computer Academy | Best Computer Classes in Balbadda, Godda" 
        description="Explore career-focused computer courses at Smart Computer Academy in Balbadda, Godda. Learn ADCA, DCA, Tally Prime + GST, Web Development, SEO, and coding with 100% practical lab training."
        keywords="computer classes Balbadda, computer courses Godda, Tally GST coaching Godda, web development course Balbadda, ADCA DCA Godda"
      />

      {/* Main Container with highly optimized minimalist background mesh */}
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 bg-slate-50/50 min-h-screen relative overflow-hidden"
      >
        {/* Soft, modern glowing glassmorphism background blobs (won't affect readability) */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        {/* Section 1: Hero Image Slider Banner */}
        <motion.div variants={sectionVariants} className="max-w-7xl mx-auto w-full z-10">
          <Homeslider />
        </motion.div>

        {/* Section 2: Student's Top Choices (Glassmorphism & Clean Typography) */}
        <motion.div 
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full text-center py-12 px-6 sm:px-12 bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl relative z-10 overflow-hidden"
        >
          <div>
            <span className="inline-block px-3.5 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4 shadow-sm">
              Explore Our Top Programs
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Student’s Top Choices
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed italic mb-10 border-l-4 border-red-500 pl-4 text-left font-medium">
              "Explore our most popular and career-focused <strong className="font-extrabold text-red-600">computer courses in Balbadda, Godda</strong>, designed with practical knowledge and live training. Discover our trusted and in-demand programs to achieve academic excellence and professional success."
            </p>

            {/* Course Cards Container */}
            <div className="my-6">
              <CourseCards />
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="mt-8 z-20">
              <button 
                onClick={() => navigate('/courses')}
                className="bg-red-600 hover:bg-gray-900 text-white font-extrabold text-sm px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform active:scale-95 shadow-md"
              >
                View All Courses
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Supporting Sections with Spring Animation on Scroll */}
        <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
          
          {/* Certificate Gallery Block */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <CertificateGallery />
          </motion.div>

          {/* Clean FAQ Block (Transparent layout) */}
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Faq />
          </motion.div>

          {/* Callback Form Block */}
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
