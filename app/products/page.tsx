import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Material deportivo premium de segunda mano",

  description:
    "Compra y vende material deportivo premium de segunda mano. Pádel, golf, tenis y running con vendedores verificados.",

  alternates: {
    canonical: "https://athmov.com/products",
  },
};

export default function ProductsPage() {
  return (
   <Suspense
  fallback={
    <main
      style={{
        minHeight: "100vh",
        padding: "160px 24px 60px",
        textAlign: "center",
      }}
    >
      ATHMOV
    </main>
  }
>
  <ProductsClient />
</Suspense>
  );
}