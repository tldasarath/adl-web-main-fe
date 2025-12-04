"use client";

import { motion } from "framer-motion";
import Container from "../Common/Container";

export default function CompanySetupProcess({ setupProcess }) {
  // 🧩 Destructure title and steps from your provided data
  const { title, steps = [] } = setupProcess || {};

  // 🪄 Transform "Title: Description" strings into objects
  const formattedSteps = steps.map((item, index) => {
    const [stepTitle, ...descParts] = item.split(":");
    return {
      id: index + 1,
      title: stepTitle?.trim() || "",
      description: descParts.join(":").trim() || "",
    };
  });

  // 🔹 Framer Motion variants
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.04, transition: { duration: 0.3 } },
  };

  return (
    <section id="setup-process" className="relative py-8 md:py-18 text-white overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
          className="max-w-5xl mx-auto text-center"
        >
          {/* 🏷 Dynamic Title from Data */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-14">
            {title || "Company Setup Process"}
          </h2>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-10 place-items-center">
            {formattedSteps.map((step, i) => (
              <motion.div
                key={step.id}
                variants={cardVariant}
                whileHover="hover"
                className="group relative w-full max-w-md h-[180px] md:h-[120px] rounded-xl p-[2px] backdrop-blur-sm"
                style={{
                  gridColumn: i === 2 ? "1 / -1" : "auto",
                  justifySelf: i === 2 ? "center" : "stretch",
                }}
              >
                {/* Animated Light Border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-[-2px] rounded-xl bg-[conic-gradient(from_0deg,transparent_0%,#38bdf8_15%,transparent_30%)] animate-rotate"></div>
                </div>

                {/* Card Body */}
                <div className="relative bg-[#1b2238]/95 rounded-xl h-full flex items-center justify-start gap-4 p-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#38bdf8] text-white font-semibold shadow-md">
                    {step.id}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* 🔵 Keyframes for the moving light effect */}
      <style jsx global>{`
        @keyframes rotateLight {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-rotate {
          animation: rotateLight 6s linear infinite;
          filter: blur(2px) brightness(1.4);
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
