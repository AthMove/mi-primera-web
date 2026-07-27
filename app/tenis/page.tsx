import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Raquetas de tenis de segunda mano | ATHMOV",

  description:
    "Compra y vende raquetas de tenis premium de segunda mano. Wilson, Babolat, Head, Yonex y otras marcas con pagos seguros.",

  alternates: {
    canonical: "https://athmov.com/tenis",
  },

  openGraph: {
    title: "Raquetas de tenis de segunda mano | ATHMOV",
    description:
      "Encuentra raquetas de tenis premium de segunda mano con protección al comprador.",
    url: "https://athmov.com/tenis",
    siteName: "ATHMOV",
    type: "website",
  },
};

export default function TenisPage() {
  return (
    <Suspense fallback={<main>Cargando productos de tenis...</main>}>
     <ProductsClient fixedCategory="TENNIS" />
    </Suspense>
  );
}