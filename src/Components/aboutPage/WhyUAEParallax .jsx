"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useViewportScroll } from "framer-motion";
import Container from "../Common/Container";

const WhyUAEParallax = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [fixedBox, setFixedBox] = useState({ left: 0, width: 0 }); // <-- new: dynamic left/width

  const { scrollY } = useViewportScroll();

  // helper to compute left/width based on the centered wrapper element
  const computeFixedBox = () => {
    // Prefer measuring the actual left column element so fixed sizing exactly matches layout.
    if (leftSectionRef.current) {
      const leftRect = leftSectionRef.current.getBoundingClientRect();
      setFixedBox({ left: leftRect.left, width: leftRect.width });
      return;
    }
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const style = window.getComputedStyle(wrapperRef.current);
    const paddingLeft = parseFloat(style.paddingLeft || "0");
    const contentWidth = Math.max(0, rect.width - paddingLeft);
    const fallbackWidth = Math.max(0, Math.min(448, contentWidth * 0.35));
    const left = rect.left + paddingLeft;
    setFixedBox({ left, width: fallbackWidth });
  };

  useEffect(() => {
    computeFixedBox();
    const handleResize = () => computeFixedBox();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (
        !containerRef.current ||
        !leftSectionRef.current ||
        !rightSectionRef.current ||
        !wrapperRef.current
      )
        return;

      const containerTop =
        containerRef.current.getBoundingClientRect().top + latest;
      const containerBottom = containerTop + containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const currentScroll = latest;

      // When container enters viewport
      const containerInViewport = containerTop - currentScroll;
      const distanceFromTop = containerInViewport;

      // Start fixing when component is 100px from top of viewport
      if (
        distanceFromTop <= 100 &&
        distanceFromTop > -(containerRef.current.offsetHeight - viewportHeight)
      ) {
        // compute positions on lock (in case of layout shift)
        computeFixedBox();
        setIsFixed(true);
        // Calculate offset as we scroll
        const scrollStart = containerTop - viewportHeight;
        const distanceScrolled = Math.max(0, currentScroll - scrollStart);
        setOffsetY(distanceScrolled);
      } else if (distanceFromTop > 100) {
        setIsFixed(false);
        setOffsetY(0);
      } else {
        setIsFixed(false);
      }
    });
  }, [scrollY]);

  const contentCards = [
    {
      id: 1,
      title: "Global Business Hub",
      image: "/assets/images/about/global-business-hub.png",
      description:
        "Dubai sits at the crossroads of Asia, Europe, and Africa, connecting over 190 markets. With world-class infrastructure, advanced logistics, and international trade facilities, it's the leading destination for business setup, investment, and expansion ideal for entrepreneurs aiming to reach global customers and build lasting success.",
    },
    {
      id: 2,
      title: "Tax-Free Advantage",
      image: "/assets/images/about/tax-free-advantage.png",
      description:
        "Dubai offers 0% corporate and personal income tax, full profit repatriation, and simplified regulations. Its investor-friendly policies attract entrepreneurs worldwide. Businesses enjoy financial freedom, fast setup, and stable growth, making Dubai one of the most profitable and trusted destinations for long-term business investment.",
    },
    {
      id: 3,
      title: "Modern Infrastructure",
      image: "/assets/images/about/modern-infrastructure.png",
      description:
        "Dubai delivers advanced infrastructure, digital government services, and innovation-driven free zones. Fast licensing, smart systems, and strong global connectivity support startups and large enterprises. With constant development and high efficiency, Dubai provides the foundation for successful, future-ready business operations and growth.",
    },
    {
      id: 4,
      title: "Opportunity Driven Lifestyle",
      image: "/assets/images/about/opportunity-driven-lifestyle.png",
      description:
        "Dubai blends luxury living, safety, and business opportunity. Entrepreneurs gain access to a skilled global workforce, modern facilities, and tax-free benefits. With political stability, advanced healthcare, and supportive regulations, Dubai offers the best environment to live, work, and grow your business with confidence.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full 
  bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] 
                 bg-center bg-cover overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
          absolute w-[246px] h-[499px] 
          -left-24 bottom-40 
          bg-[#376CBC]
          opacity-30 blur-[100px] 
          rounded-[60%]
        "
        ></div>
      </div>

      {/* Glowing Blob Right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
          absolute w-[246px] h-[499px] 
          -right-2 bottom-40 
          bg-[#376CBC]
          opacity-30 blur-[100px] 
          rounded-[60%]
        "
        ></div>
      </div>
      {/* Decorative background glow */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-blue-900/25 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-blue-900/15 rounded-full blur-[150px]" />
      </div> */}
      <Container>
        <div
          ref={
            wrapperRef
          } /* <-- attach ref to centered wrapper so measurements align with layout */
          className="relative w-full max-w-7xl mx-auto  py-12 sm:py-16 md:py-20 lg:py-24"
        >
          {/* make left column narrower and right column wider on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 md:gap-12 lg:gap-8 lg:min-h-screen">
            {/* LEFT SECTION - FIXED */}
            <div className="relative lg:h-screen lg:flex lg:items-start lg:pt-20">
              <motion.div
                ref={leftSectionRef}
                // keep as flow element when not fixed; when fixed apply inline style computed from wrapper
                className={`w-full lg:w-full max-w-[360px] lg:pr-8 ${
                  isFixed ? "lg:z-40" : "relative"
                }`}
                style={
                  isFixed &&
                  typeof window !== "undefined" &&
                  window.innerWidth >= 1024
                    ? {
                        position: "fixed",
                        left: `${fixedBox.left}px`,
                        top: "7rem",
                        width: `${fixedBox.width}px`,
                        maxWidth: "28rem",
                      }
                    : {}
                }
              >
                {/* Title Section */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h2 className="text-2xl md:text-4xl font-semibold text-white leading-tight">
                    Why UAE
                  </h2>
                  {/* <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full" /> */}
                  <p className="text-base md:text-lg text-slate-300/90 leading-relaxed font-light pr-4">
                    Dubai is the region’s leading business hub, offering 100%
                    foreign ownership, tax-free benefits, and world-class
                    infrastructure. Its strategic location connects global
                    markets, making it ideal for investors and entrepreneurs
                    seeking growth through free zone, mainland, or offshore
                    company formation opportunities.
                  </p>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="hidden lg:block space-y-4 pt-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-12 h-12 bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-lg" />
                  <div className="w-8 h-8 bg-blue-400/10 backdrop-blur border border-blue-400/20 rounded-lg ml-6" />
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT SECTION - SCROLLABLE */}
            <motion.div
              ref={rightSectionRef}
              className="space-y-8 sm:space-y-12 md:space-y-16 lg:ml-0 lg:pt-20"
            >
              <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
                Dubai offers global access, tax-free
                <br className="hidden md:block" /> growth, modern
                infrastructure, and a<br className="hidden md:block" /> thriving
                lifestyle.
              </h2>
              {contentCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                >
                  {/* IMAGE - left column */}
                  <div className="col-span-1">
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* TITLE - center column (vertically centered) */}
                  <div className="col-span-1 flex items-center justify-center px-4 text-center">
                    <div>
                      {card.subtitle && (
                        <p className="hidden md:block text-sm text-slate-300/80 mb-2">
                          {card.subtitle}
                        </p>
                      )}
                      <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-white/95 leading-tight">
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* DESCRIPTION - right column */}
                  <div className="col-span-1 px-0 ">
                    <p className="text-base md:text-lg text-slate-300/85 leading-relaxed max-w-xl">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Bottom padding to ensure left section unsticks */}
              <div className="hidden md:block h-20" />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Decorative squares - Top Right */}

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10" />
      </div>
    </section>
  );
};

export default WhyUAEParallax;
