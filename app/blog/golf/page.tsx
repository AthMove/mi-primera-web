import Link from "next/link";

export const metadata = {
  title: "Blog de Golf | ATHMOV",
  description:
    "Guías de compra, venta, autenticidad y valoración de material de golf de segunda mano.",
};

const articles = [
  {
    category: "GOLF · AUTENTICIDAD",
    title: "Cómo verificar unos palos de golf originales",
    description:
      "Seriales, acabados, ferrules y detalles para detectar material auténtico.",
    href: "/blog/como-verificar-palos-golf-originales",
    reading: "6 min",
  },
  {
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    description:
      "El calendario que utilizan los compradores inteligentes para pagar menos.",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "GOLF · VALORACIÓN",
    title: "Cómo calcular el precio de palos de golf de segunda mano",
    description:
      "Aprende a valorar drivers, hierros, wedges y sets completos.",
    href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
    reading: "6 min",
  },
];

export default function GolfBlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <Link href="/blog" style={backLinkStyle}>
          ← Volver al blog
        </Link>

        <p style={eyebrowStyle}>ATHMOV · GOLF</p>

        <h1 style={titleStyle}>
          Guías de
          <br />
          Golf
        </h1>

        <p style={subtitleStyle}>
          Compra, venta, autenticidad y valoración de equipamiento de golf de
          segunda mano.
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
        <h2 style={sectionTitleStyle}>Todo sobre Golf</h2>

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
  borderTop: "1px solid rgba(255,255,255,0.12)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};