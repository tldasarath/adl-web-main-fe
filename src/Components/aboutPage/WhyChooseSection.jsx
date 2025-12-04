'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../Common/Container';

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  // Description animation
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // List item animation
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Image animation
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const benefits = [
    'Industry-leading consultants delivering strategic business establishment guidance.',
    'End-to-end corporate services crafted for sustainable success.',
    'Efficient execution with precision-driven regulatory compliance management.',
    'Personalized consultation ensuring clarity, confidence, and market advantage.',
    'Trusted partner empowering entrepreneurs through innovation and integrity.',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-28 lg:py-40
         bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] 
                 bg-center bg-cover overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>
<Container>

      <motion.div
        className="relative w-full max-w-7xl "
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start lg:items-stretch">
          {/* Left Content Section */}
          <motion.div className="space-y-4 sm:space-y-6 md:space-y-6 flex flex-col justify-start">
            {/* Title */}
            <motion.h2
              variants={titleVariants}
              className="text-2xl  md:text-3xl lg:text-4xl font-bold text-white leading-tight"
            >
              Why Choose ADL
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={descriptionVariants}
              className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed"
            >
              ADL Business Solutions is a trusted UAE-based consultancy specializing in business
              setup in Dubai, company formation, and visa services. Our experienced professionals
              streamline licensing, documentation, and government approvals with precision and
              integrity. We deliver customized, compliance-driven solutions that accelerate business
              growth, ensuring entrepreneurs and investors succeed in the UAE's evolving economic
              landscape.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto max-h-[300px] sm:max-h-[400px] pr-2"
              variants={containerVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={listItemVariants}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  {/* Arrow icon */}
                  <div className="flex-shrink-0 pt-0.5">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  {/* Text */}
                  <p className="text-xs sm:text-xs md:text-sm text-slate-300 leading-relaxed">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            variants={imageVariants}
            className="relative w-full h-full lg:flex lg:items-stretch"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl w-full" style={{ aspectRatio: '457/373' }}>
              {/* Image */}
              <img
                src="/assets/images/about/why-choose-adl.png"
                alt="Business professionals shaking hands"
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
</Container>

    </section>
  );
};

export default WhyChooseSection;