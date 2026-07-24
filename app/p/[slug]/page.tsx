import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/products/[id]/ProductDetailClient";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("title, description, slug, image, images")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    return {
      title: "Producto no encontrado | ATHMOV",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : ["/logo.png"];

  return {
    title: `${product.title} | ATHMOV`,
    description:
      product.description ||
      `Compra ${product.title} de segunda mano en ATHMOV.`,
    alternates: {
      canonical: `/p/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | ATHMOV`,
      description:
        product.description ||
        `Compra ${product.title} de segunda mano en ATHMOV.`,
      type: "website",
      url: `/p/${product.slug}`,
      images: productImages.map((url: string) => ({
        url,
        alt: product.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ATHMOV`,
      description:
        product.description ||
        `Compra ${product.title} de segunda mano en ATHMOV.`,
      images: productImages,
    },
  };
}

export default async function ProductSeoPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    notFound();
  }

  return <ProductDetailClient productId={product.id} />;
}