import React from "react";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "🖥️ ADCA – Advanced Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400",
    duration: "12 Months / 1 Year",
    price: "₹3,500",
    highlights: ["DCA Core Modules", "Advanced MS Excel", "Accounting with Tally Prime", "C & C++ Programming Basics"],
    description: "Our complete software & office administration course designed for high-paying corporate office & IT jobs.",
  },
  {
    id: 2,
    title: "📊 Tally Prime + GST Accounting",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹2,500",
    highlights: ["Tally Prime Ledgers", "GST entries & Billing", "Payroll & Tax Filings", "Inventory Management"],
    description: "Master Tally ERP & Prime with real business entries and GST modules. Best for commerce & accounting students.",
  },
  {
    id: 3,
    title: "💻 DCA – Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1588702547837-2c02f2a850cf?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹1,500",
    highlights: ["Windows OS & Internet", "MS Word & Documenting", "MS Excel Sheets & Formulas", "MS PowerPoint Presentations"],
    description: "Essential computer course for beginners, job seekers, and office administrative work.",
  },
  {
    id: 4,
    title: "📂 DFA – Diploma in Financial Accounting",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹2,200",
    highlights: ["Business Accounting", "Tally Entries & Audit", "Advanced Excel Spreadsheets", "Voucher Entries & Profit/Loss"],
    description: "Learn financial bookkeeping and advanced accounting standards to work as an accountant.",
  },
  {
    id: 5,
    title: "📰 DTP – Desktop Publishing",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,800",
    highlights: ["PageMaker Layouts", "CorelDraw Vector Design", "Photoshop Graphic Editing", "Hindi & English typing integration"],
    description: "Learn printing, graphics, flyers, and card designing. Highly useful for starting your own printing press or cyber cafe.",
  },
  {
    id: 6,
    title: "⌨️ Typing (Hindi + English) Expert Course",
    image: "https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,000",
    highlights: ["English Touch Typing", "Hindi (Mangal/KrutiDev) Keys", "Speed Boost Techniques", "Error-Free Accuracy Training"],
    description: "Improve your typing speed (WPM) and accuracy. Vital for central/state government clerk and stenographer jobs.",
  },
  {
    id: 7,
    title: "⌨️ Data Entry Operator Specialist",
    image: "https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,200",
    highlights: ["Data Capturing Techniques", "Excel Spreadsheet Entries", "Database Form Operations", "Internet Research & Scraping"],
    description: "Gain specific computer data management skills for remote freelance or full-time corporate jobs.",
  },
  {
    id: 8,
    title: "🌐 Full-Stack Web Development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400",
    duration: "6–9 Months Course",
    price: "₹6,500",
    highlights: ["HTML, CSS & Tailwind CSS", "Modern JavaScript (ES6+)", "React.js Frontend UI", "Node.js & MongoDB Backend"],
    description: "Build premium modern websites and applications. Become a globally in-demand full-stack coder.",
  },
  {
    id: 9,
    title: "🤖 Artificial Intelligence & Machine Learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=400",
    duration: "6–12 Months Course",
    price: "₹8,000",
    highlights: ["Python for AI", "Machine Learning Basics", "Supervised/Unsupervised models", "Predictive Analytics Projects"],
    description: "Get started in AI, the highest-paying tech field. Build predictive programs and neural networks.",
  },
  {
    id: 10,
    title: "🤖 ChatGPT + AI Productivity Tools",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
    duration: "2 Months Course",
    price: "₹1,500",
    highlights: ["Advanced Prompt Engineering", "AI for Content & Excel", "Automation & No-Code bots", "Midjourney & Image Generation"],
    description: "Harness AI to work 10x faster. Perfect for students, content creators, and corporate professionals.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const CourseCards = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-left"
    >
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={cardVariants}
          whileHover={{ 
            y: -10, 
            boxShadow: "0 20px 40px rgba(220, 38, 38, 0.08)",
            borderColor: "rgba(220, 38, 38, 0.3)"
          }}
          className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
        >
          {/* Image */}
          <div className="h-44 w-full bg-slate-50/50 overflow-hidden relative">
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Duration Tag */}
            <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {course.duration}
            </div>
            {/* Real Banner Pricing Badge */}
            <div className="absolute bottom-3 right-3 bg-gray-900/95 backdrop-blur-sm text-yellow-400 text-xs font-black px-3.5 py-1.5 rounded-xl border border-yellow-400/20 shadow-md">
              Fee: {course.price}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-grow bg-white/10">
            {/* Title */}
            <h3 className="text-base font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed font-medium">
              {course.description}
            </p>

            {/* Highlights */}
            <div className="mb-5 flex-grow">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Key Highlights</p>
              <ul className="space-y-1.5">
                {course.highlights.map((point, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-red-500 mr-2 font-black">•</span>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100/50">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => alert(`Inquiry submitted for ${course.title}. Praveen Sir will contact you soon at your registered number!`)}
                className="flex-grow-[2] bg-red-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-sm active:scale-95 text-center cursor-pointer"
              >
                Enquiry
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => alert(`Course: ${course.title}\nDuration: ${course.duration}\nSpecial Fee: ${course.price}\nKey Highlights:\n- ${course.highlights.join("\n- ")}`)}
                className="flex-grow bg-slate-100/80 hover:bg-slate-200/90 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 active:scale-95 text-center cursor-pointer"
              >
                Details
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseCards;
