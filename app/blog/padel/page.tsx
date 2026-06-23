import Link from "next/link";

export const metadata = {
  title: "Blog de Pádel | ATHMOV",
  description:
    "Guías para comprar, vender, verificar y valorar palas de pádel de segunda mano.",
};

const articles = [
  {
    title: "Cómo detectar una pala de pádel falsa",
    description:
      "Aprende a identificar seriales, acabados y señales de falsificación.",
    href: "/blog/como-detectar-pala-padel-falsa",
  },
  {
    title: "Cómo calcular el precio de una pala de pádel usada",
    description:
      "Guía para valorar una pala según marca, modelo, estado y antigüedad.",
    href: "/blog/como-valorar-pala-padel-segunda-mano",
  },
];

export default function PadelBlogPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>ATHMOV · PÁDEL</p>

        <h1 style={titleStyle}>Blog de Pádel</h1>

        <p style={subtitleStyle}>
          Consejos para comprar, vender y verificar material de pádel de segunda mano.
        </p>

        <div style={gridStyle}>
          {articles.map((article) => (
            <Link key={article.href} href={article.href} style={cardStyle}>
              <h2 style={cardTitleStyle}>{article.title}</h2>
              <p style={cardTextStyle}>{article.description}</p>
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