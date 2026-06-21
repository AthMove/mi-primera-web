"use client";

import Link from "next/link";

export default function BuyerGuidePage() {
  const sports = [
    {
      name: "Pádel",
      title: "Pala auténtica",
      intro: "4 cosas que debes comprobar antes de comprar.",
      theme: "light",
      tips: [
        [
          "Holograma o QR oficial",
          "Bullpadel, Nox y Head suelen incluir holograma o QR verificable. Pide una foto clara y compruébalo antes de pagar.",
        ],
        [
          "Peso entre 350 y 390 g",
          "Pide pesar la pala. Las réplicas suelen tener un peso o balance extraño.",
        ],
        [
          "Serigrafía y acabados",
          "Compara logos, colores y bordes con fotos oficiales del modelo.",
        ],
        [
          "Número de serie",
          "Busca el número en el marco y pide una foto cercana.",
        ],
      ],
      buyerTip:
        "Pídele siempre al vendedor fotos del QR, del marco y del recibo original de compra.",
    },
    {
      name: "Tenis",
      title: "Raqueta original",
      intro: "4 cosas que debes comprobar antes de comprar.",
      theme: "light",
      tips: [
        [
          "Código en el mástil",
          "Wilson, Babolat y Head suelen incluir códigos o referencias visibles en el mástil.",
        ],
        [
          "Sonido del marco",
          "Si puedes probarla, el grafito de calidad suele sonar seco y definido.",
        ],
        [
          "Medidas oficiales",
          "Longitud, marco y cabeza deben coincidir con la ficha técnica de la marca.",
        ],
        [
          "Grip y encordado",
          "Revisa marcas, tensión y estado general del grip y las cuerdas.",
        ],
      ],
      buyerTip:
        "Antes de cerrar el trato, solicita un vídeo mostrando el código del mástil en cámara.",
    },
    {
      name: "Golf",
      title: "Palos genuinos",
      intro: "4 cosas que debes comprobar antes de comprar.",
      theme: "dark",
      tips: [
        [
          "Serial en el hosel",
          "Callaway, TaylorMade y Titleist suelen grabar números de serie en el hosel.",
        ],
        [
          "Soldaduras y cromado",
          "Acabados irregulares, cromado desigual o textura rara pueden ser señal de réplica.",
        ],
        [
          "Loft y lie",
          "Una tienda de golf puede ayudarte a medirlos y compararlos con especificaciones oficiales.",
        ],
        [
          "Shaft con marcaje",
          "Marca, flex y características deben estar claramente impresas.",
        ],
      ],
      buyerTip:
        "Ante la duda, paga en mano y llévalo a revisar antes de aceptar la compra.",
    },
  ];

  return (
    <main style={pageStyle} className="buyer-guide-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>GUÍA DEL COMPRADOR ATHMOV · BETA</p>

        <h1 style={titleStyle} className="buyer-guide-title">
          Infórmate antes
          <br />
          de <em style={mutedItalicStyle}>comprar.</em>
        </h1>

        <p style={heroTextStyle}>
          Una guía educativa para ayudarte a comprar material deportivo premium
          de segunda mano con más criterio. Estamos en beta y trabajamos para
          que pronto podamos verificarlo nosotros por ti.
        </p>

        <div style={chipsStyle}>
          <span style={chipStyle}>Pádel</span>
          <span style={chipStyle}>Tenis</span>
          <span style={chipStyle}>Golf</span>
          <span style={betaChipStyle}>Guía beta</span>
        </div>
      </section>

      {sports.map((sport) => {
        const isDark = sport.theme === "dark";

        return (
          <section
            key={sport.name}
            style={{
              ...sportSectionStyle,
              ...(isDark ? darkSectionStyle : lightSectionStyle),
            }}
          >
            <p style={isDark ? eyebrowLightStyle : eyebrowStyle}>
              {sport.name}
            </p>

            <h2
              style={{
                ...sectionTitleStyle,
                color: isDark ? "#fff" : "#111",
              }}
            >
              {sport.title}
            </h2>

            <p
              style={{
                ...sectionIntroStyle,
                color: isDark ? "rgba(255,255,255,0.55)" : "#666",
              }}
            >
              {sport.intro}
            </p>

            <div style={cardsStyle}>
              {sport.tips.map(([tipTitle, text], index) => (
                <article
                  key={tipTitle}
                  style={{
                    ...cardStyle,
                    ...(isDark ? darkCardStyle : {}),
                  }}
                >
                  <span
                    style={{
                      ...numberStyle,
                      color: isDark
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(0,0,0,0.16)",
                    }}
                  >
                    {index + 1}
                  </span>

                  <h3
                    style={{
                      ...cardTitleStyle,
                      color: isDark ? "#fff" : "#111",
                    }}
                  >
                    {tipTitle}
                  </h3>

                  <p
                    style={{
                      ...cardTextStyle,
                      color: isDark ? "rgba(255,255,255,0.48)" : "#666",
                    }}
                  >
                    {text}
                  </p>
                </article>
              ))}
            </div>

            <div
              style={{
                ...tipBarStyle,
                ...(isDark ? darkTipBarStyle : {}),
              }}
            >
              <span>💡</span>
              <span>{sport.buyerTip}</span>
            </div>
          </section>
        );
      })}

      <section style={checklistStyle}>
        <p style={eyebrowLightStyle}>CHECKLIST BETA</p>

        <h2 style={checklistTitleStyle}>Compra con criterio.</h2>

        <p style={checklistTextStyle}>
          Antes de comprar cualquier pieza premium de segunda mano, sigue estos
          3 pasos básicos.
        </p>

        <div style={rulesStyle}>
          <div style={ruleStyle}>
            <span style={ruleIconStyle}>🔍</span>
            <div>
              <strong>Pide fotos del QR o serial</strong>
              <p>Hazlo antes de cerrar cualquier acuerdo con el vendedor.</p>
            </div>
          </div>

          <div style={ruleStyle}>
            <span style={ruleIconStyle}>📋</span>
            <div>
              <strong>Contrasta con el catálogo oficial</strong>
              <p>Peso, medidas, colores y acabados deben coincidir.</p>
            </div>
          </div>

          <div style={ruleStyle}>
            <span style={ruleIconStyle}>🧾</span>
            <div>
              <strong>Solicita factura o ticket original</strong>
              <p>Un vendedor serio normalmente podrá enseñarlo.</p>
            </div>
          </div>
        </div>

        <p style={betaTextStyle}>
          ATHMOV está en beta. Esta guía no sustituye una verificación técnica
          profesional, pero te ayuda a comprar mejor mientras construimos ese
          servicio.
        </p>

        <div style={buttonsStyle}>
          <Link href="/products" style={primaryButtonStyle}>
            Explorar ATHMOV
          </Link>

          <Link href="/how-it-works" style={secondaryButtonStyle}>
            Cómo funciona
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .buyer-guide-page {
            padding: 120px 18px 40px !important;
          }

          .buyer-guide-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
  textTransform: "uppercase" as const,
};

const eyebrowLightStyle = {
  ...eyebrowStyle,
  color: "rgba(255,255,255,0.55)",
  opacity: 1,
};

const titleStyle = {
  fontSize: "82px",
  lineHeight: 0.95,
  letterSpacing: "-5px",
  margin: 0,
};

const mutedItalicStyle = {
  fontStyle: "italic",
  opacity: 0.35,
};

const heroTextStyle = {
  maxWidth: "620px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "28px",
};

const chipsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "32px",
};

const chipStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const betaChipStyle = {
  ...chipStyle,
  background: "#111",
  color: "#fff",
};

const sportSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 70px",
  borderRadius: "44px",
  padding: "46px",
};

const lightSectionStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.04)",
};

const darkSectionStyle = {
  background: "#111",
  color: "#fff",
};

const sectionTitleStyle = {
  fontSize: "52px",
  lineHeight: 1,
  letterSpacing: "-3px",
  margin: 0,
};

const sectionIntroStyle = {
  marginTop: "14px",
  marginBottom: "28px",
  fontSize: "16px",
};

const cardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "rgba(0,0,0,0.025)",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: "26px",
  padding: "24px",
};

const darkCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const numberStyle = {
  fontSize: "34px",
  fontWeight: 900,
};

const cardTitleStyle = {
  fontSize: "20px",
  marginTop: "18px",
  marginBottom: "10px",
};

const cardTextStyle = {
  lineHeight: 1.7,
  fontSize: "14px",
};

const tipBarStyle = {
  marginTop: "22px",
  borderRadius: "22px",
  padding: "18px",
  background: "rgba(0,0,0,0.03)",
  border: "1px solid rgba(0,0,0,0.07)",
  display: "flex",
  gap: "12px",
  color: "#555",
  lineHeight: 1.6,
};

const darkTipBarStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.55)",
};

const checklistStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const checklistTitleStyle = {
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
  margin: 0,
};

const checklistTextStyle = {
  color: "rgba(255,255,255,0.62)",
  fontSize: "17px",
  lineHeight: 1.7,
  maxWidth: "620px",
  marginTop: "18px",
};

const rulesStyle = {
  display: "grid",
  gap: "14px",
  marginTop: "32px",
};

const ruleStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  padding: "18px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const ruleIconStyle = {
  fontSize: "24px",
};

const betaTextStyle = {
  color: "rgba(255,255,255,0.42)",
  lineHeight: 1.7,
  marginTop: "28px",
};

const buttonsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
  marginTop: "30px",
};

const primaryButtonStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryButtonStyle = {
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};