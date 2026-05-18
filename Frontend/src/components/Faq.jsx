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
    <section className="bg-white py-16 border border-gray-100 rounded-3xl shadow-sm my-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3">
            Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 text-xs sm:text-sm leading-relaxed font-medium">
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
                    ? 'border-red-200 bg-white shadow-sm' 
                    : 'border-gray-100 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-extrabold text-gray-900 transition-colors duration-200 hover:text-red-600 outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm pr-4 font-black tracking-tight leading-snug">{item.question}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isOpen 
                      ? 'border-red-600 bg-red-600 text-white rotate-180' 
                      : 'border-gray-200 bg-white text-gray-400 shadow-sm'
                  }`}>
                    <svg 
                      className="w-3.5 h-3.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
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
                      <div className="p-5 text-xs sm:text-sm text-gray-500 leading-relaxed bg-white border-t border-gray-100/50 font-medium">
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
