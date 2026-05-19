import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CourseCards from '../CourseCards';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const CoursesSection = () => {
  const navigate = useNavigate();

  return (
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
          Explore Our Our <span className="text-red-650">Top Courses</span>
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
  );
};

export default CoursesSection;
