import { buildSEO } from "@/app/lib/seo";
import { serviceDetails } from "@/Datas/services";

export function generateStaticParams() {
  return serviceDetails.map(item => ({
    id: item.id,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const service = serviceDetails.find(s => s.id === params.id);

  if (!service) {
    return buildSEO({
      title: "Service Not Found | ADL Business Solutions",
      description: "This service does not exist.",
      canonical: `https://adlbusinesssolutions.com/services/not-found`
    });
  }

  const { seo, id, image } = service;

  return buildSEO({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `https://adlbusinesssolutions.com/services/${id}`,
    type: "article",
    image: image,
  });
}


export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
