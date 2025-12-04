"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

const VisaTypesSection = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandLines, setExpandLines] = useState(false);

  const fadeControls = useAnimation();
  const sectionRef = useRef(null);

  const visaTypes = [
    {
      id: 1,
      name: "Golden Visa",
      image: "/assets/images/visas/golden-visa.jpg",
      description:
        "Long-term residency for investors, entrepreneurs, highly skilled professionals & outstanding talent.",
      link: "golden-visa",
    },
    {
      id: 2,
      name: "Green Visa",
      image: "/assets/images/visas/green-visa.jpg",
      description:
        "5-year residency for freelancers, skilled professionals, and investors — no sponsor required.",
      link: "green-visa",
    },
    {
      id: 3,
      name: "Employment Visa",
      image: "/assets/images/visas/employment-visa.jpg",
      description:
        "Work legally in the UAE with fast, company-sponsored employment visa processing.",
      link: "employment-visa",
    },
    {
      id: 4,
      name: "Family Visa",
      image: "/assets/images/visas/family-visa.jpg",
      description:
        "Bring your family to the UAE with complete support for spouse, child & parent residency visas.",
      link: "family-visa",
    },
    {
      id: 5,
      name: "Investor Visa",
      image: "/assets/images/visas/investor-visa.jpg",
      description:
        "Secure your UAE residency by investing in a business or establishing a new company.",
      link: "investor-visa",
    },
  ];

  // IntersectionObserver — fade in, fade out, expand lines, flip card
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Fade In
          fadeControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          });

          // Expand lines
          setExpandLines(true);

          // Flip first card
          setFlippedCard(visaTypes[0].id);

          setTimeout(() => {
            setFlippedCard(null);
          }, 2000);

          // Shrink lines after 1s
          setTimeout(() => {
            setExpandLines(false);
          }, 1000);

        } else {
          // Fade Out
          fadeControls.start({
            opacity: 0,
            y: 40,
            transition: { duration: 0.6, ease: "easeIn" },
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={fadeControls}
      className="py-8 md:py-14"
    >
      <motion.div>
        {/* Header Section */}
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              Types of Visa
            </h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">
              Explore our comprehensive visa services tailored to meet your
              specific travel needs. Whether you're traveling for leisure,
              business, education, or to reunite with family, we've got you
              covered with expert guidance.
            </p>
          </div>
        </Container>

        {/* Visa Types Grid */}
        <div className="px-10 2xl:px-25">
          <div className="relative glass-bg flex flex-col items-center justify-center py-16 rounded-3xl overflow-hidden">

            <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-10 mb-12 mt-8">

              {/* Left Decorative Line */}
              <div
                className={`
                  absolute -top-10 left-1 md:left-2 
                  border-b-6 border-r-6 border-[#E9C05F] rounded-br-4xl rotate-180
                  transition-all duration-700 ease-out
                  ${
                    expandLines
                      ? "w-40 h-32 md:w-1 md:h-1"
                      : "w-24 h-16 md:w-[124px] md:h-[120px]"
                  }
                `}
              ></div>

              {/* Right Decorative Line */}
              <div
                className={`
                  absolute -bottom-10 right-1 md:right-2 
                  border-b-6 border-r-6 border-[#E9C05F] rounded-br-4xl
                  transition-all duration-700 ease-out
                  ${
                    expandLines
                      ? "w-40 h-32 md:w-0 md:h-0"
                      : "w-24 h-16 md:w-[124px] md:h-[120px]"
                  }
                `}
              ></div>

              {visaTypes.map((visa) => (
                <Link
                  key={visa.id}
                  href={`/visa/${visa.link}`}
                  className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer perspective-[1200px]"
                >
                  <div
                    className={`relative w-full h-[280px] transition-transform duration-700 transform-style-preserve-3d 
                      ${
                        flippedCard === visa.id
                          ? "rotate-y-180"
                          : "group-hover:rotate-y-180"
                      }
                    `}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={visa.image}
                          alt={visa.name}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 
                          w-[85%] md:w-[85%] glass-bg rounded-2xl md:rounded-3xl 
                          px-4 py-3 md:px-6 md:py-4 flex items-center justify-between"
                        >
                          <span className="text-white font-semibold text-base xl:text-sm  ">
                            {visa.name}
                          </span>

                          <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 group-hover:bg-[#E9C05F] group-hover:translate-x-1">
                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#E9C05F] transition-colors duration-300 group-hover:text-white" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden glass-bg rounded-xl overflow-hidden">
                      <div className="flex flex-col justify-between h-full px-4 py-6 text-center">

                        <p className="text-base">{visa.description}</p>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 
                          w-[90%]  glass-bg rounded-2xl md:rounded-3xl 
                          px-4 py-3 md:px-6 md:py-4 flex items-center justify-between"
                        >
                          <span className="text-white font-semibold text-base xl:text-sm">
                            {visa.name}
                          </span>

                          <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 group-hover:bg-[#E9C05F] group-hover:translate-x-1">
                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#E9C05F] transition-colors duration-300 group-hover:text-white" />
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default VisaTypesSection;
