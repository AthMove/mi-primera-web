import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title:
    "Qué revisar antes de comprar un putter de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para revisar un putter de golf usado antes de comprarlo. Cara, inserto, hosel, varilla, grip y señales de desgaste.",

  openGraph: {
    title:
      "Qué revisar antes de comprar un putter de golf de segunda mano",
    description:
      "Aprende a revisar un putter usado antes de comprarlo.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Qué revisar antes de comprar un putter de golf usado",
    description:
      "Guía ATHMOV para revisar un putter de segunda mano.",
    images: ["/golf.jpg"],
  },
};

export default function PutterSecondHandArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Qué revisar antes de comprar un putter de golf de segunda mano"
        description="Guía ATHMOV para revisar un putter usado antes de comprarlo."
        image="/golf.jpg"
        url="/blog/que-revisar-putter-golf-segunda-mano"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>putter</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Qué revisar antes
              <br />
              de comprar un
              <br />
              <em style={titleEmStyle}>putter usado</em>
            </h1>

            <p style={subtitleStyle}>
              El putter es el palo que más golpes realiza durante una vuelta.
              Aprende qué revisar antes de comprar uno de segunda mano y evita
              pagar de más por un palo con desgaste oculto.
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
            Un putter puede durar décadas si se cuida correctamente. A diferencia
            del driver o los hierros, apenas recibe impactos fuertes, pero el
            uso continuado puede dejar desgaste en la cara, el grip o la varilla
            que conviene revisar antes de comprar.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Las 6 zonas que debes revisar
          </h2>

          <p style={paragraphStyle}>
            Dedica unos minutos a inspeccionar estas partes. Son las que mejor
            reflejan el estado real del putter.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Cara"
              text="Comprueba golpes, marcas profundas o desgaste del inserto."
            />

            <BrandCard
              brand="Suela"
              text="Los arañazos son normales, pero evita deformaciones importantes."
            />

            <BrandCard
              brand="Hosel"
              text="Debe estar firme, sin grietas ni holguras."
            />

            <BrandCard
              brand="Varilla"
              text="Comprueba que esté recta y libre de óxido o fisuras."
            />

            <BrandCard
              brand="Grip"
              text="Su estado permite estimar el uso real del putter."
            />

            <BrandCard
              brand="Alineación"
              text="Las líneas de ayuda deben conservarse nítidas y sin modificaciones."
            />
          </div>

          <blockquote style={quoteStyle}>
            “Un buen putter puede durar décadas.
            <span style={quoteAccentStyle}>
              {" "}La precisión está en los pequeños detalles.
            </span>
            ”
          </blockquote>
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Desgaste normal vs desgaste preocupante
          </h2>

          <p style={paragraphStyle}>
            Un putter usado puede tener marcas normales de juego sin que eso
            afecte al rendimiento. Lo importante es distinguir los signos
            estéticos de los problemas que pueden alterar la precisión.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Cara"
              tag="Correcto"
              icon="✔"
              title="Marcas superficiales"
              text="Pequeñas marcas de bola o roce suelen ser normales."
              variant="buy"
            />

            <TimelineRow
              month="Suela"
              tag="Normal"
              icon="🏌️"
              title="Arañazos por apoyo"
              text="La suela suele mostrar desgaste por contacto con el green."
              variant="neutral"
            />

            <TimelineRow
              month="Inserto"
              tag="Revisar"
              icon="⚠️"
              title="Desgaste visible"
              text="Si el inserto está muy marcado, puede afectar al tacto del golpe."
              variant="neutral"
            />

            <TimelineRow
              month="Hosel"
              tag="Evitar"
              icon="❌"
              title="Holgura"
              text="Cualquier movimiento entre cabeza y varilla es una mala señal."
              variant="dead"
            />

            <TimelineRow
              month="Varilla"
              tag="Descartar"
              icon="🚫"
              title="Doblada u oxidada"
              text="Una varilla dañada puede alterar la alineación y el golpe."
              variant="sell"
            />
          </div>

          <Callout
            icon="⛳"
            title="Regla rápida ATHMOV"
            text="Un grip gastado se cambia fácilmente. Una cara dañada, un inserto deteriorado o un hosel con holgura son problemas mucho más importantes."
            variant="sand"
          />
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Qué preguntar al vendedor antes de comprar
          </h2>

          <p style={paragraphStyle}>
            Un putter puede parecer sencillo, pero pequeños detalles como la
            longitud, el peso o el grip influyen mucho en la sensación de golpe.
            Pide esta información antes de decidir.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Año del modelo"
              text="Ayuda a valorar su precio y su demanda actual."
            />

            <ChecklistItem
              number="2"
              title="Longitud"
              text="Debe adaptarse a tu postura y forma de patear."
            />

            <ChecklistItem
              number="3"
              title="Peso original"
              text="Algunos modelos tienen pesos ajustables o versiones diferentes."
            />

            <ChecklistItem
              number="4"
              title="Grip original"
              text="Un grip cambiado no es un problema, pero conviene saberlo."
            />

            <ChecklistItem
              number="5"
              title="Fotos de la cara"
              text="Permiten revisar el inserto, golpes y desgaste real."
            />

            <ChecklistItem
              number="6"
              title="Fotos de la suela"
              text="Ayudan a valorar arañazos, golpes y estado general."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Cuándo merece la pena comprar un putter usado
          </h2>

          <p style={paragraphStyle}>
            Comprar un putter de segunda mano puede ser una gran oportunidad.
            Muchos modelos premium mantienen muy bien su rendimiento durante
            años si la cara, la varilla y el hosel están en buen estado.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Premium"
              text="Scotty Cameron, Odyssey, Ping o TaylorMade suelen mantener mejor valor."
            />

            <BrandCard
              brand="Original"
              text="Un putter con componentes originales suele ser más fácil de revender."
            />

            <BrandCard
              brand="<10 años"
              text="Muchos putters conservan rendimiento durante mucho tiempo."
            />

            <BrandCard
              brand="Grip sustituible"
              text="Cambiar el grip es económico y puede mejorar mucho la sensación."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            La precisión está en los detalles
          </h2>

          <p style={paragraphStyle}>
            Un buen putter usado puede ofrecer prácticamente el mismo
            rendimiento que uno nuevo si mantiene la cara, el hosel y la varilla
            en buen estado. Revisa bien esos puntos antes de pagar.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra putters de
              <br />
              golf de segunda mano
            </h3>

            <p style={ctaTextStyle}>
              Descubre putters revisados y material premium de segunda mano en
              ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/que-revisar-putter-golf-segunda-mano"
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