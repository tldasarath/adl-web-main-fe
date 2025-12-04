"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";

/**
 * Robust Scroll-Takeover FreezoneProcessCubes
 *
 * Behavior summary:
 * - Desktop (>=1024px): when the section becomes fully visible we mount a fixed full-screen "takeover".
 *   The page is visually frozen (body fixed) and a native scrollable inner area is shown (height = viewport * scrollPages).
 *   Scrolling that inner area drives the animation progress (0..TOTAL_STAGES).
 * - When animation reaches end (or returns to start) and user pauses, takeover unmounts and page scrolling is restored.
 * - Tablet & Mobile (<1024px): no takeover; show a non-interactive stacked fallback (animation disabled).
 *
 * Notes:
 * - This avoids fighting passive listeners; the inner scroll uses native browser scrolling (touch & wheel).
 * - On unmount we restore page scroll so user continues where expected.
 */

const cubes = [
  {
    id: "consult",
    title: "Consultation & Planning",
    desc: "Identify the right Freezone and license category",
  },
  {
    id: "gov",
    title: "Government Coordination",
    desc: "ADL liaises directly with Freezone authorities",
  },
  {
    id: "visa",
    title: "Visa & Bank\nAccount Support",
    desc: "Hassle-free processing for all company essentials.",
  },
  {
    id: "doc",
    title: "Documentation &\nApplication",
    desc: "We prepare and submit all legal paperwork.",
  },
  {
    id: "license",
    title: "License Issuance",
    desc: "Receive your license within days.",
  },
];

// Slots (target positions) indexes 0..3 for the 4 moves
const SLOTS = [
  { x: -220, y: -200, rotY: -12, scale: 0.92, opacity: 0.95 }, // top-left
  { x: 220, y: -200, rotY: 12, scale: 0.92, opacity: 0.95 }, // top-right
  { x: 220, y: 200, rotY: 12, scale: 0.92, opacity: 0.95 }, // bottom-right
  { x: -220, y: 200, rotY: -12, scale: 0.92, opacity: 0.95 }, // bottom-left
];
const CENTER = { x: 0, y: 0, rotY: 0, scale: 1, opacity: 1 };
const TOTAL_STAGES = 4; // 4 movements before final card remains

export default function FreezoneProcessCubes() {
  const sectionRef = useRef(null);

  // takeover refs
  const takeoverInnerRef = useRef(null);
  const originalScrollRef = useRef(0);
  const rafRef = useRef(null);
  const autoplayRef = useRef(null);
  const userInteractedDuringAutoplayRef = useRef(false);
  const AUTOPLAY_DURATION = 2000; // ms — change to 1500 or 2500 to taste

  // state
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [showTakeover, setShowTakeover] = useState(false); // mounted takeover
  const [fullyVisible, setFullyVisible] = useState(false); // section fully visible check
  const [renderProgress, setRenderProgress] = useState(0); // smoothed progress 0..TOTAL_STAGES
  const [percent, setPercent] = useState(0);
  const [parallaxProgress, setParallaxProgress] = useState(0); // parallax progress 0..1 based on scroll

  // helper clamp & ease
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // restore function
  const restorePageFromTakeover = (scrollPast = true) => {
    // cancel any running autoplay
    if (autoplayRef.current) {
      cancelAnimationFrame(autoplayRef.current);
      autoplayRef.current = null;
    }
    // unmount takeover first (stop inner scroll updates)
    setShowTakeover(false);
    cancelAnimationFrame(rafRef.current);

    // remove body fixed and restore scroll
    const orig = originalScrollRef.current || 0;
    // clear styles
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";

    // compute where to place page scroll after takeover:
    // If user scrolled forward almost to the end, scroll to just past this section so user continues forward.
    // If not, restore original position. We'll examine inner scroll to decide.
    try {
      const inner = takeoverInnerRef.current;
      if (inner && scrollPast) {
        const progressRatio =
          inner.scrollTop /
          Math.max(1, inner.scrollHeight - inner.clientHeight); // 0..1
        if (progressRatio > 0.9) {
          // scroll page past this section
          const sectionHeight =
            sectionRef.current?.offsetHeight || window.innerHeight;
          const target = orig + Math.max(150, Math.round(sectionHeight * 0.9));
          window.scrollTo({ top: target, behavior: "smooth" });
        } else {
          // restore to the original position
          window.scrollTo({ top: orig, behavior: "auto" });
        }
      } else {
        window.scrollTo({ top: orig, behavior: "auto" });
      }
    } catch (err) {
      window.scrollTo({ top: orig, behavior: "auto" });
    }

    // reset state values
    originalScrollRef.current = 0;
    setRenderProgress(0);
    setPercent(0);
    setParallaxProgress(0);
    // tiny delay to ensure things are stable
    setTimeout(() => {
      // ensure no lingering RAFs
      cancelAnimationFrame(rafRef.current);
    }, 120);
  };

  // detect desktop / small screen
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // detect fully visible (use bounding rect; change threshold if you want earlier activation)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const fully = r.top >= 0 && r.bottom <= vh;
      setFullyVisible(fully);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const obs = new IntersectionObserver(
      ([entry]) => {
        // extra check with bounding rect to avoid false positives
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const fully = r.top >= 0 && r.bottom <= vh;
        setFullyVisible(fully && entry.isIntersecting);
      },
      { threshold: [0.5, 0.75, 0.9, 1] }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // parallax scroll effect: calculate progress based on scroll when section is visible but takeover not active
  useEffect(() => {
    if (showTakeover || !isDesktop) return; // Only when takeover is not active and on desktop

    const el = sectionRef.current;
    if (!el) return;

    let rafId = null;
    let lastProgress = 0;

    const updateParallax = () => {
      if (showTakeover) {
        // Stop parallax when takeover is active
        if (rafId) cancelAnimationFrame(rafId);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const sectionHeight = rect.height;

      // Calculate parallax progress based on scroll position
      // Progress goes from 0 to 1 as user scrolls through the section
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // When section is in viewport, calculate parallax
      if (sectionTop < vh && sectionBottom > 0) {
        // Start parallax when section top reaches viewport (or earlier)
        // End when section is fully scrolled past
        const parallaxStart = vh * 0.8; // Start when section top is at 80% of viewport
        const parallaxEnd = -sectionHeight * 0.2; // End when section bottom is 20% past viewport top

        // Calculate scroll progress
        const scrollProgress =
          (parallaxStart - sectionTop) / (parallaxStart - parallaxEnd);
        const clampedProgress = clamp(scrollProgress, 0, 1);

        // Smooth the progress for better animation
        const smoothingFactor = 0.2;
        const smoothed =
          lastProgress + (clampedProgress - lastProgress) * smoothingFactor;
        lastProgress = smoothed;

        setParallaxProgress(smoothed);
      } else if (sectionBottom < 0 || sectionTop > vh) {
        // Reset when section is completely out of view
        setParallaxProgress(0);
        lastProgress = 0;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [showTakeover, isDesktop]);

  // when fully visible and desktop, open takeover
  useEffect(() => {
    if (fullyVisible && isDesktop && !showTakeover) {
      // store original scroll to restore later
      originalScrollRef.current = window.scrollY || window.pageYOffset || 0;

      // Reset parallax progress when takeover activates
      setParallaxProgress(0);

      // mount takeover (will render an overlay + internal scroll area)
      setShowTakeover(true);
      // small timeout to allow takeover DOM to render
      setTimeout(() => {
        // lock body visually to avoid underlying scroll
        // we use position: fixed + top to avoid scrollbar jump
        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${originalScrollRef.current}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        // focus inner scroll for keyboard support
        takeoverInnerRef.current?.focus?.();

        // autoplay: programmatically scroll the inner area from 0 -> max over AUTOPLAY_DURATION
        userInteractedDuringAutoplayRef.current = false;
        const inner = takeoverInnerRef.current;
        if (inner && AUTOPLAY_DURATION > 0) {
          const start = performance.now();
          const startTop = inner.scrollTop;
          const maxTop = Math.max(0, inner.scrollHeight - inner.clientHeight);

          // Cancel autoplay if user interacts
          const onUserInteract = () => {
            userInteractedDuringAutoplayRef.current = true;
          };

          inner.addEventListener("wheel", onUserInteract, { passive: true });
          inner.addEventListener("touchstart", onUserInteract, {
            passive: true,
          });
          inner.addEventListener("scroll", onUserInteract, { passive: true });
          window.addEventListener("keydown", onUserInteract, { passive: true });

          const step = (t) => {
            if (userInteractedDuringAutoplayRef.current) {
              // cleanup
              inner.removeEventListener("wheel", onUserInteract);
              inner.removeEventListener("touchstart", onUserInteract);
              inner.removeEventListener("scroll", onUserInteract);
              window.removeEventListener("keydown", onUserInteract);
              cancelAnimationFrame(autoplayRef.current);
              autoplayRef.current = null;
              return;
            }
            const elapsed = t - start;
            const progress = Math.min(1, elapsed / AUTOPLAY_DURATION);
            // ease (easeOut cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            inner.scrollTop =
              startTop + Math.round((maxTop - startTop) * eased);

            if (progress < 1) {
              autoplayRef.current = requestAnimationFrame(step);
            } else {
              // finished autoplay — cleanup listeners
              inner.removeEventListener("wheel", onUserInteract);
              inner.removeEventListener("touchstart", onUserInteract);
              inner.removeEventListener("scroll", onUserInteract);
              window.removeEventListener("keydown", onUserInteract);
              autoplayRef.current = null;
            }
          };

          autoplayRef.current = requestAnimationFrame(step);
        }
      }, 20);
    }
    // if left visibility while takeover open -> force close and restore
    if (!fullyVisible && showTakeover) {
      // close takeover and restore page
      restorePageFromTakeover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullyVisible, isDesktop]);

  // inner scroll handler: compute raw progress from inner scrollTop and update smoothed renderProgress via RAF
  useEffect(() => {
    if (!showTakeover) return;

    const inner = takeoverInnerRef.current;
    if (!inner) return;

    // Dimensions: we create inner.scrollHeight = viewport * (TOTAL_STAGES + 1) so that full scroll maps to progress 0..TOTAL_STAGES
    // compute progress on scroll
    const computeRaw = () => {
      const scrollTop = inner.scrollTop;
      const ratio =
        scrollTop / Math.max(1, inner.scrollHeight - inner.clientHeight); // 0..1
      const rawProgress = clamp(ratio * TOTAL_STAGES, 0, TOTAL_STAGES);
      return rawProgress;
    };

    // smoothing RAF loop (classic spring-ish smoothing)
    let running = true;
    const loop = () => {
      if (!running) return;
      const raw = computeRaw();
      // simple exponential smoothing (you can tune alpha)
      const cur = renderProgress;
      // we lerp renderProgress -> raw each frame
      const lerp = 0.18 + Math.min(0.6, Math.abs(raw - cur) * 0.12);
      const next = cur + (raw - cur) * lerp;
      const clamped = clamp(next, 0, TOTAL_STAGES);
      setRenderProgress(clamped);
      setPercent(Math.round((clamped / TOTAL_STAGES) * 100));
      rafRef.current = requestAnimationFrame(loop);
    };
    // start loop
    rafRef.current = requestAnimationFrame(loop);

    // on native scroll event, update last interaction (for idle)
    let lastInteraction = performance.now();
    const onScroll = () => {
      lastInteraction = performance.now();
    };
    inner.addEventListener("scroll", onScroll, { passive: true });

    // also support keyboard nav: PageUp/PageDown while inner is focused will scroll it naturally
    const onKeydown = (e) => {
      if (e.key === "Escape") {
        // allow escape to exit takeover early
        restorePageFromTakeover(true);
      }
    };
    window.addEventListener("keydown", onKeydown, { passive: true });

    // idle check: if progress reaches edges and user idle, close takeover
    const idleInterval = setInterval(() => {
      const cur = renderProgress;
      const raw = computeRaw();
      const idleNow = performance.now() - lastInteraction > 300;
      if (idleNow) {
        if (cur >= TOTAL_STAGES - 0.01 && raw >= TOTAL_STAGES - 0.01) {
          // finished, release
          running = false;
          restorePageFromTakeover(true);
        } else if (cur <= 0.01 && raw <= 0.01) {
          running = false;
          restorePageFromTakeover(false);
        }
      }
    }, 180);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      inner.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeydown);
      clearInterval(idleInterval);
    };
    // we purposely depend on showTakeover only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTakeover]);

  // compute transform for cards from renderProgress or parallaxProgress
  const computeTransform = (index) => {
    // Use parallax progress when takeover is not active, otherwise use renderProgress
    const activeProgress = showTakeover
      ? renderProgress
      : parallaxProgress * TOTAL_STAGES;

    // p is 0..1 for each card when it is active
    const p = clamp(activeProgress - index, 0, 1);
    if (index >= 0 && index <= 3) {
      const eased = easeOut(p);
      const slot = SLOTS[index];
      const x = CENTER.x + (slot.x - CENTER.x) * eased;
      const y = CENTER.y + (slot.y - CENTER.y) * eased;
      const rotY = CENTER.rotY + (slot.rotY - CENTER.rotY) * eased;
      const scale = CENTER.scale + (slot.scale - CENTER.scale) * eased;
      const opacity = CENTER.opacity + (slot.opacity - CENTER.opacity) * eased;
      const zIndex = 2000 - index * 10 - Math.round(eased * 50);
      return {
        transform: `translate3d(${x}px, ${y}px, 0px) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        zIndex,
      };
    } else {
      // last card remains centered and scales slightly
      const depthShift = clamp(activeProgress / TOTAL_STAGES, 0, 1);
      const scale = 1 + 0.02 * depthShift;
      const zIndex = 1200 + Math.round(depthShift * 100);
      return {
        transform: `translate3d(${CENTER.x}px, ${CENTER.y}px, 0px) rotateY(0deg) scale(${scale})`,
        opacity: 1,
        zIndex,
      };
    }
  };

  // inner scroll area height in pixels = viewportHeight * scrollPages
  // scrollPages controls how many viewport heights the user scrolls through during the takeover.
  const scrollPages = TOTAL_STAGES + 0.8; // a little extra room
  const innerStyle = {
    height:
      typeof window !== "undefined"
        ? `${Math.round(window.innerHeight * scrollPages)}px`
        : `${1000 * scrollPages}px`,
  };

  // small-screen fallback: show simple stacked layout without takeover
  const smallScreen = !isDesktop;

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-24 overflow-visible min-h-screen flex items-center"
    >
      {/* Takeover fixed overlay (mounted only on desktop when showTakeover = true) */}
      {showTakeover && isDesktop && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            background: "rgba(0,0,0,0.00)", // transparent but catches focus
          }}
        >
          {/* visual container centered (we keep the same layout as the original section) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1400,
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div style={{ color: "#e6eef7", maxWidth: 520 }}>
                <h2
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "white",
                  }}
                >
                  From Idea to
                  <br />
                  Incorporation
                  <br />
                  We Handle Everything
                </h2>
                <p style={{ color: "#9aa6b3" }}>
                  ADL Business Solutions provides end-to-end guidance throughout
                  your Freezone setup journey.
                </p>
              </div>

              {/* right: visual stack + inner scroll (inner scroll drives animation) */}
              <div
                style={{
                  position: "relative",
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  perspective: 1400,
                }}
              >
                {/* Native scrollable inner element - user scrolls this */}
                <div
                  ref={takeoverInnerRef}
                  tabIndex={0}
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    // transparent scroll area; actual visual stack is positioned absolute on top
                    background: "transparent",
                    outline: "none",
                  }}
                >
                  {/* spacer content that defines scrollHeight */}
                  <div style={innerStyle} />
                </div>

                {/* visual card stack (animated by renderProgress) */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: 720,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cubes.map((cube, idx) => {
                    const s = computeTransform(idx);
                    return (
                      <motion.div
                        key={cube.id}
                        style={{
                          position: "absolute",
                          transform: s.transform,
                          opacity: s.opacity,
                          zIndex: s.zIndex,
                          transition:
                            "transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms linear",
                          willChange: "transform, opacity",
                        }}
                      >
                        <div
                          style={{
                            width: 260,
                            height: 320,
                            borderRadius: 24,
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                            boxShadow: "0 30px 60px rgba(2,6,23,0.6)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "white",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                gap: 12,
                                marginBottom: 8,
                              }}
                            >
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 8,
                                  background:
                                    "linear-gradient(90deg,#06b6d4,#3b82f6)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                }}
                              >
                                {idx + 1}
                              </div>
                              <div />
                            </div>
                            <h3
                              style={{
                                margin: 0,
                                fontSize: 18,
                                fontWeight: 700,
                              }}
                            >
                              {cube.title}
                            </h3>
                            <p
                              style={{
                                marginTop: 10,
                                color: "#cbd5e1",
                                fontSize: 14,
                                whiteSpace: "pre-line",
                              }}
                            >
                              {cube.desc}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 999,
                                borderRight: "2px solid rgba(255,255,255,0.08)",
                                borderBottom:
                                  "2px solid rgba(255,255,255,0.08)",
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* HUD */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#9aa6b3",
                    fontSize: 12,
                  }}
                >
                  {Math.round(percent)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Normal in-page layout (fallback & presentation) */}
      <Container>
        <div className="max-w-7xl  w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                From Idea to
                <br />
                Incorporation
                <br />
                We Handle Everything
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
                ADL Business Solutions provides end-to-end guidance throughout
                your Freezone setup journey. We help you choose the right
                jurisdiction, prepare legal documents, acquire your license,
                open a bank account, and manage visa processing — ensuring a
                stress-free setup experience.
              </p>
            </div>

            <div className="lg:col-span-3">
              {/* -- IMPORTANT: for small screens we render a normal flow container (no fixed height, no absolute content)
                 so the cards sit below the text and do not overlap. For desktop we keep the previous relative
                 container with perspective and absolute animated cards (UNTOUCHED). -- */}
              {smallScreen ? (
                <div className="w-full mt-6">
                  {/* Mobile / Tablet: plain stacked/grid cards in normal flow (no overlap) */}
                  <div className="w-full max-w-3xl grid gap-4 sm:grid-cols-2">
                    {cubes.map((cube, idx) => (
                      <div
                        key={cube.id}
                        className="rounded-2xl glass-bg border border-white/10 p-4 sm:p-6 shadow-lg"
                        //   style={{
                        //     background:
                        //       "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                        //   }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                            style={{
                              background:
                                "linear-gradient(90deg,#06b6d4,#3b82f6)",
                            }}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-base sm:text-lg">
                              {cube.title}
                            </h4>
                            <p className="text-gray-300 text-sm sm:text-sm whitespace-pre-line mt-2">
                              {cube.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="relative w-full h-96 lg:h-[600px] flex items-center justify-center"
                  style={{ perspective: 1400 }}
                >
                  {cubes.map((cube, idx) => {
                    const s = computeTransform(idx);
                    const smallScreenStyle = {
                      transform: `translate3d(${idx * 6}px, ${
                        idx * 6
                      }px, 0) scale(${1 - idx * 0.02})`,
                      opacity: 1 - idx * 0.04,
                      zIndex: 1200 - idx * 10,
                    };
                    const style =
                      !isDesktop && !showTakeover
                        ? smallScreenStyle
                        : {
                            transform: s.transform,
                            opacity: s.opacity,
                            zIndex: s.zIndex,
                            transition:
                              "transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms linear",
                          };
                    return (
                      <motion.div
                        key={cube.id}
                        className="absolute flex items-center justify-center will-change-transform"
                        style={style}
                      >
                        <div
                          className="w-44 h-52 sm:w-56 sm:h-64 lg:w-64 lg:h-72 glass-bg rounded-2xl border border-white/20 shadow-2xl p-5 sm:p-8 overflow-hidden flex flex-col justify-between relative"
                          // style={{
                          //   background:
                          //     "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                          //   backdropFilter: "blur(8px)",
                          // }}
                        >
                          <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            style={{ mixBlendMode: "overlay" }}
                          />
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                {idx + 1}
                              </div>
                            </div>
                            <h4 className="text-white font-bold text-lg sm:text-xl leading-tight mb-2">
                              {cube.title}
                            </h4>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                              {cube.desc}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <div className="w-10 h-10 border-r-2 border-b-2 border-white/10 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs animate-pulse">
                  {fullyVisible ? (showTakeover && isDesktop ? `${percent}%` : 'Scroll to interact →') : 'Scroll'}
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
