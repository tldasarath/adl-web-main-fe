'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainButton from '../button/MainButton';
import Container from './Container';

const PolicyHeroSection = ({ title, subTitle, LastUpdationDate }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles for floating animation
    const generateParticles = () => {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 10,
        top: Math.random() * 40,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Title animation with letter spacing
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
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
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Particle float animation
  const particleVariants = {
    animate: (custom) => ({
      y: [0, -20, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: custom.delay,
      },
    }),
  };

  return (
    <div className="relative w-full h-fit py-8  overflow-hidden bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] bg-center">
      {/* Glowing Blob Left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="
          absolute w-[246px] h-[499px] 
          -left-24 bottom-40 
          bg-[#376CBC]
          opacity-30 blur-[100px] 
          rounded-[60%]
        "></div>
      </div>

      {/* Glowing Blob Right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="
          absolute w-[246px] h-[499px] 
          -right-2 bottom-40 
          bg-[#376CBC]
          opacity-30 blur-[100px] 
          rounded-[60%]
        "></div>
      </div>

      {/* Floating particles background */}
      <div className="absolute top-0 -left-9 inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 bg-blue-400 rounded-full blur-sm"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={particle}
          />
        ))}
      </div>


      <div className="relative w-full h-full flex items-center justify-center">
        <Container>
          <motion.div
            className="w-full flex items-center justify-center py-20"
            variants={containerVariants}
            initial="hidden"
            /* changed to trigger on view — replay each time it's scrolled into view */
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="text-center max-w-4xl mx-auto">
              {/* Main heading */}
              <motion.h1
                className="text-5xl md:text-6xl  font-bold text-white mb-6 sm:mb-8 leading-tight"
                variants={titleVariants}
                /* animate on view and replay on re-entry */
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                {title} <br className="hidden sm:block" />
                 {subTitle && (
                  <>
                    <span className="">{subTitle}</span>
                  </>
                )}
              </motion.h1>

              {/* Description text */}
              <motion.p
                className="text-sm  md:text-base text-slate-300 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
                variants={textVariants}
                /* animate on view and replay on re-entry */
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
               Last updated: {LastUpdationDate}
              </motion.p>

              {/* Glass morphism button */}
            {/* {buttonText &&  <motion.div
                variants={buttonVariants}
                whileHover="hover"
                className="inline-block w-62 xl:w-75"
              >
                <MainButton text={buttonText} url={url} />
              </motion.div>} */}
            </div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default PolicyHeroSection;
