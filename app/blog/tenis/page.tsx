import Link from "next/link";

export const metadata = {
  title: "Blog de Tenis | ATHMOV",
  description:
    "Guías para verificar, comprar y vender material de tenis de segunda mano.",
};

const articles = [
  {
    title: "Cómo verificar una raqueta de tenis original",
    description:
      "Aprende a comprobar seriales, acabados, peso y detalles de autenticidad antes de comprar.",
    href: "/blog/como-verificar-raqueta-tenis-original",
  },
];

export default function TennisBlogPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>ATHMOV · TENIS</p>

        <h1 style={titleStyle}>Blog de Tenis</h1>

        <p style={subtitleStyle}>
          Guías para verificar, comprar y vender material de tenis de segunda mano.
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
  color: "#111",
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