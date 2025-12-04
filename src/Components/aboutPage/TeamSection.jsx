"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { teamMembers } from "@/Datas/teams";

const TeamSection = () => {
  const sectionRef = useRef(null);

  // 👇 Animate when section scrolls into view
  const isInView = useInView(sectionRef, {
    once: false, // Re-animate on re-entry
    margin: "-100px 0px -100px 0px",
  });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Card animation + hover
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 md:py-12 lg:py-16 
                 bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] 
                 bg-center bg-cover overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Animated container */}
      <motion.div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // 👈 scroll-triggered animation
      >
        {/* Title */}
        <motion.div variants={titleVariants} className="mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Team
          </h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 auto-rows-max"
          variants={containerVariants}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-3xl bg-slate-800 shadow-lg w-full">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "248/300" }}
                >
                  {/* Member Image */}
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover bg-slate-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Overlay with Info */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-3 sm:p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-yellow-400 text-xs sm:text-xs md:text-sm leading-tight">
                      {member.position}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
