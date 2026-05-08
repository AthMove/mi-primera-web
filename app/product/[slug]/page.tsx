import Image from "next/image";
import Link from "next/link";

const productos = [
  {
    slug: "vertex-03-2024",
    marca: "BULLPADEL",
    modelo: "Vertex 03 2024",
    precio: "185 €",
    estado: "EXCELLENT",
    deporte: "Padel",
    vendedor: "Alex Martin",
    ventas: "24 sales",
    descripcion:
      "Premium Bullpadel racket in excellent condition. Lightly used and fully authenticated by ATHMOV. Perfect for advanced players looking for maximum power and control.",
  },
  {
    slug: "driver-stealth-2",
    marca: "TAYLORMADE",
    modelo: "Driver Stealth 2",
    precio: "320 €",
    estado: "GREAT",
    deporte: "Golf",
    vendedor: "James Carter",
    ventas: "18 sales",
    descripcion:
      "TaylorMade Driver Stealth 2 in great condition. Premium golf equipment verified by ATHMOV, ideal for players looking for distance, stability and performance.",
  },
  {
    slug: "pro-staff-97",
    marca: "WILSON",
    modelo: "Pro Staff 97",
    precio: "210 €",
    estado: "GOOD",
    deporte: "Tennis",
    vendedor: "Laura Smith",
    ventas: "31 sales",
    descripcion:
      "Wilson Pro Staff 97 tennis racket in good condition. A classic control-focused racket for demanding players. Verified and ready to play.",
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const producto =
    productos.find((item) => item.slug === params.slug) || productos[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "Inter, sans-serif",
        color: "#111111",
        padding: "60px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto 40px" }}>
        <Link
          href="/"
          style={{
            color: "#7b8b42",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        >
          ← Back to ATHMOV
        </Link>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "70px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "700px",
            borderRadius: "34px",
            overflow: "hidden",
            background: "linear-gradient(135deg,#f7f7f5,#ecece7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "70px",
          }}
        >
          <Image
            src="/logo.png"
            alt={producto.modelo}
            fill
            sizes="800px"
            style={{
              objectFit: "contain",
              padding: "110px",
            }}
            priority
          />

          <span
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              backgroundColor: "#ffffff",
              color: "#7b8b42",
              padding: "10px 16px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 800,
              border: "1px solid #7b8b42",
              letterSpacing: "1px",
            }}
          >
            ● {producto.estado}
          </span>
        </div>

        <div>
          <p
            style={{
              color: "#7b8b42",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            {producto.marca}
          </p>

          <h1
            style={{
              fontSize: "64px",
              lineHeight: 1,
              letterSpacing: "-3px",
              margin: "0 0 24px",
              fontWeight: 900,
            }}
          >
            {producto.modelo}
          </h1>

          <p
            style={{
              fontSize: "42px",
              fontWeight: 900,
              marginBottom: "30px",
            }}
          >
            {producto.precio}
          </p>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#5f5f5f",
              marginBottom: "40px",
            }}
          >
            {producto.descripcion}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {[
              ["Sport", producto.deporte],
              ["Condition", producto.estado],
              ["Brand", producto.marca],
              ["Authenticity", "Verified"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "20px",
                  padding: "22px",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#7b8b42",
                    marginBottom: "10px",
                  }}
                >
                  {label}
                </p>

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              marginBottom: "50px",
            }}
          >
            <button
              style={{
                flex: 1,
                backgroundColor: "#111111",
                color: "#ffffff",
                border: "none",
                padding: "22px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>

            <button
              style={{
                width: "70px",
                borderRadius: "999px",
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "#ffffff",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ♡
            </button>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: "34px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#7b8b42",
                marginBottom: "20px",
              }}
            >
              Seller
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#d9d9d9",
                }}
              />

              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: "0 0 6px",
                  }}
                >
                  {producto.vendedor}
                </p>

                <p
                  style={{
                    color: "#5f5f5f",
                    margin: 0,
                  }}
                >
                  Verified seller • {producto.ventas}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}