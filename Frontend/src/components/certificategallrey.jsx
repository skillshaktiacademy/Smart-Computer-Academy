import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ArrowRight, Award } from 'lucide-react';

// Import local slidebar images
import cert1 from '../assets/images/slidebar/1.jpg';
import cert2 from '../assets/images/slidebar/2.jpg';
import cert3 from '../assets/images/slidebar/3.jpg';
import cert4 from '../assets/images/slidebar/4.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};

const certificates = [
  {
    id: 1,
    image: cert1,
    alt: 'Smart Computer Academy Institute Certificate 1',
    label: 'ISO Certified Institute',
  },
  {
    id: 2,
    image: cert2,
    alt: 'Smart Computer Academy Institute Certificate 2',
    label: 'Govt. Registered Certificate',
  },
  {
    id: 3,
    image: cert3,
    alt: 'Smart Computer Academy Institute Certificate 3',
    label: 'ADCA / DCA Certificate',
  },
  {
    id: 4,
    image: cert4,
    alt: 'Smart Computer Academy Institute Certificate 4',
    label: 'Tally & Accounting Certificate',
  },
];

const CertificateGallery = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-white py-16 border border-gray-100 rounded-3xl shadow-sm my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4">
            <Award size={12} />
            Our Recognition &amp; Pride
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            Institute Certificate Gallery
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm font-medium">
            Every student completing our{' '}
            <strong className="font-extrabold text-red-600">
              computer classes in Kahalgaon
            </strong>{' '}
            receives a recognized certificate that boosts career{' '}
            <span className="text-red-500 font-semibold">opportunities</span>. These certifications add value to resumes and
            help students stand out in job interviews.
          </p>
        </motion.div>

        {/* Certificate Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              onHoverStart={() => setHoveredId(cert.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-slate-50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-red-200"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Certificate Image */}
              <img
                src={cert.image}
                alt={cert.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {hoveredId === cert.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-700/40 to-transparent flex flex-col justify-end p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-[11px] font-extrabold uppercase tracking-wider text-left leading-snug">
                        {cert.label}
                      </span>
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 flex-shrink-0">
                        <ZoomIn size={14} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom label strip (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-gray-800 text-[10px] font-extrabold uppercase tracking-wider">
                  {cert.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          viewport={{ once: true }}
          onClick={() => navigate('/gallery')}
          className="mt-10 inline-flex items-center gap-2 bg-red-600 hover:bg-gray-900 text-white text-[11px] font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
        >
          View All
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </section>
  );
};

export default CertificateGallery;
