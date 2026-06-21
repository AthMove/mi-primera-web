"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

function EarningsPageContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEarnings();
  }, []);

  async function loadEarnings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ERROR DE GANANCIAS:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  const stats = useMemo(() => {
    const totalSales = orders.reduce(
      (sum: number, order: any) => sum + Number(order.amount || 0),
      0
    );

    const totalSellerEarnings = orders.reduce(
      (sum: number, order: any) => sum + Number(order.seller_amount || 0),
      0
    );

    const pendingRelease = orders
      .filter(
        (order: any) =>
          ["paid", "preparing", "shipped", "delivered", "completed"].includes(
            order.status
          ) && order.transfer_status !== "released"
      )
      .reduce(
        (sum: number, order: any) => sum + Number(order.seller_amount || 0),
        0
      );

    const released = orders
      .filter((order: any) => order.transfer_status === "released")
      .reduce(
        (sum: number, order: any) => sum + Number(order.seller_amount || 0),
        0
      );

    const platformFees = orders.reduce(
      (sum: number, order: any) => sum + Number(order.platform_fee || 0),
      0
    );

    return {
      totalSales,
      totalSellerEarnings,
      pendingRelease,
      released,
      platformFees,
      salesCount: orders.length,
    };
  }, [orders]);

  const formatMoney = (value: number) => {
    return `€${value.toFixed(2)}`;
  };

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

  const getTransferStatusLabel = (status?: string) => {
    if (status === "released") return "Liberado";
    if (status === "pending") return "Pendiente";
    if (status === "cancelled") return "Cancelado";
    if (status === "refunded") return "Reembolsado";
    return status || "Pendiente";
  };

  if (loading) {
    return <main style={pageStyle}>Cargando ganancias...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>VENDEDOR ATHMOV</p>
        <h1 style={titleStyle}>Ganancias</h1>
        <p style={subtitleStyle}>
          Consulta tus ventas, pagos pendientes y pagos liberados.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Ventas totales</p>
          <h2 style={statValueStyle}>{formatMoney(stats.totalSales)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Ganancias del vendedor</p>
          <h2 style={statValueStyle}>
            {formatMoney(stats.totalSellerEarnings)}
          </h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Pendiente de liberar</p>
          <h2 style={statValueStyle}>{formatMoney(stats.pendingRelease)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Liberado</p>
          <h2 style={statValueStyle}>{formatMoney(stats.released)}</h2>
        </div>
      </section>

      <section style={summaryStyle}>
        <div>
          <p style={summaryLabelStyle}>Ventas completadas</p>
          <strong>{stats.salesCount}</strong>
        </div>

        <div>
          <p style={summaryLabelStyle}>Comisiones generadas para ATHMOV</p>
          <strong>{formatMoney(stats.platformFees)}</strong>
        </div>
      </section>

      <section style={tableSectionStyle}>
        <div style={tableHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>HISTORIAL DE PAGOS</p>
            <h2 style={sectionTitleStyle}>Pedidos y pagos</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>
            <h3>Todavía no tienes ganancias</h3>
            <p>Tus ventas y pagos aparecerán aquí.</p>
          </div>
        ) : (
          <div style={tableStyle}>
            {orders.map((order: any) => (
              <div key={order.id} style={rowStyle}>
                <div>
                  <p style={rowTitleStyle}>
                    Pedido #{String(order.id).slice(0, 8)}
                  </p>
                  <p style={rowMetaStyle}>{formatDate(order.created_at)}</p>
                </div>

                <div>
                  <p style={rowLabelStyle}>Venta</p>
                  <strong>{formatMoney(Number(order.amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Recibes</p>
                  <strong>
                    {formatMoney(Number(order.seller_amount || 0))}
                  </strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Estado</p>
                  <span style={badgeStyle}>{getStatusLabel(order.status)}</span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Pago</p>
                  <span
                    style={{
                      ...badgeStyle,
                      ...(order.transfer_status === "released"
                        ? releasedBadgeStyle
                        : pendingBadgeStyle),
                    }}
                  >
                    {getTransferStatusLabel(order.transfer_status)}
                  </span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Liberado el</p>
                  <strong>{formatDate(order.payout_released_at)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          main {
            padding: 120px 18px 40px !important;
          }

          section {
            max-width: 100% !important;
          }
        }

        @media (max-width: 1100px) {
          .earnings-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "150px 64px 90px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1100px",
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
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
};

const statCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const statLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  opacity: 0.45,
};

const statValueStyle = {
  fontSize: "32px",
  margin: "12px 0 0",
};

const summaryStyle = {
  maxWidth: "1100px",
  margin: "22px auto 0",
  background: "#111",
  color: "#fff",
  borderRadius: "28px",
  padding: "26px",
  display: "flex",
  gap: "50px",
  flexWrap: "wrap" as const,
};

const summaryLabelStyle = {
  margin: "0 0 8px",
  opacity: 0.55,
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const tableSectionStyle = {
  maxWidth: "1100px",
  margin: "46px auto 0",
};

const tableHeaderStyle = {
  marginBottom: "18px",
};

const sectionTitleStyle = {
  fontSize: "38px",
  margin: 0,
  letterSpacing: "-2px",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "42px",
  color: "#666",
};

const tableStyle = {
  display: "grid",
  gap: "12px",
};

const rowStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.05)",
  borderRadius: "24px",
  padding: "22px",
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr 1fr",
  gap: "16px",
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

export default dynamic(() => Promise.resolve(EarningsPageContent), {
  ssr: false,
});