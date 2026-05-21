"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EarningsPage() {
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
      (order) => order.status === "completed"
    );

    const pending = sellerOrders.filter(
      (order) =>
        order.status === "paid" ||
        order.status === "shipped" ||
        order.status === "delivered"
    );

    const feeRate = 0.1;

    const totalRevenue = completed.reduce(
      (acc, order) => acc + Number(order.amount || 0),
      0
    );

    const pendingRevenue = pending.reduce(
      (acc, order) => acc + Number(order.amount || 0),
      0
    );

    const athmovFees = totalRevenue * feeRate;
    const availableBalance = totalRevenue - athmovFees;
    const pendingBalance = pendingRevenue * (1 - feeRate);

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

  const money = (value: number) => `€${value.toFixed(2)}`;

  if (loading) {
    return <main style={pageStyle}>Loading earnings...</main>;
  }

  return (
    <main style={pageStyle} className="earnings-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV EARNINGS</p>
        <h1 style={titleStyle} className="earnings-title">Earnings</h1>
        <p style={subtitleStyle}>
          Track seller revenue, pending balance and ATHMOV marketplace fees.
        </p>
      </section>

      <section style={balanceCardStyle}>
        <p style={balanceLabelStyle}>Available balance</p>
        <h2 style={balanceValueStyle}>{money(stats.availableBalance)}</h2>
        <p style={balanceTextStyle}>
          Available after completed orders. Stripe Connect payouts will be added
          here next.
        </p>

        <button style={withdrawButtonStyle} disabled>
          Withdraw coming soon
        </button>
      </section>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Total completed revenue</p>
          <h2 style={statValueStyle}>{money(stats.totalRevenue)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Pending balance</p>
          <h2 style={statValueStyle}>{money(stats.pendingBalance)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>ATHMOV fees</p>
          <h2 style={statValueStyle}>{money(stats.athmovFees)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Completed sales</p>
          <h2 style={statValueStyle}>{stats.completedSales}</h2>
        </div>
      </section>

      <section style={actionsStyle}>
        <Link href="/dashboard" style={actionButtonStyle}>
          Seller dashboard
        </Link>

        <Link href="/orders" style={actionButtonStyle}>
          Orders
        </Link>

        <Link href="/sell" style={actionButtonStyle}>
          Add product
        </Link>
      </section>

      <section style={historySectionStyle}>
        <h2 style={sectionTitleStyle}>Earnings history</h2>

        {orders.length === 0 ? (
          <div style={emptyStyle}>No seller orders yet.</div>
        ) : (
          <div style={listStyle}>
            {orders.map((order) => {
              const amount = Number(order.amount || 0);
              const fee = amount * 0.1;
              const net = amount - fee;

              return (
                <article key={order.id} style={orderCardStyle}>
                  <div>
                    <p style={orderMetaStyle}>ORDER</p>
                    <h3 style={orderAmountStyle}>{money(amount)}</h3>
                    <p style={orderDateStyle}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={rightStyle}>
                    <span style={statusStyle}>{order.status}</span>
                    <p style={netStyle}>Net: {money(net)}</p>
                    <p style={feeStyle}>Fee: {money(fee)}</p>
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