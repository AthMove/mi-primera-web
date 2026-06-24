export const metadata = {
  title:
    "Qué revisar antes de comprar unas zapatillas de running de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para comprobar el estado real de unas zapatillas de running usadas antes de comprarlas.",
};

export default function RunningSecondHandArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>running</div>
        <div style={wrapStyle}>

<p style={eyebrowStyle}>GUÍA ATHMOV · RUNNING</p>

<h1 style={titleStyle}>
  Qué revisar antes
  <br />
  de comprar unas
  <br />
  <em style={titleEmStyle}>zapatillas usadas</em>
</h1>

<p style={subtitleStyle}>
  Antes de comprar unas zapatillas de running de segunda mano conviene
  revisar varios puntos clave. Una buena inspección puede ahorrarte
  dinero y evitar lesiones.
</p>

          <div style={heroMetaStyle}>
            <div>
              <p style={metaLabelStyle}>Lectura</p>
              <p style={metaValueStyle}>6 minutos</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Categoría</p>
              <p style={metaValueStyle}>Running · Mercado</p>
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
  Una zapatilla puede parecer nueva por fuera y estar agotada por dentro.
  La suela, la espuma y el desgaste acumulado son mucho más importantes
  que la apariencia general.
</p>

        <h2 style={sectionTitleStyle}>
  <span style={sectionNumberStyle}>Sección 1</span>
  Las 5 zonas que debes inspeccionar
</h2>

<p style={paragraphStyle}>
  Antes de comprar unas zapatillas usadas, revisa estas zonas.
</p>

            <div style={brandGridStyle}>
          <BrandCard
  brand="Suela"
  text="El dibujo debe conservar profundidad suficiente y desgaste uniforme."
/>

<BrandCard
  brand="Mediasuela"
  text="Comprueba que la espuma mantiene estructura y no está hundida."
/>

<BrandCard
  brand="Upper"
  text="Busca roturas, costuras abiertas y zonas excesivamente estiradas."
/>

<BrandCard
  brand="Talón"
  text="Es una de las zonas que más rápido revela el uso real."
/>

<BrandCard
  brand="Plantilla"
  text="Ayuda a detectar deformaciones y desgaste interno."
/>

</div>

       <blockquote style={quoteStyle}>
  “Una zapatilla puede parecer nueva por fuera.
  <span style={quoteAccentStyle}>
    {" "}La amortiguación cuenta una historia diferente.
  </span>
  ”
</blockquote>

   <h2 style={sectionTitleStyle}>
  <span style={sectionNumberStyle}>Sección 2</span>
  Señales de desgaste que reducen la vida útil
</h2>

        <TimelineRow
  month="Suela"
  tag="Normal"
  icon="✔"
  title="Desgaste uniforme"
  text="Indica un uso relativamente equilibrado."
  variant="buy"
/>

<TimelineRow
  month="Laterales"
  tag="Revisar"
  icon="⚠️"
  title="Desgaste irregular"
  text="Puede indicar pronación o supinación acusada."
  variant="neutral"
/>

<TimelineRow
  month="Espuma"
  tag="Mala señal"
  icon="❌"
  title="Mediasuela hundida"
  text="La amortiguación ya ha perdido parte de su rendimiento."
  variant="dead"
/>

<TimelineRow
  month="Talón"
  tag="Evitar"
  icon="🚫"
  title="Talón deformado"
  text="Puede afectar a la estabilidad y comodidad."
  variant="dead"
/>

<TimelineRow
  month="Grietas"
  tag="Descartar"
  icon="⛔"
  title="Espuma agrietada"
  text="Las zapatillas están cerca del final de su vida útil."
  variant="sell"
/>
    <h2 style={sectionTitleStyle}>
  <span style={sectionNumberStyle}>Sección 3</span>
  Cuántos kilómetros pueden quedar
</h2>

<div style={brandGridStyle}>
       <BrandCard
  brand="<300 km"
  text="Estado excelente y vida útil amplia."
/>

<BrandCard
  brand="300–600 km"
  text="Suele ser el mejor equilibrio entre precio y rendimiento."
/>

<BrandCard
  brand="600–800 km"
  text="Revisa muy bien la amortiguación antes de comprar."
/>

<BrandCard
  brand="+800 km"
  text="Solo interesante si el precio es muy atractivo."
/>
        </div>

        <Callout
  icon="🏃"
  title="Regla rápida ATHMOV"
  text="Si el vendedor no sabe cuántos kilómetros tienen las zapatillas, valóralas como si superaran los 600 km."
  variant="sand"
/>

      <h2 style={sectionTitleStyle}>
  <span style={sectionNumberStyle}>Sección 4</span>
  Qué pedir al vendedor antes de pagar
</h2>
<div style={checklistStyle}>
        <ChecklistItem
  number="1"
  title="Foto de la suela"
  text="Es la mejor forma de estimar desgaste."
/>

<ChecklistItem
  number="2"
  title="Foto del talón"
  text="Permite detectar deformaciones."
/>

<ChecklistItem
  number="3"
  title="Foto de la plantilla"
  text="Ayuda a valorar el uso real."
/>

<ChecklistItem
  number="4"
  title="Modelo exacto"
  text="Necesario para comprobar especificaciones."
/>

<ChecklistItem
  number="5"
  title="Kilómetros aproximados"
  text="La referencia más importante."
/>

<ChecklistItem
  number="6"
  title="Año de compra"
  text="La espuma envejece incluso sin usar."
/>
</div>

<h2 style={sectionTitleStyle}>
  <span style={sectionNumberStyle}>Resumen</span>
  Compra con información, no con intuición
</h2>

<p style={paragraphStyle}>
  Una revisión rápida puede evitar una mala compra. Analiza suela,
  amortiguación, talón y kilómetros antes de decidir.
</p>

<section style={ctaStyle}>
<p style={ctaEyebrowStyle}>ATHMOV · RUNNING</p>

<h3 style={ctaTitleStyle}>
  ¿Buscas zapatillas de
  <br />
  running de segunda mano?
</h3>

<p style={ctaTextStyle}>
  Encuentra modelos revisados y material deportivo premium en ATHMOV.
</p>

<a href="/products?category=RUNNING" style={ctaButtonStyle}>
  Ver Running →
</a>
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
  fontFamily: "Inter, sans-serif",
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