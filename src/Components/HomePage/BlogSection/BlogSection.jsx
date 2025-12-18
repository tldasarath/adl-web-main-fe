"use client";

import Container from "@/Components/Common/Container";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { blogs } from "@/lib/api/apis";

export default function BlogSection() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });

  const controls = useAnimation();

  // ✅ Fetch blogs with proper loading handling
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogs("1", "8");

        if (res?.success) {
          setBlogData(res.data);
        }
      } catch (error) {
        console.error("Blog Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  // ✅ Animation trigger
  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section ref={ref} className="py-16">
      <Container>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="max-w-7xl mx-auto px-6"
        >
          {/* ✅ Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              Our Recent Blog
            </h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">
              Stay updated with the latest insights on UAE business setup, visa
              services, compliance, and market trends. Explore expert tips and
              guides designed to help entrepreneurs and companies grow
              confidently in the UAE.
            </p>
          </div>

          {/* ✅ Blog Cards */}
          {loading ? (
            <p className="text-center text-white text-lg">Loading blogs...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {blogData.slice(0, 4).map((blog, index) => (
                <motion.div
                  key={blog._id || index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <Link
                    href={`/blogs/${blog.url}`}
                    className="relative group overflow-hidden rounded-2xl block"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={400}
                      height={300}
                      className="object-contain w-64 h-96 transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* ✅ Fixed Tailwind Width */}
                    <div
                      className="absolute w-[50%] bottom-0 right-0 border-b border-b-[#E9C05F] p-5"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(36,43,61,1) 0%, rgba(10,14,29,1) 48%)",
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-2 truncate text-white">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
