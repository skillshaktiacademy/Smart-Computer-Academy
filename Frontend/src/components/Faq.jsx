import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What courses are offered at Smart Computer Academy Kahalgaon?",
    answer: "We offer government-recognized software, hardware, and typing programs including ADCA (12 Months Course - ₹3500), DCA (6 Months Course - ₹1500), Tally with GST (6 Months Course - ₹2500), DFA (Diploma in Financial Accounting), DTP (Desktop Publishing), Hindi & English Expert Typing, and Data Entry Operator."
  },
  {
    question: "Are the certificates globally/nationally recognized and online verifiable?",
    answer: "Yes, absolutely! Smart Computer Academy is an ISO 9001:2015 certified institute registered under the Govt. of India (Udyam Regd. No: UDYAM-BR-07-00328832). All our certificates are valid for government & private sector job interviews and can be instantly verified on our online verification portal."
  },
  {
    question: "What is the fee structure? Do you have installable or low-fee plans?",
    answer: "We have the most affordable fees in Kahalgaon: ADCA (1 Year) is only ₹3500, DCA (6 Months) is ₹1500, and Tally (6 Months) is only ₹2500. We also provide online form-filling and basic hardware training during the course at no extra cost!"
  },
  {
    question: "Do you provide 100% practical lab training and job guarantees?",
    answer: "Yes, our training center provides a fully equipped computer lab with dedicated individual PC access, professional faculty, and live practice projects. We stand by our banner statement and offer full job assistance & guidance to our graduates."
  },
  {
    question: "What are the timings of the classes? Is it open to beginners?",
    answer: "Classes are open for all school, college, and non-computer background students. We operate multiple batches from 8:00 AM in the morning to 7:00 PM in the evening, providing complete flexibility to match your schedule."
  },
  {
    question: "How do I secure an admission or register a query?",
    answer: "You can submit an inquiry through our Online Callback Form on the homepage, or visit our physical campus at S.S.V. College Road, Near STS Coaching, Kahalgaon (1st Floor). You can also call Director Praveen Sir directly at +91 99057 88324 for immediate support."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-16 rounded-3xl shadow-lg bg-white/30 backdrop-blur-xl border border-white/50 my-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed font-medium">
            Find answers to common questions about our courses, government certifications, low fee structures, and lab practicals in Kahalgaon.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-red-200/80 bg-white/60 shadow-md' 
                    : 'border-white/60 bg-white/20 hover:bg-white/30'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 transition-colors duration-200 hover:text-red-600 outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base pr-4 font-extrabold">{item.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen 
                      ? 'border-red-600 bg-red-600 text-white rotate-180' 
                      : 'border-white/80 bg-white/50 text-gray-500 shadow-sm'
                  }`}>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </span>
                </button>

                {/* Animated collapse/expand via Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white/40 border-t border-white/50 font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
