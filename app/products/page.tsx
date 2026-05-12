"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <div style={logoStyle}>ATHMOV</div>
      </div>

      <section style={heroStyle}>
        <h1 style={titleStyle}>Marketplace</h1>
        <p style={subtitleStyle}>Equipamiento premium deportivo</p>
      </section>

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
                  "https://placehold.co/600x600?text=ATHMOV"
                }
                alt={product.title}
                style={imageStyle}
              />
            </div>

            <div style={contentStyle}>
              <p style={brandStyle}>{product.brand}</p>

              <h2 style={productTitleStyle}>{product.title}</h2>

              <div style={bottomRowStyle}>
                <p style={priceStyle}>€{product.price}</p>

                <span style={conditionStyle}>{product.condition}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f5f1",
  paddingBottom: "80px",
};

const topBarStyle = {
  padding: "24px 32px 8px",
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-1px",
};

const heroStyle = {
  padding: "0 32px 36px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 0.95,
  letterSpacing: "-3px",
  fontWeight: 800,
  marginBottom: "12px",
};

const subtitleStyle = {
  color: "#666",
  fontSize: "15px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "24px",
  padding: "0 32px",
};

const cardStyle = {
  background: "#f7f7f4",
  borderRadius: "26px",
  overflow: "hidden",
  textDecoration: "none",
  color: "#111",
};

const imageBoxStyle = {
  width: "100%",
  height: "250px",
  background: "#f0f0ec",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "155%",
  height: "155%",
  objectFit: "cover" as const,
  objectPosition: "center 42%",
  display: "block",
};

const contentStyle = {
  padding: "22px",
};

const brandStyle = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  color: "#777",
  letterSpacing: "2px",
  marginBottom: "10px",
};

const productTitleStyle = {
  fontSize: "24px",
  lineHeight: 1,
  fontWeight: 700,
  letterSpacing: "-1px",
  marginBottom: "18px",
};

const bottomRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const priceStyle = {
  fontSize: "21px",
  fontWeight: 700,
};

const conditionStyle = {
  background: "#ecece7",
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#666",
};