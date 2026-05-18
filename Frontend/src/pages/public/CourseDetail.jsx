import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Clock, Award, BookOpen, CheckCircle2, 
  ChevronDown, ChevronUp, Share2, ArrowLeft,
  Calendar, CreditCard, ShieldCheck, Loader2
} from "lucide-react";
import Meta from "../../components/common/Meta";
import { publicAPI } from "../../api/public.api";

const CourseDetail = () => {
  const { slug } = useParams();
  const [openModule, setOpenModule] = useState(0);

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => publicAPI.getCourseBySlug(slug),
  });

  const course = courseData?.data?.data;

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
      <Meta title={course.title} description={course.description} />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-primary pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={course.thumbnail?.url} alt="Background" className="w-full h-full object-cover blur-sm" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-2/3 text-white">
                <Link to="/courses" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
                  <ArrowLeft size={20} className="mr-2" /> Back to All Courses
                </Link>
                <div className="inline-block bg-accent text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  {course.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{course.title}</h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><Clock size={24} /></div>
                    <div>
                      <p className="text-xs font-black uppercase text-white/50 tracking-wider">Duration</p>
                      <p className="font-bold text-lg">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><Award size={24} /></div>
                    <div>
                      <p className="text-xs font-black uppercase text-white/50 tracking-wider">Certification</p>
                      <p className="font-bold text-lg">QR Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><ShieldCheck size={24} /></div>
                    <div>
                      <p className="text-xs font-black uppercase text-white/50 tracking-wider">Recognition</p>
                      <p className="font-bold text-lg">Govt. Registered</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Sidebar (Mobile: Bottom) */}
              <div className="lg:w-1/3 w-full sticky top-28">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Course Fee</p>
                        <p className="text-4xl font-black text-primary">₹{course.fee}</p>
                      </div>
                      <div className="p-3 bg-success/10 rounded-2xl text-success">
                        <CreditCard size={32} />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-600 font-medium">
                        <CheckCircle2 size={18} className="text-success mr-3" /> Lifetime Access
                      </div>
                      <div className="flex items-center text-gray-600 font-medium">
                        <CheckCircle2 size={18} className="text-success mr-3" /> Job Assistance
                      </div>
                      <div className="flex items-center text-gray-600 font-medium">
                        <CheckCircle2 size={18} className="text-success mr-3" /> Physical Certificate
                      </div>
                    </div>

                    <Link to="/register" className="w-full btn-accent py-4 text-center block text-lg font-black uppercase tracking-widest shadow-lg shadow-accent/20 mb-4">
                      Enroll Now
                    </Link>
                    <p className="text-center text-xs text-gray-400 font-medium">100% Secure Enrollment Process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="lg:w-2/3">
              {/* Syllabus */}
              <div className="mb-20">
                <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center">
                  <BookOpen size={32} className="mr-4 text-primary" />
                  Course Syllabus
                </h3>
                <div className="space-y-4">
                  {course.syllabus?.map((module, index) => (
                    <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
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

              {/* Other Info */}
              <div className="bg-gray-50 p-12 rounded-3xl">
                <h4 className="text-2xl font-black mb-6">Why study this course?</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  This course is meticulously designed for beginners and professionals alike. By completing this program, you will gain hands-on experience in the most relevant tech stacks used in the industry today. Skill Shakti Academy ensures that every student gets individual attention and practical lab time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetail;
