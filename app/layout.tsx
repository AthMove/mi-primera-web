import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://athmov.com"),

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
    },
  ],

  creator: "ATHMOV",
  publisher: "ATHMOV",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://athmov.com",
  },

  openGraph: {
    title: "ATHMOV",
    description:
      "Marketplace de material deportivo premium de segunda mano.",
    url: "https://athmov.com",
    siteName: "ATHMOV",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ATHMOV",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ATHMOV",
    description:
      "Marketplace de material deportivo premium de segunda mano.",
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
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}