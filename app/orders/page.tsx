"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

  const [disputeOrder, setDisputeOrder] = useState<any>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const [savingDispute, setSavingDispute] = useState(false);
  const [disputeFile, setDisputeFile] = useState<File | null>(null);

  const getSupabase = async () => {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  };

  const notify = async (payload: any) => {
    const { createNotification } = await import("@/lib/createNotification");
    return createNotification(payload);
  };

  useEffect(() => {
    let channel: any = null;
    let supabaseClient: any = null;

    const start = async () => {
      const supabase = await getSupabase();
      supabaseClient = supabase;

      await loadOrders();

      channel = supabase
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
    };

    start();

    return () => {
      if (supabaseClient && channel) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, []);

  const loadOrders = async () => {
    const supabase = await getSupabase();

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
      data.map(async (order: any) => {
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
    const supabase = await getSupabase();

    const confirmUpdate = confirm(`Mark this order as ${status}?`);
    if (!confirmUpdate) return;

    if (status === "completed" && order.dispute_status === "open") {
      alert("This order has an open dispute. Payout cannot be released yet.");
      return;
    }

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
      await notify({
        user_id: order.seller_id,
        title: "Order delivered",
        message: "The buyer marked the order as delivered.",
        link: "/orders",
      });
    }

    if (status === "completed") {
      await supabase.rpc("update_seller_reputation", {
        target_seller_id: order.seller_id,
      });


      await notify({
        user_id: order.buyer_id,
        title: "Order completed",
        message: "Your order has been completed.",
        link: "/orders",
      });

      await notify({
        user_id: order.seller_id,
        title: "Payout released",
        message: "Your payout has been released.",
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

    const supabase = await getSupabase();

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

      await notify({
        user_id: trackingOrder.buyer_id,
        title: "Order shipped",
        message: `Your order has been shipped with ${carrier.trim()}. Tracking: ${trackingNumber.trim()}`,
        link: "/orders",
      });
   const emailResponse = await fetch("/api/email/order-shipped", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId: trackingOrder.id,
  }),
});

const emailData = await emailResponse.json();

console.log("EMAIL STATUS:", emailResponse.status);
console.log("EMAIL DATA:", emailData);

if (!emailResponse.ok) {
  console.log("SHIPPED EMAIL ERROR:", emailData);
  alert(emailData.error || "Shipping email failed");
} else {
  console.log("SHIPPED EMAIL SENT:", emailData);
}

      setTrackingOrder(null);
      setCarrier("");
      setTrackingNumber("");
      await loadOrders();
    } finally {
      setSavingTracking(false);
    }
  };

  const openDispute = async () => {
    if (!disputeOrder) return;

    const supabase = await getSupabase();

    if (!disputeReason.trim()) {
      alert("Describe the issue");
      return;
    }

    try {
      setSavingDispute(true);

      let fileUrl = "";

      if (disputeFile) {
        const fileExt = disputeFile.name.split(".").pop();
        const fileName = `${disputeOrder.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("disputes")
          .upload(fileName, disputeFile);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("disputes")
          .getPublicUrl(fileName);

        fileUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("orders")
        .update({
          dispute_status: "open",
          dispute_reason: disputeReason.trim(),
          dispute_opened_at: new Date().toISOString(),
        })
        .eq("id", disputeOrder.id);

      if (error) {
        alert(error.message);
        return;
      }

      await supabase.from("dispute_evidence").insert([
        {
          order_id: disputeOrder.id,
          user_id: userId,
          message: disputeReason.trim(),
          file_url: fileUrl || null,
        },
      ]);

      await notify({
        user_id: disputeOrder.seller_id,
        title: "Dispute opened",
        message: "The buyer has reported an issue with the order.",
        link: "/orders",
      });

      await fetch("/api/email/dispute-opened", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId: disputeOrder.id,
  }),
});

      setDisputeOrder(null);
      setDisputeReason("");
      setDisputeFile(null);
      await loadOrders();
    } finally {
      setSavingDispute(false);
    }
  };

  const submitReview = async () => {
    if (!reviewOrder) return;

    const supabase = await getSupabase();

    if (!comment.trim()) {
      alert("Write a short review");
      return;
    }

    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("order_id", reviewOrder.id)
      .eq("buyer_id", reviewOrder.buyer_id)
      .maybeSingle();

    if (existingReview) {
      alert("You have already reviewed this order");
      setReviewOrder(null);
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

      await supabase.rpc("update_seller_reputation", {
        target_seller_id: reviewOrder.seller_id,
      });

      await notify({
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

  const safeImage = (src?: string) => {
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
    if (status === "preparing") return "Preparing";
    if (status === "shipped") return "Shipped";
    if (status === "delivered") return "Delivered";
    if (status === "completed") return "Completed";
    if (status === "refunded") return "Refunded";
    return status || "Paid";
  };

  const getStepIndex = (status: string) => {
    const steps = ["paid", "preparing", "shipped", "delivered", "completed"];
    const index = steps.indexOf(status || "paid");
    return index === -1 ? 0 : index;
  };

  const getEstimatedDelivery = (order: any) => {
    const baseDate = order.shipped_at || order.created_at;
    if (!baseDate) return "Estimated after shipment";

    const start = new Date(baseDate);
    const end = new Date(baseDate);

    start.setDate(start.getDate() + 2);
    end.setDate(end.getDate() + 5);

    return `${formatDate(start.toISOString())} - ${formatDate(end.toISOString())}`;
  };

  const getTrackingUrl = (carrier?: string, tracking?: string) => {
    if (!carrier || !tracking) return "";

    const cleanCarrier = carrier.toLowerCase();
    const cleanTracking = encodeURIComponent(tracking.trim());

    if (cleanCarrier.includes("mrw")) {
      return `https://www.mrw.es/seguimiento_envios/MRW_resultados_consultas.asp?txtCodigo=${cleanTracking}`;
    }

    if (cleanCarrier.includes("seur")) {
      return `https://www.seur.com/livetracking/pages/seguimiento-online-busqueda.do?segOnlineIdentificador=${cleanTracking}`;
    }

    if (cleanCarrier.includes("dhl")) {
      return `https://www.dhl.com/es-es/home/tracking/tracking-express.html?submit=1&tracking-id=${cleanTracking}`;
    }

    return "";
  };

  const openOrderChat = async (order: any) => {
    const supabase = await getSupabase();

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("order_id", order.id)
      .maybeSingle();

    if (existing?.id) {
      window.location.href = `/messages/${existing.id}`;
      return;
    }

    const { data, error } = await supabase
      .from("conversations")
      .insert([
        {
          buyer_id: order.buyer_id,
          seller_id: order.seller_id,
          product_id: order.product_id,
          order_id: order.id,
          last_message: "Conversation started",
          last_message_at: new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = `/messages/${data.id}`;
  };

  const filteredOrders = orders.filter((order: any) => {
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
        <h1 style={titleStyle} className="orders-title">
          Orders
        </h1>

        <p style={subtitleStyle}>Track your purchases and sales.</p>

        <div style={tabsStyle} className="orders-tabs">
          <button
            onClick={() => setFilter("all")}
            style={{
              ...tabButtonStyle,
              ...(filter === "all" ? activeTabStyle : {}),
            }}
          >
            All
          </button>

          <button
            onClick={() => setFilter("buying")}
            style={{
              ...tabButtonStyle,
              ...(filter === "buying" ? activeTabStyle : {}),
            }}
          >
            Buying
          </button>

          <button
            onClick={() => setFilter("selling")}
            style={{
              ...tabButtonStyle,
              ...(filter === "selling" ? activeTabStyle : {}),
            }}
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
          {filteredOrders.map((order: any) => {
            const isSeller = order.seller_id === userId;
            const isBuyer = order.buyer_id === userId;
            const status = order.status || "paid";
            const hasOpenDispute = order.dispute_status === "open";

            return (
              <article key={order.id} style={orderStyle} className="order-card">
                <div style={imageWrapperStyle}>
                  <Image
                    src={safeImage(
                      order.product?.image ||
                        order.product?.image_url ||
                        order.product?.images?.[0]
                    )}
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

                  <p
                    style={{
                      ...buyerStyle,
                      cursor: "pointer",
                      fontWeight: 700,
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      const profileId = isSeller
                        ? order.buyer_id
                        : order.seller_id;
                      window.location.href = `/seller/${profileId}`;
                    }}
                  >
                    {isSeller ? "Buyer" : "Seller"} ·{" "}
                    {formatDate(order.created_at)}
                  </p>

                  {(order.carrier || order.tracking_number) && (
                    <div style={trackingBoxStyle}>
                      <strong>Tracking</strong>

                      <span>
                        {order.carrier || "Carrier"} · {order.tracking_number}
                      </span>

                      {order.shipped_at && (
                        <small>Shipped {formatDate(order.shipped_at)}</small>
                      )}

                      {status === "shipped" && (
                        <small>Waiting for carrier delivery confirmation</small>
                      )}

                      {status === "delivered" && order.delivered_at && (
                        <small>Delivered {formatDate(order.delivered_at)}</small>
                      )}

                      {getTrackingUrl(order.carrier, order.tracking_number) && (
                        <a
                          href={getTrackingUrl(
                            order.carrier,
                            order.tracking_number
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={trackingLinkStyle}
                        >
                          Track shipment →
                        </a>
                      )}
                    </div>
                  )}

                  {hasOpenDispute && (
                    <div style={disputeWarningStyle}>
                      <strong>Issue reported</strong>
                      <span>
                        This order is under ATHMOV review. Reviews, delivery
                        confirmation and payouts are temporarily locked.
                      </span>
                    </div>
                  )}

                  {order.review && (
                    <p style={reviewPreviewStyle}>
                      {"★".repeat(order.review.rating)}
                      {"☆".repeat(5 - order.review.rating)} ·{" "}
                      {order.review.comment}
                    </p>
                  )}

                  <div style={timelineStyle} className="order-timeline">
                    {["paid", "preparing", "shipped", "delivered", "completed"].map(
                      (step, index) => {
                        const active = index <= getStepIndex(status);

                        return (
                          <div key={step} style={timelineStepStyle}>
                            <div
                              style={{
                                ...timelineDotStyle,
                                ...(active ? activeTimelineDotStyle : {}),
                              }}
                            >
                              {active ? "✓" : ""}
                            </div>

                            {index < 4 && (
                              <div
                                style={{
                                  ...timelineLineStyle,
                                  ...(index < getStepIndex(status)
                                    ? activeTimelineLineStyle
                                    : {}),
                                }}
                              />
                            )}

                            <span
                              style={{
                                ...timelineLabelStyle,
                                ...(active ? activeTimelineLabelStyle : {}),
                              }}
                            >
                              {getStatusLabel(step)}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div style={protectionGridStyle}>
                    <div style={protectionCardStyle}>
                      <span style={protectionLabelStyle}>
                        Estimated delivery
                      </span>
                      <strong>{getEstimatedDelivery(order)}</strong>
                    </div>

                    <div style={protectionCardStyle}>
                      <span style={protectionLabelStyle}>ATHMOV Protection</span>
                      <strong>Secure payment & dispute support</strong>
                    </div>
                  </div>
                </div>

                <div style={rightStyle} className="order-actions">
                  <strong style={amountStyle}>€{order.amount}</strong>

                  <span style={statusStyle}>{getStatusLabel(status)}</span>
                  {isSeller && order.transfer_status === "released" && (

  <span style={paidOutStyle}>Paid out ✓</span>
)}

{isSeller && order.transfer_status !== "released" && (
  <span style={pendingPayoutStyle}>Payout pending</span>
)}

                  <button
                    onClick={() => openOrderChat(order)}
                    style={reviewButtonStyle}
                  >
                    {isSeller ? "Message buyer" : "Message seller"}
                  </button>

                  {isSeller && ["paid", "pending"].includes(status) && (
                    <button
                      onClick={() => updateOrderStatus(order, "preparing")}
                      style={buttonStyle}
                    >
                      Start preparing
                    </button>
                  )}

                  {isSeller && status === "preparing" && (
                    <button
                      onClick={() => openTrackingModal(order)}
                      style={buttonStyle}
                    >
                      Add tracking
                    </button>
                  )}
{isBuyer &&
  ["paid", "preparing", "shipped", "delivered"].includes(status) &&
  !hasOpenDispute && (
    <button
      onClick={() => setDisputeOrder(order)}
      style={reviewButtonStyle}
    >
      Report issue
    </button>
  )}

                                    {isSeller &&
                    ["paid", "preparing", "shipped", "delivered"].includes(status) &&
                    !hasOpenDispute && (
                      <button
                        onClick={() => {
                          window.location.href = `/disputes/create?order=${order.id}`;
                        }}
                        style={reviewButtonStyle}
                      >
                        Report issue
                      </button>
                    )}

                  {isBuyer &&
                    status === "completed" &&
                    !hasOpenDispute &&
                    !order.review && (
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

            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              style={modalInputStyle}
            >
              <option value="">Select carrier</option>
              <option value="SEUR">SEUR</option>
              <option value="MRW">MRW</option>
              <option value="DHL Express">DHL Express</option>
            </select>

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

      {disputeOrder && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setDisputeOrder(null)}
              style={closeButtonStyle}
            >
              ✕
            </button>

            <p style={eyebrowStyle}>ATHMOV PROTECTION</p>
            <h2 style={modalTitleStyle}>Report issue</h2>

            <p style={modalTextStyle}>
              Tell us what happened with this order. ATHMOV will review the case
              before the payout is released.
            </p>

            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Example: item arrived damaged, tracking does not work, item is not authentic..."
              style={textareaStyle}
            />

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setDisputeFile(e.target.files[0]);
                }
              }}
              style={modalInputStyle}
            />

            <button onClick={openDispute} style={buttonStyle}>
              {savingDispute ? "Submitting..." : "Submit issue"}
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
          transform: translateY(-4px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.06) !important;
        }

        .order-timeline {
          overflow-x: auto;
          padding-bottom: 4px;
        }

        @media (max-width: 800px) {
          .orders-page {
            padding: 110px 16px 40px !important;
          }

          .orders-title {
            font-size: 48px !important;
            letter-spacing: -3px !important;
          }

          .orders-tabs {
            overflow-x: auto !important;
            padding-bottom: 6px !important;
          }

          .order-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
            padding: 20px !important;
            border-radius: 28px !important;
          }

          .order-timeline {
            width: 100% !important;
            overflow-x: auto !important;
          }

          .order-actions {
            width: 100% !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
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
  maxWidth: "980px",
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
  letterSpacing: "-5px",
  fontWeight: 500,
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
  gap: "24px",
};

const orderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(0,0,0,0.04)",
  borderRadius: "32px",
  padding: "36px",
  boxShadow: "none",
};

const imageWrapperStyle = {
  position: "relative" as const,
  width: "110px",
  height: "110px",
  borderRadius: "18px",
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
  fontSize: "30px",
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

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "10px",
};

const amountStyle = {
  fontSize: "34px",
  fontWeight: 500,
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
  padding: "13px 20px",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.3px",
  cursor: "pointer",
};

const reviewButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "13px 20px",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.3px",
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

const trackingLinkStyle = {
  marginTop: "6px",
  color: "#111",
  fontWeight: 900,
  textDecoration: "none",
  fontSize: "12px",
};

const timelineStyle = {
  display: "flex",
  alignItems: "flex-start",
  marginTop: "22px",
  marginBottom: "18px",
  maxWidth: "520px",
};

const timelineStepStyle = {
  position: "relative" as const,
  flex: 1,
  minWidth: "86px",
};

const timelineDotStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  background: "#eee",
  color: "#aaa",
  border: "1px solid rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: 900,
  position: "relative" as const,
  zIndex: 2,
};

const activeTimelineDotStyle = {
  background: "#111",
  color: "#fff",
  border: "1px solid #111",
};

const timelineLineStyle = {
  position: "absolute" as const,
  top: "14px",
  left: "28px",
  right: "0",
  height: "2px",
  background: "#e1e1dc",
  zIndex: 1,
};

const activeTimelineLineStyle = {
  background: "#111",
};

const timelineLabelStyle = {
  display: "block",
  marginTop: "10px",
  fontSize: "10px",
  letterSpacing: "1.4px",
  fontWeight: 900,
  color: "#aaa",
  textTransform: "uppercase" as const,
};

const activeTimelineLabelStyle = {
  color: "#111",
};

const protectionGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  maxWidth: "520px",
  marginTop: "14px",
};

const protectionCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "18px",
  padding: "14px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
};

const protectionLabelStyle = {
  fontSize: "10px",
  letterSpacing: "1.8px",
  textTransform: "uppercase" as const,
  opacity: 0.45,
  fontWeight: 900,
};

const disputeWarningStyle = {
  marginTop: "14px",
  background: "#fff7ed",
  border: "1px solid #fdba74",
  borderRadius: "18px",
  padding: "14px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "5px",
  color: "#9a3412",
  fontSize: "13px",
  fontWeight: 700,
  maxWidth: "520px",
};

const paidOutStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const pendingPayoutStyle = {
  background: "#f1efe8",
  color: "#111",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};