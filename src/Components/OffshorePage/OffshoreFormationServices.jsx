"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";
import Container from "../Common/Container";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

export default function OffshoreFormationServices() {
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const leftServices = [
    "Offshore company registration & documentation",
    "Memorandum & Articles drafting",
    "Registered agent services",
    "UAE business banking assistance",
  ];

  const rightServices = [
    "Compliance & regulatory advisory",
    "Beneficial ownership guidance",
    "Tax residency & compliance advisory",
    "Business address & registered agent support",
  ];

  useEffect(() => {
    if (inView) {
      leftControls.start("visible");
      rightControls.start("visible");
    }
  }, [inView, leftControls, rightControls]);

  return (
    <section ref={ref} className="text-white py-8 md:py-16 overflow-hidden">
      <Container>
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Heading */}
          <motion.h2
            className="text-3xl max-w-lg md:text-[2.2rem] font-bold mb-12 text-start"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our Offshore Company Formation Services Include
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1.6fr] items-center gap-0">
            {/* Left Column */}
            <motion.ul
              className="space-y-4 text-left md:text-right md:pr-6"
              variants={slideLeft}
              initial="hidden"
              animate={leftControls}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {leftServices.map((item, index) => (
                <motion.li
                  key={index}
                  className="border text-start  border-[#376CBC]/80 rounded-lg px-5 py-3 hover:border-blue-500/60 hover:bg-blue-500/10 transition inline-block w-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Center Image */}
            <motion.div
              className="flex justify-center my-8 md:my-0"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative w-56 h-56 md:w-80 md:h-80 rounded-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/assets/images/offshore/offshore-company-formation-services.png"
                  alt="Offshore Company Formation Services"
                  fill
                  className="object-contain p-6"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.ul
              className="space-y-4 text-right md:text-left md:pl-6"
              variants={slideRight}
              initial="hidden"
              animate={rightControls}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {rightServices.map((item, index) => (
                <motion.li
                  key={index}
                  className="border border-[#376CBC]/80 rounded-lg px-5 py-3 hover:border-blue-500/60 hover:bg-blue-500/10 transition inline-block w-full text-start"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
