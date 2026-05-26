"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");

  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showSold, setShowSold] = useState(false);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setSelectedCategory(category ? category.toUpperCase() : "ALL");
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProductos(data);
    }

    setLoading(false);
  }

  const filteredProducts = useMemo(() => {
    let filtered = [...productos];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toUpperCase() === selectedCategory.toUpperCase()
      );
    }

    if (selectedBrand !== "ALL") {
      filtered = filtered.filter(
        (p) => p.brand?.toUpperCase() === selectedBrand.toUpperCase()
      );
    }

    if (minPrice) {
      filtered = filtered.filter(
        (p) => Number(p.price) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (p) => Number(p.price) <= Number(maxPrice)
      );
    }

    if (!showSold) {
      filtered = filtered.filter((p) => !p.sold);
    }

    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    productos,
    search,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    showSold,
    sort,
  ]);

  return (
    <main style={pageStyle}>
      <div style={headerStyle}>
        <p style={eyebrowStyle}>MARKETPLACE</p>

        <h1 style={titleStyle}>Products</h1>

        <p style={subtitleStyle}>
          Discover unique pieces from verified sellers.
        </p>
      </div>

      <div style={toolbarStyle}>
        <SearchBar value={search} onChange={setSearch} />

        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        showSold={showSold}
        setShowSold={setShowSold}
      />

      {loading ? (
        <div className="products-page-grid" style={gridStyle}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} style={cardStyle}>
              <div
                className="products-page-image"
                style={skeletonImageStyle}
              />

              <div style={cardContentStyle}>
                <div style={skeletonTitleStyle} />
                <div style={skeletonLineStyle} />
                <div style={skeletonPriceStyle} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={emptyStyle}>
          <h2 style={emptyTitleStyle}>No products found</h2>

          <p style={emptyTextStyle}>
            Try changing the filters or search term.
          </p>
        </div>
      ) : (
        <div className="products-page-grid" style={gridStyle}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={cardStyle}
onClick={() => router.push(`/products/${product.id}`)}
>
              <div
                className="products-page-image"
                style={imageWrapperStyle}
              >
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.title || "Product"}
                  fill
                  style={imageStyle}
                />
              </div>

              <div style={cardContentStyle}>
                <h2 style={productTitleStyle}>{product.title}</h2>

                <p style={brandStyle}>{product.brand}</p>

                <p style={priceStyle}>€{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1100px) {
          .products-page-grid {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
          }

          .products-page-image {
            height: 260px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f7f3",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1400px",
  margin: "0 auto 30px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "64px",
  lineHeight: 1,
  margin: 0,
  marginBottom: "34px",
  letterSpacing: "-4px",
};

const subtitleStyle = {
  fontSize: "18px",
  color: "#666",
  maxWidth: "700px",
  lineHeight: 1.6,
};

const toolbarStyle = {
  maxWidth: "1400px",
  margin: "0 auto 30px",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap" as const,
};

const gridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
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
  width: "100%",
  height: "320px",
  background: "#ececec",
};

const imageStyle = {
  objectFit: "cover" as const,
};

const cardContentStyle = {
  padding: "24px",
};

const productTitleStyle = {
  fontSize: "22px",
  margin: 0,
  marginBottom: "10px",
};

const brandStyle = {
  color: "#666",
  marginBottom: "18px",
};

const priceStyle = {
  fontSize: "28px",
  fontWeight: 700,
};

const emptyStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "30px",
  padding: "42px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "28px",
  margin: 0,
};

const emptyTextStyle = {
  color: "#666",
  marginTop: "10px",
};

const skeletonLineStyle = {
  width: "35%",
  height: "14px",
  borderRadius: "999px",
  background: "#ececec",
  marginBottom: "14px",
};

const skeletonTitleStyle = {
  width: "80%",
  height: "24px",
  borderRadius: "999px",
  background: "#ececec",
  marginBottom: "18px",
};

const skeletonPriceStyle = {
  width: "40%",
  height: "32px",
  borderRadius: "999px",
  background: "#ececec",
};

const skeletonImageStyle = {
  width: "100%",
  height: "320px",
  background: "#ececec",
};