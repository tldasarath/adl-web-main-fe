"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../Common/Container";
import { testimonials } from "@/Datas/testimonialData";


const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  enter: (dir = 1) => ({ opacity: 0, y: 12 * dir, scale: 0.995 }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (dir = 1) => ({
    opacity: 0,
    y: -8 * dir,
    scale: 0.99,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((p) => (p + 1) % testimonials.length);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-8 md:py-16 lg:py-24 "
    >
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
        <div className="max-w-7xl ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
            variants={sectionVariant}
            className="flex flex-col gap-8 lg:gap-12 items-start lg:items-center"
          >
            {/* Left heading / description */}
            <div className="w-full flex flex-col justify-center items-start">
              <h3
                id="testimonials-heading"
                className="text-white text-2xl md:text-3xl font-semibold mb-3"
              >
                What Our Clients Say
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-md">
                Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, vulputate libero et velit
                interdum.
              </p>
            </div>

            {/* Center carousel card */}
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-3xl relative">
                <div className="pt-10">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={testimonials[index].id}
                      custom={1}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      viewport={{ once: false, amount: 0.2 }}
                      className="relative glass-bg bg-[#ffffff]/10 backdrop-blur-md border border-white/10 rounded-[20px] p-8 md:p-12 text-center"
                    >
                      <h4 className="text-[#F4B93B] text-xl md:text-2xl font-semibold mb-2">
                        {testimonials[index].name}
                      </h4>
                      <div className="text-sm text-slate-300 mb-6">
                        {testimonials[index].role}
                      </div>

                      <blockquote className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        "{testimonials[index].quote}"
                      </blockquote>

                      {/* stars */}
                      <div className="flex items-center justify-center gap-1.5">
                        {Array.from({ length: testimonials[index].rating }).map(
                          (_, s) => (
                            <svg
                              key={s}
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="inline-block"
                            >
                              <path
                                d="M12 17.3l-6.18 3.24 1.18-6.88L2 9.76l6.9-1L12 2.5l3.1 6.26L22 9.76l-5 3.9 1.18 6.88z"
                                fill="#2563EB"
                              />
                            </svg>
                          )
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ✅ Layer card below (non-absolute, same row flow) */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[45rem] mt-6 -translate-y-6 h-8 rounded-br-[20px] rounded-bl-[20px] glass-bg bg-[#ffffff]/10 border border-white/10"></div>
                </div>

                {/* arrows below card */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-12 h-12 rounded-full glass-bg bg-[#ffffff]/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18l-6-6 6-6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-12 h-12 rounded-full glass-bg bg-[#ffffff]/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
