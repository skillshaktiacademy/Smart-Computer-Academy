import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const AdmissionCtaSection = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default AdmissionCtaSection;
