export function buildSEO({ 
  title, 
  description, 
  keywords, 
  author = "ADL Business Solutions",
  robots = "index, follow",
  canonical,
  type = "website",     
  image = "/default-og.jpg"
}) {
  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords : (keywords ? keywords.split(",") : []),

    alternates: {
      canonical: canonical,
    },

    robots,

    openGraph: {
      title,
      description,
      url: canonical,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630
        }
      ],
      siteName: "ADL Business Solutions",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    authors: [{ name: author }],
  };
}
