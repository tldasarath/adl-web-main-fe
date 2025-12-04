"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AboutSection = () => {
  const containerRef = useRef(null);

  // Progress through this section (0 -> 1 while the section scrolls)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive mission/vision travel distance (px)
  const [offsets, setOffsets] = useState({
    missionStartPx: 0,
    visionStartPx: 0,
  });
  useEffect(() => {
    const calcOffsets = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      let factor;
      if (vw >= 1536) factor = 0.15;
      else if (vw >= 1280) factor = 0.23;
      else if (vw >= 1024) factor = 0.26;
      else if (vw >= 768) factor = 0.2;
      else factor = 0.14;
      const travel = Math.round(vh * factor);
      setOffsets({ missionStartPx: -travel, visionStartPx: travel });
    };
    calcOffsets();
    window.addEventListener("resize", calcOffsets);
    return () => window.removeEventListener("resize", calcOffsets);
  }, []);

  // Timeline breakpoints - tuned so cards finish, then center fades and video rises
  const phase1End = 0.4; // cards reach center and stop here
  const phase2End = 0.7; // center text fully gone and video at center

  // Mission/Vision motion: move to center by phase1End, then hold
  const missionY = useTransform(
    scrollYProgress,
    [0, phase1End, 1],
    [offsets.missionStartPx, 0, 0]
  );
  const visionY = useTransform(
    scrollYProgress,
    [0, phase1End, 1],
    [offsets.visionStartPx, 0, 0]
  );

  const missionYSpring = useSpring(missionY, { stiffness: 160, damping: 26 });
  const visionYSpring = useSpring(visionY, { stiffness: 160, damping: 26 });

  // Cards fade AFTER they reach center (starts slightly after phase1End)
  const cardsOpacity = useTransform(
    scrollYProgress,
    [phase1End + 0.03, phase2End - 0.05, 0.95, 1],
    [1, 0.7, 0.35, 0]
  );

  // Center content fades **after** cards finish moving (phase1End -> phase2End)
  const centerOpacity = useTransform(
    scrollYProgress,
    [phase1End, phase2End],
    [1, 0]
  );
  const centerScale = useTransform(
    scrollYProgress,
    [phase1End, phase2End],
    [1, 0.96]
  );

  // Video rises from below and becomes visible **during** phase1End -> phase2End
  // const videoY = useTransform(scrollYProgress, [phase1End, phase2End], ['30vh', '0vh']);
  // const videoOpacity = useTransform(scrollYProgress, [phase1End, phase2End], [0, 1]);
  // const videoDelay = 0.08;
  // const videoY = useTransform(
  //   scrollYProgress,
  //   [phase1End + videoDelay, phase2End, 1],
  //   ['50vh', '0vh', '0vh']   // starts lower and arrives at center
  // );
  // const videoOpacity = useTransform(
  //   scrollYProgress,
  //   [phase1End + videoDelay, phase2End * 0.95],
  //   [0, 1]
  // );

  // // Video scale: grow a bit during Phase2, then expand further to cover near the end
  // // const videoScale = useTransform(scrollYProgress, [phase1End, phase2End, 1], [0.8, 1.15, 2.1]);
  // const videoScale = useTransform(
  //   scrollYProgress,
  //   [phase1End + videoDelay, phase2End, 1],
  //   [0.6, 1.05, 3.0]
  // );

  // ---------- 1) set a small delay and start values ----------
  const videoDelay = 0.12; // delay after phase1End before video starts (tweak)
  const videoStartY = "50vh"; // start off-screen below
  const videoStartScale = 0.2; // very small at start
  const videoMidScale = 0.95; // at center
  const videoFinalScale = 3.0; // final cover scale

  // ---------- 2) map scroll progress -> opacity so it's hidden initially ----------
  /*
  videoOpacity stays 0 until phase1End + videoDelay,
  ramps to 1 by phase2End (you can extend or shorten the ramp).
*/
  const videoOpacity = useTransform(
    scrollYProgress,
    [phase1End + videoDelay, phase1End + videoDelay + 0.06, phase2End * 0.98],
    [0, 0.9, 1]
  );

  // optional: derive visibility (CSS) so element is `hidden` until opacity > small threshold.
  // This helps avoid a flash of the poster/first-frame on some browsers.
  const videoVisibility = useTransform(videoOpacity, (v) =>
    v > 0.02 ? "visible" : "hidden"
  );

  // ---------- 3) use existing videoYStr/videoScaleNum (or create them) ----------
  const videoYStr = useTransform(
    scrollYProgress,
    [phase1End + videoDelay, phase2End, 1],
    [videoStartY, "0vh", "0vh"]
  );

  const videoScaleNum = useTransform(
    scrollYProgress,
    [phase1End + videoDelay, phase2End, 1],
    [videoStartScale, videoMidScale, videoFinalScale]
  );

  // ---------- 4) smooth with springs (you already do this) ----------
  const videoYSpring = useSpring(videoYStr, { stiffness: 120, damping: 28 });
  const videoScaleSpring = useSpring(videoScaleNum, {
    stiffness: 120,
    damping: 28,
  });

  // ---------- 5) compose single transform string (as you had) ----------
  const transformString = useTransform(
    [videoYSpring, videoScaleSpring],
    ([yVal, sVal]) => `translate3d(0, ${yVal}, 0) scale3d(${sVal}, ${sVal}, 1)`
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] w-full 
      bg-[linear-gradient(90deg,rgba(36,43,61,1)_0%,rgba(10,14,29,1)_48%)] bg-center"
    >
      {/* Sticky viewport: locked while inside this section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-40 w-64 h-64 md:w-96 md:h-96 bg-blue-900/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 -right-40 w-64 h-64 md:w-96 md:h-96 bg-blue-900/10 rounded-full blur-[120px]" />
        </div>

        {/* VIDEO layer - placed above content while scaling */}
        {/* <motion.div
          style={{ y: videoY, scale: videoScale, opacity: videoOpacity, transformOrigin: 'center center' }}
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[50vw] md:w-[44vw] lg:w-[36vw] max-w-[900px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video
              className="h-full w-full object-cover"
              src="/assets/videos/about-adl-business-solutions.mp4" // <-- replace with your video file path
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div> */}
        <motion.div
          style={{
            transform: transformString,
            opacity: videoOpacity, // controlled by scroll => 0 at start
            visibility: videoVisibility, // 'hidden' while opacity very small
            transformOrigin: "center center",
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
          className="absolute inset-0 z-40 flex items-center justify-center"
        >
          <div className="w-[50vw] md:w-[44vw] lg:w-[36vw] max-w-[900px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video
              className="h-full w-full object-cover"
              src="/assets/videos/about-adl-business-solutions.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata" // optional to avoid full download before showing
              poster="" // empty poster helps prevent a first-frame flash
            />
          </div>
        </motion.div>

        {/* Content (cards + center) */}
        <div className="relative h-full w-full flex flex-col items-center justify-center gap-6 md:gap-8 px-6 sm:px-10">
          {/* Mission */}
          <motion.div
            style={{ y: missionYSpring, opacity: cardsOpacity }}
            className="relative z-30 w-full max-w-sm md:max-w-md self-end  backdrop-blur-sm p-4 md:p-5 rounded-md shadow"
          >
            <div className="absolute top-0 left-0 w-[52px] h-9 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute bottom-0 right-0 w-9 h-[52px] border-b-2 border-r-2 border-yellow-400" />
            <h3 className="text-base md:text-xl font-semibold text-white mb-1">
              Mission
            </h3>
            <p className="text-xs md:text-sm text-white leading-relaxed">
              Empowering entrepreneurs to establish and grow successful ventures
              in Dubai and the UAE through expert, reliable business setup
              solutions.
            </p>
          </motion.div>

          {/* Center */}
          <motion.div
            style={{ opacity: centerOpacity, scale: centerScale }}
            className="relative z-30 max-w-xl text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-blue-400 text-xl">✦</span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                About Us
              </h2>
            </div>
            <p className="text-xs md:text-sm text-white leading-relaxed">
              ADL Business Solutions FZE redefines business setup in Dubai with
              expert-led company formation, visa, PRO, and Golden Visa services.
              We go beyond paperwork, offering strategic guidance, compliance
              expertise, and personalized solutions that empower growth. Whether
              launching or expanding, ADL ensures your Dubai business journey is
              efficient, compliant, and successful.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            style={{ y: visionYSpring, opacity: cardsOpacity }}
            className="relative z-30 w-full max-w-sm md:max-w-md self-start backdrop-blur-md p-4 md:p-5 rounded-md shadow"
          >
            <div className="absolute top-0 left-0 w-[52px] h-9 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute bottom-0 right-0 w-9 h-[52px] border-b-2 border-r-2 border-yellow-400" />
            <h3 className="text-base md:text-xl font-semibold text-white mb-1">
              Vision
            </h3>
            <p className="text-xs md:text-sm text-white leading-relaxed">
              Our vision is to be Dubai and the UAE’s most trusted partner for
              business setup, driving sustainable growth through
              innovation and integrity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
