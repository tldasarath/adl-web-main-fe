"use client";
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import FAQSection from "@/Components/mainlandPage/FaqSection";
import SuggestedBlogs from "@/Components/mainlandPage/SuggestedBlogs";
import AboutVisa from "@/Components/visaPage/AboutVisa";
import VisaTabs from "@/Components/visaPage/VisaTabs";
import { blogs } from "@/Datas/blogs";
import { visaDetails } from "@/Datas/visaData";
import { blogInnerPage } from "@/lib/api/apis";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const params = useParams();
  // const visa = visaDetails.find((item) => item.id === params.id);
  const [blogData, setBlogData] = useState([]);


  const visa = useMemo(() => {
    return visaDetails.find(
      v => String(v.id) === String(params?.id)
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
    if (!visa) return null;

  return (
    <div>
      <Navbar />
      <HeroSection
        title={visa.heroSection.title}
        // subTitle={visa.heroSection.subTitle}
        decription={visa.heroSection.description}
        buttonText={visa.heroSection.buttonText}
        url={visa.heroSection.buttonUrl}
      />
      <AboutVisa
        image={visa.image}
        title={visa.title}
        para1={visa.paragraph1}
        para2={visa.paragraph2}
      />
      <VisaTabs visa={visa} />
      <InnerBanner
        title={visa.meeting.title}
        description={visa.meeting.description}
        buttonText={visa.meeting.buttonText}
        buttonUrl={visa.meeting.buttonUrl}
      />
      <FAQSection faqs={visa.faqs} />
      <SuggestedBlogs blogs={blogData.length ? blogData : visa.relatedBlogs}  />
      <Footer />
    </div>
  );
}
