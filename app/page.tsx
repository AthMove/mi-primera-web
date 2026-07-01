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
        <div>
          <p style={eyebrowStyle}>{t.homeEyebrow}</p>

<h1 style={heroTitleStyle} className="hero-title">
  {t.homeTitle1}
  <br />
  {t.homeTitle2}
</h1>

<p style={heroTextStyle}>{t.homeText}</p>

 <div style={heroActionsStyle}>
  <button onClick={() => router.push("/products")} style={primaryButtonStyle}>
   {t.buy}
  </button>

  <button onClick={() => router.push("/sell")} style={secondaryButtonStyle}>
    {t.sell}
  </button>
</div>

<p style={heroProofStyle}>
  {t.homeProof}
</p>
        </div>

        <div style={heroImageStyle} className="hero-image">
          <Image
            src="/hero-sports-new.jpg"
            alt="Material deportivo premium ATHMOV"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 50vw"
            className="hero-img"
            style={{ objectFit: "cover" }}
          />

          <div style={heroBadgeStyle}>Material premium seleccionado</div>
        </div>
      </section>

      <section style={trustSectionStyle} className="trust-grid">
        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>{t.trust1Title}</p>
          <p style={trustCardTextStyle}>
            {t.trust1Text}
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>{t.trust2Title}</p>
          <p style={trustCardTextStyle}>
            {t.trust2Text}
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>{t.trust3Title}</p>
          <p style={trustCardTextStyle}>
            {t.trust3Text}
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>{t.trust4Title}</p>
          <p style={trustCardTextStyle}>
           {t.trust4Text}
          </p>
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
    style={{ objectFit: "cover" }}
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
      <p style={eyebrowStyle}>ATHMOV JOURNAL</p>
      <h2 style={sectionTitleStyle}>
        Guías para comprar y vender mejor
      </h2>
    </div>

    <button
      onClick={() => router.push("/blog")}
      style={smallButtonStyle}
    >
      Ver blog →
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
        <h2 style={ctaTitleStyle}>¿{t.readyTitle}?</h2>
        <p style={ctaTextStyle}>
          {t.readyText}
        </p>

        <button onClick={() => router.push("/sell")} style={primaryButtonStyle}>
          {t.startSelling}
        </button>
      </section>

      <footer style={footerStyle}>
        <div style={footerGridStyle}>
          <div>
            <h3 style={footerLogoStyle}>ATHMOV</h3>

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

        .home-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 34px 100px rgba(0,0,0,0.1) !important;
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
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "70px 60px 40px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const heroTitleStyle = {
  fontSize: "86px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-5px",
};

const heroTextStyle = {
  marginTop: "28px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  maxWidth: "560px",
};

const heroActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
  marginTop: "34px",
};

const primaryButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px 26px",
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "16px 26px",
  fontWeight: 800,
  cursor: "pointer",
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
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "32px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "34px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const categoryCardStyle = {
  ...cardStyle,
};

const cardImageStyle = {
  position: "relative" as const,
  height: "320px",
  background: "#f4f4f1",
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "26px",
};

const brandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  fontSize: "28px",
  marginTop: "10px",
  marginBottom: "12px",
  letterSpacing: "-1px",
};

const priceStyle = {
  fontSize: "28px",
  fontWeight: 900,
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
  margin: "40px auto 90px",
  background: "#fff",
  borderRadius: "44px",
  padding: "54px",
  textAlign: "center" as const,
  boxShadow: "0 30px 100px rgba(0,0,0,0.06)",
};

const ctaTitleStyle = {
  fontSize: "46px",
  letterSpacing: "-2px",
  margin: 0,
};

const ctaTextStyle = {
  color: "#666",
  marginTop: "14px",
  marginBottom: "28px",
};

const footerStyle = {
  borderTop: "1px solid rgba(0,0,0,0.06)",
  padding: "34px",
  textAlign: "center" as const,
  color: "#777",
  fontSize: "13px",
};

const footerGridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "40px",
  paddingBottom: "40px",
};

const footerColumnStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const footerLogoStyle = {
  fontSize: "34px",
  marginBottom: "16px",
  letterSpacing: "-2px",
};

const footerTitleStyle = {
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  marginBottom: "8px",
};

const footerTextStyle = {
  color: "#666",
  lineHeight: 1.7,
  maxWidth: "320px",
};

const footerLinkStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  textAlign: "left" as const,
  cursor: "pointer",
  color: "#555",
  fontSize: "15px",
};

const footerBottomStyle = {
  borderTop: "1px solid rgba(0,0,0,0.06)",
  paddingTop: "24px",
  marginTop: "20px",
  textAlign: "center" as const,
  color: "#777",
  fontSize: "13px",
};

const footerEmailStyle = {
  display: "inline-block",
  marginTop: "14px",
  color: "#111",
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
  fontSize: "11px",
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
  gap: "8px",
  alignItems: "center",
  marginTop: "12px",
  color: "#777",
  fontSize: "13px",
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
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "0.5px",
};

const favoriteButtonStyle = {
  position: "absolute" as const,
  top: "16px",
  right: "16px",
  zIndex: 5,
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.95)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  cursor: "pointer",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
};