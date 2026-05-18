import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Award, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "../../components/common/Meta";
import { publicAPI } from "../../api/public.api";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["all-courses"],
    queryFn: publicAPI.getCourses,
  });

  const courses = coursesData?.data?.data || [];
  const categories = ["All", "DCA", "ADCA", "PGDCA", "Tally", "Other"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Meta 
        title="Our Courses" 
        description="Browse our wide range of professional computer courses including DCA, ADCA, PGDCA, and Tally." 
      />

      <div className="bg-gray-50 min-h-screen pb-24">
        {/* Banner */}
        <div className="bg-primary pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-white mb-6"
            >
              Master In-Demand <span className="text-accent italic">Skills</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 text-xl max-w-2xl mx-auto"
            >
              Choose from our curated list of professional computer courses designed to make you industry-ready.
            </motion.p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="container mx-auto px-6 -mt-10 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full lg:w-2/3 justify-center lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    selectedCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="container mx-auto px-6 mt-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-primary mb-4" size={48} />
              <p className="text-gray-500 font-bold">Loading our world-class courses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredCourses.map((course) => (
                    <motion.div
                      layout
                      key={course._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
                    >
                      <div className="h-60 bg-gray-200 relative overflow-hidden group">
                        <img 
                          src={course.thumbnail?.url || "/placeholder-course.jpg"} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                          {course.category}
                        </div>
                      </div>
                      <div className="p-8 flex-grow">
                        <h4 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{course.title}</h4>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                          {course.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <Clock size={16} className="mr-2 text-primary" /> {course.duration}
                          </div>
                          <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <Award size={16} className="mr-2 text-primary" /> Certificated
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-gray-400">Total Fee</span>
                            <span className="text-primary font-black text-2xl">₹{course.fee}</span>
                          </div>
                          <Link 
                            to={`/courses/${course.slug}`} 
                            className="btn-primary py-2.5 px-6 text-sm flex items-center space-x-2 group"
                          >
                            <span>Details</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-40">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
