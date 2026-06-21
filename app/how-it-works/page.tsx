"use client";

export default function HowItWorksPage() {
  return (
    <main style={pageStyle} className="how-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>CÓMO FUNCIONA ATHMOV</p>

        <h1 style={titleStyle}>
          Directo.
          <br />
          Verificado.
          <br />
          <em style={mutedItalicStyle}>Premium.</em>
        </h1>

        <p style={textStyle}>
          ATHMOV combina envío directo entre particulares con verificación por
          niveles. Más valor, más control. Simple para el vendedor, seguro para
          el comprador.
        </p>

        <div style={flowStyle}>
          {["Publicas", "ATHMOV verifica", "Envío directo", "Confirmas"].map(
            (item, index) => (
              <div key={item} style={flowItemStyle}>
                <span style={flowNumberStyle}>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            )
          )}
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={eyebrowStyle}>PROCESO DEL VENDEDOR</p>
        <h2 style={sectionTitleStyle}>Si vendes</h2>

        <div style={cardsStyle}>
          {[
            [
              "Publica con fotos reales",
              "Sube imágenes propias, estado honesto y un precio justo.",
            ],
            [
              "Graba vídeo en tiempo real",
              "Cuando haya comprador, muestras serial, estado y embalaje.",
            ],
            [
              "ATHMOV da el OK",
              "Solo tras validar el vídeo se activa el envío.",
            ],
            [
              "Envía con seguimiento",
              "SEUR, MRW o DHL Express. El comprador sigue el pedido.",
            ],
          ].map(([title, text], index) => (
            <article key={title} style={cardStyle}>
              <span style={cardNumberStyle}>{index + 1}</span>
              <h3 style={cardTitleStyle}>{title}</h3>
              <p style={cardTextStyle}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={darkSectionStyle}>
        <p style={eyebrowLightStyle}>VERIFICACIÓN ATHMOV</p>
        <h2 style={darkTitleStyle}>
          Tres niveles
          <br />
          de control.
        </h2>

        <div style={levelsStyle}>
          {[
            [
              "01",
              "Verificación en vídeo",
              "Todos los artículos",
              "El vendedor graba serial, estado físico y embalaje. ATHMOV revisa antes de activar el envío.",
            ],
            [
              "02",
              "Revisión física partner",
              "Artículos +300 €",
              "El artículo puede pasar por una tienda especializada de confianza antes de llegar al comprador.",
            ],
            [
              "03",
              "ATHMOV Certified",
              "Próximamente",
              "Revisión técnica propia con sello certificado ATHMOV.",
            ],
          ].map(([num, title, badge, text]) => (
            <article key={title} style={levelCardStyle}>
              <div style={levelTopStyle}>
                <span style={levelNumberStyle}>{num}</span>
                <div>
                  <h3 style={levelTitleStyle}>{title}</h3>
                  <span style={levelBadgeStyle}>{badge}</span>
                </div>
              </div>

              <p style={levelTextStyle}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={eyebrowStyle}>PROCESO DEL COMPRADOR</p>
        <h2 style={sectionTitleStyle}>Si compras</h2>

        <div style={cardsStyle}>
          {[
            [
              "Puedes pedir el vídeo",
              "Ves exactamente qué revisó ATHMOV antes del envío.",
            ],
            [
              "Graba tu unboxing",
              "Si hay daño de transporte, ese vídeo ayuda a abrir una incidencia.",
            ],
            [
              "48 h para revisar",
              "Tienes tiempo para comprobar el producto recibido.",
            ],
            [
              "El pago se libera después",
              "El vendedor cobra cuando el pedido se completa correctamente.",
            ],
          ].map(([title, text], index) => (
            <article key={title} style={cardStyle}>
              <span style={cardNumberStyle}>{index + 1}</span>
              <h3 style={cardTitleStyle}>{title}</h3>
              <p style={cardTextStyle}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={ctaStyle}>
        <p style={eyebrowLightStyle}>SEGUNDA MANO. PRIMERA CLASE.</p>

        <h2 style={ctaTitleStyle}>
          Compra y vende material deportivo premium con confianza real.
        </h2>

        <div style={ctaButtonsStyle}>
          <a href="/products" style={primaryButtonStyle}>
            Comprar material
          </a>

          <a href="/sell" style={secondaryDarkButtonStyle}>
            Vender material
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .how-page {
            padding: 120px 18px 40px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "82px",
  lineHeight: 0.95,
  letterSpacing: "-5px",
  margin: 0,
};

const mutedItalicStyle = {
  fontStyle: "italic",
  opacity: 0.35,
};

const textStyle = {
  maxWidth: "620px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "28px",
};

const flowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "14px",
  marginTop: "42px",
};

const flowItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "24px",
  padding: "22px",
};

const flowNumberStyle = {
  display: "block",
  fontSize: "11px",
  opacity: 0.4,
  marginBottom: "10px",
  fontWeight: 900,
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const sectionTitleStyle = {
  fontSize: "52px",
  letterSpacing: "-3px",
  marginTop: 0,
};

const cardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const cardNumberStyle = {
  fontSize: "32px",
  opacity: 0.15,
  fontWeight: 900,
};

const cardTitleStyle = {
  fontSize: "22px",
  marginTop: "18px",
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};

const darkSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const eyebrowLightStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
};

const darkTitleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  letterSpacing: "-3px",
  marginTop: 0,
};

const levelsStyle = {
  display: "grid",
  gap: "18px",
  marginTop: "34px",
};

const levelCardStyle = {
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "28px",
  padding: "26px",
  background: "rgba(255,255,255,0.04)",
};

const levelTopStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "flex-start",
};

const levelNumberStyle = {
  fontSize: "34px",
  opacity: 0.18,
  fontWeight: 900,
};

const levelTitleStyle = {
  margin: 0,
  fontSize: "24px",
};

const levelBadgeStyle = {
  display: "inline-block",
  marginTop: "8px",
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const levelTextStyle = {
  color: "rgba(255,255,255,0.62)",
  lineHeight: 1.7,
  marginTop: "18px",
};

const ctaStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "56px",
  textAlign: "center" as const,
};

const ctaTitleStyle = {
  maxWidth: "780px",
  margin: "0 auto",
  fontSize: "46px",
  lineHeight: 1.05,
  letterSpacing: "-2px",
};

const ctaButtonsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap" as const,
  marginTop: "34px",
};

const primaryButtonStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryDarkButtonStyle = {
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};