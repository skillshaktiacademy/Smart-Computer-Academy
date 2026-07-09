import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, TrendingUp, ShieldCheck, Users, 
  HelpCircle, ChevronDown, ChevronUp, Send,
  Loader2, CheckCircle2, DollarSign, Rocket,
  FileSearch, Settings, HeartHandshake
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Meta from "../../../components/common/Meta";
import { publicAPI } from "../api/public.api";
import { toast } from "react-toastify";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City is required"),
  message: z.string().min(10, "Please provide more details about your inquiry"),
});

import { breadcrumbJsonLd, faqJsonLd } from "../../../utils/seo";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="text-lg font-bold text-gray-900">{question}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

const Franchise = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await publicAPI.submitInquiry({ ...data, subject: "Franchise Inquiry" });
      toast.success("Franchise inquiry submitted successfully! Our team will contact you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const franchiseSchemaMarkup = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Franchise Partnership", path: "/franchise" }
    ]),
    faqJsonLd([
      { question: "What is the minimum space required?", answer: "You need a minimum of 500-800 sq. ft. area with space for a lab (10+ computers), a classroom, and an office/reception area." },
      { question: "What is the total investment?", answer: "The investment varies based on location and center size, typically ranging from 2 Lakhs to 5 Lakhs, including license fees and setup." },
      { question: "Do I need to be a computer expert?", answer: "No, you don't need to be an expert. We provide complete training for you and your staff, along with academic support." },
      { question: "How much time does it take to start?", answer: "The entire process from application to launch typically takes 2 to 4 weeks depending on center readiness." }
    ])
  ];

  return (
    <>
      <Meta 
        title="Become a Partner | Franchise Opportunity Smart Computer Academy" 
        description="Join the Smart Computer Academy network in Bihar. Open your own IT and software computer training institute with proven low-investment business models." 
        keywords="computer center franchise Bihar, open computer institute, Smart Computer Academy franchise, start typing coaching center"
        schema={franchiseSchemaMarkup}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-primary pt-32 pb-24 relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] border-[80px] border-white rounded-full"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-md border border-white/20"
              >
                <HeartHandshake size={20} className="text-accent mr-3" />
                <span className="text-xs font-black uppercase tracking-widest text-accent">Business Opportunity</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                Start Your Own <br />
                <span className="text-accent italic">Success Story</span>.
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                Partner with Bihar's fastest-growing education network. 
                Get complete technical, academic, and marketing support to run a profitable computer institute.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="font-bold">Low Investment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="font-bold">High ROI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="font-bold">Complete Training</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Why Partner With Us</h2>
              <h3 className="text-4xl font-black text-gray-900">Franchise Benefits.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Brand Identity", desc: "Use the trusted 'Smart Computer Academy' brand recognized across Bihar.", icon: ShieldCheck },
                { title: "Academic Support", desc: "Access to updated syllabus, course materials, and examination systems.", icon: Building2 },
                { title: "Marketing Tools", desc: "Get professional flyers, digital marketing support, and leads.", icon: TrendingUp },
                { title: "Online Dashboard", desc: "Complete management software for students, fees, and results.", icon: Users }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-accent font-bold uppercase tracking-widest mb-4">Launch Journey</h2>
            <h3 className="text-4xl font-black text-gray-900">How to Get Started.</h3>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden lg:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Apply Online", desc: "Fill the inquiry form with your location details.", icon: FileSearch },
                { step: "02", title: "Verification", desc: "Our team visits your location for center feasibility.", icon: ShieldCheck },
                { step: "03", title: "Center Setup", desc: "Agreement signing and center infrastructure setup.", icon: Settings },
                { step: "04", title: "Launch", desc: "Marketing begins and first batch enrollment starts.", icon: Rocket }
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-white border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-xl text-primary relative">
                    <item.icon size={32} />
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-black mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-sm max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form & FAQ */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* FAQ */}
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-black text-gray-900 mb-10">Frequently Asked Questions</h3>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <FAQItem 
                    question="What is the minimum space required?" 
                    answer="You need a minimum of 500-800 sq. ft. area with space for a lab (10+ computers), a classroom, and an office/reception area." 
                  />
                  <FAQItem 
                    question="What is the total investment?" 
                    answer="The investment varies based on location and center size, typically ranging from 2 Lakhs to 5 Lakhs, including license fees and setup." 
                  />
                  <FAQItem 
                    question="Do I need to be a computer expert?" 
                    answer="No, you don't need to be an expert. We provide complete training for you and your staff, along with academic support." 
                  />
                  <FAQItem 
                    question="How much time does it take to start?" 
                    answer="The entire process from application to launch typically takes 2 to 4 weeks depending on center readiness." 
                  />
                </div>
              </div>

              {/* Form */}
              <div className="lg:w-1/2">
                <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-gray-100">
                  <h3 className="text-3xl font-black text-gray-900 mb-2">Franchise Inquiry</h3>
                  <p className="text-gray-500 mb-10">Submit your details and our team will get back to you with the brochure.</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input {...register("name")} className="input-field py-3 bg-gray-50" placeholder="John Doe" />
                        {errors.name && <p className="text-[10px] text-error mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input {...register("email")} className="input-field py-3 bg-gray-50" placeholder="john@example.com" />
                        {errors.email && <p className="text-[10px] text-error mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input {...register("phone")} className="input-field py-3 bg-gray-50" placeholder="9876543210" />
                        {errors.phone && <p className="text-[10px] text-error mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Target City</label>
                        <input {...register("city")} className="input-field py-3 bg-gray-50" placeholder="e.g. Patna" />
                        {errors.city && <p className="text-[10px] text-error mt-1">{errors.city.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
                      <textarea {...register("message")} className="input-field py-3 bg-gray-50 h-32" placeholder="Tell us about your background and location interest..."></textarea>
                      {errors.message && <p className="text-[10px] text-error mt-1">{errors.message.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full btn-primary py-4 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-primary/20"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                        <>
                          <Send size={20} />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Franchise;
