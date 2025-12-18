"use client";
import Container from "@/Components/Common/Container";
import { teamMembers } from "@/Datas/teams";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TeamSection = () => {
  const sliderRef = useRef(null);

  // Clone slides once for infinite scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && !slider.dataset.cloned) {
      slider.innerHTML += slider.innerHTML + slider.innerHTML; // Triplicate children
      slider.dataset.cloned = "true";
    }
  }, []);

  // -------- AUTO SCROLL LOGIC ----------
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let speed = 0.8; // Increase or decrease for scroll speed
    let animationFrame;

    const autoScroll = () => {
      if (!slider.classList.contains("dragging")) {
        slider.scrollLeft += speed;

        // Reset when reaching half (because content is duplicated)
        if (slider.scrollLeft >= slider.scrollWidth / 3) {
          slider.scrollLeft = 0;
        }



      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // -------- MANUAL DRAG LOGIC ----------
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e) => {
    const slider = sliderRef.current;
    isDragging.current = true;
    slider.classList.add("dragging");

    startX.current = e.pageX || e.touches?.[0].pageX;
    scrollLeft.current = slider.scrollLeft;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const slider = sliderRef.current;
    const x = e.pageX || e.touches?.[0].pageX;
    const walk = (x - startX.current) * 1.2;
    slider.scrollLeft = scrollLeft.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
    sliderRef.current.classList.remove("dragging");
  };

  return (
    <motion.section
      className="h-auto lg:h-[700px] py-8 md:py-14 w-full overflow-hidden"
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
        ease: [0.16, 1, 0.3, 1],
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

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 cursor-grab active:cursor-grabbing overflow-x-scroll scrollbar-hide"
            style={{ scrollBehavior: "auto" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={endDrag}
          >
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] px-2"
              >
                <div className="glass rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg text-[#E9C05F] font-semibold truncate">
                        {member.name}
                      </h3>
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

      <style jsx>{`
        .dragging {
          cursor: grabbing !important;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
};

export default TeamSection;
                                           