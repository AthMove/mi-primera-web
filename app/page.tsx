import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";
import "./home.css";

export const metadata: Metadata = {
  title:
    "Marketplace de material deportivo premium de segunda mano",

  description:
    "Compra y vende palas de pádel, palos de golf, raquetas de tenis y material de running premium de segunda mano con pagos seguros y vendedores verificados.",

  alternates: {
    canonical: "https://athmov.com",
  },

  openGraph: {
    title:
      "ATHMOV | Material deportivo premium de segunda mano",

    description:
      "Compra y vende material de pádel, golf, tenis y running premium de segunda mano.",

    url: "https://athmov.com",

    images: [
      {
        url: "/og-image.jpg",
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

    images: ["/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ATHMOV",
  url: "https://athmov.com",
  logo: "https://athmov.com/logo.png",
  description:
    "Marketplace de material deportivo premium de segunda mano.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@athmov.com",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ATHMOV",
  url: "https://athmov.com",
  description:
    "Marketplace de material deportivo premium de segunda mano.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://athmov.com/products?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <HomeClient />
    </>
  );
}