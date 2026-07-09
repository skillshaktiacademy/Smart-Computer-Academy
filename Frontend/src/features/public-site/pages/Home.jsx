import React from 'react';
import { motion } from 'framer-motion';
import Meta from '../../components/common/Meta';

// ── Home Section Components (all in components/home/) ──
import HeroSliderSection from '../../components/home/HeroSliderSection';
import AccreditationStrip from '../../components/home/AccreditationStrip';
import CoursesSection from '../../components/home/CoursesSection';
import WhyChooseUsSection from '../../components/home/WhyChooseUsSection';
import StatsSection from '../../components/home/StatsSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import CertificateSection from '../../components/home/CertificateSection';
import FaqSection from '../../components/home/FaqSection';
import AdmissionCtaSection from '../../components/home/AdmissionCtaSection';
import CallbackSection from '../../components/home/CallbackSection';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

import { localBusinessJsonLd, websiteJsonLd, organizationJsonLd } from "../../utils/seo";

function Home() {
  return (
    <>
      {/* ── SEO Metadata ── */}
      <Meta
        title="ISO Certified Technical Training Center Kahalgaon"
        description="Premium vocational computer education center in Kahalgaon. Learn ADCA, DCA, Tally Prime + GST, coding, and web skills with 100% practical lab training. ISO 9001:2015 Certified."
        keywords="computer classes Kahalgaon, ADCA DCA Kahalgaon, Tally Prime GST coaching, Python programming Kahalgaon, computer courses Bihar, Smart Computer Academy Kahalgaon"
        schema={[localBusinessJsonLd(), websiteJsonLd(), organizationJsonLd()]}
      />

      {/* ── Page Container ── */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col min-h-screen relative overflow-hidden bg-slate-50/20"
      >
        {/* Ambient glow meshes */}
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-red-500/[0.012] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.012] rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Section 1 — Hero (image banner + SaaS split layout) */}
        <HeroSliderSection />

        {/* Section 2 — Accreditation / Trust Strip */}
        <AccreditationStrip />

        {/* Section 3 — Popular Courses Grid */}
        <CoursesSection />

        {/* Section 4 — Why Choose Smart Computer Academy */}
        <WhyChooseUsSection />

        {/* Section 5 — Impact Statistics */}
        <StatsSection />

        {/* Section 6 — Alumni Testimonials */}
        <TestimonialsSection />

        {/* Section 7 — Certificate Gallery */}
        <CertificateSection />

        {/* Section 8 — FAQ Accordion */}
        <FaqSection />

        {/* Section 9 — Admissions CTA Banner */}
        <AdmissionCtaSection />

        {/* Section 10 — Callback Request Form */}
        <CallbackSection />
      </motion.div>
    </>
  );
}

export default Home;
