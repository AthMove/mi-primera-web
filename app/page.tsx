"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [lang, setLang] = useState<"EN" | "ES">("EN");
  const router = useRouter();

  const t = {
    EN: {
      shop: "SHOP",
      sell: "SELL",
      signIn: "SIGN IN",
      register: "REGISTER",
      heroTag: "Luxury Sports Marketplace",
      heroTitle1: "Second hand.",
      heroTitle2: "First class.",
      heroText:
        "Buy and sell authenticated premium sports equipment from the world’s top brands.",
      shopGear: "Shop Gear",
      sellGear: "Sell Your Gear",
      trustText: "Join thousands of athletes trusting ATHMOV.",
      authenticated: "AUTHENTICATED",
      authenticatedText: "Every item is verified by our experts.",
      quality: "PREMIUM QUALITY",
      qualityText: "Top brands. Excellent condition guaranteed.",
      sustainable: "SUSTAINABLE",
      sustainableText: "Extend gear life. Reduce waste.",
      explore: "Explore Categories",
      featured: "Featured Products",
      curated: "Curated premium gear.",
      rights: "©️ 2025 ATHMOV. All rights reserved.",
    },

    ES: {
      shop: "COMPRAR",
      sell: "VENDER",
      signIn: "ENTRAR",
      register: "REGISTRARSE",
      heroTag: "Marketplace deportivo premium",
      heroTitle1: "Segunda mano.",
      heroTitle2: "Primera clase.",
      heroText:
        "Compra y vende equipamiento deportivo premium autenticado de las mejores marcas.",
      shopGear: "Comprar",
      sellGear: "Vender equipo",
      trustText:
        "Únete a miles de deportistas que confían en ATHMOV.",
      authenticated: "AUTENTICADO",
      authenticatedText:
        "Cada artículo es verificado por nuestros expertos.",
      quality: "CALIDAD PREMIUM",
      qualityText:
        "Mejores marcas. Excelente estado garantizado.",
      sustainable: "SOSTENIBLE",
      sustainableText:
        "Alarga la vida del material. Reduce residuos.",
      explore: "Explorar categorías",
      featured: "Productos destacados",
      curated: "Equipamiento premium seleccionado.",
      rights: "©️ 2025 ATHMOV. Todos los derechos reservados.",
    },
  };

  const productos = [
    {
      id: 1,
      marca: "BULLPADEL",
      modelo: "Vertex 03 2024",
      precio: "185 €",
      estado: "EXCELLENT",
      colorEstado: "#7b8b42",
    },
    {
      id: 2,
      marca: "TAYLORMADE",
      modelo: "Driver Stealth 2",
      precio: "320 €",
      estado: "GREAT",
      colorEstado: "#7b8b42",
    },
    {
      id: 3,
      marca: "WILSON",
      modelo: "Pro Staff 97",
      precio: "210 €",
      estado: "GOOD",
      colorEstado: "#7b8b42",
    },
  ];

  const categorias = [
    "PADEL",
    "GOLF",
    "TENNIS",
    "CYCLING",
    "RUNNING",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111111",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{`
        *{
          box-sizing:border-box;
        }

        .product-card {
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          background: #ffffff;
          width: 100%;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.10);
        }

        .product-logo {
          transition: transform 0.25s ease;
        }

        .product-card:hover .product-logo {
          transform: scale(1.05);
        }

        @media (max-width: 1100px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .products-grid {
            grid-template-columns: 1fr !important;
          }

          .hero-title {
            font-size: 58px !important;
          }

          .header-inner {
            flex-wrap: wrap;
            justify-content: center !important;
          }

          .hero-image {
            height: 420px !important;
          }
        }

        @media (max-width: 700px) {
          .hero-title {
            font-size: 42px !important;
          }

          .hero-text {
            font-size: 18px !important;
          }

          .section-padding {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .navbar-menu {
            gap: 14px !important;
            font-size: 10px !important;
          }

          .logo-box {
            width: 220px !important;
            height: 70px !important;
          }

          .hero-image {
            height: 300px !important;
          }
        }
      `}</style>

      <header
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="header-inner section-padding"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "22px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "35px",
          }}
        >
          <div
            className="logo-box"
            onClick={() => router.push("/")}
            style={{
              position: "relative",
              width: "260px",
              height: "80px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.png"
              alt="ATHMOV"
              fill
              sizes="260px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <nav>
            <ul
              className="navbar-menu"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 800,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <li
                onClick={() => router.push("/products")}
                style={{ cursor: "pointer" }}
              >
                {t[lang].shop}
              </li>

              <li
                onClick={() => router.push("/sell")}
                style={{ cursor: "pointer" }}
              >
                {t[lang].sell}
              </li>

              {categorias.map((cat) => (
                <li
                  key={cat}
                  onClick={() => router.push("/products")}
                  style={{ cursor: "pointer" }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <select
              value={lang}
              onChange={(e) =>
                setLang(e.target.value as "EN" | "ES")
              }
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "999px",
                padding: "10px 14px",
                backgroundColor: "#ffffff",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              <option value="EN">EN</option>
              <option value="ES">ES</option>
            </select>

            <button
              onClick={() => router.push("/auth")}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                cursor: "pointer",
              }}
            >
              {t[lang].signIn}
            </button>

            <button
              onClick={() => router.push("/auth")}
              style={{
                backgroundColor: "#111111",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "13px 22px",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                cursor: "pointer",
              }}
            >
              {t[lang].register}
            </button>
          </div>
        </div>
      </header>

      <section
        className="hero-section section-padding"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "70px 48px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "24px",
              opacity: 0.55,
            }}
          >
            {t[lang].heroTag}
          </p>

          <h1
            className="hero-title"
            style={{
              fontSize: "72px",
              lineHeight: 1,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-3px",
            }}
          >
            {t[lang].heroTitle1}
            <br />
            {t[lang].heroTitle2}
          </h1>

          <p
            className="hero-text"
            style={{
              marginTop: "30px",
              fontSize: "20px",
              lineHeight: 1.7,
              color: "#4b4b4b",
              maxWidth: "620px",
            }}
          >
            {t[lang].heroText}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "36px",
            }}
          >
            <button
              onClick={() => router.push("/products")}
              style={{
                backgroundColor: "#111111",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {t[lang].shopGear}
            </button>

            <button
              onClick={() => router.push("/sell")}
              style={{
                backgroundColor: "transparent",
                color: "#111111",
                border: "1px solid rgba(0,0,0,0.16)",
                borderRadius: "999px",
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {t[lang].sellGear}
            </button>
          </div>
        </div>

        <div
          className="hero-image"
          style={{
            width: "100%",
            height: "520px",
            borderRadius: "40px",
            background:
              "linear-gradient(135deg,#f7f7f5,#efefea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            className="product-logo"
            style={{
              position: "relative",
              width: "70%",
              height: "180px",
            }}
          >
            <Image
              src="/logo.png"
              alt="ATHMOV"
              fill
              sizes="600px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "40px 48px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                opacity: 0.55,
              }}
            >
              {t[lang].featured}
            </p>

            <h2
              style={{
                fontSize: "46px",
                marginTop: "12px",
                marginBottom: 0,
                letterSpacing: "-2px",
              }}
            >
              {t[lang].explore}
            </h2>
          </div>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
            }}
          >
            {t[lang].curated}
          </p>
        </div>

        <div
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "26px",
          }}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              onClick={() => router.push("/products")}
            >
              <div className="product-card">
                <div
                  style={{
                    height: "280px",
                    background:
                      "linear-gradient(135deg,#f5f5f3,#ecece7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="product-logo"
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "80px",
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt={producto.modelo}
                      fill
                      sizes="180px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>

                <div style={{ padding: "26px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        letterSpacing: "2px",
                        opacity: 0.6,
                      }}
                    >
                      {producto.marca}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        color: producto.colorEstado,
                        fontWeight: 700,
                      }}
                    >
                      {producto.estado}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "24px",
                      margin: 0,
                      letterSpacing: "-1px",
                    }}
                  >
                    {producto.modelo}
                  </h3>

                  <p
                    style={{
                      marginTop: "18px",
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    {producto.precio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "40px",
          textAlign: "center",
          color: "#777",
          fontSize: "14px",
        }}
      >
        {t[lang].rights}
      </footer>
    </main>
  );
}