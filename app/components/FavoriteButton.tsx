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
  }, []);

  const checkFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single();

    if (data) {
      setIsFavorite(true);
    }
  };

  const toggleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Inicia sesión");
      return;
    }

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
      });

      setIsFavorite(true);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "999px",
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
        fontSize: "22px",
      }}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}