import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "../components/LanguageProvider";

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://athmov.com"),

  applicationName: "ATHMOV",
  category: "Sports Marketplace",
  referrer: "origin-when-cross-origin",

  title: {
    default:
      "ATHMOV | Marketplace de material deportivo premium de segunda mano",
    template: "%s | ATHMOV",
  },

  description:
    "Compra y vende material deportivo premium de segunda mano. Palas de pádel, palos de golf, raquetas de tenis y equipamiento de running verificado.",

  keywords: [
    "material deportivo segunda mano",
    "palas de pádel segunda mano",
    "palos de golf segunda mano",
    "raquetas de tenis segunda mano",
    "running segunda mano",
    "marketplace deportivo",
    "ATHMOV",
  ],

  authors: [
    {
      name: "ATHMOV",
      url: "https://athmov.com",
    },
  ],

  creator: "ATHMOV",
  publisher: "ATHMOV",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://athmov.com",
  },

  openGraph: {
    title:
      "ATHMOV | Marketplace de material deportivo premium de segunda mano",
    description:
      "Compra y vende palas de pádel, palos de golf, raquetas de tenis y material de running premium de segunda mano.",
    url: "https://athmov.com",
    siteName: "ATHMOV",
    locale: "es_ES",
    type: "website",
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
      "ATHMOV | Marketplace de material deportivo premium de segunda mano",
    description:
      "Compra y vende palas de pádel, palos de golf, raquetas de tenis y material de running premium de segunda mano.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ATHMOV",
  url: "https://athmov.com",
  logo: "https://athmov.com/logo.png",
  email: "contact@athmov.com",
  sameAs: [
    "https://www.instagram.com/athmovofficial",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ATHMOV",
  url: "https://athmov.com",
  inLanguage: ["es", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://athmov.com/products?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
  return (
    <html lang="es">
   <body>
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

  <LanguageProvider>
    <Navbar />
    {children}
  </LanguageProvider>

  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ATHMOV",
        url: "https://athmov.com",
        logo: "https://athmov.com/logo.png",
        description:
          "Marketplace de material deportivo premium de segunda mano.",
        sameAs: [
          "https://www.instagram.com/athmov"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ATHMOV",
        url: "https://athmov.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://athmov.com/products?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]),
  }}
/>
</body>
    </html>
  );
}