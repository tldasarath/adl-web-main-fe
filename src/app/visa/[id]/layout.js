import { buildSEO } from "@/app/lib/seo";
import { blogs } from "@/Datas/blogs";
import { visaDetails } from "@/Datas/visaData";

export function generateStaticParams() {
  return visaDetails.map(item => ({
    id: item.id,
  }));
}
export async function generateMetadata(props) {
  const params = await props.params;
  const visa = visaDetails.find(s => s.id === params.id);

  if (!visa) {
    return buildSEO({
      title: "Visa Not Found | ADL Business Solutions",
      description: "This visa does not exist.",
      canonical: `https://adlbusinesssolutions.com/visa/not-found`
    });
  }

  const { seo, id, image } = visa;

  return buildSEO({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `https://adlbusinesssolutions.com/visa/${id}`,
    type: "article",
    image: image,
  });
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
