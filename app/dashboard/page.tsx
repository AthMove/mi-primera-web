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

    const sales =
      orders?.filter((o: any) => o.status === "completed").length || 0;

    const activeOrders =
      orders?.filter(
        (o: any) =>
          o.status === "paid" ||
          o.status === "shipped" ||
          o.status === "delivered"
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

  if (loading) {
    return <main style={loadingStyle}>Loading dashboard...</main>;
  }

  return (
    <main style={pageStyle} className="dashboard-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV WALLET</p>

        <h1 style={titleStyle} className="dashboard-title">
          Seller Earnings
        </h1>

        <p style={subtitleStyle}>
          Track your sales, pending balance, available balance and marketplace
          fees.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={cardLabelStyle}>Available Balance</p>
          <h2 style={cardValueStyle}>€{stats.availableEarnings}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Pending Balance</p>
          <h2 style={cardValueStyle}>€{stats.pendingEarnings}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Total Earnings</p>
          <h2 style={cardValueStyle}>€{stats.sellerEarnings}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Gross Sales</p>
          <h2 style={cardValueStyle}>€{stats.grossRevenue}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>ATHMOV Fees</p>
          <h2 style={cardValueStyle}>€{stats.platformFees}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Stripe Estimate</p>
          <h2 style={cardValueStyle}>€{stats.stripeFees}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Completed Sales</p>
          <h2 style={cardValueStyle}>{stats.sales}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Active Orders</p>
          <h2 style={cardValueStyle}>{stats.activeOrders}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Active Products</p>
          <h2 style={cardValueStyle}>{stats.activeProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Pending Approval</p>
          <h2 style={cardValueStyle}>{stats.pendingProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Rejected Products</p>
          <h2 style={cardValueStyle}>{stats.rejectedProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Sold Products</p>
          <h2 style={cardValueStyle}>{stats.soldProducts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Rating</p>
          <h2 style={cardValueStyle}>★ {stats.averageRating}</h2>
        </div>
      </section>

      <section style={quickActionsStyle}>
        <Link href="/sell" style={actionButtonStyle}>
          Add Product
        </Link>

        <Link href="/orders" style={actionButtonStyle}>
          Orders
        </Link>

        <Link href="/products" style={actionButtonStyle}>
          Marketplace
        </Link>

        <Link href="/account" style={actionButtonStyle}>
          Account
        </Link>
      </section>

      <section style={recentSectionStyle}>
        <div style={recentHeaderStyle}>
          <h2 style={recentTitleStyle}>Recent Orders</h2>

          <Link href="/orders" style={viewAllStyle}>
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={emptyStyle}>No recent sales.</div>
        ) : (
          <div style={ordersListStyle}>
            {recentOrders.map((order: any) => (
              <div key={order.id} style={orderCardStyle}>
                <div>
                  <p style={orderMetaStyle}>ORDER</p>

                  <h3 style={orderPriceStyle}>€{order.amount}</h3>

                  <p style={orderDateStyle}>
                    Seller payout: €{order.seller_amount || 0}
                  </p>

                  <p style={orderDateStyle}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <span style={statusStyle}>{order.status}</span>
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