"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
};

type FavoriteRow = {
  id: string;
  product_id: string;
};

type FavoriteItem = {
  favoriteId: string;
  product: Product;
};

export default function FavoritesPage() {
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth?mode=login");
      return;
    }

    const { data: favoriteRows, error: favoritesError } = await supabase
      .from("favorites")
      .select("id, product_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (favoritesError || !favoriteRows || favoriteRows.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const productIds = favoriteRows.map(
      (favorite) => favorite.product_id
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, title, brand, price, image, condition")
      .in("id", productIds);

    if (productsError || !products) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const items = (favoriteRows as FavoriteRow[])
      .map((favorite) => {
        const product = products.find(
          (product) => product.id === favorite.product_id
        );

        if (!product) return null;

        return {
          favoriteId: favorite.id,
          product,
        };
      })
      .filter(Boolean) as FavoriteItem[];

    setFavorites(items);
    setLoading(false);
  };

  const removeFavorite = async (favoriteId: string) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favoriteId);

    if (error) {
      alert(error.message);
      return;
    }

    setFavorites((current) =>
      current.filter(
        (favorite) => favorite.favoriteId !== favoriteId
      )
    );
  };

  if (loading) {
    return (
      <main style={loadingStyle}>
        Cargando favoritos...
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>Mi cuenta</p>

          <h1 style={titleStyle}>
            Favoritos
          </h1>

          <p style={subtitleStyle}>
            Productos que has guardado.
          </p>
        </div>

        <Link href="/account" style={backButtonStyle}>
          Volver a mi cuenta
        </Link>
      </section>

      {favorites.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>
            No tienes favoritos todavía
          </h2>

          <p style={emptyTextStyle}>
            Guarda productos desde el corazón
            para verlos aquí.
          </p>

          <Link href="/products" style={shopButtonStyle}>
            Ir al marketplace
          </Link>
        </section>
      ) : (
        <section style={gridStyle}>
          {favorites.map((favorite) => (
            <article
              key={favorite.favoriteId}
              style={cardStyle}
            >
              <a
                href={`/products/${favorite.product.id}`}
                style={imageLinkStyle}
              >
                <div style={imageBoxStyle}>
                  <img
                    src={
                      favorite.product.image ||
                      "https://placehold.co/700x700?text=ATHMOV"
                    }
                    alt={favorite.product.title}
                    style={imageStyle}
                  />
                </div>
              </a>

              <div style={contentStyle}>
                <p style={brandStyle}>
                  {favorite.product.brand}
                </p>

                <h2 style={productTitleStyle}>
                  {favorite.product.title}
                </h2>

                <div style={rowStyle}>
                  <p style={priceStyle}>
                    €{favorite.product.price}
                  </p>

                  <span style={conditionStyle}>
                    {favorite.product.condition}
                  </span>
                </div>

                <button
                  onClick={() =>
                    removeFavorite(favorite.favoriteId)
                  }
                  style={removeButtonStyle}
                >
                  Quitar favorito
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const fontFamily =
  "'Manrope', 'Satoshi', 'Avenir Next', system-ui, sans-serif";

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily,
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "46px",
  fontFamily,
};

const headerStyle = {
  maxWidth: "1180px",
  margin: "0 auto 44px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "24px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-2px",
};

const subtitleStyle = {
  color: "#666",
  marginTop: "12px",
};

const backButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
};

const emptyStyle = {
  maxWidth: "720px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "48px",
  borderRadius: "32px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "32px",
  marginBottom: "12px",
};

const emptyTextStyle = {
  color: "#666",
  marginBottom: "28px",
};

const shopButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
};

const gridStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
};

const imageLinkStyle = {
  display: "block",
};

const imageBoxStyle = {
  height: "280px",
  background: "#efefea",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "90%",
  height: "90%",
  objectFit: "contain" as const,
};

const contentStyle = {
  padding: "24px",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const productTitleStyle = {
  fontSize: "26px",
  lineHeight: 1,
  marginBottom: "18px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const priceStyle = {
  fontSize: "22px",
  fontWeight: 700,
};

const conditionStyle = {
  background: "#efefef",
  padding: "8px 13px",
  borderRadius: "999px",
  fontSize: "12px",
  color: "#555",
};

const removeButtonStyle = {
  width: "100%",
  background: "#fff",
  color: "#c0392b",
  border: "1px solid #f0c7c1",
  borderRadius: "999px",
  padding: "13px",
  fontWeight: 700,
  cursor: "pointer",
};