"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../Common/Container";
import ImageWithFallback from "../Common/ImageFallBack";

export default function TypesOfLicenses({ title, licenses,description }) {
  // container fade animation
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  // card animation (whole card)
  const cardVariant = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.03, y: -6, transition: { duration: 0.25 } },
  };

  // image overlay motion (for subtle zoom & reveal)
  const imageMotion = {
    initial: { scale: 1.05, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: { scale: 1.08, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="types-of-licenses" className="relative py-10 md:py-20 text-white">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center md:text-left mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariant}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">{title}</h2>
            <p className="text-slate-400 max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* License Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={containerVariant}
          >
            {licenses.map((license, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover="hover"
                className="rounded-xl overflow-hidden flex flex-col h-full transition "
              >
                {/* Animated Image */}
                <motion.div
                  className="relative w-full h-40 md:h-48 overflow-hidden"
                  variants={imageMotion}
                  initial="initial"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: false, amount: 0.4 }}
                >
<ImageWithFallback
  src={license.image}
  fallback="/assets/images/freezone-details/license-types/license.png"
  alt={license.type}
  fill
  className="object-cover object-center rounded-t-xl"
/>

                  {/* gradient overlay */}
                </motion.div>

                {/* Content */}
                <div className="py-3 px-2 flex flex-col flex-grow text-center md:text-left">
                  <h3 className="text-base md:text-lg font-semibold mb-1">
                    {license.type}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-snug">
                    {license.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
