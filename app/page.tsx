"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const [newDrops, setNewDrops] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);

  useEffect(() => {
    loadHome();
  }, []);

  const loadHome = async () => {
    const { data: drops } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);

    const { data: sold } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", true)
      .order("created_at", { ascending: false })
      .limit(4);

    setNewDrops(drops || []);
    setSoldProducts(sold || []);
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const categories = [
    {
      title: "PÁDEL",
      text: "Palas y material premium",
     href: "/products?category=PADEL",
      image: "/padel.jpg",
    },
    {
      title: "GOLF",
      text: "Palos, bolsas y accesorios",
      href: "/products?category=GOLF",
      image: "/golf.jpg",
    },
    {
      title: "TENIS",
      text: "Raquetas y piezas de alto rendimiento",
      href: "/products?category=TENIS",
      image: "/tennis.jpg",
    },
    {
      title: "RUNNING",
      text: "Calzado técnico y ropa deportiva",
      href: "/products?category=RUNNING",
      image: "/running.jpg",
    },
  ];

  const popularBrands = [
  "TaylorMade",
  "Callaway",
  "Ping",
  "Titleist",
  "Bullpadel",
  "Nox",
  "Nike",
  "ASICS",
];

  return (
    <main style={pageStyle} className="home-page">
     <section style={heroStyle} className="hero-section">
  <div style={heroBackgroundStyle}>
    <Image
      src="/hero-premium.jpg"
      alt="ATHMOV premium sports marketplace"
      fill
      priority
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
    <div style={heroOverlayStyle} />
  </div>

  <div style={heroContentStyle}>
    <p style={eyebrowStyle}>ATHMOV PREMIUM SECOND HAND</p>

    <h1 style={heroTitleStyle} className="hero-title">
      Segunda mano.
      <br />
      Primera clase.
    </h1>

    <p style={heroTextStyle}>
      Compra y vende material deportivo premium de segunda mano con vendedores
      verificados, pagos seguros y protección al comprador.
    </p>

<div style={heroTrustBadgesStyle}>
  <span
    style={{
      padding: "12px 20px",
      borderRadius: "999px",
      background: "rgba(255,255,255,.10)",
      border: "1px solid rgba(255,255,255,.12)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 800,
    }}
  >
    ✓ Pagos seguros
  </span>

  <span
    style={{
      padding: "12px 20px",
      borderRadius: "999px",
      background: "rgba(255,255,255,.10)",
      border: "1px solid rgba(255,255,255,.12)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 800,
    }}
  >
    ✓ Vendedores verificados
  </span>

  <span
    style={{
      padding: "12px 20px",
      borderRadius: "999px",
      background: "rgba(255,255,255,.10)",
      border: "1px solid rgba(255,255,255,.12)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 800,
    }}
  >
    ✓ Protección al comprador
  </span>
</div>

    <div style={heroActionsStyle}>
    <button onClick={() => router.push("/products")} style={heroPrimaryButtonStyle}>
  Explorar marketplace
</button>

<button onClick={() => router.push("/sell")} style={heroSecondaryButtonStyle}>
  Empezar a vender
</button>
    </div>
  </div>
</section>

<section style={editorialSectionStyle}>
  <div>
    <p style={eyebrowStyle}>ATHMOV EXPERIENCE</p>

    <h2 style={editorialTitleStyle}>
      Equipamiento premium que merece seguir compitiendo.
    </h2>

    <p style={editorialTextStyle}>
      Seleccionamos material deportivo de segunda mano con foco en calidad,
      confianza y protección al comprador.
    </p>
  </div>

  <div style={editorialGridStyle}>
    <div>✓ Vendedores verificados</div>
    <div>✓ Pagos seguros</div>
    <div>✓ Protección al comprador</div>
    <div>✓ Material premium</div>
  </div>
</section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>{t.latest}</p>
<h2 style={sectionTitleStyle}>{t.news}</h2>
          </div>

          <button onClick={() => router.push("/feed")} style={smallButtonStyle}>
            {t.viewFeed}
          </button>
        </div>

        <div style={gridStyle}>
          {newDrops.map((product) => (
            <article
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}
              style={cardStyle}
              className="home-card"
            >
            <div style={cardImageStyle}>
  <span style={featuredBadgeStyle}>
    {product.featured ? "⭐ DESTACADO" : "🔥 NUEVO"}
  </span>

  <button
    style={favoriteButtonStyle}
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    ♡
  </button>
<Image
  src={safeImage(product.image)}
  alt={product.title || "Producto"}
  fill
  sizes="33vw"
  className="card-img"
style={{
  objectFit: "contain",
  padding: "30px",
}}
/>
</div>

  <div style={cardContentStyle}>

  <p style={brandStyle}>{product.brand || "ATHMOV"}</p>

  <h3 style={cardTitleStyle}>{product.title}</h3>

  <p style={priceStyle}>€{product.price}</p>

  <div style={productFooterStyle}>
    <span>{product.location || "España"}</span>
    <span>•</span>
    <span>{product.condition || "Muy buen estado"}</span>
  </div>
</div>
            </article>
          ))}
        </div>
      </section>

      <section style={darkSectionStyle}>
        <p style={eyebrowLightStyle}>{t.whyAthmov}</p>

        <h2 style={darkTitleStyle}>
          {t.whyTitle}
        </h2>

        <div style={trustGridStyle}>
          <div>
            <h3 style={trustTitleStyle}>{t.why1Title}</h3>
            <p style={trustTextStyle}>
              {t.why1Text}
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>{t.why2Title}</h3>
            <p style={trustTextStyle}>
              {t.why2Text}
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>{t.why3Title}</h3>
            <p style={trustTextStyle}>
              {t.why3Text}
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>{t.categories}</p>
<h2 style={sectionTitleStyle}>{t.exploreSports}</h2>
          </div>
        </div>

        <div style={gridStyle}>
          {categories.map((category) => (
            <article
              key={category.title}
              onClick={() => router.push(category.href)}
              style={categoryCardStyle}
              className="home-card"
            >
              <div style={cardImageStyle}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="33vw"
                  className="card-img"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={cardContentStyle}>
                <p style={brandStyle}>DEPORTE</p>
                <h3 style={cardTitleStyle}>{category.title}</h3>
                <p style={categoryTextStyle}>{category.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
  <div style={sectionHeaderStyle}>
    <div>
     <p style={eyebrowStyle}>{t.brands}</p>
<h2 style={sectionTitleStyle}>{t.popularBrands}</h2>
    </div>

    <button onClick={() => router.push("/products")} style={smallButtonStyle}>
      {t.viewAll}
    </button>
  </div>

  <div style={brandGridHomeStyle}>
    {popularBrands.map((brand) => (
      <button
        key={brand}
        onClick={() => router.push(`/products?brand=${encodeURIComponent(brand)}`)}
        style={brandHomeCardStyle}
        className="brand-home-card"
      >
        {brand}
      </button>
    ))}
  </div>
</section>

          {soldProducts.length > 0 && (
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>{t.marketActivity}</p>
<h2 style={sectionTitleStyle}>{t.soldRecently}</h2>
            </div>
          </div>

          <div style={soldGridStyle}>
            {soldProducts.map((product) => (
              <article key={product.id} style={soldCardStyle}>
                <div style={soldImageStyle}>
                  <Image
                    src={safeImage(product.image)}
                    alt={product.title || "Producto vendido"}
                    fill
                    sizes="25vw"
                    style={{ objectFit: "cover" }}
                  />

                  <span style={soldBadgeStyle}>VENDIDO</span>
                </div>

                <div style={soldContentStyle}>
                  <p style={brandStyle}>{product.brand}</p>
                  <h3 style={soldTitleStyle}>{product.title}</h3>
                  <p style={soldPriceStyle}>€{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* BLOG ATHMOV */}
      <section style={sectionStyle}>
  <div style={sectionHeaderStyle}>
    <div>
      <p style={eyebrowStyle}>{t.blogEyebrow}</p>
<h2 style={sectionTitleStyle}>{t.blogTitle}</h2>
    </div>

    <button
      onClick={() => router.push("/blog")}
      style={smallButtonStyle}
    >
      {t.viewBlog}
    </button>
  </div>

  <div style={gridStyle}>
    <article
      onClick={() =>
        router.push(
          "/blog/cuando-comprar-vender-palos-golf-segunda-mano"
        )
      }
      style={cardStyle}
      className="home-card"
    >
      <div style={cardContentStyle}>
        <p style={brandStyle}>GOLF · MERCADO</p>

        <h3 style={cardTitleStyle}>
          Cuándo comprar y vender palos de golf de segunda mano
        </h3>

        <p style={categoryTextStyle}>
          El calendario clave para compradores y vendedores de golf premium.
        </p>
      </div>
    </article>
  </div>
</section>

<section style={sellerCtaStyle}>
        <h2 style={ctaTitleStyle}>{t.readyTitle}</h2>
        <p style={ctaTextStyle}>
          {t.readyText}
        </p>

        <button onClick={() => router.push("/sell")} style={heroPrimaryButtonStyle}>
          {t.startSelling}
        </button>
      </section>

      <footer style={footerStyle}>
        <div style={footerGridStyle}>
          <div>
            <div style={footerBrandStyle}>
  ATHMOV
</div>

            <p style={footerTextStyle}>
  {t.footerDescription}
</p>

<a href="mailto:contact@athmov.com" style={footerEmailStyle}>
  contact@athmov.com
</a>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>{t.marketplace}</p>

            <button onClick={() => router.push("/products")} style={footerLinkStyle}>
             {t.buy}
            </button>

            <button onClick={() => router.push("/sell")} style={footerLinkStyle}>
              {t.sell}
            </button>

            <button onClick={() => router.push("/blog")} style={footerLinkStyle}>
  Blog
</button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>{t.support}</p>

            <button onClick={() => router.push("/how-it-works")} style={footerLinkStyle}>
              {t.howWorks}
            </button>

            <button onClick={() => router.push("/buyer-guide")} style={footerLinkStyle}>
              {t.buyerGuide}
            </button>

            <button style={footerLinkStyle}>{t.buyerProtection}</button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>Categorías</p>

            <button onClick={() => router.push("/products?category=PADEL")} style={footerLinkStyle}>
              PADEL
            </button>

            <button onClick={() => router.push("/products?category=GOLF")} style={footerLinkStyle}>
              GOLF
            </button>

            <button onClick={() => router.push("/products?category=TENIS")} style={footerLinkStyle}>
              TENIS
            </button>

            <button onClick={() => router.push("/products?category=RUNNING")} style={footerLinkStyle}>
              RUNNING
            </button>
          </div>
        </div>

       <div style={footerBottomStyle}>
  {t.rights} · Contacto: contact@athmov.com
</div>
      </footer>

      <style>{`
        .home-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }

        .home-card::after{
    content:"";
    position:absolute;
    inset:0;

    background:
      linear-gradient(
        125deg,
        transparent 25%,
        rgba(255,255,255,.35) 50%,
        transparent 75%
      );

    transform:translateX(-130%);
    transition:.9s;
}

.home-card:hover::after{
    transform:translateX(130%);
}

.home-card:hover{
    transform: translateY(-16px) scale(1.015);

    box-shadow:
        0 70px 180px rgba(0,0,0,.16);

    border-color: rgba(255,255,255,.9);
}

        .card-img,
        .hero-img {
          transition: transform 0.55s ease;
        }

        .home-card:hover .card-img,
        .hero-image:hover .hero-img {
          transform: scale(1.05);
        }

        .brand-home-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.brand-home-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 26px 80px rgba(0,0,0,0.09) !important;
}

button{
transition:.28s;
}

button:hover{
transform:translateY(-2px);
}

.athmov-navbar a{
transition:.25s;
}

.athmov-navbar a:hover{
opacity:.72;
}

        @media (max-width: 1100px) {
          .hero-section {
            grid-template-columns: 1fr !important;
          }

          .hero-title {
            font-size: 58px !important;
          }

          .trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 700px) {
          .home-page {
            padding-top: 110px !important;
          }

          .hero-title {
            font-size: 44px !important;
            letter-spacing: -2px !important;
          }

          .trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const brandGridHomeStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: "16px",
};

const brandHomeCardStyle = {
  height: "92px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  fontSize: "18px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 18px 60px rgba(0,0,0,0.04)",
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  position: "relative" as const,
  minHeight: "86vh",

  borderRadius: "52px",

  overflow: "hidden",

  display: "flex",

  alignItems: "center",

  justifyContent: "space-between",

  padding: "80px",

  marginBottom: "110px",

  background: `
linear-gradient(
135deg,
#0b0b0b 0%,
#141414 45%,
#1d1d1d 100%)
`,

  boxShadow: "0 60px 160px rgba(0,0,0,.30)",

  border: "1px solid rgba(255,255,255,.06)",
};

const heroBackgroundStyle = {
  position: "absolute" as const,
  inset: 0,
  zIndex: 0,
};

const heroOverlayStyle = {
  position: "absolute" as const,
  inset: 0,

  background: `
radial-gradient(
circle at top right,
rgba(255,255,255,.12),
transparent 35%
),

radial-gradient(
circle at bottom left,
rgba(201,175,92,.08),
transparent 45%
),

linear-gradient(
90deg,
rgba(0,0,0,.72) 0%,
rgba(0,0,0,.42) 42%,
rgba(0,0,0,.10) 75%,
transparent 100%
)
`,

  zIndex: 1,
};

const heroContentStyle = {
  position: "relative" as const,
  zIndex: 2,
  maxWidth: "760px",
  padding: "40px 70px",
  marginLeft: "70px",
  marginBottom: "0",
  color: "#fff",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  height: "100%",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const heroTitleStyle = {
  fontSize: "128px",
  color: "#fff",

  lineHeight: 0.88,

  margin: 0,

  letterSpacing: "-8px",

  fontWeight: 950,

  maxWidth: "560px",

  textShadow: "0 15px 40px rgba(0,0,0,.30)",
};

const heroTextStyle = {
  marginTop: "34px",
 color: "rgba(255,255,255,0.92)",
  fontSize: "22px",
  lineHeight: 1.65,
  fontWeight: 700,
  maxWidth: "620px",
  textShadow: "0 8px 24px rgba(0,0,0,.25)",
};

const heroActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "18px",
  marginTop: "44px",
};

const heroPrimaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 34px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "15px",
  boxShadow: "0 14px 40px rgba(0,0,0,.18)",
  transition: "all .25s ease",
};

const heroSecondaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 34px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,.18)",
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "15px",
  backdropFilter: "blur(10px)",
  transition: "all .25s ease",
};

const heroImageStyle = {
  position: "relative" as const,
  height: "560px",
  borderRadius: "44px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 50px 150px rgba(0,0,0,0.16)",
};

const heroBadgeStyle = {
  position: "absolute" as const,
  left: "24px",
  bottom: "24px",
  background: "#fff",
  borderRadius: "999px",
  padding: "13px 18px",
  fontSize: "12px",
  fontWeight: 900,
};

const trustSectionStyle = {
  maxWidth: "1400px",
  margin: "40px auto 80px",
  padding: "0 60px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const trustCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const trustCardTitleStyle = {
  fontSize: "18px",
  fontWeight: 800,
  marginBottom: "12px",
};

const trustCardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};

const sectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "70px 60px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  marginBottom: "34px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  margin: 0,
  letterSpacing: "-2px",
};

const smallButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "13px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
gap: "42px",
};

const cardStyle = {
  background: "rgba(255,255,255,.82)",
  backdropFilter: "blur(22px)",

  borderRadius: "36px",

  overflow: "hidden",

  cursor: "pointer",

  border: "1px solid rgba(255,255,255,.55)",

  boxShadow:
    "0 35px 120px rgba(0,0,0,.08)",

  transition: "all .45s ease",

  position: "relative" as const,
};

const categoryCardStyle = {
  ...cardStyle,
};

const cardImageStyle = {
  position: "relative" as const,
  height: "440px",
  background: "#fafaf7",
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "40px 34px",
};

const brandStyle = {
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "3px",
  opacity: .60,
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  fontSize: "42px",
  fontWeight: 950,
  lineHeight: 1.02,
  marginTop: "14px",
  marginBottom: "22px",
  letterSpacing: "-2.5px",
  color: "#111",
};

const priceStyle = {
  fontSize: "52px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginTop: "18px",
  marginBottom: "18px",
  color: "#111",
};

const categoryTextStyle = {
  color: "#666",
};

const darkSectionStyle = {
  maxWidth: "1280px",
  margin: "40px auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const eyebrowLightStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.55,
};

const darkTitleStyle = {
  fontSize: "52px",
  lineHeight: 1.05,
  letterSpacing: "-3px",
  maxWidth: "760px",
};

const trustGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "28px",
  marginTop: "38px",
};

const trustTitleStyle = {
  fontSize: "22px",
};

const trustTextStyle = {
  color: "rgba(255,255,255,0.68)",
  lineHeight: 1.7,
};

const soldGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "24px",
};

const soldCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
};

const soldImageStyle = {
  position: "relative" as const,
  height: "230px",
};

const soldBadgeStyle = {
  position: "absolute" as const,
  top: "14px",
  right: "14px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "10px",
  fontWeight: 900,
};

const soldContentStyle = {
  padding: "20px",
};

const soldTitleStyle = {
  fontSize: "22px",
  marginTop: "10px",
};

const soldPriceStyle = {
  fontSize: "24px",
  fontWeight: 900,
};

const sellerCtaStyle = {
  maxWidth: "1280px",
  margin: "70px auto 110px",
  background: "linear-gradient(135deg,#111 0%,#1d1d1d 100%)",
  color: "#fff",
  borderRadius: "44px",
  padding: "80px 60px",
  textAlign: "center" as const,
  boxShadow: "0 40px 120px rgba(0,0,0,.18)",
};

const ctaTitleStyle = {
  fontSize: "64px",
  letterSpacing: "-3px",
  margin: 0,
};

const ctaTextStyle = {
  color: "rgba(255,255,255,.70)",
  marginTop: "18px",
  marginBottom: "34px",
  fontSize: "18px",
};

const footerStyle = {
  marginTop: "140px",
  background:
"linear-gradient(180deg,#111 0%,#080808 100%)",
  color: "#fff",
  padding: "120px 80px 60px",
  borderTopLeftRadius: "42px",
  borderTopRightRadius: "42px",
};

const footerGridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "70px",
};

const footerColumnStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const footerLogoStyle = {
  fontSize: "42px",
  fontWeight: 900,
  letterSpacing: "-2px",
  marginBottom: "24px",
};

const footerTitleStyle = {
  color: "#fff",
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  marginBottom: "20px",
};

const footerTextStyle = {
  color: "rgba(255,255,255,.65)",
  fontSize: "16px",
  lineHeight: 1.8,
  maxWidth: "420px",
};

const footerLinkStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  textAlign: "left" as const,
  cursor: "pointer",
  color: "rgba(255,255,255,.58)",
  fontSize: "15px",
  fontWeight: 600,
};

const footerBottomStyle = {
  maxWidth: "1400px",
  margin: "60px auto 0",
  borderTop: "1px solid rgba(255,255,255,.12)",
  paddingTop: "28px",
  color: "rgba(255,255,255,.45)",
  fontSize: "13px",
};

const footerEmailStyle = {
  display: "inline-block",
  marginTop: "22px",
  color: "#fff",
  fontWeight: 900,
  textDecoration: "none",
};

const productMetaStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const conditionBadgeStyle = {
  background: "#f4f4f4",
  color: "#111",
  borderRadius: "999px",
  padding: "6px 12px",
  fontSize: "12px",
  fontWeight: 800,
};

const heroProofStyle = {
  marginTop: "18px",
  color: "#777",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.3px",
};

const productFooterStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginTop: "24px",
  color: "#8a8a8a",
  fontSize: "15px",
  fontWeight: 700,
};

const featuredBadgeStyle = {
  position: "absolute" as const,
  top: "16px",
  left: "16px",
  zIndex: 5,
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "0.5px",
};

const favoriteButtonStyle = {
  position: "absolute" as const,
  top: "22px",
right: "22px",
  zIndex: 5,
 width: "44px",
height: "44px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(12px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "22px",
  cursor: "pointer",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
};

const heroTrustBadgesStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "16px",
  marginTop: "18px",
};

const footerBrandStyle = {
  fontSize: "54px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginBottom: "22px",
};

const editorialSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 40px",
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