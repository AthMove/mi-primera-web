"use client";

import { useRouter } from "next/navigation";

const featuredArticles = [
  {
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    text: "El calendario que utilizan los compradores inteligentes para pagar menos y los vendedores para vender más rápido.",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "RUNNING · GUÍA",
    title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
    text: "Suela, mediasuela, talón y kilómetros: lo que debes comprobar antes de comprar.",
    href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    reading: "6 min",
  },
  {
    category: "TENIS · COMPRA",
    title: "Qué revisar antes de comprar una raqueta de tenis de segunda mano",
    text: "Marco, grietas, cordaje, grip y señales que deberías revisar antes de comprar.",
    href: "/blog/que-revisar-raqueta-tenis-segunda-mano",
    reading: "6 min",
  },
];

const sports = [
  {
    label: "⛳ GOLF",
    title: "Guías de Golf",
    text: "Compra, venta, verificación y valoración de palos de golf.",
    href: "/blog/golf",
  },
  {
    label: "🏓 PÁDEL",
    title: "Guías de Pádel",
    text: "Autenticidad, precios y consejos para palas usadas.",
    href: "/blog/padel",
  },
  {
    label: "🎾 TENIS",
    title: "Guías de Tenis",
    text: "Raquetas originales, compra segura y valoración de segunda mano.",
    href: "/blog/tenis",
  },
  {
    label: "🏃 RUNNING",
    title: "Guías de Running",
    text: "Zapatillas usadas, kilómetros, desgaste y compra inteligente.",
    href: "/blog/running",
  },
];

const allArticles = [
  {
    category: "GOLF · AUTENTICIDAD",
    title: "Cómo verificar unos palos de golf originales",
    text: "Seriales, grabados, varillas, grips y señales para detectar falsificaciones.",
    href: "/blog/como-verificar-palos-golf-originales",
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
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    text: "El calendario que utilizan compradores y vendedores para elegir mejor el momento.",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    reading: "6 min",
  },
  {
    category: "PÁDEL · AUTENTICIDAD",
    title: "Cómo detectar una pala de pádel falsa",
    text: "Las señales que debes revisar antes de comprar una pala premium usada.",
    href: "/blog/como-detectar-pala-padel-falsa",
    reading: "7 min",
  },
  {
    category: "PÁDEL · MERCADO",
    title: "Cómo valorar una pala de pádel de segunda mano",
    text: "Marca, modelo, estado, antigüedad y demanda para poner un precio correcto.",
    href: "/blog/como-valorar-pala-padel-segunda-mano",
    reading: "6 min",
  },
  {
    category: "TENIS · AUTENTICIDAD",
    title: "Cómo verificar una raqueta de tenis original",
    text: "Seriales, peso, balance, pintura y acabados antes de comprar.",
    href: "/blog/como-verificar-raqueta-tenis-original",
    reading: "6 min",
  },
  {
    category: "TENIS · COMPRA",
    title: "Qué revisar antes de comprar una raqueta de tenis de segunda mano",
    text: "Marco, grietas, cordaje, grip y señales que deberías revisar antes de comprar.",
    href: "/blog/que-revisar-raqueta-tenis-segunda-mano",
    reading: "6 min",
  },
  {
    category: "TENIS · VALORACIÓN",
    title: "Cómo valorar una raqueta de tenis de segunda mano",
    text: "Calcula el valor real según marca, estado, antigüedad y demanda.",
    href: "/blog/como-valorar-raqueta-tenis-segunda-mano",
    reading: "5 min",
  },
  {
    category: "RUNNING · COMPRA",
    title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
    text: "Suela, mediasuela, talón y kilómetros: lo que debes comprobar antes de comprar.",
    href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    reading: "6 min",
  },
  {
    category: "RUNNING · ESTADO",
    title: "Cómo saber si unas zapatillas de running están agotadas",
    text: "Detecta pérdida de amortiguación, estabilidad y vida útil.",
    href: "/blog/como-saber-si-zapatillas-running-estan-agotadas",
    reading: "5 min",
  },
  {
    category: "RUNNING · VALORACIÓN",
    title: "Cuántos kilómetros puede tener una zapatilla de running usada",
    text: "Cómo interpretar los kilómetros y valorar la vida útil restante.",
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
          vender y elegir mejor.
        </h1>

        <p style={textStyle}>
          Artículos creados por ATHMOV para ayudar a compradores y vendedores de
          material deportivo premium de segunda mano.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>Destacados</p>
          <h2 style={sectionTitleStyle}>Empieza por estas guías</h2>
        </div>

        <div style={featuredGridStyle}>
          {featuredArticles.map((article) => (
            <article
              key={article.href}
              onClick={() => router.push(article.href)}
              style={featuredCardStyle}
              className="blog-card"
            >
              <div>
                <p style={cardCategoryStyle}>{article.category}</p>
                <h3 style={cardTitleStyle}>{article.title}</h3>
                <p style={cardTextStyle}>{article.text}</p>
              </div>

              <div style={cardFooterStyle}>
                <span>{article.reading}</span>
                <span>Leer guía →</span>
              </div>
            </article>
          ))}
        </div>
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

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>Todas las guías</p>
          <h2 style={sectionTitleStyle}>Biblioteca ATHMOV</h2>
        </div>

        <div style={articleGridStyle}>
          {allArticles.map((article) => (
            <article
              key={article.href}
              onClick={() => router.push(article.href)}
              style={articleCardStyle}
              className="blog-card"
            >
              <div>
                <p style={cardCategoryStyle}>{article.category}</p>
                <h3 style={smallCardTitleStyle}>{article.title}</h3>
                <p style={smallCardTextStyle}>{article.text}</p>
              </div>

              <div style={smallCardFooterStyle}>
                <span>{article.reading}</span>
                <span>Leer →</span>
              </div>
            </article>
          ))}
        </div>
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
          .blog-title {
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
  margin: "0 auto 70px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "20px",
  fontWeight: 900,
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

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 74px",
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

const featuredGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "24px",
};

const featuredCardStyle = {
  minHeight: "360px",
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

const articleGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "18px",
};

const articleCardStyle = {
  minHeight: "270px",
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 16px 50px rgba(0,0,0,0.035)",
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

const smallCardTitleStyle = {
  fontSize: "25px",
  lineHeight: 1.12,
  letterSpacing: "-1px",
  margin: 0,
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.75,
  marginTop: "18px",
};

const smallCardTextStyle = {
  color: "#666",
  lineHeight: 1.65,
  marginTop: "14px",
  fontSize: "14px",
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

const smallCardFooterStyle = {
  marginTop: "26px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const sportsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "16px",
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

const listStyle = {
  display: "grid",
  gap: "12px",
};

const listItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "22px",
  padding: "22px 24px",
  textDecoration: "none",
  color: "#111",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const listCategoryStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "8px",
};

const listTitleStyle = {
  fontSize: "22px",
  lineHeight: 1.3,
  margin: 0,
};

const listReadingStyle = {
  fontSize: "12px",
  fontWeight: 900,
  color: "#555",
  flexShrink: 0,
};