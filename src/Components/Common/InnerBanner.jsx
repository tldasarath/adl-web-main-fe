"use client";

import React from "react";
import Container from "./Container";
import MainButton from "../button/MainButton";
import { motion } from "framer-motion";

// Parent section animation
const sectionVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

// Child (text/button) animation
const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const buttonMotion = {
  hover: { scale: 1.04, y: -3 },
  tap: { scale: 0.97 },
};

const InnerBanner = ({ title, description, buttonText, link }) => {
  return (
    <Container>
      <motion.section
        className="flex items-center justify-center py-8 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // animate every time in view
        variants={sectionVariant}
      >
        <motion.div
          className="rounded-4xl p-4 w-full shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(73,85,111,1.00) 0%, rgba(13,19,37,1.00) 100%)",
            backgroundPosition: "center center",
          }}
          variants={sectionVariant}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="p-3">
              <motion.h3
                className="text-xl md:text-2xl max-w-md font-semibold mb-4 text-white"
                variants={childVariant}
              >
                {title}
              </motion.h3>

              <motion.p
                className="text-base md:text-lg font-light leading-normal text-slate-200"
                variants={childVariant}
              >
                {description}
              </motion.p>

              {/* Mobile Center Button */}
              <motion.div
                className="lg:hidden flex justify-center mt-8"
                variants={childVariant}
              >
                <motion.div
                  whileHover={buttonMotion.hover}
                  whileTap={buttonMotion.tap}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                >
                  <MainButton text={buttonText} url={link} />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Button (Desktop) */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              variants={childVariant}
            >
              <motion.div
                whileHover={buttonMotion.hover}
                whileTap={buttonMotion.tap}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <MainButton text={buttonText} url={link} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </Container>
  );
};

export default InnerBanner;
