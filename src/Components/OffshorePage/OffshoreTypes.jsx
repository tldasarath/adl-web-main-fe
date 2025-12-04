"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";

const regions = [
  {
    key: "dubai",
    title: "Dubai Offshore",
    desc: "JAFZA Offshore is one of the most prestigious offshore jurisdictions in the UAE, known for credibility and global recognition.",
    points: [
      "100% foreign ownership",
      "No corporate or income tax",
      "Option to own property in Dubai (approved areas)",
      "International business & banking access",
      "No corporate or income tax",
    ],
    logo: "/assets/images/offshore/dubai-offshore.png",
  },
  {
    key: "rak",
    title: "Ras Al Khaimah Offshore",
    desc: "RAK Offshore is one of the most cost-effective and flexible offshore options in the UAE.",
    points: [
      "Attractive low-cost setup",
      "Global banking support",
      "No physical presence required",
      "Fast documentation & approvals",
      "Robust compliance and legal framework",
    ],
    logo: "/assets/images/offshore/ras-al-khaimah-offshore.png",
  },
  {
    key: "ajman",
    title: "Ajman Offshore",
    desc: "Ajman offers fast and affordable offshore incorporation with simple compliance requirements.",
    points: [
      "Economical company formation",
      "Quick processing time",
      "No tax on business income",
      "International operations permitted",
      "Minimum documentation",
    ],
    logo: "/assets/images/offshore/ajman-offshore.png",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function OffshoreTypes() {
  return (
    <section
      className="relative 
    py-8 md:py-16"
    >
      {/* Decorative element */}
      <div className="absolute right-0 z-10 top-[2%] lg:top-[10%] -translate-y-1/2 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/square3.png"
          alt="Decorative shapes"
          width={219}
          height={247}
          className="object-contain  w-30 md:w-36 lg:w-60"
        />
      </div>

      <Container>
        <div className=" w-full flex flex-col gap-20 items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white text-2xl max-w-md md:text-3xl font-medium "
          >
            Types of UAE Offshore Jurisdictions We Offer
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12">
            {regions.map((r, i) => (
              <motion.article
                key={r.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                variants={cardVariant}
                transition={{ duration: 0.6, delay: i * 0.16, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass-bg relative rounded-2xl p-6 pt-14 bg-white/3 border border-white/8 backdrop-blur-sm shadow-[0_8px_30px_rgba(2,6,23,0.6)]"
              >
                {/* floating logo badge */}
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <h3 className="text-left text-[#F4B93B] font-semibold text-lg md:text-xl my-2">
                    {r.title}
                  </h3>

                  <div className="inline-flex rounded-lg bg-white p-2 shadow-md items-center justify-center">
                    <Image
                      src={r.logo}
                      alt={`${r.title} logo`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="object-cover w-20 h-16 md:w-[100px] md:h-20"
                    />
                  </div>
                </div>


                <p className="text-start text-slate-300 text-sm md:text-[15px] leading-relaxed mb-4 ">
                  {r.desc}
                </p>

                <ul className="space-y-3 mt-2 ">
                  {r.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-3 h-3 rounded-full glass-bg flex-shrink-0"
                        aria-hidden
                      />
                      <span className="text-slate-200 text-sm md:text-[15px]">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* subtle rounded outline same as screenshot */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/6 -z-10" />
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
