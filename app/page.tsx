import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";
import "./home.css";

const homeUrl = "https://athmov.com";
const homeImage = "https://athmov.com/og-image.jpg";

export const metadata: Metadata = {
  title: "Marketplace de material deportivo premium de segunda mano",

  description:
    "Compra y vende palas de pádel, palos de golf, raquetas de tenis y material de running premium de segunda mano con pagos seguros y vendedores verificados.",

  alternates: {
    canonical: homeUrl,
  },

  openGraph: {
    title:
      "ATHMOV | Material deportivo premium de segunda mano",
    description:
      "Compra y vende material de pádel, golf, tenis y running premium de segunda mano.",
    url: homeUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: homeImage,
        width: 1200,
        height: 630,
        alt: "ATHMOV, marketplace de material deportivo premium",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "ATHMOV | Material deportivo premium de segunda mano",
    description:
      "Compra y vende material de pádel, golf, tenis y running premium de segunda mano.",
    images: [homeImage],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name:
    "ATHMOV | Marketplace de material deportivo premium de segunda mano",
  url: homeUrl,
  description:
    "Compra y vende material deportivo premium de segunda mano de pádel, golf, tenis y running.",
  inLanguage: "es",
  isPartOf: {
    "@type": "WebSite",
    name: "ATHMOV",
    url: homeUrl,
  },
  about: {
    "@type": "Organization",
    name: "ATHMOV",
    url: homeUrl,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <HomeClient />
    </>
  );
}