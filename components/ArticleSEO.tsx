type ArticleSEOProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  category?: "golf" | "padel" | "tenis" | "running";
};

const categoryLabels = {
  golf: "Golf",
  padel: "Pádel",
  tenis: "Tenis",
  running: "Running",
};

export default function ArticleSEO({
  title,
  description,
  image,
  url,
  category,
}: ArticleSEOProps) {
  const fullUrl = `https://athmov.com${url}`;
  const fullImage = image.startsWith("http")
    ? image
    : `https://athmov.com${image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: fullImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    author: {
      "@type": "Organization",
      name: "ATHMOV",
    },
    publisher: {
      "@type": "Organization",
      name: "ATHMOV",
      logo: {
        "@type": "ImageObject",
        url: "https://athmov.com/favicon.png",
      },
    },
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://athmov.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://athmov.com/blog",
    },
    ...(category
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: categoryLabels[category],
            item: `https://athmov.com/blog/${category}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: title,
            item: fullUrl,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: fullUrl,
          },
        ]),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}