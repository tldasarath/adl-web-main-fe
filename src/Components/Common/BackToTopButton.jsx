"use client";

import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-15 right-6 z-[9999]
            glass-bg
            w-12 h-12
            flex items-center justify-center
            rounded-full
            text-[#E9C05F] text-2xl font-bold
            shadow-lg
            hover:scale-110
            transition-all duration-300
          "
        >
          ↑
        </button>
      )}
    </>
  );
}
