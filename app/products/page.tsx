"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

function ProductsContent() {
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

  const loadProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setProductos([]);
      setLoading(false);
      return;
    }

    setProductos(data || []);
    setLoading(false);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("ALL");
    setSelectedBrand("ALL");
    setMinPrice("");
    setMaxPrice("");
    setShowSold(false);
    setSort("newest");
  };

  const filteredProducts = useMemo(() => {
    return productos
      .filter((product) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
          !searchValue ||
          product.title?.toLowerCase().includes(searchValue) ||
          product.brand?.toLowerCase().includes(searchValue) ||
          product.category?.toLowerCase().includes(searchValue);

        const matchesCategory =
          selectedCategory === "ALL" || product.category === selectedCategory;

        const matchesBrand =
          selectedBrand === "ALL" ||
          product.brand?.toLowerCase() === selectedBrand.toLowerCase();

        const matchesMin = !minPrice || Number(product.price) >= Number(minPrice);
        const matchesMax = !maxPrice || Number(product.price) <= Number(maxPrice);
        const matchesSold = showSold ? true : !product.sold;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesMin &&
          matchesMax &&
          matchesSold
        );
      })
      .sort((a, b) => {
        if (sort === "price-low") return Number(a.price) - Number(b.price);
        if (sort === "price-high") return Number(b.price) - Number(a.price);
        if (sort === "popular") return Number(b.likes || 0) - Number(a.likes || 0);

        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      });
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

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  return (
    <main style={pageStyle} className="products-page-main">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV MARKETPLACE</p>

        <h1 style={titleStyle} className="products-page-title">
          {selectedCategory !== "ALL" ? selectedCategory : "All products"}
        </h1>
      </section>

      <section style={filtersWrapperStyle}>
        <SearchBar value={search} onChange={setSearch} />

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

        <div style={filterActionsStyle}>
          <button onClick={clearFilters} style={secondaryButtonStyle}>
            Clear filters
          </button>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </section>

      {loading ? (
        <section style={gridStyle} className="products-page-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={cardStyle}>
              <div style={imageWrapperStyle} />
              <div style={contentStyle}>
                <div style={skeletonLineStyle} />
                <div style={skeletonTitleStyle} />
                <div style={skeletonPriceStyle} />
              </div>
            </div>
          ))}
        </section>
      ) : filteredProducts.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>No products found</h2>
          <p style={emptyTextStyle}>
            Try clearing filters or choosing another category.
          </p>
        </section>
      ) : (
        <section style={gridStyle} className="products-page-grid">
          {filteredProducts.map((producto) => (
            <article
              key={producto.id}
              onClick={() => router.push(`/products/${producto.id}`)}
              style={cardStyle}
              className="product-card"
            >
              <div style={imageWrapperStyle} className="products-page-image">
                <Image
                  src={safeImage(producto.image)}
                  alt={producto.title || "Product"}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />

                {producto.sold && <span style={soldBadgeStyle}>SOLD</span>}
              </div>

              <div style={contentStyle}>
                <p style={brandStyle}>{producto.brand || "SPORT"}</p>
                <h2 style={productTitleStyle}>{producto.title}</h2>
                <p style={priceStyle}>€{producto.price}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .product-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.08);
        }

        @media (max-width: 1100px) {
          .products-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 700px) {
          .products-page-main {
            padding: 120px 18px 34px !important;
          }

          .products-page-title {
            font-size: 46px !important;
            letter-spacing: -2px !important;
          }

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

export default function ProductsPage() {
  return (
    <Suspense fallback={<main style={pageStyle}>Loading products...</main>}>
      <ProductsContent />
    </Suspense>
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

const filtersWrapperStyle = {
  maxWidth: "1400px",
  margin: "0 auto 24px",
  display: "grid",
  gap: "18px",
};

const filterActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap" as const,
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "13px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const gridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "40px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.06)",
  cursor: "pointer",
  boxShadow: "0 20px 70px rgba(0,0,0,0.035)",
};

const imageWrapperStyle = {
  height: "300px",
  position: "relative" as const,
  background: "#f8f8f6",
  overflow: "hidden",
};

const soldBadgeStyle = {
  position: "absolute" as const,
  top: "18px",
  right: "18px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "9px 13px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const contentStyle = {
  padding: "28px",
};

const brandStyle = {
  fontSize: "12px",
  opacity: 0.5,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const productTitleStyle = {
  fontSize: "30px",
  marginTop: "10px",
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
  height: "20px",
  borderRadius: "999px",
  background: "#ececec",
};