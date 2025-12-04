"use client";

import { motion } from "framer-motion";
import { Monitor, Building2, Warehouse, Briefcase } from "lucide-react";
import Container from "../Common/Container";

export default function SetupPackages({
  title,
  note ,
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={containerVariant}
        >
          {packages.map((pkg, i) => {
            // Split description by '+' and trim each part
            const items = pkg.description.split("+").map((item) => item.trim());

            return (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover="hover"
                className="relative bg-[linear-gradient(360deg,rgba(57,70,100,1)_0%,rgba(13,19,37,1)_100%)] border border-[#2b3a5b] rounded-2xl p-6 flex flex-col justify-between shadow-lg backdrop-blur-sm transition"
              >
                {/* Accent Corner Line */}
      <div className="absolute top-4 md:top-4 right-0 lg:-left-right w-24 md:w-[91px] h-[81px] border-b-4 border-r-4 border-[#E9C05F] rounded-br-4xl rotate-270"></div>

                {/* Icon (optional) */}
                {/* <div className="flex items-center justify-center mb-4">
                  <div className="bg-[#222c4d] w-12 h-12 flex items-center justify-center rounded-full border border-[#2b3a5b]">
                    {pkg.icon}
                  </div>
                </div> */}

                {/* Package Name */}
                <h3 className="text-lg md:text-xl font-semibold text-start mb-3">
                  {pkg.name}
                </h3>

                {/* Package Items */}
                <ul className="text-slate-300 text-sm md:text-base mb-6 space-y-1 text-left">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-left">
                      <span className="text-yellow-400">↠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Tag */}
                <div className="flex justify-center">
                  <span className="glass-bg text-white text-sm md:text-base font-medium rounded-xl px-4 py-2 shadow-sm">
                    AED 
                    {pkg.startingPriceAED.toLocaleString()}
                    </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
