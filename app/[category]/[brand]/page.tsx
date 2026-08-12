import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";
import ProductsLoading from "@/components/ProductsLoading";

interface CategoryBrandPageProps {
  params: Promise<{
    category: string;
    brand: string;
  }>;
}

const categoryNames: Record<string, string> = {
  padel: "PADEL",
  golf: "GOLF",
  tenis: "TENNIS",
  running: "RUNNING",
  fitness: "FITNESS",
};

const brandNames: Record<string, string> = {
  adidas: "Adidas",
  asics: "ASICS",
  babolat: "Babolat",
  bullpadel: "Bullpadel",
  callaway: "Callaway",
  head: "Head",
  joma: "Joma",
  mizuno: "Mizuno",
  nike: "Nike",
  nox: "Nox",
  ping: "Ping",
  siux: "Siux",
  tecnifibre: "Tecnifibre",
  titleist: "Titleist",
  taylormade: "TaylorMade",
  wilson: "Wilson",
  yonex: "Yonex",
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getCategoryName(slug: string) {
  return categoryNames[slug.toLowerCase()] || formatSlug(slug);
}

function getBrandName(slug: string) {
  return brandNames[slug.toLowerCase()] || formatSlug(slug);
}

export async function generateMetadata({
  params,
}: CategoryBrandPageProps): Promise<Metadata> {
  const { category, brand } = await params;

  const categoryName = getCategoryName(category);
  const brandName = getBrandName(brand);

  const title = `${brandName} de ${categoryName} de segunda mano | ATHMOV`;

  const description = `Compra y vende material ${brandName} de ${categoryName} de segunda mano en ATHMOV. Productos premium, pagos seguros y protección al comprador.`;

  const canonical = `https://athmov.com/${category.toLowerCase()}/${brand.toLowerCase()}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ATHMOV",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryBrandPage({
  params,
}: CategoryBrandPageProps) {
  const { category, brand } = await params;

  const categoryName = getCategoryName(category);
  const brandName = getBrandName(brand);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://athmov.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `https://athmov.com/${category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `https://athmov.com/${category.toLowerCase()}/${brand.toLowerCase()}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

     <Suspense fallback={<ProductsLoading />}>
        <ProductsClient
          fixedCategory={categoryName}
          fixedBrand={brandName}
        />
      </Suspense>
    </>
  );
}