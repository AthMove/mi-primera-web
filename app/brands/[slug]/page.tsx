import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BrandPageClient from "@/components/brands/BrandPageClient";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface BrandConfig {
  name: string;
  description: string;
  categoryLabel: string;
  categoryHref: string;
  categoryBrandHref: string;
  intro: string[];
  models: string[];
  buyingTips: string[];
  relatedGuides: {
    title: string;
    href: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

const brands: Record<string, BrandConfig> = {
  bullpadel: {
    name: "Bullpadel",
    description:
      "Compra y vende palas Bullpadel de segunda mano. Encuentra modelos premium, compara precios y revisa su estado antes de comprar en ATHMOV.",
    categoryLabel: "Pádel",
    categoryHref: "/padel",
    categoryBrandHref: "/padel/bullpadel",
    intro: [
      "Bullpadel es una de las marcas más reconocidas dentro del pádel y cuenta con modelos dirigidos tanto a jugadores avanzados como a quienes buscan una pala equilibrada para mejorar su juego. Su presencia en competición y la popularidad de gamas como Vertex, Hack o Elite hacen que también exista una demanda elevada en el mercado de segunda mano.",
      "Comprar una pala Bullpadel usada puede ser una forma de acceder a modelos premium por un precio inferior al de una unidad nueva. Antes de elegir, conviene comprobar el estado del marco, las caras, el protector, el puente y la empuñadura, además de revisar posibles grietas, reparaciones o diferencias de peso.",
      "En ATHMOV puedes consultar anuncios de Bullpadel publicados por vendedores particulares, comparar modelos y acceder a guías específicas para valorar el precio y reducir el riesgo de falsificaciones.",
    ],
    models: [
      "Bullpadel Vertex",
      "Bullpadel Hack",
      "Bullpadel Elite",
      "Bullpadel Neuron",
      "Bullpadel Ionic",
      "Bullpadel Flow",
    ],
    buyingTips: [
      "Comprueba que no existan grietas profundas en el marco o en las caras.",
      "Revisa si la pala ha sido reparada y solicita fotografías de detalle.",
      "Compara el peso real con el rango indicado por el fabricante.",
      "Verifica logotipos, acabados, número de serie y diseño del modelo.",
      "Valora la antigüedad, el desgaste y la demanda antes de aceptar el precio.",
    ],
    relatedGuides: [
      {
        title:
          "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",
        href: "/blog/bullpadel-vertex-04-segunda-mano",
      },
      {
        title: "Cómo detectar una pala de pádel falsa",
        href: "/blog/como-detectar-pala-padel-falsa",
      },
      {
        title: "Cómo valorar una pala de pádel de segunda mano",
        href: "/blog/como-valorar-pala-padel-segunda-mano",
      },
    ],
    faq: [
      {
        question: "¿Cuánto cuesta una pala Bullpadel de segunda mano?",
        answer:
          "El precio depende del modelo, la antigüedad, el estado y la demanda. Las gamas premium bien conservadas suelen mantener mejor su valor que los modelos básicos o muy usados.",
      },
      {
        question: "¿Qué debo revisar antes de comprar una Bullpadel usada?",
        answer:
          "Revisa el marco, las caras, el protector, el puente, la empuñadura y cualquier grieta o reparación. También conviene comprobar el peso y confirmar que el diseño corresponde al modelo anunciado.",
      },
      {
        question: "¿Cómo puedo saber si una pala Bullpadel es original?",
        answer:
          "Compara los logotipos, acabados, peso, colores, número de serie y detalles de fabricación con la información oficial. Un precio excesivamente bajo puede ser una señal de alerta.",
      },
      {
        question: "¿Dónde comprar Bullpadel de segunda mano?",
        answer:
          "Puedes encontrar palas Bullpadel usadas en ATHMOV, donde los anuncios se organizan por marca y categoría para facilitar la comparación entre modelos.",
      },
    ],
  },

  nox: {
    name: "Nox",
    description:
      "Encuentra palas Nox de segunda mano en ATHMOV. Compara modelos premium, revisa su estado y compra con mayor seguridad.",
    categoryLabel: "Pádel",
    categoryHref: "/padel",
    categoryBrandHref: "/padel/nox",
    intro: [
      "Nox es una marca especializada en pádel con una presencia destacada entre jugadores aficionados y profesionales. Modelos como AT10, ML10 o LA10 son muy buscados por su combinación de control, potencia y manejabilidad.",
      "El mercado de segunda mano permite acceder a palas Nox de gamas altas por un precio más reducido, aunque es importante revisar el estado estructural y comprobar que el producto coincide con el modelo anunciado.",
      "En ATHMOV puedes explorar palas Nox usadas, comparar precios y consultar guías para comprar con más información.",
    ],
    models: [
      "Nox AT10",
      "Nox ML10",
      "Nox LA10",
      "Nox VK10",
      "Nox Equation",
      "Nox Tempo",
    ],
    buyingTips: [
      "Comprueba el estado del marco, las caras y el puente.",
      "Solicita fotografías claras de posibles golpes o reparaciones.",
      "Compara el peso y los acabados con los datos oficiales.",
      "Valora el año del modelo y la demanda existente.",
      "Desconfía de precios muy inferiores al mercado.",
    ],
    relatedGuides: [
      {
        title: "Cómo detectar una pala de pádel falsa",
        href: "/blog/como-detectar-pala-padel-falsa",
      },
      {
        title: "Cómo valorar una pala de pádel de segunda mano",
        href: "/blog/como-valorar-pala-padel-segunda-mano",
      },
    ],
    faq: [
      {
        question: "¿Qué modelos Nox son más buscados de segunda mano?",
        answer:
          "Entre los modelos más conocidos se encuentran las gamas AT10, ML10, LA10 y VK10, aunque la demanda puede variar según el año y la versión.",
      },
      {
        question: "¿Cómo revisar una pala Nox usada?",
        answer:
          "Examina el marco, las caras, el puente y la empuñadura. Comprueba también el peso, los acabados y cualquier indicio de reparación.",
      },
      {
        question: "¿Es seguro comprar una pala Nox de segunda mano?",
        answer:
          "Puede ser una buena compra cuando el anuncio incluye fotografías detalladas, una descripción precisa y un precio coherente con el estado del producto.",
      },
    ],
  },

  taylormade: {
    name: "TaylorMade",
    description:
      "Compra y vende material TaylorMade de segunda mano. Drivers, hierros, wedges y palos de golf premium disponibles en ATHMOV.",
    categoryLabel: "Golf",
    categoryHref: "/golf",
    categoryBrandHref: "/golf/taylormade",
    intro: [
      "TaylorMade es una de las marcas de golf más reconocidas del mercado, especialmente por sus drivers, hierros, maderas y wedges orientados a jugadores que buscan tecnología y rendimiento.",
      "Comprar material TaylorMade de segunda mano permite acceder a modelos recientes y gamas premium con un ahorro significativo respecto al precio nuevo.",
      "Antes de comprar, conviene verificar el estado de la cabeza, la cara, la varilla, el grip y el número de serie, además de comprobar que las especificaciones corresponden al jugador.",
    ],
    models: [
      "TaylorMade Qi10",
      "TaylorMade Stealth",
      "TaylorMade SIM",
      "TaylorMade P790",
      "TaylorMade Milled Grind",
      "TaylorMade Spider",
    ],
    buyingTips: [
      "Revisa la cara y la corona en busca de golpes o fisuras.",
      "Comprueba la varilla, flexibilidad y longitud.",
      "Verifica el número de serie y los acabados.",
      "Examina el grip y calcula si necesita sustitución.",
      "Confirma loft, lie y configuración antes de comprar.",
    ],
    relatedGuides: [
      {
        title: "Cómo verificar unos palos de golf originales",
        href: "/blog/verificar-palos-golf",
      },
      {
        title: "Cómo calcular el precio de palos de golf de segunda mano",
        href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
      },
      {
        title: "Cuándo comprar y vender palos de golf de segunda mano",
        href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
      },
    ],
    faq: [
      {
        question: "¿Qué revisar al comprar palos TaylorMade usados?",
        answer:
          "Comprueba el estado de la cabeza, la cara, la varilla y el grip. También debes confirmar el loft, el flex y la longitud del palo.",
      },
      {
        question: "¿Cómo saber si un palo TaylorMade es original?",
        answer:
          "Revisa el número de serie, la calidad de los acabados, los logotipos y las especificaciones. Compáralos con información e imágenes oficiales.",
      },
      {
        question: "¿Qué modelos TaylorMade mantienen mejor su valor?",
        answer:
          "Las gamas recientes de drivers, hierros premium y putters populares suelen conservar mejor su valor cuando están bien cuidadas.",
      },
    ],
  },
};

const defaultBrand: BrandConfig = {
  name: "",
  description:
    "Compra y vende material deportivo premium de segunda mano en ATHMOV.",
  categoryLabel: "Productos",
  categoryHref: "/products",
  categoryBrandHref: "/products",
  intro: [
    "Descubre material deportivo de segunda mano y compara productos publicados por vendedores particulares.",
    "Antes de comprar, revisa cuidadosamente el estado, las especificaciones, las fotografías y la descripción del anuncio.",
    "ATHMOV reúne material deportivo premium para que puedas encontrar nuevas oportunidades de compra y venta.",
  ],
  models: [],
  buyingTips: [
    "Revisa el estado general del producto.",
    "Solicita fotografías detalladas.",
    "Comprueba las especificaciones y el modelo exacto.",
    "Compara el precio con productos similares.",
    "Utiliza métodos de pago protegidos.",
  ],
  relatedGuides: [],
  faq: [
    {
      question: "¿Qué debo revisar antes de comprar material usado?",
      answer:
        "Comprueba el estado, las especificaciones, posibles reparaciones y que las fotografías correspondan con el producto anunciado.",
    },
    {
      question: "¿Cómo calcular el precio de un producto de segunda mano?",
      answer:
        "Ten en cuenta el precio nuevo, la antigüedad, el estado, la demanda y los precios de productos similares.",
    },
  ],
};

function formatBrandName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type BrandModelRow = {
  model: string | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getAvailableModels(brandName: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("model")
    .eq("moderation_status", "approved")
    .eq("sold", false)
    .ilike("brand", brandName)
    .not("model", "is", null);

  if (error) {
    console.error("Error cargando modelos de la marca:", error);
    return [];
  }

  const uniqueModels = new Map<string, string>();

  for (const item of (data || []) as BrandModelRow[]) {
    const model = item.model?.trim();

    if (!model) continue;

    const normalizedModel = slugify(model);

    if (!uniqueModels.has(normalizedModel)) {
      uniqueModels.set(normalizedModel, model);
    }
  }

  return Array.from(uniqueModels.values()).sort((a, b) =>
    a.localeCompare(b, "es", {
      sensitivity: "base",
    })
  );
}

function getBrand(slug: string): BrandConfig {
  const normalizedSlug = slug.toLowerCase();
  const brand = brands[normalizedSlug];

  if (brand) {
    return brand;
  }

  return {
    ...defaultBrand,
    name: formatBrandName(normalizedSlug),
    categoryBrandHref: `/brands/${normalizedSlug}`,
  };
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const brand = getBrand(normalizedSlug);
  const canonical = `https://athmov.com/brands/${normalizedSlug}`;
  const title = `${brand.name} de segunda mano | ATHMOV`;

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
  const normalizedSlug = slug.toLowerCase();
  const brand = getBrand(normalizedSlug);
 const pageUrl = `https://athmov.com/brands/${normalizedSlug}`;
 const availableModels = await getAvailableModels(brand.name);

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
        item: "https://athmov.com/brands",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brand.name,
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brand.name} de segunda mano`,
    description: brand.description,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "ATHMOV",
      url: "https://athmov.com",
    },
    about: {
      "@type": "Brand",
      name: brand.name,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

    return (
    <main className="brand-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <BrandPageClient
        brand={brand}
        availableModels={availableModels}
      />
    </main>
  );
}