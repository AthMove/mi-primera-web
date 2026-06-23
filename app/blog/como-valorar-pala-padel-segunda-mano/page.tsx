export const metadata = {
  title: "Cómo calcular el precio de una pala de pádel de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para valorar correctamente una pala de pádel usada según marca, modelo, estado y antigüedad.",
};

export default function PadelPriceArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>pádel</div>

        <div style={wrapStyle}>
          <p style={eyebrowStyle}>GUÍA ATHMOV · PÁDEL</p>

<h1 style={titleStyle}>
  Cómo calcular
  <br />
  el precio de una
  <br />
  <em style={titleEmStyle}>pala usada</em>
</h1>

<p style={subtitleStyle}>
  Saber cuánto vale realmente una pala de pádel de segunda mano
  es la diferencia entre vender rápido o quedarse meses sin
  recibir ofertas.
</p>

          <div style={heroMetaStyle}>
            <div>
              <p style={metaLabelStyle}>Lectura</p>
              <p style={metaValueStyle}>6 minutos</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Categoría</p>
              <p style={metaValueStyle}>Pádel · Mercado</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Para</p>
              <p style={metaValueStyle}>Compradores y vendedores</p>
            </div>
          </div>
        </div>
      </section>

    <article style={articleStyle}>
  <p style={leadStyle}>
    Muchos vendedores calculan el precio mirando lo que pagaron hace años.
    El mercado funciona de otra manera: el valor depende de la demanda actual,
    del estado de la pala y de cuántas alternativas existen disponibles.
  </p>

  <h2 style={sectionTitleStyle}>
    <span style={sectionNumberStyle}>Sección 1</span>
    Qué determina el valor real de una pala
  </h2>

  <p style={paragraphStyle}>
    No todas las palas pierden valor al mismo ritmo. Una pala premium bien
    conservada puede mantener gran parte de su precio, mientras que un modelo
    muy usado o con daños visibles puede depreciarse rápidamente.
  </p>

  <div style={brandGridStyle}>
    <BrandCard brand="Marca" text="NOX, Bullpadel, Siux o Babolat suelen mantener mejor valor si el modelo sigue teniendo demanda." />
    <BrandCard brand="Modelo" text="Los modelos profesionales o de temporadas recientes suelen venderse mejor que gamas antiguas." />
    <BrandCard brand="Año" text="Cuanto más reciente sea la pala, más fácil será justificar un precio alto." />
    <BrandCard brand="Estado" text="Golpes, grietas, desgaste del plano y protector afectan directamente al precio." />
    <BrandCard brand="Peso" text="Indicar el peso real genera confianza y evita dudas antes de comprar." />
    <BrandCard brand="Factura" text="Caja, funda, factura o número de serie ayudan a defender mejor el precio." />
  </div>

  <h2 style={sectionTitleStyle}>
    <span style={sectionNumberStyle}>Sección 2</span>
    Tabla orientativa de depreciación
  </h2>

  <div style={timelineStyle}>
    <TimelineRow month="0–1 año" tag="Excelente" icon="🏓" title="70–80% del precio nuevo" text="Solo si está en muy buen estado, con poco uso y sin daños relevantes." variant="sell" />
    <TimelineRow month="1–2 años" tag="Buen estado" icon="📉" title="55–70% del precio nuevo" text="Rango habitual para palas premium usadas pero todavía atractivas." variant="buy" />
    <TimelineRow month="2–3 años" tag="Uso visible" icon="🔎" title="40–55% del precio nuevo" text="Depende mucho del estado, modelo y demanda actual." variant="neutral" />
    <TimelineRow month="+3 años" tag="Antigua" icon="⏳" title="25–40% del precio nuevo" text="Solo mantiene valor alto si es un modelo buscado o está muy cuidada." variant="dead" />
  </div>

  <Callout
    icon="📉"
    title="La antigüedad no lo es todo"
    text="Una pala de tres años en perfecto estado puede valer más que una de un año con golpes importantes."
    variant="sand"
  />

  <h2 style={sectionTitleStyle}>
    <span style={sectionNumberStyle}>Sección 3</span>
    Errores que hacen que una pala no se venda
  </h2>

  <p style={paragraphStyle}>
    Un precio correcto ayuda, pero la confianza también vende. Estos errores
    hacen que muchos compradores pasen de largo o hagan ofertas muy bajas.
  </p>

  <div style={checklistStyle}>
    <ChecklistItem number="1" title="Pedir precio de pala nueva" text="El comprador compara con otras opciones disponibles ahora, no con lo que pagaste tú." />
    <ChecklistItem number="2" title="No mostrar golpes" text="Ocultar daños genera desconfianza y suele acabar en ofertas muy bajas." />
    <ChecklistItem number="3" title="Fotos oscuras" text="Una pala premium necesita fotos claras del plano, canto, puño y zonas de desgaste." />
    <ChecklistItem number="4" title="No indicar peso ni modelo exacto" text="El peso real y el modelo completo ayudan a vender más rápido." />
    <ChecklistItem number="5" title="No enseñar serial o factura" text="Cuanta más prueba de autenticidad aportes, más fácil será defender el precio." />
  </div>

  <blockquote style={quoteStyle}>
    “Una pala vale lo que alguien está dispuesto a pagar hoy, no lo que costó
    hace dos años.”
  </blockquote>

  <h2 style={sectionTitleStyle}>
    <span style={sectionNumberStyle}>Sección 4</span>
    Cómo calcular un precio competitivo
  </h2>

  <p style={paragraphStyle}>
    Busca modelos similares en venta, analiza su estado y ajusta tu precio según
    la rapidez con la que quieras vender. Un precio ligeramente inferior al
    promedio suele generar más interés y más ofertas.
  </p>

  <Callout
    icon="🏓"
    title="Regla rápida ATHMOV"
    text="Empieza en el 70% del precio nuevo si la pala tiene menos de un año y está en excelente estado."
    variant="moss"
  />

  <h2 style={sectionTitleStyle}>
    <span style={sectionNumberStyle}>Resumen</span>
    El precio correcto vende
  </h2>

  <p style={paragraphStyle}>
    El mejor precio no es el más alto. Es el que genera interés, transmite
    confianza y permite cerrar la venta sin largas negociaciones.
  </p>

  <section style={ctaStyle}>
    <p style={ctaEyebrowStyle}>ATHMOV · PÁDEL</p>

    <h3 style={ctaTitleStyle}>
      ¿Quieres saber cuánto
      <br />
      vale tu pala?
    </h3>

    <p style={ctaTextStyle}>
      Publica tu pala de pádel en ATHMOV y encuentra compradores interesados en
      material premium de segunda mano.
    </p>

    <a href="/sell" style={ctaButtonStyle}>
      Publicar en ATHMOV →
    </a>
  </section>
  <section style={relatedStyle}>
  <p style={relatedEyebrowStyle}>Más guías ATHMOV</p>

  <div style={relatedGridStyle}>
    <a href="/blog/como-detectar-pala-padel-falsa" style={relatedCardStyle}>
      <span style={relatedCategoryStyle}>PÁDEL · AUTENTICIDAD</span>
      <strong style={relatedTitleStyle}>
        Cómo detectar una pala de pádel falsa
      </strong>
    </a>

    <a href="/blog/como-calcular-precio-palos-golf-segunda-mano" style={relatedCardStyle}>
      <span style={relatedCategoryStyle}>GOLF · MERCADO</span>
      <strong style={relatedTitleStyle}>
        Cómo calcular el precio de palos de golf de segunda mano
      </strong>
    </a>
  </div>
</section>
</article>
    </main>
  );
}

function TimelineRow({
  month,
  tag,
  icon,
  title,
  text,
  variant,
}: {
  month: string;
  tag: string;
  icon: string;
  title: string;
  text: string;
  variant: "sell" | "buy" | "dead" | "neutral";
}) {
  const background =
    variant === "sell"
      ? "#e8ddc8"
      : variant === "buy"
        ? "rgba(90,110,82,0.08)"
        : "#fff";

  return (
    <div style={{ ...timelineRowStyle, background }}>
      <div style={timelineMonthStyle}>
        <strong>{month}</strong>
        <span>{tag}</span>
      </div>

      <div style={timelineContentStyle}>
        <div style={timelineIconStyle}>{icon}</div>

        <div>
          <h3 style={timelineTitleStyle}>{title}</h3>
          <p style={timelineTextStyle}>{text}</p>
        </div>
      </div>
    </div>
  );
}

function BrandCard({ brand, text }: { brand: string; text: string }) {
  return (
    <div style={brandCardStyle}>
      <p style={brandLabelStyle}>Marca clave</p>
      <h3 style={brandTitleStyle}>{brand}</h3>
      <p style={brandTextStyle}>{text}</p>
    </div>
  );
}

function ChecklistItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div style={checkItemStyle}>
      <span style={checkNumberStyle}>{number}</span>

      <div>
        <h3 style={checkTitleStyle}>{title}</h3>
        <p style={checkTextStyle}>{text}</p>
      </div>
    </div>
  );
}

function Callout({
  icon,
  title,
  text,
  variant,
}: {
  icon: string;
  title: string;
  text: string;
  variant: "sand" | "moss";
}) {
  return (
    <div
      style={{
        ...calloutStyle,
        background: variant === "sand" ? "#e8ddc8" : "rgba(90,110,82,0.1)",
      }}
    >
      <div style={calloutIconStyle}>{icon}</div>

      <div>
        <h3 style={calloutTitleStyle}>{title}</h3>
        <p style={calloutTextStyle}>{text}</p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
  fontFamily: "Georgia, serif",
  color: "#111",
};

const wrapStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "0 28px",
  position: "relative" as const,
  zIndex: 2,
};

const heroStyle = {
  position: "relative" as const,
  overflow: "hidden",
  background: "#0f0e0c",
  color: "#fff",
  padding: "120px 0 70px",
};

const heroBackgroundTextStyle = {
  position: "absolute" as const,
  right: "-40px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "230px",
  lineHeight: 1,
  color: "rgba(255,255,255,0.035)",
  fontStyle: "italic",
  pointerEvents: "none" as const,
};

const eyebrowStyle = {
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "4px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  marginBottom: "18px",
};

const titleStyle = {
  fontSize: "64px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
  fontWeight: 500,
};

const titleEmStyle = {
  color: "#c9b896",
  fontStyle: "italic",
};

const subtitleStyle = {
  fontSize: "17px",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.58)",
  maxWidth: "560px",
  marginTop: "26px",
};

const heroMetaStyle = {
  display: "flex",
  gap: "28px",
  flexWrap: "wrap" as const,
  marginTop: "34px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(255,255,255,0.1)",
};

const metaLabelStyle = {
  fontSize: "9px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
  marginBottom: "4px",
};

const metaValueStyle = {
  fontSize: "13px",
  fontWeight: 800,
  color: "rgba(255,255,255,0.75)",
};

const articleStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "64px 28px 90px",
};

const leadStyle = {
  fontSize: "24px",
  lineHeight: 1.65,
  color: "#111",
  marginBottom: "44px",
  paddingBottom: "34px",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
};

const sectionTitleStyle = {
  fontSize: "42px",
  lineHeight: 1.08,
  letterSpacing: "-2px",
  marginTop: "58px",
  marginBottom: "20px",
  fontWeight: 500,
};

const sectionNumberStyle = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  marginBottom: "10px",
  fontWeight: 900,
};

const paragraphStyle = {
  color: "#555",
  fontSize: "17px",
  lineHeight: 1.85,
  marginBottom: "22px",
};

const timelineStyle = {
  display: "grid",
  gap: "0",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  overflow: "hidden",
  margin: "32px 0 20px",
};

const timelineRowStyle = {
  display: "flex",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const timelineMonthStyle = {
  width: "116px",
  flexShrink: 0,
  padding: "22px 10px",
  borderRight: "1px solid rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  textAlign: "center" as const,
  gap: "4px",
  fontSize: "12px",
};

const timelineContentStyle = {
  flex: 1,
  display: "flex",
  gap: "16px",
  padding: "20px 22px",
  alignItems: "flex-start",
};

const timelineIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const timelineTitleStyle = {
  margin: 0,
  fontSize: "15px",
};

const timelineTextStyle = {
  color: "#666",
  fontSize: "13px",
  lineHeight: 1.6,
  marginTop: "5px",
};

const legendStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
  marginBottom: "38px",
};

const legendItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "12px",
  color: "#666",
  fontWeight: 700,
};

const legendDotStyle = {
  width: "11px",
  height: "11px",
  borderRadius: "4px",
};

const quoteStyle = {
  fontSize: "30px",
  lineHeight: 1.45,
  textAlign: "center" as const,
  padding: "40px 18px",
  margin: "44px 0",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
};

const quoteAccentStyle = {
  color: "#5a6e52",
};

const brandGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "12px",
  margin: "30px 0 36px",
};

const brandCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "20px",
};

const brandLabelStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  fontWeight: 900,
};

const brandTitleStyle = {
  fontSize: "20px",
  margin: "8px 0",
};

const brandTextStyle = {
  color: "#666",
  fontSize: "13px",
  lineHeight: 1.6,
};

const calloutStyle = {
  display: "flex",
  gap: "16px",
  borderRadius: "22px",
  padding: "24px",
  margin: "34px 0",
  border: "1px solid rgba(0,0,0,0.08)",
};

const calloutIconStyle = {
  fontSize: "24px",
};

const calloutTitleStyle = {
  margin: "0 0 6px",
  fontSize: "17px",
};

const calloutTextStyle = {
  margin: 0,
  color: "#555",
  lineHeight: 1.7,
  fontSize: "14px",
};

const checklistStyle = {
  display: "grid",
  gap: "12px",
  margin: "30px 0 38px",
};

const checkItemStyle = {
  display: "flex",
  gap: "16px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: "20px",
  padding: "20px",
};

const checkNumberStyle = {
  color: "#c9b896",
  fontSize: "28px",
  fontWeight: 900,
  lineHeight: 1,
};

const checkTitleStyle = {
  fontSize: "16px",
  margin: 0,
};

const checkTextStyle = {
  color: "#666",
  fontSize: "14px",
  lineHeight: 1.7,
  marginTop: "6px",
};

const ctaStyle = {
  marginTop: "58px",
  background: "#0f0e0c",
  color: "#fff",
  borderRadius: "32px",
  padding: "42px",
};

const ctaEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#c9b896",
  fontWeight: 900,
};

const ctaTitleStyle = {
  fontSize: "40px",
  lineHeight: 1.08,
  letterSpacing: "-2px",
  margin: "14px 0",
};

const ctaTextStyle = {
  color: "rgba(255,255,255,0.62)",
  lineHeight: 1.75,
  maxWidth: "520px",
};

const ctaButtonStyle = {
  display: "inline-block",
  marginTop: "18px",
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "15px 24px",
  textDecoration: "none",
  fontWeight: 900,
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