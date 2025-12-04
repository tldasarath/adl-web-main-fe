// components/FreezonesCarousel.jsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";
import Link from "next/link";
import MainButton from "../button/MainButton";
import { RAW_DATA } from "@/Datas/freezoneData";



const TABS = Object.keys(RAW_DATA);
const SPEED_PX_PER_SEC = 80;

export default function FreezonesCategories() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const carouselRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  // extra refs for click detection
  const initialTargetRef = useRef(null);
  const movedRef = useRef(false);

  const baseItems = useMemo(() => RAW_DATA[activeTab].items || [], [activeTab]);
  const items = useMemo(
    () => (baseItems.length ? [...baseItems, ...baseItems, ...baseItems] : []),
    [baseItems]
  );

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const total = el.scrollWidth;
      const block = total / 3;
      if (Number.isFinite(block) && block > 0) el.scrollLeft = block;
    });
  }, [activeTab, items.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || items.length === 0) return;

    lastTimeRef.current = null;

    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current && !draggingRef.current) {
        const px = (SPEED_PX_PER_SEC * dt) / 1000;
        el.scrollLeft += px;
      }

      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) {
        if (el.scrollLeft >= block * 2) el.scrollLeft -= block;
        if (el.scrollLeft <= block * 0.5) el.scrollLeft += block;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const onResize = () => {
      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) el.scrollLeft = block;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [items]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleEnter = () => (pausedRef.current = true);
    const handleLeave = () => (pausedRef.current = false);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  /* -------------------------
     Improved pointer/touch handlers:
     - don't start drag when user starts on interactive element (a, button, img, svg)
     - record initial target and whether pointer moved; if move < THRESHOLD, dispatch click to allow navigation
     - maintain wrap-around logic and allow two-way dragging
     ------------------------- */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const CLICK_MOVE_THRESHOLD = 6; // px — below this treat as a click / tap

    const isInteractive = (node) => {
      try {
        return !!node?.closest?.("a, button, input, textarea, select, label, img, svg");
      } catch {
        return false;
      }
    };

    const onDown = (e) => {
      // If user started on an interactive element (link/button/img), do NOT start drag — allow native click/navigation.
      if (isInteractive(e.target)) {
        initialTargetRef.current = e.target;
        movedRef.current = false; // allow native click to proceed
        return;
      }

      draggingRef.current = true;
      pausedRef.current = true;
      const clientX =
        e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
      startXRef.current = clientX;
      startScrollRef.current = el.scrollLeft;
      initialTargetRef.current = e.target;
      movedRef.current = false;
      try {
        if (typeof e.pointerId !== "undefined" && el.setPointerCapture) {
          el.setPointerCapture(e.pointerId);
        }
      } catch (err) {}
    };

    const onMove = (e) => {
      if (!draggingRef.current) return;
      const clientX =
        e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
      const dx = clientX - startXRef.current;

      if (Math.abs(dx) > 3) movedRef.current = true;
      el.scrollLeft = startScrollRef.current - dx;

      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) {
        if (el.scrollLeft >= block * 2) el.scrollLeft -= block;
        if (el.scrollLeft <= block * 0.5) el.scrollLeft += block;
      }
    };

    const onUp = (e) => {
      // If we never started a drag (because initial down was on interactive element) — allow native click/navigation.
      if (!draggingRef.current) {
        // small safeguard: if the down target was interactive and user didn't move, let native click happen.
        initialTargetRef.current = null;
        movedRef.current = false;
        return;
      }

      // End drag
      const clientX =
        e.clientX ?? (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) ?? 0;
      const dx = clientX - startXRef.current;

      draggingRef.current = false;
      pausedRef.current = false;
      try {
        if (typeof e.pointerId !== "undefined" && el.releasePointerCapture) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      // If movement was tiny, treat as a click: trigger navigation by dispatching a click on the nearest anchor.
      if (!movedRef.current && Math.abs(dx) < CLICK_MOVE_THRESHOLD && initialTargetRef.current) {
        const startNode = initialTargetRef.current;
        const link = startNode.closest && startNode.closest("a");
        if (link) {
          // dispatch a real click so Next.js Link navigates
          link.click();
        } else {
          // fallback: dispatch click on the original target
          try {
            startNode.click && startNode.click();
          } catch (err) {}
        }
      }

      initialTargetRef.current = null;
      movedRef.current = false;
    };

    // pointer events
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    // touch fallbacks (mobile)
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);

      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [items]);

  const headingV = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };
  const subtitleV = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  };
  const carouselHeadingV = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-8 md:py-16 lg:py-24 bg-[#0D1325]">
      <Container>
        <div className="max-w-7xl">
          <motion.h2
            initial="visible"
            animate="visible"
            variants={headingV}
            className="text-white text-2xl lg:text-3xl font-semibold text-center"
          >
            Freezones by Emirate
          </motion.h2>

          <div className="w-full flex justify-start mt-6">
            <nav className="w-full">
              {/* Outer wrapper creates the full-width white line */}
              <div className="w-full border-b border-white/80">
                {/* Inner wrapper holds buttons */}
                <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-2 md:px-0 text-sm md:text-base">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`relative pb-3 whitespace-nowrap transition-colors duration-200
              ${
                t === activeTab
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
                    >
                      <span className="inline-block text-base lg:text-lg font-normal">
                        {t}
                      </span>

                      {/* gold underline for active tab */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200
                ${
                  t === activeTab ? "bg-[#E9C05F] w-full" : "bg-transparent w-0"
                }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <motion.h3
            key={activeTab + "-subtitle"}
            initial="visible"
            animate="visible"
            variants={subtitleV}
            className="text-white max-w-lg mx-auto lg:mx-0 my-6 text-center lg:text-left text-lg md:text-2xl font-semibold"
          >
            {RAW_DATA[activeTab].subtitle}
          </motion.h3>

          <div className="mt-2">
            <div
              ref={carouselRef}
              className="relative flex gap-6 overflow-x-auto no-scrollbar py-6 px-2"
              style={{
                scrollBehavior: "auto",
                WebkitOverflowScrolling: "auto",
              }}
              tabIndex={0}
              aria-label={`Freezones carousel for ${activeTab}`}
            >
              {items.map((it, idx) => (
                <Link
                  key={`${it.id}-${idx}`}
                  href={`/freezone/${it.link}`}
                  className="shrink-0"
                >
                  <article
                    className="shrink-0 cursor-pointer"
                    aria-labelledby={`${it.id}-title`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/6 shadow-[0_20px_60px_rgba(2,6,23,0.6)] glass-bg w-[220px] h-[328px] sm:w-[260px] sm:h-[388px] lg:w-[294px] lg:h-[438px]">
                      <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[294px] lg:h-[294px]">
                        <img
                          src={it.img}
                          alt={it.title}
                          className="w-full h-full object-cover block"
                        />
                      </div>

                      <div className="py-4 px-4 border-t border-white/6 h-[108px] sm:h-[128px] lg:h-[144px] flex flex-col justify-between">
                        <div>
                          <h3
                            id={`${it.id}-title`}
                            className="text-white text-base md:text-lg font-normal leading-snug"
                          >
                            {it.title}
                          </h3>
                          <p className="text-slate-300 text-sm md:text-lg mt-2">
                            {it.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div aria-hidden="true" style={{ height: 8 }} />
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <MainButton
              text={"Explore Setup Packages"}
              url="#freezone-packages"
            />
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            transform: translateX(120%) skewX(-12deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(240%) skewX(-12deg);
            opacity: 0;
          }
        }
        .animate-\\[shine_2\\.2s_linear_infinite\\] {
          animation: shine 2.2s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
