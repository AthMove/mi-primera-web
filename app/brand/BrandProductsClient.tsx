"use client";

import ProductsClient from "@/app/products/ProductsClient";

interface Props {
  brand: string;
}

export default function BrandProductsClient({
  brand,
}: Props) {
  return (
    <ProductsClient
      fixedBrand={brand}
    />
  );
}