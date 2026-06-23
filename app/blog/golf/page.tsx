import Link from "next/link";

export const metadata = {
  title: "Blog de Golf | ATHMOV",
  description:
    "Guías de compra, venta y valoración de material de golf de segunda mano.",
};

const articles = [
  {
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    description:
      "El calendario del mercado de segunda mano de golf, mes a mes.",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
  },
  {
    title: "Cómo calcular el precio de palos de golf de segunda mano",
    description:
      "Guía para valorar drivers, hierros, wedges y sets completos.",
    href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
  },
];

export default function GolfBlogPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>ATHMOV · GOLF</p>

        <h1 style={titleStyle}>
          Blog de Golf
        </h1>

        <p style={subtitleStyle}>
          Guías para comprar, vender y valorar equipamiento de golf de segunda mano.
        </p>

        <div style={gridStyle}>
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              style={cardStyle}
            >
              <h2 style={cardTitleStyle}>{article.title}</h2>

              <p style={cardTextStyle}>
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
};

const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "80px 28px",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  fontWeight: 900,
};

const titleStyle = {
  fontSize: "56px",
  marginTop: "10px",
  marginBottom: "16px",
  lineHeight: 1,
};

const subtitleStyle = {
  color: "#666",
  fontSize: "18px",
  marginBottom: "40px",
};

const gridStyle = {
  display: "grid",
  gap: "16px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  padding: "24px",
  textDecoration: "none",
};

const cardTitleStyle = {
  color: "#111",
  fontSize: "24px",
  marginBottom: "8px",
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};