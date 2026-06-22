export default function GolfSecondHandArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

        <h1 style={titleStyle}>
          Cuándo comprar y vender palos de golf de segunda mano
        </h1>

        <p style={subtitleStyle}>
          El mercado de segunda mano de golf tiene un calendario propio. Conocerlo
          te ayuda a vender mejor y comprar con más inteligencia.
        </p>
      </section>

      <article style={articleStyle}>
        <p style={leadStyle}>
          En golf, la oferta llega antes que la demanda. Los lanzamientos de
          invierno generan inventario en enero, y la temporada de primavera
          genera compradores en marzo y abril.
        </p>

        <h2 style={sectionTitleStyle}>El calendario del mercado</h2>

        <div style={timelineStyle}>
          <div style={timelineCardStyle}>
            <strong>Enero – Febrero</strong>
            <p>Mejor momento para vender sets anteriores tras lanzamientos.</p>
          </div>

          <div style={timelineCardStyle}>
            <strong>Marzo – Abril</strong>
            <p>Mejor momento para comprar antes del pico de demanda.</p>
          </div>

          <div style={timelineCardStyle}>
            <strong>Julio – Agosto</strong>
            <p>Mercado más parado. Buen momento para preparar anuncios.</p>
          </div>

          <div style={timelineCardStyle}>
            <strong>Septiembre</strong>
            <p>Segundo momento fuerte de renovación.</p>
          </div>
        </div>

        <h2 style={sectionTitleStyle}>Por qué los lanzamientos mueven el mercado</h2>

        <p style={paragraphStyle}>
          En golf, muchos jugadores renuevan por tecnología, no solo por desgaste.
          Eso hace que entren al mercado palos usados en muy buen estado justo
          después de los nuevos lanzamientos.
        </p>

        <h2 style={sectionTitleStyle}>Si vas a vender</h2>

        <p style={paragraphStyle}>
          Publica cuando recibas tu nuevo set. Cuanto más esperes, más productos
          similares habrá en el mercado y más difícil será mantener precio.
        </p>

        <h2 style={sectionTitleStyle}>Si vas a comprar</h2>

        <p style={paragraphStyle}>
          Enero y febrero suelen ser meses interesantes porque hay más oferta y
          menos presión compradora que en plena primavera.
        </p>

        <section style={ctaStyle}>
          <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>
          <h3 style={ctaTitleStyle}>¿Tienes palos que ya no usas?</h3>
          <p style={ctaTextStyle}>
            Publica tu equipamiento de golf en ATHMOV y llega a compradores que
            buscan material premium.
          </p>

          <a href="/sell" style={ctaButtonStyle}>
            Publicar en ATHMOV →
          </a>
        </section>
      </article>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  background: "#111",
  color: "#fff",
  padding: "140px 28px 70px",
};

const eyebrowStyle = {
  maxWidth: "760px",
  margin: "0 auto 18px",
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.55,
};

const titleStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
};

const subtitleStyle = {
  maxWidth: "760px",
  margin: "24px auto 0",
  color: "rgba(255,255,255,0.62)",
  fontSize: "18px",
  lineHeight: 1.7,
};

const articleStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "60px 28px 90px",
};

const leadStyle = {
  fontSize: "23px",
  lineHeight: 1.65,
  color: "#111",
  marginBottom: "42px",
};

const sectionTitleStyle = {
  fontSize: "38px",
  letterSpacing: "-2px",
  marginTop: "46px",
  marginBottom: "18px",
};

const paragraphStyle = {
  color: "#555",
  fontSize: "17px",
  lineHeight: 1.8,
};

const timelineStyle = {
  display: "grid",
  gap: "14px",
  margin: "28px 0",
};

const timelineCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "24px",
  padding: "22px",
};

const ctaStyle = {
  marginTop: "56px",
  background: "#111",
  color: "#fff",
  borderRadius: "32px",
  padding: "36px",
};

const ctaEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const ctaTitleStyle = {
  fontSize: "36px",
  margin: "12px 0",
};

const ctaTextStyle = {
  color: "rgba(255,255,255,0.62)",
  lineHeight: 1.7,
};

const ctaButtonStyle = {
  display: "inline-block",
  marginTop: "18px",
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "15px 22px",
  textDecoration: "none",
  fontWeight: 900,
};