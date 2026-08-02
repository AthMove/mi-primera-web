import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BrandProductsClient from "../BrandProductsClient";
import { supabase } from "@/lib/supabase";

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

      <section className="brand-hero">
        <nav className="breadcrumb" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <Link href="/brands">Marcas</Link>
          <span>›</span>
          <span>{brand.name}</span>
        </nav>

        <p className="eyebrow">ATHMOV · MARCAS</p>

        <h1>{brand.name} de segunda mano</h1>

        <p className="hero-description">{brand.description}</p>

        <div className="hero-actions">
          <Link href={brand.categoryBrandHref} className="primary-button">
            Ver productos {brand.name}
          </Link>

          <Link href="/sell" className="secondary-button">
            Vender material
          </Link>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-heading">
          <p className="eyebrow">GUÍA DE MARCA</p>
          <h2>Comprar {brand.name} de segunda mano</h2>
        </div>

        <div className="intro-grid">
          {brand.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">PRODUCTOS DISPONIBLES</p>
            <h2>Material {brand.name} publicado en ATHMOV</h2>
          </div>

          <Link href={brand.categoryHref} className="text-link">
            Ver todo {brand.categoryLabel} →
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="loading-box">
              Cargando productos {brand.name}...
            </div>
          }
        >
          <BrandProductsClient brand={brand.name} />
        </Suspense>
      </section>

    {availableModels.length > 0 && (
  <section className="models-section">
    <div className="section-heading">
      <p className="eyebrow">MODELOS DISPONIBLES</p>

      <h2>
        Modelos {brand.name} publicados en ATHMOV
      </h2>
    </div>

    <div className="models-grid">
      {availableModels.map((model) => {
        const modelSlug = slugify(`${brand.name} ${model}`);

        return (
          <Link
            key={modelSlug}
            href={`/model/${modelSlug}`}
            className="model-card"
          >
            <span>{brand.name}</span>
            <h3>{model}</h3>
            <strong>Ver productos →</strong>
          </Link>
        );
      })}
    </div>
  </section>
)}

      <section className="tips-section">
        <div className="section-heading">
          <p className="eyebrow">ANTES DE COMPRAR</p>
          <h2>Qué revisar en un producto {brand.name} usado</h2>
        </div>

        <div className="tips-grid">
          {brand.buyingTips.map((tip, index) => (
            <article key={tip} className="tip-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{tip}</p>
            </article>
          ))}
        </div>
      </section>

      {brand.relatedGuides.length > 0 && (
        <section className="guides-section">
          <div className="section-heading">
            <p className="eyebrow">GUÍAS ATHMOV</p>
            <h2>Aprende antes de comprar</h2>
          </div>

          <div className="guides-grid">
            {brand.relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="guide-card"
              >
                <span>GUÍA</span>
                <h3>{guide.title}</h3>
                <p>Leer artículo →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="faq-section">
        <div className="section-heading">
          <p className="eyebrow">PREGUNTAS FRECUENTES</p>
          <h2>{brand.name} de segunda mano</h2>
        </div>

        <div className="faq-list">
          {brand.faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">THE GAME CONTINUES</p>
        <h2>Compra y vende {brand.name} en ATHMOV</h2>

        <p>
          Encuentra material deportivo premium de segunda mano o publica el que
          ya no utilizas.
        </p>

        <div className="hero-actions">
          <Link href={brand.categoryBrandHref} className="cta-primary">
            Explorar {brand.name}
          </Link>

          <Link href="/sell" className="cta-secondary">
            Publicar producto
          </Link>
        </div>
      </section>

      <style>{`
        .brand-page {
          min-height: 100vh;
          padding: 130px 40px 90px;
          background: #f7f5f0;
          color: #111;
          font-family: Inter, sans-serif;
        }

        .brand-hero,
        .intro-section,
        .catalog-section,
        .models-section,
        .tips-section,
        .guides-section,
        .faq-section,
        .final-cta {
          max-width: 1200px;
          margin-right: auto;
          margin-left: auto;
        }

        .brand-hero {
          margin-bottom: 72px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 36px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #111;
        }

        .eyebrow {
          margin: 0 0 14px;
          color: #a9946d;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .brand-hero h1 {
          max-width: 940px;
          margin: 0;
          font-size: clamp(52px, 8vw, 82px);
          font-weight: 600;
          line-height: 0.98;
          letter-spacing: -4px;
        }

        .hero-description {
          max-width: 760px;
          margin: 26px 0 0;
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .primary-button,
        .secondary-button,
        .cta-primary,
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 49px;
          padding: 0 23px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .primary-button,
        .cta-primary {
          background: #111;
          color: #fff;
        }

        .secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #fff;
          color: #111;
        }

        .primary-button:hover,
        .secondary-button:hover,
        .cta-primary:hover,
        .cta-secondary:hover {
          transform: translateY(-2px);
        }

        .intro-section,
        .models-section,
        .tips-section,
        .guides-section,
        .faq-section {
          margin-bottom: 84px;
        }

        .intro-section {
          padding: 42px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.62);
        }

        .section-heading {
          margin-bottom: 28px;
        }

        .section-heading h2,
        .catalog-heading h2,
        .final-cta h2 {
          max-width: 850px;
          margin: 0;
          font-size: clamp(34px, 5vw, 48px);
          line-height: 1.08;
          letter-spacing: -2px;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
        }

        .intro-grid p {
          margin: 0;
          color: #626262;
          font-size: 16px;
          line-height: 1.85;
        }

        .catalog-section {
          margin-bottom: 84px;
        }

        .catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 26px;
        }

        .text-link {
          padding-bottom: 5px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .loading-box {
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .model-card {
  display: flex;
  min-height: 145px;
  flex-direction: column;
  padding: 26px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 26px;
  background: #fff;
  color: #111;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.model-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.08);
}

.model-card strong {
  margin-top: auto;
  padding-top: 24px;
  font-size: 12px;
}

        .model-card span,
        .guide-card span {
          color: #a9946d;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .model-card h3 {
          margin: 18px 0 0;
          font-size: 25px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .tip-card {
          min-height: 210px;
          padding: 24px;
          border-radius: 25px;
          background: #111;
          color: #fff;
        }

        .tip-card span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .tip-card p {
          margin: 52px 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          line-height: 1.65;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .guide-card {
          display: flex;
          min-height: 260px;
          flex-direction: column;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.08);
        }

        .guide-card h3 {
          margin: 18px 0 0;
          font-size: 27px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .guide-card p {
          margin: auto 0 0;
          padding-top: 28px;
          color: #555;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item summary {
          position: relative;
          padding: 25px 44px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.4;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary::after {
          position: absolute;
          top: 24px;
          right: 4px;
          content: "+";
          color: #a9946d;
          font-size: 25px;
          font-weight: 400;
        }

        .faq-item[open] summary::after {
          content: "−";
        }

        .faq-item p {
          max-width: 850px;
          margin: 0;
          padding: 0 0 27px;
          color: #666;
          line-height: 1.8;
        }

        .final-cta {
          padding: 58px;
          border-radius: 38px;
          background: #0f0e0c;
          color: #fff;
          text-align: center;
        }

        .final-cta h2 {
          margin-right: auto;
          margin-left: auto;
        }

        .final-cta > p:not(.eyebrow) {
          max-width: 660px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .final-cta .hero-actions {
          justify-content: center;
        }

        .final-cta .cta-primary {
          background: #fff;
          color: #111;
        }

        .final-cta .cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
        }

        @media (max-width: 980px) {
          .intro-grid {
            grid-template-columns: 1fr;
          }

          .models-grid,
          .guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .brand-page {
            padding: 110px 22px 70px;
          }

          .brand-hero h1 {
            letter-spacing: -2.5px;
          }

          .intro-section,
          .final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .models-grid,
          .tips-grid,
          .guides-grid {
            grid-template-columns: 1fr;
          }

          .tip-card {
            min-height: 165px;
          }

          .tip-card p {
            margin-top: 34px;
          }

          .final-cta {
            text-align: left;
          }

          .final-cta .hero-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .hero-actions {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button,
          .cta-primary,
          .cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}