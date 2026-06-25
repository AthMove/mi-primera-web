export const metadata = {
  title: "Cómo verificar unos palos de golf originales | ATHMOV",
  description: "Guía para comprobar si unos palos de golf son originales.",

  openGraph: {
    title: "Cómo verificar unos palos de golf originales | ATHMOV",
    description: "Guía para comprobar si unos palos de golf son originales.",
    images: ["/golf.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cómo verificar unos palos de golf originales | ATHMOV",
    description: "Guía para comprobar si unos palos de golf son originales.",
    images: ["/golf.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cómo verificar unos palos de golf originales",
  description:
    "Guía para comprobar si unos palos de golf son originales antes de comprarlos.",
  image: "https://athmov.com/golf.jpg",
  author: {
    "@type": "Organization",
    name: "ATHMOV",
  },
  publisher: {
    "@type": "Organization",
    name: "ATHMOV",
    logo: {
      "@type": "ImageObject",
      url: "https://athmov.com/favicon.png",
    },
  },
};

export default function VerificarPalosGolfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={wrapStyle}>
            <p style={eyebrowStyle}>GUÍA ATHMOV · GOLF</p>

            <h1 style={titleStyle}>
              Cómo verificar unos palos de golf originales
            </h1>

            <p style={subtitleStyle}>
              Aprende a revisar seriales, grabados, varillas y acabados para
              detectar falsificaciones antes de comprar.
            </p>
          </div>
        </section>

        <article style={articleStyle}>
          <p style={leadStyle}>
            Comprar material de golf de segunda mano puede ser una gran
            oportunidad, pero conviene verificar algunos detalles antes de pagar.
            Una revisión rápida puede evitar falsificaciones o compras con
            problemas ocultos.
          </p>

          <h2 style={sectionTitleStyle}>1. Comprueba el número de serie</h2>

          <p style={paragraphStyle}>
            Muchas marcas premium incorporan números de serie grabados en la
            cabeza del palo o en la varilla. Revisa que estén presentes y que el
            grabado tenga calidad y definición.
          </p>

          <h2 style={sectionTitleStyle}>2. Revisa logotipos y grabados</h2>

          <p style={paragraphStyle}>
            Las falsificaciones suelen fallar en pequeños detalles: tipografías,
            profundidad de los grabados, alineación de logotipos o acabados
            imperfectos.
          </p>

          <h2 style={sectionTitleStyle}>3. Verifica la varilla</h2>

          <p style={paragraphStyle}>
            Comprueba que el modelo de shaft coincide con el anunciado. Las
            etiquetas, el flex y las especificaciones deben ser coherentes con el
            palo.
          </p>

          <h2 style={sectionTitleStyle}>4. Analiza el grip</h2>

          <p style={paragraphStyle}>
            Un grip cambiado no significa que el palo sea falso, pero puede
            afectar al valor del conjunto. Conviene saberlo antes de negociar el
            precio.
          </p>

          <h2 style={sectionTitleStyle}>5. Desconfía de precios irreales</h2>

          <p style={paragraphStyle}>
            Si el precio está muy por debajo del mercado, pide más fotografías,
            detalles del vendedor y pruebas adicionales de autenticidad.
          </p>

          <section style={ctaStyle}>
            <h3 style={ctaTitleStyle}>Compra y vende golf con más confianza</h3>

            <p style={ctaTextStyle}>
              Encuentra material de golf premium de segunda mano en ATHMOV.
            </p>

            <a href="/products?category=GOLF" style={buttonStyle}>
              Ver material de golf →
            </a>
          </section>
        </article>
      </main>
    </>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f0",
};

const heroStyle = {
  background: "#111",
  color: "#fff",
  padding: "120px 0 80px",
};

const wrapStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "0 28px",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#c9b896",
  fontWeight: 900,
};

const titleStyle = {
  fontSize: "64px",
  lineHeight: 1,
  marginTop: "18px",
};

const subtitleStyle = {
  fontSize: "18px",
  color: "rgba(255,255,255,0.7)",
  maxWidth: "650px",
};

const articleStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "70px 28px 100px",
};

const leadStyle = {
  fontSize: "22px",
  lineHeight: 1.8,
  marginBottom: "40px",
};

const sectionTitleStyle = {
  fontSize: "34px",
  marginTop: "50px",
  marginBottom: "16px",
};

const paragraphStyle = {
  color: "#555",
  lineHeight: 1.9,
  fontSize: "17px",
};

const ctaStyle = {
  marginTop: "60px",
  background: "#111",
  color: "#fff",
  padding: "40px",
  borderRadius: "28px",
};

const ctaTitleStyle = {
  fontSize: "32px",
};

const ctaTextStyle = {
  color: "rgba(255,255,255,0.7)",
};

const buttonStyle = {
  display: "inline-block",
  marginTop: "20px",
  background: "#fff",
  color: "#111",
  padding: "14px 24px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
};