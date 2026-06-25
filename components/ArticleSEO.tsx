export default function ArticleSEO({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  const fullUrl = `https://athmov.com${url}`;
  const fullImage = image.startsWith("http")
    ? image
    : `https://athmov.com${image}`;

  const schema = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}