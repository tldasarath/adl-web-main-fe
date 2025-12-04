"use client";

import { motion } from "framer-motion";
import Container from "../Common/Container";

export default function WhyADLSection({description}) {
  return (
    <section className="relative py-8 md:py-20 text-white overflow-hidden">
      <Container>
        {/* Wrapper for corner lines + content */}
        <div className="relative border-none">
          {/* Decorative gold corners inside container */}
      <div className="absolute -top-8 md:-top-15 left-0 lg:-left-10 w-24 md:w-[124px] h-25 border-b-6 border-r-6 border-[#E9C05F] rounded-br-4xl rotate-180"></div>
                    <div className="absolute -bottom-8 right-0 lg:-right-10 w-24 md:w-[124px] h-25 border-b-6 border-r-6 border-[#E9C05F] rounded-br-4xl"></div>

          {/* Animated content */}
          <motion.div
            className="max-w-3xl mx-auto text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Why ADL Business Solutions
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
             {description}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );                          
}
