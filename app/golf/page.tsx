import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

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

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palos de golf de segunda mano",
  url: golfUrl,
  description:
    "Selección de palos y material de golf premium de segunda mano disponible en ATHMOV.",
  inLanguage: "es",
  isPartOf: {
    "@type": "WebSite",
    name: "ATHMOV",
    url: "https://athmov.com",
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

export default function GolfPage() {
  return (
    <>
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

      <Suspense
        fallback={
          <main aria-live="polite">
            Cargando productos de golf...
          </main>
        }
      >
        <ProductsClient fixedCategory="GOLF" />
      </Suspense>
    </>
  );
}