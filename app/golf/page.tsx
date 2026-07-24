import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Palos de golf de segunda mano | ATHMOV",

  description:
    "Compra y vende palos de golf premium de segunda mano. Drivers, hierros, wedges, putters y bolsas de marcas como TaylorMade, Callaway, Ping y Titleist.",

  alternates: {
    canonical: "https://athmov.com/golf",
  },

  openGraph: {
    title: "Palos de golf de segunda mano | ATHMOV",
    description:
      "Descubre material de golf premium de segunda mano con pagos seguros y protección al comprador.",
    url: "https://athmov.com/golf",
    siteName: "ATHMOV",
    type: "website",
  },
};

export default function GolfPage() {
  return (
    <Suspense fallback={<main>Cargando productos de golf...</main>}>
      <ProductsClient fixedCategory="Golf" />
    </Suspense>
  );
}