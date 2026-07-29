import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://athmov.com/about";

export const metadata: Metadata = {
  title: "Sobre ATHMOV | Marketplace deportivo premium",
  description:
    "Conoce ATHMOV, el marketplace especializado en material deportivo premium de segunda mano para pádel, golf, tenis y running.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Sobre ATHMOV | El juego continúa",
    description:
      "Una nueva forma de comprar y vender material deportivo premium de segunda mano.",
    url: pageUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre ATHMOV",
  url: pageUrl,
  description:
    "ATHMOV es un marketplace especializado en material deportivo premium de segunda mano.",
  mainEntity: {
    "@type": "Organization",
    name: "ATHMOV",
    url: "https://athmov.com",
    logo: "https://athmov.com/logo.png",
    description:
      "Marketplace de material deportivo premium de segunda mano para pádel, golf, tenis y running.",
  },
};

export default function AboutPage() {
  return (
   <main style={pageStyle} className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

      <section style={heroStyle}>
        <p style={eyebrowStyle}>SOBRE ATHMOV</p>

       <h1 style={titleStyle} className="about-title">
          El mejor material
          <br />
          merece seguir jugando.
        </h1>

        <p style={introStyle}>
          ATHMOV es un marketplace especializado en material deportivo premium
          de segunda mano. Un espacio creado para conectar productos que todavía
          tienen mucho que ofrecer con deportistas que buscan calidad,
          confianza y una forma más inteligente de comprar.
        </p>
      </section>

     <section style={storyGridStyle} className="about-story-grid">
        <article style={darkCardStyle}>
          <p style={cardEyebrowStyle}>NUESTRA IDEA</p>

          <h2 style={darkTitleStyle}>
            El valor de un producto no termina con su primer propietario.
          </h2>

          <p style={darkTextStyle}>
            Una pala, una raqueta, un driver o unas zapatillas premium pueden
            conservar rendimiento, diseño y valor mucho después de su primera
            etapa de uso.
          </p>
        </article>

        <article style={lightCardStyle}>
          <p style={cardEyebrowDarkStyle}>NUESTRA MISIÓN</p>

          <h2 style={lightTitleStyle}>
            Hacer más segura y sencilla la compraventa deportiva.
          </h2>

          <p style={lightTextStyle}>
            Queremos ofrecer una experiencia especializada, cuidada y
            transparente para compradores y vendedores de material deportivo.
          </p>
        </article>
      </section>

      <section style={valuesSectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>POR QUÉ ATHMOV</p>

          <h2 style={sectionTitleStyle}>
            Un marketplace creado para deportistas.
          </h2>
        </div>

        <div style={valuesGridStyle} className="about-values-grid">
          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>01</span>
            <h3 style={valueTitleStyle}>Especialización</h3>
            <p style={valueTextStyle}>
              Una plataforma centrada en pádel, golf, tenis y running.
            </p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>02</span>
            <h3 style={valueTitleStyle}>Confianza</h3>
            <p style={valueTextStyle}>
              Pagos seguros, vendedores identificados y protección en cada
              operación.
            </p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>03</span>
            <h3 style={valueTitleStyle}>Calidad</h3>
            <p style={valueTextStyle}>
              Material seleccionado para quienes buscan productos con valor
              real.
            </p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>04</span>
            <h3 style={valueTitleStyle}>Segunda vida</h3>
            <p style={valueTextStyle}>
              Más uso, menos desperdicio y una forma más responsable de
              consumir.
            </p>
          </article>
        </div>
      </section>

      <section style={sportsSectionStyle}>
        <p style={sectionEyebrowStyle}>NUESTROS DEPORTES</p>

        <div style={sportsGridStyle} className="about-sports-grid">
          <Link href="/products?category=PADEL" style={sportCardStyle}>
            <span>PÁDEL</span>
            <strong>Explorar →</strong>
          </Link>

          <Link href="/products?category=GOLF" style={sportCardStyle}>
            <span>GOLF</span>
            <strong>Explorar →</strong>
          </Link>

          <Link href="/products?category=TENIS" style={sportCardStyle}>
            <span>TENIS</span>
            <strong>Explorar →</strong>
          </Link>

          <Link href="/products?category=RUNNING" style={sportCardStyle}>
            <span>RUNNING</span>
            <strong>Explorar →</strong>
          </Link>
        </div>
      </section>

      <section style={ctaStyle} className="about-cta">
        <p style={ctaEyebrowStyle}>THE GAME CONTINUES.</p>

        <h2 style={ctaTitleStyle} className="about-cta-title">
          Compra mejor.
          <br />
          Vende lo que todavía tiene historia.
        </h2>

       <div style={ctaButtonsStyle} className="about-cta-buttons">
          <Link href="/products" style={primaryButtonStyle}>
            EXPLORAR MARKETPLACE
          </Link>

          <Link href="/sell" style={secondaryButtonStyle}>
            VENDER MATERIAL
          </Link>
        </div>
      </section>

      <style>{`
        .about-value-card,
        .about-sport-card {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .about-value-card:hover,
        .about-sport-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.09);
        }

        @media (max-width: 850px) {
          .about-page {
            padding: 120px 20px 60px !important;
          }

          .about-title {
            font-size: 52px !important;
            letter-spacing: -3px !important;
          }

          .about-story-grid,
          .about-values-grid,
          .about-sports-grid {
            grid-template-columns: 1fr !important;
          }

          .about-card {
            padding: 30px !important;
            min-height: auto !important;
          }

          .about-cta {
            padding: 42px 26px !important;
          }

          .about-cta-title {
            font-size: 42px !important;
          }

          .about-cta-buttons {
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "150px 40px 90px",
  background: "#f7f5f0",
  color: "#111",
  fontFamily: "Inter, sans-serif",
} as const;

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
} as const;

const eyebrowStyle = {
  marginBottom: "22px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
  color: "#a58d5a",
} as const;

const titleStyle = {
  margin: 0,
  maxWidth: "1000px",
  fontSize: "82px",
  lineHeight: 0.97,
  letterSpacing: "-5px",
  fontWeight: 600,
} as const;

const introStyle = {
  maxWidth: "760px",
  marginTop: "34px",
  color: "#666",
  fontSize: "19px",
  lineHeight: 1.8,
} as const;

const storyGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
} as const;

const darkCardStyle = {
  minHeight: "430px",
  padding: "44px",
  borderRadius: "36px",
  background: "#111",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
} as const;

const lightCardStyle = {
  minHeight: "430px",
  padding: "44px",
  borderRadius: "36px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
} as const;

const cardEyebrowStyle = {
  marginBottom: "18px",
  color: "#c9b896",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const cardEyebrowDarkStyle = {
  ...cardEyebrowStyle,
  color: "#a58d5a",
} as const;

const darkTitleStyle = {
  margin: 0,
  fontSize: "40px",
  lineHeight: 1.05,
  letterSpacing: "-2px",
} as const;

const lightTitleStyle = {
  ...darkTitleStyle,
  color: "#111",
} as const;

const darkTextStyle = {
  marginTop: "22px",
  color: "rgba(255,255,255,0.65)",
  fontSize: "16px",
  lineHeight: 1.75,
} as const;

const lightTextStyle = {
  ...darkTextStyle,
  color: "#666",
} as const;

const valuesSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const sectionHeaderStyle = {
  marginBottom: "30px",
} as const;

const sectionEyebrowStyle = {
  marginBottom: "10px",
  color: "#a58d5a",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const sectionTitleStyle = {
  margin: 0,
  maxWidth: "700px",
  fontSize: "46px",
  lineHeight: 1.05,
  letterSpacing: "-2.5px",
} as const;

const valuesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "16px",
} as const;

const valueCardStyle = {
  minHeight: "230px",
  padding: "28px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
} as const;

const valueNumberStyle = {
  display: "block",
  marginBottom: "46px",
  color: "#a58d5a",
  fontSize: "12px",
  fontWeight: 900,
} as const;

const valueTitleStyle = {
  margin: "0 0 12px",
  fontSize: "23px",
} as const;

const valueTextStyle = {
  margin: 0,
  color: "#666",
  lineHeight: 1.65,
} as const;

const sportsSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const sportsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "14px",
  marginTop: "20px",
} as const;

const sportCardStyle = {
  minHeight: "130px",
  padding: "25px",
  borderRadius: "26px",
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.07)",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontSize: "14px",
  fontWeight: 900,
  letterSpacing: "1.5px",
} as const;

const ctaStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "65px",
  borderRadius: "40px",
  background: "#111",
  color: "#fff",
} as const;

const ctaEyebrowStyle = {
  color: "#c9b896",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const ctaTitleStyle = {
  maxWidth: "850px",
  margin: "22px 0 36px",
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
} as const;

const ctaButtonsStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
} as const;

const primaryButtonStyle = {
  padding: "16px 24px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1.4px",
} as const;

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
} as const;