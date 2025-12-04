
import Blogs from "@/Components/BlogPage/Blogs";
import ExclusiveBlogs from "@/Components/BlogPage/ExclusiveBlogs";
import HeroSection from "@/Components/Common/HeroSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/Datas/blogs";

import React from "react";
import { buildSEO } from "../lib/seo";
export const metadata = buildSEO({
  title: "How to Start a Business in Dubai | Step-by-Step UAE Business Setup Guide",
  description:
    "Learn the full process of starting a business in Dubai. ADL Business Solutions explains licensing, registration, and legal compliance for UAE entrepreneurs.",
  keywords: "business setup Dubai, start business UAE, company formation Dubai",
  canonical: "https://adlbusinesssolutions.com/blogs",
  type: "article",
  image: "/assets/images/blogs/freelancer-visa-vs-green-visa-which-is-better.jpg", // optional – fallback applies if removed
});


const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"Blogs"}

        decription={"Learn more about business setup, company formation, visas, compliance, and other essential UAE business services in our articles. Read more blogs to stay informed and make smarter decisions for your business. "}

      />
      <ExclusiveBlogs blogs={[...blogs].reverse().slice(18, 26)} />
      <Blogs />


      <Footer />
    </div>
  );
};

export default page;
