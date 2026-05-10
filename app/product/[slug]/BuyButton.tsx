"use client";

export default function BuyButton({ product }: any) {

  const handleCheckout = async () => {

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        width: "100%",
        background: "black",
        color: "white",
        border: "none",
        padding: "24px",
        borderRadius: "999px",
        fontSize: "18px",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      BUY NOW
    </button>
  );
}
