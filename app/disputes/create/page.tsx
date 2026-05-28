"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateDisputePage() {
  return (
    <Suspense fallback={<main style={{ padding: 140 }}>Loading...</main>}>
      <CreateDisputeContent />
    </Suspense>
  );
}

function CreateDisputeContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitDispute = async () => {
    if (!reason.trim() || !description.trim() || !orderId) {
      alert("Complete all fields");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError || !order) {
      alert("Order not found");
      setLoading(false);
      return;
    }

    const { error: disputeError } = await supabase.from("disputes").insert({
      order_id: order.id,
      buyer_id: order.buyer_id,
      seller_id: order.seller_id,
      reason: reason.trim(),
      description: description.trim(),
      status: "open",
    });

    if (disputeError) {
      alert(disputeError.message);
      setLoading(false);
      return;
    }

    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({
        dispute_status: "open",
        dispute_reason: reason.trim(),
        dispute_opened_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (orderUpdateError) {
      alert(orderUpdateError.message);
      setLoading(false);
      return;
    }

    await supabase.from("dispute_evidence").insert([
      {
        order_id: order.id,
        user_id: user.id,
        message: description.trim(),
        file_url: null,
      },
    ]);

    alert("Dispute opened");
    window.location.href = "/orders";
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV PROTECTION</p>

        <h1 style={titleStyle}>Open dispute</h1>

        <input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <button onClick={submitDispute} disabled={loading} style={buttonStyle}>
          {loading ? "Opening..." : "Submit dispute"}
        </button>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "140px 20px",
  background: "#f6f6f3",
};

const cardStyle = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "32px",
  padding: "40px",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "52px",
  marginBottom: "30px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  marginBottom: "18px",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  width: "100%",
  minHeight: "180px",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  marginBottom: "24px",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "18px 28px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 800,
};