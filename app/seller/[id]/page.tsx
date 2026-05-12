"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
};

export default function SellerPage() {
  const params = useParams();
  const sellerId = params.id as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSellerProducts();
  }, [sellerId]);

  const loadSellerProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando vendedor...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>Vendedor ATHMOV</p>
        <h1 style={titleStyle}>Perfil del vendedor</h1>
        <p style={subtitleStyle}>
          Productos publicados por este vendedor.
        </p>
      </section>

      {products.length === 0 ? (
        <section style={emptyStyle}>
          Este vendedor todavía no tiene productos publicados.
        </section>
      ) : (
        <section style={gridStyle}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              style={cardStyle}
            >
              <div style={imageBoxStyle}>
                <img
                  src={
                    product.image ||
                    "https://placehold.co/700x700?text=ATHMOV"
                  }
                  alt={product.title}
                  style={imageStyle}
                />
              </div>

              <div style={contentStyle}>
                <p style={brandStyle}>{product.brand}</p>
                <h2 style={productTitleStyle}>{product.title}</h2>

                <div style={rowStyle}>
                  <p style={priceStyle}>€{product.price}</p>
                  <span style={conditionStyle}>{product.condition}</span>
                </div>
              </div>
            </Link>
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
  marginTop: "14px",
  color: "#666",
};

const emptyStyle = {
  maxWidth: "720px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "48px",
  borderRadius: "32px",
  textAlign: "center" as const,
  color: "#666",
};

const gridStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
  textDecoration: "none",
  color: "#111",
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