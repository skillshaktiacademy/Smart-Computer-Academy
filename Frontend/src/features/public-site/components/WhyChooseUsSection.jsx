import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, ShieldCheck, GraduationCap, Users, Sparkles, CheckCircle2 
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const whyChooseUsData = [
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

const WhyChooseUsSection = () => {
  return (
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
          <p className="text-base text-gray-650 max-w-2xl mx-auto font-normal leading-relaxed">
            We stand apart in deliverable excellence, central Kahalgaon labs, and accredited certifications that actually help you get hired.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsData.map((feat, idx) => (
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
  );
};

export default WhyChooseUsSection;
