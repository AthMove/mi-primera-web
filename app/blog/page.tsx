"use client";

import { useRouter } from "next/navigation";

const articles = [
  {
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    text: "El calendario que utilizan los compradores inteligentes para pagar menos y los vendedores para vender más rápido.",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "PÁDEL · AUTENTICIDAD",
    title: "Cómo detectar una pala de pádel falsa",
    text: "Las señales que debes revisar antes de comprar una pala premium de segunda mano.",
    href: "/blog/como-detectar-pala-padel-falsa",
    reading: "7 min",
  },
  {
    category: "TENIS · AUTENTICIDAD",
    title: "Cómo verificar una raqueta de tenis original",
    text: "Seriales, peso, balance, pintura y acabados: la guía rápida antes de comprar.",
    href: "/blog/como-verificar-raqueta-tenis-original",
    reading: "6 min",
  },
  {
  category: "GOLF · MERCADO",
  title: "Cómo calcular el precio de palos de golf de segunda mano",
  text: "Guía para valorar drivers, hierros, wedges y sets completos según estado y demanda.",
  href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
  reading: "6 min",
},
{
  category: "PÁDEL · MERCADO",
  title: "Cómo calcular el precio de una pala de pádel usada",
  text: "Aprende a valorar correctamente una pala según marca, modelo, estado y antigüedad.",
  href: "/blog/como-valorar-pala-padel-segunda-mano",
  reading: "6 min",
},
];

export default function BlogPage() {
  const router = useRouter();

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV JOURNAL</p>

        <h1 style={titleStyle}>
          Guías para comprar,
          <br />
          vender y elegir mejor.
        </h1>

        <p style={textStyle}>
          Artículos creados por ATHMOV para ayudar a compradores y vendedores de
          material deportivo premium de segunda mano.
        </p>
      </section>

      <section style={gridStyle}>
        {articles.map((article) => (
          <article
            key={article.href}
            onClick={() => router.push(article.href)}
            style={cardStyle}
            className="blog-card"
          >
            <div>
              <p style={cardCategoryStyle}>{article.category}</p>

              <h2 style={cardTitleStyle}>{article.title}</h2>

              <p style={cardTextStyle}>{article.text}</p>
            </div>

            <div style={cardFooterStyle}>
              <span>{article.reading}</span>
              <span>Leer guía →</span>
            </div>
            <section style={relatedStyle}>
  <p style={relatedEyebrowStyle}>Más guías ATHMOV</p>

  <div style={sportsGridStyle}>
  <a href="/blog/golf" style={sportCardStyle}>
    <span style={sportLabelStyle}>⛳ GOLF</span>
    <h3 style={sportTitleStyle}>Guías de Golf</h3>
    <p style={sportTextStyle}>
      Compra, venta y valoración de material de golf.
    </p>
  </a>

  <a href="/blog/padel" style={sportCardStyle}>
    <span style={sportLabelStyle}>🏓 PÁDEL</span>
    <h3 style={sportTitleStyle}>Guías de Pádel</h3>
    <p style={sportTextStyle}>
      Verificación, precios y consejos para palas usadas.
    </p>
  </a>

  <a href="/blog/tenis" style={sportCardStyle}>
    <span style={sportLabelStyle}>🎾 TENIS</span>
    <h3 style={sportTitleStyle}>Guías de Tenis</h3>
    <p style={sportTextStyle}>
      Autenticidad, compra y material de segunda mano.
    </p>
  </a>
</div>

  <div style={relatedGridStyle}>
    <a href="/blog/como-calcular-precio-palos-golf-segunda-mano" style={relatedCardStyle}>
      <span style={relatedCategoryStyle}>GOLF · MERCADO</span>
      <strong style={relatedTitleStyle}>
        Cómo calcular el precio de palos de golf de segunda mano
      </strong>
    </a>

    <a href="/blog/como-verificar-raqueta-tenis-original" style={relatedCardStyle}>
      <span style={relatedCategoryStyle}>TENIS · AUTENTICIDAD</span>
      <strong style={relatedTitleStyle}>
        Cómo verificar una raqueta de tenis original
      </strong>
    </a>
  </div>
</section>
          </article>
        ))}
      </section>

      <style>{`
        .blog-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 34px 100px rgba(0,0,0,0.10) !important;
        }

        @media (max-width: 700px) {
          .blog-page-title {
            font-size: 46px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
  padding: "140px 40px 90px",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 58px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
  fontWeight: 600,
};

const textStyle = {
  maxWidth: "700px",
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.8,
  marginTop: "24px",
};

const gridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "24px",
};

const cardStyle = {
  minHeight: "390px",
  background: "#fff",
  borderRadius: "34px",
  padding: "34px",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

const cardCategoryStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  fontWeight: 900,
  marginBottom: "18px",
};

const cardTitleStyle = {
  fontSize: "34px",
  lineHeight: 1.08,
  letterSpacing: "-2px",
  margin: 0,
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.75,
  marginTop: "18px",
};

const cardFooterStyle = {
  marginTop: "34px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};
const relatedStyle = {
  marginTop: "54px",
  paddingTop: "34px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const relatedEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#777",
  fontWeight: 900,
  marginBottom: "18px",
};

const relatedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "14px",
};

const relatedCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "20px",
  textDecoration: "none",
  color: "#111",
};

const relatedCategoryStyle = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "10px",
};

const relatedTitleStyle = {
  fontSize: "18px",
  lineHeight: 1.35,
};

const sportsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "16px",
  marginBottom: "50px",
};

const sportCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  padding: "24px",
  textDecoration: "none",
};

const sportLabelStyle = {
  fontSize: "11px",
  fontWeight: 900,
  color: "#c9b896",
  letterSpacing: "2px",
};

const sportTitleStyle = {
  color: "#111",
  fontSize: "24px",
  marginTop: "10px",
  marginBottom: "8px",
};

const sportTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};