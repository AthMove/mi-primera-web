export const metadata = {
  title: "Cuántos kilómetros puede tener una zapatilla de running usada | ATHMOV",
  description:
    "Guía ATHMOV para saber cuántos kilómetros puede tener una zapatilla de running de segunda mano y cómo valorar su vida útil.",
};

export default function RunningMileageArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>running</div>

        <div style={wrapStyle}>
          <p style={eyebrowStyle}>GUÍA ATHMOV · RUNNING</p>

          <h1 style={titleStyle}>
            Cuántos kilómetros
            <br />
            puede tener una
            <br />
            <em style={titleEmStyle}>zapatilla usada</em>
          </h1>

          <p style={subtitleStyle}>
            Los kilómetros son una de las claves para valorar unas zapatillas de
            running de segunda mano. Aprende a interpretar el uso real antes de
            comprar o vender.
          </p>

          <div style={heroMetaStyle}>
            <div>
              <p style={metaLabelStyle}>Lectura</p>
              <p style={metaValueStyle}>5 minutos</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Categoría</p>
              <p style={metaValueStyle}>Running · Valoración</p>
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
          No todas las zapatillas envejecen igual. El peso del corredor, el tipo
          de terreno, el ritmo y el modelo influyen mucho en cuántos kilómetros
          útiles pueden quedar.
        </p>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 1</span>
          Referencia rápida por kilómetros
        </h2>

        <TimelineRow
          month="0–200 km"
          tag="Excelente"
          icon="🆕"
          title="Muy poco uso"
          text="Suelen conservar gran parte de la amortiguación y estructura."
          variant="buy"
        />

        <TimelineRow
          month="200–500 km"
          tag="Buen rango"
          icon="🏃"
          title="Uso normal"
          text="Puede ser una buena compra si el estado visual acompaña."
          variant="neutral"
        />

        <TimelineRow
          month="500–700 km"
          tag="Revisar"
          icon="⚠️"
          title="Vida útil avanzada"
          text="Hay que revisar suela, mediasuela y talón con detalle."
          variant="sell"
        />

        <TimelineRow
          month="+700 km"
          tag="Riesgo"
          icon="🚫"
          title="Cerca del final"
          text="Solo recomendable si el precio es muy bajo o el uso será casual."
          variant="dead"
        />

        <blockquote style={quoteStyle}>
          “Los kilómetros importan, pero el estado real manda.”
        </blockquote>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 2</span>
          Factores que aceleran el desgaste
        </h2>

        <div style={brandGridStyle}>
          <BrandCard
            brand="Peso del corredor"
            text="A mayor carga, más rápido puede comprimirse la espuma."
          />

          <BrandCard
            brand="Terreno"
            text="Asfalto, tierra y montaña desgastan de forma diferente."
          />

          <BrandCard
            brand="Ritmo"
            text="Entrenos rápidos y series suelen exigir más al material."
          />

          <BrandCard
            brand="Modelo"
            text="No todas las zapatillas tienen la misma durabilidad."
          />

          <BrandCard
            brand="Rotación"
            text="Alternar zapatillas ayuda a conservar mejor la mediasuela."
          />
        </div>

        <Callout
          icon="💡"
          title="Regla rápida ATHMOV"
          text="Si una zapatilla supera los 500 km, el precio debe reflejarlo claramente aunque por fuera parezca cuidada."
          variant="sand"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 3</span>
          Qué pedir antes de comprar
        </h2>

        <div style={checklistStyle}>
          <ChecklistItem
            number="1"
            title="Kilómetros aproximados"
            text="Es la referencia principal para valorar la vida útil restante."
          />

          <ChecklistItem
            number="2"
            title="Foto de la suela"
            text="Ayuda a confirmar si el uso declarado tiene sentido."
          />

          <ChecklistItem
            number="3"
            title="Foto de la mediasuela"
            text="Permite detectar hundimientos o deformaciones."
          />

          <ChecklistItem
            number="4"
            title="Tipo de uso"
            text="No es lo mismo caminar, rodajes suaves o entrenamientos intensos."
          />
        </div>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Resumen</span>
          Kilómetros sí, pero con contexto
        </h2>

        <p style={paragraphStyle}>
          Una zapatilla con 300 km puede estar peor que otra con 500 si se ha
          usado en malas condiciones. Usa los kilómetros como punto de partida,
          pero decide siempre mirando el estado real.
        </p>

        <section style={ctaStyle}>
          <p style={ctaEyebrowStyle}>ATHMOV · RUNNING</p>

          <h3 style={ctaTitleStyle}>
            Compra y vende
            <br />
            running con criterio
          </h3>

          <p style={ctaTextStyle}>
            Publica zapatillas con información clara de estado, kilómetros y
            uso para generar más confianza.
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