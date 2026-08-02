import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
      <section className="model-hero">
        <nav
          className="model-breadcrumb"
          aria-label="Migas de pan"
        >
          <Link href="/">Inicio</Link>
          <span>›</span>

         <Link href={categoryHref}>
  {modelData.category}
</Link>
<span>›</span>

          <Link
            href={`/brands/${slugify(modelData.brand)}`}
          >
            {modelData.brand}
          </Link>

          <span>›</span>
          <span>{modelData.model}</span>
        </nav>

        <p className="model-eyebrow">
          ATHMOV · MODELOS
        </p>

        <h1>
          {modelData.brand} {modelData.model}
          <br />
          de segunda mano
        </h1>

        <p className="model-description">
          Explora los anuncios disponibles de{" "}
          {modelData.brand} {modelData.model}, compara precios,
          condiciones y vendedores antes de comprar.
        </p>

        <div className="model-actions">
          <Link
            href={`/products?search=${encodeURIComponent(
              `${modelData.brand} ${modelData.model}`
            )}`}
            className="model-primary-button"
          >
            VER PRODUCTOS
          </Link>

          <Link
            href="/sell"
            className="model-secondary-button"
          >
            VENDER ESTE MODELO
          </Link>
        </div>
      </section>

      <section className="model-catalog">
        <div className="model-section-heading">
          <p className="model-eyebrow">
            PRODUCTOS DISPONIBLES
          </p>

          <h2>
            {modelData.brand} {modelData.model} en ATHMOV
          </h2>

          <p>
            {products.length === 1
              ? "Hay 1 producto disponible."
              : `Hay ${products.length} productos disponibles.`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="model-products-grid">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="model-product-card"
              >
                <div className="model-product-image">
                  <Image
                    src={
                      product.image?.startsWith("http") ||
                      product.image?.startsWith("/")
                        ? product.image
                        : "/logo.png"
                    }
                    alt={product.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>

                <div className="model-product-content">
                  <p className="model-product-brand">
                    {product.brand} · {product.model}
                  </p>

                  <h3>{product.title}</h3>

                  <div className="model-product-footer">
                    <span>
                      {product.condition || "Estado no indicado"}
                    </span>

                    <strong>
                      {Number(product.price).toLocaleString(
                        "es-ES",
                        {
                          style: "currency",
                          currency: "EUR",
                        }
                      )}
                    </strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="model-empty-state">
            <h3>
              Todavía no hay unidades disponibles
            </h3>

            <p>
              Puedes explorar otros productos de{" "}
              {modelData.brand} o publicar el tuyo.
            </p>

            <div className="model-actions model-empty-actions">
              <Link
                href={`/brands/${slugify(modelData.brand)}`}
                className="model-primary-button"
              >
                VER {modelData.brand.toUpperCase()}
              </Link>

              <Link
                href="/sell"
                className="model-secondary-button"
              >
                PUBLICAR PRODUCTO
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="model-faq">
  <div className="model-section-heading">
    <p className="model-eyebrow">PREGUNTAS FRECUENTES</p>

    <h2>
      Comprar {modelData.brand} {modelData.model} de segunda mano
    </h2>
  </div>

  <div className="model-faq-list">
    {faqItems.map((item) => (
      <details key={item.question} className="model-faq-item">
        <summary>{item.question}</summary>
        <p>{item.answer}</p>
      </details>
    ))}
  </div>
</section>

      <style>{`

      .model-faq {
  width: 100%;
  max-width: 1200px;
  margin: 90px auto 0;
}

.model-faq-list {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.model-faq-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.model-faq-item summary {
  position: relative;
  padding: 25px 45px 25px 0;
  cursor: pointer;
  list-style: none;
  font-size: 19px;
  font-weight: 800;
}

.model-faq-item summary::-webkit-details-marker {
  display: none;
}

.model-faq-item summary::after {
  position: absolute;
  top: 21px;
  right: 4px;
  content: "+";
  color: #a58d5a;
  font-size: 27px;
}

.model-faq-item[open] summary::after {
  content: "−";
}

.model-faq-item p {
  max-width: 850px;
  margin: 0;
  padding: 0 0 28px;
  color: #666;
  line-height: 1.8;
}
        .model-page {
          min-height: 100vh;
          padding: 140px 40px 90px;
          background: #f7f5f0;
          color: #111;
        }

        .model-hero,
        .model-catalog {
          width: 100%;
          max-width: 1200px;
          margin-right: auto;
          margin-left: auto;
        }

        .model-hero {
          margin-bottom: 90px;
        }

        .model-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          align-items: center;
          margin-bottom: 34px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .model-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .model-breadcrumb a:hover {
          color: #111;
        }

        .model-eyebrow {
          margin: 0 0 15px;
          color: #a58d5a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .model-hero h1 {
          max-width: 1000px;
          margin: 0;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 600;
          line-height: 0.97;
          letter-spacing: -5px;
        }

        .model-description {
          max-width: 760px;
          margin: 28px 0 0;
          color: #666;
          font-size: 19px;
          line-height: 1.8;
        }

        .model-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .model-primary-button,
        .model-secondary-button {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .model-primary-button {
          background: #111;
          color: #fff;
        }

        .model-secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.13);
          background: #fff;
          color: #111;
        }

        .model-section-heading {
          margin-bottom: 30px;
        }

        .model-section-heading h2 {
          max-width: 850px;
          margin: 0;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2.5px;
        }

        .model-section-heading > p:last-child {
          margin: 16px 0 0;
          color: #666;
        }

        .model-products-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .model-product-card {
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .model-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.09);
        }

        .model-product-image {
          position: relative;
          height: 330px;
          background: #f3f3ef;
        }

        .model-product-image img {
          object-fit: contain;
          padding: 20px;
        }

        .model-product-content {
          padding: 24px;
        }

        .model-product-brand {
          margin: 0 0 10px;
          color: #a58d5a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .model-product-content h3 {
          margin: 0;
          font-size: 22px;
          line-height: 1.25;
          letter-spacing: -0.5px;
        }

        .model-product-footer {
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .model-product-footer span {
          color: #777;
          font-size: 12px;
        }

        .model-product-footer strong {
          font-size: 18px;
        }

        .model-empty-state {
          padding: 60px 30px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 30px;
          background: #fff;
          text-align: center;
        }

        .model-empty-state h3 {
          margin: 0;
          font-size: 30px;
          letter-spacing: -1px;
        }

        .model-empty-state p {
          margin: 14px 0 0;
          color: #666;
          line-height: 1.7;
        }

        .model-empty-actions {
          justify-content: center;
        }

        @media (max-width: 900px) {
          .model-products-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .model-page {
            padding: 115px 20px 65px;
          }

          .model-hero h1 {
            letter-spacing: -3px;
          }

          .model-products-grid {
            grid-template-columns: 1fr;
          }

          .model-product-image {
            height: 300px;
          }
        }

        @media (max-width: 520px) {
          .model-actions {
            flex-direction: column;
          }

          .model-primary-button,
          .model-secondary-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}