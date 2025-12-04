import { buildSEO } from "@/app/lib/seo";
import { freezoneDetails } from "@/Datas/freezoneDetails";

export function generateStaticParams() {
  return freezoneDetails.map(item => ({
    id: item.id,
  }));
}
export async function generateMetadata(props) {
  const params = await props.params;
  const freezone = freezoneDetails.find(s => s.id === params.id);

  if (!freezone) {
    return buildSEO({
      title: "Freezone Not Found | ADL Business Solutions",
      description: "This blog does not exist.",
      canonical: `https://adlbusinesssolutions.com/freezone/not-found`
    });
  }

  const { meta, id, image } = freezone;

  return buildSEO({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonical: `https://adlbusinesssolutions.com/feezone/${id}`,
    type: "article",
    image: image,
  });
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
