import type { Metadata } from "next";
import GolfPageClient from "@/components/golf/GolfPageClient";

const golfUrl = "https://athmov.com/golf";
const golfImage = "https://athmov.com/og-image.jpg";

export const metadata: Metadata = {
  title: "Palos de golf de segunda mano",
  description:
    "Compra y vende palos de golf premium de segunda mano. Encuentra drivers, hierros, wedges, putters y bolsas de golf de marcas como TaylorMade, Callaway, Ping y Titleist.",
  keywords: [
    "palos de golf de segunda mano",
    "comprar palos de golf usados",
    "material de golf de segunda mano",
    "drivers de segunda mano",
    "hierros de golf de segunda mano",
    "wedges de segunda mano",
    "putters de segunda mano",
    "bolsas de golf de segunda mano",
    "TaylorMade segunda mano",
    "Callaway segunda mano",
    "Ping segunda mano",
    "Titleist segunda mano",
  ],
  alternates: {
    canonical: golfUrl,
  },
  openGraph: {
    title: "Palos de golf de segunda mano | ATHMOV",
    description:
      "Descubre material de golf premium de segunda mano con pagos seguros, vendedores verificados y protección al comprador.",
    url: golfUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: golfImage,
        width: 1200,
        height: 630,
        alt: "Palos y material de golf de segunda mano en ATHMOV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palos de golf de segunda mano | ATHMOV",
    description:
      "Compra y vende drivers, hierros, wedges, putters y bolsas de golf premium de segunda mano.",
    images: [golfImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const popularBrands = [
  {
    name: "TaylorMade",
    href: "/brands/taylormade",
    text: "Drivers, hierros P790, wedges y putters Spider.",
  },
  {
    name: "Callaway",
    href: "/brands/callaway",
    text: "Drivers, maderas, hierros y wedges de gamas premium.",
  },
  {
    name: "Titleist",
    href: "/brands/titleist",
    text: "Drivers, hierros, wedges Vokey y putters de alta gama.",
  },
  {
    name: "Ping",
    href: "/brands/ping",
    text: "Palos reconocidos por su tolerancia, ajuste y consistencia.",
  },
  {
    name: "Mizuno",
    href: "/brands/mizuno",
    text: "Hierros forjados y material orientado a jugadores exigentes.",
  },
  {
    name: "Cobra",
    href: "/brands/cobra",
    text: "Drivers, maderas e hierros con tecnologías de rendimiento.",
  },
];

const buyingTips = [
  {
    number: "01",
    title: "Revisa la cabeza",
    text: "Comprueba la cara, la corona, la suela y posibles golpes, fisuras o reparaciones.",
  },
  {
    number: "02",
    title: "Comprueba la varilla",
    text: "Verifica el flex, la longitud, el peso y que no existan grietas o daños visibles.",
  },
  {
    number: "03",
    title: "Confirma las medidas",
    text: "Revisa loft, lie, longitud y configuración para asegurar que encajan con tu juego.",
  },
  {
    number: "04",
    title: "Verifica la autenticidad",
    text: "Examina número de serie, logotipos, acabados y especificaciones del modelo.",
  },
];

const relatedGuides = [
  {
    title: "Cómo verificar unos palos de golf originales",
    href: "/blog/verificar-palos-golf",
  },
  {
    title: "Cómo calcular el precio de palos de golf de segunda mano",
    href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
  },
  {
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
  },
  {
    title: "Qué revisar antes de comprar un driver de segunda mano",
    href: "/blog/que-revisar-driver-golf-segunda-mano",
  },
  {
    title: "Qué revisar antes de comprar unos hierros usados",
    href: "/blog/que-revisar-hierros-golf-segunda-mano",
  },
  {
    title: "Los mejores campos de golf de España",
    href: "/blog/mejores-campos-golf-espana",
  },
];

const faqItems = [
  {
    question: "¿Es buena idea comprar palos de golf de segunda mano?",
    answer:
      "Puede ser una excelente opción para acceder a material premium con un coste inferior. Antes de comprar conviene revisar la cabeza, la varilla, el grip, las medidas y la autenticidad.",
  },
  {
    question: "¿Qué debo revisar en un driver usado?",
    answer:
      "Examina la cara, la corona, la suela, el hosel y la varilla. Comprueba también el loft, el flex y si incluye la llave o el adaptador correspondiente.",
  },
  {
    question: "¿Cómo saber si unos palos de golf son originales?",
    answer:
      "Compara los números de serie, logotipos, grabados, acabados y especificaciones con la información oficial del fabricante. Los precios anormalmente bajos pueden ser una señal de alerta.",
  },
  {
    question: "¿Qué marcas de golf mantienen mejor su valor?",
    answer:
      "Las gamas premium de marcas como TaylorMade, Callaway, Titleist, Ping y Mizuno suelen conservar mejor su valor cuando el modelo tiene demanda y está bien cuidado.",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palos de golf de segunda mano",
  url: golfUrl,
  description:
    "Selección de palos y material de golf premium de segunda mano disponible en ATHMOV.",
  inLanguage: "es",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@type": "Thing",
    name: "Material de golf de segunda mano",
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
      name: "Golf",
      item: golfUrl,
    },
  ],
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

export default function GolfPage() {
  return (
    <main className="golf-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
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

  <GolfPageClient />

    
    </main>
  );
}