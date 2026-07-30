import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://athmov.com/blog/padel";

export const metadata: Metadata = {
  title: "Palas de pádel de segunda mano: guías de compra y valoración | ATHMOV",
  description:
    "Guías para comprar, vender, verificar y valorar palas de pádel de segunda mano. Aprende a detectar falsificaciones, revisar el estado y calcular un precio justo.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: "Guías de pádel de segunda mano | ATHMOV",
    description:
      "Consejos para comprar, vender, verificar y valorar palas de pádel usadas con mayor seguridad.",
    url: pageUrl,
    siteName: "ATHMOV",
    type: "website",
    images: [
      {
        url: "https://athmov.com/padel.jpg",
        width: 1200,
        height: 630,
        alt: "Guías de pádel de segunda mano de ATHMOV",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Guías de pádel de segunda mano | ATHMOV",
    description:
      "Compra, venta, autenticidad y valoración de palas de pádel usadas.",
    images: ["https://athmov.com/padel.jpg"],
  },
};

const articles = [
  {
    category: "PÁDEL · GUÍA DE COMPRA",
    title:
      "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",
    description:
      "Qué revisar, cuánto pagar y cómo reducir el riesgo de falsificaciones antes de comprar una Bullpadel Vertex 04 usada.",
    href: "/blog/bullpadel-vertex-04-segunda-mano",
    reading: "8 min",
  },
  {
    category: "PÁDEL · AUTENTICIDAD",
    title: "Cómo detectar una pala de pádel falsa",
    description:
      "Seriales, acabados, peso y señales de falsificación que debes comprobar antes de comprar.",
    href: "/blog/como-detectar-pala-padel-falsa",
    reading: "7 min",
  },
  {
    category: "PÁDEL · VALORACIÓN",
    title: "Cómo valorar una pala de pádel de segunda mano",
    description:
      "Marca, modelo, estado, antigüedad y demanda para calcular un precio de venta adecuado.",
    href: "/blog/como-valorar-pala-padel-segunda-mano",
    reading: "6 min",
  },
];

const faqItems = [
  {
    question: "¿Qué debo revisar antes de comprar una pala de pádel usada?",
    answer:
      "Conviene revisar el marco, las caras, el protector, el puente, la empuñadura y cualquier grieta o reparación. También debes comprobar el peso, el modelo exacto y la autenticidad de la pala.",
  },
  {
    question: "¿Cómo saber si una pala de pádel de segunda mano es original?",
    answer:
      "Compara el diseño, los acabados, el peso, los logotipos, el número de serie y el embalaje con la información oficial del fabricante. Un precio demasiado bajo también puede ser una señal de alerta.",
  },
  {
    question: "¿Cuánto debería pagar por una pala de pádel usada?",
    answer:
      "El precio depende del modelo, la antigüedad, el estado y la demanda. Como referencia, una pala reciente y bien conservada suele venderse con una reducción respecto a su precio nuevo.",
  },
  {
    question: "¿Es seguro comprar una pala de pádel de segunda mano?",
    answer:
      "Puede ser una compra segura cuando se muestran fotografías claras, una descripción precisa del estado y se utiliza una plataforma con pagos protegidos y vendedores identificados.",
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
      name: "Blog",
      item: "https://athmov.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pádel",
      item: pageUrl,
    },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guías de pádel de segunda mano",
  description:
    "Guías para comprar, vender, verificar y valorar palas de pádel de segunda mano.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "ATHMOV",
    url: "https://athmov.com",
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

export default function PadelBlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="padel-blog-page">
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

      <section className="hero">
        <nav aria-label="Migas de pan" className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span>Pádel</span>
        </nav>

        <p className="eyebrow">ATHMOV · PÁDEL</p>

        <h1>
          Guías de pádel
          <br />
          de segunda mano
        </h1>

        <p className="subtitle">
          Aprende a comprar, vender, verificar y valorar palas de pádel usadas.
          Descubre qué revisar antes de pagar, cómo detectar una falsificación y
          cómo calcular el valor real de cada modelo.
        </p>

        <div className="hero-links">
          <Link href="/padel" className="primary-link">
            Ver palas de segunda mano
          </Link>

          <Link href="/sell" className="secondary-link">
            Vender una pala
          </Link>
        </div>
      </section>

      <section className="intro-section">
        <div className="intro-content">
          <p className="section-eyebrow">Comprar con conocimiento</p>

          <h2>Todo lo que necesitas saber antes de elegir una pala usada</h2>

          <div className="intro-columns">
            <p>
              Comprar una pala de pádel de segunda mano puede permitirte acceder
              a modelos de gama alta por un precio inferior al de una pala
              nueva. Sin embargo, es importante revisar cuidadosamente el estado
              del producto y conocer las características del modelo antes de
              tomar una decisión.
            </p>

            <p>
              En las guías de ATHMOV encontrarás consejos sobre autenticidad,
              desgaste, reparaciones, precios y conservación. También podrás
              consultar contenidos específicos sobre marcas y modelos, como la{" "}
              <Link href="/blog/bullpadel-vertex-04-segunda-mano">
                Bullpadel Vertex 04 de segunda mano
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <Link href={featured.href} className="featured-card">
          <div>
            <p className="card-category">{featured.category}</p>

            <h2>{featured.title}</h2>

            <p className="card-text">{featured.description}</p>
          </div>

          <div className="featured-footer">
            <span>{featured.reading}</span>
            <span>Leer guía →</span>
          </div>
        </Link>
      </section>

      <section className="guides-section">
        <div className="section-heading">
          <p className="section-eyebrow">Biblioteca ATHMOV</p>
          <h2>Guías sobre palas de pádel usadas</h2>
        </div>

        <div className="guides-grid">
          {rest.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="guide-card"
            >
              <div>
                <p className="card-category">{article.category}</p>
                <h3>{article.title}</h3>
                <p className="card-text">{article.description}</p>
              </div>

              <div className="guide-footer">
                <span>{article.reading}</span>
                <span>Leer guía →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="seo-links-section">
        <div className="section-heading">
          <p className="section-eyebrow">Explora ATHMOV</p>
          <h2>Encuentra la pala adecuada</h2>
        </div>

        <div className="seo-links-grid">
          <Link href="/padel" className="seo-link-card">
            <span>PALAS DE PÁDEL</span>
            <h3>Comprar palas de segunda mano</h3>
            <p>
              Descubre palas de pádel usadas de marcas y modelos premium.
            </p>
          </Link>

          <Link href="/brands/bullpadel" className="seo-link-card">
            <span>MARCA</span>
            <h3>Bullpadel de segunda mano</h3>
            <p>
              Consulta productos, modelos y oportunidades disponibles de
              Bullpadel.
            </p>
          </Link>

          <Link href="/padel/bullpadel" className="seo-link-card">
            <span>PÁDEL · BULLPADEL</span>
            <h3>Palas Bullpadel usadas</h3>
            <p>
              Encuentra palas Bullpadel de segunda mano publicadas en ATHMOV.
            </p>
          </Link>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <p className="section-eyebrow">Preguntas frecuentes</p>
          <h2>Comprar palas de pádel de segunda mano</h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <p className="section-eyebrow">THE GAME CONTINUES</p>

        <h2>Encuentra tu próxima pala en ATHMOV</h2>

        <p>
          Compra y vende material deportivo premium de segunda mano con una
          experiencia diseñada para deportistas.
        </p>

        <div className="cta-buttons">
          <Link href="/padel" className="cta-primary">
            Ver palas disponibles
          </Link>

          <Link href="/sell" className="cta-secondary">
            Publicar una pala
          </Link>
        </div>
      </section>

      <style>{`
        .padel-blog-page {
          min-height: 100vh;
          background: #f7f5f0;
          padding: 130px 40px 90px;
          font-family: Inter, sans-serif;
          color: #111;
        }

        .hero,
        .intro-section,
        .featured-section,
        .guides-section,
        .seo-links-section,
        .faq-section,
        .cta-section {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero {
          margin-bottom: 62px;
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

        .eyebrow,
        .section-eyebrow {
          margin: 0 0 14px;
          color: #a9946d;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .hero h1 {
          margin: 0;
          max-width: 900px;
          font-size: clamp(52px, 8vw, 76px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -4px;
        }

        .subtitle {
          max-width: 760px;
          margin: 25px 0 0;
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        .hero-links,
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .primary-link,
        .secondary-link,
        .cta-primary,
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .primary-link,
        .cta-primary {
          background: #111;
          color: #fff;
        }

        .secondary-link {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #fff;
          color: #111;
        }

        .primary-link:hover,
        .secondary-link:hover,
        .cta-primary:hover,
        .cta-secondary:hover {
          transform: translateY(-2px);
        }

        .intro-section {
          margin-bottom: 70px;
          padding: 42px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.58);
        }

        .intro-content h2,
        .section-heading h2,
        .cta-section h2 {
          margin: 0;
          font-size: clamp(34px, 5vw, 46px);
          line-height: 1.08;
          letter-spacing: -2px;
        }

        .intro-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 34px;
          margin-top: 26px;
        }

        .intro-columns p {
          margin: 0;
          color: #606060;
          font-size: 16px;
          line-height: 1.85;
        }

        .intro-columns a {
          color: #111;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .featured-section {
          margin-bottom: 76px;
        }

        .featured-card {
          display: flex;
          min-height: 390px;
          flex-direction: column;
          justify-content: space-between;
          padding: 42px;
          overflow: hidden;
          border-radius: 36px;
          background: #0f0e0c;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.14);
          color: #fff;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .featured-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 34px 100px rgba(0, 0, 0, 0.18);
        }

        .featured-card h2 {
          max-width: 850px;
          margin: 0;
          font-size: clamp(38px, 6vw, 52px);
          line-height: 1.04;
          letter-spacing: -3px;
        }

        .card-category {
          margin: 0 0 18px;
          color: #c9b896;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .card-text {
          max-width: 680px;
          margin: 18px 0 0;
          color: inherit;
          font-size: 16px;
          line-height: 1.75;
          opacity: 0.65;
        }

        .featured-footer,
        .guide-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 30px;
          padding-top: 18px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .featured-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .guides-section,
        .seo-links-section,
        .faq-section {
          margin-bottom: 76px;
        }

        .section-heading {
          margin-bottom: 24px;
        }

        .guides-grid,
        .seo-links-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .guide-card,
        .seo-link-card {
          display: flex;
          min-height: 280px;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .guide-card:hover,
        .seo-link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.08);
        }

        .guide-card h3,
        .seo-link-card h3 {
          margin: 0;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .guide-footer {
          border-top: 1px solid rgba(0, 0, 0, 0.09);
          color: #555;
        }

        .seo-links-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .seo-link-card {
          min-height: 230px;
        }

        .seo-link-card span {
          color: #a9946d;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .seo-link-card p {
          margin: 18px 0 0;
          color: #666;
          line-height: 1.7;
        }

        .faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item summary {
          position: relative;
          padding: 24px 42px 24px 0;
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
          max-width: 820px;
          margin: 0;
          padding: 0 0 26px;
          color: #666;
          line-height: 1.8;
        }

        .cta-section {
          padding: 54px;
          border-radius: 36px;
          background: #111;
          color: #fff;
          text-align: center;
        }

        .cta-section h2 {
          max-width: 760px;
          margin-right: auto;
          margin-left: auto;
        }

        .cta-section > p:not(.section-eyebrow) {
          max-width: 680px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 16px;
          line-height: 1.75;
        }

        .cta-buttons {
          justify-content: center;
        }

        .cta-primary {
          background: #fff;
          color: #111;
        }

        .cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
        }

        @media (max-width: 800px) {
          .padel-blog-page {
            padding: 110px 22px 70px;
          }

          .hero h1 {
            letter-spacing: -2.5px;
          }

          .intro-section,
          .featured-card,
          .cta-section {
            padding: 28px;
            border-radius: 28px;
          }

          .intro-columns,
          .guides-grid,
          .seo-links-grid {
            grid-template-columns: 1fr;
          }

          .featured-card {
            min-height: 430px;
          }

          .featured-card h2 {
            letter-spacing: -2px;
          }

          .guide-card,
          .seo-link-card {
            min-height: auto;
          }

          .cta-section {
            text-align: left;
          }

          .cta-buttons {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .hero-links,
          .cta-buttons {
            flex-direction: column;
          }

          .primary-link,
          .secondary-link,
          .cta-primary,
          .cta-secondary {
            width: 100%;
          }

          .featured-footer,
          .guide-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 9px;
          }
        }
      `}</style>
    </main>
  );
}