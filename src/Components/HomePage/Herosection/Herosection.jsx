"use client";

import { useEffect, useState } from "react";
import Container from "../../Common/Container";
import MainButton from "../../button/MainButton";
import Navbar from "@/Components/Navbar/Navbar";
import { getHeroSection } from "@/lib/api/apis";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const hero = await getHeroSection();
        if (hero?.success) {
          setHeroData(hero.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroSection();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/videos/herosection.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="flex items-center justify-center h-full">
        <Container>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {heroData?.title || "Empowering Your Business Success in the UAE"}
            </h1>

            <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroData?.description || (
                <>
                  From business setup to visas and compliance, ADL
                  <br />
                  Business Solutions makes it seamless.
                </>
              )}
            </p>

            <div className="flex justify-center">
              <MainButton
                text={heroData?.buttonText || "Free Consultation"}
                url={heroData?.buttonUrl || "#schedule-meeting"}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
