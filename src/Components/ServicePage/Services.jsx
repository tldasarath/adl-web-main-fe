"use client";
import { service } from "@/Datas/services";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Container from "../Common/Container";
import Link from "next/link";

const Services = () => {
    const slider1Ref = useRef(null);
    const slider2Ref = useRef(null);
    const animationRef1 = useRef(null);
    const animationRef2 = useRef(null);
    const paused1 = useRef(false);
    const paused2 = useRef(false);



    const firstSliderServices = service.slice(0, 9);
    const secondSliderServices = service.slice(9);
    const duplicatedFirst = [...firstSliderServices, ...firstSliderServices];
    const duplicatedSecond = [...secondSliderServices, ...secondSliderServices];
    useEffect(() => {
        const sliders = [slider1Ref.current, slider2Ref.current];
        const cleanupFunctions = [];
      
        sliders.forEach((slider) => {
          if (!slider) return;
      
          const updateOpacity = () => {
            const cards = slider.querySelectorAll(".service-card");
            const sliderRect = slider.getBoundingClientRect();
      
            cards.forEach((card) => {
              const cardRect = card.getBoundingClientRect();
              const cardLeft = cardRect.left;
              const cardRight = cardRect.right;
              const sliderLeft = sliderRect.left;
              const sliderRight = sliderRect.right;
              const cardWidth = cardRect.width;
              
              // Check if card is fully visible (completely inside the viewport)
              const isFullyVisible = cardLeft >= sliderLeft && cardRight <= sliderRight;
              
              let opacity = 1;
              
              if (isFullyVisible) {
                // Card is fully visible - no opacity reduction
                opacity = 1;
              } else {
                // Card is partially visible (either going out or coming in)
                // Calculate visible width
                const visibleLeft = Math.max(cardLeft, sliderLeft);
                const visibleRight = Math.min(cardRight, sliderRight);
                const visibleWidth = Math.max(0, visibleRight - visibleLeft);
                
                // Calculate opacity based on how much of the card is visible
                // The more visible, the higher the opacity
                const visibilityRatio = visibleWidth / cardWidth;
                
                // Map visibility ratio to opacity range (0.3 to 1)
                // When visibility is 0%, opacity = 0.3
                // When visibility is 100%, opacity = 1
                opacity = 0.3 + (visibilityRatio * 0.7);
              }
              
              card.style.opacity = opacity;
              card.style.transition = 'opacity 0.3s ease-in-out';
            });
          };
      
          updateOpacity();
          const observer = new ResizeObserver(updateOpacity);
          observer.observe(slider);
      
          const interval = setInterval(updateOpacity, 50);
          
          cleanupFunctions.push(() => {
            clearInterval(interval);
            observer.disconnect();
          });
        });
        
        return () => {
          cleanupFunctions.forEach(cleanup => cleanup());
        };
      }, []);
      
    // Animation functions
    const animateSlider1 = () => {
        const slider = slider1Ref.current;
        if (!slider || paused1.current) return;
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth / 2) slider.scrollLeft = 0;
        animationRef1.current = requestAnimationFrame(animateSlider1);
    };

    const animateSlider2 = () => {
        const slider = slider2Ref.current;
        if (!slider || paused2.current) return;
        slider.scrollLeft -= 1;
        if (slider.scrollLeft <= 0) slider.scrollLeft = slider.scrollWidth / 2;
        animationRef2.current = requestAnimationFrame(animateSlider2);
    };

    useEffect(() => {
        animationRef1.current = requestAnimationFrame(animateSlider1);
        animationRef2.current = requestAnimationFrame(animateSlider2);

        return () => {
            cancelAnimationFrame(animationRef1.current);
            cancelAnimationFrame(animationRef2.current);
        };
    }, []);

    const handleMouseEnter = (sliderNumber) => {
        if (sliderNumber === 1) {
            paused1.current = true;
            cancelAnimationFrame(animationRef1.current);
        } else {
            paused2.current = true;
            cancelAnimationFrame(animationRef2.current);
        }
    };

    const handleMouseLeave = (sliderNumber) => {
        if (sliderNumber === 1) {
            paused1.current = false;
            animationRef1.current = requestAnimationFrame(animateSlider1);
        } else {
            paused2.current = false;
            animationRef2.current = requestAnimationFrame(animateSlider2);
        }
    };

    return (
        <>
        <div className="min-h-screen py-8 md:py-14">
            <div className="w-full">
                {/* Heading Section */}
             <Container>
                   <div className=" mb-16">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold  ">
                        Our Services
                    </h2>
              <div className=" flex justify-end">
                  <p className="text-base lg:text-lg mb-8 max-w-lg font-light leading-normal">
We offer business support in Dubai, handling company setup, visas, approvals, documentation, corporate services, and essential processes to help entrepreneurs start, manage, and grow their businesses smoothly across the UAE today.
                    </p>
              </div>
                </div>
             </Container>

                {/* First Slider */}
                <div className="mb-16 relative overflow-hidden">
                    <div
                        ref={slider1Ref}
                        className="flex space-x-6 py-4 overflow-x-hidden"
                        style={{ scrollBehavior: "auto" }}
                    >
                        {duplicatedFirst.map((service, index) => (
                          
                          <Link href={`/services/${service.id}`} key={`slider1-${service.id}-${index}`}>
                          <div
                           key={`slider1-${service.id}-${index}`}
                           className="service-card group flex-shrink-0 md:w-96 w-72 md:h-96 h-80 rounded-2xl shadow-lg p-6 
                           hover:shadow-2xl hover:scale-105 transition-transform duration-300 
                           glass-bg backdrop-blur-md border border-transparent hover:border-blue-400"
                           onMouseEnter={() => handleMouseEnter(1)}
                           onMouseLeave={() => handleMouseLeave(1)}
                         >
                         
                                <div className="flex flex-col h-full">
                                    <div className="mb-4 sm:h-16 sm:w-16 h-14 w-14 flip-container">
                                        <div className="flip-inner">
                                            <div className="flip-front">
                                                <Image
                                                    src={service.logo}
                                                    alt={service.title}
                                                    width={64}
                                                    height={64}
                                                    className="sm:h-16 sm:w-16 h-14 w-14 object-contain flip-image"
                                                />
                                            </div>
                                            <div className="flip-back">
                                                <Image
                                                    src={service.logo}
                                                    alt={service.title}
                                                    width={64}
                                                    height={64}
                                                    className="sm:h-16 sm:w-16 h-14 w-14 object-contain flip-image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="flex-grow text-sm md:text-base font-normal">{service.description}</p>
                                </div>
                            </div>
                            </Link>
                        ))}
                        
                    </div>


                </div>

                {/* Second Slider */}
                <div className="relative overflow-hidden">
                    <div
                        ref={slider2Ref}
                        className="flex space-x-6 py-4 overflow-x-hidden"
                        style={{ scrollBehavior: "auto" }}
                    >
                        {duplicatedSecond.map((service, index) => (
                                                       <Link href={`/services/${service.id}`} key={`slider1-${service.id}-${index}`}>

                             <div
                              key={`slider2-${service.id}-${index}`}
                              className="service-card group flex-shrink-0 md:w-96 w-72 md:h-96 h-80 rounded-2xl shadow-lg p-6 
                              hover:shadow-2xl hover:scale-105 transition-transform duration-300 
                              glass-bg backdrop-blur-md border border-transparent hover:border-blue-400"
                              onMouseEnter={() => handleMouseEnter(2)}
                              onMouseLeave={() => handleMouseLeave(2)}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-4 sm:h-16 sm:w-16 h-14 w-14 flip-container">
                                        <div className="flip-inner">
                                            <div className="flip-front">
                                                <Image
                                                    src={service.logo}
                                                    alt={service.title}
                                                    width={64}
                                                    height={64}
                                                    className="sm:h-16 sm:w-16 h-14 w-14 object-contain flip-image"
                                                />
                                            </div>
                                            <div className="flip-back">
                                                <Image
                                                    src={service.logo}
                                                    alt={service.title}
                                                    width={64}
                                                    height={64}
                                                    className="sm:h-16 sm:w-16 h-14 w-14 object-contain flip-image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="flex-grow text-sm md:text-base font-normal">{service.description}</p>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>

                    {/* Gradient edges */}
                    {/* <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div> */}
                </div>
            </div>
        </div>
        </>
    );
};

export default Services;
