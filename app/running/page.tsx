import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Zapatillas de running de segunda mano | ATHMOV",

  description:
    "Compra y vende zapatillas y material de running premium de segunda mano. Nike, ASICS, Adidas, Hoka y otras marcas con pagos seguros.",

  alternates: {
    canonical: "https://athmov.com/running",
  },

  openGraph: {
    title: "Zapatillas de running de segunda mano | ATHMOV",
    description:
      "Descubre zapatillas y material premium de running de segunda mano con protección al comprador.",
    url: "https://athmov.com/running",
    siteName: "ATHMOV",
    type: "website",
  },
};

export default function RunningPage() {
  return (
    <Suspense fallback={<main>Cargando productos de running...</main>}>
     <ProductsClient fixedCategory="RUNNING" />
    </Suspense>
  );
}