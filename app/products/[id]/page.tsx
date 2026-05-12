"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  condition: string;
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error cargando producto:", error);
    }

    if (data) {
      setProduct(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando producto...</main>;
  }

  if (!product) {
    return <main style={loadingStyle}>Producto no encontrado</main>;
  }

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <section style={imageSectionStyle}>
          <img
            src={product.image || "https://placehold.co/900x900?text=ATHMOV"}
            alt={product.title}
            style={imageStyle}
          />
        </section>

        <section style={infoStyle}>
          <p style={brandStyle}>{product.brand}</p>
          <h1 style={titleStyle}>{product.title}</h1>
          <p style={priceStyle}>€{product.price}</p>
          <span style={conditionStyle}>{product.condition}</span>
          <p style={descriptionStyle}>{product.description}</p>

          <a
  href={`/api/checkout?productId=${product.id}`}
  style={buttonStyle}
>
  Comprar ahora
</a>
        </section>
      </div>
    </main>
  );
}

const fontFamily = "'Manrope', 'Satoshi', 'Avenir Next', sans-serif";

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily,
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "40px",
  fontFamily,
};

const containerStyle = {
  maxWidth: "980px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "430px 1fr",
  gap: "50px",
  alignItems: "center",
};

const imageSectionStyle = {
  background: "#efefea",
  borderRadius: "28px",
  height: "520px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "90%",
  height: "90%",
  objectFit: "contain" as const,
  display: "block",
};

const infoStyle = {
  maxWidth: "420px",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#666",
  marginBottom: "14px",
  fontWeight: 600,
};

const titleStyle = {
  fontSize: "42px",
  lineHeight: 1,
  marginBottom: "22px",
  fontWeight: 700,
  color: "#111",
};

const priceStyle = {
  fontSize: "28px",
  marginBottom: "22px",
  fontWeight: 600,
  color: "#111",
};

const conditionStyle = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "#e7e7e2",
  color: "#666",
  fontSize: "12px",
  fontWeight: 700,
  marginBottom: "28px",
};

const descriptionStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#444",
  marginBottom: "34px",
};

const buttonStyle = {
  width: "100%",
  display: "block",
  textAlign: "center" as const,
  textDecoration: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
};