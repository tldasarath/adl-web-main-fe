import Banner from "@/Components/Common/Banner";
import Footer from "@/Components/Footer/Footer";
import AboutSection from "@/Components/HomePage/AboutSection/AboutSection";
import BlogSection from "@/Components/HomePage/BlogSection/BlogSection";
import BusinessSection from "@/Components/HomePage/BusinessSection/BusinessSection";
import Companyformation from "@/Components/HomePage/CompanyFormation/Companyformation";
import FAQSection from "@/Components/HomePage/FaqSection/FaqSection";
import HeroSection from "@/Components/HomePage/Herosection/Herosection";
import ManagerSection from "@/Components/HomePage/ManagerSection/ManagerSection ";
import PackageSection from "@/Components/HomePage/PackageSection/PackageSection";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import BusinessServices from "@/Components/HomePage/ServiceSection/BusinessService";
import ServicesSection from "@/Components/HomePage/ServiceSection/ServiceSetion";
import SocialMediaSection from "@/Components/HomePage/SocialMediaSection/SocialMediaSection";
import SubscribeSection from "@/Components/HomePage/SubscribeSection/SubscribeSection";
import TeamSection from "@/Components/HomePage/TeamSection/TeamSection";
import TestimonialSection from "@/Components/HomePage/Testimonial/Testimonial";
import ValuesSection from "@/Components/HomePage/ValuesSection/ValuesSection";
import VisaTypesSection from "@/Components/HomePage/VisaTypes/VisaTypesSection";
import { buildSEO } from "./lib/seo";



export const metadata = buildSEO({
  title: "Business Setup Services in UAE | ADL Business Solutions | #UAE",
  description:
    "Professional business setup services in UAE by ADL Business Solutions. Expert support for company formation, licensing, visas, and PRO services.",
  keywords:
    "business setup services uae,business setup services dubai,company formation uae,company formation services uae,business setup consultants dubai,dubai business setup,uae company formation experts,start business in dubai,business setup support dubai,business consulting dubai",
  canonical: "https://adlbusinesssolutions.com/",
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Companyformation />
      <AboutSection />
      <ScheduleMeeting />
      <ManagerSection />
      <TeamSection />
      <ServicesSection />
      <BusinessServices />
      <BusinessSection />
      <PackageSection />
      <Banner />
      <VisaTypesSection />
      <ValuesSection />
      <PartnersSection />
      <BlogSection />
      <TestimonialSection />
      <SocialMediaSection />
      <FAQSection />
      <SubscribeSection />
      <Footer />
    
    </div>
  );
}
