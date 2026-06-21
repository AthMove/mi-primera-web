"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminFinancePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFinance();
  }, []);

  async function loadFinance() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ERROR ADMIN FINANZAS:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o) =>
      ["paid", "preparing", "shipped", "delivered", "completed"].includes(
        o.status
      )
    );

    const gmv = paidOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
    const fees = paidOrders.reduce(
      (sum, o) => sum + Number(o.platform_fee || 0),
      0
    );
    const sellerEarnings = paidOrders.reduce(
      (sum, o) => sum + Number(o.seller_amount || 0),
      0
    );
    const released = orders
      .filter((o) => o.transfer_status === "released")
      .reduce((sum, o) => sum + Number(o.seller_amount || 0), 0);
    const pendingRelease = paidOrders
      .filter((o) => o.transfer_status !== "released")
      .reduce((sum, o) => sum + Number(o.seller_amount || 0), 0);
    const disputes = orders.filter((o) => o.dispute_status === "open").length;

    return {
      gmv,
      fees,
      sellerEarnings,
      released,
      pendingRelease,
      paidOrders: paidOrders.length,
      totalOrders: orders.length,
      disputes,
    };
  }, [orders]);

  const formatMoney = (value: number) => `€${value.toFixed(2)}`;

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status?: string) => {
    if (status === "paid") return "Pagado";
    if (status === "preparing") return "Preparando";
    if (status === "shipped") return "Enviado";
    if (status === "delivered") return "Entregado";
    if (status === "completed") return "Completado";
    if (status === "refunded") return "Reembolsado";
    if (status === "pending") return "Pendiente";
    return status || "Pendiente";
  };

  const getTransferLabel = (status?: string) => {
    if (status === "released") return "Liberado";
    if (status === "pending") return "Pendiente";
    if (status === "cancelled") return "Cancelado";
    if (status === "refunded") return "Reembolsado";
    return status || "Pendiente";
  };

  const getDisputeLabel = (status?: string) => {
    if (status === "open") return "Abierta";
    if (status === "resolved") return "Resuelta";
    if (status === "none") return "Sin disputa";
    return status || "Sin disputa";
  };

  if (loading) {
    return <main style={pageStyle}>Cargando finanzas...</main>;
  }

  return (
    <main style={pageStyle} className="admin-finance-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ADMIN ATHMOV</p>

        <h1 style={titleStyle} className="admin-finance-title">
          Finanzas
        </h1>

        <p style={subtitleStyle}>
          Controla el volumen del marketplace, comisiones, pagos y riesgo abierto.
        </p>
      </section>

      <section style={statsGridStyle} className="stats-grid">
        <Card label="GMV" value={formatMoney(stats.gmv)} />
        <Card label="Comisiones ATHMOV" value={formatMoney(stats.fees)} />
        <Card label="Ganancias vendedores" value={formatMoney(stats.sellerEarnings)} />
        <Card label="Pagos pendientes" value={formatMoney(stats.pendingRelease)} />
        <Card label="Pagos liberados" value={formatMoney(stats.released)} />
        <Card label="Pedidos pagados" value={String(stats.paidOrders)} />
        <Card label="Pedidos totales" value={String(stats.totalOrders)} />
        <Card label="Disputas abiertas" value={String(stats.disputes)} />
      </section>

      <section style={tableSectionStyle}>
        <p style={eyebrowStyle}>FINANZAS DE PEDIDOS</p>
        <h2 style={sectionTitleStyle}>Pedidos</h2>

        {orders.length === 0 ? (
          <div style={emptyStyle}>Todavía no hay pedidos.</div>
        ) : (
          <div style={tableStyle}>
            {orders.map((order) => (
              <div key={order.id} style={rowStyle} className="finance-row">
                <div>
                  <p style={rowTitleStyle}>#{String(order.id).slice(0, 8)}</p>
                  <p style={rowMetaStyle}>{formatDate(order.created_at)}</p>
                </div>

                <div>
                  <p style={rowLabelStyle}>Importe</p>
                  <strong>{formatMoney(Number(order.amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Comisión</p>
                  <strong>{formatMoney(Number(order.platform_fee || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Vendedor</p>
                  <strong>{formatMoney(Number(order.seller_amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Estado</p>
                  <span style={badgeStyle}>{getStatusLabel(order.status)}</span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Transferencia</p>
                  <span
                    style={{
                      ...badgeStyle,
                      ...(order.transfer_status === "released"
                        ? releasedBadgeStyle
                        : pendingBadgeStyle),
                    }}
                  >
                    {getTransferLabel(order.transfer_status)}
                  </span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Disputa</p>
                  <span
                    style={{
                      ...badgeStyle,
                      ...(order.dispute_status === "open"
                        ? dangerBadgeStyle
                        : pendingBadgeStyle),
                    }}
                  >
                    {getDisputeLabel(order.dispute_status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .finance-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .admin-finance-page {
            padding: 120px 18px 40px !important;
          }

          .admin-finance-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .stats-grid {
            grid-template-columns: 1fr !important;
          }

          .finance-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div style={cardStyle}>
      <p style={cardLabelStyle}>{label}</p>
      <h2 style={cardValueStyle}>{value}</h2>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "150px 64px 90px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 36px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-5px",
  fontWeight: 500,
};

const subtitleStyle = {
  color: "#666",
  marginTop: "16px",
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "18px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const cardLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  opacity: 0.45,
};

const cardValueStyle = {
  fontSize: "32px",
  margin: "12px 0 0",
};

const tableSectionStyle = {
  maxWidth: "1200px",
  margin: "50px auto 0",
};

const sectionTitleStyle = {
  fontSize: "38px",
  margin: 0,
  letterSpacing: "-2px",
};

const emptyStyle = {
  marginTop: "18px",
  background: "#fff",
  borderRadius: "28px",
  padding: "42px",
};

const tableStyle = {
  marginTop: "20px",
  display: "grid",
  gap: "12px",
};

const rowStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.05)",
  borderRadius: "24px",
  padding: "22px",
  display: "grid",
  gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr 1fr 1fr",
  gap: "14px",
  alignItems: "center",
};

const rowTitleStyle = {
  margin: 0,
  fontWeight: 900,
};

const rowMetaStyle = {
  margin: "6px 0 0",
  color: "#777",
  fontSize: "13px",
};

const rowLabelStyle = {
  margin: "0 0 6px",
  fontSize: "10px",
  letterSpacing: "1.6px",
  textTransform: "uppercase" as const,
  opacity: 0.45,
  fontWeight: 900,
};

const badgeStyle = {
  display: "inline-flex",
  background: "#eee",
  color: "#111",
  borderRadius: "999px",
  padding: "8px 10px",
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const releasedBadgeStyle = {
  background: "#111",
  color: "#fff",
};

const pendingBadgeStyle = {
  background: "#f1efe8",
  color: "#111",
};

const dangerBadgeStyle = {
  background: "#fee2e2",
  color: "#991b1b",
};