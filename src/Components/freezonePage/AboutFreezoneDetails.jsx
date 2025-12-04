"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";
import MainButton from "../button/MainButton";

export default function AboutFreezoneDetails() {
  // Animation variants
  const containerV = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageV = {
    hidden: { opacity: 0, x: 26, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentV = {
    hidden: { opacity: 0, x: -18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.06 },
    },
  };

  return (
    <section
      aria-label="Freezone Hero Section"
      className="relative py-12 md:py-20 bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] bg-center overflow-hidden"
    >
      <Container>

      <div className="max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerV}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* LEFT: Content */}
          <motion.div
            variants={contentV}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug md:leading-tight max-w-2xl">
              Establish Your Business in a UAE Freezone{" "}100% Ownership, Zero Tax,
              Unlimited Growth
            </h2>

            <p className="text-slate-300 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
              ADL Business Solutions helps entrepreneurs, investors, and global
              corporations start and scale their businesses across the UAE’s
              leading Freezones — offering a streamlined process, full
              ownership, and world-class business infrastructure.
            </p>


            <div className="mt-6 lg:mt-8 w-full sm:w-36 md:w-56 xl:w-64 h-auto">
            <MainButton text="Explore Setup Packages" url={"#packages"}/>

              {/* <a
                href="#"
                className="inline-flex items-center gap-3 rounded-lg px-4 py-2 md:px-5 md:py-3 bg-[rgba(255,255,255,0.04)] border border-white/10 hover:bg-[rgba(255,255,255,0.06)] transition-shadow transition-colors duration-200 shadow-sm"
              >
                <span className="text-sm md:text-base text-white/90 leading-snug text-left">
                  Explore <br /> Setup Packages
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F4B93B]/10 border border-[#F4B93B]/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#F4B93B]"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="#F4B93B"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a> */}
            </div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            variants={imageV}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(2,6,23,0.6)]">
              <div className="relative">
                <Image
                  src="/assets/images/freezone/uae-freezone-business-setup-service.png"
                  alt="Freezone Business Setup"
                  width={840}
                  height={840}
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 420px"
                  className="w-full h-auto object-cover block"
                  priority
                />

                {/* Subtle inner highlight */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.08) 60%)",
                    mixBlendMode: "overlay",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      </Container>

    </section>
  );
}
