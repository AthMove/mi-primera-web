"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function AdminDisputesPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  checkAdmin();
}, []);

const checkAdmin = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/auth";
    return;
  }

  // CAMBIA ESTE EMAIL POR EL TUYO
  const adminEmail = "tuemail@gmail.com";

  if (user.email !== adminEmail) {
    window.location.href = "/";
    return;
  }

  loadDisputes();
};

 const loadDisputes = async () => {
  setLoading(true);

  const { data: evidence, error: evidenceError } = await supabase
    .from("dispute_evidence")
    .select("*")
    .order("created_at", { ascending: false });

  if (evidenceError) {
    alert(evidenceError.message);
    setOrders([]);
    setLoading(false);
    return;
  }

  const orderIds = evidence?.map((item) => item.order_id) || [];

  const { data: ordersData, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .in("id", orderIds);

  if (ordersError) {
    alert(ordersError.message);
    setOrders([]);
    setLoading(false);
    return;
  }

  const ordersWithEvidence = await Promise.all(
  (evidence || []).map(async (item) => {
    const order = ordersData?.find(
      (order) => order.id === item.order_id
    );

    let product = null;

    if (order?.product_id) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", order.product_id)
        .maybeSingle();

      product = data;
    }

    return {
      ...order,
      product,
      evidence: item,
    };
  })
);

  setOrders(ordersWithEvidence);
  setLoading(false);
};

  const resolveDispute = async (
    orderId: string,
    resolution: "seller_wins" | "buyer_refund"
  ) => {
    const confirmed = confirm("Resolve dispute?");
    if (!confirmed) return;

    const response = await fetch("/api/admin/resolve-dispute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, resolution }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Error");
      return;
    }

    await loadDisputes();
    alert("Dispute resolved");
  };

  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>Disputes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No disputes found.</p>
      ) : (
        <div style={listStyle}>
          {orders.map((order) => (
            <div key={order.id} style={cardStyle}>
              <div style={imageBoxStyle}>
                {order.evidence?.file_url ? (
                  <Image
                    src={order.evidence.file_url}
                    alt="Evidence"
                    fill
                    sizes="180px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span style={noEvidenceStyle}>No evidence</span>
                )}
              </div>

              <div>
                <p style={eyebrowStyle}>DISPUTE</p>

               <h2 style={productTitleStyle}>
  {order.product?.title ||
    order.product?.nombre ||
    `Order #${order.id.slice(0, 8)}`}
</h2>

                <p>
                  <strong>Product:</strong>{" "}
{order.product?.title ||
 order.product?.nombre ||
 "Unknown"}
                </p>

                <p>
                  <strong>Status:</strong> {order.dispute_status || "open"}
                </p>

                <p>
                  <strong>Order status:</strong> {order.status}
                </p>

                <p>
                  <strong>Amount:</strong> €{order.amount}
                </p>

                <p>
                  <strong>Reason:</strong>
                </p>

                <p style={reasonBoxStyle}>
                  {order.dispute_reason ||
                    order.evidence?.message ||
                    "No reason provided"}
                </p>

                {order.evidence?.file_url && (
                  <a
                    href={order.evidence.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    Open evidence
                  </a>
                )}

                <div style={actionsStyle}>
                  <button
                    onClick={() => resolveDispute(order.id, "seller_wins")}
                    style={primaryButtonStyle}
                  >
                    Release payout
                  </button>

                  <button
                    onClick={() => resolveDispute(order.id, "buyer_refund")}
                    style={secondaryButtonStyle}
                  >
                    Refund buyer
                  </button>
                </div>
              </div>
            </div>
          ))}
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
  marginBottom: "40px",
};

const listStyle = {
  display: "grid",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  gap: "24px",
  alignItems: "start",
};

const imageBoxStyle = {
  position: "relative" as const,
  width: "180px",
  height: "180px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const noEvidenceStyle = {
  fontSize: "13px",
  color: "#777",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const productTitleStyle = {
  fontSize: "38px",
  margin: "8px 0 18px",
};

const reasonBoxStyle = {
  background: "#f7f7f7",
  padding: "18px",
  borderRadius: "16px",
  lineHeight: 1.6,
};

const linkStyle = {
  display: "inline-block",
  marginTop: "18px",
  fontWeight: 700,
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