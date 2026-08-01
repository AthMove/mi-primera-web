import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";

const golfUrl = "https://athmov.com/golf";
const golfImage = "https://athmov.com/og-image.jpg";

export const metadata: Metadata = {
  title: "Palos de golf de segunda mano",
  description:
    "Compra y vende palos de golf premium de segunda mano. Encuentra drivers, hierros, wedges, putters y bolsas de golf de marcas como TaylorMade, Callaway, Ping y Titleist.",
  keywords: [
    "palos de golf de segunda mano",
    "comprar palos de golf usados",
    "material de golf de segunda mano",
    "drivers de segunda mano",
    "hierros de golf de segunda mano",
    "wedges de segunda mano",
    "putters de segunda mano",
    "bolsas de golf de segunda mano",
    "TaylorMade segunda mano",
    "Callaway segunda mano",
    "Ping segunda mano",
    "Titleist segunda mano",
  ],
  alternates: {
    canonical: golfUrl,
  },
  openGraph: {
    title: "Palos de golf de segunda mano | ATHMOV",
    description:
      "Descubre material de golf premium de segunda mano con pagos seguros, vendedores verificados y protección al comprador.",
    url: golfUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: golfImage,
        width: 1200,
        height: 630,
        alt: "Palos y material de golf de segunda mano en ATHMOV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palos de golf de segunda mano | ATHMOV",
    description:
      "Compra y vende drivers, hierros, wedges, putters y bolsas de golf premium de segunda mano.",
    images: [golfImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const popularBrands = [
  {
    name: "TaylorMade",
    href: "/brands/taylormade",
    text: "Drivers, hierros P790, wedges y putters Spider.",
  },
  {
    name: "Callaway",
    href: "/brands/callaway",
    text: "Drivers, maderas, hierros y wedges de gamas premium.",
  },
  {
    name: "Titleist",
    href: "/brands/titleist",
    text: "Drivers, hierros, wedges Vokey y putters de alta gama.",
  },
  {
    name: "Ping",
    href: "/brands/ping",
    text: "Palos reconocidos por su tolerancia, ajuste y consistencia.",
  },
  {
    name: "Mizuno",
    href: "/brands/mizuno",
    text: "Hierros forjados y material orientado a jugadores exigentes.",
  },
  {
    name: "Cobra",
    href: "/brands/cobra",
    text: "Drivers, maderas e hierros con tecnologías de rendimiento.",
  },
];

const buyingTips = [
  {
    number: "01",
    title: "Revisa la cabeza",
    text: "Comprueba la cara, la corona, la suela y posibles golpes, fisuras o reparaciones.",
  },
  {
    number: "02",
    title: "Comprueba la varilla",
    text: "Verifica el flex, la longitud, el peso y que no existan grietas o daños visibles.",
  },
  {
    number: "03",
    title: "Confirma las medidas",
    text: "Revisa loft, lie, longitud y configuración para asegurar que encajan con tu juego.",
  },
  {
    number: "04",
    title: "Verifica la autenticidad",
    text: "Examina número de serie, logotipos, acabados y especificaciones del modelo.",
  },
];

const relatedGuides = [
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
  {
    title: "Qué revisar antes de comprar un driver de segunda mano",
    href: "/blog/que-revisar-driver-golf-segunda-mano",
  },
  {
    title: "Qué revisar antes de comprar unos hierros usados",
    href: "/blog/que-revisar-hierros-golf-segunda-mano",
  },
  {
    title: "Los mejores campos de golf de España",
    href: "/blog/mejores-campos-golf-espana",
  },
];

const faqItems = [
  {
    question: "¿Es buena idea comprar palos de golf de segunda mano?",
    answer:
      "Puede ser una excelente opción para acceder a material premium con un coste inferior. Antes de comprar conviene revisar la cabeza, la varilla, el grip, las medidas y la autenticidad.",
  },
  {
    question: "¿Qué debo revisar en un driver usado?",
    answer:
      "Examina la cara, la corona, la suela, el hosel y la varilla. Comprueba también el loft, el flex y si incluye la llave o el adaptador correspondiente.",
  },
  {
    question: "¿Cómo saber si unos palos de golf son originales?",
    answer:
      "Compara los números de serie, logotipos, grabados, acabados y especificaciones con la información oficial del fabricante. Los precios anormalmente bajos pueden ser una señal de alerta.",
  },
  {
    question: "¿Qué marcas de golf mantienen mejor su valor?",
    answer:
      "Las gamas premium de marcas como TaylorMade, Callaway, Titleist, Ping y Mizuno suelen conservar mejor su valor cuando el modelo tiene demanda y está bien cuidado.",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Palos de golf de segunda mano",
  url: golfUrl,
  description:
    "Selección de palos y material de golf premium de segunda mano disponible en ATHMOV.",
  inLanguage: "es",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@type": "Thing",
    name: "Material de golf de segunda mano",
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
      name: "Golf",
      item: golfUrl,
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

export default function GolfPage() {
  return (
    <main className="golf-page">
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

      <section className="golf-hero">
        <nav className="golf-breadcrumb" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <span>Golf</span>
        </nav>

        <p className="golf-eyebrow">ATHMOV · GOLF</p>

        <h1>Palos de golf de segunda mano</h1>

        <p className="golf-intro">
          Encuentra drivers, hierros, wedges, putters y bolsas de golf premium
          publicados por vendedores particulares. Compara marcas, modelos,
          especificaciones y estado antes de comprar.
        </p>

        <div className="golf-actions">
          <Link
            href="/products?category=GOLF"
            className="golf-primary-button"
          >
            VER TODO EL MATERIAL
          </Link>

          <Link href="/sell" className="golf-secondary-button">
            VENDER MATERIAL DE GOLF
          </Link>
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">POR QUÉ COMPRAR USADO</p>
          <h2>Más tecnología por menos.</h2>
        </div>

        <div className="golf-text-grid">
          <p>
            El material de golf premium suele conservar sus prestaciones durante
            años cuando se mantiene correctamente. Comprar de segunda mano
            permite acceder a gamas altas y modelos recientes con un ahorro
            importante respecto al precio nuevo.
          </p>

          <p>
            Antes de elegir, revisa la cabeza, la cara, la suela, la varilla, el
            grip y las especificaciones. El loft, el flex, la longitud y el lie
            deben adaptarse a tu nivel y características.
          </p>

          <p>
            En ATHMOV puedes comparar anuncios, consultar perfiles de
            vendedores y acceder a guías para valorar precios y reducir el
            riesgo de falsificaciones.
          </p>
        </div>
      </section>

      <section className="golf-products-section">
        <div className="golf-catalog-heading">
          <div>
            <p className="golf-eyebrow">MARKETPLACE</p>
            <h2>Material de golf disponible</h2>
          </div>

          <Link href="/products?category=GOLF" className="golf-text-link">
            Ver catálogo completo →
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="golf-loading">
              Cargando productos de golf...
            </div>
          }
        >
          <ProductsClient fixedCategory="GOLF" />
        </Suspense>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">MARCAS POPULARES</p>
          <h2>Encuentra tu marca de golf.</h2>
        </div>

        <div className="golf-brands-grid">
          {popularBrands.map((brand) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="golf-brand-card"
            >
              <span>MARCA</span>
              <h3>{brand.name}</h3>
              <p>{brand.text}</p>
              <strong>Ver productos →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">GUÍA DE COMPRA</p>
          <h2>Qué revisar antes de comprar.</h2>
        </div>

        <div className="golf-tips-grid">
          {buyingTips.map((tip) => (
            <article key={tip.number} className="golf-tip-card">
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>

        <div className="golf-guide-action">
          <Link href="/buyer-guide">Ver guía del comprador →</Link>
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">ATHMOV JOURNAL</p>
          <h2>Guías para comprar y valorar mejor.</h2>
        </div>

        <div className="golf-guides-grid">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="golf-guide-card"
            >
              <span>GUÍA DE GOLF</span>
              <h3>{guide.title}</h3>
              <strong>Leer artículo →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">PREGUNTAS FRECUENTES</p>
          <h2>Antes de comprar material usado.</h2>
        </div>

        <div className="golf-faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="golf-faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="golf-final-cta">
        <p className="golf-eyebrow">THE GAME CONTINUES</p>

        <h2>Tu próximo palo ya está en juego.</h2>

        <p>
          Compra material premium de segunda mano o publica el equipo de golf
          que ya no utilizas.
        </p>

        <div className="golf-actions">
          <Link
            href="/products?category=GOLF"
            className="golf-cta-primary"
          >
            EXPLORAR GOLF
          </Link>

          <Link href="/sell" className="golf-cta-secondary">
            PUBLICAR MATERIAL
          </Link>
        </div>
      </section>

      <style>{`
        .golf-page {
          min-height: 100vh;
          padding: 140px 40px 90px;
          background: #f7f5f0;
          color: #111;
        }

        .golf-hero,
        .golf-content-section,
        .golf-products-section,
        .golf-final-cta {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .golf-hero {
          margin-bottom: 90px;
        }

        .golf-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 34px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .golf-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .golf-eyebrow {
          margin: 0 0 15px;
          color: #a58d5a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .golf-hero h1 {
          max-width: 980px;
          margin: 0;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 600;
          line-height: 0.97;
          letter-spacing: -5px;
        }

        .golf-intro {
          max-width: 770px;
          margin: 28px 0 0;
          color: #666;
          font-size: 19px;
          line-height: 1.8;
        }

        .golf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .golf-primary-button,
        .golf-secondary-button,
        .golf-cta-primary,
        .golf-cta-secondary {
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

        .golf-primary-button,
        .golf-cta-primary {
          background: #111;
          color: #fff;
        }

        .golf-secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.13);
          background: #fff;
          color: #111;
        }

        .golf-content-section,
        .golf-products-section {
          margin-bottom: 92px;
        }

        .golf-section-heading {
          margin-bottom: 30px;
        }

        .golf-section-heading h2,
        .golf-catalog-heading h2,
        .golf-final-cta h2 {
          max-width: 840px;
          margin: 0;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2.5px;
        }

        .golf-text-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.68);
        }

        .golf-text-grid p {
          margin: 0;
          color: #626262;
          line-height: 1.85;
        }

        .golf-catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 28px;
        }

        .golf-text-link {
          padding-bottom: 4px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .golf-loading {
          padding: 44px;
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .golf-brands-grid,
        .golf-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .golf-brand-card,
        .golf-guide-card {
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

        .golf-brand-card > span,
        .golf-guide-card > span {
          color: #a58d5a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .golf-brand-card h3,
        .golf-guide-card h3 {
          margin: 20px 0 12px;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .golf-brand-card p {
          margin: 0;
          color: #666;
          line-height: 1.7;
        }

        .golf-brand-card strong,
        .golf-guide-card strong {
          margin-top: auto;
          padding-top: 28px;
          font-size: 12px;
        }

        .golf-tips-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .golf-tip-card {
          min-height: 230px;
          padding: 26px;
          border-radius: 27px;
          background: #111;
          color: #fff;
        }

        .golf-tip-card > span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .golf-tip-card h3 {
          margin: 42px 0 12px;
          font-size: 22px;
        }

        .golf-tip-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
        }

        .golf-guide-action {
          margin-top: 24px;
        }

        .golf-guide-action a {
          color: #111;
          font-weight: 900;
          text-decoration: none;
        }

        .golf-faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .golf-faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .golf-faq-item summary {
          position: relative;
          padding: 25px 45px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
        }

        .golf-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .golf-faq-item summary::after {
          position: absolute;
          top: 22px;
          right: 4px;
          content: "+";
          color: #a58d5a;
          font-size: 27px;
        }

        .golf-faq-item[open] summary::after {
          content: "−";
        }

        .golf-faq-item p {
          max-width: 840px;
          margin: 0;
          padding: 0 0 28px;
          color: #666;
          line-height: 1.8;
        }

        .golf-final-cta {
          padding: 58px;
          border-radius: 40px;
          background: #111;
          color: #fff;
          text-align: center;
        }

        .golf-final-cta h2 {
          margin-left: auto;
          margin-right: auto;
        }

        .golf-final-cta > p:not(.golf-eyebrow) {
          max-width: 620px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .golf-final-cta .golf-actions {
          justify-content: center;
        }

        .golf-final-cta .golf-cta-primary {
          background: #fff;
          color: #111;
        }

        .golf-final-cta .golf-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        @media (max-width: 980px) {
          .golf-text-grid {
            grid-template-columns: 1fr;
          }

          .golf-brands-grid,
          .golf-guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .golf-tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .golf-page {
            padding: 115px 20px 65px;
          }

          .golf-hero h1 {
            letter-spacing: -3px;
          }

          .golf-catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .golf-brands-grid,
          .golf-guides-grid,
          .golf-tips-grid {
            grid-template-columns: 1fr;
          }

          .golf-text-grid,
          .golf-final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .golf-final-cta {
            text-align: left;
          }

          .golf-final-cta .golf-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .golf-actions {
            flex-direction: column;
          }

          .golf-primary-button,
          .golf-secondary-button,
          .golf-cta-primary,
          .golf-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}