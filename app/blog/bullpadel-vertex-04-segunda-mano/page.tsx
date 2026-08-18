import type { Metadata } from "next";
import BullpadelVertex04ArticleClient from "@/components/blog/BullpadelVertex04ArticleClient";

const articleUrl =
  "https://athmov.com/blog/bullpadel-vertex-04-segunda-mano";

const articleImage =
  "https://athmov.com/blog/bullpadel-vertex-04/vertex-04-portada.jpg";

export const metadata: Metadata = {
  title:
    "Bullpadel Vertex 04 de segunda mano: guía para comprar con seguridad | ATHMOV",

  description:
    "Guía completa para comprar una Bullpadel Vertex 04 de segunda mano. Precios, estado, autenticidad y puntos que debes revisar antes de comprar.",

  keywords: [
    "Bullpadel Vertex 04 segunda mano",
    "Bullpadel Vertex 04 usada",
    "comprar pala Bullpadel usada",
    "pala de pádel segunda mano",
    "Bullpadel Vertex precio",
    "pala de pádel premium",
  ],

  alternates: {
    canonical: articleUrl,
  },

  openGraph: {
    title:
      "Bullpadel Vertex 04 de segunda mano: guía completa",
    description:
      "Qué revisar, cuánto pagar y cómo evitar falsificaciones al comprar una Bullpadel Vertex 04 usada.",
    url: articleUrl,
    siteName: "ATHMOV",
    type: "article",
    locale: "es_ES",

    images: [
      {
        url: articleImage,
        width: 1600,
        height: 1067,
        alt: "Bullpadel Vertex 04 de segunda mano",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bullpadel Vertex 04 de segunda mano",
    description:
      "Guía para comprar una Bullpadel Vertex 04 usada con mayor seguridad.",
    images: [articleImage],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",

  headline:
    "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",

  description:
    "Guía para revisar el estado, autenticidad y precio de una Bullpadel Vertex 04 de segunda mano.",

  image: [articleImage],

  datePublished: "2026-07-25",
  dateModified: "2026-07-25",

  author: {
    "@type": "Organization",
    name: "ATHMOV",
    url: "https://athmov.com",
  },

  publisher: {
    "@type": "Organization",
    name: "ATHMOV",

    logo: {
      "@type": "ImageObject",
      url: "https://athmov.com/logo.png",
    },
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Pádel",
      item: "https://athmov.com/blog/padel",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Bullpadel Vertex 04 de segunda mano",
      item: articleUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "¿Merece la pena comprar una Bullpadel Vertex 04 usada?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Sí, siempre que el estado estructural sea bueno y el vendedor aporte fotografías claras e información fiable sobre su procedencia.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Qué precio es razonable para una Bullpadel Vertex 04 usada?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Un rango entre 150 € y 220 € puede ser razonable para una unidad en buen estado, aunque el precio final dependerá del año, el desgaste y los accesorios incluidos.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Puede perder prestaciones una Bullpadel Vertex 04 con el tiempo?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Sí. El uso intensivo puede afectar al núcleo y a la respuesta de la pala. Sin embargo, una unidad bien cuidada puede mantener un rendimiento excelente durante mucho tiempo.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Los roces superficiales son siempre un problema?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Algunos roces son únicamente estéticos. Lo importante es distinguir una marca superficial de una grieta o daño estructural.",
      },
    },
  ],
};

export default function BullpadelVertex04Article() {
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <BullpadelVertex04ArticleClient />
    </>
  );
}