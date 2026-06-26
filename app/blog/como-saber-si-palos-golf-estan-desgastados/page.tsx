import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Cómo saber si unos palos de golf están desgastados | ATHMOV",
  description:
    "Aprende a identificar el desgaste real de unos palos de golf de segunda mano revisando estrías, cara del palo, grip y varilla.",

  openGraph: {
    title: "Cómo saber si unos palos de golf están desgastados",
    description:
      "Guía ATHMOV para revisar el desgaste de unos palos de golf usados.",
    type: "article",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cómo saber si unos palos de golf están desgastados",
    description:
      "Aprende a revisar unos palos de golf usados antes de comprarlos.",
    images: ["/golf.jpg"],
  },
};

export default function GolfWearArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Cómo saber si unos palos de golf están desgastados"
        description="Guía ATHMOV para identificar el desgaste real de unos palos de golf de segunda mano."
        image="/golf.jpg"
        url="/blog/como-saber-si-palos-golf-estan-desgastados"
        category="golf"
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroBackgroundTextStyle}>golf</div>

          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Cómo saber si unos
              <br />
              palos de golf están
              <br />
              <em style={titleEmStyle}>desgastados</em>
            </h1>

            <p style={subtitleStyle}>
              Antes de comprar unos palos de golf usados conviene revisar mucho
              más que el aspecto exterior. La cara del palo, las estrías, el
              grip y la varilla revelan el uso real y el rendimiento que todavía
              pueden ofrecer.
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
            No todos los arañazos significan que un palo esté agotado. Algunas
            marcas son normales después de muchas rondas, mientras que otras
            afectan directamente al control, el spin y la precisión. Saber
            diferenciarlas evita pagar de más por material que ya ha perdido
            rendimiento.
          </p>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 1</span>
            Las cinco zonas que debes revisar
          </h2>

          <p style={paragraphStyle}>
            Antes de comprar unos palos de golf usados dedica unos minutos a
            inspeccionar estas partes.
          </p>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Cara"
              text="Busca golpes profundos, desgaste excesivo y marcas que afecten al impacto."
            />

            <BrandCard
              brand="Estrías"
              text="Las estrías conservadas ayudan a mantener el control y el spin."
            />

            <BrandCard
              brand="Suela"
              text="Los arañazos son normales, pero los golpes importantes pueden indicar un uso muy intenso."
            />

            <BrandCard
              brand="Varilla"
              text="Comprueba que no presenta deformaciones, óxido ni grietas."
            />

            <BrandCard
              brand="Grip"
              text="Un grip muy gastado implica un cambio casi inmediato."
            />
          </div>

          <blockquote style={quoteStyle}>
            “Un palo brillante no siempre está en buen estado.
            <span style={quoteAccentStyle}>
              {" "}
              Las estrías cuentan la verdadera historia.
            </span>
            ”
          </blockquote>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 2</span>
            Señales de desgaste
          </h2>

          <div style={timelineStyle}>
            <TimelineRow
              month="Estrías"
              tag="Excelente"
              icon="✔"
              title="Bien definidas"
              text="Mantienen un buen nivel de control."
              variant="buy"
            />

            <TimelineRow
              month="Cara"
              tag="Normal"
              icon="🏌️"
              title="Desgaste superficial"
              text="Compatible con un uso habitual."
              variant="neutral"
            />

            <TimelineRow
              month="Grip"
              tag="Revisar"
              icon="⚠️"
              title="Grip endurecido"
              text="Necesitará sustitución pronto."
              variant="neutral"
            />

            <TimelineRow
              month="Estrías"
              tag="Mala señal"
              icon="❌"
              title="Muy desgastadas"
              text="Disminuyen el control y el efecto."
              variant="dead"
            />

            <TimelineRow
              month="Varilla"
              tag="Evitar"
              icon="🚫"
              title="Doblada o dañada"
              text="Puede afectar al rendimiento y a la seguridad."
              variant="sell"
            />
          </div>

          <Callout
            icon="⛳"
            title="Consejo ATHMOV"
            text="Las estrías casi lisas suelen indicar un uso muy elevado. Aunque el palo siga siendo utilizable, su rendimiento ya no será el mismo."
            variant="sand"
          />

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 3</span>
            Cómo afecta el desgaste al rendimiento
          </h2>

          <div style={brandGridStyle}>
            <BrandCard
              brand="Spin"
              text="Las estrías desgastadas reducen la capacidad de generar efecto."
            />

            <BrandCard
              brand="Control"
              text="El impacto pierde consistencia conforme aumenta el desgaste."
            />

            <BrandCard
              brand="Precisión"
              text="Los golpes son menos predecibles cuando la cara está muy marcada."
            />

            <BrandCard
              brand="Valor"
              text="El estado del palo influye directamente en su precio de segunda mano."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Sección 4</span>
            Qué pedir al vendedor
          </h2>

          <div style={checklistStyle}>
            <ChecklistItem
              number="1"
              title="Foto de la cara"
              text="Permite comprobar el desgaste real."
            />

            <ChecklistItem
              number="2"
              title="Detalle de las estrías"
              text="Es uno de los puntos más importantes."
            />

            <ChecklistItem
              number="3"
              title="Foto del grip"
              text="Ayuda a estimar el uso acumulado."
            />

            <ChecklistItem
              number="4"
              title="Modelo exacto"
              text="Necesario para comparar especificaciones."
            />

            <ChecklistItem
              number="5"
              title="Año aproximado"
              text="Facilita valorar correctamente el material."
            />
          </div>

          <h2 style={sectionTitleStyle}>
            <span style={sectionNumberStyle}>Resumen</span>
            Revisar bien evita malas compras
          </h2>

          <p style={paragraphStyle}>
            Unos palos usados pueden seguir ofreciendo un excelente rendimiento
            si el desgaste es uniforme y las estrías mantienen profundidad.
            Revisar estos detalles te ayudará a comprar con mucha más seguridad.
          </p>

          <section style={ctaStyle}>
            <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

            <h3 style={ctaTitleStyle}>
              Encuentra palos de golf
              <br />
              revisados por la comunidad
            </h3>

            <p style={ctaTextStyle}>
              Descubre drivers, hierros, wedges y sets completos de segunda
              mano en ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={ctaButtonStyle}>
              Ver Golf →
            </a>
          </section>

          <RelatedArticles
            category="golf"
            currentHref="/blog/como-saber-si-palos-golf-estan-desgastados"
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