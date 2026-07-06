"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function SuccessClient() {
  const params = useSearchParams();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveOrder();
  }, []);

  const saveOrder = async () => {
    try {
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.log("VERIFY SESSION ERROR:", data.error || data);
      }

      setLoading(false);
    } catch (error) {
      console.log("SUCCESS PAGE ERROR:", error);
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <div style={checkStyle}>✓</div>

        <p style={eyebrowStyle}>{t.checkoutEyebrow}</p>

        <h1 style={titleStyle}>
          {loading ? t.processingOrder : t.orderConfirmed}
        </h1>

        <p style={textStyle}>
          {t.successText}
        </p>

        <div style={timelineStyle}>
          <div style={stepStyle}>
            <span style={dotActiveStyle}>✓</span>
            <p>{t.paid}</p>
          </div>

          <div style={lineStyle} />

          <div style={stepStyle}>
            <span style={dotStyle}>2</span>
            <p>{t.sellerShips}</p>
          </div>

          <div style={lineStyle} />

          <div style={stepStyle}>
            <span style={dotStyle}>3</span>
            <p>{t.delivered}</p>
          </div>
        </div>

        <div style={trustGridStyle}>
          <div style={trustCardStyle}>✓ {t.securePayments}</div>
          <div style={trustCardStyle}>✓ {t.buyerProtection}</div>
          <div style={trustCardStyle}>✓ {t.trackedShipping}</div>
          <div style={trustCardStyle}>✓ {t.premiumMarketplace}</div>
        </div>

        <div style={actionsStyle}>
          <button
            onClick={() => (window.location.href = "/orders")}
            style={buttonStyle}
          >
            {t.viewOrder}
          </button>

          <button
            onClick={() => (window.location.href = "/products")}
            style={secondaryButtonStyle}
          >
            {t.continueShopping}
          </button>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  background: "#fff",
  padding: "58px",
  borderRadius: "42px",
  maxWidth: "820px",
  width: "100%",
  textAlign: "center" as const,
  boxShadow: "0 40px 130px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
};

const checkStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  fontSize: "28px",
  fontWeight: 900,
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "4px",
  opacity: 0.45,
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: "0 0 20px",
};

const textStyle = {
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.7,
  maxWidth: "580px",
  margin: "0 auto",
};

const timelineStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "38px auto 28px",
  maxWidth: "620px",
};

const stepStyle = {
  minWidth: "110px",
  fontSize: "12px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const dotActiveStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const dotStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "#f0f0ec",
  color: "#777",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
  fontWeight: 900,
};

const lineStyle = {
  height: "2px",
  flex: 1,
  background: "#e0e0da",
  marginBottom: "28px",
};

const trustGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  maxWidth: "560px",
  margin: "0 auto",
};

const trustCardStyle = {
  background: "#f7f7f3",
  borderRadius: "999px",
  padding: "13px 16px",
  fontSize: "12px",
  fontWeight: 900,
};

const actionsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap" as const,
  marginTop: "36px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px 34px",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: "15px",
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "18px 34px",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: "15px",
};