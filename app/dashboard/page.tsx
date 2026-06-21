"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    grossRevenue: 0,
    sellerEarnings: 0,
    pendingEarnings: 0,
    availableEarnings: 0,
    platformFees: 0,
    stripeFees: 0,
    sales: 0,
    activeOrders: 0,
    activeProducts: 0,
    pendingProducts: 0,
    rejectedProducts: 0,
    soldProducts: 0,
    averageRating: 0,
    openDisputes: 0,
    heldAmount: 0,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const { supabase } = await import("@/lib/supabase");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id);

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user.id);

    const { data: reviews } = await supabase
      .from("reviews")
      .select("*")
      .eq("seller_id", user.id);

    const grossRevenue =
      orders?.reduce(
        (acc: number, item: any) => acc + Number(item.amount || 0),
        0
      ) || 0;

    const platformFees =
      orders?.reduce(
        (acc: number, item: any) => acc + Number(item.platform_fee || 0),
        0
      ) || 0;

    const stripeFees =
      orders?.reduce(
        (acc: number, item: any) =>
          acc + Number(item.stripe_fee_estimate || 0),
        0
      ) || 0;

    const sellerEarnings =
      orders?.reduce(
        (acc: number, item: any) => acc + Number(item.seller_amount || 0),
        0
      ) || 0;

    const pendingEarnings =
      orders
        ?.filter((o: any) => o.status !== "completed")
        .reduce(
          (acc: number, item: any) => acc + Number(item.seller_amount || 0),
          0
        ) || 0;

    const availableEarnings =
      orders
        ?.filter((o: any) => o.status === "completed")
        .reduce(
          (acc: number, item: any) => acc + Number(item.seller_amount || 0),
          0
        ) || 0;

    const openDisputes =
      orders?.filter((o: any) => o.dispute_status === "open").length || 0;

    const heldAmount =
      orders
        ?.filter((o: any) => o.dispute_status === "open")
        .reduce(
          (acc: number, item: any) => acc + Number(item.seller_amount || 0),
          0
        ) || 0;

    const sales =
      orders?.filter((o: any) => o.status === "completed").length || 0;

    const activeOrders =
      orders?.filter((o: any) =>
        ["paid", "preparing", "shipped", "delivered"].includes(o.status)
      ).length || 0;

    const activeProducts =
      products?.filter(
        (p: any) => !p.sold && p.moderation_status === "approved"
      ).length || 0;

    const pendingProducts =
      products?.filter((p: any) => p.moderation_status === "pending").length ||
      0;

    const rejectedProducts =
      products?.filter((p: any) => p.moderation_status === "rejected").length ||
      0;

    const soldProducts = products?.filter((p: any) => p.sold).length || 0;

    const averageRating =
      reviews && reviews.length > 0
        ? (
            reviews.reduce(
              (acc: number, item: any) => acc + Number(item.rating || 0),
              0
            ) / reviews.length
          ).toFixed(1)
        : "0";

    setStats({
      grossRevenue,
      sellerEarnings,
      pendingEarnings,
      availableEarnings,
      platformFees,
      stripeFees,
      sales,
      activeOrders,
      activeProducts,
      pendingProducts,
      rejectedProducts,
      soldProducts,
      averageRating: Number(averageRating),
      openDisputes,
      heldAmount,
    });

    setRecentOrders(
      (orders || [])
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 5)
    );

    setLoading(false);
  };

  const translateStatus = (status: string) => {
    switch (status) {
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
      case "pending":
        return "Pendiente";
      default:
        return status || "Pendiente";
    }
  };

  const formatMoney = (value: number) => {
    return `€${Number(value || 0).toFixed(2)}`;
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando panel...</main>;
  }

  return (
    <main style={pageStyle} className="dashboard-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV SELLER</p>

        <h1 style={titleStyle} className="dashboard-title">
          Panel de vendedor
        </h1>

        <p style={subtitleStyle}>
          Gestiona tus ventas, saldo pendiente, pagos liberados y rendimiento
          como vendedor.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={cardLabelStyle}>Saldo disponible</p>
          <h2 style={cardValueStyle}>
            {formatMoney(stats.availableEarnings)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Saldo pendiente</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.pendingEarnings)}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Ganancias totales</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.sellerEarnings)}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Ventas brutas</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.grossRevenue)}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Comisiones ATHMOV</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.platformFees)}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Comisión Stripe estimada</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.stripeFees)}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Ventas completadas</p>
          <h2 style={cardValueStyle}>{stats.sales}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Pedidos activos</p>
          <h2 style={cardValueStyle}>{stats.activeOrders}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Productos activos</p>
          <h2 style={cardValueStyle}>{stats.activeProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Pendientes de aprobación</p>
          <h2 style={cardValueStyle}>{stats.pendingProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Productos rechazados</p>
          <h2 style={cardValueStyle}>{stats.rejectedProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Productos vendidos</p>
          <h2 style={cardValueStyle}>{stats.soldProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Valoración media</p>
          <h2 style={cardValueStyle}>★ {stats.averageRating}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Disputas abiertas</p>
          <h2 style={cardValueStyle}>{stats.openDisputes}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Importe retenido</p>
          <h2 style={cardValueStyle}>{formatMoney(stats.heldAmount)}</h2>
        </div>
      </section>

      <section style={quickActionsStyle}>
        <Link href="/sell" style={actionButtonStyle}>
          Añadir producto
        </Link>

        <Link href="/orders" style={actionButtonStyle}>
          Pedidos
        </Link>

        <Link href="/products" style={actionButtonStyle}>
          Marketplace
        </Link>

        <Link href="/account" style={actionButtonStyle}>
          Mi cuenta
        </Link>
      </section>

      <section style={recentSectionStyle}>
        <div style={recentHeaderStyle}>
          <h2 style={recentTitleStyle}>Pedidos recientes</h2>

          <Link href="/orders" style={viewAllStyle}>
            Ver todos →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={emptyStyle}>Todavía no tienes ventas recientes.</div>
        ) : (
          <div style={ordersListStyle}>
            {recentOrders.map((order: any) => (
              <div key={order.id} style={orderCardStyle}>
                <div>
                  <p style={orderMetaStyle}>PEDIDO</p>

                  <h3 style={orderPriceStyle}>
                    {formatMoney(Number(order.amount || 0))}
                  </h3>

                  <p style={orderDateStyle}>
                    Pago al vendedor:{" "}
                    {formatMoney(Number(order.seller_amount || 0))}
                  </p>

                  <p style={orderDateStyle}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <span style={statusStyle}>
                  {translateStatus(order.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-page {
            padding: 120px 18px 34px !important;
          }

          .dashboard-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily: "Inter, sans-serif",
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 44px",
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
  lineHeight: 1.7,
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const cardLabelStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const cardValueStyle = {
  fontSize: "44px",
  marginTop: "18px",
  marginBottom: 0,
  letterSpacing: "-2px",
};

const quickActionsStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
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
  letterSpacing: "1px",
};

const recentSectionStyle = {
  maxWidth: "1200px",
  margin: "40px auto 0",
};

const recentHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const recentTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const viewAllStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 800,
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
};

const ordersListStyle = {
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
  marginBottom: "8px",
};

const orderPriceStyle = {
  fontSize: "34px",
  margin: 0,
  letterSpacing: "-2px",
};

const orderDateStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: 0,
};

const statusStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "11px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
};