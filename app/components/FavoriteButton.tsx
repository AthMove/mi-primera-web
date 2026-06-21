"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  productId: string;
};

export default function FavoriteButton({ productId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, [productId]);

  const checkFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    try {
      setLoading(true);

      if (isFavorite) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        setIsFavorite(false);
      } else {
        await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: productId,
          user_email: user.email,
        });

        setIsFavorite(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "999px",
        border: "1px solid #ddd",
        background: "#fff",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "22px",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {isFavorite ? "♥️" : "♡"}
    </button>
  );
}