import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title:
    "Qué revisar antes de comprar un wedge de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para revisar un wedge de golf usado antes de comprarlo. Estrías, cara, suela, bounce, varilla y señales de desgaste.",

  openGraph: {
    title:
      "Qué revisar antes de comprar un wedge de golf de segunda mano",
    description:
      "Aprende a revisar un wedge usado antes de comprarlo.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Qué revisar antes de comprar un wedge de golf usado",
    description:
      "Guía ATHMOV para revisar un wedge de segunda mano.",
    images: ["/golf.jpg"],
  },
};

export default function WedgeSecondHandArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Qué revisar antes de comprar un wedge de golf de segunda mano"
        description="Guía ATHMOV para revisar un wedge usado antes de comprarlo."
        image="/golf.jpg"
        url="/blog/que-revisar-wedge-golf-segunda-mano"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>wedge</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Qué revisar antes
              <br />
              de comprar un
              <br />
              <em style={titleEmStyle}>wedge usado</em>
            </h1>

            <p style={subtitleStyle}>
              Los wedges son los palos que más desgaste sufren durante el juego.
              Antes de comprar uno de segunda mano conviene revisar varios
              detalles que afectan directamente al spin, al control y a su
              valor.
            </p>

            <div style={heroMetaStyle}>
              <div>
                <p style={metaLabelStyle}>Lectura</p>
                <p style={metaValueStyle}>6 minutos</p>
              </div>

              <div>
                <p style={metaLabelStyle}>Categoría</p>
                <p style={metaValueStyle}>Golf · Compra</p>
              </div>

              <div>
                <p style={metaLabelStyle}>Para</p>
                <p style={metaValueStyle}>Compradores</p>
              </div>
            </div>
          </div>
        </section>

        <article style={articleStyle}>
          <p style={leadStyle}>
            Un wedge puede parecer estar en muy buen estado y, sin embargo,
            haber perdido gran parte de su capacidad para generar spin. Revisar
            correctamente las estrías, la cara y la suela es fundamental antes
            de tomar una decisión de compra.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Las 6 zonas que debes revisar
          </h2>

          <p style={paragraphStyle}>
            Dedica unos minutos a inspeccionar estas seis zonas. La mayoría de
            los problemas aparecen aquí y pueden reducir mucho el rendimiento
            del wedge.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Estrías"
              text="Deben conservar profundidad y bordes definidos para mantener el spin."
            />

            <BrandCard
              brand="Cara"
              text="Busca golpes profundos, zonas pulidas o desgaste excesivo."
            />

            <BrandCard
              brand="Suela"
              text="Comprueba el estado del bounce y que no existan deformaciones."
            />

            <BrandCard
              brand="Hosel"
              text="Revisa que la unión con la varilla sea firme y sin holguras."
            />

            <BrandCard
              brand="Varilla"
              text="Comprueba que no tenga fisuras, óxido o dobleces."
            />

            <BrandCard
              brand="Grip"
              text="Su desgaste ayuda a estimar el uso real del palo."
            />
          </div>

          <blockquote style={quoteStyle}>
            “En un wedge,
            <span style={quoteAccentStyle}>
              {" "}las estrías son mucho más importantes que la apariencia.
            </span>
            ”
          </blockquote>
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Desgaste normal vs desgaste preocupante
          </h2>

          <p style={paragraphStyle}>
            Un wedge usado siempre tendrá marcas de juego, pero no todas afectan
            igual. El desgaste de las estrías y de la cara es mucho más
            importante que los arañazos superficiales de la suela.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Estrías"
              tag="Correcto"
              icon="✔"
              title="Bien definidas"
              text="Mantienen buen control y capacidad de generar spin."
              variant="buy"
            />

            <TimelineRow
              month="Suela"
              tag="Normal"
              icon="🏌️"
              title="Arañazos superficiales"
              text="Son habituales por el contacto con arena, césped y suelo."
              variant="neutral"
            />

            <TimelineRow
              month="Cara"
              tag="Revisar"
              icon="⚠️"
              title="Zona muy pulida"
              text="Puede indicar mucho uso y menor agarre sobre la bola."
              variant="neutral"
            />

            <TimelineRow
              month="Estrías"
              tag="Evitar"
              icon="❌"
              title="Grooves casi lisas"
              text="Reducen mucho el spin y el control en golpes cortos."
              variant="dead"
            />

            <TimelineRow
              month="Varilla"
              tag="Descartar"
              icon="🚫"
              title="Óxido o doblez"
              text="Una varilla dañada afecta al rendimiento y a la seguridad."
              variant="sell"
            />
          </div>

          <Callout
            icon="⛳"
            title="Regla rápida ATHMOV"
            text="En un wedge usado, las estrías mandan. Si están muy desgastadas, el precio debe bajar mucho aunque el palo tenga buen aspecto exterior."
            variant="sand"
          />
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Qué preguntar al vendedor antes de comprar
          </h2>

          <p style={paragraphStyle}>
            Un vendedor de confianza debería poder responder estas preguntas sin
            dificultad. Cuanta más información obtengas antes de comprar, menor
            será el riesgo de llevarte una sorpresa.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Loft y bounce"
              text="Comprueba que coinciden con el modelo anunciado y con tus necesidades de juego."
            />

            <ChecklistItem
              number="2"
              title="Año del wedge"
              text="Permite estimar su depreciación y el posible desgaste de las estrías."
            />

            <ChecklistItem
              number="3"
              title="Varilla original"
              text="Pregunta si mantiene la varilla de fábrica o si ha sido sustituida."
            />

            <ChecklistItem
              number="4"
              title="Fotos de la cara"
              text="Son imprescindibles para revisar el estado real de las estrías."
            />

            <ChecklistItem
              number="5"
              title="Fotos de la suela"
              text="Permiten comprobar el desgaste del bounce y posibles golpes."
            />

            <ChecklistItem
              number="6"
              title="Uso aproximado"
              text="Pregunta cuántas temporadas o rondas ha jugado con el wedge."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Cuándo merece la pena comprar un wedge usado
          </h2>

          <p style={paragraphStyle}>
            Los wedges de segunda mano ofrecen una gran oportunidad cuando las
            estrías todavía conservan profundidad y el precio refleja el uso
            real del palo. En muchos casos puedes conseguir un modelo premium
            por una fracción de su precio original.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="<3 años"
              text="La mejor combinación entre rendimiento, tecnología y precio."
            />

            <BrandCard
              brand="Estrías vivas"
              text="Es el factor que más influye en el rendimiento de un wedge."
            />

            <BrandCard
              brand="Varilla original"
              text="Facilita una futura reventa y mantiene las especificaciones del fabricante."
            />

            <BrandCard
              brand="Vokey · Cleveland · Callaway"
              text="Las marcas premium suelen conservar mejor su valor en el mercado."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            El estado de las estrías lo cambia todo
          </h2>

          <p style={paragraphStyle}>
            Un wedge con estrías en buen estado puede seguir ofreciendo un gran
            rendimiento durante mucho tiempo. Antes de comprar revisa la cara,
            la suela, la varilla y solicita fotografías detalladas para evitar
            pagar de más por un palo excesivamente desgastado.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra wedges de
              <br />
              golf de segunda mano
            </h3>

            <p style={ctaTextStyle}>
              Descubre wedges revisados y material premium de segunda mano en
              ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/que-revisar-wedge-golf-segunda-mano"
          />
        </article>
      </main>
    </>
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
      <p style={brandLabelStyle}>Factor clave</p>
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
