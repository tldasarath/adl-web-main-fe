'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../Common/Container';
import Image from 'next/image';

export default function CommercialLicenseSection({
  sectionTitle,
  benefitsTitle,
  activities,
  benefits,
}) {
  const [activeTab, setActiveTab] = useState('business');
  const listToShow = activeTab === 'business' ? activities : benefits;

  // Left-side button animation
  const leftVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Right-side text animation (wave)
  const waveParent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const waveChild = {
    hidden: { opacity: 0, x: 120, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
        mass: 0.7,
      },
    },
    exit: {
      opacity: 0,
      x: -80,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // ✅ Image animation variant (comes from right when visible)
  const imageVariant = {
    hidden: { opacity: 0, x: 200 }, // start offscreen to the right
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
      {/* ✅ Animated Image: triggers when section enters viewport */}
{/* ✅ Animated Decorative Shape (slides in visibly from right) */}
<motion.div
  variants={{
    hidden: { opacity: 0, x: 100 }, // only 100px offscreen
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.6,
      },
    },
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="absolute right-0 top-0 pointer-events-none select-none z-0" // ✅ z-0 ensures visible above background
>
  <Image
    src="/assets/images/bg/square3.png"
    alt="Decorative shapes"
    width={240}
    height={320}
    className="object-contain xl:w-60 w-30"
  />
</motion.div>


      <Container>
        <div className="flex flex-col md:flex-row justify-between items-stretch glass-bg bg-white/5 rounded-2xl p-6 md:p-8 w-full max-w-5xl mx-auto shadow-lg border border-white/10 transition-all duration-300">
          
          {/* LEFT SIDE BUTTONS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={leftVariant}
            className="flex flex-col items-center justify-center gap-6 w-full md:w-1/3"
          >
            <button
              onClick={() => setActiveTab('business')}
              className={`px-5 py-3 text-center rounded-xl border border-white/20 transition-all duration-300 w-[230px] ${
                activeTab === 'business'
                  ? 'glass-bg text-white font-medium'
                  : 'text-white/50 bg-white/10 hover:bg-white/20'
              }`}
            >
              {sectionTitle}
            </button>

            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-3 text-center rounded-xl border border-white/20 transition-all duration-300 w-[230px] ${
                activeTab === 'benefits'
                  ? 'glass-bg text-white font-medium'
                  : 'text-white/50 bg-white/10 hover:bg-white/20'
              }`}
            >
              {benefitsTitle}
            </button>
          </motion.div>

          {/* RIGHT SIDE – Animate on load + tab change */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={waveParent}
            className="flex flex-col justify-center w-full md:w-2/3 mt-8 md:mt-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={waveParent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col divide-y divide-[#376CBC]/70 md:divide-[#376CBC]/40"
              >
                {listToShow.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={waveChild}
                    className="py-3 text-white text-sm md:text-base text-center hover:text-yellow-400 transition-colors duration-200"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
