
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import ComparisonAtAGlance from "@/Components/OffshorePage/ComparisonAtAGlance";
import OffshoreFAQAndBenefits from "@/Components/OffshorePage/OffshoreFAQAndBenefits";
import OffshoreFormationServices from "@/Components/OffshorePage/OffshoreFormationServices";
import OffshoreTypes from "@/Components/OffshorePage/OffshoreTypes";
import WhychooseOffshore from "@/Components/OffshorePage/WhychooseOffshore";
import React from "react";
import { buildSEO } from "../lib/seo";
export const metadata = buildSEO({
  title:
    "Offshore Company Formation in UAE | Dubai, RAK & Ajman Offshore | ADL Business Solutions",
  description:
    "Set up your UAE offshore company with ADL Business Solutions. We provide fast & compliant offshore company formation in Dubai, RAK, and Ajman with bank account assistance, documentation, and full advisory. Start your tax-efficient global business today.",
  keywords:
    "UAE offshore company, Dubai offshore setup, RAK offshore company formation, Ajman offshore business setup, tax-free UAE company, offshore bank account UAE, business setup UAE, ADL Business Solutions",
  canonical: "https://adlbusinesssolutions.com/offshore-company-formation-in-uae",
  type: "article",
  image: "/assets/images/offshore/offshore-company-formation.png", // optional — fallback applies if omitted
});


const page = () => {
    return (
        <div>
            <Navbar />
            <HeroSection
                title={"Offshore Company"}
                subTitle={"Formation in UAE"}
                decription={"we help you establish a compliant, tax-efficient, and globally recognized offshore entity in the UAE — offering confidential structure, 100% foreign ownership, and international banking support."}
                buttonText={"Get a Free Consultation"}
                url={"#schedule-meeting"} />

            <WhychooseOffshore />
            <OffshoreTypes />
            <OffshoreFormationServices />
            <ComparisonAtAGlance />
            <OffshoreFAQAndBenefits />
            <InnerBanner title={"Start Your UAE Offshore Company Today"} description={"Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit"} buttonText={"Book a Free Consultation"} />

            <Footer />
        </div>
    );
};

export default page;
