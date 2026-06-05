"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDisputesPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState("");
  const [resolvingId, setResolvingId] = useState<string | null>(null);

const loadDisputes = async () => {
  setDebug("Checking session...");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  setDebug(`User: ${user?.id || "NO USER"}`);

  if (!user) {
    return;
  }

const { data, error } = await supabase
  .from("orders")
  .select("*, products(*)", { count: "exact" });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    setDebug("ERROR: " + error.message);
    return;
  }

  const disputes = (data || []).filter(
    (o: any) => String(o.dispute_status).trim().toLowerCase() === "open"
  );

  setDebug(`User: ${user.id} | Orders: ${data?.length || 0} | Open: ${disputes.length}`);
  setOrders(disputes);
};

  useEffect(() => {
  loadDisputes();
}, []);

  const shortId = (value?: string | null) => {
  if (!value) return "Unknown";
  return value.slice(0, 8);
};

  const resolveDispute = async (
    orderId: string,
    resolution: "seller_wins" | "buyer_refund"
  ) => {
    const confirmed = confirm(
      resolution === "seller_wins"
        ? "Release payout to seller?"
        : "Refund buyer?"
    );

    if (!confirmed) return;

    setResolvingId(orderId);

    try {
      const response = await fetch("/api/resolve-dispute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          resolution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error resolving dispute");
        return;
      }

      alert("Dispute resolved");
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error: any) {
      alert(error.message || "Error resolving dispute");
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <main style={pageStyle}>
      <p style={eyebrowStyle}>ATHMOV ADMIN</p>
      <h1 style={titleStyle}>Disputes</h1>
      <p>{debug}</p>

     {orders.length === 0 ? (
  <p>No open disputes found.</p>
) : (
        <div style={listStyle}>
          {orders.map((order) => {
            const product =
              Array.isArray(order.products) && order.products.length > 0
                ? order.products[0]
                : order.products || null;

            const productImages = Array.from(
              new Set(
                [
                  ...(product?.image ? [product.image] : []),
                  ...(Array.isArray(product?.images) ? product.images : []),
                ].filter(Boolean)
              )
            );

            return (
              <article key={order.id} style={cardStyle}>
                <div style={productRowStyle}>
                  <div style={imageBoxStyle}>
                    {productImages[0] ? (
                      <img
                        src={productImages[0] as string}
                        alt={product?.title || "Product"}
                        style={imageStyle}
                      />
                    ) : (
                      <span style={imagePlaceholderStyle}>No image</span>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={eyebrowStyle}>DISPUTE</p>

                    <h2 style={productTitleStyle}>
                      {product?.title || `Order #${shortId(order.id)}`}
                    </h2>

                    <p style={mutedTextStyle}>Order #{shortId(order.id)}</p>

                    {productImages.length > 1 && (
                      <div style={galleryStyle}>
                        {productImages.slice(0, 6).map((img, index) => (
                          <img
                            key={`${String(img)}-${index}`}
                            src={String(img)}
                            alt={`${product?.title || "Product"} ${index + 1}`}
                            style={thumbStyle}
                          />
                        ))}
                      </div>
                    )}

                    <div style={detailsGridStyle}>
                      <p>
                        <strong>Dispute status:</strong>{" "}
                        <span
                          style={{
                            color:
                              order.dispute_status === "open"
                                ? "#d97706"
                                : "#16a34a",
                            fontWeight: 700,
                          }}
                        >
                          {order.dispute_status || "open"}
                        </span>
                      </p>

                      <p>
                        <strong>Order status:</strong>{" "}
                        <span
                          style={{
                            color:
                              order.status === "paid"
                                ? "#16a34a"
                                : order.status === "shipped"
                                ? "#2563eb"
                                : order.status === "refunded"
                                ? "#dc2626"
                                : "#d97706",
                            fontWeight: 700,
                          }}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </p>

                      <p>
                        <strong>Order amount:</strong> €{order.amount || 0}
                      </p>

                      <p>
                        <strong>Product price:</strong> €{product?.price || 0}
                      </p>

                      <p>
                        <strong>Buyer:</strong>{" "}
                       {order.buyer_email || order.user_email || order.buyer_id || "Unknown"}
                      </p>

                      <p>
                        <strong>Seller:</strong>{" "}
                        {product?.seller_email || order.seller_id || "Unknown"}
                      </p>

                      <p>
                        <strong>Sport:</strong> {product?.sport || "Unknown"}
                      </p>

                      <p>
                        <strong>Purchased:</strong>{" "}
                        {order.created_at
                          ? new Date(order.created_at).toLocaleString()
                          : "Unknown"}
                      </p>

                      <p>
                        <strong>Dispute opened:</strong>{" "}
                        {order.dispute_opened_at
                          ? new Date(order.dispute_opened_at).toLocaleString()
                          : "Unknown"}
                      </p>

                      <p>
                        <strong>Carrier:</strong>{" "}
                        {order.carrier || "No carrier"}
                      </p>

                      <p>
                        <strong>Tracking:</strong>{" "}
                        {order.tracking_number || "No tracking"}
                      </p>

                      <p>
                        <strong>Product ID:</strong> {shortId(order.product_id)}
                      </p>

                      <p>
                        <strong>Buyer ID:</strong> {shortId(order.buyer_id)}
                      </p>

                      <p>
                        <strong>Seller ID:</strong> {shortId(order.seller_id)}
                      </p>

                      <p>
                        <strong>Resolution:</strong>{" "}
                        <span
                          style={{
                            background:
                              order.dispute_resolution === "seller_wins"
                                ? "#dcfce7"
                                : order.dispute_resolution === "buyer_refund"
                                ? "#fee2e2"
                                : "#f3f4f6",
                            padding: "6px 12px",
                            borderRadius: "999px",
                            fontWeight: 600,
                          }}
                        >
                          {order.dispute_resolution || "Pending"}
                        </span>
                      </p>
                    </div>

                    <p style={reasonLabelStyle}>
                      <strong>Reason:</strong>
                    </p>

                    <p style={reasonBoxStyle}>
                      {order.dispute_reason || "No reason provided"}
                    </p>

                    <div style={actionsStyle}>
                      <button
                        onClick={() => resolveDispute(order.id, "seller_wins")}
                        style={{
                          ...primaryButtonStyle,
                          opacity: resolvingId === order.id ? 0.5 : 1,
                        }}
                        disabled={resolvingId === order.id}
                      >
                        {resolvingId === order.id
                          ? "Resolving..."
                          : "Release payout"}
                      </button>

                      <button
                        onClick={() => resolveDispute(order.id, "buyer_refund")}
                        style={{
                          ...secondaryButtonStyle,
                          opacity: resolvingId === order.id ? 0.5 : 1,
                        }}
                        disabled={resolvingId === order.id}
                      >
                        {resolvingId === order.id
                          ? "Resolving..."
                          : "Refund buyer"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f5f0",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};

const titleStyle = {
  fontSize: "64px",
  margin: "0 0 40px",
};

const listStyle = {
  display: "grid",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const productRowStyle = {
  display: "flex",
  gap: "28px",
  alignItems: "flex-start",
};

const imageBoxStyle = {
  width: "180px",
  height: "180px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#eee",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const imagePlaceholderStyle = {
  fontSize: "13px",
  color: "#777",
};

const galleryStyle = {
  display: "flex",
  gap: "10px",
  margin: "16px 0 24px",
  flexWrap: "wrap" as const,
};

const thumbStyle = {
  width: "76px",
  height: "76px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  background: "#eee",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
  margin: 0,
};

const productTitleStyle = {
  fontSize: "38px",
  margin: "8px 0 8px",
};

const mutedTextStyle = {
  color: "#777",
  marginTop: 0,
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "20px",
  marginTop: "20px",
  marginBottom: "24px",
};

const reasonLabelStyle = {
  marginTop: "10px",
};

const reasonBoxStyle = {
  background: "#fff7ed",
  padding: "24px",
  border: "1px solid #fdba74",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: 1.7,
};

const actionsStyle = {
  display: "flex",
  gap: "16px",
  marginTop: "30px",
};

const primaryButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px 24px",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid #111",
  borderRadius: "999px",
  padding: "16px 24px",
  cursor: "pointer",
  fontWeight: 700,
};