import React, { useState } from 'react';

const faqData = [
  {
    question: "What courses are offered at Smart Computer Academy?",
    answer: "We offer a wide range of job-oriented and professional computer programs including ADCA (12 Months), DCA (6 Months), Tally Prime with GST (3 Months), Full-Stack Web Development (6-9 Months), Python, C/C++ Coding, AutoCAD, 2D/3D Animation, SEO, and YouTube Channel Management."
  },
  {
    question: "Are the certificates from Smart Computer Academy globally/nationally recognized?",
    answer: "Yes, absolutely! All our certificates are ISO 9001:2015 certified, government-registered, and nationally recognized. You can present them in any private or government job interview, and they can be easily verified online through our verification portal."
  },
  {
    question: "Do you provide 100% practical lab training?",
    answer: "Yes, our training is heavily focused on hands-on practical experience. Every student gets dedicated computer access in our fully equipped computer lab, along with real-world case studies, accounting books (for Tally), and live projects (for Web Development)."
  },
  {
    question: "What are the timings of the classes? Is there flexibility?",
    answer: "We run multiple batches daily from 8:00 AM to 7:00 PM. We offer flexible hours for school/college students, working professionals, and business owners, so you can learn at your own comfortable pace."
  },
  {
    question: "Do you offer job placement or career support?",
    answer: "Yes, we provide complete career counselling, resume building assistance, mock interview sessions, and job vacancy alerts. Our practical learning makes our graduates ready for immediate employment in administrative, IT, accounting, and creative fields."
  },
  {
    question: "How can I apply for a new admission or ask a query?",
    answer: "You can easily request a callback by filling out our online Enquiry Form on the homepage, or you can call us directly at +91 80925 78834. Our admission counselor, Awdhesh Sir, will guide you to choose the best career-focused course!"
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-16 rounded-2xl shadow-sm border border-gray-100 my-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
            Find answers to common questions about our courses, certifications, batch timings, and training methods at Smart Computer Academy.
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
                    ? 'border-red-200 bg-red-50/10 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 transition-colors duration-200 hover:text-red-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4">{item.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen 
                      ? 'border-red-600 bg-red-600 text-white rotate-180' 
                      : 'border-gray-300 text-gray-500'
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

                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 text-sm sm:text-base text-gray-600 leading-relaxed bg-white/50">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
