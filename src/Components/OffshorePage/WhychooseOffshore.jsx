'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '../Common/Container'

// Place the provided image in your Next.js project's /public folder as: /public/mainland.png
// Then import and use this component in any page (e.g. pages/index.js or app/page.js)

export default function WhychooseOffshore() {
    const benefits = [
    "International trading & consulting",
    "Asset protection",
    "Global structuring & holding company",
    "IP & royalty holding",
    "Real-estate ownership in UAE (specific zones)",
    "No physical office requirement",
    "Zero corporate & income tax (as per UAE regulations)",
  ];

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.97, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <section className=" py-8 md:py-14">
        <Container>

      <div className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* LEFT: Text */}
          <motion.div
      className="text-white p-8 rounded-2xl "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      variants={textVariant}
    >
      <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4">
        Why Choose Offshore Company Setup in UAE
      </h2>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed font-normal mb-4 max-w-prose">
        Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis dictum est a, mattis
        tellus. Risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
      </p>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 max-w-prose">
        At ADL Business Solutions, we simplify the process — from selecting the right business
        activity to securing your trade license, visas, and corporate bank account.
      </p>

      <ul className="">
        {benefits.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg  `}
          >
            <div
              className={`w-3 h-3 rounded-full glass-bg`}
            ></div>
            <span
              className={`text-base md:text-lg font-bol `}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
          {/* RIGHT: Image Card */}
          <motion.div
            className="w-full flex justify-center lg:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            variants={imageVariant}
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Rounded image with soft inner border and drop shadow like the example */}
              <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/20">
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 bg-black/5">
                  {/* Use next/image for optimized loading. Put image at /public/mainland.png */}
                  <Image
                    src="/assets/images/offshore/offshore-company-formation.png"
                    alt="Offshore"
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
              </div>

    
            </div>
          </motion.div>

        </div>

      </div>
      </Container>

    </section>
  )
}
