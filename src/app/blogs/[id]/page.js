"use client";
import BusinessGuideSection from "@/Components/BlogDetailPage/BusinessGuideSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/Datas/blogs";
import { useParams } from "next/navigation";

import React from "react";

const page = () => {
  const params = useParams();
  const blog = blogs.find((item) => item.id === params.id);

  return (
    <div>
      <Navbar />

      <BusinessGuideSection blog={blog} />

      <Footer />
    </div>
  );
};

export default page;
