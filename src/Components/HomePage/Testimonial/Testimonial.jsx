"use client";

import Container from "@/Components/Common/Container";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const testimonials = [
  { message: "ADL made my business setup process unbelievably smooth. From choosing the right freezone to getting my license issued, everything was done faster than expected. Highly recommended!", name: "Ahammed" },
  { message: "I had no idea where to start with UAE company formation, but the ADL team guided me step-by-step. Their transparency and professionalism are unmatched.", name: "Mustahafa" },
  { message: "Exceptional service! ADL handled my investor visa, Emirates ID, and medical test without any hassle. They really took care of everything for me.", name: "Anil P" },
  { message: "Very reliable and trustworthy. ADL helped me set up my e-commerce company in the SPC Free Zone within days. The team is friendly, supportive, and always available.", name: "Sadique KM" },
  { message: "Thanks to ADL, my family visa process was completed smoothly. No delays, no complications — just perfect execution.", name: "Vishnu KP" },
  { message: "I appreciate the honesty and clarity ADL maintains. No hidden charges, no confusion. They explained everything clearly and delivered exactly what they promised.", name: "Ahmmed Malik" },
  { message: "Great experience with ADL! They helped me choose an affordable freezone and saved me a lot of money. Best consultancy I’ve worked with.", name: "Benniyamin" },
  { message: "Professional, fast, and knowledgeable. ADL handled my corporate bank account assistance and document clearing with ease.", name: "Elyas KP" },
  { message: "The customer service is excellent. They respond quickly and make sure every step is completed on time. I will definitely continue working with ADL.", name: "Mithran" },
  { message: "ADL made my mainland LLC setup very simple. They coordinated with all government departments on my behalf. Fantastic team.", name: "Diya Raman" },
  { message: "I was confused about which visa suits my situation. ADL guided me perfectly and completed my employment visa process within a few days.", name: "Arjun" },
  { message: "I trust ADL because they treat clients with care. They handled my complete business setup from start to finish — I literally didn’t have to worry about anything.", name: "Raj P" },
];

export default function TestimonialSlider() {
  const duplicated = [...testimonials, ...testimonials];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="py-8 md:py-14 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
          className="max-w-7xl mx-auto px-6 text-center mb-12"
        >
          <h2 className="text-2xl mb-5 md:text-3xl text-center main-text font-bold text-white">
            Testimonial
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Clients choose ADL for our transparency, speed, and hassle-free service. Read how we’ve helped businesses set up and grow smoothly in the UAE.
          </p>
        </motion.div>

        {/* 3 Row Vertical Slider */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]"
        >
          {/* Row 1 - bottom to top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden fade-mask"
          >
            <div className="animate-slide-up flex flex-col gap-6">
              {duplicated.map((item, i) => (
                <TestimonialCard key={`up-${i}`} {...item} />
              ))}
            </div>
          </motion.div>

          {/* Row 2 - top to bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative fade-mask overflow-hidden"
          >
            <div className="animate-slide-down flex flex-col gap-6">
              {duplicated.map((item, i) => (
                <TestimonialCard key={`down-${i}`} {...item} />
              ))}
            </div>
          </motion.div>

          {/* Row 3 - bottom to top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden md:block fade-mask overflow-hidden"
          >
            <div className="animate-slide-up flex flex-col gap-6">
              {duplicated.map((item, i) => (
                <TestimonialCard key={`up2-${i}`} {...item} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function TestimonialCard({ date, message, name }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#1c2334] to-[#0e1424] p-6 rounded-2xl shadow-md border border-white/10 w-full"
    >
      {date && <p className="text-sm text-gray-400 mb-3">{date}</p>}
      <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>
      <div className="flex items-center gap-3">
        <div className="text-left">
          <h4 className="text-sm font-semibold">{name}</h4>
        </div>
      </div>
    </motion.div>
  );
}