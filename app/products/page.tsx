"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
  category?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("TODAS");
  const [condition, setCondition] = useState("TODOS");
  const [sort, setSort] = useState("RECIENTES");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setProducts(data);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(value) ||
          product.brand?.toLowerCase().includes(value)
      );
    }

    if (category !== "TODAS") {
      result = result.filter((product) => product.category === category);
    }

    if (condition !== "TODOS") {
      result = result.filter((product) => product.condition === condition);
    }

    if (sort === "PRECIO_ASC") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "PRECIO_DESC") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, search, category, condition, sort]);

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <Link href="/" style={logoStyle}>
          ATHMOV
        </Link>
      </div>

      <section style={heroStyle}>
        <h1 style={titleStyle}>Marketplace</h1>
        <p style={subtitleStyle}>Equipamiento premium deportivo</p>
      </section>

      <section style={filtersStyle}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar marca o modelo..."
          style={searchStyle}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={selectStyle}
        >
          <option value="TODAS">Todas las categorías</option>
          <option value="PADEL">PADEL</option>
          <option value="TENNIS">TENNIS</option>
          <option value="GOLF">GOLF</option>
          <option value="RUNNING">RUNNING</option>
          <option value="ROPA">ROPA</option>
        </select>

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={selectStyle}
        >
          <option value="TODOS">Todos los estados</option>
          <option value="Nueva">Nueva</option>
          <option value="Como nueva">Como nueva</option>
          <option value="Usada">Usada</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={selectStyle}
        >
          <option value="RECIENTES">Más recientes</option>
          <option value="PRECIO_ASC">Precio menor</option>
          <option value="PRECIO_DESC">Precio mayor</option>
        </select>
      </section>

      {filteredProducts.length === 0 ? (
        <section style={emptyStyle}>
          No hay productos que coincidan con tu búsqueda.
        </section>
      ) : (
        <section style={gridStyle}>
          {filteredProducts.map((product) => (
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
      )}
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
  textDecoration: "none",
  color: "#111",
};

const heroStyle = {
  padding: "0 32px 30px",
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

const filtersStyle = {
  padding: "0 32px 34px",
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "14px",
};

const searchStyle = {
  width: "100%",
  padding: "15px 18px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const selectStyle = {
  width: "100%",
  padding: "15px 18px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  fontSize: "13px",
  fontWeight: 700,
  outline: "none",
  boxSizing: "border-box" as const,
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

const emptyStyle = {
  margin: "0 32px",
  background: "#fff",
  borderRadius: "28px",
  padding: "46px",
  textAlign: "center" as const,
  color: "#666",
};