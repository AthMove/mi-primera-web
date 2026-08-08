import type { Metadata } from "next";
import PadelPageClient from "@/components/padel/PadelPageClient";

export const metadata: Metadata = {
  title: "Palas de pádel de segunda mano | ATHMOV",
  description:
    "Compra y vende palas de pádel premium de segunda mano. Encuentra modelos de Bullpadel, Nox, Adidas, Head, Siux, Babolat y Wilson con protección al comprador.",
  alternates: {
    canonical: "https://athmov.com/padel",
  },
  openGraph: {
    title: "Palas de pádel de segunda mano | ATHMOV",
    description:
      "Descubre palas de pádel premium de segunda mano, compara marcas y revisa guías de compra antes de elegir.",
    url: "https://athmov.com/padel",
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palas de pádel de segunda mano | ATHMOV",
    description:
      "Compra y vende palas de pádel premium de segunda mano en ATHMOV.",
  },
};

const popularBrands = [
  {
    name: "Bullpadel",
    href: "/brands/bullpadel",
    text: "Vertex, Hack, Elite, Neuron y otras gamas premium.",
  },
  {
    name: "Nox",
    href: "/brands/nox",
    text: "AT10, ML10, LA10, VK10 y modelos para distintos niveles.",
  },
  {
    name: "Adidas",
    href: "/brands/adidas",
    text: "Palas de potencia, control y gamas profesionales.",
  },
  {
    name: "Head",
    href: "/brands/head",
    text: "Modelos conocidos por su equilibrio, tecnología y manejabilidad.",
  },
  {
    name: "Siux",
    href: "/brands/siux",
    text: "Palas orientadas a jugadores avanzados y competición.",
  },
  {
    name: "Babolat",
    href: "/brands/babolat",
    text: "Gamas técnicas con opciones de potencia y control.",
  },
];

const buyingTips = [
  {
    number: "01",
    title: "Revisa el marco",
    text: "Busca grietas, golpes profundos, reparaciones o zonas blandas alrededor del perímetro.",
  },
  {
    number: "02",
    title: "Comprueba las caras",
    text: "Examina la superficie, la rugosidad, el carbono y posibles daños cerca de los agujeros.",
  },
  {
    number: "03",
    title: "Verifica el peso",
    text: "Compara el peso real con el rango oficial del modelo y ten en cuenta los protectores añadidos.",
  },
  {
    number: "04",
    title: "Confirma el modelo",
    text: "Revisa colores, logotipos, acabados, número de serie y detalles de fabricación.",
  },
];

const relatedGuides = [
  {
    title:
      "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",
    href: "/blog/bullpadel-vertex-04-segunda-mano",
  },
  {
    title: "Cómo detectar una pala de pádel falsa",
    href: "/blog/como-detectar-pala-padel-falsa",
  },
  {
    title: "Cómo valorar una pala de pádel de segunda mano",
    href: "/blog/como-valorar-pala-padel-segunda-mano",
  },
];

const faqItems = [
  {
    question: "¿Es seguro comprar una pala de pádel de segunda mano?",
    answer:
      "Puede ser una buena compra cuando el anuncio incluye fotografías detalladas, una descripción precisa y un precio coherente con el estado de la pala. Conviene revisar marco, caras, puente, peso y posibles reparaciones.",
  },
  {
    question: "¿Qué marcas de pádel mantienen mejor su valor?",
    answer:
      "Las gamas premium de marcas como Bullpadel, Nox, Head, Adidas o Siux suelen mantener mejor su valor cuando el modelo tiene demanda y la pala está bien conservada.",
  },
  {
    question: "¿Qué desgaste es aceptable en una pala usada?",
    answer:
      "Los pequeños roces superficiales pueden ser normales. Las grietas profundas, reparaciones estructurales, zonas blandas o daños en el puente requieren más precaución.",
  },
  {
    question: "¿Cómo puedo vender mi pala en ATHMOV?",
    answer:
      "Puedes crear un anuncio desde la sección Vender, añadir fotografías, indicar marca, modelo, estado y precio, y publicar el producto para que otros jugadores puedan encontrarlo.",
  },
];

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
      name: "Pádel",
      item: "https://athmov.com/padel",
    },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palas de pádel de segunda mano",
  url: "https://athmov.com/padel",
  description:
    "Selección de palas de pádel premium de segunda mano disponibles en ATHMOV.",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@type": "Thing",
    name: "Pádel",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PadelPage() {
  return (
    <main className="padel-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

     <PadelPageClient />

    </main>
  );
}