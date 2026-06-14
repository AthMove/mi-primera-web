"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();

    const channel = supabase
      .channel("offers-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "offers",
        },
        () => {
          loadOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadOffers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("seller_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.log(error);
      setOffers([]);
      setLoading(false);
      return;
    }

    const enriched = await Promise.all(
      data.map(async (offer: any) => {
        const { data: product } = await supabase
          .from("products")
          .select("*")
          .eq("id", offer.product_id)
          .maybeSingle();

        return {
          ...offer,
          product,
        };
      })
    );

    setOffers(enriched);
    setLoading(false);
  };

const updateOffer = async (offer: any, status: string) => {
  const confirmed = confirm(
    status === "accepted" ? "Accept this offer?" : "Reject this offer?"
  );

  if (!confirmed) return;

  const { data: updatedOffer, error: updateError } = await supabase
    .from("offers")
    .update({ status })
    .eq("id", offer.id)
    .select("*")
    .single();

  if (updateError || !updatedOffer) {
    console.log("OFFER UPDATE ERROR:", updateError);
    alert(updateError?.message || "Offer could not be updated");
    return;
  }

  if (status === "rejected") {
    await fetch("/api/email/offer-rejected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offerId: offer.id,
      }),
    });

    await loadOffers();
    return;
  }

  if (status === "accepted") {
    await fetch("/api/email/offer-accepted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offerId: offer.id,
      }),
    });

    await supabase
      .from("offers")
      .update({ status: "rejected" })
      .eq("product_id", offer.product_id)
      .neq("id", offer.id)
      .eq("status", "pending");

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          product_id: offer.product_id,
          seller_id: offer.seller_id,
          buyer_id: offer.buyer_id,
          buyer_email: offer.buyer_email,
          amount: offer.amount,
          status: "pending",
          payment_status: "pending",
          transfer_status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError || !order) {
      console.log("ORDER ERROR:", orderError);
      alert(orderError?.message || "Order could not be created");
      return;
    }
  }

  await loadOffers();
};

  const safeImage = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  if (loading) {
    return <main style={pageStyle}>Loading offers...</main>;
  }

  return (
    <main style={pageStyle} className="offers-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV OFFERS</p>

        <h1 style={titleStyle} className="offers-title">
          Received offers
        </h1>

        <p style={subtitleStyle}>
          Manage buyer offers for your products.
        </p>
      </section>

      {offers.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={{ fontSize: "32px", margin: 0 }}>
            No pending offers
          </h2>

          <p style={{ color: "#666", marginTop: "12px" }}>
            Buyer offers will appear here.
          </p>
        </section>
      ) : (
        <section style={listStyle}>
          {offers.map((offer: any) => (
            <article
              key={offer.id}
              style={offerStyle}
              className="offer-card"
            >
              <div style={imageWrapperStyle}>
                <Image
                  src={safeImage(offer.product?.image)}
                  alt={offer.product?.title || "Product"}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p style={metaStyle}>Pending offer</p>

                <h2 style={offerTitleStyle}>
                  {offer.product?.title || "Product"}
                </h2>

                <p style={buyerStyle}>
                  {offer.buyer_email}
                </p>
              </div>

              <div style={rightStyle}>
                <strong style={amountStyle}>
                  €{offer.amount}
                </strong>

                <div style={actionsStyle}>
                  <button
                    onClick={() =>
                      updateOffer(offer, "accepted")
                    }
                    style={acceptButtonStyle}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateOffer(offer, "rejected")
                    }
                    style={rejectButtonStyle}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .offer-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .offer-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 90px rgba(0,0,0,0.07);
        }

        @media (max-width: 700px) {
          .offers-page {
            padding: 120px 18px 34px !important;
          }

          .offers-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .offer-card {
            flex-direction: column !important;
            align-items: flex-start !important;
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
  marginTop: "16px",
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

const offerStyle = {
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

const offerTitleStyle = {
  fontSize: "26px",
  margin: 0,
  letterSpacing: "-1px",
};

const buyerStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: 0,
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "14px",
};

const amountStyle = {
  fontSize: "28px",
};

const actionsStyle = {
  display: "flex",
  gap: "10px",
};

const acceptButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const rejectButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};