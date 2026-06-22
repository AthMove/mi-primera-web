"use client";

import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f5f0",
        padding: "140px 40px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "3px",
            opacity: 0.5,
            marginBottom: "20px",
          }}
        >
          ATHMOV JOURNAL
        </p>

        <h1
          style={{
            fontSize: "72px",
            lineHeight: 1,
            letterSpacing: "-4px",
            marginBottom: "20px",
          }}
        >
          Guías para comprar,
          <br />
          vender y elegir mejor.
        </h1>

        <p
          style={{
            maxWidth: "700px",
            color: "#666",
            fontSize: "18px",
            lineHeight: 1.8,
            marginBottom: "60px",
          }}
        >
          Artículos creados por ATHMOV para ayudar a compradores y vendedores
          de material deportivo premium.
        </p>

        <div
          onClick={() =>
            router.push(
              "/blog/cuando-comprar-vender-palos-golf-segunda-mano"
            )
          }
          style={{
            background: "#fff",
            borderRadius: "32px",
            padding: "40px",
            cursor: "pointer",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 20px 70px rgba(0,0,0,0.05)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "2px",
              opacity: 0.5,
              marginBottom: "12px",
            }}
          >
            GOLF · MERCADO
          </p>

          <h2
            style={{
              fontSize: "42px",
              letterSpacing: "-2px",
              marginBottom: "16px",
            }}
          >
            Cuándo comprar y vender palos de golf de segunda mano
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            El calendario que utilizan los compradores inteligentes para pagar
            menos y los vendedores para vender más rápido.
          </p>
        </div>
      </div>
    </main>
  );
}