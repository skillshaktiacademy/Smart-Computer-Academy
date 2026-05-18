import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Callback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    preferredCourse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      alert(`Hii ${formData.name}, Thank you for reaching out to Smart Computer Academy Kahalgaon! Praveen Sir will contact you on ${formData.mobile} soon to guide you through your career goals.`);
      setIsLoading(false);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        preferredCourse: ''
      });
    }, 800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="support-heading">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          Get Career Counseling
        </span>
        <h2 id="support-heading" className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Smart Computer Academy – Support & Callback Inquiry
        </h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Need help choosing the right software/hardware course or Tally ERP? Leave your details below, and Praveen Sir will call you back shortly.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Support Desk Info Card (Glassmorphism with Real Kahalgaon Data) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50 w-full lg:w-1/2 flex flex-col justify-center items-center text-center transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
              alt="Praveen Sir - Smart Computer Academy Director"
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white/80 shadow-md transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Academy Founder & Director</p>
            <p className="text-2xl font-black text-gray-900 mb-1">Praveen Sir</p>
            <p className="text-xs font-bold text-red-600 mb-4 bg-red-100/70 border border-red-200/50 px-3 py-1 rounded-full">
              SMART COMPUTER ACADEMY KAHALGAON
            </p>
            <p className="text-xs text-gray-500 mb-6 font-medium">(Regd. By Govt. of India | ISO 9001:2015)</p>
            <p className="text-sm font-semibold text-gray-700 max-w-xs leading-relaxed mb-2">
              For Free Career Guidance, Admissions & Offline Fee Structure Inquiries:
            </p>
            <p className="text-xs text-gray-500 font-bold mb-4">
              Address: S.S.V. College Road, Near STS Coaching, Kahalgaon
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="tel:+919905788324"
              className="text-2xl sm:text-3xl font-black text-red-600 hover:text-red-700 transition-colors mt-2 block px-6 py-2 bg-red-50/50 rounded-2xl border border-red-100 shadow-sm"
            >
              +91 99057 88324
            </motion.a>
          </div>
        </motion.div>

        {/* Call Back Form (Glassmorphism) */}
        <motion.form 
          whileHover={{ y: -5 }}
          className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50 w-full lg:w-1/2 space-y-5 flex flex-col justify-between transition-all duration-300" 
          aria-label="Call Back Request Form" 
          onSubmit={handleFormSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Rahul Kumar"
                className="mt-1 block w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 text-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                Enter Your Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. name@domain.com"
                className="mt-1 block w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  Enter Your Mobile No
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="10-digit number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  className="mt-1 block w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 text-sm font-medium"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  Enter Your City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Kahalgaon"
                  className="mt-1 block w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preferredCourse" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                Preferred Course
              </label>
              <select
                id="preferredCourse"
                name="preferredCourse"
                value={formData.preferredCourse}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-white/60 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 text-sm font-medium text-gray-700"
              >
                <option value="">Select a course</option>
                <option value="ADCA">ADCA (Advanced Diploma in Computer Applications) - ₹3500</option>
                <option value="DCA">DCA (Diploma in Computer Applications) - ₹1500</option>
                <option value="Tally">Tally with GST - ₹2500</option>
                <option value="DTP">DTP (Desktop Publishing)</option>
                <option value="DFA">DFA (Diploma in Financial Accounting)</option>
                <option value="Typing">Hindi & English Typing</option>
                <option value="DataEntry">Data Entry Operator</option>
                <option value="WebDev">Full-Stack Web Development</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="ChatGPT">ChatGPT + AI Tools</option>
                <option value="Other">Other Course</option>
              </select>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white font-extrabold py-3.5 px-6 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Submitting Enquiry...' : 'Enquiry Now'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Callback;
