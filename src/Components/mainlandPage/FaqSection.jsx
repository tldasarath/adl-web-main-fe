"use client";

import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const normalizedFaqs = Array.isArray(faqs)
    ? faqs.map((f, idx) => ({
        id: f.id ?? idx,
        question: f.question,
        answer: f.answer,
      }))
    : [];

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? -1 : idx));

  const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const answerVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  };

  return (
    <section className={`relative py-8 md:py-24 overflow-hidden`}>
      <motion.div
        className=" absolute right-[0%] md:right-[-10px] -z-10 top-0 xl:top-0  pointer-events-none select-none"
        initial={{ opacity: 0, x: 120, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        exit={{ opacity: 0, x: 120 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Image
          src="/assets/images/bg/right_glass_element.png"
          alt="Decorative shapes"
          width={219}
          height={247}
          className="object-contain  w-30 md:w-36 lg:w-64"
        />
      </motion.div>

      <Container>
        {/* Header */}
        <div className=" mb-8 md:mb-12 flex justify-center flex-col">
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
        <data className="flex justify-center   w-full">
          <div className="space-y-3 w-full md:w-4/5">
            {normalizedFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={item.id}
                  className="rounded-xl overflow-hidden   glass-bg"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.18 }} 
                  variants={cardVariant}
                  transition={{ duration: 0.55, delay: idx * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left px-4 md:px-6 py-4 md:py-5"
                  >
                    <span className="text-sm md:text-base font-medium text-white">
                      {item.question}
                    </span>

                    {/* animated icon */}
                    <motion.span
                      className="ml-4 inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/15 text-white"
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
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
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="px-4 md:px-6 pb-5 -mt-1 text-gray-300 text-sm leading-relaxed"
                        key="answer"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={answerVariant}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </data>
      </Container>
    </section>
  );
};

export default FAQSection;
