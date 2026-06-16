"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  const [newDrops, setNewDrops] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);

  const [lang, setLang] = useState<"es" | "en">("es");

useEffect(() => {
  const savedLang = localStorage.getItem("athmov_lang");
  if (savedLang === "en" || savedLang === "es") {
    setLang(savedLang);
  }
}, []);

const changeLang = (value: "es" | "en") => {
  setLang(value);
  localStorage.setItem("athmov_lang", value);
};

const t = {
  es: {
    eyebrow: "ATHMOV PREMIUM SECOND HAND",
    title1: "Segunda mano.",
    title2: "Primera clase.",
    heroText:
      "Compra y vende material deportivo premium de segunda mano de atletas, vendedores y coleccionistas de confianza.",
    shop: "Comprar",
    drops: "Novedades",
    sell: "Vender",
    badge: "Material premium seleccionado",
    verified: "Vendedores verificados",
    verifiedText:
      "ATHMOV revisa manualmente vendedores premium y coleccionistas deportivos.",
    protection: "Protección al comprador",
    protectionText:
      "Pagos seguros y transacciones protegidas dentro del marketplace.",
    curated: "Marketplace seleccionado",
    curatedText:
      "Solo marcas deportivas premium de pádel, golf, tenis y running.",
    luxury: "Segunda mano premium",
    luxuryText:
      "Material deportivo seleccionado de atletas y coleccionistas de confianza.",
    latest: "ÚLTIMOS",
    newDrops: "Novedades",
    viewFeed: "Ver feed →",
    why: "POR QUÉ ATHMOV",
    darkTitle: "El material deportivo premium merece una segunda vida.",
    curatedMarket: "Marketplace seleccionado",
    curatedMarketText:
      "Un espacio premium para material deportivo de segunda mano de alta calidad.",
    reputation: "Reputación del vendedor",
    reputationText:
      "Reseñas, pedidos, tracking y perfiles de vendedor construyen confianza.",
    athletes: "Creado para atletas",
    athletesText: "Material premium de pádel, golf, tenis y running.",
    categories: "CATEGORÍAS",
    explore: "Explorar deportes",
    sport: "DEPORTE",
    activity: "ACTIVIDAD DEL MERCADO",
    recentlySold: "Vendido recientemente",
    ctaTitle: "¿Listo para vender material premium?",
    ctaText:
      "Publica tu equipamiento deportivo y llega a compradores que buscan piezas de calidad.",
    startSelling: "Empezar a vender",
    footerText:
      "Marketplace premium de segunda mano para atletas, coleccionistas y amantes del deporte.",
    marketplace: "Marketplace",
    support: "Soporte",
    how: "Cómo funciona",
    guide: "Guía del comprador",
    buyerProtection: "Protección al comprador",
  },
  en: {
    eyebrow: "ATHMOV PREMIUM SECOND HAND",
    title1: "Second hand.",
    title2: "First class.",
    heroText:
      "Buy and sell premium second-hand sports gear from trusted athletes, sellers and collectors.",
    shop: "Shop Gear",
    drops: "New Drops",
    sell: "Sell Gear",
    badge: "Curated premium gear",
    verified: "Verified Sellers",
    verifiedText:
      "ATHMOV manually reviews premium sellers and sports collectors.",
    protection: "Buyer Protection",
    protectionText:
      "Secure transactions and protected premium marketplace payments.",
    curated: "Curated Marketplace",
    curatedText:
      "Only premium sports brands across padel, golf, tennis and running.",
    luxury: "Luxury Second Hand",
    luxuryText:
      "Curated performance gear from trusted athletes and collectors.",
    latest: "LATEST",
    newDrops: "New Drops",
    viewFeed: "View feed →",
    why: "WHY ATHMOV",
    darkTitle: "Premium sports gear deserves a second life.",
    curatedMarket: "Curated marketplace",
    curatedMarketText:
      "A premium space for high-quality second-hand sports equipment.",
    reputation: "Seller reputation",
    reputationText:
      "Reviews, orders, tracking and seller profiles build trust.",
    athletes: "Built for athletes",
    athletesText: "Padel, golf, tennis and running premium gear.",
    categories: "CATEGORIES",
    explore: "Explore Sports",
    sport: "SPORT",
    activity: "MARKET ACTIVITY",
    recentlySold: "Recently Sold",
    ctaTitle: "Ready to sell premium gear?",
    ctaText:
      "List your sports equipment and reach buyers looking for quality pieces.",
    startSelling: "Start selling",
    footerText:
      "Premium second-hand marketplace for athletes, collectors and sports enthusiasts.",
    marketplace: "Marketplace",
    support: "Support",
    how: "How it works",
    guide: "Buyer guide",
    buyerProtection: "Buyer protection",
  },
}[lang];

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
      title: "PADEL",
      text: "Premium rackets & gear",
      href: "/products?category=padel",
      image: "/padel.jpg",
    },
    {
      title: "GOLF",
      text: "Clubs, bags & essentials",
      href: "/products?category=golf",
      image: "/golf.jpg",
    },
    {
      title: "TENNIS",
      text: "Rackets & performance pieces",
      href: "/products?category=tennis",
      image: "/tennis.jpg",
    },
    {
      title: "RUNNING",
      text: "Performance footwear & apparel",
      href: "/products?category=running",
      image: "/running.jpg",
    },
  ];

  return (
  <main style={pageStyle} className="home-page">


    <section style={heroStyle} className="hero-section">
        <div>
          <p style={eyebrowStyle}>{t.eyebrow}</p>

<h1 style={heroTitleStyle} className="hero-title">
  {t.title1}
  <br />
  {t.title2}
</h1>

<p style={heroTextStyle}>
  {t.heroText}
</p>

          <button onClick={() => router.push("/products")} style={primaryButtonStyle}>
  {t.shop}
</button>

<button onClick={() => router.push("/feed")} style={secondaryButtonStyle}>
  {t.drops}
</button>

<button onClick={() => router.push("/sell")} style={secondaryButtonStyle}>
  {t.sell}
</button>
          </div>

        <div style={heroImageStyle} className="hero-image">
          <Image
            src="/hero-sports-new.jpg"
            alt="ATHMOV premium sports gear"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 50vw"
            className="hero-img"
            style={{ objectFit: "cover" }}
          />

          <div style={heroBadgeStyle}>{t.badge}</div>
        </div>
      </section>

      <section style={trustSectionStyle} className="trust-grid">
        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Verified Sellers</p>
          <p style={trustCardTextStyle}>
            ATHMOV manually reviews premium sellers and sports collectors.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Buyer Protection</p>
          <p style={trustCardTextStyle}>
            Secure transactions and protected premium marketplace payments.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Curated Marketplace</p>
          <p style={trustCardTextStyle}>
            Only premium sports brands across padel, golf, tennis and running.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Luxury Second Hand</p>
          <p style={trustCardTextStyle}>
            Curated performance gear from trusted athletes and collectors.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>LATEST</p>
            <h2 style={sectionTitleStyle}>New Drops</h2>
          </div>

          <button onClick={() => router.push("/feed")} style={smallButtonStyle}>
            View feed →
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
                <Image
                  src={safeImage(product.image)}
                  alt={product.title || "Product"}
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={darkSectionStyle}>
        <p style={eyebrowLightStyle}>WHY ATHMOV</p>

        <h2 style={darkTitleStyle}>
          Premium sports gear deserves a second life.
        </h2>

        <div style={trustGridStyle}>
          <div>
            <h3 style={trustTitleStyle}>Curated marketplace</h3>
            <p style={trustTextStyle}>
              A premium space for high-quality second-hand sports equipment.
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>Seller reputation</h3>
            <p style={trustTextStyle}>
              Reviews, orders, tracking and seller profiles build trust.
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>Built for athletes</h3>
            <p style={trustTextStyle}>
              Padel, golf, tennis and running premium gear.
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>CATEGORIES</p>
            <h2 style={sectionTitleStyle}>Explore Sports</h2>
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
                <p style={brandStyle}>SPORT</p>
                <h3 style={cardTitleStyle}>{category.title}</h3>
                <p style={categoryTextStyle}>{category.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {soldProducts.length > 0 && (
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>MARKET ACTIVITY</p>
              <h2 style={sectionTitleStyle}>Recently Sold</h2>
            </div>
          </div>

          <div style={soldGridStyle}>
            {soldProducts.map((product) => (
              <article key={product.id} style={soldCardStyle}>
                <div style={soldImageStyle}>
                  <Image
                    src={safeImage(product.image)}
                    alt={product.title || "Sold product"}
                    fill
                    sizes="25vw"
                    style={{ objectFit: "cover" }}
                  />

                  <span style={soldBadgeStyle}>SOLD</span>
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

      <section style={sellerCtaStyle}>
        <h2 style={ctaTitleStyle}>Ready to sell premium gear?</h2>
        <p style={ctaTextStyle}>
          List your sports equipment and reach buyers looking for quality pieces.
        </p>

        <button onClick={() => router.push("/sell")} style={primaryButtonStyle}>
          Start selling
        </button>
      </section>

<footer style={footerStyle}>
  <div style={footerGridStyle}>
    <div>
      <h3 style={footerLogoStyle}>ATHMOV</h3>

      <p style={footerTextStyle}>
        Premium second-hand marketplace for athletes, collectors and sports enthusiasts.
      </p>
    </div>

    <div style={footerColumnStyle}>
      <p style={footerTitleStyle}>Marketplace</p>

      <button onClick={() => router.push("/products")} style={footerLinkStyle}>
        Shop
      </button>

      <button onClick={() => router.push("/sell")} style={footerLinkStyle}>
        Sell
      </button>

      <button onClick={() => router.push("/feed")} style={footerLinkStyle}>
        Feed
      </button>
    </div>

    <div style={footerColumnStyle}>
      <p style={footerTitleStyle}>Support</p>

      <button onClick={() => router.push("/how-it-works")} style={footerLinkStyle}>
        How it works
      </button>

      <button onClick={() => router.push("/buyer-guide")} style={footerLinkStyle}>
        Buyer guide
      </button>

      <button style={footerLinkStyle}>
        Buyer protection
      </button>
    </div>

    <div style={footerColumnStyle}>
      <p style={footerTitleStyle}>Categories</p>

      <button onClick={() => router.push("/products?category=padel")} style={footerLinkStyle}>
        Padel
      </button>

      <button onClick={() => router.push("/products?category=golf")} style={footerLinkStyle}>
        Golf
      </button>

      <button onClick={() => router.push("/products?category=tennis")} style={footerLinkStyle}>
        Tennis
      </button>

      <button onClick={() => router.push("/products?category=running")} style={footerLinkStyle}>
        Running
      </button>
    </div>
  </div>

  <div style={footerBottomStyle}>
    © 2025 ATHMOV. All rights reserved.
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