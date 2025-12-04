"use client"

import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import AboutFreezone from "@/Components/FreezoneDetailPage/AboutFreezone";
import ClientExperiences from "@/Components/FreezoneDetailPage/ClientExperiences";
import CompanySetupProcess from "@/Components/FreezoneDetailPage/CompanySetupProcess";
import FacilitiesSection from "@/Components/FreezoneDetailPage/FacilitiesSection";
import SetupPackages from "@/Components/FreezoneDetailPage/SetupPackages";
import TypesOfLicenses from "@/Components/FreezoneDetailPage/TypesOfLicenses";
import WhyChoose from "@/Components/FreezoneDetailPage/WhyChoose";
import WhyChooseADL from "@/Components/FreezoneDetailPage/WhyChooseADL";
import Navbar from "@/Components/Navbar/Navbar";
import { freezoneDetails } from "@/Datas/freezoneDetails";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams()
  const freezone = freezoneDetails.find(item => item.id === params.id);



  return (
    <div>
      <Navbar />
      <HeroSection
        title={freezone.hero.headline}
        // subTitle={freezone.hero.subTitle} 
        decription={freezone.hero.subheadline}
        buttonText={"Get a Free Consultation"}
        url={"/schedule-meeting"} />
      <AboutFreezone title={freezone.about.title} image={freezone.image} description={freezone.about.overview} highlights={freezone.about?.highlights} />
      <TypesOfLicenses title={freezone.typesOfLicenses.title} licenses={freezone.typesOfLicenses.licenses} description={freezone.typesOfLicenses.description} />
      <CompanySetupProcess setupProcess={freezone.setupProcess} />
      <FacilitiesSection facilities={freezone.facilities} />
      <SetupPackages title={freezone.setupPackages.title} note={freezone.setupPackages.note} packages={freezone.setupPackages.packages} />
      <WhyChoose title={freezone.whyChoose.title} description={freezone.whyChoose.description} points={freezone.whyChoose.points} documents={freezone.requiredDocuments.documents} />
      <WhyChooseADL title={freezone.whyChooseADL.title} points={freezone.whyChooseADL.points} />
      <InnerBanner title={freezone.banner.title} description={freezone.banner.description} buttonText={"Start Your Business Now"} />
      <ClientExperiences />
      <Footer />
    </div>
  )
}