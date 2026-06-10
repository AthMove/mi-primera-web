"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EarningsPage() {
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
      console.log("EARNINGS ERROR:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  const stats = useMemo(() => {
    const totalSales = orders.reduce(
      (sum, order) => sum + Number(order.amount || 0),
      0
    );

    const totalSellerEarnings = orders.reduce(
      (sum, order) => sum + Number(order.seller_amount || 0),
      0
    );

    const pendingRelease = orders
  .filter(
    (order) =>
      ["paid", "preparing", "shipped", "delivered", "completed"].includes(
        order.status
      ) && order.transfer_status !== "released"
  )
      .reduce((sum, order) => sum + Number(order.seller_amount || 0), 0);

    const released = orders
      .filter((order) => order.transfer_status === "released")
      .reduce((sum, order) => sum + Number(order.seller_amount || 0), 0);

    const platformFees = orders.reduce(
      (sum, order) => sum + Number(order.platform_fee || 0),
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

  if (loading) {
    return <main style={pageStyle}>Loading earnings...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV SELLER</p>
        <h1 style={titleStyle}>Earnings</h1>
        <p style={subtitleStyle}>
          Track your sales, pending payouts and released payments.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Total sales</p>
          <h2 style={statValueStyle}>{formatMoney(stats.totalSales)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Seller earnings</p>
          <h2 style={statValueStyle}>{formatMoney(stats.totalSellerEarnings)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Pending release</p>
          <h2 style={statValueStyle}>{formatMoney(stats.pendingRelease)}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Released</p>
          <h2 style={statValueStyle}>{formatMoney(stats.released)}</h2>
        </div>
      </section>

      <section style={summaryStyle}>
        <div>
          <p style={summaryLabelStyle}>Sales completed</p>
          <strong>{stats.salesCount}</strong>
        </div>

        <div>
          <p style={summaryLabelStyle}>ATHMOV fees generated</p>
          <strong>{formatMoney(stats.platformFees)}</strong>
        </div>
      </section>

      <section style={tableSectionStyle}>
        <div style={tableHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>PAYOUT HISTORY</p>
            <h2 style={sectionTitleStyle}>Orders & payouts</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>
            <h3>No earnings yet</h3>
            <p>Your sales and payouts will appear here.</p>
          </div>
        ) : (
          <div style={tableStyle}>
            {orders.map((order) => (
              <div key={order.id} style={rowStyle}>
                <div>
                  <p style={rowTitleStyle}>Order #{String(order.id).slice(0, 8)}</p>
                  <p style={rowMetaStyle}>{formatDate(order.created_at)}</p>
                </div>

                <div>
                  <p style={rowLabelStyle}>Sale</p>
                  <strong>{formatMoney(Number(order.amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>You receive</p>
                  <strong>{formatMoney(Number(order.seller_amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Status</p>
                  <span style={badgeStyle}>{order.status || "pending"}</span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Payout</p>
                  <span
                    style={{
                      ...badgeStyle,
                      ...(order.transfer_status === "released"
                        ? releasedBadgeStyle
                        : pendingBadgeStyle),
                    }}
                  >
                    {order.transfer_status || "pending"}
                  </span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Released at</p>
                  <strong>{formatDate(order.payout_released_at)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
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
  gridTemplateColumns: "repeat(4, 1fr)",
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