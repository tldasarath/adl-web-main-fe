"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Common/Container";

const regions = [
  {
    key: "dubai",
    title: "Dubai Mainland",
    desc: "Dubai provides strong business infrastructure, global connectivity, and a thriving commercial environment.",
    points: [
      "Access to Dubai’s booming business ecosystem",
      "100% ownership for most activities",
      "Wide category of trading, consulting, industrial licenses",
      "Prestigious business address options",
    ],
    logo: "/assets/images/mainland/dubai-mainland.png",
  },
  {
    key: "abudhabi",
    title: "Abu Dhabi Mainland",
    desc: "Abu Dhabi mainland licensing is competitive, flexible, and suitable for long-term establishments.",
    points: [
      "Low license cost compared to Dubai",
      "Fast approval structure",
      "Strong government & B2B opportunities",
      "Investor-friendly environment",
    ],
    logo: "/assets/images/mainland/abudhabi-mainland.png",
  },
  {
    key: "sharjah",
    title: "Sharjah Mainland",
    desc: "Sharjah offers cost-effective mainland company formation with strong industrial and commercial support.",
    points: [
      "Affordable business licensing & setup",
      "Strong logistics network",
      "Ideal for trade, manufacturing & SMEs",
      "Quick documentation process",
    ],
    logo: "/assets/images/mainland/sharjah-mainland.png",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function MainlandSetup() {
  return (
    <section
      className="relative 
    overflow-visible py-20 lg:py-36"
    >
      {/* Decorative element */}
      <div className="absolute left-[-10%] md:left-[-10px] -z-10 top-[2%] lg:top-[10%] -translate-y-1/2 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/left_glass_element.png"
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
            className="text-center text-white text-2xl md:text-3xl font-medium "
          >
            Mainland Setup by Region
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
                <div className="absolute -top-11 left-1/2 -translate-x-1/2">
                  <div className="inline-flex rounded-lg bg-white p-2 shadow-md  items-center justify-center">
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

                <h3 className="text-center text-[#F4B93B] font-semibold text-lg md:text-xl my-2">
                  {r.title}
                </h3>

                <p className="text-center text-slate-300 text-sm md:text-[15px] leading-relaxed mb-4 ">
                  {r.desc}
                </p>

                <ul className="space-y-3 mt-2 ">
                  {r.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="glass-bg mt-1 w-3 h-3 rounded-full border border-slate-400/70 flex-shrink-0"
                        aria-hidden
                      />
                      <span className="text-slate-200 text-sm md:text-[15px] font-normal">
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
