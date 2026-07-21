"use client";

interface BuyerGuide {
  sport: string;
  title: string;
  tips: string[];
}

interface Props {
  guide: BuyerGuide;
  eyebrow: string;
}

export default function ProductBuyerGuide({
  guide,
  eyebrow,
}: Props) {
  return (
    <section style={buyerGuideStyle}>
      <div style={buyerGuideHeaderStyle}>
        <div>
          <p style={buyerGuideEyebrowStyle}>{eyebrow}</p>
          <h2 style={buyerGuideTitleStyle}>{guide.title}</h2>
        </div>

        <div style={buyerGuideBadgeStyle}>{guide.sport}</div>
      </div>

      <p style={buyerGuideTextStyle}>
        Aprende cómo verificar este producto antes de comprarlo. Recomendamos
        comprobar números de serie, pedir vídeos y comparar detalles con el
        catálogo oficial de la marca.
      </p>

      <div style={buyerGuideCardsStyle}>
        {guide.tips.map((tip, index) => {
          const icons = ["🔍", "🎥", "📋"];

          return (
            <div key={tip} style={buyerGuideCardStyle}>
              <div style={buyerGuideIconStyle}>
                {icons[index] || "✓"}
              </div>

              <div>
                <h4 style={buyerGuideCardTitleStyle}>
                  {index === 0
                    ? "Revisa marcas de autenticidad"
                    : index === 1
                      ? "Pide pruebas adicionales"
                      : "Compara el estado"}
                </h4>

                <p style={buyerGuideCardTextStyle}>{tip}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={buyerGuideFooterStyle}>
        ATHMOV está actualmente en beta. Las herramientas de verificación son
        educativas y están diseñadas para ayudar a los compradores a tomar
        decisiones más seguras.
      </div>
    </section>
  );
}

const buyerGuideStyle = {
  marginTop: "28px",
  maxWidth: "560px",
  background: "#111",
  color: "#fff",
  borderRadius: "28px",
  padding: "26px",
  boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
};

const buyerGuideHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "18px",
  marginBottom: "18px",
};

const buyerGuideEyebrowStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "8px",
};

const buyerGuideTitleStyle = {
  fontSize: "28px",
  lineHeight: 1.05,
  letterSpacing: "-1px",
  margin: 0,
};

const buyerGuideBadgeStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 900,
  whiteSpace: "nowrap" as const,
};

const buyerGuideTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.5,
  fontSize: "13px",
};

const buyerGuideCardsStyle = {
  display: "grid",
  gap: "12px",
  marginTop: "20px",
};

const buyerGuideCardStyle = {
  display: "flex",
  gap: "14px",
  padding: "15px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const buyerGuideIconStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const buyerGuideCardTitleStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#fff",
};

const buyerGuideCardTextStyle = {
  marginTop: "6px",
  marginBottom: 0,
  color: "rgba(255,255,255,0.55)",
  fontSize: "12px",
  lineHeight: 1.6,
};

const buyerGuideFooterStyle = {
  marginTop: "18px",
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.42)",
  fontSize: "12px",
  lineHeight: 1.6,
};