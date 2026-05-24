"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [refundingId, setRefundingId] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    setLoading(true);

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (ordersError) console.log("Orders error:", ordersError.message);

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (productsError) console.log("Products error:", productsError.message);

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .eq("verification_status", "pending");

    if (profilesError) console.log("Profiles error:", profilesError.message);

    setOrders(ordersData || []);
    setProducts(productsData || []);
    setProfiles(profilesData || []);
    setLoading(false);
  };

  const refundOrder = async (order: any) => {
    const confirmRefund = confirm(
      `Refund this order of €${order.amount}? This action cannot be undone.`
    );

    if (!confirmRefund) return;

    try {
      setRefundingId(order.id);

      const response = await fetch("/api/stripe/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Refund failed");
        return;
      }

      alert("Refund completed");
      await loadAdmin();
    } catch (error) {
      console.log(error);
      alert("Refund failed");
    } finally {
      setRefundingId("");
    }
  };

  const totalSales = orders.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );

  const athmovFees = orders.reduce(
    (acc, item) => acc + Number(item.platform_fee || 0),
    0
  );

  const sellerPayouts = orders.reduce(
    (acc, item) => acc + Number(item.seller_amount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status !== "completed"
  ).length;

  const openDisputes = orders.filter(
    (order) => order.dispute_status === "open"
  );

  if (loading) {
    return <main style={pageStyle}>Loading admin...</main>;
  }

  return (
    <main style={pageStyle} className="admin-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV ADMIN</p>

        <h1 style={titleStyle} className="admin-title">
          Marketplace Control
        </h1>

        <p style={subtitleStyle}>
          Revenue, orders, products and marketplace performance.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={labelStyle}>Gross Sales</p>
          <h2 style={valueStyle}>€{totalSales}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>ATHMOV Fees</p>
          <h2 style={valueStyle}>€{athmovFees}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Seller Payouts</p>
          <h2 style={valueStyle}>€{sellerPayouts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Orders</p>
          <h2 style={valueStyle}>{orders.length}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Pending Orders</p>
          <h2 style={valueStyle}>{pendingOrders}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Products</p>
          <h2 style={valueStyle}>{products.length}</h2>
        </div>
      </section>

      <section style={actionsStyle}>
        <Link href="/orders" style={buttonStyle}>
          View Orders
        </Link>

        <Link href="/products" style={buttonStyle}>
          View Marketplace
        </Link>

        <Link href="/dashboard" style={buttonStyle}>
          Seller Dashboard
        </Link>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Pending Seller Verifications</h2>
        </div>

        {profiles.length === 0 ? (
          <div style={emptyStyle}>No pending verifications.</div>
        ) : (
          <div style={listStyle}>
            {profiles.map((profile) => (
              <article key={profile.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>SELLER VERIFICATION</p>

                  <h3 style={rowTitleStyle}>
                    {profile.full_name || profile.username || profile.email}
                  </h3>

                  {profile.verification_document && (
                    <a
                      href={profile.verification_document}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={smallLinkStyle}
                    >
                      View document →
                    </a>
                  )}
                </div>

                <button
                  style={buttonStyle}
                  onClick={async () => {
                    await supabase
                      .from("profiles")
                      .update({
                        verification_status: "verified",
                        seller_verified: true,
                        seller_verified_at: new Date().toISOString(),
                        seller_level: "trusted",
                        seller_badge: "trusted",
                      })
                      .eq("id", profile.id);

                    await loadAdmin();
                  }}
                >
                  Approve
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>No orders yet.</div>
        ) : (
          <div style={listStyle}>
            {orders.slice(0, 12).map((order) => (
              <article key={order.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>ORDER</p>
                  <h3 style={rowTitleStyle}>€{order.amount}</h3>

                  <p style={rowTextStyle}>
                    ATHMOV fee: €{order.platform_fee || 0} · Seller payout: €
                    {order.seller_amount || 0}
                  </p>

                  <p style={rowTextStyle}>
                    Payment: {order.payment_status || "pending"} · Transfer:{" "}
                    {order.transfer_status || "pending"}
                  </p>
                </div>

                <div style={rowActionsStyle}>
                  <span style={statusStyle}>{order.status || "paid"}</span>

                  {order.payment_status !== "refunded" &&
                    order.stripe_payment_intent && (
                      <button
                        onClick={() => refundOrder(order)}
                        style={dangerButtonStyle}
                        disabled={refundingId === order.id}
                      >
                        {refundingId === order.id ? "Refunding..." : "Refund"}
                      </button>
                    )}

                  {order.payment_status === "refunded" && (
                    <span style={refundedStyle}>Refunded</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Open Disputes</h2>
        </div>

        {openDisputes.length === 0 ? (
          <div style={emptyStyle}>No disputes open.</div>
        ) : (
          <div style={listStyle}>
            {openDisputes.map((order) => (
              <article key={order.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>DISPUTE</p>
                  <h3 style={rowTitleStyle}>Order €{order.amount}</h3>
                  <p style={rowTextStyle}>{order.dispute_reason}</p>
                </div>

                <div style={rowActionsStyle}>
                  <button
                    style={buttonStyle}
                    onClick={async () => {
                      await supabase
                        .from("orders")
                        .update({
                          dispute_status: "resolved",
                          dispute_resolved_at: new Date().toISOString(),
                          dispute_resolution: "Resolved by admin",
                        })
                        .eq("id", order.id);

                      await loadAdmin();
                    }}
                  >
                    Resolve
                  </button>

                  <button
                    style={dangerButtonStyle}
                    onClick={async () => {
                      await supabase
                        .from("orders")
                        .update({
                          dispute_status: "refunded",
                          status: "refunded",
                        })
                        .eq("id", order.id);

                      await fetch("/api/stripe/refund", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: order.id }),
                      });

                      await loadAdmin();
                    }}
                  >
                    Refund buyer
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Product Moderation</h2>
        </div>

        {products.length === 0 ? (
          <div style={emptyStyle}>No products yet.</div>
        ) : (
          <div style={listStyle}>
            {products.slice(0, 30).map((product) => (
              <article key={product.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>
                    PRODUCT · {product.moderation_status || "pending"}
                    {product.featured ? " · FEATURED" : ""}
                  </p>

                  <h3 style={rowTitleStyle}>{product.title || "Product"}</h3>

                  <p style={rowTextStyle}>
                    €{product.price} · {product.brand || "Brand"} ·{" "}
                    {product.category || product.sport || "Category"}
                  </p>
                </div>

                <div style={rowActionsStyle}>
                  <Link href={`/products/${product.id}`} style={smallLinkStyle}>
                    Open →
                  </Link>

                  <button
                    style={buttonStyle}
                    onClick={async () => {
                      await supabase
                        .from("products")
                        .update({
                          moderation_status: "approved",
                          approved_at: new Date().toISOString(),
                        })
                        .eq("id", product.id);

                      await loadAdmin();
                    }}
                  >
                    Approve
                  </button>

                  <button
                    style={dangerButtonStyle}
                    onClick={async () => {
                      await supabase
                        .from("products")
                        .update({
                          moderation_status: "rejected",
                          moderation_reason: "Rejected by admin",
                        })
                        .eq("id", product.id);

                      await loadAdmin();
                    }}
                  >
                    Reject
                  </button>

                  {product.featured ? (
                    <button
                      style={buttonStyle}
                      onClick={async () => {
                        await supabase
                          .from("products")
                          .update({
                            featured: false,
                            featured_at: null,
                          })
                          .eq("id", product.id);

                        await loadAdmin();
                      }}
                    >
                      Unfeature
                    </button>
                  ) : (
                    <button
                      style={buttonStyle}
                      onClick={async () => {
                        await supabase
                          .from("products")
                          .update({
                            featured: true,
                            featured_at: new Date().toISOString(),
                            moderation_status: "approved",
                            approved_at: new Date().toISOString(),
                          })
                          .eq("id", product.id);

                        await loadAdmin();
                      }}
                    >
                      Feature
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .admin-page {
            padding: 120px 18px 34px !important;
          }

          .admin-title {
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
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const labelStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const valueStyle = {
  fontSize: "42px",
  marginTop: "18px",
  marginBottom: 0,
  letterSpacing: "-2px",
};

const actionsStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "15px 22px",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "13px",
  letterSpacing: "1px",
  cursor: "pointer",
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "50px auto 0",
};

const sectionHeaderStyle = {
  marginBottom: "24px",
};

const sectionTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
};

const listStyle = {
  display: "grid",
  gap: "16px",
};

const rowStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const rowMetaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "8px",
  textTransform: "uppercase" as const,
};

const rowTitleStyle = {
  fontSize: "30px",
  margin: 0,
  letterSpacing: "-1px",
};

const rowTextStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: 0,
};

const rowActionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap" as const,
  justifyContent: "flex-end",
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

const dangerButtonStyle = {
  background: "#b91c1c",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "15px 22px",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
  textTransform: "uppercase" as const,
};

const refundedStyle = {
  background: "#f3f3f3",
  color: "#555",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const smallLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 900,
};