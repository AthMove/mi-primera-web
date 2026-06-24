import Link from "next/link";

export const metadata = {
  title: "Blog de Running | ATHMOV",
  description:
    "Guías para comprar, vender y revisar zapatillas y material de running de segunda mano.",
};

const articles = [
  {
    title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
    description:
      "Aprende a comprobar suela, mediasuela, upper, talón y kilómetros antes de comprar.",
    href: "/blog/que-revisar-zapatillas-running-segunda-mano",
  },
];

export default function RunningBlogPage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>ATHMOV · RUNNING</p>

        <h1 style={titleStyle}>Blog de Running</h1>

        <p style={subtitleStyle}>
          Guías para comprar, vender y revisar zapatillas de running usadas.
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