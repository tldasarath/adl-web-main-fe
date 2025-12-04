"use client";
import Container from "@/Components/Common/Container";
import { teamMembers } from "@/Datas/teams";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // <-- added

const TeamSection = () => {
  const sliderRef = useRef(null);

  // Clone slides for infinite effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && !slider.dataset.cloned) {
      const clone = slider.innerHTML;
      slider.innerHTML += clone; // Duplicate content
      slider.dataset.cloned = "true";
    }
  }, []);

  return (
    <motion.section
      className="h-auto lg:h-[700px] py-8 md:py-14 w-full overflow-hidden"
      // 🔥 Premium animation: soft zoom + blur + fade + slight lift
      initial={{ opacity: 0, y: 30, scale: 0.94, filter: "blur(6px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // smooth bezier easing (elegant, premium)
      }}
    >
      <div className="w-full ">
        <Container>
          <div>
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              Meet Our Team
            </h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">
              Our dedicated team of professionals is committed to delivering
              exceptional results and driving innovation in everything we do.
            </p>
          </div>
        </Container>

        {/* 🌟 Infinite Scrolling Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 animate-scroll hover:[animation-play-state:paused]"
          >
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] px-2"
              >
                <div className="glass rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  {/* 🖼️ Image */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* 🧾 Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div className="flex items-center justify-between ">
                      <h3 className="text-lg text-[#E9C05F] font-semibold truncate">
                        {member.name}
                      </h3>
                      <button className="w-8 md:w-10 h-8 md:h-10 flex ml-4 items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 hover:bg-[#E9C05F]/10 hover:translate-x-1">
                        <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
                      </button>
                    </div>
                    <p className="font-medium mb-5 text-sm">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌀 Keyframes for infinite scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </motion.section>
  );
};

export default TeamSection;
