import BlogsPageClient from "@/Components/BlogPage/BlogsPageClient";
import { getSeo } from "@/lib/api/apis";

export async function generateMetadata() {
  const seo = await getSeo("blog");

  if (!seo) {
    return {
      title: "How to Start a Business in Dubai | Step-by-Step UAE Business Setup Guide",
      description:
        "Learn the full process of starting a business in Dubai. ADL Business Solutions explains licensing, registration, and legal compliance for UAE entrepreneurs.",
      keywords: "business setup Dubai, start business UAE, company formation Dubai",
      alternates: {
        canonical: "https://adlbusinesssolutions.com/blogs",
      },
      openGraph: {
        title: "How to Start a Business in Dubai",
        description:
          "Learn the full process of starting a business in Dubai.",
        images: [
          {
            url: "/assets/images/blogs/freelancer-visa-vs-green-visa-which-is-better.jpg",
          },
        ],
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
  };
}

export default function Page() {
  return <BlogsPageClient />;
}
