"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { createNotification } from "@/lib/createNotification";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "buying" | "selling">("all");

  const [reviewOrder, setReviewOrder] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [savingReview, setSavingReview] = useState(false);

  const [trackingOrder, setTrackingOrder] = useState<any>(null);
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [savingTracking, setSavingTracking] = useState(false);

  useEffect(() => {
    loadOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => loadOrders()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => loadOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadOrders = async () => {
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
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (error || !data) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const enriched = await Promise.all(
      data.map(async (order) => {
        const { data: product } = await supabase
          .from("products")
          .select("*")
          .eq("id", order.product_id)
          .maybeSingle();

        const { data: review } = await supabase
          .from("reviews")
          .select("*")
          .eq("order_id", order.id)
          .maybeSingle();

        return { ...order, product, review };
      })
    );

    setOrders(enriched);
    setLoading(false);
  };

  const updateOrderStatus = async (order: any, status: string) => {
    const confirmUpdate = confirm(`Mark this order as ${status}?`);
    if (!confirmUpdate) return;

    const payload: any = { status };

    if (status === "delivered") payload.delivered_at = new Date().toISOString();
    if (status === "completed") payload.completed_at = new Date().toISOString();

    const { error } = await supabase
      .from("orders")
      .update(payload)
      .eq("id", order.id);

    if (error) {
      alert(error.message);
      return;
    }

    if (status === "delivered") {
      await createNotification({
        user_id: order.seller_id,
        title: "Order delivered",
        message: "The buyer marked the order as delivered.",
        link: "/orders",
      });
    }

    if (status === "completed") {
      await createNotification({
        user_id: order.buyer_id,
        title: "Order completed",
        message: "Your order has been completed.",
        link: "/orders",
      });
    }

    await loadOrders();
  };

  const openTrackingModal = (order: any) => {
    setTrackingOrder(order);
    setCarrier(order.carrier || "");
    setTrackingNumber(order.tracking_number || "");
  };

  const saveTracking = async () => {
    if (!trackingOrder) return;

    if (!carrier.trim() || !trackingNumber.trim()) {
      alert("Introduce carrier y tracking number");
      return;
    }

    try {
      setSavingTracking(true);

      const { error } = await supabase
        .from("orders")
        .update({
          status: "shipped",
          carrier: carrier.trim(),
          tracking_number: trackingNumber.trim(),
          shipped_at: new Date().toISOString(),
        })
        .eq("id", trackingOrder.id);

      if (error) {
        alert(error.message);
        return;
      }

      await createNotification({
        user_id: trackingOrder.buyer_id,
        title: "Order shipped",
        message: `Your order has been shipped with ${carrier.trim()}. Tracking: ${trackingNumber.trim()}`,
        link: "/orders",
      });

      setTrackingOrder(null);
      setCarrier("");
      setTrackingNumber("");
      await loadOrders();
    } finally {
      setSavingTracking(false);
    }
  };

  const submitReview = async () => {
    if (!reviewOrder) return;

    if (!comment.trim()) {
      alert("Write a short review");
      return;
    }

    try {
      setSavingReview(true);

      const { error } = await supabase.from("reviews").insert([
        {
          order_id: reviewOrder.id,
          product_id: reviewOrder.product_id,
          seller_id: reviewOrder.seller_id,
          buyer_id: reviewOrder.buyer_id,
          rating,
          comment: comment.trim(),
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      await createNotification({
        user_id: reviewOrder.seller_id,
        title: "New review received",
        message: `You received a ${rating}-star review.`,
        link: `/seller/${reviewOrder.seller_id}`,
      });

      setReviewOrder(null);
      setRating(5);
      setComment("");
      await loadOrders();
    } finally {
      setSavingReview(false);
    }
  };

  const safeImage = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status: string) => {
    if (status === "paid") return "Paid";
    if (status === "shipped") return "Shipped";
    if (status === "delivered") return "Delivered";
    if (status === "completed") return "Completed";
    return status || "Paid";
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "buying") return order.buyer_id === userId;
    if (filter === "selling") return order.seller_id === userId;
    return true;
  });

  if (loading) {
    return <main style={pageStyle}>Loading orders...</main>;
  }

  return (
    <main style={pageStyle} className="orders-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV ORDERS</p>
        <h1 style={titleStyle} className="orders-title">Orders</h1>
        <p style={subtitleStyle}>Track your purchases and sales.</p>

        <div style={tabsStyle} className="orders-tabs">
          <button
            onClick={() => setFilter("all")}
            style={{ ...tabButtonStyle, ...(filter === "all" ? activeTabStyle : {}) }}
          >
            All
          </button>

          <button
            onClick={() => setFilter("buying")}
            style={{ ...tabButtonStyle, ...(filter === "buying" ? activeTabStyle : {}) }}
          >
            Buying
          </button>

          <button
            onClick={() => setFilter("selling")}
            style={{ ...tabButtonStyle, ...(filter === "selling" ? activeTabStyle : {}) }}
          >
            Selling
          </button>
        </div>
      </section>

      {filteredOrders.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={{ fontSize: "32px", margin: 0 }}>No orders yet</h2>
          <p style={{ color: "#666", marginTop: "12px" }}>
            Your purchases and sales will appear here.
          </p>
        </section>
      ) : (
        <section style={listStyle}>
          {filteredOrders.map((order) => {
            const isSeller = order.seller_id === userId;
            const isBuyer = order.buyer_id === userId;
            const status = order.status || "paid";

            return (
              <article key={order.id} style={orderStyle} className="order-card">
                <div style={imageWrapperStyle}>
                  <Image
                    src={safeImage(order.product?.image)}
                    alt={order.product?.title || "Product"}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <p style={metaStyle}>{isSeller ? "Sale" : "Purchase"}</p>

                  <h2 style={orderTitleStyle}>
                    {order.product?.title || "Product"}
                  </h2>

                  <p style={buyerStyle}>
                    {isSeller ? "Buyer" : "Seller"} · {formatDate(order.created_at)}
                  </p>

                  {(order.carrier || order.tracking_number) && (
                    <div style={trackingBoxStyle}>
                      <strong>Tracking</strong>
                      <span>{order.carrier || "Carrier"} · {order.tracking_number}</span>
                      {order.shipped_at && <small>Shipped {formatDate(order.shipped_at)}</small>}
                    </div>
                  )}

                  {order.review && (
                    <p style={reviewPreviewStyle}>
                      {"★".repeat(order.review.rating)}
                      {"☆".repeat(5 - order.review.rating)} · {order.review.comment}
                    </p>
                  )}

                  <div style={stepsStyle} className="order-steps">
                    {["paid", "shipped", "delivered", "completed"].map((step) => {
                      const stepOrder = ["paid", "shipped", "delivered", "completed"];
                      const currentIndex = stepOrder.indexOf(status);
                      const stepIndex = stepOrder.indexOf(step);
                      const active = stepIndex <= currentIndex;

                      return (
                        <span
                          key={step}
                          style={{
                            ...stepStyle,
                            ...(active ? activeStepStyle : {}),
                          }}
                        >
                          {getStatusLabel(step)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div style={rightStyle}>
                  <strong style={amountStyle}>€{order.amount}</strong>

                  <span style={statusStyle}>{getStatusLabel(status)}</span>

                  {isSeller && (
  <div style={payoutBoxStyle}>
    <div style={payoutRowStyle}>
      <span>Sale price</span>
      <strong>€{order.amount}</strong>
    </div>

    <div style={payoutRowStyle}>
      <span>ATHMOV fee</span>
      <strong>-€{order.platform_fee || 0}</strong>
    </div>

    <div style={payoutRowStyle}>
      <span>Stripe estimate</span>
      <strong>-€{order.stripe_fee_estimate || 0}</strong>
    </div>

    <div style={payoutNetRowStyle}>
      <span>Seller payout</span>
      <strong>€{order.seller_amount || 0}</strong>
    </div>
  </div>
)}

                  {isSeller && status === "paid" && (
                    <button
                      onClick={() => openTrackingModal(order)}
                      style={buttonStyle}
                    >
                      Add tracking
                    </button>
                  )}

                  {isSeller && status === "shipped" && (
                    <button
                      onClick={() => openTrackingModal(order)}
                      style={reviewButtonStyle}
                    >
                      Edit tracking
                    </button>
                  )}

                  {isBuyer && status === "shipped" && (
                    <button
                      onClick={() => updateOrderStatus(order, "delivered")}
                      style={buttonStyle}
                    >
                      Mark delivered
                    </button>
                  )}

                  {isSeller && status === "delivered" && (
                    <button
                      onClick={() => updateOrderStatus(order, "completed")}
                      style={buttonStyle}
                    >
                      Complete
                    </button>
                  )}

                  {isBuyer && status === "completed" && !order.review && (
                    <button
                      onClick={() => setReviewOrder(order)}
                      style={reviewButtonStyle}
                    >
                      Leave review
                    </button>
                  )}

                  {order.review && <span style={reviewedStyle}>Reviewed</span>}
                </div>
              </article>
            );
          })}
        </section>
      )}

      {trackingOrder && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setTrackingOrder(null)}
              style={closeButtonStyle}
            >
              ✕
            </button>

            <p style={eyebrowStyle}>ATHMOV SHIPPING</p>
            <h2 style={modalTitleStyle}>Add tracking</h2>
            <p style={modalTextStyle}>
              {trackingOrder.product?.title || "Product"}
            </p>

            <input
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Carrier, e.g. Correos, DHL, UPS"
              style={modalInputStyle}
            />

            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Tracking number"
              style={modalInputStyle}
            />

            <button onClick={saveTracking} style={buttonStyle}>
              {savingTracking ? "Saving..." : "Save tracking"}
            </button>
          </div>
        </div>
      )}

      {reviewOrder && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setReviewOrder(null)}
              style={closeButtonStyle}
            >
              ✕
            </button>

            <p style={eyebrowStyle}>ATHMOV REVIEW</p>
            <h2 style={modalTitleStyle}>Review your purchase</h2>

            <p style={modalTextStyle}>
              {reviewOrder.product?.title || "Product"}
            </p>

            <div style={starsStyle}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    ...starButtonStyle,
                    opacity: star <= rating ? 1 : 0.25,
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience with this seller..."
              style={textareaStyle}
            />

            <button onClick={submitReview} style={buttonStyle}>
              {savingReview ? "Saving..." : "Submit review"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .order-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .order-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 90px rgba(0,0,0,0.07) !important;
        }

        @media (max-width: 800px) {
          .orders-page {
            padding: 120px 18px 34px !important;
          }

          .orders-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .orders-tabs {
            overflow-x: auto !important;
            padding-bottom: 6px !important;
          }

          .order-card {
            align-items: flex-start !important;
            gap: 14px !important;
            padding: 14px !important;
          }

          .order-steps {
            flex-wrap: wrap !important;
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

const headerStyle = {
  maxWidth: "1100px",
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
  marginTop: "16px",
};

const tabsStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "28px",
};

const tabButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "12px 18px",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "1.2px",
  cursor: "pointer",
};

const activeTabStyle = {
  background: "#111",
  color: "#fff",
};

const emptyStyle = {
  maxWidth: "760px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "54px",
  borderRadius: "34px",
  textAlign: "center" as const,
};

const listStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const orderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "22px",
  background: "rgba(255,255,255,0.82)",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "30px",
  padding: "20px",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  width: "110px",
  height: "110px",
  borderRadius: "24px",
  overflow: "hidden",
  background: "#f6f6f3",
  flexShrink: 0,
};

const metaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  textTransform: "uppercase" as const,
  marginBottom: "8px",
};

const orderTitleStyle = {
  fontSize: "26px",
  margin: 0,
  letterSpacing: "-1px",
};

const buyerStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: 0,
};

const trackingBoxStyle = {
  marginTop: "14px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: "18px",
  padding: "12px 14px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "4px",
  fontSize: "13px",
  color: "#555",
  maxWidth: "420px",
};

const reviewPreviewStyle = {
  color: "#111",
  marginTop: "10px",
  marginBottom: 0,
  fontSize: "13px",
  fontWeight: 700,
};

const stepsStyle = {
  display: "flex",
  gap: "8px",
  marginTop: "16px",
};

const stepStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  color: "#999",
  background: "#fff",
  borderRadius: "999px",
  padding: "7px 10px",
  fontSize: "10px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const activeStepStyle = {
  background: "#111",
  color: "#fff",
  border: "1px solid #111",
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "10px",
};

const amountStyle = {
  fontSize: "28px",
};

const statusStyle = {
  fontSize: "13px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
  opacity: 0.6,
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const reviewButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const reviewedStyle = {
  fontSize: "11px",
  fontWeight: 900,
  opacity: 0.5,
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const modalOverlayStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const modalStyle = {
  position: "relative" as const,
  background: "#fff",
  borderRadius: "34px",
  padding: "42px",
  maxWidth: "560px",
  width: "100%",
  boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
};

const closeButtonStyle = {
  position: "absolute" as const,
  top: "18px",
  right: "18px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  width: "38px",
  height: "38px",
  cursor: "pointer",
};

const modalTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const modalTextStyle = {
  color: "#666",
  marginTop: "12px",
};

const modalInputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "16px 18px",
  fontSize: "15px",
  outline: "none",
  marginTop: "16px",
  boxSizing: "border-box" as const,
};

const starsStyle = {
  display: "flex",
  gap: "8px",
  marginTop: "26px",
  marginBottom: "22px",
};

const starButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "36px",
  cursor: "pointer",
  color: "#111",
};

const textareaStyle = {
  width: "100%",
  minHeight: "130px",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "22px",
  padding: "18px",
  fontSize: "15px",
  outline: "none",
  resize: "none" as const,
  marginBottom: "22px",
  boxSizing: "border-box" as const,
};

const payoutBoxStyle = {
  width: "220px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "14px",
  display: "grid",
  gap: "8px",
};

const payoutRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  fontSize: "12px",
  color: "#666",
};

const payoutNetRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  fontSize: "13px",
  fontWeight: 900,
  color: "#111",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  paddingTop: "10px",
  marginTop: "4px",
};