"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const [stats, setStats] = useState({
    totalSales: 0,
    pendingPayouts: 0,
    completedPayouts: 0,
    refunded: 0,
    ordersSold: 0,
    averageOrderValue: 0,
    activeProducts: 0,
    pendingProducts: 0,
    rejectedProducts: 0,
    soldProducts: 0,
    averageRating: 0,
    totalReviews: 0,
    trustScore: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    const { data: reviewsData } = await supabase
      .from("seller_reviews")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    const orders = ordersData || [];
    const products = productsData || [];
    const reviews = reviewsData || [];

    const paidOrders = orders.filter(
      (order: any) => order.payment_status === "paid"
    );

    const totalSales = paidOrders.reduce(
      (sum: number, order: any) => sum + Number(order.seller_amount || 0),
      0
    );

    const pendingPayouts = paidOrders
      .filter(
        (order: any) =>
          order.transfer_status !== "released" &&
          order.dispute_status !== "open"
      )
      .reduce(
        (sum: number, order: any) => sum + Number(order.seller_amount || 0),
        0
      );

    const completedPayouts = orders
      .filter((order: any) => order.transfer_status === "released")
      .reduce(
        (sum: number, order: any) => sum + Number(order.seller_amount || 0),
        0
      );

    const refunded = orders
      .filter((order: any) => order.payment_status === "refunded")
      .reduce(
        (sum: number, order: any) => sum + Number(order.refund_amount || 0),
        0
      );

    const ordersSold = paidOrders.length;

    const activeProducts = products.filter(
      (p: any) => !p.sold && p.moderation_status === "approved"
    ).length;

    const pendingProducts = products.filter(
      (p: any) => p.moderation_status === "pending"
    ).length;

    const rejectedProducts = products.filter(
      (p: any) => p.moderation_status === "rejected"
    ).length;

    const soldProducts = products.filter((p: any) => p.sold).length;

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (acc: number, item: any) => acc + Number(item.rating || 0),
            0
          ) / reviews.length
        : 0;

    const trustScore = Math.min(
      100,
      Math.round(
        (profileData?.seller_verified ? 35 : 0) +
          Math.min(25, ordersSold * 5) +
          Math.min(25, averageRating * 5) +
          Math.min(15, activeProducts * 3)
      )
    );

    const averageOrderValue = ordersSold > 0 ? totalSales / ordersSold : 0;

    setProfile(profileData);
    setOrders(orders);
    setProducts(products);
    setReviews(reviews);

    setStats({
      totalSales,
      pendingPayouts,
      completedPayouts,
      refunded,
      ordersSold,
      averageOrderValue,
      activeProducts,
      pendingProducts,
      rejectedProducts,
      soldProducts,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      trustScore,
    });

    setLoading(false);
  };

  const sellerLevel = profile?.seller_badge || profile?.seller_level || "nuevo";

  const getOrderStatusLabel = (status?: string) => {
    if (status === "pending") return "Pendiente";
    if (status === "paid") return "Pagado";
    if (status === "preparing") return "En preparación";
    if (status === "shipped") return "Enviado";
    if (status === "delivered") return "Entregado";
    if (status === "completed") return "Completado";
    if (status === "refunded") return "Reembolsado";
    return status || "Pendiente";
  };

  const getTransferStatusLabel = (status?: string) => {
    if (status === "pending") return "Pendiente";
    if (status === "released") return "Liberado";
    if (status === "cancelled") return "Cancelado";
    if (status === "refunded") return "Reembolsado";
    return status || "Pendiente";
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando panel de vendedor...</main>;
  }

  return (
    <main style={pageStyle} className="seller-dashboard-page">
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>ATHMOV VENDEDOR</p>

          <h1 style={titleStyle} className="seller-dashboard-title">
            Panel de vendedor
          </h1>

          <p style={subtitleStyle}>
            Controla tus ventas, pagos, nivel de vendedor y rendimiento dentro
            del marketplace.
          </p>

          <div style={heroBadgesStyle}>
            {profile?.seller_verified && (
              <span style={verifiedBadgeStyle}>VENDEDOR VERIFICADO ✓</span>
            )}

            <span style={levelBadgeStyle}>
              VENDEDOR {String(sellerLevel).toUpperCase()}
            </span>
          </div>
        </div>

        <div style={trustScoreCardStyle}>
          <p style={trustLabelStyle}>Puntuación de confianza</p>
          <h2 style={trustValueStyle}>{stats.trustScore}</h2>
          <p style={trustTextStyle}>
            Basada en verificación, ventas, valoraciones y productos activos.
          </p>
        </div>
      </section>

      <section style={walletStyle}>
        <div>
          <p style={eyebrowStyle}>ATHMOV WALLET</p>
          <h2 style={walletTitleStyle}>€{stats.pendingPayouts.toFixed(2)}</h2>
          <p style={walletTextStyle}>Saldo pendiente de liberar</p>
        </div>

        <div style={walletMiniGridStyle}>
          <div style={walletMiniCardStyle}>
            <span>Pagos liberados</span>
            <strong>€{stats.completedPayouts.toFixed(2)}</strong>
          </div>

          <div style={walletMiniCardStyle}>
            <span>Ventas totales</span>
            <strong>€{stats.totalSales.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <span style={labelStyle}>Pedidos vendidos</span>
          <strong style={valueStyle}>{stats.ordersSold}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Pedido medio</span>
          <strong style={valueStyle}>
            €{stats.averageOrderValue.toFixed(2)}
          </strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Valoración</span>
          <strong style={valueStyle}>★ {stats.averageRating}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Valoraciones</span>
          <strong style={valueStyle}>{stats.totalReviews}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Productos activos</span>
          <strong style={valueStyle}>{stats.activeProducts}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Pendientes de aprobar</span>
          <strong style={valueStyle}>{stats.pendingProducts}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Productos rechazados</span>
          <strong style={valueStyle}>{stats.rejectedProducts}</strong>
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Productos vendidos</span>
          <strong style={valueStyle}>{stats.soldProducts}</strong>
        </div>
      </section>

      <section style={insightsGridStyle}>
        <div style={panelStyle}>
          <p style={sectionEyebrowStyle}>CONFIANZA DEL VENDEDOR</p>
          <h2 style={sectionTitleStyle}>Rendimiento</h2>

          <div style={trustBarsStyle}>
            <div>
              <div style={barHeaderStyle}>
                <span>Verificación</span>
                <strong>
                  {profile?.seller_verified ? "Completa" : "Pendiente"}
                </strong>
              </div>
              <div style={barTrackStyle}>
                <div
                  style={{
                    ...barFillStyle,
                    width: profile?.seller_verified ? "100%" : "35%",
                  }}
                />
              </div>
            </div>

            <div>
              <div style={barHeaderStyle}>
                <span>Actividad del vendedor</span>
                <strong>{stats.activeProducts} activos</strong>
              </div>
              <div style={barTrackStyle}>
                <div
                  style={{
                    ...barFillStyle,
                    width: `${Math.min(100, stats.activeProducts * 20)}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div style={barHeaderStyle}>
                <span>Opiniones de compradores</span>
                <strong>★ {stats.averageRating}</strong>
              </div>
              <div style={barTrackStyle}>
                <div
                  style={{
                    ...barFillStyle,
                    width: `${Math.min(100, stats.averageRating * 20)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={panelStyle}>
          <p style={sectionEyebrowStyle}>ACCIONES DEL VENDEDOR</p>
          <h2 style={sectionTitleStyle}>Accesos rápidos</h2>

          <div style={quickActionsStyle}>
            <button
              onClick={() => (window.location.href = "/sell")}
              style={buttonStyle}
            >
              Añadir producto
            </button>

            <button
              onClick={() => (window.location.href = "/orders?filter=selling")}
              style={secondaryButtonStyle}
            >
              Ver pedidos
            </button>

            <button
              onClick={() => (window.location.href = "/verify")}
              style={secondaryButtonStyle}
            >
              Verificación
            </button>

            <button
              onClick={() => (window.location.href = "/account")}
              style={secondaryButtonStyle}
            >
              Cuenta
            </button>
          </div>
        </div>
      </section>

      <section style={ordersSectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}>VENTAS RECIENTES</p>
            <h2 style={sectionTitleStyle}>Últimos pedidos</h2>
          </div>

          <button
            onClick={() => (window.location.href = "/orders")}
            style={smallButtonStyle}
          >
            Ver todo →
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>Todavía no hay ventas.</div>
        ) : (
          <div style={ordersListStyle}>
            {orders.slice(0, 8).map((order: any) => (
              <div key={order.id} style={orderCardStyle}>
                <div>
                  <p style={orderMetaStyle}>PEDIDO</p>

                  <p style={orderAmountStyle}>
                    €{Number(order.seller_amount || 0).toFixed(2)}
                  </p>

                  <p style={orderTextStyle}>
                    Estado: {getOrderStatusLabel(order.status)} ·
                    Transferencia:{" "}
                    {getTransferStatusLabel(order.transfer_status)}
                  </p>
                </div>

                <div
                  style={{
                    ...badgeStyle,
                    ...(order.transfer_status === "released"
                      ? releasedBadgeStyle
                      : {}),
                  }}
                >
                  {getTransferStatusLabel(order.transfer_status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .seller-dashboard-page {
            padding: 120px 18px 40px !important;
          }

          .seller-dashboard-title {
            font-size: 48px !important;
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
  background: "#f6f3ee",
  fontFamily: "Inter, sans-serif",
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "140px 60px 80px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 34px",
  background: "#111",
  color: "#fff",
  borderRadius: "42px",
  padding: "46px",
  display: "flex",
  justifyContent: "space-between",
  gap: "28px",
  alignItems: "center",
  flexWrap: "wrap" as const,
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: "14px 0",
  letterSpacing: "-4px",
  fontWeight: 500,
};

const subtitleStyle = {
  color: "rgba(255,255,255,0.68)",
  maxWidth: "620px",
  lineHeight: 1.7,
};

const heroBadgesStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "22px",
};

const verifiedBadgeStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const levelBadgeStyle = {
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const trustScoreCardStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "30px",
  padding: "28px",
  minWidth: "220px",
};

const trustLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const trustValueStyle = {
  fontSize: "62px",
  margin: "10px 0",
  letterSpacing: "-3px",
};

const trustTextStyle = {
  color: "#666",
  lineHeight: 1.5,
  maxWidth: "220px",
};

const walletStyle = {
  maxWidth: "1200px",
  margin: "0 auto 28px",
  background: "#fff",
  borderRadius: "38px",
  padding: "36px",
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  flexWrap: "wrap" as const,
  border: "1px solid rgba(0,0,0,0.05)",
};

const walletTitleStyle = {
  fontSize: "64px",
  margin: "12px 0 6px",
  letterSpacing: "-4px",
};

const walletTextStyle = {
  color: "#666",
};

const walletMiniGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(180px, 1fr))",
  gap: "14px",
};

const walletMiniCardStyle = {
  background: "#f7f7f3",
  borderRadius: "24px",
  padding: "22px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
  fontWeight: 800,
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1.8px",
  color: "#666",
  marginBottom: "14px",
};

const valueStyle = {
  fontSize: "38px",
  fontWeight: 700,
  letterSpacing: "-2px",
};

const insightsGridStyle = {
  maxWidth: "1200px",
  margin: "34px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "22px",
};

const panelStyle = {
  background: "#fff",
  borderRadius: "34px",
  padding: "32px",
  border: "1px solid rgba(0,0,0,0.05)",
};

const sectionEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.45,
  marginBottom: "10px",
};

const sectionTitleStyle = {
  fontSize: "34px",
  margin: 0,
  letterSpacing: "-2px",
};

const trustBarsStyle = {
  display: "grid",
  gap: "22px",
  marginTop: "28px",
};

const barHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  marginBottom: "10px",
};

const barTrackStyle = {
  height: "8px",
  background: "#eeeeea",
  borderRadius: "999px",
  overflow: "hidden",
};

const barFillStyle = {
  height: "100%",
  background: "#111",
  borderRadius: "999px",
};

const quickActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "12px",
  marginTop: "28px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "14px 20px",
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "14px 20px",
  fontWeight: 900,
  cursor: "pointer",
};

const ordersSectionStyle = {
  maxWidth: "1200px",
  margin: "60px auto 0",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  marginBottom: "24px",
};

const smallButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 900,
  cursor: "pointer",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
  color: "#666",
};

const ordersListStyle = {
  display: "grid",
  gap: "16px",
};

const orderCardStyle = {
  background: "#fff",
  borderRadius: "26px",
  padding: "24px",
  border: "1px solid rgba(0,0,0,0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "18px",
};

const orderAmountStyle = {
  fontSize: "28px",
  fontWeight: 800,
  margin: 0,
};

const orderMetaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "8px",
};

const orderTextStyle = {
  color: "#666",
  marginTop: "8px",
  marginBottom: 0,
};

const badgeStyle = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  fontSize: "12px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
};

const releasedBadgeStyle = {
  background: "#111",
  color: "#fff",
};