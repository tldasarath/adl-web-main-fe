'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { services } from '@/Datas/services';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const totalCards = services.length;

  /* ---------------------- SCREEN SIZE LISTENER ---------------------- */
  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSmallOrMedium(w < 1024); // sm + md disable animation
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  /* ---------------------- INTERSECTION OBSERVER ---------------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const options = {
      threshold: isSmallOrMedium ? 0.95 : 0.75, // desktop must be 75% visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= options.threshold) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    }, options);

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isSmallOrMedium]);

  /* ---------------------- DESKTOP SCROLL-LOCK LOGIC ---------------------- */
  useEffect(() => {
    if (isSmallOrMedium) return; // ❌ Disable on mobile/tablets
    if (!isLocked) return;

    let throttle = false;

    const handleScrollChange = (direction) => {
      setActiveIndex((prev) => {
        let next = prev + direction;
        const lastIndex = totalCards - 1;

        if (next < 0) {
          unlockAndScroll('up');
          return 0;
        }
        if (next > lastIndex) {
          unlockAndScroll('down');
          return lastIndex;
        }

        return next;
      });
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (throttle) return;

      throttle = true;
      const direction = e.deltaY > 0 ? 1 : -1;

      requestAnimationFrame(() => handleScrollChange(direction));
      setTimeout(() => (throttle = false), 400);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isLocked, isSmallOrMedium, totalCards]);

  /* ---------------------- UNLOCK + SCROLL TO NEXT SECTION ---------------------- */
  const unlockAndScroll = (direction) => {
    setIsLocked(false);

    const nextSection =
      direction === 'down'
        ? sectionRef.current?.nextElementSibling
        : sectionRef.current?.previousElementSibling;

    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  /* ---------------------- FRAMER MOTION CARD VARIANTS ---------------------- */
  const cardVariants = {
    show: (c) => ({
      x: 0,
      rotate: c.rotation,
      opacity: c.opacity,
      scale: c.scale,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    hide: (c) => ({
      x: c.x,
      rotate: 0,
      opacity: c.opacityHidden,
      scale: c.scaleHidden,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  /* ---------------------- DESKTOP CARD COMPONENT ---------------------- */
  const Card = ({ service, index, custom }) => (
    <motion.div
      custom={custom}
      variants={cardVariants}
      initial="hide"
      animate={custom.isVisible ? 'show' : 'hide'}
      className="absolute sm:relative rounded-2xl shadow-xl p-6 glass-bg h-[232px] w-[260px] sm:w-[232px] flex flex-col justify-center transition-all"
      style={{ zIndex: 2000 - index }}
    >
      <h3 className="text-lg xl:text-xl font-bold mb-2 text-center">
        {service.title}
      </h3>

      <p className="text-center text-sm leading-relaxed mb-10">
        {service.description}
      </p>

      <button className="absolute bottom-4 right-4 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center border border-[#E9C05F] rounded-full hover:translate-x-1 transition-all duration-300">
        <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
      </button>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-auto lg:h-screen flex flex-col justify-center items-center overflow-hidden py-10 md:py-16"
    >
      {/* Background Decoration */}
      <div className="hidden md:block absolute left-[-10%] md:left-[-10px] -z-10 top-[25%] -translate-y-1/2 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/square4.png"
          alt="Decorative shapes"
          width={240}
          height={320}
        />
      </div>

      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl main-text font-bold text-white">
            Our Services
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Comprehensive business solutions to establish and grow your presence in the UAE
          </p>
        </div>
      </Container>

      {/* ---------------------- MOBILE/TABLET VIEW (NO ANIMATION) ---------------------- */}
      {isSmallOrMedium ? (
        <div className="flex flex-col gap-6 w-full max-w-md px-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl glass-bg p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm mb-6">{service.description}</p>

              <button className="w-10 h-10 flex items-center justify-center border border-[#E9C05F] rounded-full">
                <ArrowUpRight className="text-[#E9C05F]" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* ---------------------- DESKTOP STACKED ANIMATED CARDS ---------------------- */
        <div className="relative w-full h-[420px] flex justify-center items-center">
          <div className="flex sm:flex-row sm:-space-x-2 lg:pl-16 xl:pl-[6rem] w-full justify-center items-center">
            {services.map((service, index) => {
              const isVisible = index <= activeIndex;
              const isNext1 = index === activeIndex + 1;
              const isNext2 = index === activeIndex + 2;

              const baseOffset = Math.max(160, windowWidth * 0.14);
              const next1 = Math.max(230, windowWidth * 0.18);
              const next2 = Math.max(300, windowWidth * 0.22);

              const x = isVisible
                ? 0
                : isNext1
                ? next1
                : isNext2
                ? next2
                : baseOffset * 3;

              const custom = {
                isVisible,
                x,
                rotation: isVisible ? -5 + (index - activeIndex) * 2 : 0,
                opacity: isVisible ? 1 : isNext1 ? 0.7 : 0.45,
                opacityHidden: isVisible ? 1 : 0.1,
                scale: isVisible ? 1 : isNext1 ? 0.96 : 0.9,
                scaleHidden: isVisible ? 1 : 0.9,
              };

              return (
                <Card
                  key={service.id}
                  service={service}
                  index={index}
                  custom={custom}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* CTA BUTTON */}
      <div className="w-full flex justify-center mt-10">
        <SecondaryButton text="More Services" url="/services" />
      </div>
    </section>
  );
};

export default ServicesSection;
