import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        title,
        description,
        price,
        original_price,
        brand,
        category,
        condition,
        image,
        images,
        location,
        sold,
        moderation_status
      `
    )
    .eq("id", id)
    .eq("moderation_status", "approved")
    .maybeSingle();

  if (error) {
    console.error("Error obteniendo producto para SEO:", error);
    return null;
  }

  return data;
}

function getCategoryUrl(category?: string) {
  const normalizedCategory = String(category || "").toLowerCase();

  if (normalizedCategory.includes("golf")) return "/golf";
  if (
    normalizedCategory.includes("pádel") ||
    normalizedCategory.includes("padel")
  ) {
    return "/padel";
  }

  if (
    normalizedCategory.includes("tenis") ||
    normalizedCategory.includes("tennis")
  ) {
    return "/tenis";
  }

  if (normalizedCategory.includes("running")) return "/running";

  return "/products";
}

function getProductImage(product: any) {
  const firstImage =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : product?.image;

  if (!firstImage) {
    return "https://athmov.com/og-image.jpg";
  }

  if (firstImage.startsWith("http")) {
    return firstImage;
  }

  return `https://athmov.com${firstImage}`;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Producto no encontrado | ATHMOV",
      description:
        "Este producto ya no está disponible en el marketplace de ATHMOV.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${product.title} de segunda mano | ATHMOV`;

  const description =
    product.description?.slice(0, 155) ||
    `Compra ${product.title} de ${product.brand || "marca premium"} de segunda mano en ATHMOV con pago seguro y protección al comprador.`;

  const canonical = `https://athmov.com/products/${product.id}`;
  const image = getProductImage(product);

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
      images: [
        {
          url: image,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: !product.sold,
      follow: true,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  const canonicalUrl = `https://athmov.com/products/${id}`;

  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description:
          product.description ||
          `${product.title} disponible en ATHMOV.`,
        image: [getProductImage(product)],
        sku: product.id,

        brand: product.brand
          ? {
              "@type": "Brand",
              name: product.brand,
            }
          : undefined,

        itemCondition: getSchemaCondition(product.condition),

        offers: {
          "@type": "Offer",
          url: canonicalUrl,
          priceCurrency: "EUR",
          price: Number(product.price).toFixed(2),
          availability: product.sold
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
          itemCondition: getSchemaCondition(product.condition),
        },
      }
    : null;

  const categoryUrl = product
    ? getCategoryUrl(product.category)
    : "/products";

  const breadcrumbSchema = product
    ? {
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
            name: product.category || "Productos",
            item: `https://athmov.com${categoryUrl}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.title,
            item: canonicalUrl,
          },
        ],
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      )}

      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}

      <ProductDetailClient />
    </>
  );
}

function getSchemaCondition(condition?: string) {
  switch (condition) {
    case "New":
      return "https://schema.org/NewCondition";

    case "Like new":
    case "Excellent":
    case "Good":
    case "Used":
      return "https://schema.org/UsedCondition";

    default:
      return "https://schema.org/UsedCondition";
  }
}