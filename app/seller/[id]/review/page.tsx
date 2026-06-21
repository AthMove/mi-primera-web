"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerReviewPage() {
  const params = useParams();
  const router = useRouter();
  const sellerId = String(params.id);

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Escribe una valoración");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      alert("Debes iniciar sesión");
      router.push("/auth");
      return;
    }

    if (user.id === sellerId) {
      setLoading(false);
      alert("No puedes valorarte a ti mismo");
      return;
    }

    const { data: order } = await supabase
      .from("orders")
      .select("id")
      .eq("buyer_id", user.id)
      .eq("seller_id", sellerId)
      .eq("status", "completed")
      .maybeSingle();

    if (!order) {
      setLoading(false);
      alert("Solo compradores con pedidos completados pueden valorar vendedores");
      return;
    }

    const { data: existingReview } = await supabase
      .from("seller_reviews")
      .select("id")
      .eq("seller_id", sellerId)
      .eq("buyer_id", user.id)
      .maybeSingle();

    if (existingReview) {
      setLoading(false);
      alert("Ya has valorado a este vendedor");
      return;
    }

    const { error } = await supabase.from("seller_reviews").insert([
      {
        seller_id: sellerId,
        buyer_id: user.id,
        buyer_email: user.email,
        rating: Number(rating),
        comment: comment.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Valoración enviada");
    router.push(`/seller/${sellerId}`);
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV REVIEW</p>
        <h1 style={titleStyle}>Valorar vendedor</h1>

        <form onSubmit={submitReview} style={formStyle}>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={inputStyle}
          >
            <option value="5">★★★★★ 5</option>
            <option value="4">★★★★ 4</option>
            <option value="3">★★★ 3</option>
            <option value="2">★★ 2</option>
            <option value="1">★ 1</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe tu experiencia con este vendedor..."
            required
            style={textareaStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Enviando..." : "Enviar valoración"}
          </button>
        </form>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  maxWidth: "640px",
  margin: "0 auto",
  background: "#fff",
  padding: "46px",
  borderRadius: "36px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.08)",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  letterSpacing: "-3px",
  marginTop: "12px",
  marginBottom: "34px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "17px 20px",
  fontSize: "15px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "150px",
  borderRadius: "24px",
  resize: "none" as const,
};

const buttonStyle = {
  marginTop: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "16px",
  fontWeight: 800,
};