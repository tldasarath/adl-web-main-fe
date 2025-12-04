// components/freezonePage/FreezoneAdvantages.jsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container"; // keep your Container component

const features = [
  { key: "partnerships", title: "Authorized Partnerships", desc: "Direct affiliations with major UAE Freezones.", icon: "authorized-partnerships.png" },
  { key: "planning", title: "Customized Planning", desc: "Tailored Freezone recommendations based on your business model.", icon: "customized-planning.png" },
  { key: "support", title: "End-to-End Support", desc: "From registration to visas and renewals.", icon: "end-to-end-support.png" },
  { key: "expertise", title: "Corporate Expertise", desc: "Experienced PRO and legal documentation team.", icon: "corperate-expertise.png" },
  { key: "speed", title: "Speed & Efficiency", desc: "Setup in as fast as 48 hours.", icon: "speed-&-efficiency.png" },
  { key: "trust", title: "Transparency & Trust", desc: "No hidden charges, complete compliance assurance.", icon: "transperency-&-trust.png" },
];

const containerVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: "beforeChildren" } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

function IconImage({ name, size = 36 }) {
  const src = `/assets/images/freezone/${name}`;
  return (
    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
      <Image
        src={src}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="object-contain"
        style={{ objectPosition: "center" }}
      />
    </div>
  );
}

export default function FreezoneAdvantages() {
  return (
    <section className="relative py-8 md:py-16 lg:py-24 overflow-visible">
      <Container>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-white text-2xl md:text-3xl font-semibold mb-3"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            Your Freezone Partner. <br />Your Growth Partner.
          </motion.h2>

          <motion.p
            className="text-slate-300 text-base md:text-lg max-w-md font-normal mx-auto mb-12"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            At ADL Business Solutions, we bring more than just expertise — we bring partnership.
          </motion.p>

          {/* Grid 5x3 on lg. On smaller screens it falls back to 1/2 columns */}
          <motion.div
            className="relative mx-auto max-w-5xl px-6 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
            variants={containerVariant}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_10px_1fr_10px_1fr] lg:grid-rows-[auto_10px_auto] gap-y-8 gap-x-6 items-center">
              {/* Top row */}
              <motion.div
                variants={itemVariant}
                className="lg:col-start-1 lg:row-start-1 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[0].icon} />
                </div>
                <h4 className="text-white text-sm md:text-base font-semibold mb-1">{features[0].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[0].desc}</p>
              </motion.div>

              {/* vertical divider column (col 2) */}
              <div aria-hidden className="hidden lg:block lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:self-stretch">
                <div className="w-px h-full bg-[#E9C05F]/80" />
              </div>

              <motion.div
                variants={itemVariant}
                className="lg:col-start-3 lg:row-start-1 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[1].icon} />
                </div>
                <h4 className="text-white text-sm md:text-base font-semibold mb-1">{features[1].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[1].desc}</p>
              </motion.div>

              {/* vertical divider column (col 4) */}
              <div aria-hidden className="hidden lg:block lg:col-start-4 lg:row-start-1 lg:row-end-4 lg:self-stretch">
                <div className="w-px h-full bg-[#E9C05F]/80" />
              </div>

              <motion.div
                variants={itemVariant}
                className="lg:col-start-5 lg:row-start-1 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[2].icon} />
                </div>
                <h4 className="text-white text-base md:text-xl font-semibold mb-1">{features[2].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[2].desc}</p>
              </motion.div>

              {/* horizontal divider row (row 2) spanning all columns */}
              <div className="hidden lg:flex lg:col-start-1 lg:col-end-6 lg:row-start-2 items-center px-4">
                <div className="h-px w-full bg-[#E9C05F]/80" />
              </div>

              {/* Bottom row: features 3,4,5 */}
              <motion.div
                variants={itemVariant}
                className="lg:col-start-1 lg:row-start-3 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[3].icon} />
                </div>
                <h4 className="text-white text-sm md:text-base font-semibold mb-1">{features[3].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[3].desc}</p>
              </motion.div>

              <motion.div
                variants={itemVariant}
                className="lg:col-start-3 lg:row-start-3 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[4].icon} />
                </div>
                <h4 className="text-white text-sm md:text-base font-semibold mb-1">{features[4].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[4].desc}</p>
              </motion.div>

              <motion.div
                variants={itemVariant}
                className="lg:col-start-5 lg:row-start-3 flex flex-col items-center text-center px-4 md:px-6"
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-full glass-bg bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm mb-4">
                  <IconImage name={features[5].icon} />
                </div>
                <h4 className="text-white text-sm md:text-base font-semibold mb-1">{features[5].title}</h4>
                <p className="text-slate-300 text-xs md:text-sm max-w-[220px]">{features[5].desc}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mt-12 mb-12"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            Our consultants combine local knowledge, legal experience,
            <br className="hidden md:inline" />
            and strategic insight to guide entrepreneurs toward sustainable success in the UAE.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
