
"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";

const containerVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.06 },
  }),
};

const pillVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

export default function FreezoneLicenses() {
  return (
    <section
      aria-labelledby="licenses-heading"
      className="relative py-8 md:py-16 lg:py-24 overflow-hidden"
    >
      <Container>
        <div className="max-w-7xl mx-auto">
      
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <motion.h2
              id="licenses-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={containerVariant}
              custom={0}
              className="lg:col-span-6 text-white text-2xl md:text-[40px] font-bold leading-tight mb-4"
            >
              License Options Tailored to <br className="hidden md:block"/> Your Business Activity.
            </motion.h2>

            <motion.div
              className="lg:col-span-6 text-white/80 text-base md:text-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={containerVariant}
              custom={1}
            >
            Each Freezone has its own license structure  ADL helps you identify the most suitable type for your operations.
            </motion.div>
          </div>

          {/* Pills grid */}
          <div className="mt-6">
        
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-[1fr_10px_1fr]
                lg:grid-rows-[auto_10px_auto]
                gap-4
                lg:gap-5
                items-center
              "
            >
              {/* Top-left pill */}
              <motion.div
                className="lg:col-start-1 lg:row-start-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
                variants={pillVariant}
                custom={0}
              >
                <div className=" glass-bg border border-white/8 backdrop-blur-sm rounded-[20px] p-4 md:py-5 md:px-6 transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(2,6,23,0.55)]">
                  <h3 className=" text-white font-semibold text-base md:text-xl">Commercial License:</h3>
                  <div className="text-end text-slate-300 text-sm md:text-lg mt-2">For trading and retail operations.</div>
                </div>
              </motion.div>


              {/* Top-right pill */}
              <motion.div
                className="lg:col-start-3 lg:row-start-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
                variants={pillVariant}
                custom={1}
              >
                <div className="glass-bg border border-white/8 backdrop-blur-sm rounded-[20px] p-4 md:py-5 md:px-6 transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(2,6,23,0.55)]">
                  <div className="text-white font-semibold text-base md:text-xl">Service License:</div>
                  <div className="text-end text-slate-300 text-sm md:text-lg mt-2">For professional services and consultancy firms.</div>
                </div>
              </motion.div>

      

              {/* Bottom-left pill */}
              <motion.div
                className="lg:col-start-1 lg:row-start-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
                variants={pillVariant}
                custom={2}
              >
                <div className="glass-bg border border-white/8 backdrop-blur-sm rounded-[20px] p-4 md:py-5 md:px-7 transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(2,6,23,0.55)]">
                  <div className="text-white font-semibold text-base md:text-xl">Industrial License:</div>
                  <div className="text-end text-slate-300 text-sm md:text-lg mt-2">For manufacturing and production activities.</div>
                </div>
              </motion.div>

              {/* Bottom-right pill */}
              <motion.div
                className="lg:col-start-3 lg:row-start-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
                variants={pillVariant}
                custom={3}
              >
                <div className="glass-bg border border-white/8 backdrop-blur-sm rounded-[20px] p-4 md:p-5 transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(2,6,23,0.55)]">
                  <div className="text-white font-semibold text-base md:text-xl">eCommerce License:</div>
                  <div className="text-end text-slate-300 text-sm md:text-lg mt-2">For online and digital businesses.</div>
                </div>
              </motion.div>

              {/* Centered full-width pill below (on lg: visually centered across area) */}
              <motion.div
                className="col-span-1 md:col-span-2 lg:col-start-1 lg:col-end-4 lg:row-start-4 flex justify-center mt-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
                variants={pillVariant}
                custom={4}
              >
                <div className="w-full lg:w-3/5 glass-bg border border-white/8 backdrop-blur-sm rounded-[20px] p-4 md:py-5 md:px-6 text-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(2,6,23,0.55)]">
                  <div className="text-start text-white font-semibold text-base md:text-xl">Educational License:</div>
                  <div className="text-end text-slate-300 text-sm md:text-lg mt-2">For training or skill-development institutions.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
