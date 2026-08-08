import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ModelPageClient from "@/components/model/ModelPageClient";

export const revalidate = 300;

type ModelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProductModelReference = {
  brand: string | null;
  model: string | null;
  category: string | null;
};

type Product = {
  id: string;
  title: string;
  slug: string | null;
  brand: string | null;
  model: string | null;
  category: string | null;
  condition: string | null;
  price: number;
  image: string | null;
};

type ModelData = {
  brand: string;
  model: string;
  category: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Busca una combinación real de marca + modelo cuyo slug
 * coincida con la URL solicitada.
 *
 * Ejemplo:
 * Bullpadel + Vertex 04 → bullpadel-vertex-04
 */

function getCategoryHref(category: string) {
  switch (category.toUpperCase()) {
    case "PADEL":
      return "/padel";
    case "GOLF":
      return "/golf";
    case "TENIS":
      return "/tenis";
    case "RUNNING":
      return "/running";
    default:
      return "/products";
  }
}

async function getModelData(slug: string): Promise<ModelData | null> {
  const { data, error } = await supabase
    .from("products")
   .select("brand,model,category")
    .eq("moderation_status", "approved")
    .not("brand", "is", null)
    .not("model", "is", null);

  if (error) {
    console.error("Error buscando el modelo:", error);
    return null;
  }

  const matchingProduct = (
    (data || []) as ProductModelReference[]
  ).find((product) => {
    if (!product.brand || !product.model) return false;

    const productModelSlug = slugify(
      `${product.brand} ${product.model}`
    );

    return productModelSlug === slug;
  });

  if (!matchingProduct?.brand || !matchingProduct.model) {
    return null;
  }

return {
  brand: matchingProduct.brand.trim(),
  model: matchingProduct.model.trim(),
  category: matchingProduct.category?.trim() || "OTROS",
};
}

async function getModelProducts(
  brand: string,
  model: string
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,title,slug,brand,model,category,condition,price,image"
    )
    .eq("moderation_status", "approved")
    .eq("sold", false)
    .ilike("brand", brand)
    .ilike("model", model)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error cargando los productos:", error);
    return [];
  }

  return (data || []) as Product[];
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const modelData = await getModelData(normalizedSlug);

  if (!modelData) {
    return {
      title: "Modelo no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${modelData.brand} ${modelData.model} de segunda mano`;
  const description =
    `Compra y vende ${modelData.brand} ${modelData.model} de segunda mano. ` +
    "Consulta los productos disponibles, compara precios y revisa su estado en ATHMOV.";

  const canonical =
    `https://athmov.com/model/${normalizedSlug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${title} | ATHMOV`,
      description,
      url: canonical,
      siteName: "ATHMOV",
      type: "website",
      locale: "es_ES",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ATHMOV`,
      description,
    },
  };
}

export default async function ModelPage({
  params,
}: ModelPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const modelData = await getModelData(normalizedSlug);

  if (!modelData) {
    notFound();
  }

  const products = await getModelProducts(
    modelData.brand,
    modelData.model
  );

  const canonicalUrl =
  `https://athmov.com/model/${normalizedSlug}`;

const categoryHref = getCategoryHref(modelData.category);

const faqItems = [
  {
    question: `¿Es buena idea comprar ${modelData.brand} ${modelData.model} de segunda mano?`,
    answer:
      "Puede ser una buena opción si el producto está bien conservado, el precio es coherente y el anuncio incluye fotografías claras y una descripción precisa.",
  },
  {
    question: `¿Qué debo revisar antes de comprar ${modelData.brand} ${modelData.model}?`,
    answer:
      "Revisa el estado estructural, las zonas de desgaste, posibles reparaciones, la autenticidad y que las características coincidan con el modelo anunciado.",
  },
  {
    question: `¿Cómo vender ${modelData.brand} ${modelData.model} en ATHMOV?`,
    answer:
      "Puedes publicar el producto desde la sección Vender, indicando la marca, el modelo, el estado, el precio y añadiendo fotografías claras.",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${modelData.brand} ${modelData.model} de segunda mano`,
  url: canonicalUrl,
  description:
    `Productos ${modelData.brand} ${modelData.model} de segunda mano disponibles en ATHMOV.`,
  inLanguage: "es",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@type": "Product",
    name: `${modelData.brand} ${modelData.model}`,
    brand: {
      "@type": "Brand",
      name: modelData.brand,
    },
    category: modelData.category,
  },
};

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
      name: modelData.category,
      item: `https://athmov.com${categoryHref}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: modelData.brand,
      item: `https://athmov.com/brands/${slugify(modelData.brand)}`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: modelData.model,
      item: canonicalUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

  return (
    <main className="model-page">

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(collectionPageSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>
<ModelPageClient
  modelData={modelData}
  products={products}
  categoryHref={categoryHref}
/>
    </main>
  );
}