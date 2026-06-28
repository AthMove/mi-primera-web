import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Cómo saber si un driver de golf es original | ATHMOV",
  description:
    "Guía ATHMOV para verificar si un driver de golf es original antes de comprarlo de segunda mano. Serial, corona, cara, hosel, varilla y acabados.",

  openGraph: {
    title: "Cómo saber si un driver de golf es original",
    description:
      "Aprende a comprobar si un driver de golf usado es auténtico antes de comprarlo.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cómo saber si un driver de golf es original",
    description:
      "Guía ATHMOV para verificar un driver de golf de segunda mano.",
    images: ["/golf.jpg"],
  },
};

export default function OriginalDriverGolfArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Cómo saber si un driver de golf es original"
        description="Guía ATHMOV para verificar si un driver de golf usado es auténtico antes de comprarlo."
        image="/golf.jpg"
        url="/blog/como-saber-si-un-driver-golf-es-original"
        category="golf"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>driver</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Cómo saber si un
              <br />
              driver de golf es
              <br />
              <em style={titleEmStyle}>original</em>
            </h1>

            <p style={subtitleStyle}>
              Los drivers premium tienen mucha demanda en el mercado de segunda
              mano. Aprende a revisar seriales, acabados, hosel, varilla y
              detalles clave antes de comprar.
            </p>

            <div style={heroMetaStyle}>
              <div>
                <p style={metaLabelStyle}>Lectura</p>
                <p style={metaValueStyle}>6 minutos</p>
              </div>

              <div>
                <p style={metaLabelStyle}>Categoría</p>
                <p style={metaValueStyle}>Golf · Autenticidad</p>
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
            Un driver falso puede parecer convincente en fotos, pero suele fallar
            en detalles difíciles de copiar: número de serie, calidad de pintura,
            acabado del hosel, peso, varilla y precisión de los logotipos.
            Revisar esos puntos antes de pagar reduce mucho el riesgo.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Dónde encontrar el número de serie
          </h2>

          <p style={paragraphStyle}>
            El número de serie es una de las primeras comprobaciones. No todos
            los fabricantes lo colocan en el mismo lugar, pero en drivers premium
            suele aparecer grabado o marcado en zonas concretas de la cabeza o
            del hosel.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="TaylorMade"
              text="Suele incluir serial en la cabeza o zona cercana al hosel. Revisa que el grabado sea limpio."
            />

            <BrandCard
              brand="Callaway"
              text="Comprueba serial, acabado del hosel y coherencia con el modelo anunciado."
            />

            <BrandCard
              brand="Ping"
              text="Los seriales ayudan a identificar especificaciones y configuración del palo."
            />

            <BrandCard
              brand="Titleist"
              text="Revisa número de serie, tipografías y acabados de pintura en la corona."
            />

            <BrandCard
              brand="Cobra"
              text="Comprueba que el modelo, loft, varilla y acabados coinciden con la versión oficial."
            />

            <BrandCard
              brand="Mizuno"
              text="Verifica seriales, hosel y detalles de acabado antes de comprar modelos premium."
            />
          </div>

          <blockquote style={quoteStyle}>
            “Una falsificación puede copiar el diseño.
            <span style={quoteAccentStyle}>
              {" "}Los detalles pequeños son mucho más difíciles de copiar.
            </span>
            ”
          </blockquote>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Las 6 comprobaciones clave
          </h2>

          <p style={paragraphStyle}>
            La autenticidad no depende de una sola señal. Lo importante es que
            todo encaje: serial, acabados, peso, varilla, grip y estado general.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Número de serie"
              text="Debe estar bien grabado, ser legible y tener sentido según la marca."
            />

            <BrandCard
              brand="Cara"
              text="Revisa grabados, textura, alineación y calidad del acabado."
            />

            <BrandCard
              brand="Corona"
              text="Los logos, colores y líneas deben coincidir con fotos oficiales."
            />

            <BrandCard
              brand="Hosel"
              text="El sistema ajustable debe encajar bien, sin holguras ni piezas mal acabadas."
            />

            <BrandCard
              brand="Varilla"
              text="El shaft debe coincidir con el modelo anunciado y mostrar especificaciones claras."
            />

            <BrandCard
              brand="Grip"
              text="Un grip cambiado no implica falsificación, pero conviene saberlo para valorar el precio."
            />
          </div>

          <Callout
            icon="🏌️"
            title="Consejo ATHMOV"
            text="Si el vendedor no puede enseñar el número de serie, fotos claras del hosel y detalle de la cara, es mejor no avanzar con la compra."
            variant="sand"
          />

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Original vs sospechoso
          </h2>

          <p style={paragraphStyle}>
            Algunas señales no demuestran por sí solas que un driver sea falso,
            pero sí indican que conviene revisar con más cuidado.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Serial"
              tag="Original"
              icon="✔"
              title="Grabado limpio"
              text="Número legible, bien colocado y coherente con el fabricante."
              variant="buy"
            />

            <TimelineRow
              month="Acabado"
              tag="Original"
              icon="✔"
              title="Pintura uniforme"
              text="Colores, logos y bordes coinciden con imágenes oficiales."
              variant="buy"
            />

            <TimelineRow
              month="Precio"
              tag="Revisar"
              icon="⚠️"
              title="Demasiado bajo"
              text="Un precio muy inferior al mercado exige pruebas adicionales."
              variant="neutral"
            />

            <TimelineRow
              month="Hosel"
              tag="Sospechoso"
              icon="❌"
              title="Holguras o mal ajuste"
              text="Las piezas ajustables mal acabadas son una señal de alerta."
              variant="dead"
            />

            <TimelineRow
              month="Fotos"
              tag="Descartar"
              icon="🚫"
              title="Imágenes borrosas"
              text="Si no se ven serial, cara, corona y varilla, no compres."
              variant="sell"
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Qué pedir al vendedor antes de pagar
          </h2>

          <p style={paragraphStyle}>
            Antes de desplazarte o enviar dinero, pide pruebas concretas. Un
            vendedor serio no debería tener problema en mostrar los puntos clave.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Foto del número de serie"
              text="Debe verse con nitidez y sin zonas ocultas."
            />

            <ChecklistItem
              number="2"
              title="Foto de la cara"
              text="Permite revisar grabados, textura y desgaste real."
            />

            <ChecklistItem
              number="3"
              title="Foto de la corona"
              text="Ayuda a comparar colores, logos y líneas con el modelo oficial."
            />

            <ChecklistItem
              number="4"
              title="Foto del hosel"
              text="Especialmente importante en drivers ajustables."
            />

            <ChecklistItem
              number="5"
              title="Foto de la varilla"
              text="Debe verse marca, modelo, flex y estado."
            />

            <ChecklistItem
              number="6"
              title="Vídeo corto"
              text="Un vídeo mostrando todo el driver reduce mucho el riesgo."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            Verifica antes de pagar
          </h2>

          <p style={paragraphStyle}>
            Un driver original debe ser coherente en todos sus detalles: serial,
            acabados, varilla, grip, hosel y estado general. Si algo no encaja o
            el vendedor evita enseñar zonas concretas, es mejor seguir buscando.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Compra drivers de golf
              <br />
              con más confianza
            </h3>

            <p style={ctaTextStyle}>
              Encuentra drivers y material de golf premium de segunda mano en
              ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/como-saber-si-un-driver-golf-es-original"
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
