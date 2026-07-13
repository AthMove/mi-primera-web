"use client";

type EditorialSectionProps = {
  isMobile: boolean;
};

export default function EditorialSection({
  isMobile,
}: EditorialSectionProps) {
  return (
    <section
      className="fade-up"
      data-delay="0"
      style={{
        ...editorialSectionStyle,
        padding: isMobile
          ? "50px 24px"
          : editorialSectionStyle.padding,
        gridTemplateColumns: isMobile
          ? "1fr"
          : editorialSectionStyle.gridTemplateColumns,
        gap: isMobile ? "28px" : editorialSectionStyle.gap,
      }}
    >
      <div>
        <h2
          style={{
            ...editorialTitleStyle,
            fontSize: isMobile
              ? "42px"
              : editorialTitleStyle.fontSize,
            lineHeight: isMobile
              ? 1
              : editorialTitleStyle.lineHeight,
            letterSpacing: isMobile
              ? "-2px"
              : editorialTitleStyle.letterSpacing,
          }}
        >
          Equipamiento premium que merece seguir compitiendo.
        </h2>

        <p
          style={{
            ...editorialTextStyle,
            transition: "opacity .7s ease .25s",
          }}
        >
          Seleccionamos material deportivo de segunda mano con foco en
          calidad, confianza y protección al comprador.
        </p>
      </div>

      <div
        style={{
          ...editorialGridStyle,
          transition: "all .7s ease .35s",
        }}
      >
        <div>✓ Vendedores verificados</div>
        <div>✓ Pagos seguros</div>
        <div>✓ Protección al comprador</div>
        <div>✓ Material premium</div>
      </div>
    </section>
  );
}

const editorialSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 10px",
  padding: "80px 60px",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "60px",
  alignItems: "center",
};

const editorialTitleStyle = {
  fontSize: "72px",
  lineHeight: 0.95,
  letterSpacing: "-4px",
  margin: 0,
  maxWidth: "850px",
};

const editorialTextStyle = {
  marginTop: "26px",
  fontSize: "20px",
  lineHeight: 1.7,
  color: "#666",
  maxWidth: "620px",
};

const editorialGridStyle = {
  display: "grid",
  gap: "14px",
  fontSize: "18px",
  fontWeight: 900,
};