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
      console.log("ADMIN FINANCE ERROR:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o) =>
      ["paid", "preparing", "shipped", "delivered", "completed"].includes(o.status)
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

  if (loading) {
    return <main style={pageStyle}>Loading finance...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV ADMIN</p>
        <h1 style={titleStyle}>Finance</h1>
        <p style={subtitleStyle}>
          Monitor marketplace volume, commissions, payouts and open risk.
        </p>
      </section>

      <section style={statsGridStyle}>
        <Card label="GMV" value={formatMoney(stats.gmv)} />
        <Card label="ATHMOV fees" value={formatMoney(stats.fees)} />
        <Card label="Seller earnings" value={formatMoney(stats.sellerEarnings)} />
        <Card label="Pending payouts" value={formatMoney(stats.pendingRelease)} />
        <Card label="Released payouts" value={formatMoney(stats.released)} />
        <Card label="Paid orders" value={String(stats.paidOrders)} />
        <Card label="Total orders" value={String(stats.totalOrders)} />
        <Card label="Open disputes" value={String(stats.disputes)} />
      </section>

      <section style={tableSectionStyle}>
        <p style={eyebrowStyle}>ORDER FINANCE</p>
        <h2 style={sectionTitleStyle}>Orders</h2>

        {orders.length === 0 ? (
          <div style={emptyStyle}>No orders yet.</div>
        ) : (
          <div style={tableStyle}>
            {orders.map((order) => (
              <div key={order.id} style={rowStyle}>
                <div>
                  <p style={rowTitleStyle}>#{String(order.id).slice(0, 8)}</p>
                  <p style={rowMetaStyle}>{formatDate(order.created_at)}</p>
                </div>

                <div>
                  <p style={rowLabelStyle}>Amount</p>
                  <strong>{formatMoney(Number(order.amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Fee</p>
                  <strong>{formatMoney(Number(order.platform_fee || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Seller</p>
                  <strong>{formatMoney(Number(order.seller_amount || 0))}</strong>
                </div>

                <div>
                  <p style={rowLabelStyle}>Status</p>
                  <span style={badgeStyle}>{order.status || "pending"}</span>
                </div>

                <div>
                  <p style={rowLabelStyle}>Transfer</p>
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
                  <p style={rowLabelStyle}>Dispute</p>
                  <span
                    style={{
                      ...badgeStyle,
                      ...(order.dispute_status === "open"
                        ? dangerBadgeStyle
                        : pendingBadgeStyle),
                    }}
                  >
                    {order.dispute_status || "none"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
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