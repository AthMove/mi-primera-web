"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

function EarningsPageContent() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    availableBalance: 0,
    pendingBalance: 0,
    athmovFees: 0,
    completedSales: 0,
  });

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    const { supabase } = await import("@/lib/supabase");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    const sellerOrders = data || [];

    const completed = sellerOrders.filter(
      (order: any) =>
        order.status === "completed" ||
        order.transfer_status === "released"
    );

    const pending = sellerOrders.filter(
      (order: any) =>
        ["paid", "preparing", "shipped", "delivered"].includes(order.status) &&
        order.transfer_status !== "released"
    );

    const totalRevenue = completed.reduce(
      (acc: number, order: any) => acc + Number(order.amount || 0),
      0
    );

    const availableBalance = completed.reduce(
      (acc: number, order: any) => acc + Number(order.seller_amount || 0),
      0
    );

    const pendingBalance = pending.reduce(
      (acc: number, order: any) => acc + Number(order.seller_amount || 0),
      0
    );

    const athmovFees = sellerOrders.reduce(
      (acc: number, order: any) => acc + Number(order.platform_fee || 0),
      0
    );

    setStats({
      totalRevenue,
      availableBalance,
      pendingBalance,
      athmovFees,
      completedSales: completed.length,
    });

    setOrders(sellerOrders);
    setLoading(false);
  };

  const money = (value: number) => `€${Number(value || 0).toFixed(2)}`;

  const translateStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "paid":
        return "Pagado";
      case "preparing":
        return "Preparando";
      case "shipped":
        return "Enviado";
      case "delivered":
        return "Entregado";
      case "completed":
        return "Completado";
      case "refunded":
        return "Reembolsado";
      default:
        return status || "Pendiente";
    }
  };

  if (loading) {
    return <main style={pageStyle}>Cargando ganancias...</main>;
  }

  return (
    <main style={pageStyle} className="earnings-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>GANANCIAS ATHMOV</p>

        <h1 style={titleStyle} className="earnings-title">
          Ganancias
        </h1>

        <p style={subtitleStyle}>
          Consulta tus ingresos como vendedor, saldo pendiente, pagos liberados y
          comisiones del marketplace.
        </p>
      </section>

      <section style={balanceCardStyle}>
        <p style={balanceLabelStyle}>Saldo disponible</p>

        <h2 style={balanceValueStyle}>{money(stats.availableBalance)}</h2>

        <p style={balanceTextStyle}>
          Saldo correspondiente a pedidos completados o pagos ya liberados. Los
          pagos se gestionan mediante Stripe Connect.
        </p>

        <button style={withdrawButtonStyle} disabled>
          Retirada automática mediante Stripe
        </button>
      </section>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Ingresos completados</p>
          <h2 style={statValueStyle}>{money(stats.totalRevenue)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Saldo pendiente</p>
          <h2 style={statValueStyle}>{money(stats.pendingBalance)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Comisiones ATHMOV</p>
          <h2 style={statValueStyle}>{money(stats.athmovFees)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Ventas completadas</p>
          <h2 style={statValueStyle}>{stats.completedSales}</h2>
        </div>
      </section>

      <section style={actionsStyle}>
        <Link href="/dashboard" style={actionButtonStyle}>
          Panel de vendedor
        </Link>

        <Link href="/orders" style={actionButtonStyle}>
          Pedidos
        </Link>

        <Link href="/sell" style={actionButtonStyle}>
          Añadir producto
        </Link>
      </section>

      <section style={historySectionStyle}>
        <h2 style={sectionTitleStyle}>Historial de ganancias</h2>

        {orders.length === 0 ? (
          <div style={emptyStyle}>Todavía no tienes pedidos como vendedor.</div>
        ) : (
          <div style={listStyle}>
            {orders.map((order: any) => {
              const amount = Number(order.amount || 0);
              const fee = Number(order.platform_fee || 0);
              const net = Number(order.seller_amount || 0);

              return (
                <article key={order.id} style={orderCardStyle}>
                  <div>
                    <p style={orderMetaStyle}>PEDIDO</p>

                    <h3 style={orderAmountStyle}>{money(amount)}</h3>

                    <p style={orderDateStyle}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={rightStyle}>
                    <span style={statusStyle}>
                      {translateStatus(order.status)}
                    </span>

                    <p style={netStyle}>Neto: {money(net)}</p>

                    <p style={feeStyle}>Comisión: {money(fee)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 800px) {
          .earnings-page {
            padding: 120px 18px 34px !important;
          }

          .earnings-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 34px",
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
  letterSpacing: "-4px",
};

const subtitleStyle = {
  color: "#666",
  marginTop: "18px",
};

const balanceCardStyle = {
  maxWidth: "1200px",
  margin: "0 auto 24px",
  background: "#111",
  color: "#fff",
  borderRadius: "38px",
  padding: "46px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.14)",
};

const balanceLabelStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.55,
  marginBottom: "14px",
};

const balanceValueStyle = {
  fontSize: "76px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
};

const balanceTextStyle = {
  color: "rgba(255,255,255,0.65)",
  maxWidth: "560px",
  lineHeight: 1.7,
  marginTop: "18px",
};

const withdrawButtonStyle = {
  marginTop: "28px",
  background: "#fff",
  color: "#111",
  border: "none",
  borderRadius: "999px",
  padding: "16px 24px",
  fontWeight: 900,
  cursor: "not-allowed",
  opacity: 0.6,
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "20px",
};

const statCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const statLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const statValueStyle = {
  fontSize: "38px",
  marginTop: "14px",
  marginBottom: 0,
  letterSpacing: "-2px",
};

const actionsStyle = {
  maxWidth: "1200px",
  margin: "34px auto",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
};

const actionButtonStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "15px 22px",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "13px",
};

const historySectionStyle = {
  maxWidth: "1200px",
  margin: "44px auto 0",
};

const sectionTitleStyle = {
  fontSize: "42px",
  marginBottom: "24px",
  letterSpacing: "-2px",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "34px",
  color: "#666",
};

const listStyle = {
  display: "grid",
  gap: "18px",
};

const orderCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const orderMetaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
};

const orderAmountStyle = {
  fontSize: "34px",
  margin: "8px 0",
  letterSpacing: "-2px",
};

const orderDateStyle = {
  color: "#666",
  margin: 0,
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "6px",
};

const statusStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "10px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const netStyle = {
  margin: 0,
  fontWeight: 800,
};

const feeStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
};

export default dynamic(() => Promise.resolve(EarningsPageContent), {
  ssr: false,
});