import React from 'react';
import Homeslider from '../../components/Homeslider';
import CourseCards from '../../components/CourseCards';
import CertificateGallery from '../../components/certificategallrey';
import Faq from '../../components/Faq';
import Callback from '../../components/Callback';
import Meta from '../../components/common/Meta';
import content from '../../data/siteContent.json';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Optimization Meta Tags */}
      <Meta 
        title="Smart Computer Academy | Best Computer Classes in Balbadda, Godda" 
        description="Explore career-focused computer courses at Smart Computer Academy in Balbadda, Godda. Learn ADCA, DCA, Tally Prime + GST, Web Development, SEO, and coding with 100% practical lab training."
        keywords="computer classes Balbadda, computer courses Godda, Tally GST coaching Godda, web development course Balbadda, ADCA DCA Godda"
      />

      <div className="w-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 bg-slate-50 min-h-screen">
        
        {/* Premium Banner Image Slider */}
        <div className="max-w-7xl mx-auto w-full">
          <Homeslider />
        </div>

        {/* Featured Courses Section with Sleeek Background and Gradient Elements */}
        <div className="max-w-7xl mx-auto w-full text-center py-12 px-6 sm:px-12 bg-white rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Gradient Shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Explore Our Programs
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Student’s Top Choices
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed italic mb-8 border-l-4 border-red-500 pl-4 text-left">
              "Explore our most popular and career-focused <strong className="font-extrabold text-red-600">computer courses in Balbadda, Godda</strong>, designed with practical knowledge and live training. Discover our trusted and in-demand programs to achieve academic excellence and professional success."
            </p>

            {/* Render Modern Course Cards */}
            <CourseCards />

            <div className="mt-8">
              <button 
                onClick={() => navigate('/courses')}
                className="bg-red-600 hover:bg-gray-900 text-white font-extrabold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 transform active:scale-95 shadow-md"
              >
                View All Courses
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Sections Container */}
        <div className="max-w-7xl mx-auto w-full space-y-12">
          {/* Certificate and Classroom Gallery */}
          <div className="w-full">
            <CertificateGallery />
          </div>

          {/* Interactive FAQ Accordion with Light Gray background */}
          <div className="w-full bg-slate-100/60 p-2 sm:p-6 rounded-3xl border border-gray-100/50 shadow-inner">
            <Faq />
          </div>

          {/* Online Support & Call Back Request Form */}
          <div className="w-full">
            <Callback />
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
