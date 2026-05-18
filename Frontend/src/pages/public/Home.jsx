import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Users, Building2, 
  Trophy, BookOpen, ShieldCheck, GraduationCap,
  Star, MessageCircle, MapPin, Phone, Mail,
  LayoutGrid, Award, Briefcase, UserCheck, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "../../components/common/Meta";
import { useQuery } from "@tanstack/react-query";
import { publicAPI } from "../../api/public.api";
import content from "../../data/siteContent.json";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const StatCard = ({ count, label, icon: Icon }) => (
  <motion.div variants={fadeInUp} className="flex flex-col items-center p-6 text-center">
    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
      <Icon size={32} className="text-accent" />
    </div>
    <h3 className="text-4xl font-black text-white mb-1">{count}</h3>
    <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">{label}</p>
  </motion.div>
);

const FeatureCard = ({ title, desc, icon: Icon }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
      <Icon size={28} />
    </div>
    <h4 className="text-xl font-bold mb-4 text-gray-900">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const Home = () => {
  // Fetch courses for featured section
  const { data: coursesData } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: publicAPI.getCourses,
  });

  const courses = coursesData?.data?.data || content.courses;

  return (
    <>
      <Meta 
        title={content.seo.home.title} 
        description={content.seo.home.description}
        keywords={content.seo.home.keywords}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/hero_background_1778040868465.png" 
            alt="Academy Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-[5%] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl text-white"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-md mb-6 border border-white/20">
              <span className="w-2 h-2 bg-accent rounded-full mr-3 animate-ping"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-accent">{content.hero.badge}</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp} 
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: content.hero.headline }}
            />
            
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
              {content.hero.subheadline}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
              <Link to="/courses" className="btn-accent px-10 py-5 text-lg flex items-center space-x-3 group">
                <span>{content.hero.cta1}</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/verify-certificate" className="px-10 py-5 text-lg font-bold border-2 border-white/30 hover:bg-white/10 rounded-lg transition-all flex items-center space-x-3">
                <ShieldCheck size={22} />
                <span>{content.hero.cta2}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary border-y border-white/10 py-12 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-8"
          >
            <StatCard count={content.stats[0].value} label={content.stats[0].label} icon={Users} />
            <StatCard count={content.stats[1].value} label={content.stats[1].label} icon={Building2} />
            <StatCard count={content.stats[3].value} label={content.stats[3].label} icon={Award} />
            <StatCard count="100%" label="Placement" icon={Trophy} />
            <StatCard count="20+" label="Courses" icon={BookOpen} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src="/about_institute_1778040888613.png" alt="Academy Building" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-2xl -z-0"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-accent font-bold uppercase tracking-widest mb-4">About the Academy</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                {content.about.heading}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {content.about.paragraph1}
              </p>
              <p className="text-gray-500 mb-12 leading-relaxed italic">
                {content.about.paragraph2}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {content.whyChooseUs.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-success" size={24} />
                    <span className="font-bold text-gray-800">{feature.title}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/about" className="btn-primary inline-flex items-center space-x-3">
                <span>Learn More About Us</span>
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Featured Courses</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Top Programs.</h3>
            <p className="text-gray-600 text-lg">Pick a course that fits your career goals. We offer everything from basic computer skills to advanced software development.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.slice(0, 6).map((course) => (
              <motion.div 
                key={course._id || course.slug}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="h-56 bg-gray-200 relative">
                  <img src={course.thumbnail?.url || "/placeholder-course.jpg"} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {course.category}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">{course.title}</h4>
                  <div className="flex items-center space-x-4 mb-6 text-gray-500 text-sm font-medium">
                    <div className="flex items-center"><BookOpen size={16} className="mr-2" /> {course.duration}</div>
                    <div className="flex items-center"><Award size={16} className="mr-2" /> Certificated</div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="text-primary font-black text-2xl">₹{course.fee}</div>
                    <Link to={`/courses/${course.slug}`} className="btn-primary py-2 text-sm">Enroll Now</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link to="/courses" className="inline-flex items-center font-black text-primary hover:text-accent transition-colors text-lg">
              View All 20+ Courses <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Why Skill Shakti</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900">What Makes Us Different.</h3>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {content.whyChooseUs.map((feature, i) => (
              <FeatureCard 
                key={i}
                title={feature.title} 
                desc={feature.description} 
                icon={
                  feature.icon === 'ShieldCheck' ? ShieldCheck : 
                  feature.icon === 'User' ? UserCheck : 
                  feature.icon === 'Rocket' ? Briefcase : 
                  LayoutGrid
                } 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] border-[60px] border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-primary p-12 md:p-20 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-white text-4xl md:text-6xl font-black mb-8 leading-tight">
                Start Your Own <span className="text-accent">Computer Institute</span> Today.
              </h2>
              <p className="text-gray-300 text-xl mb-10 leading-relaxed max-w-2xl">
                Join the fastest-growing education network in Bihar. We provide everything you need: branding, syllabus, software, and certification support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  "Low Investment, High Returns",
                  "Complete Academic Support",
                  "Online Management Dashboard",
                  "National Branding & Marketing"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3 text-white font-bold">
                    <CheckCircle2 className="text-accent" size={24} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/franchise" className="btn-accent px-12 py-5 text-xl">Apply for Franchise</Link>
            </div>
            <div className="lg:w-1/3">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full aspect-square bg-white/5 rounded-full flex items-center justify-center p-12 backdrop-blur-sm"
              >
                <Building2 size={200} className="text-accent opacity-50" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gray-50 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm">
            <div className="lg:w-1/2 p-12 md:p-20 bg-primary text-white">
              <h3 className="text-4xl font-black mb-10">Get in Touch.</h3>
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><MapPin size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Head Office</h4>
                    <p className="text-gray-300">Patna, Bihar - 800001, India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><Phone size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Call Us</h4>
                    <p className="text-gray-300">+91 98765 43210</p>
                    <p className="text-gray-300">+91 12345 67890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-accent"><Mail size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Email Us</h4>
                    <p className="text-gray-300">info@skillshakti.com</p>
                    <p className="text-gray-300">support@skillshakti.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 min-h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107244132!2d85.07300224164344!3d25.60802085489006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5842d03d6787%3A0x46221516e86477e!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
