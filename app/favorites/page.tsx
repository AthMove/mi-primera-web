"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FavoritesPage() {
  const router = useRouter();

  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getSupabase = async () => {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const supabase = await getSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const { data: favoriteRows, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    if (error || !favoriteRows) {
      setLoading(false);
      return;
    }

    const productIds = favoriteRows.map((fav: any) => fav.product_id);

    if (productIds.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    setFavorites(products || []);
    setLoading(false);
  };

  const removeFavorite = async (productId: string) => {
    const supabase = await getSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user?.id)
      .eq("product_id", productId);

    setFavorites(favorites.filter((item: any) => item.id !== productId));
  };

  if (loading) {
    return <main style={pageStyle}>Loading...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV FAVORITES</p>
        <h1 style={titleStyle}>Wishlist</h1>
      </section>

      {favorites.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={{ margin: 0 }}>No favorites yet</h2>
          <p style={{ color: "#666", marginTop: "12px" }}>
            Save premium products to your wishlist.
          </p>
        </section>
      ) : (
        <section style={gridStyle}>
          {favorites.map((product: any) => (
            <article key={product.id} style={cardStyle}>
              <div
                onClick={() => router.push(`/products/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div style={imageWrapperStyle}>
                  <Image
                    src={
                      product.image?.startsWith("http") ||
                      product.image?.startsWith("/")
                        ? product.image
                        : "/logo.png"
                    }
                    alt={product.title || "Product"}
                    fill
                    sizes="33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "24px" }}>
                  <p style={brandStyle}>{product.brand}</p>
                  <h2 style={productTitleStyle}>{product.title}</h2>
                  <p style={priceStyle}>€{product.price}</p>
                </div>
              </div>

              <div style={{ padding: "0 24px 24px" }}>
                <button
                  onClick={() => removeFavorite(product.id)}
                  style={removeButtonStyle}
                >
                  Remove favorite
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
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
  maxWidth: "1400px",
  margin: "0 auto 50px",
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
  letterSpacing: "-4px",
  margin: 0,
};

const emptyStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "34px",
  padding: "50px",
};

const gridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "34px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "32px",
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.06)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  height: "280px",
  background: "#f8f8f6",
};

const brandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const productTitleStyle = {
  fontSize: "28px",
  marginTop: "10px",
  marginBottom: "16px",
};

const priceStyle = {
  fontSize: "26px",
  fontWeight: 800,
};

const removeButtonStyle = {
  width: "100%",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "14px",
  fontWeight: 800,
  cursor: "pointer",
};