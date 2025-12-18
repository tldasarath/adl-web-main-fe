"use client";
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Blogs from "@/Components/ServiceDetails/blogs";
import BusinessJourney from "@/Components/ServiceDetails/BusinessJourney";
import WhyChooseDubai from "@/Components/ServiceDetails/Choose-Dubai";
import FAQSection from "@/Components/ServiceDetails/FAQSection";
import PointsSection from "@/Components/ServiceDetails/PointsSection";
import WhyChooseSection from "@/Components/ServiceDetails/WhyChooseSection";
import { serviceDetails } from "@/Datas/services";
import { blogInnerPage } from "@/lib/api/apis";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function SerivceDetails() {
  const params = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // ✅ SAFE SERVICE FIND (memoized)
  const service = useMemo(() => {
    return serviceDetails.find((item) => item.id === params?.id);
  }, [params?.id]);

  // ✅ SAFE BLOG FETCH WITH DEPENDENCY
  useEffect(() => {
    if (!params?.id) return;

    const fetchBlog = async () => {
      try {
        setLoadingBlogs(true);
        const res = await blogInnerPage(params.id);
        setBlogData(res?.data || []);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogData([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlog();
  }, [params?.id]);

  // ✅ SAFETY GUARD (PREVENT CRASH)
  if (!service) return null;

  return (
    <div>
      <Navbar />

      <HeroSection
        title={service.heroSection.title}
        subTitle={service.heroSection.subTitle}
        decription={service.heroSection.description}
        buttonText={service.heroSection.buttonText}
        url={service.heroSection.buttonUrl}
      />

      <BusinessJourney
        heading={service.title}
        imageSrc={service.image}
        paragraph1={service.paragraph1}
        paragraph2={service.paragraph2}
        button1Text={service.button2Text}
        button2Text={service.button2Text}
        button1Url={service.button1Url}
        button2Url={service.button2Url}
      />

      <PointsSection
        title={service.section2.title}
        description={service.section2.description}
        items={service.section2.points}
      />

      <WhyChooseSection
        title={service.section3.title}
        description={service.section3.description}
        points={service.section3.points}
        image={service.section3.image}
      />

      <WhyChooseDubai
        title={service.section1.title}
        description1={service.section1.description1}
        description2={service.section1.description2}
        meetingTitle={service.meeting.title}
        meetingDescription={service.meeting.description}
      />

      <FAQSection faqs={service.faqs} />

      {/* ✅ FIXED BLOG LOGIC */}
      <Blogs blogs={blogData.length ? blogData : service.blogs} loading={loadingBlogs} />

      <InnerBanner
        title={service.cta.title}
        description={service.cta.description}
        buttonText={service.cta.buttonText}
        link={service.cta.button1Url}
      />

      <Footer />
    </div>
  );
}
