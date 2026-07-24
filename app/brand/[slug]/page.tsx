import type { Metadata } from "next";
import { Suspense } from "react";
import BrandProductsClient from "../BrandProductsClient";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const brands: Record<
  string,
  {
    name: string;
    description: string;
  }
> = {
  taylormade: {
    name: "TaylorMade",
    description:
      "Compra y vende material TaylorMade de segunda mano. Drivers, hierros, wedges y palos de golf premium con pagos seguros.",
  },
  callaway: {
    name: "Callaway",
    description:
      "Encuentra palos de golf Callaway de segunda mano en ATHMOV, con protección al comprador y vendedores verificados.",
  },
  ping: {
    name: "Ping",
    description:
      "Compra y vende material de golf Ping de segunda mano. Hierros, drivers, putters y más equipamiento premium.",
  },
  titleist: {
    name: "Titleist",
    description:
      "Descubre material Titleist de segunda mano en ATHMOV: palos de golf, wedges, drivers y equipamiento premium.",
  },
  bullpadel: {
    name: "Bullpadel",
    description:
      "Compra y vende palas Bullpadel de segunda mano con pagos seguros y protección al comprador.",
  },
  nox: {
    name: "Nox",
    description:
      "Encuentra palas Nox de segunda mano en ATHMOV. Modelos premium, vendedores verificados y pagos seguros.",
  },
  head: {
    name: "Head",
    description:
      "Compra y vende material Head de segunda mano para pádel y tenis con protección al comprador.",
  },
  wilson: {
    name: "Wilson",
    description:
      "Descubre raquetas Wilson de segunda mano y material deportivo premium en ATHMOV.",
  },
  babolat: {
    name: "Babolat",
    description:
      "Compra y vende raquetas Babolat de segunda mano con pagos seguros y protección al comprador.",
  },
  nike: {
    name: "Nike",
    description:
      "Encuentra zapatillas y material deportivo Nike de segunda mano en ATHMOV.",
  },
  asics: {
    name: "ASICS",
    description:
      "Compra y vende zapatillas ASICS de running de segunda mano con pagos seguros.",
  },
};

function getBrand(slug: string) {
  const normalizedSlug = slug.toLowerCase();

  return (
    brands[normalizedSlug] || {
      name: normalizedSlug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
      description:
        "Compra y vende material deportivo premium de segunda mano en ATHMOV.",
    }
  );
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);

  const title = `${brand.name} de segunda mano | ATHMOV`;
  const canonical = `https://athmov.com/brand/${slug.toLowerCase()}`;

  return {
    title,
    description: brand.description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description: brand.description,
      url: canonical,
      siteName: "ATHMOV",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: brand.description,
    },
  };
}

export default async function BrandPage({
  params,
}: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);

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
        name: "Marcas",
        item: "https://athmov.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brand.name,
        item: `https://athmov.com/brand/${slug.toLowerCase()}`,
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

      <Suspense fallback={<main>Cargando productos...</main>}>
        <BrandProductsClient brand={brand.name} />
      </Suspense>
    </>
  );
}