
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { visaDetails } from "@/Datas/visaData"; 
import Container from "../Common/Container";
import Image from "next/image";

export default function VisaTabs({ visa: propVisa = null }) {
  const visa = propVisa ?? visaDetails?.[0] ?? null;
  if (!visa) return null;

  const tabs = useMemo(
    () => [
      { key: "section1", label: visa.section1?.title || "Eligibility" },
      { key: "section2", label: visa.section2?.title || "Benefits" },
      { key: "section3", label: visa.section3?.title || "Our Services" },
      { key: "whyChoose", label: visa.whyChoose?.title || "Why Choose ADL" },
    ],
    [visa]
  );

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [direction, setDirection] = useState(1);

  const getPointsForTab = (tabKey) => {
    if (tabKey === "section1") return visa.section1?.points ?? [];
    if (tabKey === "section2") return visa.section2?.points ?? [];
    if (tabKey === "section3") return visa.section3?.points ?? [];
    if (tabKey === "whyChoose") return visa.whyChoose?.points ?? [];
    return [];
  };

  const currentPoints = getPointsForTab(activeTab);

  // animations
  const cardVariant = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const tabItemVariant = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: "easeOut" },
    },
  };

  const contentWrap = {
    enter: (dir = 1) => ({ opacity: 0, x: 12 * dir }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir = 1) => ({
      opacity: 0,
      x: -8 * dir,
      transition: { duration: 0.28, ease: "easeInOut" },
    }),
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -8 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" },
    }),
  };

  const handleTabClick = (key) => {
    const prevIndex = tabs.findIndex((t) => t.key === activeTab);
    const nextIndex = tabs.findIndex((t) => t.key === key);
    setDirection(nextIndex >= prevIndex ? 1 : -1);
    setActiveTab(key);
  };

  return (
    <section className="relative py-8 lg:py-24 overflow-hidden">
      <motion.div
        className=" absolute right-[0%] md:right-[-10px] -z-10 top-[-15%] md:top-[-20%] lg:top-0  pointer-events-none select-none"
        initial={{ opacity: 0, x: 120, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        exit={{ opacity: 0, x: 120 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Image
          src="/assets/images/visas/glass_element_right.png"
          alt="Decorative shapes"
          width={217}
          height={247}
          className="object-contain  w-30 md:w-36 lg:w-56"
        />
      </motion.div>

      <Container>
        <div className="max-w-6xl ">
          <div className="mb-4">
            {/* SMALL: native select  */}
            <div className="md:hidden">
              <label htmlFor="visa-tab-select" className="sr-only">
                Select section
              </label>
              <select
                id="visa-tab-select"
                value={activeTab}
                onChange={(e) => {
                  const key = e.target.value;
                  handleTabClick(key);
                }}
                className="w-full bg-transparent border border-white/6 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#376CBC]/30"
              >
                {tabs.map((t) =>
                  t.label ? (
                    <h3
                      key={t.key}
                      value={t.key}
                      className="bg-[#0b1522] text-white"
                    >
                      {t.label}
                    </h3>
                  ) : null
                )}
              </select>
            </div>

            {/* MEDIUM+: horizontal tabs  */}
            <nav
              className="hidden md:flex items-end gap-6 xl:gap-12 border-b border-white/70 pb-3"
              role="tablist"
              aria-label="Visa sections"
            >
              {tabs.map((t, idx) =>
                t.label ? (
                  <motion.button
                    key={t.key}
                    onClick={() => handleTabClick(t.key)}
                    variants={tabItemVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`relative text-sm md:text-base font-medium transition-colors pb-2 ${
                      activeTab === t.key
                        ? "text-white"
                        : "text-[#ffff]/70 hover:text-white/90"
                    }`}
                    aria-selected={activeTab === t.key}
                    role="tab"
                    type="button"
                  >
                    <h3 className="font-semibold">{t.label}</h3>

                    {activeTab === t.key && (
                      <motion.span
                        layoutId="visa-tab-underline"
                        className="absolute left-0 right-0 -bottom-[12px] h-[3px] rounded bg-[#376CBC]"
                        style={{
                          boxShadow: "0 3px 10px rgba(55,108,188,0.16)",
                        }}
                      />
                    )}
                  </motion.button>
                ) : null
              )}
            </nav>
          </div>

          {/* glass card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
            variants={cardVariant}
            className="mt-4 rounded-2xl p-5 md:p-8 bg-[#FFFFFF]/10 border border-white/6 backdrop-blur-sm shadow-[0_10px_30px_rgba(2,6,23,0.6)]"
            role="region"
            aria-labelledby="visa-tabs"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                custom={direction}
                variants={contentWrap}
                initial="enter"
                animate="center"
                exit="exit"
                className="max-w-[980px]"
              >
                <ul className="space-y-4 md:space-y-5">
                  {currentPoints.length === 0 ? (
                    <motion.li
                      variants={listItemVariant}
                      className="text-slate-300"
                    >
                      No information available.
                    </motion.li>
                  ) : (
                    currentPoints.map((pt, i) => {
                      const text =
                        typeof pt === "string" ? pt : pt?.title ?? "";
                      return (
                        <motion.li
                          key={text + i}
                          custom={i}
                          variants={listItemVariant}
                          initial="hidden"
                          animate="visible"
                          className="flex items-start gap-4"
                        >
                          <span
                            className="mt-1 w-3 h-3 rounded-full flex-shrink-0"
                            style={{
                              background:
                                "linear-gradient(180deg,#3b82f6,#1e3a8a)",
                            }}
                            aria-hidden
                          />
                          <span className="text-white text-base md:text-xl leading-relaxed">
                            {text}
                          </span>
                        </motion.li>
                      );
                    })
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
