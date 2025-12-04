'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../Common/Container';

const InsightsSection = () => {
  const sectionRef = useRef(null);

  
  const isInView = useInView(sectionRef, {
    once: false, 
    // allows re-animation on re-entry
    margin: '-100px 0px -100px 0px',
  });


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 md:py-32 
                 bg-[linear-gradient(90deg, rgba(36,43,61,1.00) 0%,rgba(10,14,29,1.00) 48%);] 
                 bg-center bg-cover overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      </div>
<Container>

      <motion.div
        className="relative w-full max-w-7xl mx-auto "
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'} 
      >
        {/* ───── Top Section ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
         
          <motion.div variants={labelVariants} className="flex items-start">
            <p className="text-lg sm:text-xl text-slate-300 font-light tracking-widest">
              Insights
            </p>
          </motion.div>

          <motion.div variants={titleVariants} className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="max-w-[760px]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                ADL delivers professional company formation services in Dubai, UAE with expert
                consultants, and transparent pricing—trusted by 500+ clients for best business
                setup solutions.
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ───── Bottom Stats Section ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mt-8">
          {/* Empty left space for alignment */}
          <div />

          {/* Stats Cards */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
            variants={containerVariants}
          >
    
            <motion.div variants={cardVariants} className="space-y-3 sm:space-y-4">
              <motion.div variants={lineVariants} className="flex justify-start pb-4">
                <div className="h-px bg-[#E9C05F] w-full" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">18+ Years Experience</h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Backed by 18 years of industry experience, ADL delivers trusted business setup and
                consulting solutions across Dubai.
              </p>
            </motion.div>


            <motion.div variants={cardVariants} className="space-y-3 sm:space-y-4">
              <motion.div variants={lineVariants} className="flex justify-start pb-4">
                <div className="h-px bg-[#E9C05F] w-full" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">100+ Trusted Clients</h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Trusted by over 100+ satisfied clients who rely on ADL for seamless and transparent
                business setup solutions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
</Container>

    </section>
  );
};

export default InsightsSection;
