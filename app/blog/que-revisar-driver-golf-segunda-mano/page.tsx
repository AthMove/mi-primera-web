import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title:
    "Qué revisar antes de comprar un driver de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para revisar un driver de golf usado antes de comprarlo. Cara, corona, varilla, grip y señales de desgaste.",

  openGraph: {
    title:
      "Qué revisar antes de comprar un driver de golf de segunda mano",
    description:
      "Aprende a revisar un driver usado antes de comprarlo.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Qué revisar antes de comprar un driver de golf usado",
    description:
      "Guía ATHMOV para revisar un driver de segunda mano.",
    images: ["/golf.jpg"],
  },
};

export default function DriverSecondHandArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Qué revisar antes de comprar un driver de golf de segunda mano"
        description="Guía ATHMOV para revisar un driver usado antes de comprarlo."
        image="/golf.jpg"
        url="/blog/que-revisar-driver-golf-segunda-mano"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>driver</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Qué revisar antes
              <br />
              de comprar un
              <br />
              <em style={titleEmStyle}>driver usado</em>
            </h1>

            <p style={subtitleStyle}>
              Un driver puede parecer impecable y esconder cientos de golpes.
              Aprende qué revisar antes de comprar uno de segunda mano y evita
              pagar de más.
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
            El driver es probablemente el palo más castigado de toda la bolsa.
            Recibe cientos o miles de impactos durante su vida útil y pequeños
            daños pueden afectar al rendimiento o reducir significativamente su
            valor en el mercado de segunda mano.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Las 6 zonas que debes revisar
          </h2>

          <p style={paragraphStyle}>
            Antes de comprar un driver usado dedica unos minutos a revisar cada
            una de estas zonas. La mayoría de los problemas aparecen aquí.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Cara"
              text="Busca grietas, hundimientos y marcas profundas provocadas por impactos."
            />

            <BrandCard
              brand="Corona"
              text="Comprueba que no existan golpes fuertes ni deformaciones visibles."
            />

            <BrandCard
              brand="Suela"
              text="Los arañazos normales son habituales, pero evita golpes estructurales."
            />

            <BrandCard
              brand="Hosel"
              text="Revisa que el sistema de ajuste funcione correctamente y no tenga holguras."
            />

            <BrandCard
              brand="Varilla"
              text="Comprueba que no existan fisuras, dobleces o cortes cerca del hosel."
            />

            <BrandCard
              brand="Grip"
              text="El desgaste del grip es económico de reparar, pero ayuda a valorar el uso real."
            />
          </div>
                    <blockquote style={quoteStyle}>
            “Un driver puede tener cientos de golpes y seguir rindiendo como el
            primer día.
            <span style={quoteAccentStyle}>
              {" "}Las grietas estructurales son otra historia.
            </span>
            ”
          </blockquote>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Señales de desgaste que debes conocer
          </h2>

          <p style={paragraphStyle}>
            No todos los signos de uso son un problema. Saber distinguir el
            desgaste normal de un daño estructural te ayudará a comprar con
            mucha más seguridad.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Cara"
              tag="Correcto"
              icon="✔"
              title="Marcas superficiales"
              text="Los pequeños impactos son normales y apenas afectan al rendimiento."
              variant="buy"
            />

            <TimelineRow
              month="Suela"
              tag="Normal"
              icon="🏌️"
              title="Arañazos por apoyo"
              text="La suela suele rayarse al apoyar el palo sobre el césped."
              variant="neutral"
            />

            <TimelineRow
              month="Corona"
              tag="Revisar"
              icon="⚠️"
              title="Golpes visibles"
              text="Comprueba que no existan deformaciones ni hundimientos."
              variant="neutral"
            />

            <TimelineRow
              month="Cara"
              tag="Evitar"
              icon="❌"
              title="Grietas"
              text="Una grieta en la cara del driver es motivo suficiente para descartar la compra."
              variant="dead"
            />

            <TimelineRow
              month="Varilla"
              tag="Descartar"
              icon="🚫"
              title="Fisuras o dobleces"
              text="Una varilla dañada puede romperse durante el golpe."
              variant="sell"
            />
          </div>

          <Callout
            icon="🏌️"
            title="Regla rápida ATHMOV"
            text="Los arañazos normales en la suela apenas afectan al valor. Una grieta en la cara, la corona o la varilla reduce drásticamente el interés del driver."
            variant="sand"
          />
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Qué preguntar al vendedor antes de comprar
          </h2>

          <p style={paragraphStyle}>
            Un buen vendedor no tendrá problema en responder estas preguntas.
            Cuanta más información recibas antes de comprar, menor será el
            riesgo de llevarte una sorpresa.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Año del driver"
              text="Permite saber la generación del modelo y estimar su depreciación."
            />

            <ChecklistItem
              number="2"
              title="Loft"
              text="Comprueba que coincide con tus necesidades y con la configuración original."
            />

            <ChecklistItem
              number="3"
              title="Flex de la varilla"
              text="Regular, Stiff, X-Stiff… es uno de los datos más importantes."
            />

            <ChecklistItem
              number="4"
              title="Varilla original"
              text="Pregunta si mantiene la varilla de fábrica o si ha sido sustituida."
            />

            <ChecklistItem
              number="5"
              title="Fotos de la cara"
              text="Solicita imágenes de alta calidad donde puedan apreciarse los impactos."
            />

            <ChecklistItem
              number="6"
              title="Fotos de la corona"
              text="Las grietas y deformaciones suelen apreciarse mejor desde arriba."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Cuándo merece la pena comprar un driver usado
          </h2>

          <p style={paragraphStyle}>
            El mercado de segunda mano ofrece excelentes oportunidades,
            especialmente en modelos premium de pocos años. Muchos jugadores
            cambian de driver con frecuencia y venden material que todavía tiene
            mucha vida útil.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="<3 años"
              text="La mejor combinación entre tecnología, precio y vida útil."
            />

            <BrandCard
              brand="Premium"
              text="TaylorMade, Titleist, Ping o Callaway mantienen mejor su valor."
            />

            <BrandCard
              brand="Ajustable"
              text="Los modelos con hosel ajustable ofrecen mayor versatilidad."
            />

            <BrandCard
              brand="Original"
              text="La varilla original suele facilitar una futura reventa."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            Compra con información, no solo con fotos
          </h2>

          <p style={paragraphStyle}>
            Un buen driver de segunda mano puede ofrecer prácticamente el mismo
            rendimiento que uno nuevo si la estructura está intacta y no existen
            daños importantes en la cara, la corona o la varilla. Dedicar unos
            minutos a revisarlo puede ahorrarte una mala compra.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra drivers de
              <br />
              golf de segunda mano
            </h3>

            <p style={ctaTextStyle}>
              Descubre drivers revisados y material premium de segunda mano en
              ATHMOV.
            </p>

            <a
              href="/products?category=GOLF"
              style={ctaButtonStyle}
            >
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/que-revisar-driver-golf-segunda-mano"
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