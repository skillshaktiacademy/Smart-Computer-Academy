import React from "react";
import { motion } from "framer-motion";
import { Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "ADCA – Advanced Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400",
    duration: "12 Months / 1 Year",
    price: "₹3,500",
    description: "Our complete software & office administration course designed for high-paying corporate office & IT jobs.",
  },
  {
    id: 2,
    title: "Tally Prime + GST Accounting Specialist",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹2,500",
    description: "Master Tally ERP & Prime with real business entries and GST modules. Best for commerce & accounting students.",
  },
  {
    id: 3,
    title: "DCA – Diploma in Computer Applications",
    image: "https://images.unsplash.com/photo-1588702547837-2c02f2a850cf?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹1,500",
    description: "Essential computer course for beginners, job seekers, and office administrative work.",
  },
  {
    id: 4,
    title: "DFA – Diploma in Financial Accounting",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400",
    duration: "6 Months Course",
    price: "₹2,200",
    description: "Learn financial bookkeeping and advanced accounting standards to work as a professional accountant.",
  },
  {
    id: 5,
    title: "DTP – Desktop Publishing Graphic Design",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,800",
    description: "Learn vector layouts and photo editing. Highly useful for starting your printing press or cyber cafe.",
  },
  {
    id: 6,
    title: "Typing (Hindi + English) Expert Course",
    image: "https://images.unsplash.com/touch-typing?auto=format&fit=crop&q=80&w=400",
    imageFallback: "https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,000",
    description: "Improve typing speed (WPM) and accuracy. Vital for state government clerk & stenographer jobs.",
  },
  {
    id: 7,
    title: "Data Entry Operator Specialist",
    image: "https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=400",
    duration: "3 Months Course",
    price: "₹1,200",
    description: "Gain specific computer data management skills for remote freelance or full-time corporate jobs.",
  },
  {
    id: 8,
    title: "Full-Stack Web Development BootCamp",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400",
    duration: "6–9 Months Course",
    price: "₹6,500",
    description: "Build premium modern websites and applications. Become a globally in-demand full-stack developer.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const CourseCards = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
    >
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="premium-card group"
        >
          {/* Course Thumbnail Image with aspect 16:9 & rounded corners */}
          <div className="aspect-video w-full bg-slate-50 overflow-hidden relative rounded-xl">
            <img
              src={course.imageFallback && course.id === 6 ? course.imageFallback : course.image}
              alt={course.title}
              className="premium-card-image"
              loading="lazy"
            />
            {/* Minimal level/duration floating banner */}
            <div className="absolute top-3 left-3 bg-gray-900/90 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              {course.duration}
            </div>
          </div>

          {/* Card Details */}
          <div className="pt-6 flex flex-col flex-grow">
            {/* Title */}
            <h3 className="premium-card-title line-clamp-1">
              {course.title}
            </h3>

            {/* Shorter, decluttered description */}
            <p className="premium-card-desc flex-grow">
              {course.description}
            </p>

            {/* Duration and Pricing row */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-150 mt-auto mb-6">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock size={13} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{course.duration.split(" ")[0]} {course.duration.split(" ")[1] || "Months"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-900">
                <Tag size={13} className="text-red-500" />
                <span className="text-xs font-black tracking-tight">Fee: {course.price}</span>
              </div>
            </div>

            {/* Clean, premium CTA button at the bottom */}
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="w-full btn-primary py-3 text-xs uppercase tracking-widest rounded-xl font-bold"
            >
              Admission Enquiry
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseCards;
