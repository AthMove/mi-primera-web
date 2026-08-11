"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminDisputesPage() {
  const { lang, t } = useLanguage();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState("");
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const locale =
    lang === "en"
      ? "en-GB"
      : lang === "pt"
        ? "pt-PT"
        : "es-ES";

  const loadDisputes = async () => {
    setDebug(t.adminDisputesLoading);

    try {
      const response = await fetch("/api/admin/disputes", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      console.log("DISPUTAS ADMIN:", JSON.stringify(result, null, 2));

      if (!response.ok) {
        setDebug(
          "ERROR: " +
            (result.error || t.adminDisputesLoadError)
        );
        return;
      }

      setDebug(
        `${t.adminDisputesOpenCount}: ${
          result.orders?.length || 0
        }`
      );

      setOrders(result.orders || []);
    } catch (error: any) {
      setDebug(
        "ERROR: " +
          (error.message || t.adminDisputesLoadError)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisputes();
  }, []);

  const shortId = (value?: string | null) => {
    if (!value) return t.adminDisputesUnknown;
    return value.slice(0, 8);
  };

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(Number(value || 0));

  const formatDateTime = (date?: string | null) => {
    if (!date) return t.adminDisputesUnknown;

    return new Date(date).toLocaleString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status?: string) => {
    if (status === "open") {
      return t.adminDisputesOpen;
    }

    if (status === "resolved") {
      return t.adminDisputesResolved;
    }

    if (status === "paid") {
      return t.earningsStatusPaid;
    }

    if (status === "preparing") {
      return t.earningsStatusPreparing;
    }

    if (status === "shipped") {
      return t.earningsStatusShipped;
    }

    if (status === "delivered") {
      return t.earningsStatusDelivered;
    }

    if (status === "completed") {
      return t.earningsStatusCompleted;
    }

    if (status === "refunded") {
      return t.earningsStatusRefunded;
    }

    if (status === "pending") {
      return t.earningsStatusPending;
    }

    return status || t.adminDisputesUnknown;
  };

  const getResolutionLabel = (resolution?: string) => {
    if (resolution === "seller_wins") {
      return t.adminDisputesSellerWins;
    }

    if (resolution === "buyer_refund") {
      return t.adminDisputesBuyerRefund;
    }

    return t.adminDisputesPending;
  };

  const resolveDispute = async (
    orderId: string,
    resolution: "seller_wins" | "buyer_refund"
  ) => {
    const confirmed = confirm(
      resolution === "seller_wins"
        ? t.adminDisputesConfirmSeller
        : t.adminDisputesConfirmRefund
    );

    if (!confirmed) return;

    setResolvingId(orderId);

    try {
      const response = await fetch("/api/resolve-dispute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          resolution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error || t.adminDisputesResolveError
        );
        return;
      }

      alert(t.adminDisputesResolveSuccess);

      setOrders((prev) =>
        prev.filter((order) => order.id !== orderId)
      );

      await loadDisputes();
    } catch (error: any) {
      alert(
        error.message || t.adminDisputesResolveError
      );
    } finally {
      setResolvingId(null);
    }
  };

  if (loading) {
    return (
      <main style={pageStyle}>
        {t.adminDisputesLoading}
      </main>
    );
  }

  return (
    <main
      style={pageStyle}
      className="admin-disputes-page"
    >
      <p style={eyebrowStyle}>
        {t.adminDisputesEyebrow}
      </p>

      <h1
        style={titleStyle}
        className="admin-disputes-title"
      >
        {t.adminDisputesTitle}
      </h1>

      <p style={debugStyle}>
        {debug}
      </p>

      {orders.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={{ margin: 0 }}>
            {t.adminDisputesEmptyTitle}
          </h2>

          <p style={{ color: "#666" }}>
            {t.adminDisputesEmptyText}
          </p>
        </section>
      ) : (
        <div style={listStyle}>
          {orders.map((order) => {
            const product =
              Array.isArray(order.products) &&
              order.products.length > 0
                ? order.products[0]
                : order.products || null;

            const productImages = Array.from(
              new Set(
                [
                  ...(product?.image
                    ? [product.image]
                    : []),
                  ...(Array.isArray(product?.images)
                    ? product.images
                    : []),
                ].filter(Boolean)
              )
            );

            const isResolved =
              order.dispute_status === "resolved";

            return (
              <article
                key={order.id}
                style={cardStyle}
                className="dispute-card"
              >
                <div
                  style={productRowStyle}
                  className="dispute-row"
                >
                  <div style={imageBoxStyle}>
                    {productImages[0] ? (
                      <img
                        src={productImages[0] as string}
                        alt={
                          product?.title ||
                          t.adminDisputesProduct
                        }
                        style={imageStyle}
                      />
                    ) : (
                      <span style={imagePlaceholderStyle}>
                        {t.adminDisputesNoImage}
                      </span>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={eyebrowStyle}>
                      {t.adminDisputesDisputeEyebrow}
                    </p>

                    <h2 style={productTitleStyle}>
                      {product?.title ||
                        `${t.adminDisputesOrder} #${shortId(
                          order.id
                        )}`}
                    </h2>

                    <p style={mutedTextStyle}>
                      {t.adminDisputesOrder} #
                      {shortId(order.id)}
                    </p>

                    {productImages.length > 1 && (
                      <div style={galleryStyle}>
                        {productImages
                          .slice(0, 6)
                          .map((img, index) => (
                            <img
                              key={`${String(
                                img
                              )}-${index}`}
                              src={String(img)}
                              alt={`${
                                product?.title ||
                                t.adminDisputesProduct
                              } ${index + 1}`}
                              style={thumbStyle}
                            />
                          ))}
                      </div>
                    )}

                    <div
                      style={detailsGridStyle}
                      className="details-grid"
                    >
                      <p>
                        <strong>
                          {t.adminDisputesDisputeStatus}:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              order.dispute_status === "open"
                                ? "#d97706"
                                : "#16a34a",
                            fontWeight: 700,
                          }}
                        >
                          {getStatusLabel(
                            order.dispute_status || "open"
                          )}
                        </span>
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesOrderStatus}:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              order.status === "paid"
                                ? "#16a34a"
                                : order.status ===
                                    "shipped"
                                  ? "#2563eb"
                                  : order.status ===
                                      "refunded"
                                    ? "#dc2626"
                                    : "#d97706",
                            fontWeight: 700,
                          }}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesOrderAmount}:
                        </strong>{" "}
                        {formatMoney(
                          Number(order.amount || 0)
                        )}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesProductPrice}:
                        </strong>{" "}
                        {formatMoney(
                          Number(product?.price || 0)
                        )}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesBuyer}:
                        </strong>{" "}
                        {order.buyer_email ||
                          order.user_email ||
                          order.buyer_id ||
                          t.adminDisputesUnknown}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesSeller}:
                        </strong>{" "}
                        {product?.seller_email ||
                          order.seller_id ||
                          t.adminDisputesUnknown}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesSport}:
                        </strong>{" "}
                        {product?.sport ||
                          t.adminDisputesUnknown}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesPurchasedAt}:
                        </strong>{" "}
                        {formatDateTime(order.created_at)}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesOpenedAt}:
                        </strong>{" "}
                        {formatDateTime(
                          order.dispute_opened_at
                        )}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesCarrier}:
                        </strong>{" "}
                        {order.carrier ||
                          t.adminDisputesNoCarrier}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesTracking}:
                        </strong>{" "}
                        {order.tracking_number ||
                          t.adminDisputesNoTracking}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesProductId}:
                        </strong>{" "}
                        {shortId(order.product_id)}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesBuyerId}:
                        </strong>{" "}
                        {shortId(order.buyer_id)}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesSellerId}:
                        </strong>{" "}
                        {shortId(order.seller_id)}
                      </p>

                      <p>
                        <strong>
                          {t.adminDisputesResolution}:
                        </strong>{" "}
                        <span
                          style={{
                            background:
                              order.dispute_resolution ===
                              "seller_wins"
                                ? "#dcfce7"
                                : order.dispute_resolution ===
                                    "buyer_refund"
                                  ? "#fee2e2"
                                  : "#f3f4f6",
                            padding: "6px 12px",
                            borderRadius: "999px",
                            fontWeight: 600,
                          }}
                        >
                          {getResolutionLabel(
                            order.dispute_resolution
                          )}
                        </span>
                      </p>
                    </div>

                    <p style={reasonLabelStyle}>
                      <strong>
                        {t.adminDisputesReason}:
                      </strong>
                    </p>

                    <p style={reasonBoxStyle}>
                      {order.dispute_reason ||
                        t.adminDisputesNoReason}
                    </p>

                    {order.evidence?.length > 0 && (
                      <div style={evidenceSectionStyle}>
                        <p style={reasonLabelStyle}>
                          <strong>
                            {t.adminDisputesEvidence}:
                          </strong>
                        </p>

                        <div style={evidenceGridStyle}>
                          {order.evidence.map(
                            (
                              item: any,
                              index: number
                            ) =>
                              item.file_url ? (
                                <a
                                  key={`${item.file_url}-${index}`}
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={item.file_url}
                                    alt={`${t.adminDisputesEvidenceAlt} ${
                                      index + 1
                                    }`}
                                    style={evidenceImageStyle}
                                  />
                                </a>
                              ) : null
                          )}
                        </div>
                      </div>
                    )}

                    {!isResolved ? (
                      <div style={actionsStyle}>
                        <button
                          onClick={() =>
                            resolveDispute(
                              order.id,
                              "seller_wins"
                            )
                          }
                          style={{
                            ...primaryButtonStyle,
                            opacity:
                              resolvingId === order.id
                                ? 0.5
                                : 1,
                          }}
                          disabled={
                            resolvingId === order.id
                          }
                        >
                          {resolvingId === order.id
                            ? t.adminDisputesResolving
                            : t.adminDisputesReleaseSeller}
                        </button>

                        <button
                          onClick={() =>
                            resolveDispute(
                              order.id,
                              "buyer_refund"
                            )
                          }
                          style={{
                            ...secondaryButtonStyle,
                            opacity:
                              resolvingId === order.id
                                ? 0.5
                                : 1,
                          }}
                          disabled={
                            resolvingId === order.id
                          }
                        >
                          {resolvingId === order.id
                            ? t.adminDisputesResolving
                            : t.adminDisputesRefundBuyer}
                        </button>
                      </div>
                    ) : (
                      <p style={resolvedNoteStyle}>
                        {t.adminDisputesResolvedNote} ·{" "}
                        {getResolutionLabel(
                          order.dispute_resolution
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-disputes-page {
            padding: 120px 18px 40px !important;
          }

          .admin-disputes-title {
            font-size: 48px !important;
          }

          .dispute-row {
            flex-direction: column !important;
          }

          .details-grid {
            grid-template-columns: 1fr !important;
          }

          .dispute-card {
            padding: 22px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f5f0",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};

const titleStyle = {
  fontSize: "64px",
  margin: "0 0 18px",
};

const debugStyle = {
  maxWidth: "1200px",
  margin: "0 auto 30px",
  color: "#666",
  fontSize: "13px",
};

const emptyStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
};

const listStyle = {
  display: "grid",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const productRowStyle = {
  display: "flex",
  gap: "28px",
  alignItems: "flex-start",
};

const imageBoxStyle = {
  width: "180px",
  height: "180px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#eee",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const imagePlaceholderStyle = {
  fontSize: "13px",
  color: "#777",
};

const galleryStyle = {
  display: "flex",
  gap: "10px",
  margin: "16px 0 24px",
  flexWrap: "wrap" as const,
};

const thumbStyle = {
  width: "76px",
  height: "76px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  background: "#eee",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
  margin: 0,
};

const productTitleStyle = {
  fontSize: "38px",
  margin: "8px 0 8px",
};

const mutedTextStyle = {
  color: "#777",
  marginTop: 0,
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "20px",
  marginTop: "20px",
  marginBottom: "24px",
};

const reasonLabelStyle = {
  marginTop: "10px",
};

const reasonBoxStyle = {
  background: "#fff7ed",
  padding: "24px",
  border: "1px solid #fdba74",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: 1.7,
};

const actionsStyle = {
  display: "flex",
  gap: "16px",
  marginTop: "30px",
  flexWrap: "wrap" as const,
};

const primaryButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px 24px",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid #111",
  borderRadius: "999px",
  padding: "16px 24px",
  cursor: "pointer",
  fontWeight: 700,
};

const evidenceSectionStyle = {
  marginTop: "24px",
};

const evidenceGridStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap" as const,
};

const evidenceImageStyle = {
  width: "120px",
  height: "120px",
  objectFit: "cover" as const,
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.08)",
};

const resolvedNoteStyle = {
  marginTop: "30px",
  background: "#dcfce7",
  color: "#166534",
  padding: "14px 18px",
  borderRadius: "999px",
  fontWeight: 800,
  display: "inline-flex",
};