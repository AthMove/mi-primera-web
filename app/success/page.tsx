"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
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

      await response.json();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV CHECKOUT</p>

        <h1 style={titleStyle}>
          {loading ? "Processing..." : "Payment successful"}
        </h1>

        <p style={textStyle}>
          Your order has been received. We'll prepare the next steps for your
          premium gear.
        </p>

        <button onClick={() => (window.location.href = "/products")} style={buttonStyle}>
          Continue shopping
        </button>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  background: "#fff",
  padding: "60px",
  borderRadius: "34px",
  maxWidth: "720px",
  width: "100%",
  textAlign: "center" as const,
  boxShadow: "0 20px 80px rgba(0,0,0,0.06)",
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
  marginBottom: "20px",
};

const textStyle = {
  color: "#666",
  fontSize: "18px",
  lineHeight: 1.7,
  maxWidth: "520px",
  margin: "0 auto",
};

const buttonStyle = {
  marginTop: "40px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px 34px",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "15px",
};