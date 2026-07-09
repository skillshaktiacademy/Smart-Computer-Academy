import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Award, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "../../../components/common/Meta";
import { publicAPI } from "../api/public.api";
import CourseCard from "../components/CourseCard";
import { mockCoursesData } from "../data/coursesData";

import { breadcrumbJsonLd } from "../../../utils/seo";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: apiCoursesData, isLoading } = useQuery({
    queryKey: ["all-courses"],
    queryFn: publicAPI.getCourses,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  // Use API courses if available, otherwise fallback to mock data
  const apiCourses = apiCoursesData?.data?.data || [];
  const courses = apiCourses.length > 0 ? apiCourses : mockCoursesData;

  // Use unique categories dynamically from the data + "All" option (memoized)
  const categories = useMemo(() => ["All", ...new Set(courses.map(c => c.category))], [courses]);

  // Memoized search and filtration to prevent performance degradation with large listings
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const coursesSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" }
  ]);

  return (
    <>
      <Meta 
        title="Professional Computer Courses | DCA, ADCA, Tally Prime & PGDCA" 
        description="Explore the best computer courses in Kahalgaon at Smart Computer Academy. Highly rated DCA, ADCA, PGDCA, Tally Prime with GST, and typing courses with 100% practical lab training." 
        keywords="computer courses Kahalgaon, DCA course fees, ADCA course duration, Tally Prime classes Kahalgaon, PGDCA training Bihar, IT coaching center S.S.V. College Road"
        schema={coursesSchema}
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
                    <CourseCard key={course.id || course._id} course={course} />
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
