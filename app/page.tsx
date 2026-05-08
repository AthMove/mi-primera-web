"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"EN" | "ES">("EN");

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
      rights: "© 2025 ATHMOV. All rights reserved.",
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
        "Compra y vende equipamiento deportivo premium autenticado de las mejores marcas del mundo.",
      shopGear: "Comprar",
      sellGear: "Vender equipo",
      trustText: "Únete a miles de deportistas que confían en ATHMOV.",
      authenticated: "AUTENTICADO",
      authenticatedText: "Cada artículo es verificado por nuestros expertos.",
      quality: "CALIDAD PREMIUM",
      qualityText: "Mejores marcas. Excelente estado garantizado.",
      sustainable: "SOSTENIBLE",
      sustainableText: "Alarga la vida del material. Reduce residuos.",
      explore: "Explorar categorías",
      featured: "Productos destacados",
      curated: "Equipamiento premium seleccionado.",
      rights: "© 2025 ATHMOV. Todos los derechos reservados.",
    },
  };

  const productos = [
    {
      id: 1,
      slug: "vertex-03-2024",
      marca: "BULLPADEL",
      modelo: "Vertex 03 2024",
      precio: "185 €",
      estado: "EXCELLENT",
      colorEstado: "#7b8b42",
    },
    {
      id: 2,
      slug: "driver-stealth-2",
      marca: "TAYLORMADE",
      modelo: "Driver Stealth 2",
      precio: "320 €",
      estado: "GREAT",
      colorEstado: "#7b8b42",
    },
    {
      id: 3,
      slug: "pro-staff-97",
      marca: "WILSON",
      modelo: "Pro Staff 97",
      precio: "210 €",
      estado: "GOOD",
      colorEstado: "#7b8b42",
    },
  ];

  const categorias = ["PADEL", "GOLF", "TENNIS", "CYCLING", "RUNNING"];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111111",
      }}
    >
      <style>{`
        .product-card {
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          background: #ffffff;
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

        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      {/* HEADER */}
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
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 60px",
            gap: "35px",
          }}
        >
          <a href="/">
            <div
              style={{
                position: "relative",
                width: "340px",
                height: "105px",
              }}
            >
              <Image
                src="/logo.png"
                alt="ATHMOV"
                fill
                sizes="340px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </a>

          <nav>
            <ul
              style={{
                display: "flex",
                gap: "28px",
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontSize: "12px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 800,
                alignItems: "center",
              }}
            >
              <li>{t[lang].shop}</li>
              <li>{t[lang].sell}</li>

              {categorias.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "EN" | "ES")}
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

      {/* HERO */}
      <section style={{ padding: "100px 60px 70px" }}>
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "90px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#7b8b42",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "26px",
              }}
            >
              {t[lang].heroTag}
            </p>

            <h1
              style={{
                fontSize: "86px",
                lineHeight: 0.95,
                letterSpacing: "-5px",
                margin: "0 0 30px",
                fontWeight: 900,
              }}
            >
              {t[lang].heroTitle1}
              <br />
              {t[lang].heroTitle2}
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.7,
                color: "#5f5f5f",
                maxWidth: "560px",
                marginBottom: "40px",
              }}
            >
              {t[lang].heroText}
            </p>

            <div style={{ display: "flex", gap: "18px", marginBottom: "35px" }}>
              <button
                style={{
                  backgroundColor: "#111111",
                  color: "#ffffff",
                  border: "none",
                  padding: "18px 34px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {t[lang].shopGear}
              </button>

              <button
                style={{
                  backgroundColor: "#ffffff",
                  color: "#111111",
                  border: "1px solid #d9d9d9",
                  padding: "18px 34px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {t[lang].sellGear}
              </button>
            </div>

            <p style={{ color: "#5f5f5f", fontSize: "15px" }}>
              {t[lang].trustText}
            </p>
          </div>

          <div
            style={{
              height: "620px",
              borderRadius: "34px",
              background: "linear-gradient(135deg,#f7f7f5,#ecece7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "260px" }}>
              <Image
                src="/logo.png"
                alt="ATHMOV"
                fill
                sizes="700px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: "0 60px 120px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <p
            style={{
              color: "#7b8b42",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {t[lang].featured}
          </p>

          <h2
            style={{
              fontSize: "54px",
              letterSpacing: "-3px",
              marginBottom: "60px",
              fontWeight: 900,
            }}
          >
            {t[lang].curated}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "34px",
            }}
          >
            {productos.map((prod) => (
              <a
                key={prod.id}
                href={`/product/${prod.slug}`}
                style={{
                  display: "block",
                }}
              >
                <div className="product-card">
                  <div
                    style={{
                      position: "relative",
                      height: "360px",
                      background: "linear-gradient(135deg,#f7f7f5,#efefea)",
                    }}
                  >
                    <Image
                      className="product-logo"
                      src="/logo.png"
                      alt={prod.modelo}
                      fill
                      sizes="500px"
                      style={{
                        objectFit: "contain",
                        padding: "70px",
                      }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: "18px",
                        backgroundColor: "#ffffff",
                        color: prod.colorEstado,
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 800,
                        border: `1px solid ${prod.colorEstado}`,
                      }}
                    >
                      ● {prod.estado}
                    </span>
                  </div>

                  <div style={{ padding: "26px" }}>
                    <p
                      style={{
                        color: "#7b8b42",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      {prod.marca}
                    </p>

                    <h3 style={{ fontSize: "30px", margin: "0 0 16px" }}>
                      {prod.modelo}
                    </h3>

                    <p style={{ fontSize: "36px", fontWeight: 900, margin: 0 }}>
                      {prod.precio}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "70px 60px 40px",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ position: "relative", width: "240px", height: "70px" }}>
            <Image
              src="/logo.png"
              alt="ATHMOV"
              fill
              sizes="240px"
              style={{ objectFit: "contain" }}
            />
          </div>

          <p style={{ color: "#7b8b42", fontWeight: 700 }}>
            Second hand. First class.
          </p>

          <p style={{ color: "#666666", fontSize: "13px", marginTop: "40px" }}>
            {t[lang].rights}
          </p>
        </div>
      </footer>
    </main>
  );
}