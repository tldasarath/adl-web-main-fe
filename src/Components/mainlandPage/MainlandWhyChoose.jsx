'use client'

import { motion } from 'framer-motion'
import Container from '../Common/Container'


const leftPoints = [
  'Access to UAE local market & government contracts',
  '100% foreign ownership options (as per UAE law)',
  'Unlimited visa quota (depending on office space)',
  'No currency restrictions',
  'Ability to trade anywhere inside UAE & globally',
  'Office/Shop/Commercial space permitted',
  'Hire employees locally or internationally'
]

const rightPoints = [
  'Dedicated business consultant',
  'Fast approvals & transparent pricing',
  'Government-authorized service provider',
  'Bank account & visa assistance',
  'End-to-end business setup & renewals'
]

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

export default function MainlandWhyChoose() {
  return (
    <section className="relative  py-8 lg:py-16 overflow-hidden ">


        <Container>

      <div className="max-w-7xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-start">
          {/* LEFT: Outlined card */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={cardVariant}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="relative rounded-2xl border border-[#376CBC] p-8 lg:p-10 bg-transparent backdrop-blur-sm hover:shadow-[0_30px_60px_rgba(15,23,40,0.45)] transition-shadow duration-300"
            aria-labelledby="why-mainland-heading"
          >
            <h3 id="why-mainland-heading" className="text-white text-xl lg:text-3xl font-semibold mb-3">
              Why Choose UAE Mainland <span className="hidden md:inline">Company Formation</span>
            </h3>

            <p className="text-white text-base font-normal md:text-lg mb-6 max-w-2xl">
              UAE Mainland is perfect for corporate services, consulting, trading, contracting, retail, restaurants,
              and more.
            </p>

            <ul className="space-y-4">
              {leftPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* golden arrow icon */}
                  <span className="glass-bg mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-transparent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 12h14" stroke="#F4B93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 6l6 6-6 6" stroke="#F4B93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <span className="text-slate-200 text-sm md:text-lg font-normal leading-relaxed">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            {/* thin rounded outline to match screenshot */}
            <span className="pointer-events-none absolute inset-0 rounded-xl border border-[#2b4d8a]/40 -z-10"></span>
          </motion.article>

          {/* RIGHT: Glassy card */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={cardVariant}
            transition={{ duration: 0.6, delay: 0.08 }}
            whileHover={{ scale: 1.02, y: -6 }}
            className="relative rounded-2xl p-8 lg:p-10 
           bg-[linear-gradient(90deg,rgba(73,85,111,1)_0%,rgba(13,19,37,1)_100%)] bg-center
            border-white/6 backdrop-blur-md shadow-lg transition-transform duration-350"
            aria-labelledby="why-adl-heading"
          >
            <h3 id="why-adl-heading" className="text-white text-xl lg:text-3xl font-semibold mb-3">
              Why ADL Business Solutions
            </h3>

            <p className="text-slate-300 text-sm md:text-lg mb-6">
              We don’t just set up your business — we support your growth.
            </p>

            <ul className="space-y-4">
              {rightPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* circular radio-like icon */}
                  <span className="mt-1 glass-bg flex items-center justify-center w-5 h-5 rounded-full border border-slate-500/50">
                    <span className="w-2 h-2 rounded-full bg-transparent block" />
                  </span>

                  <span className="text-slate-200 text-sm md:text-lg leading-relaxed">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
      </Container>

      {/* decorative diamonds bottom-right and top-left */}
      <div className="hidden md:block pointer-events-none">
        <svg className="absolute right-8 bottom-8 w-24 h-24 opacity-20" viewBox="0 0 100 100" fill="none" aria-hidden>
          <rect x="10" y="10" width="80" height="80" rx="6" transform="rotate(20 50 50)" fill="#ffffff" opacity="0.06" />
          <rect x="14" y="14" width="72" height="72" rx="6" transform="rotate(20 50 50)" fill="#ffffff" opacity="0.03" />
        </svg>

        <svg className="absolute left-8 top-12 w-24 h-24 opacity-12" viewBox="0 0 100 100" fill="none" aria-hidden>
          <rect x="10" y="10" width="80" height="80" rx="6" transform="rotate(-20 50 50)" fill="#ffffff" opacity="0.05" />
        </svg>
      </div>
    </section>
  )
}
