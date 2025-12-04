"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";

export default function FacilitiesSection({ facilities = {} }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // ✅ Build an array only from fields that are arrays (skip title/description or any non-array)
  const facilityArray = Object.entries(facilities)
    .filter(([key, value]) => Array.isArray(value))
    .map(([key, items], index) => ({
      id: index + 1,
      // make the key readable: "officeSolutions" -> "Office Solutions"
      title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      items,
    }));

  // If there are zero array-based facilities, you can still show nothing or some fallback
  return (
    <section id="facilities" className="relative py-10 md:py-20 text-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariant}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              {facilities.title}
            </h2>
            {facilities.description && (
              <p className="text-slate-400 max-w-2xl">{facilities.description}</p>
            )}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-12">
            {facilityArray.map((facility, i) => (
              <motion.div
                key={facility.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeUp}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full md:w-[85%] lg:w-[75%] rounded-2xl overflow-hidden glass-bg shadow-lg border border-[#2b3a5b]">
                  {/* Image */}
                  <div className={`relative h-56 md:h-72 order-1 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    {/* Example static images — adjust mapping as needed */}
                    {i === 0 ? (
                      <Image
                        src={"/assets/images/freezone-details/office-options/office-solutions.png"}
                        alt={facility.title}
                        fill
                        className="object-cover object-center"
                      />
                    ) : i === 1 ? (
                      <Image
                        src={"/assets/images/freezone-details/office-options/industrial-units.png"}
                        alt={facility.title}
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <Image
                        src={"/assets/images/freezone-details/office-options/other-faculities.png"}
                        alt={facility.title}
                        fill
                        className="object-cover object-center"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white text-center drop-shadow-lg">
                        {facility.title}
                      </h3>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`flex flex-col justify-center p-6 md:p-10 order-2 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <ul className="space-y-3 text-slate-300">
                      {facility.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                          <span className="w-2.5 h-2.5 mt-2 glass-bg rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Optional: show message if nothing to render */}
            {facilityArray.length === 0 && (
              <p className="text-slate-400">No facility items available.</p>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
