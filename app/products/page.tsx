"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");

  const [productos, setProductos] = useState<any[]>([]);
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSearch, setSavingSearch] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showSold, setShowSold] = useState(false);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toUpperCase());
    } else {
      setSelectedCategory("ALL");
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
    loadSavedSearches();
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
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

  const loadSavedSearches = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setSavedSearches(data || []);
  };

  const saveCurrentSearch = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const title =
      search || selectedBrand !== "ALL"
        ? `${selectedBrand !== "ALL" ? selectedBrand : ""} ${search}`.trim()
        : selectedCategory !== "ALL"
          ? selectedCategory
          : "Saved search";

    try {
      setSavingSearch(true);

      const { error } = await supabase.from("saved_searches").insert([
        {
          user_id: user.id,
          title,
          search,
          category: selectedCategory,
          brand: selectedBrand,
          min_price: minPrice,
          max_price: maxPrice,
          show_sold: showSold,
          sort,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      await loadSavedSearches();
      alert("Search saved");
    } finally {
      setSavingSearch(false);
    }
  };

  const applySavedSearch = (item: any) => {
    setSearch(item.search || "");
    setSelectedCategory(item.category || "ALL");
    setSelectedBrand(item.brand || "ALL");
    setMinPrice(item.min_price || "");
    setMaxPrice(item.max_price || "");
    setShowSold(!!item.show_sold);
    setSort(item.sort || "newest");
  };

  const deleteSavedSearch = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();

    const confirmDelete = confirm("Delete saved search?");
    if (!confirmDelete) return;

    await supabase.from("saved_searches").delete().eq("id", id);
    await loadSavedSearches();
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

        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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

  const safeImage = (src: string) => {
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

      <section style={premiumFiltersWrapperStyle}>
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

          <button onClick={saveCurrentSearch} style={saveButtonStyle}>
            {savingSearch ? "Saving..." : "Save search"}
          </button>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </section>

      {savedSearches.length > 0 && (
        <section style={savedSearchesStyle}>
          <p style={savedEyebrowStyle}>SAVED SEARCHES</p>

          <div style={savedListStyle}>
            {savedSearches.map((item) => (
              <div key={item.id} onClick={() => applySavedSearch(item)} style={savedItemStyle}>
                <span>{item.title}</span>

                <small>
                  {item.category || "ALL"} · {item.brand || "ALL"}
                </small>

                <button onClick={(e) => deleteSavedSearch(e, item.id)} style={deleteSavedStyle}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredProducts.some((product) => product.featured) && (
        <section style={featuredSectionStyle}>
          <p style={eyebrowStyle}>CURATED BY ATHMOV</p>
          <h2 style={featuredTitleStyle}>Featured Drops</h2>

          <div style={featuredGridStyle}>
            {filteredProducts
              .filter((product) => product.featured)
              .slice(0, 3)
              .map((product) => (
                <article
                  key={product.id}
                  onClick={() => router.push(`/products/${product.id}`)}
                  style={featuredCardStyle}
                >
                  <Image
                    src={safeImage(product.image)}
                    alt={product.title || "Product"}
                    fill
                    sizes="33vw"
                    style={{ objectFit: "cover" }}
                  />

                  <div style={featuredOverlayStyle}>
                    <p style={featuredBrandStyle}>{product.brand}</p>
                    <h3 style={featuredProductTitleStyle}>{product.title}</h3>
                    <p style={featuredPriceStyle}>€{product.price}</p>
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}

      {loading ? (
        <section style={gridStyle} className="products-page-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="skeleton-card" style={cardStyle}>
              <div className="skeleton-image" style={imageWrapperStyle} />

              <div style={contentStyle}>
                <div className="skeleton-line short" />
                <div className="skeleton-line title" />
                <div className="skeleton-line price" />
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
              className="product-card"
              onClick={() => router.push(`/products/${producto.id}`)}
              style={cardStyle}
            >
              <div style={imageWrapperStyle} className="products-page-image">
                <Image
                  src={safeImage(producto.image)}
                  alt={producto.title || "Product"}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="product-image"
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

        .product-image {
          transition: transform 0.45s ease, filter 0.45s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.06);
          filter: contrast(1.04) saturate(1.04);
        }

        .skeleton-image,
        .skeleton-line {
          animation: pulse 1.4s ease infinite;
          background: linear-gradient(90deg, #f1f1ef 0%, #e7e7e4 50%, #f1f1ef 100%);
          background-size: 200% 100%;
        }

        .skeleton-line {
          height: 14px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .skeleton-line.short {
          width: 30%;
        }

        .skeleton-line.title {
          width: 78%;
          height: 24px;
        }

        .skeleton-line.price {
          width: 40%;
          height: 20px;
          margin-top: 22px;
        }

        @keyframes pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 1100px) {
          .products-page-grid,
          .featured-grid {
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

          .products-page-grid,
          .featured-grid {
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

const premiumFiltersWrapperStyle = {
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

const saveButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "13px 18px",
  fontWeight: 800,
  cursor: "pointer",
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

const savedSearchesStyle = {
  maxWidth: "1400px",
  margin: "0 auto 34px",
  background: "#fff",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const savedEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "14px",
};

const savedListStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "12px",
};

const savedItemStyle = {
  position: "relative" as const,
  background: "#f7f7f3",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "12px 42px 12px 16px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  gap: "3px",
  cursor: "pointer",
  fontWeight: 800,
};

const deleteSavedStyle = {
  position: "absolute" as const,
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  width: "22px",
  height: "22px",
  cursor: "pointer",
  fontSize: "11px",
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

const featuredSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 46px",
};

const featuredTitleStyle = {
  fontSize: "42px",
  margin: "0 0 24px",
  letterSpacing: "-2px",
};

const featuredGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "22px",
};

const featuredCardStyle = {
  position: "relative" as const,
  height: "360px",
  borderRadius: "34px",
  overflow: "hidden",
  cursor: "pointer",
  background: "#111",
};

const featuredOverlayStyle = {
  position: "absolute" as const,
  inset: 0,
  padding: "28px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end",
  background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.05))",
  color: "#fff",
};

const featuredBrandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.75,
};

const featuredProductTitleStyle = {
  fontSize: "30px",
  margin: "8px 0 10px",
};

const featuredPriceStyle = {
  fontSize: "24px",
  fontWeight: 800,
};