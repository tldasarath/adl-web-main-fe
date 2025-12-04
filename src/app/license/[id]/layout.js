import { buildSEO } from "@/app/lib/seo";
import { licenseDetails } from "@/Datas/licenseDetails";

export function generateStaticParams() {
  return licenseDetails.map(item => ({
    id: item.id,
  }));
}
export async function generateMetadata(props) {
  const params = await props.params;
  const license = licenseDetails.find(s => s.id === params.id);

  if (!license) {
    return buildSEO({
      title: "License Not Found | ADL Business Solutions",
      description: "This service does not exist.",
      canonical: `https://adlbusinesssolutions.com/license/not-found`
    });
  }

  const { seo, id, image } = license;

  return buildSEO({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `https://adlbusinesssolutions.com/license/${id}`,
    type: "article",
    image: image,
  });
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
