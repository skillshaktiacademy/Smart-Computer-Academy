import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const CertificateGallery = () => {
    const certificates = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
            alt: 'Students learning computers together',
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
            alt: 'Interactive computer practical classes Godda',
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400",
            alt: 'Group discussion and career training Balbadda',
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
            alt: 'Teacher guiding student in computer programming',
        },
    ];

    return (
        <section className="bg-white/30 backdrop-blur-xl px-6 py-16 sm:px-8 lg:px-16 rounded-3xl shadow-lg border border-white/50 my-8">
            <div className="max-w-screen-xl mx-auto text-center">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    Our Recognition & Pride
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                    Institute Certificate & Gallery
                </h2>
                <p className="text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
                    Every student completing our <strong className="font-extrabold text-red-600">computer classes in Balbadda, Godda</strong> receives an ISO-certified, government-recognized certificate that significantly boosts their career, resume value, and success in job interviews.
                </p>

                {/* Animated Grid Container */}
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
                                y: -8, 
                                scale: 1.02,
                                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.08)" 
                            }}
                            className="group relative rounded-2xl overflow-hidden shadow-md border border-white/40 aspect-[4/3] bg-slate-50/50 cursor-pointer"
                        >
                            <img
                                src={cert.image}
                                alt={cert.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Premium Blur-Overlay tag on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                <span className="text-white text-xs font-bold tracking-wide text-center leading-relaxed drop-shadow-md">
                                    {cert.alt}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Our full academy physical gallery is coming soon! You are welcome to visit our Smart Computer Academy campus in Balbadda, Godda.")}
                    className="mt-10 bg-red-600 text-white font-extrabold px-8 py-3 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                    View All Gallery
                </motion.button>
            </div>
        </section>
    );
};

export default CertificateGallery;
