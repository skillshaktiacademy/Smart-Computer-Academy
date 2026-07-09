import React from 'react';
import { motion } from 'framer-motion';
import Callback from './Callback';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

const CallbackSection = () => (
  <div className="w-full bg-alternate-gray py-20 md:py-24">
    <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        <Callback />
      </motion.div>
    </div>
  </div>
);

export default CallbackSection;
