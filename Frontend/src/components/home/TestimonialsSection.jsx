import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const testimonialsData = [
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
];

const TestimonialsSection = () => {
  return (
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
          <p className="text-base text-gray-650 max-w-2xl mx-auto font-normal leading-relaxed">
            Read how our graduates established themselves in clerical, corporate accounting, and coding jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((testi, i) => (
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
  );
};

export default TestimonialsSection;
