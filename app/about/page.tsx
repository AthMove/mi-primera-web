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

      <section style={transparencySectionStyle}>
  <div style={sectionHeaderStyle}>
    <p style={sectionEyebrowStyle}>QUIÉN ESTÁ DETRÁS</p>

    <h2 style={sectionTitleStyle}>
      Un proyecto deportivo y tecnológico desarrollado en España.
    </h2>
  </div>

  <div style={transparencyGridStyle} className="about-transparency-grid">
    <article style={transparencyCardStyle}>
      <span style={valueNumberStyle}>01</span>

      <h3 style={valueTitleStyle}>El proyecto</h3>

      <p style={valueTextStyle}>
        ATHMOV es una plataforma especializada en material deportivo premium
        de segunda mano, inicialmente centrada en pádel, golf, tenis y
        running.
      </p>
    </article>

    <article style={transparencyCardStyle}>
      <span style={valueNumberStyle}>02</span>

      <h3 style={valueTitleStyle}>El equipo</h3>

      <p style={valueTextStyle}>
        La plataforma reúne trabajo en estrategia, tecnología, producto,
        operaciones, marketing y comunidad deportiva. ATHMOV se encuentra
        actualmente en una fase inicial de crecimiento.
      </p>
    </article>

    <article style={transparencyCardStyle}>
      <span style={valueNumberStyle}>03</span>

      <h3 style={valueTitleStyle}>Ubicación</h3>

      <p style={valueTextStyle}>
        ATHMOV se desarrolla y gestiona desde España, con vocación de crear
        una comunidad europea de compraventa deportiva.
      </p>
    </article>
  </div>
</section>

<section
  style={independenceSectionStyle}
  className="about-independence"
>
  <div>
    <p style={ctaEyebrowStyle}>FINANCIACIÓN</p>

    <h2 style={independenceTitleStyle}>
      Un proyecto independiente.
    </h2>
  </div>

  <div style={independenceTextStyle}>
    <p>
      ATHMOV se encuentra en una fase inicial y se está desarrollando como
      un proyecto independiente.
    </p>

    <p>
      Si en el futuro se incorporan socios, inversión externa, aceleradoras
      u otras formas de financiación relevantes, esta información se
      actualizará para mantener una comunicación transparente.
    </p>
  </div>
</section>

<section style={businessSectionStyle}>
  <div style={sectionHeaderStyle}>
    <p style={sectionEyebrowStyle}>MODELO DE NEGOCIO</p>

    <h2 style={sectionTitleStyle}>
      Cómo se financia ATHMOV.
    </h2>

    <p style={businessIntroStyle}>
      Queremos que compradores y vendedores sepan desde el principio cómo
      funciona la plataforma y qué costes se aplican.
    </p>
  </div>

  <div style={pricingGridStyle} className="about-pricing-grid">
    <article style={pricingCardStyle}>
      <p style={pricingLabelStyle}>PUBLICACIÓN</p>

      <strong style={pricingPriceStyle}>0 €</strong>

      <h3 style={pricingTitleStyle}>Publicar es gratuito</h3>

      <p style={pricingTextStyle}>
        El vendedor puede publicar su material deportivo sin pagar una
        cuota inicial.
      </p>
    </article>

    <article style={featuredPricingCardStyle}>
      <p style={featuredPricingLabelStyle}>COMISIÓN ATHMOV</p>

      <strong style={featuredPricingPriceStyle}>8 %</strong>

      <h3 style={featuredPricingTitleStyle}>
        Solo cuando se vende
      </h3>

      <p style={featuredPricingTextStyle}>
        ATHMOV aplica una comisión del 8 % sobre el precio del producto
        cuando la operación se completa correctamente.
      </p>
    </article>

    <article style={pricingCardStyle}>
      <p style={pricingLabelStyle}>SUSCRIPCIÓN</p>

      <strong style={pricingPriceStyle}>0 €</strong>

      <h3 style={pricingTitleStyle}>Sin cuota mensual</h3>

      <p style={pricingTextStyle}>
        Actualmente no es necesario contratar una suscripción para comprar
        o publicar productos.
      </p>
    </article>
  </div>
</section>

<section style={exampleSectionStyle}>
  <div style={sectionHeaderStyle}>
    <p style={sectionEyebrowStyle}>EJEMPLO DE VENTA</p>

    <h2 style={sectionTitleStyle}>
      Una operación de 200 €.
    </h2>
  </div>

  <div style={calculationCardStyle}>
    <div style={calculationRowStyle}>
      <span>Precio del producto</span>
      <strong>200,00 €</strong>
    </div>

    <div style={calculationRowStyle}>
      <span>Comisión ATHMOV (8 %)</span>
      <strong>−16,00 €</strong>
    </div>

    <div style={calculationRowStyle}>
      <span>Procesamiento de pago estimado</span>
      <strong>−3,25 €</strong>
    </div>

    <div style={calculationTotalStyle}>
      <span>Importe estimado para el vendedor</span>
      <strong>180,75 €</strong>
    </div>
  </div>

  <p style={calculationNoteStyle}>
    El coste de procesamiento es una estimación y puede variar según el
    método de pago, el país y las condiciones del proveedor de pagos. El
    desglose definitivo debe mostrarse antes de confirmar la operación.
  </p>
</section>

<section style={legalSectionStyle} className="about-legal">
  <div>
    <p style={sectionEyebrowStyle}>INFORMACIÓN CORPORATIVA</p>

    <h2 style={sectionTitleStyle}>
      Datos legales y contacto.
    </h2>
  </div>

  <div>
    <div style={legalCardStyle}>
      <div style={legalRowStyle}>
        <span style={legalLabelStyle}>Nombre comercial</span>
        <strong>ATHMOV</strong>
      </div>

      <div style={legalRowStyle}>
        <span style={legalLabelStyle}>Actividad</span>
        <strong>Marketplace de material deportivo</strong>
      </div>

      <div style={legalRowStyle}>
        <span style={legalLabelStyle}>País de gestión</span>
        <strong>España</strong>
      </div>

      <div style={legalLastRowStyle}>
        <span style={legalLabelStyle}>Correo electrónico</span>

        <a href="mailto:contact@athmov.com" style={legalLinkStyle}>
          contact@athmov.com
        </a>
      </div>
    </div>

    <p style={legalNoteStyle}>
      La razón social, identificación fiscal y domicilio social se
      incorporarán a esta página y al aviso legal cuando correspondan a la
      entidad responsable de la plataforma.
    </p>
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
        .about-transparency-grid,
.about-pricing-grid {
  grid-template-columns: 1fr !important;
}

.about-independence,
.about-legal {
  grid-template-columns: 1fr !important;
  padding: 30px !important;
}
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

const transparencySectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const transparencyGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
} as const;

const transparencyCardStyle = {
  minHeight: "260px",
  padding: "30px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
} as const;

const independenceSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  padding: "55px",
  borderRadius: "38px",
  background: "#111",
  color: "#fff",
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "60px",
} as const;

const independenceTitleStyle = {
  margin: "18px 0 0",
  fontSize: "48px",
  lineHeight: 1.05,
  letterSpacing: "-2.5px",
} as const;

const independenceTextStyle = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "17px",
  lineHeight: 1.8,
} as const;

const businessSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const businessIntroStyle = {
  maxWidth: "720px",
  marginTop: "20px",
  color: "#666",
  lineHeight: 1.8,
} as const;

const pricingGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
} as const;

const pricingCardStyle = {
  minHeight: "310px",
  padding: "30px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const featuredPricingCardStyle = {
  ...pricingCardStyle,
  background: "#111",
  color: "#fff",
} as const;

const pricingLabelStyle = {
  margin: 0,
  color: "#a58d5a",
  fontSize: "10px",
  fontWeight: 900,
  letterSpacing: "2px",
} as const;

const featuredPricingLabelStyle = {
  ...pricingLabelStyle,
  color: "#c9b896",
} as const;

const pricingPriceStyle = {
  display: "block",
  marginTop: "28px",
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
} as const;

const featuredPricingPriceStyle = {
  ...pricingPriceStyle,
  color: "#fff",
} as const;

const pricingTitleStyle = {
  margin: "28px 0 12px",
  fontSize: "24px",
} as const;

const featuredPricingTitleStyle = {
  ...pricingTitleStyle,
  color: "#fff",
} as const;

const pricingTextStyle = {
  margin: 0,
  color: "#666",
  lineHeight: 1.75,
} as const;

const featuredPricingTextStyle = {
  ...pricingTextStyle,
  color: "rgba(255,255,255,0.65)",
} as const;

const exampleSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const calculationCardStyle = {
  overflow: "hidden",
  borderRadius: "30px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const calculationRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "30px",
  padding: "24px 30px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
} as const;

const calculationTotalStyle = {
  ...calculationRowStyle,
  borderBottom: "none",
  background: "#111",
  color: "#fff",
} as const;

const calculationNoteStyle = {
  maxWidth: "850px",
  margin: "20px 0 0",
  color: "#777",
  fontSize: "13px",
  lineHeight: 1.75,
} as const;

const legalSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  display: "grid",
  gridTemplateColumns: "0.8fr 1.2fr",
  gap: "55px",
} as const;

const legalCardStyle = {
  overflow: "hidden",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const legalRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "25px",
  padding: "22px 26px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
} as const;

const legalLastRowStyle = {
  ...legalRowStyle,
  borderBottom: "none",
} as const;

const legalLabelStyle = {
  color: "#777",
  fontSize: "13px",
} as const;

const legalLinkStyle = {
  color: "#111",
  fontSize: "14px",
  fontWeight: 800,
  textDecoration: "none",
} as const;

const legalNoteStyle = {
  maxWidth: "850px",
  margin: "20px 0 0",
  color: "#777",
  fontSize: "13px",
  lineHeight: 1.75,
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