"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FavoriteRow = {
  product_id: string;
};

export function useHomeData() {
  const [loadingHome, setLoadingHome] = useState(true);
  const [newDrops, setNewDrops] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [followedSellers, setFollowedSellers] = useState<any[]>([]);
  const [followedSellerProducts, setFollowedSellerProducts] =
    useState<any[]>([]);

  const addFavoriteState = async (
    products: any[],
    userId?: string
  ) => {
    if (!products.length) return [];

    if (!userId) {
      return products.map((product) => ({
        ...product,
        is_favorite: false,
      }));
    }

    const productIds = products
      .map((product) => product?.id)
      .filter(Boolean);

    if (!productIds.length) {
      return products;
    }

    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("product_id")
      .eq("user_id", userId)
      .in("product_id", productIds);

    if (error) {
      console.log("Error cargando favoritos:", error);

      return products.map((product) => ({
        ...product,
        is_favorite: false,
      }));
    }

    const favoriteIds = new Set(
      ((favorites || []) as FavoriteRow[]).map(
        (favorite) => favorite.product_id
      )
    );

    return products.map((product) => ({
      ...product,
      is_favorite: favoriteIds.has(product.id),
    }));
  };

  const loadHome = useCallback(async () => {
    setLoadingHome(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const [dropsResult, soldResult] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .eq("moderation_status", "approved")
          .eq("sold", false)
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(6),

        supabase
          .from("products")
          .select("*")
          .eq("moderation_status", "approved")
          .eq("sold", true)
          .order("created_at", { ascending: false })
          .limit(4),
      ]);

      if (dropsResult.error) {
        console.log(
          "Error cargando novedades:",
          dropsResult.error
        );
      }

      if (soldResult.error) {
        console.log(
          "Error cargando productos vendidos:",
          soldResult.error
        );
      }

      const dropsWithFavorites = await addFavoriteState(
        dropsResult.data || [],
        user?.id
      );

      setNewDrops(dropsWithFavorites);
      setSoldProducts(soldResult.data || []);
    } catch (error) {
      console.log("Error general cargando la Home:", error);

      setNewDrops([]);
      setSoldProducts([]);
    } finally {
      setLoadingHome(false);
    }
  }, []);

  const loadFollowedSellers = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFollowedSellers([]);
        setFollowedSellerProducts([]);
        return;
      }

      const { data: follows, error: followsError } =
        await supabase
          .from("seller_follows")
          .select("seller_id")
          .eq("follower_id", user.id);

      if (followsError) {
        console.log(
          "Error cargando vendedores seguidos:",
          followsError
        );

        setFollowedSellers([]);
        setFollowedSellerProducts([]);
        return;
      }

      if (!follows?.length) {
        setFollowedSellers([]);
        setFollowedSellerProducts([]);
        return;
      }

      const sellerIds = (
        follows as { seller_id: string }[]
      ).map((follow) => follow.seller_id);

      const [sellersResult, productsResult] =
        await Promise.all([
          supabase
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
            .in("id", sellerIds),

          supabase
            .from("products")
            .select("*")
            .in("seller_id", sellerIds)
            .eq("moderation_status", "approved")
            .eq("sold", false)
            .order("created_at", { ascending: false })
            .limit(8),
        ]);

      if (sellersResult.error) {
        console.log(
          "Error cargando perfiles seguidos:",
          sellersResult.error
        );

        setFollowedSellers([]);
      } else {
        setFollowedSellers(sellersResult.data || []);
      }

      if (productsResult.error) {
        console.log(
          "Error cargando productos de vendedores seguidos:",
          productsResult.error
        );

        setFollowedSellerProducts([]);
        return;
      }

      const productsWithFavorites =
        await addFavoriteState(
          productsResult.data || [],
          user.id
        );

      setFollowedSellerProducts(productsWithFavorites);
    } catch (error) {
      console.log(
        "Error general cargando vendedores seguidos:",
        error
      );

      setFollowedSellers([]);
      setFollowedSellerProducts([]);
    }
  }, []);

  useEffect(() => {
    loadHome();
    loadFollowedSellers();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadHome();
      loadFollowedSellers();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadHome, loadFollowedSellers]);

  return {
    loadingHome,
    newDrops,
    soldProducts,
    followedSellers,
    followedSellerProducts,
    reloadHome: loadHome,
  };
}