import React from "react";
import { motion } from "framer-motion";
import { 
  Target, Eye, Award, History, 
  CheckCircle2, Users, Building2, 
  BookOpen, ShieldCheck, Star, 
  Laptop, Compass, PhoneCall, ArrowRight 
} from "lucide-react";
import Meta from "../../../components/common/Meta";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const cardHoverEffect = {
  y: -8, 
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
  borderColor: "rgba(220, 38, 38, 0.25)",
  transition: { duration: 0.3 }
};

import { breadcrumbJsonLd } from "../../../utils/seo";

const About = () => {
  const navigate = useNavigate();

  const achievements = [
    { label: "Students Trained", value: "5,000+", icon: Users },
    { label: "Certified Programs", value: "50+", icon: BookOpen },
    { label: "Lab Computers", value: "25+", icon: Laptop },
    { label: "Job Placed Students", value: "95%", icon: Award }
  ];

  const valueCards = [
    {
      title: "100% Practical Training",
      desc: "Every concept is backed by daily hands-on sessions in our fully equipped computer lab.",
      icon: Laptop,
    },
    {
      title: "ISO 9001:2015 Certified",
      desc: "Get nationally and internationally recognized government-registered certificates.",
      icon: ShieldCheck,
    },
    {
      title: "Expert Guidance",
      desc: "Learn directly from founder Praveen Sir and certified technical instructors.",
      icon: Users,
    },
    {
      title: "Job-Oriented Focus",
      desc: "Master key corporate office skills including Tally Prime with GST, DFA, and typing.",
      icon: Target,
    },
    {
      title: "Affordable Fee Structure",
      desc: "High-quality modern computer training at very low, competitive prices (DCA at ₹1500, ADCA at ₹3500).",
      icon: Award,
    },
    {
      title: "WiFi & Lab Infrastructure",
      desc: "Modern campus, high-speed internet connection, and online/offline classes support.",
      icon: Building2,
    }
  ];

  const aboutSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" }
  ]);

  return (
    <>
      <Meta 
        title="About Us | Smart Computer Academy Kahalgaon" 
        description="Learn about Smart Computer Academy Kahalgaon. Read our founder Praveen Sir's vision, explore our ISO certified lab training infrastructure, and see student achievements."
        keywords="about Smart Computer Academy, computer classes Kahalgaon, Praveen Sir director, computer training institute Kahalgaon"
        schema={aboutSchema}
      />

      {/* Main Container with subtle mesh background and blurred neon nodes */}
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 bg-slate-50/50 min-h-screen relative overflow-hidden pb-24"
      >
        {/* Soft neon blurring shapes behind glass layouts */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* 1. About Hero Banner with Breadcrumbs */}
        <motion.div 
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full text-center py-16 px-6 sm:px-12 bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl relative z-10 overflow-hidden"
        >
          {/* Breadcrumb */}
          <nav className="flex justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            <span className="hover:text-red-600 transition-colors cursor-pointer" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="text-red-600">About Us</span>
          </nav>
          
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Our Story of <span className="text-red-600 italic">Academic Excellence</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Smart Computer Academy is Kahalgaon's premier vocational software & hardware training provider. Since our founding, we've dedicated ourselves to offering professional computer literacy and accounting solutions to empower local youths.
          </p>
        </motion.div>

        {/* 2. Institute Overview: History, Vision, Mission (Split Layout) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 z-10 items-stretch">
          
          {/* Left Column: Image with ISO Badges */}
          <motion.div 
            variants={sectionVariants} 
            className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg flex flex-col justify-between overflow-hidden relative"
          >
            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden relative mb-6">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Interactive computer learning Kahalgaon" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-bold tracking-wider leading-relaxed">
                  "Registered under the Government of India (Udyam: UDYAM-BR-07-00328832) - providing recognized certificates."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 border border-white/80 rounded-2xl text-center shadow-sm">
                <ShieldCheck className="mx-auto text-red-600 mb-2" size={28} />
                <h4 className="text-sm font-extrabold text-gray-900">ISO 9001:2015</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Quality Management</p>
              </div>
              <div className="p-4 bg-white/60 border border-white/80 rounded-2xl text-center shadow-sm">
                <Award className="mx-auto text-red-600 mb-2" size={28} />
                <h4 className="text-sm font-extrabold text-gray-900">Govt. Registered</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Udyam Affiliation</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission, Vision & History Details */}
          <motion.div 
            variants={sectionVariants} 
            className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg space-y-8 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center space-x-2 text-red-600 font-black uppercase tracking-widest text-xs mb-4">
                <History size={18} />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 leading-snug">
                Academic Leadership & 100% Practical Focus
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                Established on S.S.V. College Road in Kahalgaon, Smart Computer Academy stands as a highly trusted software & hardware training center. We specialize in transforming fresh beginners, college graduates, and job aspirants into seasoned, corporate-ready digital professionals.
              </p>
            </div>

            <div className="space-y-4">
              {/* Mission */}
              <div className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-white/70 shadow-sm">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl flex-shrink-0 h-11 w-11 flex items-center justify-center">
                  <Target size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Our Mission</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    To deliver highly professional, government-registered IT and financial accounting classes at incredibly low rates, making quality tech training accessible to every student in Kahalgaon.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-white/70 shadow-sm">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl flex-shrink-0 h-11 w-11 flex items-center justify-center">
                  <Eye size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight mb-1">Our Vision</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    To be the leading technological skill college in the region, bridging the gap between classroom theory and real-world industrial needs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Founder Message (Praveen Sir) */}
        <motion.div 
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full z-10"
        >
          <div className="bg-white/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/50 shadow-lg flex flex-col md:flex-row gap-8 items-center">
            {/* Director Photo with gradient ring */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-[4px] bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-300 shadow-2xl">
                <img 
                  src="/praveen-sir.jpg" 
                  alt="Praveen Sir - Director Smart Computer Academy Kahalgaon"
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                  style={{ objectPosition: 'center 15%' }}
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Praveen+Sir&background=dc2626&color=fff&size=200&bold=true';
                  }}
                />
              </div>
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-md" title="Available"></span>
            </div>
            <div className="flex-grow text-center md:text-left space-y-4">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                Founder Message
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950">"Our mission is to empower every student with industrial capabilities."</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium italic">
                "At Smart Computer Academy, we don't just teach code or financial debit/credit ledger entries. We build confidence, digital competence, and absolute practical excellence. Our customized low-fee programs like ADCA (₹3500) and Tally Prime (₹2500) ensure no aspiring student is left behind. I invite you to join our practical classes and secure your professional future."
              </p>
              <div>
                <p className="text-base font-black text-gray-900">Praveen Sir</p>
                <p className="text-xs font-bold text-red-600">Director & Head Instructor, Smart Computer Academy Kahalgaon</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Why Our Institute Section (Value Cards) */}
        <section className="max-w-7xl mx-auto w-full z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              A Premium Education Experience
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              We stand apart in delivering result-oriented, fully accredited digital computer training on S.S.V. College Road, Kahalgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueCards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={cardHoverEffect}
                className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={24} />
                </div>
                <h4 className="text-base font-extrabold text-gray-900 mb-2">{card.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Achievements Counters */}
        <section className="max-w-7xl mx-auto w-full z-10 bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <item.icon size={22} />
                </div>
                <h4 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">{item.value}</h4>
                <p className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Infrastructure Section (Computer Lab Gallery) */}
        <section className="max-w-7xl mx-auto w-full z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Modern Campus
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Our Training Lab & Infrastructure
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              Take a virtual tour of our modern S.S.V College Road computer labs and practical software training classrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "1-to-1 PC Setup Labs",
                desc: "High-spec computer systems fully loaded with licensed Excel, Tally ERP, and web dev IDEs.",
                image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=400",
              },
              {
                title: "Interactive Smart Classroom",
                desc: "Equipped with large screens and high-resolution projectors for interactive visual programming and accounting theories.",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400",
              },
              {
                title: "Hardware Practice Table",
                desc: "Dedicated bench for testing software installs, computer assembling, CPU parts handling, and hardware modules.",
                image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=400",
              }
            ].map((infra, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 shadow-md group transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={infra.image} 
                    alt={infra.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-extrabold text-gray-900 mb-1.5">{infra.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{infra.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. Certifications & Affiliations */}
        <section className="max-w-7xl mx-auto w-full z-10 bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-12 shadow-lg text-center">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            National Recognition
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-6">ISO 9001:2015 & Govt. Regd. Affiliation</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-5 bg-white/50 border border-white/70 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-gray-900 mb-1">ISO 9001:2015</h4>
              <p className="text-xs text-gray-600 font-medium">Internationally certified curriculum and educational operations standards.</p>
            </div>
            <div className="p-5 bg-white/50 border border-white/70 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-gray-900 mb-1">UDYAM-BR-07-00328832</h4>
              <p className="text-xs text-gray-600 font-medium">Registered software training provider under the Government of India.</p>
            </div>
            <div className="p-5 bg-white/50 border border-white/70 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-gray-900 mb-1">100% Verifiable</h4>
              <p className="text-xs text-gray-600 font-medium">Online student certificate and marksheet verification enabled on portal.</p>
            </div>
          </div>
        </section>

        {/* 10. CTA Banner */}
        <motion.div 
          variants={sectionVariants} 
          className="max-w-7xl mx-auto w-full z-10"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 sm:p-12 rounded-3xl text-center text-white shadow-xl space-y-6">
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight">Ready to Boost Your Technical Career?</h3>
            <p className="text-sm sm:text-base text-red-50 max-w-2xl mx-auto font-medium">
              Join ADCA, DCA, or Tally Prime GST programs under founder Praveen Sir at S.S.V. College Road, Kahalgaon campus today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="bg-white hover:bg-gray-950 text-red-600 hover:text-white font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                Apply Admission Now
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="tel:+919905788324"
                className="border-2 border-white/80 hover:bg-white/10 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
              >
                <PhoneCall size={18} />
                <span>Call support (+91 99057 88324)</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </>
  );
};

export default About;
