
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container"; // optional — replace with your wrapper or remove

export default function AboutFreezone({
  image, // default - replace path as needed
  title,
  description,
  highlights
}) {
  // Framer-motion variants
  const containerVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.98, x: -18 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const contentVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08, ease: "easeOut" } },
  };

  const boxVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 + i * 0.06 } }),
    hover: { scale: 1.02 },
  };

  return (
    <section
      className="relative py-12 md:py-20 bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] bg-center"
      aria-labelledby="ifza-about-heading"
    >
      <Container>
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" // 👈 added items-stretch
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariant}
        >
          {/* LEFT: image */}
          <motion.div className="lg:col-span-5 flex" variants={imageVariant}>
            <div className="rounded-xl overflow-hidden shadow-lg w-full h-full max-h-[376px]"> {/* 👈 limit height */}
              <Image
                src={image}
                alt={title}
                width={840}
                height={560}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full h-full object-cover block rounded-lg"
                priority={false}
              />
            </div>
          </motion.div>

          {/* RIGHT: content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center h-full" // 👈 equal height + vertical center
            variants={contentVariant}
            id="ifza-about-heading"
          >
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">{title}</h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-[720px] mb-6">
              {description}
            </p>

            {/* highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={boxVariant}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: false, amount: 0.2 }}
                  className="rounded-lg border border-[#376CBC]/80 p-4 flex items-center justify-start shadow-sm transition-transform h-full"
                >
                  <div className="text-slate-200 text-sm md:text-base leading-snug">{h}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </Container>
    </section>
  );
}
