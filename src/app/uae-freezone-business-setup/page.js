import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import AboutFreezoneDetails from "@/Components/freezonePage/AboutFreezoneDetails";
import FAQSection from "@/Components/freezonePage/FAQSection";
import FreezoneAdvantages from "@/Components/freezonePage/FreezoneAdvantages";
import FreezoneCategories from "@/Components/freezonePage/FreezoneCategories";
import FreezoneInfoCard from "@/Components/freezonePage/FreezoneInfoCard";
import FreezoneLicenses from "@/Components/freezonePage/FreezoneLicenses";
import FreezoneProcessCubes from "@/Components/freezonePage/FreezoneProcessCubes";
import PricingPackages from "@/Components/freezonePage/PricingPackages";
import SuggestedBlogs from "@/Components/freezonePage/SuggestedBlogs";
import TestimonialSection from "@/Components/freezonePage/TestimonialSection";
import { blogInnerPage, faqs, getSeo } from "@/lib/api/apis";

export async function generateMetadata() {
  const seo = await getSeo("freezone", "uae-freezone-business-setup");

  if (!seo) {
    return {
      title: "Freezone Company Setup in UAE | 100% Ownership | ADL Business Solutions",
      description:
        "ADL Business Solutions offers Freezone company setup services in Dubai, Abu Dhabi, Sharjah, and across the UAE. Get 100% foreign ownership, zero tax, and quick licensing for your business.",
      keywords:
        "UAE Freezone company setup, Dubai Freezone license, business setup in UAE, start business in Freezone, 100% ownership UAE, Freezone consultancy Dubai, ADL Business Solutions",
      alternates: {
        canonical: "https://adlbusinesssolutions.com/freezone-company-setup",
      },
      openGraph: {
        images: ["/assets/images/freezone/uae-freezone-business-setup-service.png"],
      },
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      images: ["/assets/images/freezone/uae-freezone-business-setup-service.png"],
    },
  };
}

export default async function Page() {
  const blogRes = await blogInnerPage("freezone");
  const blogData = blogRes?.data || [];
  const faqRes = await faqs("freezone")
  const faqData =faqRes.data

  
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"UAE Freezone Business Setup Services"}
        decription={
          "UAE freezone business setup services provide fast company formation, flexible licensing, and full ownership benefits..."
        }
        buttonText={"Get a Free Consultation"}
        url={"/#schedule-meeting"}
      />
      
      <AboutFreezoneDetails />
      <FreezoneInfoCard />
      <FreezoneProcessCubes />
      <FreezoneCategories />
      <FreezoneLicenses />
      <PricingPackages />
      <FreezoneAdvantages />
      <TestimonialSection />

      <InnerBanner
        title={"Start Your UAE Freezone Business with ADL"}
        description={
          "Take your business to new heights in one of the UAE’s globally recognized Freezones..."
        }
        buttonText={"Book a Free Consultation"}
        link={"/contact"}
      />
{   faqData.length>0 &&   <FAQSection faqs={faqData} />
}
      {blogData.length > 0 && <SuggestedBlogs blogs={blogData} />}

      <Footer />
    </div>
  );
}
