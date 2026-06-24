import Link from "next/link";

export default function RelatedArticles({
  articles,
}: {
  articles: {
    title: string;
    href: string;
    category: string;
  }[];
}) {
  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>MÁS GUÍAS ATHMOV</p>

      <h2 style={titleStyle}>
        También te puede interesar
      </h2>

      <div style={gridStyle}>
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            style={cardStyle}
          >
            <span style={categoryStyle}>
              {article.category}
            </span>

            <h3 style={cardTitleStyle}>
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

const sectionStyle = {
  marginTop: "70px",
  paddingTop: "50px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#c9b896",
  fontWeight: 900,
};

const titleStyle = {
  fontSize: "34px",
  marginTop: "10px",
  marginBottom: "24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "20px",
  textDecoration: "none",
};

const categoryStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
};

const cardTitleStyle = {
  color: "#111",
  fontSize: "20px",
  lineHeight: 1.4,
  marginTop: "10px",
};