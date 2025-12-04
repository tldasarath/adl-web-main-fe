"use client";

import React from 'react';
import Image from 'next/image';
import Container from '@/Components/Common/Container';


const WhyChooseSection = ({
    title ,
    description ,
    points ,
    image,
}) => {
    const normalizedPoints = Array.isArray(points)
        ? points.map((p, idx) => (typeof p === 'string' ? { id: idx, label: p } : { id: p.id ?? idx, label: p.label }))
        : [];

    return (
        <section className={`relative py-8 md:py-14 `}>
            {/* Decorative glow/right blur */}
            
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Content */}
                    <div>
                        {/* Badge */}
                       

                        <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
                        {title}
                        </h2>
                        <p className="text-base lg:text-lg mb-6 font-light leading-normal">
                        {description}
                        </p>

                        <div className="flex flex-col  space-y-3 max-w-xl">
                            {normalizedPoints.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center rounded-xl glass-bg text-white px-4 py-3 backdrop-blur-sm"
                                >
                                    <span className="text-sm md:text-base font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseSection;


