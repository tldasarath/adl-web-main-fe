"use client";

import React, { useState, useRef, useEffect } from "react";
import Container from "@/Components/Common/Container";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQS({ faqs }) {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [heights, setHeights] = useState({});

  const refs = useRef({});

  const normalizedFaqs = Array.isArray(faqs)
    ? faqs.map((f, idx) => ({ id: f.id ?? idx, question: f.q, answer: f.a }))
    : [];

  // Measure each answer div’s height for smooth animation
  useEffect(() => {
    const newHeights = {};
    Object.keys(refs.current).forEach((key) => {
      const el = refs.current[key];
      if (el) newHeights[key] = el.scrollHeight;
    });
    setHeights(newHeights);
  }, [faqs]);

  const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="py-8 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-8 md:mb-12 flex justify-center flex-col">
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-[#376CBC] mr-2"></div>
              <p className="text-[#E9C05F] text:lg md:text-xl font-semibold tracking-wide">
                FAQ’s
              </p>
            </div>
          </div>

          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-center">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="flex justify-center w-full">
          <div className="space-y-3 w-full md:w-4/5">
            {normalizedFaqs.map((item, idx) => {
              const isHovered = hoverIndex === idx;
              const targetHeight = isHovered ? heights[item.id] || "auto" : 0;

              return (
                <motion.div
                  key={item.id}
                  className="rounded-xl overflow-hidden glass-bg transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.18 }}
                  variants={cardVariant}
                  transition={{ duration: 0.55, delay: idx * 0.04 }}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(-1)}
                >
                  {/* Question */}
                  <div className="w-full flex items-center justify-between text-left px-4 md:px-6 py-4 md:py-5 cursor-pointer">
                    <span className="text-sm md:text-base font-medium text-white">
                      {item.question}
                    </span>

                    <motion.span
                      className="ml-4 inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/15 text-white"
                      aria-hidden
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  </div>

                  {/* Answer Section — true smooth height animation */}
                  <motion.div
                    animate={{ height: targetHeight }}
                    transition={{
                      duration: 0.45,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      ref={(el) => (refs.current[item.id] = el)}
                      className="px-4 md:px-6 pb-4 -mt-1 text-gray-300 text-sm leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
