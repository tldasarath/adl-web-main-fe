"use client";

import React, { useEffect, useState } from "react";

import { blogDatas } from "@/Datas/blogs";
import Navbar from "../Navbar/Navbar";
import HeroSection from "../Common/HeroSection";
import ExclusiveBlogs from "./ExclusiveBlogs";
import Blogs from "./Blogs";
import Footer from "../Footer/Footer";
import { blogs } from "@/lib/api/apis";
// import { blogs } from "@/lib/api/apis"; // if using API pagination

const BlogsPageClient = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
      const fetchBlog = async () => {
        try {
          const res = await blogs("1", "16")
          if (res.success) {
            setBlogData(res.data)
            }
  
        } catch (error) {
          console.error(error);
  
        }
      }
      fetchBlog()
    }, [])

  return (
    <>
      <Navbar />

      <HeroSection
        title="Blogs"
        decription="Learn more about business setup, company formation, visas, compliance, and other essential UAE business services in our articles. Read more blogs to stay informed and make smarter decisions for your business."
      />

      <ExclusiveBlogs  blogs={blogData} />

      <Blogs />

      <Footer />
    </>
  );
};

export default BlogsPageClient;
