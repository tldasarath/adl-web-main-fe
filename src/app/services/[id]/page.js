"use client"
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
import { blogs } from "@/Datas/blogs";
import { serviceDetails } from "@/Datas/services";
import { useParams } from "next/navigation";

export default function SerivceDetails() {
  const params = useParams()
  const service = serviceDetails.find(item => item.id === params.id);



  return (
    <div>
      <Navbar />
      <HeroSection title={service.heroSection.title} subTitle={service.heroSection.subTitle} decription={service.heroSection.description} buttonText={service.heroSection.buttonText} url={service.heroSection.buttonUrl} />
      <BusinessJourney heading={service.title}
        imageSrc={service.image}
        paragraph1={service.paragraph1}
        paragraph2={service.paragraph2}
        button1Text={service.button2Text}
        button2Text={service.button2Text}
        button1Url={service.button1Url}
        button2Url={service.button2Url} />
      <PointsSection title={service.section2.title} description={service.section2.description} items={service.section2.points} />
      <WhyChooseSection title={service.section3.title} description={service.section3.description} points={service.section3.points} image={service.section3.image} />
      <WhyChooseDubai title={service.section1.title} description1={service.section1.description1} description2={service.section1.description2} meetingTitle={service.meeting.title} meetingDescription={service.meeting.description} />
      <FAQSection faqs={service.faqs} />
      <Blogs blogs={service.blogs} />
      <InnerBanner title={service.cta.title} description={service.cta.description} buttonText={service.cta.buttonText} link={service.cta.button1Url} />
      <Footer />
    </div>
  )
}