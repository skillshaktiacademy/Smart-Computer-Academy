import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Clock, Award, BookOpen, CheckCircle2, 
  ChevronDown, ChevronUp, Share2, ArrowLeft,
  Calendar, CreditCard, ShieldCheck, Loader2, Star, Users, ExternalLink, PlayCircle
} from "lucide-react";
import Meta from "../../components/common/Meta";
import { publicAPI } from "../../api/public.api";
import { mockCoursesData } from "../../data/coursesData";

import { courseJsonLd, breadcrumbJsonLd, faqJsonLd } from "../../utils/seo";

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openModule, setOpenModule] = useState(0);

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => publicAPI.getCourseBySlug(slug),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!slug,
  });

  const apiCourse = courseData?.data?.data;
  const mockCourse = useMemo(() => mockCoursesData.find(c => c.slug === slug), [slug]);
  const course = apiCourse || mockCourse;

  const courseSchemas = useMemo(() => {
    if (!course) return null;
    return [
      courseJsonLd(course),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses" },
        { name: course.title, path: `/courses/${course.slug}` }
      ]),
      faqJsonLd(course.faqs)
    ].filter(Boolean);
  }, [course]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
        <Link to="/courses" className="btn-primary flex items-center space-x-2">
          <ArrowLeft size={20} />
          <span>Back to All Courses</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Meta 
        title={`${course.seo?.metaTitle || course.title}`} 
        description={course.seo?.metaDescription || course.shortDescription || course.description} 
        keywords={course.seo?.keywords?.length > 0 ? course.seo.keywords.join(', ') : `${course.title}, computer courses Kahalgaon, DCA training, ADCA certified course`} 
        schema={courseSchemas}
      />

      <div className="bg-gray-50 min-h-screen pb-24">
        {/* Hero Section */}
        <div className="bg-primary pt-32 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={course.image || course.thumbnail?.url} alt="Background" className="w-full h-full object-cover blur-sm" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-2/3 text-white">
                <Link to="/courses" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors font-bold tracking-wide">
                  <ArrowLeft size={16} className="mr-2" /> Back to All Courses
                </Link>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    {course.category}
                  </div>
                  <div className="bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
                    {course.level || "Beginner to Advanced"}
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{course.title}</h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl font-medium">
                  {course.shortDescription || course.description}
                </p>

                <div className="flex items-center flex-wrap gap-6 text-sm font-bold text-white/80 mb-10">
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    <span>{course.rating || 4.8} ({course.reviews?.length || 150} Reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-blue-300" size={18} />
                    <span>{course.enrolledStudents || 1200}+ Students Enrolled</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {(course.skills || ["HTML", "CSS", "JS"]).map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold tracking-wider uppercase text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Sticky Sidebar */}
        <div className="container mx-auto px-6 -mt-16 relative z-20">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-10">
              
              {/* About Course */}
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                  <BookOpen className="text-primary mr-4" size={28} />
                  Course Overview
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {course.fullDescription || course.description}
                </p>
                
                <h4 className="text-xl font-bold mb-4 text-gray-900">Technologies Covered</h4>
                <div className="flex flex-wrap gap-3">
                  {(course.technologies || []).map((tech, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-700">
                      <CheckCircle2 size={16} className="text-success" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Accordion */}
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                  <PlayCircle className="text-primary mr-4" size={28} />
                  Curriculum / Modules
                </h3>
                <div className="space-y-4">
                  {(course.modules || course.syllabus || []).map((module, index) => (
                    <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenModule(openModule === index ? -1 : index)}
                        className={`w-full flex items-center justify-between p-6 text-left transition-all ${
                          openModule === index ? "bg-primary text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-xs font-black ${
                            openModule === index ? "bg-white text-primary" : "bg-primary text-white"
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-black text-lg">{module.moduleTitle}</span>
                        </div>
                        {openModule === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: openModule === index ? "auto" : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 bg-white space-y-4">
                          {module.topics?.map((topic, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 font-medium leading-relaxed">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:w-1/3 w-full sticky top-28">
              <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Course Image inside Sidebar */}
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img 
                    src={course.image || course.thumbnail?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"} 
                    alt="Course Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors border border-white/50">
                      <PlayCircle size={32} />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Course Fee</p>
                      <p className="text-4xl font-black text-primary">₹{course.fee}</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-2xl text-success">
                      <CreditCard size={32} />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-600 font-bold bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <Clock size={20} className="text-accent mr-3" /> 
                      Duration: {course.durationMonths ? `${course.durationMonths} Months` : course.duration}
                    </div>
                    <div className="flex items-center text-gray-600 font-bold bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <Calendar size={20} className="text-accent mr-3" /> 
                      Mode: Online / Offline
                    </div>
                    <div className="flex items-center text-gray-600 font-bold bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <CheckCircle2 size={20} className="text-success mr-3" /> 
                      100% Job Assistance
                    </div>
                  </div>

                  <Link 
                    to={`/enquiry/${course.slug}`} 
                    className="w-full btn-primary py-4 text-center flex items-center justify-center space-x-2 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 mb-4 rounded-xl"
                  >
                    <span>Enquire Now</span>
                    <ExternalLink size={20} />
                  </Link>
                  <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-wide">Limited Seats Available</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
