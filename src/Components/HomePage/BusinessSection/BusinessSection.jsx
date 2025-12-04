'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';

const businessData = [
  {
    id: 1,
    title: "Freezone",
    description: "Freezone companies enjoy full ownership, tax advantages, simplified licensing, and business setup.",
    image: "/assets/images/businessSection/freezone.png",
    url:"/uae-freezone-business-setup"
  },
  {
    id: 2,
    title: "Mainland",
    description: "Mainland setup enables UAE operations with full ownership and flexible business activities.",
    image: "/assets/images/businessSection/mainland.png",
    url:"/mainland-company-formation-in-uae"
  },
  {
    id: 3,
    title: "Offshore",
    description: "Offshore structures offer asset protection, privacy, trading flexibility, and simplified international operations.",
    image: "/assets/images/businessSection/offshore.png",
    url:"offshore-company-formation-in-uae"
  },
];

export default function BusinessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Refs to avoid stale closures in handlers
  const isLockedRef = useRef(isLocked);
  const activeIndexRef = useRef(activeIndex);
  const sectionRef = useRef(null);
  const scrollTimeout = useRef(null);

  // keep refs in sync with state
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

useEffect(() => {
  let rafId = null;

  const handleVisibility = (entries) => {
    entries.forEach((entry) => {
      const rect = entry.boundingClientRect;
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Section center relative to viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewHeight / 2;
      const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);

      // ✅ Lock if section center is within 20% of viewport center
      const shouldLock = entry.isIntersecting && distanceFromCenter < viewHeight * 0.2;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsLocked(shouldLock);
        isLockedRef.current = shouldLock;
      });
    });
  };

  const observer = new IntersectionObserver(handleVisibility, {
    threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
  });

  if (sectionRef.current) observer.observe(sectionRef.current);

  const handleScroll = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewHeight / 2;
    const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);

    // ✅ Add hysteresis: lock within 20%, unlock only after 35%
    if (distanceFromCenter < viewHeight * 0.2 && !isLockedRef.current) {
      setIsLocked(true);
      isLockedRef.current = true;
    } else if (distanceFromCenter > viewHeight * 0.35 && isLockedRef.current) {
      setIsLocked(false);
      isLockedRef.current = false;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  // Controlled wheel + touch handlers (use refs for current values)
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const safeAdvance = (nextIndex) => {
      // clamp index
      const clamped = Math.max(0, Math.min(businessData.length - 1, nextIndex));
      if (clamped !== activeIndexRef.current) {
        setActiveIndex(clamped);
        activeIndexRef.current = clamped;
      }
    };

    const allowNativeScrollToNextSection = (isDown) => {
      if (!sectionRef.current) return;
      // unlock to allow browser to scroll to next/prev section
      setIsLocked(false);
      isLockedRef.current = false;

      if (isDown) {
        const sectionBottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
        window.scrollTo({ top: sectionBottom, behavior: 'smooth' });
      } else {
        const sectionTop = sectionRef.current.offsetTop;
        window.scrollTo({ top: sectionTop - window.innerHeight, behavior: 'smooth' });
      }
    };

    const handleWheel = (e) => {
      // only intercept when section is locked
      if (!isLockedRef.current) return;
      // we will prevent default while handling
      e.preventDefault();

      if (scrollTimeout.current) return;

      const deltaY = e.deltaY;

      if (deltaY > 0) {
        // scroll down
        if (activeIndexRef.current < businessData.length - 1) {
          safeAdvance(activeIndexRef.current + 1);
        } else {
          allowNativeScrollToNextSection(true);
        }
      } else if (deltaY < 0) {
        // scroll up
        if (activeIndexRef.current > 0) {
          safeAdvance(activeIndexRef.current - 1);
        } else {
          allowNativeScrollToNextSection(false);
        }
      }

      // throttle rapid wheel events
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 700);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!isLockedRef.current) return;

      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (scrollTimeout.current) return;

      if (deltaY > 50) {
        // swipe up => next
        if (activeIndexRef.current < businessData.length - 1) {
          safeAdvance(activeIndexRef.current + 1);
        } else {
          allowNativeScrollToNextSection(true);
        }
      } else if (deltaY < -50) {
        // swipe down => prev
        if (activeIndexRef.current > 0) {
          safeAdvance(activeIndexRef.current - 1);
        } else {
          allowNativeScrollToNextSection(false);
        }
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    };
  }, []); // empty deps — handlers read state from refs

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      <Container>
        <div className="px-4 flex flex-col md:flex-row md:items-center gap-12">
          {/* ===== LEFT CONTENT ===== */}
          <div className="flex-1 flex gap-8 items-start relative">
            {/* Vertical 3-line Indicator */}
            <div className='h-[800px] flex items-center'>
              <div className="flex flex-col items-center gap-9 justify-between h-[600px] relative">
                {businessData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-50 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-white" : "bg-[#E9C05F]"
                      }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 relative h-[800px] flex items-center overflow-hidden">
              {businessData.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transform flex items-center transition-transform duration-[1300ms] ease-in-out ${index === activeIndex
                      ? "translate-y-0"
                      : index < activeIndex
                        ? "-translate-y-full"
                        : "translate-y-full"
                    }`}
                >
                  <div className='flex flex-col'>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 ">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                    <div>
                      <SecondaryButton text='Explore Packages' url={item.url} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT IMAGE SECTION ===== */}
          <div className="hidden md:block flex-1 relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-bg">
            {businessData.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${index === activeIndex
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                  }`}
              >
                <div className="w-full h-20 flex justify-center items-center ">
                  <h3 className="text-3xl font-semibold ">
                    {item.title}
                  </h3>
                </div>
                <div className="relative w-2/3 h-72">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
