import Link from "next/link";

export const metadata = {
  title: "Blog de Running | Guías de segunda mano | ATHMOV",
  description:
    "Guías ATHMOV para comprar, vender y valorar zapatillas de running de segunda mano: desgaste, kilómetros, amortiguación y consejos de compra.",

  openGraph: {
    title: "Blog de Running | ATHMOV",
    description:
      "Guías de running de segunda mano: compra, valoración y revisión de zapatillas.",
    type: "website",
    images: ["/running.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog de Running | ATHMOV",
    description:
      "Guías de running de segunda mano: desgaste, kilómetros y valoración.",
    images: ["/running.jpg"],
  },
};

const articles = [
  {
    category: "RUNNING · COMPRA",
    title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
    description:
      "Suela, mediasuela, talón y kilómetros: lo que debes comprobar antes de comprar.",
    href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    reading: "6 min",
  },
  {
    category: "RUNNING · ESTADO",
    title: "Cómo saber si unas zapatillas de running están agotadas",
    description:
      "Detecta pérdida de amortiguación, estabilidad y vida útil antes de comprar o vender.",
    href: "/blog/como-saber-si-zapatillas-running-estan-agotadas",
    reading: "5 min",
  },
  {
    category: "RUNNING · VALORACIÓN",
    title: "Cuántos kilómetros puede tener una zapatilla de running usada",
    description:
      "Cómo interpretar los kilómetros y valorar la vida útil restante.",
    href: "/blog/cuantos-kilometros-puede-tener-zapatilla-running-usada",
    reading: "5 min",
  },
];

export default function RunningBlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <Link href="/blog" style={backLinkStyle}>
          ← Volver al blog
        </Link>

        <p style={eyebrowStyle}>ATHMOV · RUNNING</p>

        <h1 style={titleStyle}>
          Guías de
          <br />
          Running
        </h1>

        <p style={subtitleStyle}>
          Compra inteligente, desgaste, kilómetros y valoración de zapatillas de
          running de segunda mano.
        </p>
      </section>

      <section style={featuredSectionStyle}>
        <Link href={featured.href} style={featuredCardStyle}>
          <div>
            <p style={cardCategoryStyle}>{featured.category}</p>
            <h2 style={featuredTitleStyle}>{featured.title}</h2>
            <p style={cardTextStyle}>{featured.description}</p>
          </div>

          <div style={cardFooterStyle}>
            <span>{featured.reading}</span>
            <span>Leer guía →</span>
          </div>
        </Link>
      </section>

      <section style={sectionStyle}>
        <p style={sectionEyebrowStyle}>Más guías</p>
        <h2 style={sectionTitleStyle}>Todo sobre Running</h2>

        <div style={gridStyle}>
          {rest.map((article) => (
            <Link key={article.href} href={article.href} style={cardStyle}>
              <div>
                <p style={cardCategoryStyle}>{article.category}</p>
                <h3 style={cardTitleStyle}>{article.title}</h3>
                <p style={cardTextStyle}>{article.description}</p>
              </div>

              <div style={cardFooterStyle}>
                <span>{article.reading}</span>
                <span>Leer →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
  padding: "130px 40px 90px",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  maxWidth: "1100px",
  margin: "0 auto 54px",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "34px",
  color: "#777",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 800,
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "18px",
};

const titleStyle = {
  fontSize: "76px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
  fontWeight: 600,
};

const subtitleStyle = {
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.8,
  maxWidth: "680px",
  marginTop: "24px",
};

const featuredSectionStyle = {
  maxWidth: "1100px",
  margin: "0 auto 70px",
};

const featuredCardStyle = {
  minHeight: "360px",
  background: "#0f0e0c",
  color: "#fff",
  borderRadius: "34px",
  padding: "38px",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

const featuredTitleStyle = {
  fontSize: "46px",
  lineHeight: 1.05,
  letterSpacing: "-2px",
  margin: 0,
  maxWidth: "760px",
};

const sectionStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const sectionEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "8px",
};

const sectionTitleStyle = {
  fontSize: "38px",
  lineHeight: 1.1,
  letterSpacing: "-2px",
  margin: "0 0 22px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "18px",
};

const cardStyle = {
  minHeight: "270px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "28px",
  padding: "28px",
  textDecoration: "none",
  color: "#111",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

const cardCategoryStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  fontWeight: 900,
  marginBottom: "18px",
};

const cardTitleStyle = {
  fontSize: "28px",
  lineHeight: 1.12,
  letterSpacing: "-1px",
  margin: 0,
};

const cardTextStyle = {
  color: "inherit",
  opacity: 0.65,
  lineHeight: 1.7,
  marginTop: "16px",
};

const cardFooterStyle = {
  marginTop: "30px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};