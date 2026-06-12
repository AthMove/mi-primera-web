"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState("");

  useEffect(() => {
    loadProducts();
  }, [categoryFilter]);

  async function loadProducts() {
    try {
      setLoading(true);

      let query = supabase
        .from("products")
        .select("*")
        .eq("sold", false);

      if (categoryFilter) {
        query = query.eq("category", categoryFilter);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error(error);
        setDebug(error.message);
        setProductos([]);
        return;
      }

      setProductos(data || []);
    } catch (e: any) {
      console.error(e);
      setDebug(e.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={pageStyle}>
      <p style={eyebrowStyle}>MARKETPLACE</p>

      <h1 style={titleStyle}>
        {categoryFilter ? categoryFilter : "Products"}
      </h1>

      {debug && (
        <p style={{ color: "red", marginBottom: 20 }}>
          {debug}
        </p>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : productos.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={gridStyle}>
          {productos.map((product) => (
            <div
              key={product.id}
              style={cardStyle}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div style={imageWrapperStyle}>
                <Image
                  src={product.image || "/logo.png"}
                  alt={product.title || "Product"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={cardContentStyle}>
                <h2>{product.title}</h2>
                <p>{product.brand}</p>
                <strong>€{product.price}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
const pageStyle = {
  minHeight: "100vh",
  background: "#f7f7f3",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "64px",
  margin: "0 0 30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "30px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  overflow: "hidden",
  cursor: "pointer",
};

const imageWrapperStyle = {
  position: "relative" as const,
  height: "320px",
  background: "#eee",
};

const cardContentStyle = {
  padding: "24px",
};