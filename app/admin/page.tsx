"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [refundingId, setRefundingId] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);

  const { lang, t } = useLanguage();

  const locale =
    lang === "en"
      ? "en-GB"
      : lang === "pt"
        ? "pt-PT"
        : "es-ES";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(Number(value || 0));

  const getOrderStatusLabel = (status?: string) => {
    switch (status) {
      case "paid":
        return t.earningsStatusPaid;
      case "preparing":
        return t.earningsStatusPreparing;
      case "shipped":
        return t.earningsStatusShipped;
      case "delivered":
        return t.earningsStatusDelivered;
      case "completed":
        return t.earningsStatusCompleted;
      case "refunded":
        return t.earningsStatusRefunded;
      case "pending":
        return t.earningsStatusPending;
      default:
        return status || t.earningsStatusPending;
    }
  };

  const getPaymentStatusLabel = (status?: string) => {
    switch (status) {
      case "paid":
        return t.earningsStatusPaid;
      case "refunded":
        return t.earningsStatusRefunded;
      case "pending":
        return t.earningsStatusPending;
      default:
        return status || t.earningsStatusPending;
    }
  };

  const getTransferStatusLabel = (status?: string) => {
    switch (status) {
      case "released":
        return t.sellerPayoutsReleased;
      case "pending":
        return t.sellerPayoutsPending;
      case "cancelled":
        return t.sellerPayoutsCancelled;
      case "refunded":
        return t.sellerPayoutsRefunded;
      default:
        return status || t.sellerPayoutsPending;
    }
  };

  const getModerationStatusLabel = (status?: string) => {
    switch (status) {
      case "approved":
        return t.adminModerationApproved;
      case "rejected":
        return t.adminModerationRejected;
      case "pending":
        return t.adminModerationPending;
      default:
        return status || t.adminModerationPending;
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    setLoading(true);

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.log("Orders error:", ordersError.message);
    }

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (productsError) {
      console.log("Products error:", productsError.message);
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .eq("verification_status", "pending");

    if (profilesError) {
      console.log("Profiles error:", profilesError.message);
    }

    setOrders(ordersData || []);
    setProducts(productsData || []);
    setProfiles(profilesData || []);
    setLoading(false);
  };

  const refundOrder = async (order: any) => {
    const confirmRefund = confirm(
      `${t.adminRefundConfirm} ${formatCurrency(
        Number(order.amount || 0)
      )}. ${t.adminRefundIrreversible}`
    );

    if (!confirmRefund) return;

    try {
      setRefundingId(order.id);

      const response = await fetch("/api/stripe/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || t.adminRefundFailed);
        return;
      }

      alert(t.adminRefundCompleted);
      await loadAdmin();
    } catch (error) {
      console.log(error);
      alert(t.adminRefundFailed);
    } finally {
      setRefundingId("");
    }
  };

  const totalSales = orders.reduce(
    (acc: number, item: any) =>
      acc + Number(item.amount || 0),
    0
  );

  const athmovFees = orders.reduce(
    (acc: number, item: any) =>
      acc + Number(item.platform_fee || 0),
    0
  );

  const sellerPayouts = orders.reduce(
    (acc: number, item: any) =>
      acc + Number(item.seller_amount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order: any) => order.status !== "completed"
  ).length;

  const openDisputes = orders.filter(
    (order: any) =>
      order.dispute_status === "open"
  );

  if (loading) {
    return (
      <main style={pageStyle}>
        {t.adminLoading}
      </main>
    );
  }

  return (
    <main
      style={pageStyle}
      className="admin-page"
    >
      <section style={heroStyle}>
        <p style={eyebrowStyle}>
          {t.adminEyebrow}
        </p>

        <h1
          style={titleStyle}
          className="admin-title"
        >
          {t.adminTitle}
        </h1>

        <p style={subtitleStyle}>
          {t.adminSubtitle}
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminGrossSales}
          </p>

          <h2 style={valueStyle}>
            {formatCurrency(totalSales)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminFees}
          </p>

          <h2 style={valueStyle}>
            {formatCurrency(athmovFees)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminSellerPayouts}
          </p>

          <h2 style={valueStyle}>
            {formatCurrency(sellerPayouts)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminOrders}
          </p>

          <h2 style={valueStyle}>
            {orders.length}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminPendingOrders}
          </p>

          <h2 style={valueStyle}>
            {pendingOrders}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>
            {t.adminProducts}
          </p>

          <h2 style={valueStyle}>
            {products.length}
          </h2>
        </div>
      </section>

      <section style={actionsStyle}>
        <Link
          href="/orders"
          style={buttonStyle}
        >
          {t.adminViewOrders}
        </Link>

        <Link
          href="/products"
          style={buttonStyle}
        >
          {t.adminViewMarketplace}
        </Link>

        <Link
          href="/dashboard"
          style={buttonStyle}
        >
          {t.adminSellerDashboard}
        </Link>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            {t.adminPendingVerifications}
          </h2>
        </div>

        {profiles.length === 0 ? (
          <div style={emptyStyle}>
            {t.adminNoPendingVerifications}
          </div>
        ) : (
          <div style={listStyle}>
            {profiles.map((profile: any) => (
              <article
                key={profile.id}
                style={rowStyle}
              >
                <div>
                  <p style={rowMetaStyle}>
                    {t.adminSellerVerification}
                  </p>

                  <h3 style={rowTitleStyle}>
                    {profile.full_name ||
                      profile.username ||
                      profile.email}
                  </h3>

                  {profile.verification_document && (
                    <a
                      href={
                        profile.verification_document
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={smallLinkStyle}
                    >
                      {t.adminViewDocument} →
                    </a>
                  )}
                </div>

                <button
                  style={buttonStyle}
                  onClick={async () => {
                    await supabase
                      .from("profiles")
                      .update({
                        verification_status:
                          "verified",
                        seller_verified: true,
                        seller_verified_at:
                          new Date().toISOString(),
                        seller_level: "trusted",
                        seller_badge: "trusted",
                      })
                      .eq("id", profile.id);

                    await loadAdmin();
                  }}
                >
                  {t.adminApprove}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            {t.adminRecentOrders}
          </h2>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>
            {t.adminNoOrders}
          </div>
        ) : (
          <div style={listStyle}>
            {orders
              .slice(0, 12)
              .map((order: any) => (
                <article
                  key={order.id}
                  style={rowStyle}
                >
                  <div>
                    <p style={rowMetaStyle}>
                      {t.adminOrder}
                    </p>

                    <h3 style={rowTitleStyle}>
                      {formatCurrency(
                        Number(order.amount || 0)
                      )}
                    </h3>

                    <p style={rowTextStyle}>
                      {t.adminAthmovFee}:{" "}
                      {formatCurrency(
                        Number(
                          order.platform_fee || 0
                        )
                      )}
                      {" · "}
                      {t.adminSellerPayout}:{" "}
                      {formatCurrency(
                        Number(
                          order.seller_amount || 0
                        )
                      )}
                    </p>

                    <p style={rowTextStyle}>
                      {t.adminPayment}:{" "}
                      {getPaymentStatusLabel(
                        order.payment_status
                      )}
                      {" · "}
                      {t.adminTransfer}:{" "}
                      {getTransferStatusLabel(
                        order.transfer_status
                      )}
                    </p>
                  </div>

                  <div style={rowActionsStyle}>
                    <span style={statusStyle}>
                      {getOrderStatusLabel(
                        order.status || "paid"
                      )}
                    </span>

                    {order.payment_status !==
                      "refunded" &&
                      order.stripe_payment_intent && (
                        <button
                          onClick={() =>
                            refundOrder(order)
                          }
                          style={dangerButtonStyle}
                          disabled={
                            refundingId === order.id
                          }
                        >
                          {refundingId === order.id
                            ? t.adminRefunding
                            : t.adminRefund}
                        </button>
                      )}

                    {order.payment_status ===
                      "refunded" && (
                      <span style={refundedStyle}>
                        {t.adminRefunded}
                      </span>
                    )}
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            {t.adminOpenDisputes}
          </h2>
        </div>

        {openDisputes.length === 0 ? (
          <div style={emptyStyle}>
            {t.adminNoOpenDisputes}
          </div>
        ) : (
          <div style={listStyle}>
            {openDisputes.map((order: any) => (
              <article
                key={order.id}
                style={rowStyle}
              >
                <div>
                  <p style={rowMetaStyle}>
                    {t.adminDispute}
                  </p>

                  <h3 style={rowTitleStyle}>
                    {t.adminOrder}{" "}
                    {formatCurrency(
                      Number(order.amount || 0)
                    )}
                  </h3>

                  <p style={rowTextStyle}>
                    {order.dispute_reason}
                  </p>
                </div>

                <div style={rowActionsStyle}>
                  <button
                    style={buttonStyle}
                    onClick={async () => {
                      await supabase
                        .from("orders")
                        .update({
                          dispute_status:
                            "resolved",
                          dispute_resolved_at:
                            new Date().toISOString(),
                          dispute_resolution:
                            "Resolved by admin",
                        })
                        .eq("id", order.id);

                      await loadAdmin();
                    }}
                  >
                    {t.adminResolve}
                  </button>

                  <button
                    style={dangerButtonStyle}
                    onClick={async () => {
                      await supabase
                        .from("orders")
                        .update({
                          dispute_status:
                            "refunded",
                          status: "refunded",
                        })
                        .eq("id", order.id);

                      await fetch(
                        "/api/stripe/refund",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type":
                              "application/json",
                          },
                          body: JSON.stringify({
                            orderId: order.id,
                          }),
                        }
                      );

                      await loadAdmin();
                    }}
                  >
                    {t.adminRefundBuyer}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            {t.adminProductModeration}
          </h2>
        </div>

        {products.length === 0 ? (
          <div style={emptyStyle}>
            {t.adminNoProducts}
          </div>
        ) : (
          <div style={listStyle}>
            {products
              .slice(0, 30)
              .map((product: any) => (
                <article
                  key={product.id}
                  style={rowStyle}
                >
                  <div>
                    <p style={rowMetaStyle}>
                      {t.adminProduct} ·{" "}
                      {getModerationStatusLabel(
                        product.moderation_status
                      )}
                      {product.featured
                        ? ` · ${t.adminFeatured}`
                        : ""}
                    </p>

                    <h3 style={rowTitleStyle}>
                      {product.title ||
                        t.adminProduct}
                    </h3>

                    <p style={rowTextStyle}>
                      {formatCurrency(
                        Number(product.price || 0)
                      )}
                      {" · "}
                      {product.brand ||
                        t.adminBrand}
                      {" · "}
                      {product.category ||
                        product.sport ||
                        t.adminCategory}
                    </p>
                  </div>

                  <div style={rowActionsStyle}>
                    <Link
                      href={`/products/${product.id}`}
                      style={smallLinkStyle}
                    >
                      {t.adminOpen} →
                    </Link>

                    <button
                      style={buttonStyle}
                      onClick={async () => {
                        await supabase
                          .from("products")
                          .update({
                            moderation_status:
                              "approved",
                            approved_at:
                              new Date().toISOString(),
                          })
                          .eq("id", product.id);

                        await loadAdmin();
                      }}
                    >
                      {t.adminApprove}
                    </button>

                    <button
                      style={dangerButtonStyle}
                      onClick={async () => {
                        await supabase
                          .from("products")
                          .update({
                            moderation_status:
                              "rejected",
                            moderation_reason:
                              "Rejected by admin",
                          })
                          .eq("id", product.id);

                        await loadAdmin();
                      }}
                    >
                      {t.adminReject}
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
                            .eq(
                              "id",
                              product.id
                            );

                          await loadAdmin();
                        }}
                      >
                        {t.adminUnfeature}
                      </button>
                    ) : (
                      <button
                        style={buttonStyle}
                        onClick={async () => {
                          await supabase
                            .from("products")
                            .update({
                              featured: true,
                              featured_at:
                                new Date().toISOString(),
                              moderation_status:
                                "approved",
                              approved_at:
                                new Date().toISOString(),
                            })
                            .eq(
                              "id",
                              product.id
                            );

                          await loadAdmin();
                        }}
                      >
                        {t.adminFeature}
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
  background:
    "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
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
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow:
    "0 20px 70px rgba(0,0,0,0.04)",
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