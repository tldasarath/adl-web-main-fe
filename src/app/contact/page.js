import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import ContactForm from "@/Components/Contact/ContactForm";
import Footer from "@/Components/Footer/Footer";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
import { buildSEO } from "../lib/seo";
export const metadata = buildSEO({
  title: "Business Setup Consultants in Dubai, UAE | Company Setup | ADL",
  description:
    "Find the best business setup consultants in the UAE with ADL Business Solutions. Expert support for company formation, licensing, visas, and complete business setup services.",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
  canonical: "https://adlbusinesssolutions.com/contact",
  type: "article",
});


export default function Contact() {
  return (
    <div>
        <Navbar/>
        <ContactForm/>
        <PartnersSection/>
        <ScheduleMeeting/>
                <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        
        <Footer/>
    </div>
  )}