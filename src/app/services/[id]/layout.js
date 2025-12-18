import { buildSEO } from "@/app/lib/seo";
import { serviceDetails } from "@/Datas/services";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return serviceDetails.map(item => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }) {
  const service = serviceDetails.find(
    s => String(s.id) === String(params.id)
  );

  if (!service) {
    return {
      title: "Service",
      description: "Service details",
    };
  }

  try {
    const seo = await getSeo("services", service.id);

    if (!seo) throw new Error("No SEO");

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error("SEO fetch failed (build-safe):", error);

    // ✅ FALLBACK (build never fails)
    return {
      title: "Business Setup in Dubai | ADL Business Solutions",
      description:
        "Start your business in Dubai with expert guidance from ADL Business Solutions.",
    };
  }
}



export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
