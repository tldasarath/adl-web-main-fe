"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Container from "../Common/Container";

export default function ClientExperiences() {
    const testimonials = [
        {
            id: 1,
            name: "Rahul K",
            role: "IT Services",
            text: "ADL made our IFZA company setup seamless. Their support in licensing and visas was exceptional!",
            image: "/assets/images/team/person_img2.png",
        },
        {
            id: 2,
            name: "Sara A",
            role: "E-commerce Entrepreneur",
            text: "From consultation to license issuance, ADL handled everything professionally. Highly recommend!",
            image: "/assets/images/team/person_img1.png",
        },
        {
            id: 3,
            name: "Omar R",
            role: "Consulting Firm Owner",
            text: "Outstanding support from start to finish. The ADL team truly understands business setup in IFZA.",
            image: "/assets/images/team/person_img3.png",
        },
    ];

    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const nextTestimonial = () => {
        setDirection(1);
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    // 🔁 Auto-scroll every 6s
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(nextTestimonial, 6000);
        return () => clearInterval(timer);
    }, [paused]);

    // ✅ Smooth transition variants
    const variants = {
        initial: (direction) => ({
            x: direction > 0 ? 80 : -80,
            opacity: 0,
            filter: "blur(2px)",
            transform: "translate3d(0,0,0)",
        }),
        animate: {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                x: { type: "spring", stiffness: 80, damping: 20 },
                opacity: { duration: 0.4 },
            },
        },
        exit: (direction) => ({
            x: direction < 0 ? 80 : -80,
            opacity: 0,
            filter: "blur(2px)",
            transition: {
                x: { type: "spring", stiffness: 80, damping: 25 },
                opacity: { duration: 0.3 },
            },
        }),
    };

    return (
        <section
            id="client-experiences"
            className="relative py-8 md:py-18  text-white overflow-hidden"
        >
            <Container>
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <h2 className="text-3xl md:text-[32px] font-semibold mb-10 text-left">
                        Client Experiences with ADL
                    </h2>

                    {/* Wrapper */}
                    <div
                        className="relative flex items-center justify-between gap-4"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Left Button */}
                        <button
                            onClick={prevTestimonial}
                            aria-label="Previous"
                            className="p-2 rounded-full glass-bg transition z-10"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        {/* Testimonial Container */}
                        {/* Testimonial Container */}
                        <div className="relative flex-1 flex justify-center overflow-hidden min-h-[220px] md:min-h-[260px]">
                            <AnimatePresence custom={direction} initial={false} mode="popLayout">
                                <motion.div
                                    key={testimonials[current].id}
                                    custom={direction}
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    // ✅ Only absolute on medium+ screens to prevent overlap issues on small screens
                                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-left w-full px-4 md:px-0
                 md:absolute md:inset-0"
                                    style={{ willChange: "transform, opacity, filter" }}
                                >
                                    {/* Client Image */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Image
                                            src={testimonials[current].image}
                                            alt={testimonials[current].name}
                                            width={120}
                                            height={120}
                                            className="rounded-full object-cover border-2 border-[#2b3a5b]"
                                        />
                                    </motion.div>

                                    {/* Text */}
                                    <motion.div
                                        className="max-w-xl text-center md:text-left"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <h3 className="text-lg md:text-xl font-semibold">
                                            {testimonials[current].name}
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-3">
                                            {testimonials[current].role}
                                        </p>
                                        <p className="text-slate-200 text-base leading-relaxed italic">
                                            “{testimonials[current].text}”
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>


                        {/* Right Button */}
                        <button
                            onClick={nextTestimonial}
                            aria-label="Next"
                            className="p-2 rounded-full  glass-bg transition z-10"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
