export default function BlogPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV JOURNAL</p>

        <h1 style={titleStyle}>Guías y mercado</h1>

        <p style={textStyle}>
          Consejos para comprar, vender y entender el mercado premium de segunda
          mano deportivo.
        </p>
      </section>

      <section style={gridStyle}>
        <a
          href="/blog/cuando-comprar-vender-palos-golf-segunda-mano"
          style={cardStyle}
        >
          <p style={cardEyebrowStyle}>GOLF · MERCADO</p>
          <h2 style={cardTitleStyle}>
            Cuándo comprar y vender palos de golf de segunda mano
          </h2>
          <p style={cardTextStyle}>
            El calendario clave para compradores y vendedores de golf premium.
          </p>
          <span style={readMoreStyle}>Leer guía →</span>
        </a>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
  padding: "120px 60px 90px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1100px",
  margin: "0 auto 60px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
};

const textStyle = {
  maxWidth: "620px",
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "20px",
};

const gridStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "34px",
  padding: "34px",
  textDecoration: "none",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.05)",
};

const cardEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
};

const cardTitleStyle = {
  fontSize: "34px",
  lineHeight: 1.1,
  letterSpacing: "-2px",
  marginTop: "16px",
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};

const readMoreStyle = {
  display: "inline-block",
  marginTop: "22px",
  fontWeight: 900,
};