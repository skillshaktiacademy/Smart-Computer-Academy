import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "🖥️ ADCA – Advanced Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400",
    duration: "12 Months",
    highlights: ["DCA + Advanced Excel", "Accounting with Tally Prime", "C, C++ Programming Basics"],
    description: "Advanced course for career in IT & corporate office jobs.",
  },
  {
    id: 2,
    title: "📊 Tally Prime + GST",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months",
    highlights: ["Tally Prime & Ledger Entries", "GST Billing & Tax Filings", "Payroll & Inventory Management"],
    description: "Perfect for accounting students, graduates & business professionals.",
  },
  {
    id: 3,
    title: "🌐 Full-Stack Web Development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400",
    duration: "6–9 Months",
    highlights: ["HTML, CSS, Tailwind CSS, JS", "React.js Frontend Library", "Node.js & MongoDB Backend"],
    description: "Build modern, responsive websites & full-stack applications.",
  },
  {
    id: 4,
    title: "🔎 SEO – Search Engine Optimization",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months",
    highlights: ["On-Page & Off-Page SEO", "Keyword Research & Strategy", "Google Analytics & Search Console"],
    description: "Grow websites with advanced search engine visibility skills.",
  },
  {
    id: 5,
    title: "🤖 Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=400",
    duration: "6–12 Months",
    highlights: ["Machine Learning Basics", "Python for AI", "AI Models & Projects"],
    description: "Learn cutting-edge AI technologies shaping the future.",
  },
  {
    id: 6,
    title: "🤖 ChatGPT + AI Tools",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
    duration: "2 Months",
    highlights: ["ChatGPT Advanced Prompting", "AI Productivity Tools", "Content Creation & Automations"],
    description: "Use AI to boost learning, professional productivity & business.",
  },
  {
    id: 7,
    title: "💻 DCA – Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1588702547837-2c02f2a850cf?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months",
    highlights: ["MS Office (Word, Excel, PowerPoint)", "Internet, Emails & Web Skills", "Basic Hardware & OS Fundamentals"],
    description: "Beginners और job seekers के लिए complete computer knowledge.",
  },
  {
    id: 8,
    title: "⌨️ Data Entry Operator",
    image: "https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months",
    highlights: ["Advanced MS Office Suite", "English/Hindi Typing Speed & Accuracy", "Data Processing & Internet Tools"],
    description: "Gain complete skills required for administration, clerical and freelance jobs.",
  },
  {
    id: 9,
    title: "📂 DFA – Diploma in Financial Accounting",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months",
    highlights: ["Tally Prime + GST", "Advanced Excel Formulas", "Business Accounting Standards"],
    description: "Tailor-made for a successful accounting & corporate finance career.",
  },
  {
    id: 10,
    title: "🎬 Video Editing (Premiere Pro & AE)",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400",
    duration: "3–6 Months",
    highlights: ["Timeline Editing & Trimming", "Color Grading & Audio Mixing", "Motion Graphics & After Effects"],
    description: "Learn professional video editing for freelancing, social media & news agencies.",
  },
  {
    id: 11,
    title: "⚙️ C / C++ Language Coding",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months",
    highlights: ["Basic Programming Concepts", "Loops, Arrays, Functions & Pointers", "Logic Building & DSA Intro"],
    description: "The absolute best programming start for beginners.",
  },
  {
    id: 12,
    title: "🐍 Python Programming",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
    duration: "3–6 Months",
    highlights: ["Core Syntax & Libraries", "Data Science & Pandas Intro", "Automation Scripting & Projects"],
    description: "Extremely popular language for data science, AI & web scripting.",
  },
  {
    id: 13,
    title: "☕ Java Programming",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months",
    highlights: ["Object-Oriented Programming (OOP)", "Java Collections Framework", "GUI Desktop Applications"],
    description: "Learn the robust, industry-standard language for enterprise systems.",
  },
  {
    id: 14,
    title: "🎥 YouTube Channel Growth & SEO",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400",
    duration: "2–3 Months",
    highlights: ["Channel SEO & Algorithm secrets", "Video Production & Thumbnail Design", "Audience retention & Monetization"],
    description: "Build & scale a professional YouTube channel for your brand or freelancing.",
  },
  {
    id: 15,
    title: "🛠️ AutoCAD (2D Drafting & 3D)",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months",
    highlights: ["2D Blueprints & Drafting", "3D Architecture Modelling", "Civil/Mechanical layouts"],
    description: "Advanced engineering drafting program for civil, mechanical & architecture students.",
  },
  {
    id: 16,
    title: "🎨 2D/3D Animation & VFX",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400",
    duration: "6–12 Months",
    highlights: ["2D Character Design & Motion", "3D Modeling & Rendering", "Visual Effects & Video Compositing"],
    description: "Unleash your creativity and enter the high-demand entertainment, gaming & VFX industry.",
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
            <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {course.duration}
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

            {/* Buttons with Micro-interactions */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100/50">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => alert(`Inquiry submitted for ${course.title}. We will contact you soon!`)}
                className="flex-grow-[2] bg-red-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-sm active:scale-95 text-center"
              >
                Enquiry
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => alert(`Details of course: ${course.title}\nDuration: ${course.duration}\nHighlights: ${course.highlights.join(", ")}`)}
                className="flex-grow bg-slate-100/80 hover:bg-slate-200/90 text-gray-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 active:scale-95 text-center"
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
