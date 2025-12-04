import React from 'react';
import Container from '@/Components/Common/Container';
import Image from 'next/image';

// items: [{ id, title, description }]
const PointsSection = ({ title, description, items }) => {


    const data = items;

    return (
        <section className="relative py-8 md:py-14 overflow-hidden">
            <div className="absolute overflow-hidden -right-10 top-0 pointer-events-none select-none  -z-10">
                <Image
                    src="/assets/images/bg/square3.png"
                    alt="Decorative shapes"
                    width={240}
                    height={320}
                    className="object-contain md:w-60 w-40"
                />
            </div>
            <Container>
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
                        {title}
                    </h2>
                    <p className="text-base lg:text-lg mb-14 font-light leading-normal">
                        {description}
                    </p>
                </div>

                {/* Points Grid */}
                <div className="relative grid grid-cols-1 py-5 lg:grid-cols-2 xl:grid-cols-4 justify-items-center gap-6">
                    <div className="absolute -top-5 left-0 lg:-left-10 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full rotate-180"></div>
                    <div className="absolute left-0 lg:-left-10 top-4 h-16 md:h-[100px] w-1.5 bg-[#E9C05F]  rotate-180"></div>
                    <div className="absolute -bottom-5 right-0 lg:-right-10 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full"></div>
                    <div className="absolute right-0 lg:-right-10  bottom-4 h-16 md:h-[100px] w-1.5 bg-[#E9C05F] "></div>

                    {data.map((item, index) => (
                        <div
                            key={item.id ?? index}
                            className="relative h-full rounded-xl p-3 w-60 lg:w-72  lg:p-6 transition-colors"
                        >
                            <div className='flex flex-row items-center space-x-2'>
                                <div className='w-3 h-3 rounded-full bg-[#376CBC] mb-1 mr-2 '></div>
                                <div className=" text-base md:text-lg font-semibold tracking-[0.2em] mb-1">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                            <div className='bg-[#E9C05F] w-full h-0.5 mb-2'></div>
                            <h3 className=" text-base md:text-lg font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className=" text-sm md:text-base font-light  leading-relaxed">
                                {item.description}
                            </p>

                            {/* Decorative corner */}

                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default PointsSection;