'use client';

import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Counter states
  const [experience, setExperience] = useState(0);
  const [transparency, setTransparency] = useState(0);
  const [clients, setClients] = useState(0);
  const [staff, setStaff] = useState(0);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const transparencyInterval = setInterval(() => {
        setTransparency((prev) => {
          if (prev < 100) return prev + 5;
          clearInterval(transparencyInterval);
          return prev;
        });
      }, 20);

      const experienceInterval = setInterval(() => {
        setExperience((prev) => {
          if (prev < 18) return prev + 1;
          clearInterval(experienceInterval);
          return prev;
        });
      }, 60);

      const clientsInterval = setInterval(() => {
        setClients((prev) => {
          if (prev < 100) return prev + 5;
          clearInterval(clientsInterval);
          return prev;
        });
      }, 20);

      const staffInterval = setInterval(() => {
        setStaff((prev) => {
          if (prev < 10) return prev + 1;
          clearInterval(staffInterval);
          return prev;
        });
      }, 80);

      return () => {
        clearInterval(experienceInterval);
        clearInterval(transparencyInterval);
        clearInterval(clientsInterval);
        clearInterval(staffInterval);
      };
    }
  }, [isVisible]);

  // Framer Motion Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
  };

  return (
    <section ref={sectionRef} className="relative py-8 md:py-14 h-auto lg:h-[700px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[380px] h-[380px] -left-24 bottom-40 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]"></div>
      </div>

      <Container>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              exit="exit"
                viewport={{ once: false, amount: 0.3 }}

              className="space-y-12"
            >
              {/* Main Content */}
              <motion.div variants={fadeIn} className="relative space-y-6 pt-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl main-text font-bold text-white">At a Glance</h2>

                <div className="md:w-4/5 w-full text-start">
                  <p className="text-md lg:text-xl font-light leading-relaxed">
                    At ADL Business Solutions, we simplify your business journey from company formation and PRO services to visas, banking, compliance, and long-term business support. Our advisory experts analyze your business goals, recommend the right company structure, and handle all legal and government procedures on your behalf.
                  </p>
                  <p className="text-md lg:text-xl mt-2 font-light leading-relaxed">
                    With years of experience in UAE business consulting, we empower entrepreneurs, investors, and corporates to build strong and successful businesses with confidence, clarity, and transparency.
                  </p>
                </div>

                <SecondaryButton text="Read more" url="/about-us" />

                <div className="absolute top-0 right-0 w-30 md:w-50 h-10 border-t-4 border-r-4 border-[#E9C05F] rounded-tr-full"></div>
                <div className="absolute right-0 top-9 h-15 md:h-20 w-1 bg-[#E9C05F] rounded-tr-full"></div>
              </motion.div>

              {/* Counters Section */}
              <div className="flex justify-end">
                <div className="w-full lg:w-3/4 xl:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">

                  {/* Animated Counter Box */}
                  {[
                    { value: `${transparency}%`, label: "Transparency" },
                    { value: `${experience}+`, label: "Years Experience" },
                    { value: `${clients}+`, label: "Trusted Clients" },
                    { value: `${staff}+`, label: "Professional Staff" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className="relative text-center p-4 rounded-lg"
                    >
                      <div className="absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#E9C05F]"></div>
                      <div className="text-3xl lg:text-4xl font-bold mb-2">{item.value}</div>
                      <div className="font-light text-sm lg:text-base text-white/70">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
