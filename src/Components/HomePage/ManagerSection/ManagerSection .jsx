"use client";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import { motion } from "framer-motion";

const splitToChars = (text = "") => Array.from(text);

const ManagerSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imagePop = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.06,
      },
    },
  };

  const char = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: "easeOut" },
    },
  };

  const descFade = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.12 },
    },
  };

  return (
    <section className=" relative h-auto md:h-[800px]  py-8 md:py-14 overflow-hidden">
      <motion.div className="absolute left-[-10px] top-[30%] -translate-y-1/2 pointer-events-none select-none "
      
      >
        <Image
          src="/assets/images/bg/squares2.png"
          alt="Decorative shapes"
          width={240}
          height={320}
          className="object-contain md:w-60 w-36"
        />
      </motion.div>

      <motion.div
  className="absolute overflow-hidden right-0 bottom-[-5px] md:bottom-[-10px] pointer-events-none select-none  -z-10"
  initial={{
    opacity: 0,
    x: typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 120, // mobile-friendly
    rotate: 2,
  }}
  whileInView={{
    opacity: 1,
    x: 0,
    rotate: 0,
  }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.3 }}
>
  <Image
    src="/assets/images/bg/square3.png"
    alt="Decorative shapes"
    width={240}
    height={320}
    className="object-contain md:w-60 w-20"
  />
</motion.div>


      <Container>
        <div className="w-full  rounded-lg  overflow-hidden ">
          <motion.div
            className="flex justify-center"
            variants={imagePop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative h-60 w-60  md:h-96 md:w-96">
              <Image
                src="/assets/images/team/ADIL MUHAMMED.jpg"
                alt="ADIL MUHAMMED"
                fill
                className="object-cover rounded-4xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>

          <div className="p-4 md:p-6 text-center">
            <motion.h3
              className=" text-xl lg:text-2xl font-semibold text-[#E9C05F] mb-2 inline-block"
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              style={{
                overflow: "hidden",
                display: "inline-block",
                willChange: "transform, opacity",
              }}
              aria-label="ADIL MUHAMMED"
            >
              {splitToChars("ADIL MUHAMMED").map((ch, i) => (
                <motion.span
                  key={`name-char-${i}-${ch}`}
                  variants={char}
                  style={{
                    display: ch === " " ? "inline-block" : "inline-block",
                    minWidth: ch === " " ? "0.4rem" : undefined,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.h3>

            <motion.p
              className="text-lg lg:text-xl  font-medium mb-4"
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
              aria-label="Managing Director"
            >
              {splitToChars("Managing Director").map((ch, i) => (
                <motion.span
                  key={`pos-char-${i}-${ch}`}
                  variants={char}
                  style={{
                    display: ch === " " ? "inline-block" : "inline-block",
                    minWidth: ch === " " ? "0.35rem" : undefined,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              className="w-16 h-1 bg-blue-500 mx-auto mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            />

            <motion.div
              className=" "
              variants={descFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-sm md:text-base lg:text-xl font-light leading-relaxed">
                With years of proven expertise in UAE business setup and
                government documentation services, I have supported hundreds of
                entrepreneurs and investors in establishing their businesses
                successfully in the UAE. At ADL Business Solutions, we don’t
                just process documents we build foundations for your success. Me
                and my dedicated team ensure end-to-end support, from choosing
                the right license to securing visas, banking, and operational
                approvals. Your vision is our priority, and we are committed to
                turning your business dream into reality with trust,
                transparency, and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ManagerSection;
