import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";
export const metadata = {
  title: "Cómo calcular el precio de palos de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para valorar correctamente palos de golf usados según marca, modelo, estado, antigüedad y demanda.",
};

export default function GolfPriceArticlePage() {
  return (
    <>
      <ArticleSEO
        title="Cómo calcular el precio de palos de golf de segunda mano"
        description="Guía ATHMOV para valorar correctamente palos de golf usados según marca, modelo, estado, antigüedad y demanda."
        image="/golf.jpg"
        url="/blog/como-calcular-precio-palos-golf-segunda-mano"
      />

      <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>golf</div>

        <div style={wrapStyle}>
          <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

          <h1 style={titleStyle}>
            Cómo calcular
            <br />
            el precio de unos
            <br />
            <em style={titleEmStyle}>palos usados</em>
          </h1>

          <p style={subtitleStyle}>
            Saber cuánto vale realmente tu material de golf es la diferencia
            entre vender rápido o acumular meses sin recibir ofertas.
          </p>

          <div style={heroMetaStyle}>
            <div>
              <p style={metaLabelStyle}>Lectura</p>
              <p style={metaValueStyle}>6 minutos</p>
            </div>

            <div>
              <p style={metaLabelStyle}>Categoría</p>
              <p style={metaValueStyle}>Golf · Mercado</p>
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
          Muchos jugadores calculan el precio de sus palos pensando en lo que
          pagaron cuando eran nuevos. El mercado de segunda mano funciona de
          otra forma: el valor depende del estado, la demanda actual y la
          antigüedad real del modelo.
        </p>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 1</span>
          Qué determina el valor real de unos palos de golf
        </h2>

        <p style={paragraphStyle}>
          No todos los palos pierden valor al mismo ritmo. Un set premium bien
          conservado puede mantener gran parte de su precio, mientras que un
          modelo antiguo, con golpes visibles o grips gastados puede depreciarse
          mucho más rápido.
        </p>

        <div style={brandGridStyle}>
          <BrandCard
            brand="Marca"
            text="Titleist, TaylorMade, Ping y Callaway suelen mantener mejor valor de reventa."
          />

          <BrandCard
            brand="Modelo"
            text="Las gamas premium y modelos recientes generan más demanda entre compradores."
          />

          <BrandCard
            brand="Año"
            text="La depreciación aumenta conforme aparecen nuevas generaciones del mismo palo."
          />

          <BrandCard
            brand="Estado"
            text="La cara del palo, la suela y la corona son las zonas más revisadas antes de comprar."
          />

          <BrandCard
            brand="Varilla"
            text="El tipo de shaft, flex y material pueden afectar significativamente al precio."
          />

          <BrandCard
            brand="Grips"
            text="Unos grips en buen estado aumentan la percepción de cuidado del material."
          />
        </div>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 2</span>
          Tabla orientativa de depreciación
        </h2>

        <p style={paragraphStyle}>
          Esta tabla sirve como referencia inicial. El precio final siempre debe
          ajustarse según el estado real, la demanda del modelo y si vendes un
          set completo o palos sueltos.
        </p>

        <div style={timelineStyle}>
          <TimelineRow
            month="0–1 año"
            tag="Excelente"
            icon="🏌️"
            title="70–85% del precio nuevo"
            text="Material reciente, con poco uso y sin daños relevantes."
            variant="sell"
          />

          <TimelineRow
            month="1–2 años"
            tag="Muy bueno"
            icon="📈"
            title="60–75% del precio nuevo"
            text="Rango habitual para palos premium bien conservados."
            variant="buy"
          />

          <TimelineRow
            month="2–4 años"
            tag="Uso normal"
            icon="📉"
            title="45–60% del precio nuevo"
            text="Depende mucho del modelo, la marca y el estado del palo."
            variant="neutral"
          />

          <TimelineRow
            month="4–6 años"
            tag="Veterano"
            icon="⛳"
            title="30–45% del precio nuevo"
            text="La demanda empieza a reducirse salvo en modelos muy buscados."
            variant="dead"
          />

          <TimelineRow
            month="+6 años"
            tag="Antiguo"
            icon="⌛"
            title="15–30% del precio nuevo"
            text="Solo algunos modelos o sets muy cuidados conservan valor alto."
            variant="dead"
          />
        </div>

        <blockquote style={quoteStyle}>
          “El mejor palo para vender no es el más nuevo.{" "}
          <span style={quoteAccentStyle}>
            Es el que todavía sigue teniendo demanda.
          </span>
          ”
        </blockquote>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 3</span>
          Errores que hacen que unos palos no se vendan
        </h2>

        <p style={paragraphStyle}>
          Un precio correcto ayuda, pero la confianza también vende. En golf, el
          comprador quiere ver estado, especificaciones y señales claras de uso
          antes de hacer una oferta.
        </p>

        <div style={checklistStyle}>
          <ChecklistItem
            number="1"
            title="No mostrar la cara del palo"
            text="Es la zona que más interesa a los compradores porque muestra desgaste real."
          />

          <ChecklistItem
            number="2"
            title="Ocultar golpes o marcas"
            text="La transparencia genera confianza y evita ofertas muy bajas después."
          />

          <ChecklistItem
            number="3"
            title="No indicar flex de la varilla"
            text="El tipo de shaft influye directamente en la demanda del palo."
          />

          <ChecklistItem
            number="4"
            title="No indicar especificaciones"
            text="Loft, lie, longitud y composición del set ayudan a vender más rápido."
          />

          <ChecklistItem
            number="5"
            title="Fotos oscuras"
            text="Las imágenes son parte fundamental de la valoración del material."
          />

          <ChecklistItem
            number="6"
            title="Poner precio pensando en lo que costaron"
            text="El mercado actual es quien determina el valor, no el precio original."
          />
        </div>

        <Callout
          icon="🏌️"
          title="Regla rápida ATHMOV"
          text="Empieza entre el 65% y el 75% del precio nuevo si el material tiene menos de dos años y está en muy buen estado."
          variant="moss"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 4</span>
          Cómo poner un precio competitivo
        </h2>

        <p style={paragraphStyle}>
          Busca anuncios del mismo modelo, año y composición. Si vendes un set,
          compara sets completos. Si vendes un driver, wedge o putter suelto,
          compara exactamente esa pieza.
        </p>

        <p style={paragraphStyle}>
          Después ajusta según el estado: cara del palo, suela, corona, shaft,
          grip y accesorios incluidos. Un precio ligeramente inferior al promedio
          suele generar más interés y más conversaciones.
        </p>

        <Callout
          icon="📸"
          title="La presentación también sube el valor"
          text="Fotos claras de la cara, suela, corona, shaft y grip pueden justificar mejor el precio que una descripción larga."
          variant="sand"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Resumen</span>
          El precio correcto vende
        </h2>

        <p style={paragraphStyle}>
          El mejor precio no es el más alto. Es el que genera interés,
          transmite confianza y permite cerrar la venta sin largas
          negociaciones.
        </p>

        <section style={ctaStyle}>
          <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

          <h3 style={ctaTitleStyle}>
            ¿Quieres saber cuánto
            <br />
            vale tu material de golf?
          </h3>

          <p style={ctaTextStyle}>
            Publica tus palos en ATHMOV y encuentra compradores interesados en
            equipamiento premium de segunda mano.
          </p>

          <a href="/sell" style={ctaButtonStyle}>
            Publicar en ATHMOV →
          </a>
        </section>
<RelatedArticles
  category="golf"
  currentHref="/blog/como-calcular-precio-palos-golf-segunda-mano"
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

const relatedStyle = {
  marginTop: "54px",
  paddingTop: "34px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const relatedEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "#777",
  fontWeight: 900,
  marginBottom: "18px",
};

const relatedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "14px",
};

const relatedCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "20px",
  textDecoration: "none",
  color: "#111",
};

const relatedCategoryStyle = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
  marginBottom: "10px",
};

const relatedTitleStyle = {
  fontSize: "18px",
  lineHeight: 1.35,
};