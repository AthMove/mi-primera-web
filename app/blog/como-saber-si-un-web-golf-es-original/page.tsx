import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title:
    "Cómo saber si un wedge de golf es original | ATHMOV",
  description:
    "Guía ATHMOV para verificar un wedge de golf original. Aprende a revisar el número de serie, estrías, acabados, loft, bounce y señales de falsificación.",

  openGraph: {
    title:
      "Cómo saber si un wedge de golf es original",
    description:
      "Aprende a verificar un wedge de golf antes de comprarlo.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Cómo saber si un wedge de golf es original",
    description:
      "Guía ATHMOV para verificar un wedge de golf original.",
    images: ["/golf.jpg"],
  },
};

export default function OriginalWedgeArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Cómo saber si un wedge de golf es original"
        description="Guía ATHMOV para verificar un wedge de golf antes de comprarlo."
        image="/golf.jpg"
        url="/blog/como-saber-si-un-wedge-golf-es-original"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>wedge</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Cómo saber si un
              <br />
              wedge de golf es
              <br />
              <em style={titleEmStyle}>original</em>
            </h1>

            <p style={subtitleStyle}>
              Los wedges premium son uno de los productos más falsificados del
              mercado de segunda mano. Aprende a identificar un wedge auténtico
              revisando los detalles que realmente importan.
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
            Un wedge falso puede parecer convincente a simple vista, pero casi
            siempre presenta diferencias en el número de serie, las estrías, los
            acabados o los grabados. Revisar estos detalles antes de comprar es
            la mejor forma de evitar una mala inversión.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Dónde encontrar el número de serie
          </h2>

          <p style={paragraphStyle}>
            Dependiendo de la marca, el número de serie puede encontrarse en
            diferentes zonas del wedge. Es uno de los primeros elementos que
            deberías comprobar.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Titleist Vokey"
              text="Normalmente incorpora el número de serie grabado en el hosel."
            />

            <BrandCard
              brand="Cleveland"
              text="Muchos modelos incluyen grabados específicos para su identificación."
            />

            <BrandCard
              brand="Callaway"
              text="El serial puede variar según la generación y el modelo."
            />

            <BrandCard
              brand="TaylorMade"
              text="Revisa el grabado y compáralo con fotografías oficiales."
            />

            <BrandCard
              brand="Ping"
              text="Los modelos originales suelen incorporar referencias perfectamente mecanizadas."
            />

            <BrandCard
              brand="Otros fabricantes"
              text="Consulta siempre la ubicación del número de serie del modelo concreto."
            />
          </div>

          <blockquote style={quoteStyle}>
            “La ausencia de un número de serie
            <span style={quoteAccentStyle}>
              {" "}no siempre significa falsificación, pero sí merece una revisión mucho más detallada.
            </span>
            ”
          </blockquote>
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Las 6 comprobaciones clave
          </h2>

          <p style={paragraphStyle}>
            Para verificar un wedge no basta con mirar el logo. La autenticidad
            se confirma cuando todos los detalles coinciden: serial, estrías,
            loft, bounce, acabados, varilla y grip.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Serial"
              text="Debe estar grabado con limpieza y en una ubicación coherente con la marca."
            />

            <BrandCard
              brand="Estrías"
              text="Las grooves deben ser uniformes, nítidas y bien mecanizadas."
            />

            <BrandCard
              brand="Loft y bounce"
              text="Los grabados deben coincidir con el modelo anunciado."
            />

            <BrandCard
              brand="Acabados"
              text="Revisa pintura, bordes, tipografías y calidad general del mecanizado."
            />

            <BrandCard
              brand="Varilla"
              text="Comprueba modelo, flex, etiquetas y especificaciones impresas."
            />

            <BrandCard
              brand="Grip"
              text="Un grip cambiado no significa que sea falso, pero conviene saberlo."
            />
          </div>

          <Callout
            icon="⛳"
            title="Consejo ATHMOV"
            text="Si el vendedor evita mostrar el serial, la cara del wedge o los grabados de loft y bounce, pide más fotos antes de avanzar."
            variant="sand"
          />

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Original vs sospechoso
          </h2>

          <p style={paragraphStyle}>
            Algunas señales no demuestran por sí solas que un wedge sea falso,
            pero sí indican que conviene revisar con más detalle antes de pagar.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Serial"
              tag="Original"
              icon="✔"
              title="Grabado limpio"
              text="El número de serie se ve definido y bien alineado."
              variant="buy"
            />

            <TimelineRow
              month="Logo"
              tag="Original"
              icon="✔"
              title="Tipografía correcta"
              text="Los logos y grabados coinciden con imágenes oficiales."
              variant="buy"
            />

            <TimelineRow
              month="Estrías"
              tag="Revisar"
              icon="⚠️"
              title="Mecanizado irregular"
              text="Grooves poco uniformes pueden indicar una réplica."
              variant="neutral"
            />

            <TimelineRow
              month="Acabado"
              tag="Mala señal"
              icon="❌"
              title="Pintura o bordes pobres"
              text="Los acabados imprecisos suelen delatar falsificaciones."
              variant="dead"
            />

            <TimelineRow
              month="Varilla"
              tag="Descartar"
              icon="🚫"
              title="Etiquetas incoherentes"
              text="Modelo, flex o especificaciones que no coinciden con el wedge anunciado."
              variant="sell"
            />
          </div>
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Qué pedir al vendedor antes de comprar
          </h2>

          <p style={paragraphStyle}>
            Antes de pagar, pide pruebas claras. Un vendedor transparente podrá
            enseñarte el wedge desde varios ángulos y resolver dudas sobre su
            procedencia.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Foto del serial"
              text="Debe verse nítido, completo y sin zonas borrosas."
            />

            <ChecklistItem
              number="2"
              title="Foto de la cara"
              text="Permite revisar las estrías, el desgaste y la calidad del mecanizado."
            />

            <ChecklistItem
              number="3"
              title="Foto de la suela"
              text="Ayuda a comprobar loft, bounce, grabados y acabados."
            />

            <ChecklistItem
              number="4"
              title="Foto de la varilla"
              text="Sirve para comprobar modelo, flex y etiquetas originales."
            />

            <ChecklistItem
              number="5"
              title="Vídeo completo"
              text="Un vídeo girando el wedge ayuda a detectar inconsistencias."
            />

            <ChecklistItem
              number="6"
              title="Factura o prueba de compra"
              text="No siempre estará disponible, pero aporta confianza adicional."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            Revisa los detalles antes de pagar
          </h2>

          <p style={paragraphStyle}>
            Para saber si un wedge es original, revisa número de serie, estrías,
            loft, bounce, acabados, varilla y grip. Si varias señales no
            encajan, es mejor pedir más pruebas o descartar la compra.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra wedges de
              <br />
              golf verificados
            </h3>

            <p style={ctaTextStyle}>
              Compra material de golf de segunda mano con más información,
              fotografías y transparencia en ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/como-saber-si-un-wedge-golf-es-original"
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
