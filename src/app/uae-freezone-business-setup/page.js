import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import AboutFreezoneDetails from "@/Components/freezonePage/AboutFreezoneDetails";
import FreezoneAdvantages from "@/Components/freezonePage/FreezoneAdvantages";
import FreezoneCategories from "@/Components/freezonePage/FreezoneCategories";
import FreezoneInfoCard from "@/Components/freezonePage/FreezoneInfoCard";
import FreezoneLicenses from "@/Components/freezonePage/FreezoneLicenses";
import FreezoneProcessCubes from "@/Components/freezonePage/FreezoneProcessCubes";
import PricingPackages from "@/Components/freezonePage/PricingPackages";
import TestimonialSection from "@/Components/freezonePage/TestimonialSection";
import React from "react";
import { buildSEO } from "../lib/seo";
export const metadata = buildSEO({
  title: "Freezone Company Setup in UAE | 100% Ownership | ADL Business Solutions",
  description:
    "ADL Business Solutions offers Freezone company setup services in Dubai, Abu Dhabi, Sharjah, and across the UAE. Get 100% foreign ownership, zero tax, and quick licensing for your business.",
  keywords:
    "UAE Freezone company setup, Dubai Freezone license, business setup in UAE, start business in Freezone, 100% ownership UAE, Freezone consultancy Dubai, ADL Business Solutions",
  canonical: "https://adlbusinesssolutions.com/freezone-company-setup",
  type: "article",
  image: "/assets/images/freezone/uae-freezone-business-setup-service.png",
});


const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"UAE Freezone Business Setup Services"}
        decription={
          "UAE freezone business setup services provide fast company formation, flexible licensing, and full ownership benefits, helping entrepreneurs establish operations with simplified procedures, affordable packages, and investor-friendly regulations across leading freezones in the UAE."
        }
        buttonText={"Get a Free Consultation"}
        url={"/#schedule-meeting"}
      />
      <AboutFreezoneDetails />
      <FreezoneInfoCard />
      <FreezoneProcessCubes />
      <FreezoneCategories />
      <FreezoneLicenses />
      <PricingPackages />
      <FreezoneAdvantages />
      <TestimonialSection />
      <InnerBanner
        title={"Start Your UAE Freezone Business with ADL"}
        description={
          "Take your business to new heights in one of the UAE’s globally recognized Freezones.Connect with ADL Business Solutions to explore the best jurisdiction for your business goals and begin your journey toward success — today."
        }
        buttonText={"Book a Free Consultation"}
        link={"/contact"}
      />
      <Footer />
    </div>
  );
};

export default page;
