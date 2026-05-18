import { motion } from "framer-motion";
import { 
  Target, Eye, Award, History, 
  CheckCircle2, Users, Building2, 
  Calendar, ShieldCheck, Star
} from "lucide-react";
import Meta from "../../components/common/Meta";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      <Meta title="About Us" description="Learn about Skill Shakti Academy's mission, vision, and our journey as Bihar's leading computer education provider." />

      <div className="bg-white pb-24">
        {/* Header Section */}
        <div className="bg-primary pt-32 pb-24 text-center px-6">
          <div className="container mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white mb-8"
            >
              Our Story of <span className="text-accent italic">Excellence</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Since our inception, we've been dedicated to providing high-quality computer education 
              to thousands of students across Bihar, transforming lives through technology.
            </motion.p>
          </div>
        </div>

        {/* History Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <img 
                src="/about_institute_1778040888613.png" 
                alt="Institute History" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center space-x-3 text-accent font-black uppercase tracking-widest mb-6">
                <History size={24} />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-8">15+ Years of Trust and Academic Leadership.</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Skill Shakti Academy started as a small computer training center in Patna with a handful of computers and a giant ambition: to make professional tech education accessible to every student in Bihar, regardless of their background.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Today, we operate a network of over 50 centers, serving thousands of students every year. Our certificates are recognized by employers across the country, and our graduates work in leading IT firms, banks, and government offices.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                <div>
                  <h4 className="text-4xl font-black text-primary mb-2">2009</h4>
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Year Founded</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-primary mb-2">50,000+</h4>
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Students Trained</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-[-20px] right-[-20px] text-primary/5 group-hover:text-primary/10 transition-colors">
                  <Target size={200} />
                </div>
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                  To provide world-class computer education and vocational training at affordable costs, 
                  empowering the youth of Bihar with practical skills that lead directly to employment 
                  and career growth in the 21st-century digital economy.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-[-20px] right-[-20px] text-accent/5 group-hover:text-accent/10 transition-colors">
                  <Eye size={200} />
                </div>
                <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                  <Eye size={32} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                  To become the largest and most trusted digital learning network in India, recognized 
                  for excellence in training, innovation in education delivery, and a steadfast 
                  commitment to student success and societal empowerment through technology.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Affiliations & Certifications */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Recognitions</h2>
            <h3 className="text-4xl font-black text-gray-900">Affiliations & Certifications.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "ISO 9001:2015", desc: "Quality Management Certified", icon: ShieldCheck },
              { title: "Govt. Registered", desc: "Recognized by Govt. of Bihar", icon: Award },
              { title: "MSME Registered", desc: "Affiliated Education Provider", icon: Building2 },
              { title: "NIELIT Partner", desc: "Examination & Center Partner", icon: Star }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl text-center border border-gray-100 hover:border-primary/20 transition-all shadow-sm"
              >
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Management Team */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] border-[80px] border-white rounded-full"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Leadership</h2>
              <h3 className="text-4xl md:text-5xl font-black">Meet Our Management Team.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "S.K. Singh", role: "Founder & Director", bio: "20+ years of education leadership." },
                { name: "Priya Sharma", role: "Head of Operations", bio: "Expert in franchise network management." },
                { name: "Ravi Kumar", role: "Academic Dean", bio: "Leading our curriculum & faculty development." }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all text-center"
                >
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-8 border-4 border-accent shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-accent text-4xl font-black">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <h4 className="text-2xl font-black mb-2">{member.name}</h4>
                  <p className="text-accent font-bold uppercase tracking-widest text-xs mb-6">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
