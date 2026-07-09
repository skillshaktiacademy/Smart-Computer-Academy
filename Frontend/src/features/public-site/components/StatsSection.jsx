import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, ShieldCheck, Award } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const trustMetricsData = [
  { label: "Students Trained", value: "5,000+", icon: Users },
  { label: "Approved Courses", value: "50+", icon: BookOpen },
  { label: "ISO 9001:2015 Center", value: "Certified", icon: ShieldCheck },
  { label: "Job Placements", value: "100+", icon: Award }
];

const StatsSection = () => {
  return (
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
          <p className="text-base text-gray-650 max-w-2xl mx-auto font-normal leading-relaxed">
            We stand apart in deliverable excellence, central Kahalgaon labs, and accredited certifications that actually help you get hired.
          </p>
        </div>  
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-gray-50/50 border border-gray-100 rounded-3xl p-8 sm:p-12">
          {trustMetricsData.map((metric, idx) => (
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
  );
};

export default StatsSection;
