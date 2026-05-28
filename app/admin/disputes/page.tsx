"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDisputes();
  }, []);

  const loadDisputes = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("disputes")
      .select(`
        *,
        orders (
          id,
          amount,
          status,
          seller_id,
          buyer_id,
          products (
            nombre,
            imagen
          )
        )
      `)
      .order("created_at", { ascending: false });

    setDisputes(data || []);
    setLoading(false);
  };

  const resolveDispute = async (
    disputeId: string,
    resolution: "seller_wins" | "buyer_refund"
  ) => {
    const confirmed = confirm("Resolve dispute?");

    if (!confirmed) return;

    const response = await fetch("/api/admin/resolve-dispute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        disputeId,
        resolution,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Error");
      return;
    }

    await loadDisputes();

    alert("Dispute resolved");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f0",
        padding: "60px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          marginBottom: "40px",
        }}
      >
        Disputes
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : disputes.length === 0 ? (
        <p>No disputes found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {disputes.map((dispute) => (
            <div
              key={dispute.id}
              style={{
                background: "#fff",
                borderRadius: "28px",
                padding: "28px",
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "180px",
                  height: "180px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                {dispute.orders?.products?.imagen && (
                  <Image
                    src={dispute.orders.products.imagen}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>

              <div>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    opacity: 0.5,
                  }}
                >
                  DISPUTE
                </p>

                <h2
                  style={{
                    fontSize: "38px",
                    margin: "8px 0 18px",
                  }}
                >
                  {dispute.orders?.products?.nombre || "Product"}
                </h2>

                <p>
                  <strong>Reason:</strong>
                </p>

                <p
                  style={{
                    background: "#f7f7f7",
                    padding: "18px",
                    borderRadius: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  {dispute.description}
                </p>

                {dispute.file_url && (
                  <a
                    href={dispute.file_url}
                    target="_blank"
                    style={{
                      display: "inline-block",
                      marginTop: "18px",
                      fontWeight: 700,
                    }}
                  >
                    View evidence
                  </a>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginTop: "30px",
                  }}
                >
                  <button
                    onClick={() =>
                      resolveDispute(dispute.id, "seller_wins")
                    }
                    style={{
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: "999px",
                      padding: "16px 24px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Release payout
                  </button>

                  <button
                    onClick={() =>
                      resolveDispute(dispute.id, "buyer_refund")
                    }
                    style={{
                      background: "#fff",
                      color: "#111",
                      border: "1px solid #111",
                      borderRadius: "999px",
                      padding: "16px 24px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Refund buyer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}