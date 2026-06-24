import RelatedArticles from "@/components/RelatedArticles";

export const metadata = {
  title: "Cuándo comprar y vender palos de golf de segunda mano | ATHMOV",
  description:
    "Guía ATHMOV para saber cuándo comprar y vender palos de golf de segunda mano según temporada, lanzamientos y demanda.",
};

export default function GolfSecondHandArticlePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroBackgroundTextStyle}>golf</div>

        <div style={wrapStyle}>
          <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

          <h1 style={titleStyle}>
            Cuándo comprar
            <br />
            y vender tus
            <br />
            <em style={titleEmStyle}>palos de golf</em>
          </h1>

          <p style={subtitleStyle}>
            El mercado de segunda mano de golf tiene un calendario propio,
            marcado por los lanzamientos de las grandes marcas y por cuándo se
            llenan los campos. Conocerlo es la diferencia entre vender bien o
            vender tarde.
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
          El golf es de los pocos deportes donde el calendario de compra y venta
          no depende solo de las ganas de jugar: depende de cuándo las marcas
          lanzan equipamiento nuevo y de cuándo el clima vuelve a abrir los
          campos.
        </p>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 1</span>
          El calendario del mercado, mes a mes
        </h2>

        <p style={paragraphStyle}>
          Hay dos momentos de máxima oferta y dos de máxima demanda. No
          coinciden, y esa es la clave para entender el mercado.
        </p>

        <div style={timelineStyle}>
          <TimelineRow
            month="Ene–Feb"
            tag="Pico de oferta"
            icon="📦"
            title="El mejor momento para vender"
            text="Las marcas lanzan modelos nuevos entre octubre y enero. El jugador que ya tiene el set nuevo quiere liquidar el anterior antes de que pierda más valor."
            variant="sell"
          />

          <TimelineRow
            month="Mar–Abr"
            tag="Pico de demanda"
            icon="⛳"
            title="El mejor momento para comprar"
            text="La temporada arranca con fuerza en primavera. Los campos se llenan y los compradores deciden."
            variant="buy"
          />

          <TimelineRow
            month="Jul–Ago"
            tag="Mercado parado"
            icon="☀️"
            title="Mes muerto para transacciones"
            text="El calor y las vacaciones reducen la actividad. Buen momento para preparar fotos, medidas y descripción."
            variant="dead"
          />

          <TimelineRow
            month="Sept"
            tag="Segundo pico"
            icon="🔄"
            title="Segundo momento de renovación"
            text="Tras el verano, muchos jugadores ya saben qué les falta para mejorar su set."
            variant="buy"
          />

          <TimelineRow
            month="Oct–Dic"
            tag="Lanzamientos"
            icon="🆕"
            title="Las marcas presentan novedades"
            text="TaylorMade, Callaway y Titleist empiezan a mover el mercado antes de la siguiente temporada."
            variant="neutral"
          />
        </div>

        <div style={legendStyle}>
          <span style={legendItemStyle}>
            <span style={{ ...legendDotStyle, background: "#c9b896" }} />
            Mejor para vender
          </span>

          <span style={legendItemStyle}>
            <span style={{ ...legendDotStyle, background: "#5a6e52" }} />
            Mejor para comprar
          </span>

          <span style={legendItemStyle}>
            <span style={{ ...legendDotStyle, background: "#aaa" }} />
            Mercado parado
          </span>
        </div>

        <blockquote style={quoteStyle}>
          “El jugador que acaba de recibir su{" "}
          <span style={quoteAccentStyle}>set nuevo</span> es, sin saberlo, tu
          mejor vendedor de enero.”
        </blockquote>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 2</span>
          Por qué los lanzamientos mueven el mercado
        </h2>

        <p style={paragraphStyle}>
          En la mayoría de deportes, el equipamiento se renueva por desgaste. En
          golf, se renueva por tecnología. Cuando una marca presenta un nuevo
          driver, nuevos hierros o una mejora de rendimiento, muchos jugadores
          cambian de set antes de que el anterior esté realmente desgastado.
        </p>

        <p style={paragraphStyle}>
          Eso hace que enero y febrero sean meses especialmente interesantes:
          entran al mercado palos premium usados, pero todavía en muy buen
          estado.
        </p>

        <div style={brandGridStyle}>
          <BrandCard
            brand="TaylorMade"
            text="Drivers, maderas e hierros con lanzamientos muy esperados cada temporada."
          />
          <BrandCard
            brand="Callaway"
            text="Modelos con fuerte rotación entre jugadores que buscan distancia y perdón."
          />
          <BrandCard
            brand="Titleist"
            text="Ciclos más largos, pero con alto valor de reventa en sets bien cuidados."
          />
        </div>

        <Callout
          icon="💡"
          title="Si vendes en ATHMOV"
          text="Si has comprado un set nuevo entre octubre y enero, tu set anterior está en uno de los momentos de mayor valor del año."
          variant="sand"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 3</span>
          Lo que esto significa si vas a vender
        </h2>

        <p style={paragraphStyle}>
          Vender en el momento correcto no es solo una cuestión de precio.
          También importa cuánta competencia tiene tu anuncio y cuánta intención
          real de compra existe.
        </p>

        <div style={checklistStyle}>
          <ChecklistItem
            number="1"
            title="Publica en cuanto recibas tu set nuevo"
            text="No esperes a primavera. Entre enero y marzo tu set puede perder atractivo si aparece mucha oferta similar."
          />
          <ChecklistItem
            number="2"
            title="Si vendes en verano, prepara el anuncio"
            text="Julio y agosto no suelen ser los mejores meses para cerrar ventas, pero sí para preparar fotos y descripción."
          />
          <ChecklistItem
            number="3"
            title="Los sets completos se mueven mejor en primavera"
            text="Un comprador que empieza temporada suele preferir un set completo y coherente."
          />
          <ChecklistItem
            number="4"
            title="La verificación aumenta confianza"
            text="Incluye fotos claras, estado real, seriales y detalles de desgaste."
          />
        </div>

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Sección 4</span>
          Lo que esto significa si vas a comprar
        </h2>

        <p style={paragraphStyle}>
          Si quieres encontrar buen equipamiento al mejor precio, compra cuando
          otros venden, no cuando todo el mundo compra. Enero y febrero suelen
          ser meses muy interesantes porque hay más oferta y menos presión.
        </p>

        <Callout
          icon="⛳"
          title="El timing ideal de un comprador inteligente"
          text="Empieza a mirar en enero. Si encuentras lo que buscas, tendrás tu equipo listo antes del pico de demanda de primavera."
          variant="moss"
        />

        <h2 style={sectionTitleStyle}>
          <span style={sectionNumberStyle}>Resumen</span>
          El calendario en una frase
        </h2>

        <p style={paragraphStyle}>
          En golf, la oferta llega antes que la demanda. Los lanzamientos de
          invierno generan inventario en enero, y la temporada de primavera
          genera compradores en marzo y abril. Quien entiende ese desfase compra
          mejor y vende más rápido.
        </p>

        <section style={ctaStyle}>
          <p style={ctaEyebrowStyle}>ATHMOV · GOLF</p>

          <h3 style={ctaTitleStyle}>
            ¿Tienes un set que ya
            <br />
            no usas al máximo?
          </h3>

          <p style={ctaTextStyle}>
            Publica tu equipamiento de golf en ATHMOV y llega a compradores que
            buscan material premium de segunda mano.
          </p>

          <a href="/sell" style={ctaButtonStyle}>
            Publicar en ATHMOV →
          </a>
        </section>
        <RelatedArticles
  articles={[
    {
      category: "GOLF · AUTENTICIDAD",
      title: "Cómo verificar unos palos de golf originales",
      href: "/blog/como-verificar-palos-golf-originales",
    },
    {
      category: "GOLF · MERCADO",
      title: "Cómo calcular el precio de palos de golf de segunda mano",
      href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
    },
  ]}
/>
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