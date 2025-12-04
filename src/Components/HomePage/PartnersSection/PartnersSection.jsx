"use client";
import React from "react";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import { partners } from "@/Datas/partners";

const PartnersSection = () => {
  return (
    <section className="relative py-8 md:py-14 overflow-hidden">
      {/* Background */}
      {/* <div className="absolute left-[80%] -top-10 -z-10">
        <img
          src="/assets/images/bg/bubble.png"
          alt=""
          className="relative w-[500px] h-[400px] object-contain"
        />
      </div> */}

      {/* Header */}
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Trusted Partners
          </h2>
          <p className="text-lg leading-relaxed">
            We collaborate with industry leaders and innovative companies
            worldwide to deliver exceptional solutions and services to our
            clients.
          </p>
        </div>
      </Container>

      {/* ✅ Infinite Loop Slider */}
      <div className="relative w-full overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {/* Render list twice for smooth looping */}
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex items-center justify-center w-40 md:w-60 h-20 md:h-28 mx-6 bg-white/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="object-contain w-20 md:w-30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
