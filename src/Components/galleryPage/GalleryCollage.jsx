"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Container from "../Common/Container";

/* -------------------- Fallback images -------------------- */
const sampleImages = [
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_cm.png",
  "/assets/images/gallery/gallery_img1.jpg",
  "/assets/images/gallery/gallery_img2.jpg",
];

/* -------------------- Pattern setup -------------------- */
const TOP_PATTERN = ["hero", "portrait", "portrait", "small", "small", "wide"];
const PATTERN = ["hero", "portrait", "small", "wide", "square", "small", "wide", "portrait"];

const TILE_HEIGHTS = {
  hero: { desktop: 360, tablet: 320, mobile: 220 },
  portrait: { desktop: 380, tablet: 320, mobile: 240 },
  wide: { desktop: 200, tablet: 180, mobile: 150 },
  square: { desktop: 200, tablet: 180, mobile: 150 },
  small: { desktop: 150, tablet: 140, mobile: 120 },
};

/* -------------------- Breakpoint hook -------------------- */
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

/* -------------------- Tile (used both top & masonry) -------------------- */
/* Changes: uses whileInView + viewport.once=false so it animates every time the tile enters viewport */
const tileVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function Tile({ src, height, label, index, onOpen, className = "" }) {
  // small index-based delay but kept minimal so many tiles don't lag
  const delay = Math.min(0.45, index * 0.02);

  return (
    <motion.article
      layout
      // replaced initial/animate with whileInView so animation triggers on viewport entry
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.28 }} // once:false -> animate every time it enters view
      variants={tileVariants}
      transition={{ duration: 0.46, delay }}
      className={`relative mb-4 rounded-2xl overflow-hidden shadow-lg break-inside-avoid ${className}`}
      style={{ height }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
    >
      <motion.img
        src={src}
        alt={label}
        loading="lazy"
        className="w-full h-full object-cover block transform-gpu transition-transform duration-500 hover:scale-105"
        style={{ filter: "brightness(0.96) contrast(1.05)" }}
        // keep image visually crisp during layout animation
        draggable={false}
      />

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              aria-label="Open image"
              className="inline-flex items-center justify-center bg-white/14 hover:bg-white/24 text-white w-9 h-9 rounded-full shadow-sm backdrop-blur-sm"
            >
              <Maximize2 size={16} />
            </button>
          </div>
          <div className="text-white text-sm drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
            <div className="font-medium">{label}</div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/6" />
    </motion.article>
  );
}

/* -------------------- Lightbox -------------------- */
function Lightbox({ src, open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.72)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-[92vw] max-h-[92vh] rounded-2xl overflow-hidden"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <X size={18} />
            </button>

            <img src={src} alt="expanded" className="block max-h-[92vh] w-auto object-contain bg-black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Main component -------------------- */
export default function PatternGalleryTopFirst({ images = sampleImages }) {
  const bp = useBreakpoint();

  // number of columns for top section grid and for masonry columns
  const columns = bp === "desktop" ? 4 : bp === "tablet" ? 3 : 2;

  // topRows config: how many rows the top area occupies visually
  const topRows = 2;
  const topSlots = Math.max(Math.min(TOP_PATTERN.length, columns * topRows), columns); // ensure at least one row

  // prepare master array (use provided images or fallback)
  const master = images && images.length ? images.slice() : sampleImages.slice();

  // assume new images are appended to the end of the array.
  // We want the most recent `topSlots` images to show in top area.
  const topItems = master.slice(-topSlots).reverse(); // reverse so newest is left-to-right
  const restItems = master.slice(0, Math.max(0, master.length - topSlots));

  // map items to types/heights
  const mapToTiles = (arr, startIndex = 0, pattern = PATTERN) =>
    arr.map((src, i) => {
      const type = pattern[(startIndex + i) % pattern.length];
      const height = TILE_HEIGHTS[type]?.[bp] ?? 160;
      return {
        src,
        type,
        height,
        label: `${type} ${i + 1}`,
        index: i,
      };
    });

  // top area: we want explicit layout that looks like your reference.
  const topTiles = topItems.map((src, i) => {
    const type = TOP_PATTERN[i % TOP_PATTERN.length] || "small";
    const height = TILE_HEIGHTS[type]?.[bp] ?? 160;
    return { src, type, height, label: `${type} top ${i + 1}`, index: i };
  });

  // rest tiles follow the pattern cycle (so pattern repeats)
  const restTiles = mapToTiles(restItems, 0, PATTERN);

  // lightbox
  const [openImg, setOpenImg] = useState(null);

  const topGridStyles = {
    desktop: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "auto auto",
      gap: "16px",
      alignItems: "start",
    },
    tablet: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "auto auto",
      gap: "14px",
      alignItems: "start",
    },
    mobile: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "auto auto",
      gap: "12px",
      alignItems: "start",
    },
  };

  const topPlacement = (i) => {
    if (bp === "desktop") {
      switch (i) {
        case 0:
          return { gridColumn: "1 / span 2", gridRow: "1 / span 2" };
        case 1:
          return { gridColumn: "3 / span 1", gridRow: "1 / span 2" };
        case 2:
          return { gridColumn: "4 / span 1", gridRow: "1 / span 2" };
        case 3:
          return { gridColumn: "1 / span 1", gridRow: "3 / span 1" };
        case 4:
          return { gridColumn: "2 / span 1", gridRow: "3 / span 1" };
        case 5:
          return { gridColumn: "3 / span 2", gridRow: "3 / span 1" };
        default:
          return { gridColumn: "auto", gridRow: "auto" };
      }
    } else if (bp === "tablet") {
      switch (i) {
        case 0:
          return { gridColumn: "1 / span 2", gridRow: "1 / span 2" };
        case 1:
          return { gridColumn: "3 / span 1", gridRow: "1 / span 2" };
        case 2:
          return { gridColumn: "1 / span 1", gridRow: "3 / span 1" };
        case 3:
          return { gridColumn: "2 / span 1", gridRow: "3 / span 1" };
        case 4:
          return { gridColumn: "3 / span 1", gridRow: "3 / span 1" };
        case 5:
          return { gridColumn: "1 / span 3", gridRow: "4 / span 1" };
        default:
          return { gridColumn: "auto", gridRow: "auto" };
      }
    } else {
      return { gridColumn: `${(i % 2) + 1} / span 1`, gridRow: `${Math.floor(i / 2) + 1} / span 1` };
    }
  };

  return (
    <section className=" relative py-8 md:py-16 lg:py-24  min-h-screen">
      {/* Glowing Blob Left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
          absolute w-[246px] h-[499px] 
          -left-24 top-40 
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
          -right-2 top-40 
          bg-[#376CBC]
          opacity-30 blur-[100px] 
          rounded-[60%]
        "
        ></div>
      </div>
      <Container>
        <div className="w-full h-20 md:h-32" />
        <div className="max-w-7xl ">
          <header className="text-center mb-8 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Gallery</h2>
            <p className="mt-2 text-sm md:text-xl text-slate-300 max-w-2xl mx-auto">
              Discover our gallery featuring key projects, client moments, and visuals that reflect our quality, creativity,
              and service standards.
            </p>
          </header>

          {/* TOP SECTION (explicit grid) */}
          <div className="mb-8">
            <div style={topGridStyles[bp]}>
              {topTiles.map((t, idx) => {
                const placement = topPlacement(idx);
                const style = { ...placement, height: t.height, cursor: "pointer" };
                return (
                  <div key={idx} style={style}>
                    <Tile
                      src={t.src}
                      height={t.height}
                      label={t.label}
                      index={idx}
                      onOpen={() => setOpenImg(t.src)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* REST SECTION (masonry columns - no vertical gaps) */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {restTiles.map((it, i) => (
              <Tile
                key={i}
                src={it.src}
                height={it.height}
                label={it.label}
                index={i}
                onOpen={() => setOpenImg(it.src)}
              />
            ))}
          </div>
        </div>

        <Lightbox src={openImg} open={!!openImg} onClose={() => setOpenImg(null)} />
        <div className="w-full h-20 md:h-32" />
      </Container>
    </section>
  );
}
