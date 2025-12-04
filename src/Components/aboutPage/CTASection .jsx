'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
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
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24
       bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] 
                 bg-center bg-cover overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* CTA Card */}
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-white/10 
           bg-[linear-gradient(180deg, rgba(73,85,111,1.00) 0%,rgba(13,19,37,1.00) 100%)] 
                 bg-center
        
           overflow-hidden 
          w-full flex items-center"
          style={{ aspectRatio: '1080/186' }}
          variants={containerVariants}
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-12 w-full items-center">
              {/* Left Content */}
              <motion.div className="space-y-1 sm:space-y-2 md:space-y-3 flex flex-col justify-center min-h-0">
                {/* Title */}
                <motion.h2
                  variants={titleVariants}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                >
                  Ready to Launch Your Business in Dubai
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={descriptionVariants}
                  className="text-xs sm:text-sm md:text-base text-slate-300 leading-snug max-w-2xl"
                >
                  Start smart with ADL Business Solutions. We manage licensing, paperwork, and
                  compliance so you can focus on building your business empire.
                </motion.p>
              </motion.div>

              {/* Right CTA Button */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-start lg:justify-end h-full"
              >
                <button
                  className="px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 rounded-full font-semibold text-white
                             bg-white/10 backdrop-blur-md border border-white/30 
                             hover:bg-white/20 hover:border-white/50 
                             transition-all duration-300 ease-out
                             flex items-center gap-1 sm:gap-2 group
                             text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <span>Start Your Business Now</span>
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;