import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Send, 
  Loader2, Facebook, Twitter, Instagram, 
  Linkedin, Clock, MessageSquare
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Meta from "../../components/common/Meta";
import { publicAPI } from "../../api/public.api";
import { toast } from "react-toastify";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await publicAPI.submitInquiry(data);
      toast.success("Message sent! We'll get back to you shortly.");
      reset();
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Meta title="Contact Us" description="Get in touch with Skill Shakti Academy. Contact us for course details, admission help, or franchise support." />

      <div className="bg-white">
        {/* Banner */}
        <div className="bg-primary pt-32 pb-24 text-center text-white px-6">
          <div className="container mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-8"
            >
              Let's <span className="text-accent italic">Connect</span>.
            </motion.h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions about our courses or want to start a franchise? 
              Our team is here to help you every step of the way.
            </p>
          </div>
        </div>

        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Info Panel */}
            <div className="lg:w-1/3">
              <h3 className="text-3xl font-black text-gray-900 mb-10">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm">Main Road, Patna, Bihar - 800001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Support</h4>
                    <p className="text-gray-600 text-sm">+91 98765 43210</p>
                    <p className="text-gray-600 text-sm">+91 12345 67890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm">info@skillshakti.com</p>
                    <p className="text-gray-600 text-sm">support@skillshakti.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                    <p className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold text-gray-900 mb-6">Follow Our Community</h4>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="lg:w-2/3">
              <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-gray-100">
                <h3 className="text-3xl font-black text-gray-900 mb-2 flex items-center">
                  <MessageSquare size={32} className="mr-4 text-primary" />
                  Send a Message
                </h3>
                <p className="text-gray-500 mb-10">We usually respond within 24 hours.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Your Name</label>
                      <input {...register("name")} className="input-field py-3 bg-gray-50" placeholder="John Doe" />
                      {errors.name && <p className="text-[10px] text-error mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input {...register("email")} className="input-field py-3 bg-gray-50" placeholder="john@example.com" />
                      {errors.email && <p className="text-[10px] text-error mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input {...register("phone")} className="input-field py-3 bg-gray-50" placeholder="9876543210" />
                      {errors.phone && <p className="text-[10px] text-error mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                      <input {...register("subject")} className="input-field py-3 bg-gray-50" placeholder="Admission inquiry..." />
                      {errors.subject && <p className="text-[10px] text-error mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
                    <textarea {...register("message")} className="input-field py-3 bg-gray-50 h-40" placeholder="How can we help you?"></textarea>
                    {errors.message && <p className="text-[10px] text-error mt-1">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full btn-primary py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-primary/20"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[500px] grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107244132!2d85.07300224164344!3d25.60802085489006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5842d03d6787%3A0x46221516e86477e!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Academy Map Location"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default Contact;
