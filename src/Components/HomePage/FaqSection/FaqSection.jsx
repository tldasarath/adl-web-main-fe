"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/Components/Common/Container";
import { faqs } from "@/Datas/faqs";
import { motion, useAnimation, useInView } from "framer-motion";

export default function FAQSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView]);

  const leftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 1},
    }),
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 1 },
    }),
  };

  return (
    <section ref={ref} className="py-8 md:py-14 relative overflow-hidden">
      <Container>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-left mb-12">
            <h2 className="text-2xl mb-5 md:text-3xl main-text font-bold text-white">
              FAQ
            </h2>
            <p className="text-base max-w-2xl lg:text-lg mb-8 font-light leading-normal">
              Find clear answers to common questions about UAE business setup, visas,
              PRO services, and compliance. Our FAQ section helps you understand
              processes quickly and confidently.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">

            {/* LEFT COLUMN */}
            <div className="flex-1 flex flex-col gap-6">
              {faqs
                .filter((_, i) => i % 2 === 0)
                .map((faq, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={leftVariant}
                    initial="hidden"
                    animate={controls}
                  >
                    <FAQCard
                      faq={faq}
                      index={index}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                    />
                  </motion.div>
                ))}
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex flex-col gap-6">
              {faqs
                .filter((_, i) => i % 2 === 1)
                .map((faq, index) => (
                  <motion.div
                    key={index + 100}
                    custom={index}
                    variants={rightVariant}
                    initial="hidden"
                    animate={controls}
                  >
                    <FAQCard
                      faq={faq}
                      index={index + 100}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                    />
                  </motion.div>
                ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

/* FAQ CARD */
const FAQCard = ({ faq, index, hoveredIndex, setHoveredIndex }) => (
  <div
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    className="glass-bg rounded-2xl overflow-hidden transition-all duration-500"
  >
    <div className="w-full flex justify-between items-center text-left p-5 hover:bg-white/5 transition">
      <span className="font-medium text-sm sm:text-base">{faq.question}</span>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
          hoveredIndex === index ? "rotate-180" : ""
        }`}
      />
    </div>

    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        hoveredIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">
        {faq.answer}
      </div>
    </div>
  </div>
);
