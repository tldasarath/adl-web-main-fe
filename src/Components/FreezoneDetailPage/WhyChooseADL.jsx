"use client";

import { motion } from "framer-motion";
import Container from "../Common/Container";
import Image from "next/image";

export default function WhyChooseADL({
  title,
  points
}) {
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <section
      id="why-adl"
      className="relative py-8 md:py-18 text-white "
    >
        <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={{
    hidden: { opacity: 0, x: -100 }, // start from left and invisible
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  }}
  className="absolute left-[-10%] md:left-[-10px] -z-10 top-[25%] -translate-y-1/2 pointer-events-none select-none"
>
  <Image
    src="/assets/images/bg/left.png"
    alt="Decorative shapes"
    width={240}
    height={320}
    className="object-contain md:w-60 w-30"
  />
</motion.div>

      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
        >
          {/* Section Title */}
          <h2 className="text-3xl md:text-[32px] font-semibold mb-10">
            {title}
          </h2>

          {/* Feature List */}
          <div className="space-y-4">
            {points.map((point, i) => (
              <motion.div
                key={i}
                variants={itemVariant}
                whileHover="hover"
                className="rounded-lg glass-bg shadow-lg px-6 py-4 text-base md:text-lg text-slate-200 transition-all backdrop-blur-sm"
              >
                {point}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
