import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title:
    "Qué revisar antes de comprar unos hierros de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para revisar unos hierros de golf usados antes de comprarlos. Cara, estrías, varilla, ferrule, grip y señales de desgaste.",

  openGraph: {
    title:
      "Qué revisar antes de comprar unos hierros de golf de segunda mano",
    description:
      "Aprende a revisar unos hierros usados antes de comprarlos.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Qué revisar antes de comprar unos hierros de golf usados",
    description:
      "Guía ATHMOV para revisar unos hierros de segunda mano.",
    images: ["/golf.jpg"],
  },
};

export default function IronsSecondHandArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Qué revisar antes de comprar unos hierros de golf de segunda mano"
        description="Guía ATHMOV para revisar unos hierros usados antes de comprarlos."
        image="/golf.jpg"
        url="/blog/que-revisar-hierros-golf-segunda-mano"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>irons</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Qué revisar antes
              <br />
              de comprar unos
              <br />
              <em style={titleEmStyle}>hierros usados</em>
            </h1>

            <p style={subtitleStyle}>
              Un buen juego de hierros puede durar muchos años si ha sido bien
              cuidado. Aprende qué revisar antes de comprar unos hierros de
              golf de segunda mano y evita sorpresas.
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
            Los hierros suelen durar más que un driver, pero también acumulan
            miles de impactos. El estado de las estrías, la cara, las varillas
            y los grips influye tanto en el rendimiento como en su valor de
            segunda mano.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Las 6 zonas que debes revisar
          </h2>

          <p style={paragraphStyle}>
            Antes de comprar unos hierros usados dedica unos minutos a revisar
            cada una de estas partes. Ahí aparecen la mayoría de los problemas.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Cara"
              text="Comprueba golpes profundos, desgaste excesivo y estado de las estrías."
            />

            <BrandCard
              brand="Suela"
              text="Los arañazos son normales, pero evita deformaciones importantes."
            />

            <BrandCard
              brand="Ferrule"
              text="Debe estar perfectamente ajustado entre la cabeza y la varilla."
            />

            <BrandCard
              brand="Varilla"
              text="Revisa que no existan dobleces, fisuras ni óxido."
            />

            <BrandCard
              brand="Grip"
              text="Un grip desgastado es barato de cambiar, pero revela el uso real."
            />

            <BrandCard
              brand="Juego"
              text="Comprueba que todos los hierros pertenecen al mismo modelo y mantienen las especificaciones."
            />
          </div>

          <blockquote style={quoteStyle}>
            “Los arañazos son normales.
            <span style={quoteAccentStyle}>
              {" "}Las estrías gastadas son las que cambian el rendimiento.
            </span>
            ”
          </blockquote>
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Desgaste normal vs desgaste preocupante
          </h2>

          <p style={paragraphStyle}>
            Unos hierros usados siempre tendrán marcas de juego. La clave está
            en diferenciar el desgaste estético de los daños que afectan al
            rendimiento o reducen significativamente su valor.
          </p>

          <div style={timelineStyle}>
            <TimelineRow
              month="Cara"
              tag="Correcto"
              icon="✔"
              title="Marcas superficiales"
              text="Pequeños impactos producidos por el uso normal."
              variant="buy"
            />

            <TimelineRow
              month="Suela"
              tag="Normal"
              icon="🏌️"
              title="Arañazos por apoyo"
              text="Es habitual encontrar rozaduras por el contacto con el césped y la arena."
              variant="neutral"
            />

            <TimelineRow
              month="Estrías"
              tag="Revisar"
              icon="⚠️"
              title="Desgaste acusado"
              text="Las estrías muy desgastadas reducen el control y el spin."
              variant="neutral"
            />

            <TimelineRow
              month="Varilla"
              tag="Evitar"
              icon="❌"
              title="Óxido o fisuras"
              text="Una varilla dañada puede comprometer la seguridad y el rendimiento."
              variant="dead"
            />

            <TimelineRow
              month="Cabeza"
              tag="Descartar"
              icon="🚫"
              title="Golpes estructurales"
              text="Fisuras o deformaciones importantes son motivo suficiente para no comprar."
              variant="sell"
            />
          </div>

          <Callout
            icon="⛳"
            title="Regla rápida ATHMOV"
            text="Los grips y pequeños arañazos tienen solución. Las estrías muy desgastadas, las varillas dañadas o una cabeza deformada reducen mucho el interés del juego."
            variant="sand"
          />
                    <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Qué preguntar al vendedor antes de comprar
          </h2>

          <p style={paragraphStyle}>
            Un vendedor serio debería poder responder estas preguntas sin
            problema. Si evita dar detalles, pide más fotos o sigue buscando.
          </p>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Año del modelo"
              text="Ayuda a saber la generación de los hierros y su valor actual."
            />

            <ChecklistItem
              number="2"
              title="Composición del set"
              text="Comprueba si incluye 4-PW, 5-PW, AW, SW u otras combinaciones."
            />

            <ChecklistItem
              number="3"
              title="Flex de la varilla"
              text="Regular, Stiff o X-Stiff deben adaptarse a tu velocidad de swing."
            />

            <ChecklistItem
              number="4"
              title="Varillas originales"
              text="Pregunta si mantienen la configuración de fábrica o si han sido sustituidas."
            />

            <ChecklistItem
              number="5"
              title="Fotos de todas las caras"
              text="Sirven para revisar estrías, desgaste e impactos visibles."
            />

            <ChecklistItem
              number="6"
              title="Fotos de las suelas"
              text="Ayudan a detectar golpes, arañazos profundos y uso intensivo."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Cuándo merece la pena comprar unos hierros usados
          </h2>

          <p style={paragraphStyle}>
            Los hierros de segunda mano pueden ser una gran compra si el set
            está completo, las estrías mantienen buen estado y las varillas
            coinciden con tus necesidades.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="<5 años"
              text="Suelen conservar tecnología actual y buen valor de reventa."
            />

            <BrandCard
              brand="Set completo"
              text="Un juego coherente es más fácil de usar, valorar y revender."
            />

            <BrandCard
              brand="Varilla correcta"
              text="El flex y el peso de la varilla influyen mucho en el rendimiento."
            />

            <BrandCard
              brand="Marcas premium"
              text="Titleist, Ping, Mizuno, TaylorMade y Callaway suelen mantener mejor demanda."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            Un buen set puede durar muchos años
          </h2>

          <p style={paragraphStyle}>
            Comprar hierros usados puede ser una excelente decisión si revisas
            bien las caras, las estrías, las varillas y la composición del set.
            La clave está en pagar por rendimiento real, no solo por marca o
            apariencia.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra hierros de
              <br />
              golf de segunda mano
            </h3>

            <p style={ctaTextStyle}>
              Descubre sets de hierros revisados y material premium de segunda
              mano en ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/que-revisar-hierros-golf-segunda-mano"
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