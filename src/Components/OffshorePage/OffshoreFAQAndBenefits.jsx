"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {  FileText, Banknote, Briefcase, MessagesSquare, Gauge } from "lucide-react";
import Container from "../Common/Container";

export default function OffshoreFAQAndBenefits() {
  // Start with the first FAQ opened (index 0)
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Can offshore companies do business inside UAE?",
      answer:
        "No, offshore companies are not permitted to operate business within the UAE. They can, however, conduct business activities internationally.",
    },
    {
      question: "Can I open a bank account for an offshore company?",
      answer:
        "Yes — UAE and select international banks accept offshore corporate accounts (subject to compliance).",
    },
    {
      question: "Do offshore companies pay tax in UAE?",
      answer: "No UAE tax on offshore entities (subject to regulations).",
    },
  ];

  const benefits = [
    { icon: <Briefcase className="w-4 h-4" />, text: "Dedicated business setup experts" },
    { icon: <FileText className="w-4 h-4" />, text: "End-to-end documentation & compliance" },
    { icon: <Banknote className="w-4 h-4" />, text: "Banking guidance & support" },
    {
    icon: <Gauge className="w-4 h-4" />,
    text: "Transparent pricing & fast processing",
  },
  {
    icon: <MessagesSquare className="w-4 h-4" />,
    text: "Free consultation & business advisory",
  },];

  const scrollRef = useRef(null);

  // Smooth scroll only for md and above
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="text-white py-8 md:py-16">
      <Container>
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ---------------- Left Section (FAQ) ---------------- */}
          <div className="border border-[#376CBC]/80 rounded-2xl p-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h3>

            <ul className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.li
                  key={index}
                  onMouseEnter={() => setOpenIndex(index)} // opens the hovered one
                  className={`glass-bg rounded-xl overflow-hidden border transition cursor-pointer ${
                    openIndex === index
                      ? "border-blue-500/40 bg-blue-500/5"
                      : "border-transparent hover:border-blue-500/30"
                  }`}
                >
                  {/* Question */}
                  <div className="px-4 py-3 font-medium text-gray-200 flex justify-between items-center">
                    {faq.question}
                  </div>

                  {/* Animated Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="px-4 pb-3 text-gray-400 text-sm leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ---------------- Right Section (Benefits) ---------------- */}
          <div
            className="border border-[#376CBC]/80 rounded-2xl p-6 backdrop-blur-md  relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6">
              Benefits of Setting Up Offshore with ADL
            </h3>

            <div className="relative glass-bg px-4 py-6 rounded-3xl">
              {/* Vertical line */}
              <div className="absolute left-20 top-6 bottom-0 w-[4px] bg-gradient-to-b from-blue-500/60 to-transparent"></div>

              {/* Scroll behavior changes by screen size */}
              <ul
                ref={scrollRef}
                className="space-y-4 pl-8 pr-3 max-h-[230px] scroll-smooth 
                           overflow-y-auto md:overflow-hidden 
                           md:hover:overflow-hidden"
              >
                {benefits.map((item, index) => (
                  <motion.li
                    key={index}
                    className="relative glass-bg rounded-xl px-4 py-3 flex items-center gap-3 border border-transparent hover:border-blue-500/50 hover:bg-blue-500/10 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400">
                      {item.icon}
                    </div>
                    <span className="text-gray-200">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom fade gradient (hidden on small screens) */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0a0a] via-transparent pointer-events-none hidden md:block"></div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
