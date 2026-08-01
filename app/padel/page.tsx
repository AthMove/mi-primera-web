import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Palas de pádel de segunda mano | ATHMOV",
  description:
    "Compra y vende palas de pádel premium de segunda mano. Encuentra modelos de Bullpadel, Nox, Adidas, Head, Siux, Babolat y Wilson con protección al comprador.",
  alternates: {
    canonical: "https://athmov.com/padel",
  },
  openGraph: {
    title: "Palas de pádel de segunda mano | ATHMOV",
    description:
      "Descubre palas de pádel premium de segunda mano, compara marcas y revisa guías de compra antes de elegir.",
    url: "https://athmov.com/padel",
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palas de pádel de segunda mano | ATHMOV",
    description:
      "Compra y vende palas de pádel premium de segunda mano en ATHMOV.",
  },
};

const popularBrands = [
  {
    name: "Bullpadel",
    href: "/brands/bullpadel",
    text: "Vertex, Hack, Elite, Neuron y otras gamas premium.",
  },
  {
    name: "Nox",
    href: "/brands/nox",
    text: "AT10, ML10, LA10, VK10 y modelos para distintos niveles.",
  },
  {
    name: "Adidas",
    href: "/brands/adidas",
    text: "Palas de potencia, control y gamas profesionales.",
  },
  {
    name: "Head",
    href: "/brands/head",
    text: "Modelos conocidos por su equilibrio, tecnología y manejabilidad.",
  },
  {
    name: "Siux",
    href: "/brands/siux",
    text: "Palas orientadas a jugadores avanzados y competición.",
  },
  {
    name: "Babolat",
    href: "/brands/babolat",
    text: "Gamas técnicas con opciones de potencia y control.",
  },
];

const buyingTips = [
  {
    number: "01",
    title: "Revisa el marco",
    text: "Busca grietas, golpes profundos, reparaciones o zonas blandas alrededor del perímetro.",
  },
  {
    number: "02",
    title: "Comprueba las caras",
    text: "Examina la superficie, la rugosidad, el carbono y posibles daños cerca de los agujeros.",
  },
  {
    number: "03",
    title: "Verifica el peso",
    text: "Compara el peso real con el rango oficial del modelo y ten en cuenta los protectores añadidos.",
  },
  {
    number: "04",
    title: "Confirma el modelo",
    text: "Revisa colores, logotipos, acabados, número de serie y detalles de fabricación.",
  },
];

const relatedGuides = [
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
];

const faqItems = [
  {
    question: "¿Es seguro comprar una pala de pádel de segunda mano?",
    answer:
      "Puede ser una buena compra cuando el anuncio incluye fotografías detalladas, una descripción precisa y un precio coherente con el estado de la pala. Conviene revisar marco, caras, puente, peso y posibles reparaciones.",
  },
  {
    question: "¿Qué marcas de pádel mantienen mejor su valor?",
    answer:
      "Las gamas premium de marcas como Bullpadel, Nox, Head, Adidas o Siux suelen mantener mejor su valor cuando el modelo tiene demanda y la pala está bien conservada.",
  },
  {
    question: "¿Qué desgaste es aceptable en una pala usada?",
    answer:
      "Los pequeños roces superficiales pueden ser normales. Las grietas profundas, reparaciones estructurales, zonas blandas o daños en el puente requieren más precaución.",
  },
  {
    question: "¿Cómo puedo vender mi pala en ATHMOV?",
    answer:
      "Puedes crear un anuncio desde la sección Vender, añadir fotografías, indicar marca, modelo, estado y precio, y publicar el producto para que otros jugadores puedan encontrarlo.",
  },
];

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
      name: "Pádel",
      item: "https://athmov.com/padel",
    },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palas de pádel de segunda mano",
  url: "https://athmov.com/padel",
  description:
    "Selección de palas de pádel premium de segunda mano disponibles en ATHMOV.",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@type": "Thing",
    name: "Pádel",
  },
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

export default function PadelPage() {
  return (
    <main className="padel-page">
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

      <section className="padel-hero">
        <nav className="padel-breadcrumb" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <span>Pádel</span>
        </nav>

        <p className="padel-eyebrow">ATHMOV · PÁDEL</p>

        <h1>Palas de pádel de segunda mano</h1>

        <p className="padel-intro">
          Descubre palas premium publicadas por vendedores particulares,
          compara marcas y modelos y revisa su estado antes de comprar.
        </p>

        <div className="padel-actions">
          <Link
            href="/products?category=PADEL"
            className="padel-primary-button"
          >
            VER TODAS LAS PALAS
          </Link>

          <Link href="/sell" className="padel-secondary-button">
            VENDER UNA PALA
          </Link>
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">POR QUÉ COMPRAR USADO</p>
          <h2>Más valor por tu presupuesto.</h2>
        </div>

        <div className="padel-text-grid">
          <p>
            El mercado de segunda mano permite acceder a palas de gamas altas
            por un precio inferior al de una unidad nueva. Esto resulta
            especialmente interesante en modelos premium que conservan buenas
            prestaciones aunque hayan tenido un uso moderado.
          </p>

          <p>
            Antes de comprar, conviene revisar el estado estructural, el peso,
            la antigüedad y las posibles reparaciones. Una pala con pequeños
            roces superficiales puede seguir ofreciendo un buen rendimiento,
            mientras que una grieta profunda puede afectar a su durabilidad.
          </p>

          <p>
            En ATHMOV puedes comparar anuncios, consultar perfiles de
            vendedores y acceder a guías específicas para tomar una decisión
            con más información.
          </p>
        </div>
      </section>

      <section className="padel-products-section">
        <div className="padel-catalog-heading">
          <div>
            <p className="padel-eyebrow">MARKETPLACE</p>
            <h2>Palas de pádel disponibles</h2>
          </div>

          <Link href="/products?category=PADEL" className="padel-text-link">
            Ver catálogo completo →
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="padel-loading">
              Cargando productos de pádel...
            </div>
          }
        >
          <ProductsClient fixedCategory="PADEL" />
        </Suspense>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">MARCAS POPULARES</p>
          <h2>Encuentra tu marca de pádel.</h2>
        </div>

        <div className="padel-brands-grid">
          {popularBrands.map((brand) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="padel-brand-card"
            >
              <span>MARCA</span>
              <h3>{brand.name}</h3>
              <p>{brand.text}</p>
              <strong>Ver productos →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">GUÍA DE COMPRA</p>
          <h2>Qué revisar antes de comprar.</h2>
        </div>

        <div className="padel-tips-grid">
          {buyingTips.map((tip) => (
            <article key={tip.number} className="padel-tip-card">
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>

        <div className="padel-guide-action">
          <Link href="/buyer-guide">Ver guía del comprador →</Link>
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">ATHMOV JOURNAL</p>
          <h2>Guías para comprar mejor.</h2>
        </div>

        <div className="padel-guides-grid">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="padel-guide-card"
            >
              <span>GUÍA DE PÁDEL</span>
              <h3>{guide.title}</h3>
              <strong>Leer artículo →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">PREGUNTAS FRECUENTES</p>
          <h2>Antes de comprar una pala usada.</h2>
        </div>

        <div className="padel-faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="padel-faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="padel-final-cta">
        <p className="padel-eyebrow">THE GAME CONTINUES</p>

        <h2>Tu próxima pala ya está en juego.</h2>

        <p>
          Compra material premium de segunda mano o publica la pala que ya no
          utilizas.
        </p>

        <div className="padel-actions">
          <Link
            href="/products?category=PADEL"
            className="padel-cta-primary"
          >
            EXPLORAR PÁDEL
          </Link>

          <Link href="/sell" className="padel-cta-secondary">
            PUBLICAR PALA
          </Link>
        </div>
      </section>

      <style>{`
        .padel-page {
          min-height: 100vh;
          padding: 140px 40px 90px;
          background: #f7f5f0;
          color: #111;
        }

        .padel-hero,
        .padel-content-section,
        .padel-products-section,
        .padel-final-cta {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .padel-hero {
          margin-bottom: 90px;
        }

        .padel-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 34px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .padel-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .padel-eyebrow {
          margin: 0 0 15px;
          color: #a58d5a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .padel-hero h1 {
          max-width: 980px;
          margin: 0;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 600;
          line-height: 0.97;
          letter-spacing: -5px;
        }

        .padel-intro {
          max-width: 750px;
          margin: 28px 0 0;
          color: #666;
          font-size: 19px;
          line-height: 1.8;
        }

        .padel-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .padel-primary-button,
        .padel-secondary-button,
        .padel-cta-primary,
        .padel-cta-secondary {
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

        .padel-primary-button,
        .padel-cta-primary {
          background: #111;
          color: #fff;
        }

        .padel-secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.13);
          background: #fff;
          color: #111;
        }

        .padel-content-section,
        .padel-products-section {
          margin-bottom: 92px;
        }

        .padel-section-heading {
          margin-bottom: 30px;
        }

        .padel-section-heading h2,
        .padel-catalog-heading h2,
        .padel-final-cta h2 {
          max-width: 820px;
          margin: 0;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2.5px;
        }

        .padel-text-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.68);
        }

        .padel-text-grid p {
          margin: 0;
          color: #626262;
          line-height: 1.85;
        }

        .padel-catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 28px;
        }

        .padel-text-link {
          padding-bottom: 4px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .padel-loading {
          padding: 44px;
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .padel-brands-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .padel-brand-card,
        .padel-guide-card {
          display: flex;
          min-height: 245px;
          flex-direction: column;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
        }

        .padel-brand-card > span,
        .padel-guide-card > span {
          color: #a58d5a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .padel-brand-card h3,
        .padel-guide-card h3 {
          margin: 20px 0 12px;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .padel-brand-card p {
          margin: 0;
          color: #666;
          line-height: 1.7;
        }

        .padel-brand-card strong,
        .padel-guide-card strong {
          margin-top: auto;
          padding-top: 28px;
          font-size: 12px;
        }

        .padel-tips-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .padel-tip-card {
          min-height: 230px;
          padding: 26px;
          border-radius: 27px;
          background: #111;
          color: #fff;
        }

        .padel-tip-card > span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .padel-tip-card h3 {
          margin: 42px 0 12px;
          font-size: 22px;
        }

        .padel-tip-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
        }

        .padel-guide-action {
          margin-top: 24px;
        }

        .padel-guide-action a {
          color: #111;
          font-weight: 900;
          text-decoration: none;
        }

        .padel-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .padel-faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .padel-faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .padel-faq-item summary {
          position: relative;
          padding: 25px 45px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
        }

        .padel-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .padel-faq-item summary::after {
          position: absolute;
          top: 22px;
          right: 4px;
          content: "+";
          color: #a58d5a;
          font-size: 27px;
        }

        .padel-faq-item[open] summary::after {
          content: "−";
        }

        .padel-faq-item p {
          max-width: 840px;
          margin: 0;
          padding: 0 0 28px;
          color: #666;
          line-height: 1.8;
        }

        .padel-final-cta {
          padding: 58px;
          border-radius: 40px;
          background: #111;
          color: #fff;
          text-align: center;
        }

        .padel-final-cta h2 {
          margin-left: auto;
          margin-right: auto;
        }

        .padel-final-cta > p:not(.padel-eyebrow) {
          max-width: 620px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .padel-final-cta .padel-actions {
          justify-content: center;
        }

        .padel-final-cta .padel-cta-primary {
          background: #fff;
          color: #111;
        }

        .padel-final-cta .padel-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        @media (max-width: 980px) {
          .padel-text-grid {
            grid-template-columns: 1fr;
          }

          .padel-brands-grid,
          .padel-guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .padel-tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .padel-page {
            padding: 115px 20px 65px;
          }

          .padel-hero h1 {
            letter-spacing: -3px;
          }

          .padel-catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .padel-brands-grid,
          .padel-guides-grid,
          .padel-tips-grid {
            grid-template-columns: 1fr;
          }

          .padel-text-grid,
          .padel-final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .padel-final-cta {
            text-align: left;
          }

          .padel-final-cta .padel-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .padel-actions {
            flex-direction: column;
          }

          .padel-primary-button,
          .padel-secondary-button,
          .padel-cta-primary,
          .padel-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}