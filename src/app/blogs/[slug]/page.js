import BusinessGuideSection from "@/Components/BlogDetailPage/BusinessGuideSection";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

// ✅ 1. BUILD TIME: Generate all static blog pages
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blogs?page=1&limit=50`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();

    return (data?.data || []).map((blog) => ({
      slug: blog.url,
    }));
  } catch (error) {
    console.error("Static params fetch failed", error);
    return [];
  }
}

// ✅ 2. ✅ SEO METADATA PER BLOG (VERY IMPORTANT)
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blog/${slug}`,
    { next: { revalidate: 60 } } // ISR

  );

  const blogRes = await res.json();
  const blog = blogRes?.data?.[0];

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog does not exist.",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || "",

    alternates: {
      canonical: blog.canonical || `/blogs/${blog.url}`,
    },

    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: blog.canonical || `/blogs/${blog.url}`,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },
  };
}

// ✅ 3. PAGE LOAD: Fetch only ONE blog
export default async function Page({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/get-blog/${slug}`,
    { next: { revalidate: 60 } } // ISR

  );

  const blog = await res.json();

  if (!blog?.data?.length) {
    return <div className="text-center text-white py-20">Blog not found</div>;
  }

  const blogData = blog.data[0];

  return (
    <div>
      <Navbar />
      <BusinessGuideSection blog={blogData} />
      <Footer />
    </div>
  );
}
