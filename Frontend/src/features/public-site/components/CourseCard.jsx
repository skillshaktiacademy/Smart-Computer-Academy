import { motion } from "framer-motion";
import { Clock, Star, Users, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className="premium-card group"
    >
      {/* Image Container */}
      <div className="aspect-video relative overflow-hidden bg-gray-100 rounded-xl">
        <img 
          src={course.image || course.thumbnail?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"} 
          alt={course.title} 
          className="premium-card-image" 
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
            {course.category}
          </div>
          <div className="bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm self-start">
            {course.level || "Beginner"}
          </div>
        </div>
        
        {/* Course Index Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border border-white/20">
          #{course.id}
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-6 flex-grow flex flex-col">
        
        {/* Meta Stats */}
        <div className="flex items-center justify-between text-gray-400 text-xs font-bold mb-4">
          <div className="flex items-center space-x-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-600">{course.rating || 4.5}</span>
            <span className="text-[11px] text-gray-400">({course.reviews?.length || 120})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Users size={13} className="text-primary" />
            <span className="text-gray-600">{course.enrolledStudents || 500}+ Enrolled</span>
          </div>
        </div>

        <h3 className="premium-card-title line-clamp-1">
          {course.title}
        </h3>
        
        <p className="premium-card-desc flex-grow">
          {course.shortDescription || course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(course.skills || ["HTML", "CSS", "JS"]).slice(0, 3).map((skill, index) => (
            <span key={index} className="premium-card-tag">
              {skill}
            </span>
          ))}
          {course.skills?.length > 3 && (
            <span className="premium-card-tag opacity-75">
              +{course.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-150 mb-6">
          <div className="flex items-center text-gray-550 text-xs font-bold">
            <Clock size={15} className="mr-2 text-accent" /> 
            {course.durationMonths ? `${course.durationMonths} Months` : course.duration}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider">Fee</span>
            <span className="text-primary font-bold text-lg">₹{course.fee}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link 
            to={`/courses/${course.slug}`} 
            className="btn-secondary py-2.5 rounded-xl font-bold text-xs"
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </Link>
          <Link 
            to={`/enquiry/${course.slug}`} 
            className="btn-primary py-2.5 rounded-xl font-bold text-xs"
          >
            <span>Enquire</span>
            <ExternalLink size={13} />
          </Link>
        </div>
        
      </div>
    </motion.div>
  );
};

export default CourseCard;
