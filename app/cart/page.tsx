"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("athmov_cart");

    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const removeItem = (productId: string) => {
    const updated = items.filter((item) => item.id !== productId);

    setItems(updated);
    localStorage.setItem("athmov_cart", JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>ATHMOV</p>
          <h1 style={titleStyle}>Carrito</h1>
          <p style={subtitleStyle}>Revisa tus productos antes del pago.</p>
        </div>

        <Link href="/products" style={backButtonStyle}>
          Seguir comprando
        </Link>
      </section>

      {items.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>Tu carrito está vacío</h2>
          <p style={emptyTextStyle}>
            Añade productos desde el marketplace.
          </p>

          <Link href="/products" style={shopButtonStyle}>
            Ir al marketplace
          </Link>
        </section>
      ) : (
        <section style={layoutStyle}>
          <div style={itemsStyle}>
            {items.map((item) => (
              <article key={item.id} style={itemStyle}>
                <div style={imageBoxStyle}>
                  <img
                    src={
                      item.image ||
                      "https://placehold.co/700x700?text=ATHMOV"
                    }
                    alt={item.title}
                    style={imageStyle}
                  />
                </div>

                <div style={infoStyle}>
                  <p style={brandStyle}>{item.brand}</p>
                  <h2 style={productTitleStyle}>{item.title}</h2>
                  <p style={priceStyle}>€{item.price}</p>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={removeButtonStyle}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside style={summaryStyle}>
            <p style={summaryLabelStyle}>Resumen</p>

            <div style={summaryRowStyle}>
              <span>Subtotal</span>
              <strong>€{total}</strong>
            </div>

            <div style={summaryRowStyle}>
              <span>Envío</span>
              <strong>Por confirmar</strong>
            </div>

            <div style={totalRowStyle}>
              <span>Total</span>
              <strong>€{total}</strong>
            </div>

            <a
              href={`/api/checkout?productId=${items[0].id}`}
              style={checkoutButtonStyle}
            >
              Ir al pago
            </a>
          </aside>
        </section>
      )}
    </main>
  );
}

const fontFamily =
  "'Manrope', 'Satoshi', 'Avenir Next', system-ui, sans-serif";

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "46px",
  fontFamily,
};

const headerStyle = {
  maxWidth: "1180px",
  margin: "0 auto 44px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "24px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-2px",
};

const subtitleStyle = {
  color: "#666",
  marginTop: "12px",
};

const backButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
};

const emptyStyle = {
  maxWidth: "720px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "48px",
  borderRadius: "32px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "32px",
  marginBottom: "12px",
};

const emptyTextStyle = {
  color: "#666",
  marginBottom: "28px",
};

const shopButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
};

const layoutStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: "28px",
  alignItems: "start",
};

const itemsStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const itemStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "18px",
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  gap: "22px",
};

const imageBoxStyle = {
  height: "160px",
  background: "#efefea",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const imageStyle = {
  width: "90%",
  height: "90%",
  objectFit: "contain" as const,
};

const infoStyle = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "8px",
};

const productTitleStyle = {
  fontSize: "28px",
  lineHeight: 1,
  marginBottom: "12px",
};

const priceStyle = {
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "18px",
};

const removeButtonStyle = {
  width: "fit-content",
  background: "#fff",
  color: "#c0392b",
  border: "1px solid #f0c7c1",
  borderRadius: "999px",
  padding: "10px 16px",
  fontWeight: 700,
  cursor: "pointer",
};

const summaryStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  position: "sticky" as const,
  top: "24px",
};

const summaryLabelStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "22px",
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  color: "#555",
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid #eee",
  paddingTop: "18px",
  marginTop: "18px",
  marginBottom: "24px",
  fontSize: "20px",
};

const checkoutButtonStyle = {
  display: "block",
  width: "100%",
  textAlign: "center" as const,
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "16px",
  fontWeight: 700,
};