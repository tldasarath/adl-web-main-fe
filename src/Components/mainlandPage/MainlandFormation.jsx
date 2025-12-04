"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";

const services = [
  {
    key: "activity",
    title: "Business activity &\nlegal structure consultation",
    icon: "/assets/images/mainland/business-activity.png",
  },
  {
    key: "trade",
    title: "Trade name reservation &\ninitial approval",
    icon: "/assets/images/mainland/trade-name-reservation.png",
  },
  {
    key: "moa",
    title: "MOA / LSA\npreparation & approvals",
    icon: "/assets/images/mainland/moa-lsa-prepration-&-approvals.png",
  },
  {
    key: "econ",
    title: "Economic Department\nlicense issuance",
    icon: "/assets/images/mainland/economic-department.png",
  },
  {
    key: "office",
    title: "Office space / Ejari /\nvirtual office assistance",
    icon: "/assets/images/mainland/officespace-ejari-virtualoffice.png",
  },
  {
    key: "visa",
    title: "Investor & employee\nvisa process",
    icon: "/assets/images/mainland/binvestor-&-employee-visa-process.png",
  },
  {
    key: "bank",
    title: "Corporate bank\naccount opening",
    icon: "/assets/images/mainland/corporate-bank-account-opening.png",
  },
  {
    key: "pro",
    title: "PRO & document\nclearing services",
    icon: "/assets/images/mainland/pro-&-document-clearing.png",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// 🟢 NEW — animation variants for glass sheen
const iconWrapperVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

const sheenVariants = {
  rest: { x: "-120%", opacity: 0 },
  hover: {
    x: "120%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function MainlandFormationCard() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-28 ">
      <Container>
        <div className="max-w-7xl ">
          <div className="relative mx-auto w-full max-w-[1200px]">
            <div className="relative inner-card rounded-2xl bg-transparent backdrop-blur-sm p-6 md:p-10 lg:p-14">
              {/* Bottom-left */}
              <svg
                className="pointer-events-none absolute left-5 -bottom-20 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40"
                viewBox="0 0 200 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M18 20 v36 a18 18 0 0 0 18 18 h80"
                  stroke="#F4B93B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Top-left */}
              <svg
                className="pointer-events-none absolute -left-14 -top-6 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 rotate-90"
                viewBox="0 0 200 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M18 20 v36 a18 18 0 0 0 18 18 h80"
                  stroke="#F4B93B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Bottom-right*/}
              <svg
                className="pointer-events-none absolute -right-18 -bottom-2 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 -rotate-90"
                viewBox="0 0 200 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M18 20 v36 a18 18 0 0 0 18 18 h80"
                  stroke="#F4B93B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* top-right */}
              <svg
                className="pointer-events-none absolute -right-2 -top-18 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 rotate-180"
                viewBox="0 0 200 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M18 20 v36 a18 18 0 0 0 18 18 h80"
                  stroke="#F4B93B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* ---------- Card CONTENT ---------- */}
              <motion.h2
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="text-white text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12"
              >
                Mainland Formation Solutions
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 items-start">
                {services.map((s, idx) => (
                  <motion.div
                    key={s.key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={itemVariant}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="flex flex-col items-center text-center px-3 md:px-4"
                  >
               
                    <motion.div
                      variants={iconWrapperVariants}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="relative glass-bg w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm overflow-hidden"
                      aria-hidden
                    >
                      {s.icon ? (
                        <Image
                          src={s.icon}
                          alt={s.key}
                          width={36}
                          height={36}
                          sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 48px"
                          className="object-contain z-10"
                        />
                      ) : (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="opacity-80 z-10"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M8 12h8"
                            stroke="rgba(255,255,255,0.9)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}

              
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-8 md:w-10 pointer-events-none z-20"
                        variants={sheenVariants}
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)",
                          transform: "skewX(-18deg)",
                        }}
                      />

                  
                      <div className="absolute inset-0 rounded-full ring-1 ring-white/6 pointer-events-none z-0" />
                    </motion.div>

                    <div className="mt-4 text-slate-200 text-[13px] md:text-sm leading-snug max-w-[220px]">
                      {s.title.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
