"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useHomeData() {
  const [loadingHome, setLoadingHome] = useState(true);
  const [newDrops, setNewDrops] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [followedSellers, setFollowedSellers] = useState<any[]>([]);
  const [followedSellerProducts, setFollowedSellerProducts] =
    useState<any[]>([]);

  const loadHome = async () => {
    setLoadingHome(true);

    const { data: drops, error: dropsError } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);

    const { data: sold, error: soldError } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", true)
      .order("created_at", { ascending: false })
      .limit(4);

    if (dropsError) {
      console.log("Error cargando novedades:", dropsError);
    }

    if (soldError) {
      console.log("Error cargando productos vendidos:", soldError);
    }

    setNewDrops(drops || []);
    setSoldProducts(sold || []);
    setLoadingHome(false);
  };

  const loadFollowedSellers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setFollowedSellers([]);
      setFollowedSellerProducts([]);
      return;
    }

    const { data: follows, error: followsError } = await supabase
      .from("seller_follows")
      .select("seller_id")
      .eq("follower_id", user.id);

    if (followsError || !follows?.length) {
      setFollowedSellers([]);
      setFollowedSellerProducts([]);
      return;
    }

    const sellerIds = (follows as { seller_id: string }[]).map(
      (follow) => follow.seller_id
    );

    const { data: sellers, error: sellersError } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        username,
        avatar_url,
        location,
        seller_verified,
        seller_level,
        seller_badge,
        total_sales,
        response_time
      `)
      .in("id", sellerIds);

    if (sellersError) {
      console.log("Error cargando vendedores seguidos:", sellersError);

      setFollowedSellers([]);
      setFollowedSellerProducts([]);
      return;
    }

    setFollowedSellers(sellers || []);

    const { data: sellerProducts, error: sellerProductsError } =
      await supabase
        .from("products")
        .select("*")
        .in("seller_id", sellerIds)
        .eq("moderation_status", "approved")
        .eq("sold", false)
        .order("created_at", { ascending: false })
        .limit(8);

    if (sellerProductsError) {
      console.log(
        "Error cargando productos de vendedores seguidos:",
        sellerProductsError
      );

      setFollowedSellerProducts([]);
      return;
    }

    setFollowedSellerProducts(sellerProducts || []);
  };

  useEffect(() => {
    loadHome();
    loadFollowedSellers();
  }, []);

  return {
    loadingHome,
    newDrops,
    soldProducts,
    followedSellers,
    followedSellerProducts,
  };
}