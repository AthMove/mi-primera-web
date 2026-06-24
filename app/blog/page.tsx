"use client";

import { useRouter } from "next/navigation";

const heroTags = [
  { label: "Golf", href: "/blog/golf" },
  { label: "Pádel", href: "/blog/padel" },
  { label: "Tenis", href: "/blog/tenis" },
  { label: "Running", href: "/blog/running" },
];

const featuredArticle = {
  category: "RUNNING · GUÍA",
  title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
  text: "Suela, mediasuela, talón y kilómetros: lo que debes comprobar antes de comprar.",
  href: "/blog/que-revisar-zapatillas-running-segunda-mano",
  reading: "6 min",
};

const sports = [
  {
    label: "⛳ GOLF",
    title: "Golf",
    text: "Compra, venta y valoración de palos.",
    href: "/blog/golf",
  },
  {
    label: "🏓 PÁDEL",
    title: "Pádel",
    text: "Autenticidad, precios y palas usadas.",
    href: "/blog/padel",
  },
  {
    label: "🎾 TENIS",
    title: "Tenis",
    text: "Raquetas, verificación y segunda mano.",
    href: "/blog/tenis",
  },
  {
    label: "🏃 RUNNING",
    title: "Running",
    text: "Zapatillas, kilómetros y desgaste.",
    href: "/blog/running",
  },
];

const allArticles = [
  {
    category: "GOLF · AUTENTICIDAD",
    title: "Cómo verificar unos palos de golf originales",
    href: "/blog/como-verificar-palos-golf-originales",
    reading: "6 min",
  },
  {
    category: "GOLF · MERCADO",
    title: "Cómo calcular el precio de palos de golf de segunda mano",
    href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "PÁDEL · AUTENTICIDAD",
    title: "Cómo detectar una pala de pádel falsa",
    href: "/blog/como-detectar-pala-padel-falsa",
    reading: "7 min",
  },
  {
    category: "PÁDEL · MERCADO",
    title: "Cómo valorar una pala de pádel de segunda mano",
    href: "/blog/como-valorar-pala-padel-segunda-mano",
    reading: "6 min",
  },
  {
    category: "TENIS · AUTENTICIDAD",
    title: "Cómo verificar una raqueta de tenis original",
    href: "/blog/como-verificar-raqueta-tenis-original",
    reading: "6 min",
  },
  {
    category: "TENIS · COMPRA",
    title: "Qué revisar antes de comprar una raqueta de tenis de segunda mano",
    href: "/blog/que-revisar-raqueta-tenis-segunda-mano",
    reading: "6 min",
  },
  {
    category: "TENIS · VALORACIÓN",
    title: "Cómo valorar una raqueta de tenis de segunda mano",
    href: "/blog/como-valorar-raqueta-tenis-segunda-mano",
    reading: "5 min",
  },
  {
    category: "RUNNING · COMPRA",
    title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
    href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    reading: "6 min",
  },
  {
    category: "RUNNING · ESTADO",
    title: "Cómo saber si unas zapatillas de running están agotadas",
    href: "/blog/como-saber-si-zapatillas-running-estan-agotadas",
    reading: "5 min",
  },
  {
    category: "RUNNING · VALORACIÓN",
    title: "Cuántos kilómetros puede tener una zapatilla de running usada",
    href: "/blog/cuantos-kilometros-puede-tener-zapatilla-running-usada",
    reading: "5 min",
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
          vender y valorar mejor.
        </h1>

        <p style={textStyle}>
          Una biblioteca editorial para entender el valor real del material
          deportivo premium de segunda mano.
        </p>

        <div style={tagRowStyle}>
          {heroTags.map((tag) => (
            <button
              key={tag.href}
              onClick={() => router.push(tag.href)}
              style={tagStyle}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      <section style={featuredSectionStyle}>
        <article
          onClick={() => router.push(featuredArticle.href)}
          style={heroArticleStyle}
          className="lift-card"
        >
          <div style={heroArticleContentStyle}>
            <p style={darkCategoryStyle}>{featuredArticle.category}</p>

            <h2 style={heroArticleTitleStyle}>{featuredArticle.title}</h2>

            <p style={heroArticleTextStyle}>{featuredArticle.text}</p>
          </div>

          <div style={heroArticleFooterStyle}>
            <span>{featuredArticle.reading}</span>
            <span>Leer guía →</span>
          </div>
        </article>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>Por deporte</p>
          <h2 style={sectionTitleStyle}>Explora las categorías</h2>
        </div>

        <div style={sportsGridStyle}>
          {sports.map((sport) => (
            <a key={sport.href} href={sport.href} style={sportCardStyle}>
              <span style={sportLabelStyle}>{sport.label}</span>
              <h3 style={sportTitleStyle}>{sport.title}</h3>
              <p style={sportTextStyle}>{sport.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section style={libraryStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>Biblioteca ATHMOV</p>
          <h2 style={sectionTitleStyle}>Todas las guías</h2>
        </div>

        <div style={listStyle}>
          {allArticles.map((article) => (
            <button
              key={article.href}
              onClick={() => router.push(article.href)}
              style={listItemStyle}
              className="list-item"
            >
              <div>
                <p style={listCategoryStyle}>{article.category}</p>
                <h3 style={listTitleStyle}>{article.title}</h3>
              </div>

              <span style={listReadingStyle}>{article.reading} →</span>
            </button>
          ))}
        </div>
      </section>

      <style>{`
        .lift-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .lift-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 34px 100px rgba(0,0,0,0.16) !important;
        }

        .list-item {
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .list-item:hover {
          background: #fff !important;
          transform: translateX(4px);
        }

        @media (max-width: 800px) {
          main {
            padding: 110px 22px 70px !important;
          }

          .athmov-blog-title {
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
  margin: "0 auto 68px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "20px",
  fontWeight: 900,
};

const titleStyle = {
  fontSize: "76px",
  lineHeight: 0.98,
  letterSpacing: "-4px",
  margin: 0,
  fontWeight: 600,
};

const textStyle = {
  maxWidth: "680px",
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.8,
  marginTop: "26px",
};

const tagRowStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "30px",
};

const tagStyle = {
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#fff",
  borderRadius: "999px",
  padding: "12px 18px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
  cursor: "pointer",
};

const featuredSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 74px",
};

const heroArticleStyle = {
  minHeight: "430px",
  background: "#0f0e0c",
  color: "#fff",
  borderRadius: "38px",
  padding: "42px",
  cursor: "pointer",
  boxShadow: "0 28px 90px rgba(0,0,0,0.14)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  position: "relative" as const,
  overflow: "hidden",
};

const heroArticleContentStyle = {
  maxWidth: "780px",
  position: "relative" as const,
  zIndex: 2,
};

const darkCategoryStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "20px",
};

const heroArticleTitleStyle = {
  fontSize: "52px",
  lineHeight: 1.02,
  letterSpacing: "-3px",
  margin: 0,
};

const heroArticleTextStyle = {
  maxWidth: "620px",
  color: "rgba(255,255,255,0.62)",
  fontSize: "17px",
  lineHeight: 1.75,
  marginTop: "24px",
};

const heroArticleFooterStyle = {
  position: "relative" as const,
  zIndex: 2,
  paddingTop: "24px",
  borderTop: "1px solid rgba(255,255,255,0.12)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 76px",
};

const libraryStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const sectionHeaderStyle = {
  marginBottom: "22px",
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
  margin: 0,
};

const sportsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "16px",
};

const sportCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "28px",
  padding: "26px",
  textDecoration: "none",
  minHeight: "180px",
};

const sportLabelStyle = {
  fontSize: "11px",
  fontWeight: 900,
  color: "#c9b896",
  letterSpacing: "2px",
};

const sportTitleStyle = {
  color: "#111",
  fontSize: "28px",
  marginTop: "14px",
  marginBottom: "10px",
};

const sportTextStyle = {
  color: "#666",
  lineHeight: 1.65,
  margin: 0,
};

const listStyle = {
  borderTop: "1px solid rgba(0,0,0,0.10)",
};

const listItemStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(0,0,0,0.10)",
  padding: "24px 0",
  textAlign: "left" as const,
  cursor: "pointer",
  color: "#111",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
};

const listCategoryStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "8px",
};

const listTitleStyle = {
  fontSize: "24px",
  lineHeight: 1.25,
  letterSpacing: "-0.5px",
  margin: 0,
};

const listReadingStyle = {
  fontSize: "12px",
  fontWeight: 900,
  color: "#555",
  flexShrink: 0,
};