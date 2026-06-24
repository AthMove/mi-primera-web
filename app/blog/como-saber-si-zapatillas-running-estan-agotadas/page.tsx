export const metadata = {
  title: "Cómo saber si unas zapatillas de running están agotadas | ATHMOV",
  description:
    "Guía ATHMOV para detectar si unas zapatillas de running han perdido amortiguación, estabilidad y vida útil.",
};

export default function RunningWornOutArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>running</div>

        <div style={wrapStyle}>
          <p style={eyebrowStyle}>GUÍA ATHMOV · RUNNING</p>

          <h1 style={titleStyle}>
            Cómo saber si unas
            <br />
            zapatillas de running
            <br />
            <em style={titleEmStyle}>están agotadas</em>
          </h1>

          <p style={subtitleStyle}>
            No todas las zapatillas viejas parecen viejas. Aprende a detectar
            cuándo la amortiguación, la suela y la estabilidad ya no están para
            correr con seguridad.
          </p>

          <div style={heroMetaStyle}>
            <div>
              <p style={metaLabelStyle}>Lectura</p>
              <p style={metaValueStyle}>5 minutos</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Categoría</p>
              <p style={metaValueStyle}>Running · Estado</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Para</p>
              <p style={metaValueStyle}>Compradores y corredores</p>
            </div>
          </div>
        </div>
      </section>

      <article style={articleStyle}>
        <p style={leadStyle}>
          La vida útil de una zapatilla no termina cuando se rompe. Muchas dejan
          de proteger antes: pierden rebote, estabilidad y capacidad de absorción
          aunque visualmente sigan pareciendo correctas.
        </p>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 1</span>
          Las señales más claras de desgaste
        </h2>

        <div style={brandGridStyle}>
          <BrandCard brand="Mediasuela hundida" text="La espuma ya no recupera su forma original." />
          <BrandCard brand="Suela lisa" text="El dibujo ha perdido agarre y protección." />
          <BrandCard brand="Talón deformado" text="Puede afectar a la pisada y estabilidad." />
          <BrandCard brand="Upper vencido" text="El pie pierde sujeción lateral." />
          <BrandCard brand="Dolores nuevos" text="Molestias recientes pueden indicar pérdida de amortiguación." />
        </div>

        <blockquote style={quoteStyle}>
          “Una zapatilla agotada no siempre se ve rota.
          <span style={quoteAccentStyle}> Se nota al correr.</span>”
        </blockquote>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 2</span>
          Qué revisar antes de descartarlas
        </h2>

        <TimelineRow month="Suela" tag="Visual" icon="👟" title="Dibujo desgastado" text="Si la suela está lisa en zonas clave, pierde agarre." variant="neutral" />
        <TimelineRow month="Espuma" tag="Clave" icon="📉" title="Menos rebote" text="Si la mediasuela está dura o hundida, la zapatilla está cerca del final." variant="dead" />
        <TimelineRow month="Talón" tag="Estabilidad" icon="⚠️" title="Deformación visible" text="Un talón vencido puede alterar la pisada." variant="sell" />
        <TimelineRow month="Upper" tag="Sujeción" icon="🔍" title="Tela cedida" text="Si el pie se mueve demasiado, la zapatilla ya no sujeta bien." variant="neutral" />

        <Callout
          icon="🏃"
          title="Regla rápida ATHMOV"
          text="Si notas molestias nuevas usando unas zapatillas con muchos kilómetros, no las vendas como zapatillas para correr: pueden servir solo para caminar."
          variant="sand"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 3</span>
          Cuándo todavía pueden tener valor
        </h2>

        <div style={checklistStyle}>
          <ChecklistItem number="1" title="Para caminar" text="Si la estructura está bien, pueden servir para uso casual." />
          <ChecklistItem number="2" title="Para gimnasio" text="Algunos modelos pueden seguir siendo útiles para entrenamientos suaves." />
          <ChecklistItem number="3" title="Para piezas o recambio" text="Plantillas, cordones o modelos raros pueden conservar interés." />
          <ChecklistItem number="4" title="Para vender barato" text="Solo si eres transparente con el estado real." />
        </div>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Resumen</span>
          No vendas rendimiento si ya no lo tienen
        </h2>

        <p style={paragraphStyle}>
          Una zapatilla agotada puede seguir teniendo uso, pero no debe venderse
          como si estuviera lista para entrenar fuerte. La transparencia protege
          al comprador y mejora la confianza en ATHMOV.
        </p>

        <section style={ctaStyle}>
          <p style={ctaEyebrowStyle}>ATHMOV · RUNNING</p>

          <h3 style={ctaTitleStyle}>
            Vende running
            <br />
            con transparencia
          </h3>

          <p style={ctaTextStyle}>
            Publica tus zapatillas indicando estado real, kilómetros y fotos
            claras para llegar a compradores de confianza.
          </p>

          <a href="/sell" style={ctaButtonStyle}>
            Publicar en ATHMOV →
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