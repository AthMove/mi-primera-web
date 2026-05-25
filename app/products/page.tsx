import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<main>Loading products...</main>}>
      <ProductsClient />
    </Suspense>
  );
}