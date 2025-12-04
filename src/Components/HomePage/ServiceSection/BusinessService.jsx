"use client"
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { businessServices } from '@/Datas/services';
import React from 'react';
import { motion } from "framer-motion";

const parentVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.18,
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const BusinessServices = () => {
  return (
    <section className="relative h-auto xl:h-[900px] py-8 md:py-14 w-full">
      <Container>

        {/* Parent container with fade + stagger */}
        <motion.div
          variants={parentVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-12">

            {/* Left text block */}
            <motion.div variants={fadeLeft} className="flex flex-col justify-center">
              <div className='w-full md:w-2/3'>
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
                  Instant Solutions for All Business Needs
                </h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
                  ADL provides end-to-end business setup services in the UAE, offering tailored
                  solutions to help you establish and grow your company seamlessly. From legal
                  documentation to government approvals — we handle it all so you can focus on
                  your business success.
                </p>
              </div>
            </motion.div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <h3 className="text-lg md:text-xl font-light mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base font-light leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Button animation */}
          <motion.div
            variants={fadeUp}
            className="justify-center w-full flex gap-2 mt-8"
          >
            <SecondaryButton text="More Services" url={"/services"} />
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
};

export default BusinessServices;
