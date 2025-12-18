import { visaDetails } from "@/Datas/visaData";
import { getSeo } from "@/lib/api/apis";

export function generateStaticParams() {
  return visaDetails.map(item => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const visa = visaDetails.find(
    v => String(v.id) === String(params.id)
  );

  // ✅ SAFETY: visa not found
  if (!visa) {
    return {
      title: "UAE Visa Services | ADL Business Solutions",
      description:
        "Professional UAE visa services including employment, residency, and Golden Visa support.",
    };
  }

  try {
    const seo = await getSeo("visa", visa.id);

    if (!seo) throw new Error("SEO not found");

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    // ✅ NORMAL CASE: SEO missing (404)
    return {
      title: "UAE Employment Visa Processing | Work Visa UAE | ADL Business Solutions",
      description:
        "Fast and reliable UAE employment visa services. Work permit, medical, Emirates ID & residency stamping support.",
      keywords:
        "UAE work visa, Dubai employment visa, UAE labour visa, residency visa UAE",
    };
  }
}

export default function LicenseLayout({ children }) {
  return <>{children}</>;
}
