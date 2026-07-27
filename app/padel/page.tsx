import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Palas de pádel de segunda mano | ATHMOV",

  description:
    "Compra y vende palas de pádel premium de segunda mano. Encuentra modelos de Bullpadel, Nox, Adidas, Head y otras marcas con pagos seguros.",

  alternates: {
    canonical: "https://athmov.com/padel",
  },

  openGraph: {
    title: "Palas de pádel de segunda mano | ATHMOV",
    description:
      "Descubre palas de pádel premium de segunda mano con protección al comprador y vendedores verificados.",
    url: "https://athmov.com/padel",
    siteName: "ATHMOV",
    type: "website",
  },
};

export default function PadelPage() {
  return (
    <Suspense fallback={<main>Cargando productos de pádel...</main>}>
     <ProductsClient fixedCategory="PADEL" />
    </Suspense>
  );
}