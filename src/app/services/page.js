import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
import Services from "@/Components/ServicePage/Services";
import { buildSEO } from "../lib/seo";
export const metadata = buildSEO({
  title: "Business Setup in Dubai | Start Your UAE Company with ADL Business Solutions",
  description:
    "Start your business in Dubai with expert guidance from ADL Business Solutions. We handle trade licenses, approvals, and documentation to help you launch your company smoothly in Mainland, Freezone, or Offshore zones.",
  keywords:
    "Business setup in Dubai, UAE company formation, business license Dubai, mainland company setup, freezone business setup, start a company in UAE",
  canonical: "https://adlbusinesssolutions.com/services",
  type: "article",
});


export default function Serivces() {
  return (
    <div>
        <Navbar/>
        <HeroSection title={"Start Your UAE Company with"} subTitle={" ADL Business Solutions"} decription={"ADL Business Solutions guides entrepreneurs with licenses, approvals, and documentation, ensuring smooth company setup across Dubai’s Mainland, Freezone, and Offshore sectors."} buttonText={"Get a Free Consultation"} url={"#schedule-meeting"}/>
        <Services/>
        <ScheduleMeeting/>
        <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        <Footer/>
    </div>
  )}