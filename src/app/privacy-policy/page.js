
import HeroSection from "@/Components/Common/HeroSection";
import PolicyHeroSection from "@/Components/Common/PolicyHeroSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import PrivacyPolicySection from "@/Components/TermsAndPolicy/policy/PrivacyPolicySection";
import React from "react";
import { buildSEO } from "../lib/seo";

export const metadata = buildSEO({
  title:
    "Business Setup Consultants in Dubai, UAE | Company Setup | ADL",
  description:
    "Find the best business setup consultants in the UAE with ADL Business Solutions. Expert support for company formation, licensing, visas, and complete business setup services.",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
  canonical: "https://adlbusinesssolutions.com/privacy-policy",
  type: "article",
});

const page = () => {
  return (
    <div>
      <Navbar />
      <PolicyHeroSection 
      title={"Privacy Policy"} 
      LastUpdationDate={"November 2025"}
      // decription={"ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} 
      // buttonText={"Get a Free Consultation"} 
      // url={"#schedule-meeting"} 
      />
      <PrivacyPolicySection/>
      <Footer />
    </div>
  );
};

export default page;
