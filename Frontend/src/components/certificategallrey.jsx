import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

const CertificateGallery = () => {
    const navigate = useNavigate();
    const certificates = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
            alt: 'Students learning computers together in Kahalgaon',
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
            alt: 'Interactive computer practical classes Kahalgaon',
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400",
            alt: 'Group discussion and career training Kahalgaon',
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
            alt: 'Teacher guiding student in computer programming in Kahalgaon',
        },
    ];

    return (
        <section className="bg-white py-16 border border-gray-100 rounded-3xl shadow-sm my-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <span className="inline-block px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3">
                    Our Recognition & Pride
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                    Institute Certificate & Gallery
                </h2>
                <p className="text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm font-medium">
                    Every student completing our <strong className="font-extrabold text-red-600">computer classes in Kahalgaon</strong> receives an ISO-certified, government-recognized certificate that significantly boosts their career, resume value, and success in job interviews.
                </p>

                {/* Clean Responsive Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {certificates.map((cert) => (
                        <motion.div 
                            key={cert.id} 
                            variants={itemVariants}
                            whileHover={{ 
                                y: -6, 
                                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.04)",
                                borderColor: "rgba(220, 38, 38, 0.2)"
                            }}
                            className="group relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-[4/3] bg-slate-50 cursor-pointer transition-all duration-300"
                        >
                            <img
                                src={cert.image}
                                alt={cert.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                loading="lazy"
                            />
                            {/* Minimal thin Bottom Tag on hover (Stripe style) */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100/50 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                                <span className="text-gray-800 text-[10px] font-extrabold uppercase tracking-wider text-center line-clamp-1">
                                    {cert.alt.split(" in ")[0]}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate("/gallery")}
                    className="mt-10 bg-red-600 hover:bg-gray-900 text-white text-[10px] font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                    View All Gallery
                </motion.button>
            </div>
        </section>
    );
};

export default CertificateGallery;
