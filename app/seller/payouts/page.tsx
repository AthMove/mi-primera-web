"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerPayoutsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayouts();
  }, []);

  const loadPayouts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  const pending = orders.filter(
    (o) => o.transfer_status === "pending" && o.dispute_status !== "open"
  );

  const paid = orders.filter((o) => o.transfer_status === "released");

  const disputed = orders.filter((o) => o.dispute_status === "open");

  const sum = (items: any[]) =>
    items.reduce(
      (acc, item) => acc + Number(item.seller_amount || item.amount || 0),
      0
    );

  if (loading) {
    return <main style={pageStyle}>Cargando pagos...</main>;
  }

  return (
    <main style={pageStyle}>
      <p style={eyebrowStyle}>CENTRO DE VENDEDOR</p>
      <h1 style={titleStyle}>Pagos</h1>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Pendiente de liberar</span>
          <strong style={statValueStyle}>€{sum(pending).toFixed(2)}</strong>
        </div>

        <div style={statCardStyle}>
          <span style={statLabelStyle}>Liberado</span>
          <strong style={statValueStyle}>€{sum(paid).toFixed(2)}</strong>
        </div>

        <div style={statCardStyle}>
          <span style={statLabelStyle}>En disputa</span>
          <strong style={statValueStyle}>€{sum(disputed).toFixed(2)}</strong>
        </div>

        <div style={statCardDarkStyle}>
          <span style={statLabelLightStyle}>Ingresos totales</span>
          <strong style={statValueLightStyle}>€{sum(orders).toFixed(2)}</strong>
        </div>
      </section>

      <section style={listStyle}>
        {orders.length === 0 ? (
          <div style={emptyStyle}>Todavía no hay pagos.</div>
        ) : (
          orders.map((order) => (
            <article key={order.id} style={rowStyle}>
              <div>
                <p style={rowEyebrowStyle}>PEDIDO #{order.id.slice(0, 8)}</p>

                <h2 style={rowTitleStyle}>
                  €{Number(order.seller_amount || order.amount || 0).toFixed(2)}
                </h2>

                <p style={rowTextStyle}>
                  Estado: {getOrderStatusLabel(order.status)} · Transferencia:{" "}
                  {getTransferStatusLabel(order.transfer_status)}
                </p>

                {order.dispute_status === "open" && (
                  <p style={warningStyle}>Disputa abierta — pago bloqueado</p>
                )}
              </div>

              <div style={rightStyle}>
                <span style={badgeStyle(order.transfer_status)}>
                  {order.transfer_status === "released"
                    ? "Liberado"
                    : "Pendiente"}
                </span>

                <small style={dateStyle}>
                  {order.payout_released_at
                    ? `Liberado ${formatDate(order.payout_released_at)}`
                    : order.delivered_at
                      ? `Entregado ${formatDate(order.delivered_at)}`
                      : `Creado ${formatDate(order.created_at)}`}
                </small>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function getOrderStatusLabel(status?: string) {
  if (status === "pending") return "Pendiente";
  if (status === "paid") return "Pagado";
  if (status === "preparing") return "En preparación";
  if (status === "shipped") return "Enviado";
  if (status === "delivered") return "Entregado";
  if (status === "completed") return "Completado";
  if (status === "refunded") return "Reembolsado";
  return status || "Pendiente";
}

function getTransferStatusLabel(status?: string) {
  if (status === "pending") return "Pendiente";
  if (status === "released") return "Liberado";
  if (status === "cancelled") return "Cancelado";
  if (status === "refunded") return "Reembolsado";
  return status || "Pendiente";
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "150px 64px 90px",
  fontFamily: "Inter, sans-serif",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.45,
  marginBottom: "14px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: "0 0 40px",
  letterSpacing: "-5px",
  fontWeight: 500,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "18px",
  marginBottom: "34px",
};

const statCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const statCardDarkStyle = {
  ...statCardStyle,
  background: "#111",
  color: "#fff",
};

const statLabelStyle = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  opacity: 0.5,
  marginBottom: "12px",
};

const statLabelLightStyle = {
  ...statLabelStyle,
  opacity: 0.65,
};

const statValueStyle = {
  fontSize: "34px",
  letterSpacing: "-1px",
};

const statValueLightStyle = {
  ...statValueStyle,
  color: "#fff",
};

const listStyle = {
  display: "grid",
  gap: "16px",
};

const rowStyle = {
  background: "rgba(255,255,255,0.92)",
  borderRadius: "28px",
  padding: "26px",
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  alignItems: "center",
  border: "1px solid rgba(0,0,0,0.04)",
};

const rowEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  margin: 0,
};

const rowTitleStyle = {
  fontSize: "34px",
  margin: "8px 0",
  letterSpacing: "-1px",
  fontWeight: 600,
};

const rowTextStyle = {
  color: "#666",
  margin: 0,
};

const warningStyle = {
  marginTop: "10px",
  color: "#b91c1c",
  fontSize: "12px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "10px",
};

const badgeStyle = (status?: string) => ({
  background: status === "released" ? "#111" : "#fff",
  color: status === "released" ? "#fff" : "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "12px",
  fontWeight: 800,
});

const dateStyle = {
  color: "#666",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "40px",
  color: "#666",
};