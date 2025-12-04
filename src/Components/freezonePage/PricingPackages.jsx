// components/PricingPackages.jsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";
import { packages } from "@/Datas/packages";
import MainButton from "../button/MainButton";

const sectionVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const buttonMotion = {
  hover: { scale: 1.04, y: -3 },
  tap: { scale: 0.97 },
};

export default function PricingPackages() {
  return (
    <section id="freezone-packages" className="relative py-8 md:py-16 lg:py-24 overflow-hidden">
      <motion.div
        className=" absolute right-[0%] md:right-[0px] -z-10 top-[-15%] md:top-[-20%] lg:top-0  pointer-events-none select-none"
        initial={{ opacity: 0, x: 120, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        exit={{ opacity: 0, x: 120 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Image
          src="/assets/images/bg/glass_element_group.png"
          alt="Decorative shapes"
          width={217}
          height={247}
          className="object-contain  w-30 md:w-36 lg:w-56"
        />
      </motion.div>

      <Container>
        <div className="max-w-7xl mx-auto text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
            variants={sectionVariant}
            className="mb-8 lg:mb-12"
          >
            <motion.h2
              className="text-white text-2xl lg:text-3xl font-semibold mb-3"
              variants={childVariant}
            >
              Transparent Pricing. <br className="hidden md:inline" /> No Hidden
              Fees.
            </motion.h2>
            <motion.p
              className="text-white max-w-2xl leading-relaxed font-semibold text-lg md:text-xl "
              variants={childVariant}
            >
              We provide Freezone packages customized to your business goals and
              budget. Whether you're an entrepreneur launching a startup or a
              company expanding to the Middle East, ADL ensures value and
              compliance at every step.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-12 xl:gap-24 items-start mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariant}
          >
            {packages?.map((pkg) => {
              const isCenter = !!pkg.emphasized;
              return (
                <motion.article
                  key={pkg.id}
                  variants={cardVariant}
                  className={`pricing-card relative rounded-[20px] p-6 md:p-8 transition-transform duration-300
                   glass-bg
                    border border-white/6 backdrop-blur-sm shadow-[0_20px_60px_rgba(2,6,23,0.6)]
                    ${
                      isCenter ? "lg:scale-105 lg:pt-10 lg:pb-10 lg:z-10" : ""
                    }`}
                  whileHover={{ y: -8 }}
                >
                  <div className="flex items-center gap-4 md:gap-16">
                    <div className="rounded-xl inline-flex items-center justify-center   backdrop-blur-sm overflow-hidden ">
                      <Image
                        src={pkg.image}
                        alt={`${pkg.title} logo`}
                        width={88}
                        height={78}
                        className="object-contain w-14 h-14 md:w-[88px] md:h-[78px]"
                      />
                    </div>

                    {/* <div className="flex-1"> */}
                    <h3 className="text-white text-lg md:text-2xl font-semibold text-start lg:text-center whitespace-pre-line">
                      {pkg.title}
                    </h3>
                    {/* </div> */}
                  </div>

                  <p className="text-slate-300 font-normal text-sm mt-4">
                    {pkg.description}
                  </p>

                  {/* ——————————— divider Line——————————— */}
                  <div className="mt-4 mb-4 border-t border-white " />

                  <ul className={`mt-2 space-y-3 ${isCenter ? "md:mt-4" : ""}`}>
                    {pkg.keyPoints.map((b, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          aria-hidden
                          className="mt-1 flex items-center  glass-bg justify-center w-6 h-6 rounded-full flex-shrink-0"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="block"
                          >
                            <path
                              d="M3 12h12"
                              stroke="#E9C05F"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5l7 7-7 7"
                              stroke="#E9C05F"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <span className="text-white text-sm leading-snug">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 md:mt-8 flex items-center justify-center">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium glass-bg border border-white/10 text-white/90
                        ${
                          isCenter
                            ? "md:px-6 md:py-2.5 font-normal text-sm"
                            : ""
                        }`}
                      role="status"
                    >
                     AED {pkg.price}
                    </div>
                  </div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-6 right-6 bottom-[-18px] h-8 rounded-b-[18px] bg-[rgba(255,255,255,0.02)] border border-white/6 blur-sm opacity-60"
                    style={{ zIndex: -1 }}
                  />
{/* Glass Shine on Hover - unchanged element placement */}
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

          <div
            className="w-full flex items-center justify-center"
            variants={childVariant}
          >
            {/* 
            <button
              type="button"
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#E7D6A4]/30 text-white bg-transparent overflow-hidden"
            >
              <span className="relative z-10">Get a Quote Today</span>

              <span
                className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full ml-2 border border-[#E7D6A4]/30"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h13M13 5l6 7-6 7" stroke="#E7D6A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

             
              <span
                className="absolute left-[-40%] top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent transform -skew-x-12 animate-[shine_2.2s_linear_infinite]"
                style={{ opacity: 0.6 }}
                aria-hidden
              />
            </button> */}
            <motion.div
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <MainButton text="Get a Quote Today" url="/contact" />
            </motion.div>
          </div>
        </div>
      </Container>

      <style jsx>{`
 .shine-effect {
          position: absolute;
          top: -120%;
          left: -150%;
          width: 220%;
          height: 300%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%) rotate(6deg);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.45s ease-out;
          opacity: 0;
          mix-blend-mode: screen;
        }

        /* target the card class specifically so scoping works reliably */
        .pricing-card:hover .shine-effect {
          transform: translateX(140%) rotate(6deg);
          opacity: 0.9;
        }

        /* subtle extra when pointer leaves quickly */
        .pricing-card:active .shine-effect {
          transition-duration: 0.25s;
        }

        /* small media tweaks so effect still looks good on smaller screens */
        @media (max-width: 1024px) {
          .shine-effect {
            top: -140%;
            left: -180%;
            width: 260%;
            height: 260%;
            opacity: 0.0;
          }
        }

      `}</style>
    </section>
  );
}
