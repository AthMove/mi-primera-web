"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("athmov_cart") || "[]"));

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email || null);
    };

    getUser();
  }, []);

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("athmov_cart", JSON.stringify(updated));
  };

  const total = cart.reduce((acc: number, item: any) => {
    return acc + Number(String(item.precio).replace("€", ""));
  }, 0);

  const handleCheckout = async () => {
  if (cart.length === 0) {
    alert(t.cartEmptyAlert)
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/auth";
    return;
  }

  const item = cart[0];

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price: Number(String(item.precio).replace("€", "")),
      title: item.nombre,
      image: item.imagen,
      productId: item.id,
      sellerId: item.seller_id || item.user_id || item.owner_id,
      buyerId: user.id,
      email: user.email,
      stripeAccountId: item.stripe_account_id,
    }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert(data.error || t.checkoutCreateError);
  }
};

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p style={eyebrowStyle}>{t.cartEyebrow}</p>
        <h1 style={titleStyle}>{t.cartTitle}</h1>

        {cart.length === 0 ? (
          <section style={emptyStyle}>
            <h2 style={{ fontSize: "42px", margin: 0 }}>{t.cartEmptyTitle}</h2>
            <p style={{ color: "#666", marginTop: "14px" }}>
              {t.cartEmptyText}
            </p>
            <Link href="/products" style={shopButtonStyle}>
              {t.continueShopping}
            </Link>
          </section>
        ) : (
          <div style={layoutStyle}>
            <section style={itemsStyle}>
              {cart.map((item: any) => (
                <article key={item.id} style={itemStyle}>
                  <div style={imageWrapperStyle}>
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <p style={sportStyle}>{item.deporte}</p>
                    <h2 style={itemTitleStyle}>{item.nombre}</h2>
                    <p style={priceStyle}>{item.precio}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={removeButtonStyle}
                  >
                    {t.remove}
                  </button>
                </article>
              ))}
            </section>

            <aside style={summaryStyle}>
              <p style={eyebrowStyle}>{t.orderSummary}</p>

              <div style={summaryRowStyle}>
                <span>{t.subtotal}</span>
                <strong>€{total}</strong>
              </div>

              <div style={summaryRowStyle}>
                <span>{t.service}</span>
                <strong>{t.included}</strong>
              </div>

              <div style={dividerStyle} />

              <div style={totalRowStyle}>
                <span>{t.total}</span>
                <strong>€{total}</strong>
              </div>

              <button onClick={handleCheckout} style={checkoutButtonStyle}>
                {t.checkout}
              </button>

              <p style={secureTextStyle}>
                {t.secureCheckoutText}
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const eyebrowStyle = { fontSize: "12px", letterSpacing: "3px", opacity: 0.5, marginBottom: "14px" };
const titleStyle = { fontSize: "76px", lineHeight: 1, letterSpacing: "-4px", margin: "0 0 50px" };
const layoutStyle = { display: "grid", gridTemplateColumns: "1fr 420px", gap: "34px", alignItems: "start" };
const itemsStyle = { display: "grid", gap: "22px" };

const itemStyle = {
  display: "grid",
  gridTemplateColumns: "210px 1fr auto",
  gap: "30px",
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(18px)",
  padding: "24px",
  borderRadius: "34px",
  alignItems: "center",
  border: "1px solid rgba(0,0,0,0.05)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  height: "170px",
  borderRadius: "24px",
  overflow: "hidden",
  background: "#fff",
};

const sportStyle = { fontSize: "11px", letterSpacing: "3px", opacity: 0.45, marginBottom: "12px" };
const itemTitleStyle = { fontSize: "32px", margin: 0, letterSpacing: "-1px" };
const priceStyle = { fontSize: "28px", fontWeight: 800 };

const removeButtonStyle = {
  background: "transparent",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "14px 22px",
  cursor: "pointer",
  fontWeight: 700,
};

const summaryStyle = {
  position: "sticky" as const,
  top: "120px",
  background: "#111",
  color: "#fff",
  padding: "34px",
  borderRadius: "34px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
};

const summaryRowStyle = { display: "flex", justifyContent: "space-between", fontSize: "16px", marginBottom: "18px", color: "rgba(255,255,255,0.75)" };
const dividerStyle = { height: "1px", background: "rgba(255,255,255,0.14)", margin: "26px 0" };
const totalRowStyle = { display: "flex", justifyContent: "space-between", fontSize: "28px", marginBottom: "30px" };

const checkoutButtonStyle = {
  width: "100%",
  background: "#fff",
  color: "#111",
  border: "none",
  padding: "20px",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: 800,
  cursor: "pointer",
};

const secureTextStyle = { fontSize: "13px", color: "rgba(255,255,255,0.55)", textAlign: "center" as const, marginTop: "18px" };
const emptyStyle = { background: "#fff", padding: "60px", borderRadius: "36px" };

const shopButtonStyle = {
  display: "inline-block",
  marginTop: "28px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "16px 26px",
  borderRadius: "999px",
  fontWeight: 800,
};