"use client";

import { motion } from "framer-motion";
import { CheckSquare, Circle } from "lucide-react";
import Container from "../Common/Container";

export default function WhyChoose({
  title,
  description,
  points,
  documents 
}) {
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section
      id="why-ifza"
      className="relative py-8 md:py-18 text-white "
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
        >
          {/* Left Column - Why Choose IFZA */}
          <motion.div className="lg:col-span-7 space-y-5" variants={fadeItem}>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              {title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-6 max-w-2xl">
              {description}
            </p>

            <ul className="space-y-3">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-slate-300 text-sm md:text-base"
                  variants={fadeItem}
                >
                  <div className="w-3 h-3 glass-bg mt-1 rounded-full " ></div>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Required Documents */}
          <motion.div
            className="lg:col-span-5 glass-bg rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm"
            variants={fadeItem}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-5 text-white">
              Required Documents
            </h3>

            <ul className="space-y-4">
              {documents.map((doc, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-slate-300 text-sm md:text-base"
                  variants={fadeItem}
                >
                  <CheckSquare className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                  <span>{doc}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
