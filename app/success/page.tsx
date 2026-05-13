"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem("athmov_cart");
  }, []);

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>Pago completado</p>

        <h1 style={titleStyle}>
          ¡Compra realizada correctamente!
        </h1>

        <p style={textStyle}>
          Tu pedido ha sido procesado y el vendedor será notificado.
        </p>

        <div style={buttonsStyle}>
          <Link href="/products" style={primaryButtonStyle}>
            Seguir comprando
          </Link>

          <Link href="/messages" style={secondaryButtonStyle}>
            Ver mensajes
          </Link>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#fff",
  borderRadius: "36px",
  padding: "54px",
  textAlign: "center" as const,
};

const eyebrowStyle = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  color: "#777",
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "52px",
  lineHeight: 1,
  letterSpacing: "-2px",
  marginBottom: "18px",
  fontWeight: 800,
};

const textStyle = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#666",
  marginBottom: "34px",
};

const buttonsStyle = {
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  flexWrap: "wrap" as const,
};

const primaryButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "16px 24px",
  borderRadius: "999px",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  background: "#efefea",
  color: "#111",
  textDecoration: "none",
  padding: "16px 24px",
  borderRadius: "999px",
  fontWeight: 700,
};