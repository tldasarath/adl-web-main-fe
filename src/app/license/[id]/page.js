
"use client"
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import CommercialLicenseSection from "@/Components/LicensePage/CommercialLicenseSection";
import FAQS from "@/Components/LicensePage/faqs";
import MainSection from "@/Components/LicensePage/MainSection";
import RelatedBlogs from "@/Components/LicensePage/RelatedBlogs";
import WhyADLSection from "@/Components/LicensePage/WhyADLSection";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/Datas/blogs";
import { licenseDetails } from "@/Datas/licenseDetails";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
    const params = useParams()
    const license = licenseDetails.find(item => item.id === params.id);

    return (
        <div>
            <Navbar />
            <HeroSection
                title={license.licenseType}
                decription={license.description}
                buttonText={"Get a Free Consultation"}
                url={"#schedule-meeting"} />

            <MainSection title={license.title} paragraph={license.serviceDescription} image={license.image} />
            <CommercialLicenseSection sectionTitle={license.sections.sectionTitle} benefitsTitle={license.sections.benefitsTitle} activities={license.sections.activities} benefits={license.sections.benefits} />
            <WhyADLSection description={license.whyADL} />
            <InnerBanner title={license.banner.title} description={license.banner.description} buttonText={"Book a Free Consultation"} />
            <FAQS faqs={license.faqs} />
            <RelatedBlogs blogs={blogs.slice(0,4)} />
            <Footer />
        </div>
    );
};

export default page;
