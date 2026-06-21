"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

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

  return (
    <main style={pageStyle} className="home-page">
      <section style={heroStyle} className="hero-section">
        <div>
          <p style={eyebrowStyle}>ATHMOV PREMIUM SECOND HAND</p>

          <h1 style={heroTitleStyle} className="hero-title">
            Segunda mano.
            <br />
            Primera clase.
          </h1>

          <p style={heroTextStyle}>
            Compra y vende material deportivo premium de segunda mano de atletas,
            vendedores y coleccionistas de confianza.
          </p>

          <div style={heroActionsStyle}>
            <button onClick={() => router.push("/products")} style={primaryButtonStyle}>
              Comprar
            </button>

            <button onClick={() => router.push("/feed")} style={secondaryButtonStyle}>
              Novedades
            </button>

            <button onClick={() => router.push("/sell")} style={secondaryButtonStyle}>
              Vender
            </button>
          </div>
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
          <p style={trustCardTitleStyle}>Vendedores verificados</p>
          <p style={trustCardTextStyle}>
            ATHMOV revisa manualmente vendedores premium y coleccionistas deportivos.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Protección al comprador</p>
          <p style={trustCardTextStyle}>
            Pagos seguros y transacciones protegidas dentro del marketplace.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Marketplace seleccionado</p>
          <p style={trustCardTextStyle}>
            Solo marcas deportivas premium de pádel, golf, tenis y running.
          </p>
        </div>

        <div style={trustCardStyle}>
          <p style={trustCardTitleStyle}>Segunda mano premium</p>
          <p style={trustCardTextStyle}>
            Material deportivo seleccionado de atletas y coleccionistas de confianza.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>ÚLTIMOS</p>
            <h2 style={sectionTitleStyle}>Novedades</h2>
          </div>

          <button onClick={() => router.push("/feed")} style={smallButtonStyle}>
            Ver feed →
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={darkSectionStyle}>
        <p style={eyebrowLightStyle}>POR QUÉ ATHMOV</p>

        <h2 style={darkTitleStyle}>
          El material deportivo premium merece una segunda vida.
        </h2>

        <div style={trustGridStyle}>
          <div>
            <h3 style={trustTitleStyle}>Marketplace seleccionado</h3>
            <p style={trustTextStyle}>
              Un espacio premium para material deportivo de segunda mano de alta calidad.
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>Reputación del vendedor</h3>
            <p style={trustTextStyle}>
              Reseñas, pedidos, tracking y perfiles de vendedor ayudan a construir confianza.
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>Creado para atletas</h3>
            <p style={trustTextStyle}>
              Material premium de pádel, golf, tenis y running.
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>CATEGORÍAS</p>
            <h2 style={sectionTitleStyle}>Explorar deportes</h2>
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

      {soldProducts.length > 0 && (
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>ACTIVIDAD DEL MERCADO</p>
              <h2 style={sectionTitleStyle}>Vendido recientemente</h2>
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

      <section style={sellerCtaStyle}>
        <h2 style={ctaTitleStyle}>¿Listo para vender material premium?</h2>
        <p style={ctaTextStyle}>
          Publica tu equipamiento deportivo y llega a compradores que buscan piezas de calidad.
        </p>

        <button onClick={() => router.push("/sell")} style={primaryButtonStyle}>
          Empezar a vender
        </button>
      </section>

      <footer style={footerStyle}>
        <div style={footerGridStyle}>
          <div>
            <h3 style={footerLogoStyle}>ATHMOV</h3>

            <p style={footerTextStyle}>
              Marketplace premium de segunda mano para atletas, coleccionistas y amantes del deporte.
            </p>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>Marketplace</p>

            <button onClick={() => router.push("/products")} style={footerLinkStyle}>
              Comprar
            </button>

            <button onClick={() => router.push("/sell")} style={footerLinkStyle}>
              Vender
            </button>

            <button onClick={() => router.push("/feed")} style={footerLinkStyle}>
              Feed
            </button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>Soporte</p>

            <button onClick={() => router.push("/how-it-works")} style={footerLinkStyle}>
              Cómo funciona
            </button>

            <button onClick={() => router.push("/buyer-guide")} style={footerLinkStyle}>
              Guía del comprador
            </button>

            <button style={footerLinkStyle}>Protección al comprador</button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>Categorías</p>

            <button onClick={() => router.push("/products?category=padel")} style={footerLinkStyle}>
              PADEL
            </button>

            <button onClick={() => router.push("/products?category=golf")} style={footerLinkStyle}>
              GOLF
            </button>

            <button onClick={() => router.push("/products?category=tennis")} style={footerLinkStyle}>
              TENIS
            </button>

            <button onClick={() => router.push("/products?category=running")} style={footerLinkStyle}>
              RUNNING
            </button>
          </div>
        </div>

        <div style={footerBottomStyle}>©️ 2025 ATHMOV. Todos los derechos reservados.</div>
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