"use client";

import { motion } from "framer-motion";
import { Monitor, Building2, Warehouse, Briefcase } from "lucide-react";
import Container from "../Common/Container";
import Image from "next/image";

export default function SetupPackages({
  title,
  note,
  packages
}) {
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section id="setup-packages" className="relative py-8 md:py-18 text-white">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center md:text-left mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">{title}</h2>
          <p className="text-slate-400 max-w-2xl">{note}</p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={containerVariant}
        >
          {packages.map((pkg, i) => {
            return (
              <motion.article
                variants={cardVariant}
                className={`pricing-card relative rounded-[20px] p-6 md:p-8 transition-transform duration-300
    glass-bg
    border border-white/6 backdrop-blur-sm shadow-[0_20px_60px_rgba(2,6,23,0.6)]
    lg:scale-105 lg:pt-10 lg:pb-10 lg:z-10
  `}
                whileHover={{ y: -8 }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 md:gap-12">
                  <div className="rounded-xl inline-flex items-center justify-center  overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} logo`}
                      width={120}
                      height={100}
                      className="object-contain w-20 h-20 md:w-[220px] md:h-[100px]"
                    />
                  </div>


                  <h3 className="text-white text-lg md:text-2xl font-semibold text-start lg:text-center whitespace-pre-line">
                    {pkg.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-300 font-normal text-sm mt-4">
                  {pkg.description}
                </p>

                {/* Divider */}
                <div className="mt-4 mb-4 border-t border-white" />

                {/* Key Points */}
                <ul className="mt-4 space-y-3">
                  {pkg?.points?.map((val, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="mt-1 flex items-center glass-bg justify-center w-6 h-6 rounded-full flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 12h12"
                            stroke="#E9C05F"
                            strokeWidth="3.4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 5l7 7-7 7"
                            stroke="#E9C05F"
                            strokeWidth="3.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>

                      <span className="text-white text-sm leading-snug">
                        {val}
                      </span>
                    </li>
                  ))}
                </ul>


                {/* Price */}
                <div className="mt-6 md:mt-8 flex items-center justify-center">
                  <div
                    className="px-6 py-2.5 rounded-full text-sm font-normal glass-bg border border-white/10 text-white/90"
                    role="status"
                  >
                    AED {pkg.price}
                  </div>
                </div>

                {/* Bottom Shadow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-6 right-6 bottom-[-18px] h-8 rounded-b-[18px] bg-[rgba(255,255,255,0.02)] border border-white/6 blur-sm opacity-60"
                  style={{ zIndex: -1 }}
                />

                {/* Glass Shine */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none"
                  aria-hidden
                >
                  <div className="shine-effect" />
                </div>
              </motion.article>

            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
