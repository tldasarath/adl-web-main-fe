
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
import { blogDatas } from "@/Datas/blogs";
import { licenseDetails } from "@/Datas/licenseDetails";
import { blogInnerPage } from "@/lib/api/apis";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const page = () => {
    const params = useParams()
      const [blogData, setBlogData] = useState([]);
    
    // const license = licenseDetails.find(item => item.id === params.id);
    const license = useMemo(() => {
    return licenseDetails.find(
      item => String(item.id) === String(params?.id)
    );
  }, [params?.id]); 
  useEffect(() => {
    if (!params?.id) return;

    const fetchBlog = async () => {
      try {
        const res = await blogInnerPage(params.id);
        setBlogData(res?.data || []);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogData([]);
      }
    };

    fetchBlog();
  }, [params?.id]);

  // ✅ SAFETY GUARD
  if (!license) return null;

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
            <RelatedBlogs blogs={blogData.length>0 ? blogData : license.blogs}  />
            <Footer />
        </div>
    );
};

export default page;
