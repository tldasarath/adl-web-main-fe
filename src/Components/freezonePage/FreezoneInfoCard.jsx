"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Container from "../Common/Container";

export default function FreezoneInfoCard() {
  const containerVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: -18, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const contentVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.06, ease: "easeOut" } },
  };

  const itemVariant = (i) => ({
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.05, duration: 0.36 } },
  });

  const bulletsLeft = [
    "100% Foreign Ownership",
    "Full Profit Repatriation",
    "State-of-the-Art Infrastructure",
    "Fast Company Formation (2–5 Days)",
  ];

  const bulletsRight = [
    "0% Corporate & Personal Tax",
    "No Customs Duty on Imports/Exports",
    "Multiple Visa Options",
  ];

  return (
    <section
      aria-labelledby="freezone-card-heading"
      className="py-10 md:py-14 "
    >
      <Container>
        <div className="max-w-6xl">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariant}
            className="rounded-2xl p-6 md:p-8 lg:p-10 glass-bg border border-white/6 backdrop-blur-sm shadow-[0_20px_60px_rgba(2,6,23,0.6)]"
          >
            {/* Heading */}
            <h2 id="freezone-card-heading" className="text-white text-2xl md:text-3xl font-semibold mb-6">
              A Global Gateway for Ambitious <br className="hidden md:inline"/>Businesses
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left column - Image */}
              <div className="lg:col-span-5">
                <motion.div variants={imageVariant} className="rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src="/assets/images/freezone/global-gateway-for-ambitious-business.png"
                    alt="Freezone business interior"
                    width={760}
                    height={520}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="w-full h-auto object-cover block rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Right column - Text and Bullets */}
              <motion.div variants={contentVariant} className="lg:col-span-7">
                <p className="text-slate-300 text-base md:text-xl font-normal leading-relaxed mb-6">
                  UAE Freezones are purpose-built economic hubs offering international investors a tax-free environment,
                  100% foreign ownership, simplified company registration, and premium facilities. Whether you're launching a
                  tech startup, manufacturing unit, or service company, Freezones provide everything your business needs to thrive.
                </p>

                {/* Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {bulletsLeft.map((b, i) => (
                      <motion.div key={b} variants={itemVariant(i)} className="flex items-start gap-3">
                        {/* Updated golden arrow (↗ style) */}
                        <span
                          className="mt-1 flex items-center justify-center glass-bg rounded-full w-5 h-5 flex-shrink-0"
                          aria-hidden
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#E9C05F]"
                          >
                            <path
                              d="M5 19L19 5M19 5H8M19 5V16"
                              stroke="url(#grad1)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient id="grad1" x1="5" y1="19" x2="19" y2="5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F4B93B" />
                                <stop offset="1" stopColor="#D9A23A" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                        <div className="text-slate-200 text-sm md:text-base font-normal leading-snug">{b}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {bulletsRight.map((b, i) => (
                      <motion.div key={b} variants={itemVariant(i + 10)} className="flex items-start gap-3">
                        <span
                          className="mt-1 flex items-center justify-center glass-bg rounded-full w-5 h-5 flex-shrink-0"
                          aria-hidden
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#E9C05F]"
                          >
                            <path
                              d="M5 19L19 5M19 5H8M19 5V16"
                              stroke="url(#grad2)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient id="grad2" x1="5" y1="19" x2="19" y2="5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F4B93B" />
                                <stop offset="1" stopColor="#D9A23A" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                        <div className="text-slate-200 text-sm md:text-base leading-snug">{b}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
