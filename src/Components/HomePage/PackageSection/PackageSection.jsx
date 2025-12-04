"use client";

import React from "react";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import MainButton from "@/Components/button/MainButton";
import { packages } from "@/Datas/packages";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};


const PackageSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="relative py-8 md:py-14"
    >

      {/* BG Shapes */}
      <div className="absolute left-[-10%] md:left-[-10px] -z-10 bottom-0 opacity-60 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/square4.png"
          alt="Decorative shapes"
          width={240}
          height={320}
          className="object-contain md:w-40 w-30"
        />
      </div>

      <div className="absolute right-0 top-0 overflow-hidden -z-10 opacity-60 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/square3.png"
          alt="Decorative shapes"
          width={240}
          height={320}
          className="object-contain md:w-40 w-30"
        />
      </div>

      <Container>
        <div>
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              Our Pricing Packages
            </h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">
              Choose the perfect package for your business needs. All packages include
              high-quality development and dedicated support to ensure your success.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={fadeUp}
                className="glass-bg rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
             flex flex-col h-full"
              >
                {/* CONTENT AREA – stretches to fill height */}
                <div className="flex-1 flex flex-col">

                  {/* IMAGE + TITLE */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-contain"
                      />
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold">{pkg.title}</h3>
                  </div>

                  {/* DESCRIPTION */}
             <p className="text-sm md:text-base font-light leading-relaxed mb-4 
              h-auto md:h-24 lg:h-30 ">
  {pkg.description}
</p>
                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/40 mb-4"></div>

                  {/* FEATURES – let this section stretch if needed */}
                  <ul className="space-y-2 flex-1">
                    {pkg.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* PRICE BUTTON — stays fixed at bottom */}
                <div className="flex justify-center mt-6">
                  <button className="w-2/3 py-3 rounded-3xl glass-bg text-white font-semibold text-lg tracking-wide">
                    AED {pkg.price}
                  </button>
                </div>
              </motion.div>


            ))}
          </div>

          {/* View More Button */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center mt-10"
          >
            <MainButton text="View more" url="/uae-freezone-business-setup" />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default PackageSection;
