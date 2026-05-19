import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const AccreditationStrip = () => {
  return (
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
  );
};

export default AccreditationStrip;
