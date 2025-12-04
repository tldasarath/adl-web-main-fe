import { buildSEO } from "@/app/lib/seo";
import { blogs } from "@/Datas/blogs";

export function generateStaticParams() {
  return blogs.map(item => ({
    id: item.id.toString(),
  }));
}
  export async function generateMetadata(props) {
    const params = await props.params;
    const blog = blogs.find(s => s.id === params.id);

    if (!blog) {
      return buildSEO({
        title: "Blog Not Found | ADL Business Solutions",
        description: "This blog does not exist.",
        canonical: `https://adlbusinesssolutions.com/blogs/not-found`
      });
    }

    const { seoTitle,metaDescription,keywords, id, image } = blog;

    return buildSEO({
      title: seoTitle,
      description: metaDescription,
      keywords: keywords,
      canonical: `https://adlbusinesssolutions.com/blogs/${id}`,
      type: "article",
      image: image,
    });
  }

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
