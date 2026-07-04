"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductsClient() {
  const router = useRouter();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [productos, setProductos] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"latest" | "price_low" | "price_high">(
    "latest"
  );

  useEffect(() => {
    loadMarketplace();

    const channel = supabase
      .channel("products-marketplace-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => loadMarketplace()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_posts" },
        () => loadMarketplace()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [categoryFilter]);

  async function loadMarketplace() {
    try {
      setLoading(true);
      setDebug("");

      let query = supabase
        .from("products")
        .select("*")
        .eq("sold", false)
        .eq("moderation_status", "approved");

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

      const { data: featured } = await supabase
        .from("products")
        .select("*")
        .eq("sold", false)
        .eq("moderation_status", "approved")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      const { data: posts } = await supabase
        .from("feed_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      setProductos(data || []);
      setFeaturedProducts(featured || []);
      setFeedPosts(posts || []);
    } catch (e: any) {
      console.error(e);
      setDebug(e.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const filteredProducts = useMemo(() => {
    let result = [...productos];

    if (search.trim()) {
      const value = search.toLowerCase().trim();

      result = result.filter((product: any) => {
        return (
          String(product.title || "").toLowerCase().includes(value) ||
          String(product.brand || "").toLowerCase().includes(value) ||
          String(product.category || "").toLowerCase().includes(value) ||
          String(product.sport || "").toLowerCase().includes(value)
        );
      });
    }

    if (sort === "price_low") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }

    if (sort === "price_high") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }

    return result;
  }, [productos, search, sort]);

  const categories = [
    { label: "Todo", value: "" },
    { label: "Pádel", value: "Pádel" },
    { label: "Tenis", value: "Tenis" },
    { label: "Golf", value: "Golf" },
    { label: "Running", value: "Running" },
    { label: "Fitness", value: "Fitness" },
  ];

  return (
    <main style={pageStyle} className="marketplace-page">
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>{t.marketplaceEyebrow}</p>

          <h1 style={titleStyle} className="marketplace-title">
          {t.marketplaceTitle1}
<br />
{t.marketplaceTitle2}
          </h1>

          <p style={subtitleStyle}>
            {t.marketplaceSubtitle}
          </p>

          <div style={heroActionsStyle}>
            <button
              onClick={() => router.push("/sell")}
              style={primaryButtonStyle}
            >
              {t.sellProduct}
            </button>

            <button
              onClick={() => router.push("/buyer-guide")}
              style={secondaryButtonStyle}
            >
              {t.buyerGuide}
            </button>
          </div>
        </div>

        <div style={heroCardStyle}>
         <p style={heroCardEyebrowStyle}>{t.protectionEyebrow}</p>
          <h2 style={heroCardTitleStyle}>{t.buyWithConfidence}</h2>

          <div style={trustGridStyle}>
            <span>✓ {t.securePayment}</span>
<span>✓ {t.buyerProtection}</span>
<span>✓ {t.verifiedSellers}</span>
<span>✓ {t.selectedMarketplace}</span>
          </div>
        </div>
      </section>
            {featuredProducts.length > 0 && (
        <section style={featuredSectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>{t.curatedDrops}</p>
              <h2 style={sectionTitleStyle}>{t.featuredProducts}</h2>
            </div>

            <button
              onClick={() => router.push("/products")}
              style={smallButtonStyle}
            >
              {t.viewAll}
            </button>
          </div>

          <div style={featuredGridStyle}>
            {featuredProducts.map((product: any) => (
              <article
                key={product.id}
                style={featuredCardStyle}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <Image
                  src={safeImage(
                    product.image ||
                      product.image_url ||
                      product.images?.[0]
                  )}
                  alt={product.title || "Producto"}
                  fill
                  sizes="33vw"
                  style={{ objectFit: "cover" }}
                />

                <div style={featuredOverlayStyle}>
                  <p style={featuredBrandStyle}>
                    {product.brand || "ATHMOV"}
                  </p>

                  <h3 style={featuredTitleStyle}>{product.title}</h3>

                  <p style={featuredPriceStyle}>€{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section style={filtersSectionStyle}>
        <div style={categoryRowStyle}>
          {categories.map((category) => {
            const active =
              (!categoryFilter && category.value === "") ||
              categoryFilter === category.value;

            return (
              <button
                key={category.label}
                onClick={() => {
                  if (category.value) {
                    router.push(`/products?category=${category.value}`);
                  } else {
                    router.push("/products");
                  }
                }}
                style={{
                  ...categoryButtonStyle,
                  ...(active ? activeCategoryButtonStyle : {}),
                }}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div style={searchSortRowStyle}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchMarketplace}
            style={searchInputStyle}
          />

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "latest" | "price_low" | "price_high")
            }
            style={sortSelectStyle}
          >
            <option value="latest">{t.sortLatest}</option>
<option value="price_low">{t.sortPriceLow}</option>
<option value="price_high">{t.sortPriceHigh}</option>
          </select>
        </div>
      </section>

      {debug && <p style={debugStyle}>{debug}</p>}

      <section style={productsSectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>MARKETPLACE</p>

            <h2 style={sectionTitleStyle}>
              {categoryFilter ? categoryFilter : t.allProducts}
            </h2>
          </div>

          <p style={countStyle}>
            {filteredProducts.length}{" "}
{filteredProducts.length === 1
  ? t.productCountSingular
  : t.productCountPlural}
          </p>
        </div>

        {loading ? (
          <div style={emptyStyle}>{t.productsLoading}</div>
        ) : filteredProducts.length === 0 ? (
          <div style={emptyStyle}>
            {t.noProducts}
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredProducts.map((product: any) => (
              <article
                key={product.id}
                style={cardStyle}
                className="marketplace-card"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div style={imageWrapperStyle}>
                  <Image
                    src={safeImage(
                      product.image ||
                        product.image_url ||
                        product.images?.[0]
                    )}
                    alt={product.title || "Producto"}
                    fill
                    sizes="25vw"
                    style={{ objectFit: "cover" }}
                  />

                  {product.featured && (
                    <span style={featuredBadgeStyle}>{t.featured}</span>
                  )}
                </div>

                <div style={cardContentStyle}>
                  <p style={brandStyle}>{product.brand || "ATHMOV"}</p>

                  <h2 style={productTitleStyle}>
                    {product.title || "Producto"}
                  </h2>

                  <div style={cardBottomStyle}>
                    <strong style={priceStyle}>€{product.price}</strong>

                    <span style={openStyle}>{t.viewProduct}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {feedPosts.length > 0 && (
        <section style={feedSectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>{t.communityEyebrow}</p>
<h2 style={sectionTitleStyle}>{t.communityTitle}</h2>
            </div>

            <button
              onClick={() => router.push("/feed")}
              style={smallButtonStyle}
            >
              {t.openFeed}
            </button>
          </div>

          <div style={feedGridStyle}>
            {feedPosts.map((post: any) => (
              <article key={post.id} style={feedCardStyle}>
                <div style={feedHeaderStyle}>
                  <div style={feedAvatarStyle}>
                    {post.user_email?.charAt(0).toUpperCase() || "A"}
                  </div>

                  <div>
                    <p style={feedEmailStyle}>
                      {post.user_email || "ATHMOV user"}
                    </p>

                    <p style={feedDateStyle}>
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>

                {post.content && (
                  <p style={feedContentStyle}>{post.content}</p>
                )}

                {post.image && (
                  <div style={feedImageStyle}>
                    <Image
                      src={safeImage(post.image)}
                      alt="Feed"
                      fill
                      sizes="300px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <p style={feedLikesStyle}>♥ {post.likes || 0}</p>
              </article>
            ))}
          </div>
        </section>
      )}
            <style>{`
        .marketplace-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .marketplace-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.08);
        }

        @media (max-width: 1000px) {
          .marketplace-title {
            font-size: 56px !important;
            letter-spacing: -3px !important;
          }
        }

        @media (max-width: 800px) {
          .marketplace-page {
            padding: 120px 18px 40px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1400px",
  margin: "0 auto 70px",
  display: "grid",
  gridTemplateColumns: "1.4fr 0.8fr",
  gap: "34px",
  alignItems: "end",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const titleStyle = {
  fontSize: "82px",
  lineHeight: 0.95,
  letterSpacing: "-5px",
  margin: 0,
};

const subtitleStyle = {
  maxWidth: "620px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "26px",
};

const heroActionsStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
  marginTop: "32px",
};

const primaryButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px 24px",
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "16px 24px",
  fontWeight: 900,
  cursor: "pointer",
};

const heroCardStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "36px",
  padding: "34px",
};

const heroCardEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const heroCardTitleStyle = {
  fontSize: "34px",
  lineHeight: 1,
  letterSpacing: "-2px",
};

const trustGridStyle = {
  display: "grid",
  gap: "12px",
  marginTop: "24px",
  color: "rgba(255,255,255,0.72)",
};

const featuredSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 60px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  marginBottom: "24px",
};

const sectionTitleStyle = {
  fontSize: "44px",
  lineHeight: 1,
  letterSpacing: "-2px",
  margin: 0,
};

const smallButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 900,
  cursor: "pointer",
};

const featuredGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
};

const featuredCardStyle = {
  position: "relative" as const,
  height: "430px",
  borderRadius: "36px",
  overflow: "hidden",
  background: "#111",
  cursor: "pointer",
};

const featuredOverlayStyle = {
  position: "absolute" as const,
  inset: 0,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end",
  padding: "28px",
  background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.05))",
  color: "#fff",
};

const featuredBrandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.75,
};

const featuredTitleStyle = {
  fontSize: "30px",
  margin: "8px 0 10px",
};

const featuredPriceStyle = {
  fontSize: "26px",
  fontWeight: 900,
};

const filtersSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 40px",
};

const categoryRowStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
};

const categoryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 900,
  cursor: "pointer",
};

const activeCategoryButtonStyle = {
  background: "#111",
  color: "#fff",
};

const searchSortRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 240px",
  gap: "14px",
  marginTop: "18px",
};

const searchInputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "16px 20px",
  outline: "none",
  fontSize: "15px",
};

const sortSelectStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "16px 18px",
  background: "#fff",
  fontWeight: 800,
};

const debugStyle = {
  maxWidth: "1400px",
  margin: "0 auto 20px",
  color: "red",
};

const productsSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 70px",
};

const countStyle = {
  color: "#666",
  fontWeight: 800,
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "42px",
  color: "#666",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "28px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "32px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  height: "320px",
  background: "#eee",
};

const featuredBadgeStyle = {
  position: "absolute" as const,
  top: "16px",
  left: "16px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "10px",
  fontWeight: 900,
};

const cardContentStyle = {
  padding: "24px",
};

const brandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  textTransform: "uppercase" as const,
};

const productTitleStyle = {
  fontSize: "24px",
  margin: "10px 0 18px",
};

const cardBottomStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const priceStyle = {
  fontSize: "26px",
};

const openStyle = {
  fontSize: "13px",
  fontWeight: 900,
  opacity: 0.55,
};

const feedSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
};

const feedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const feedCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "20px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const feedHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const feedAvatarStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const feedEmailStyle = {
  margin: 0,
  fontWeight: 900,
};

const feedDateStyle = {
  margin: "4px 0 0",
  fontSize: "12px",
  opacity: 0.45,
};

const feedContentStyle = {
  color: "#555",
  lineHeight: 1.6,
};

const feedImageStyle = {
  position: "relative" as const,
  height: "180px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#eee",
};

const feedLikesStyle = {
  fontWeight: 900,
};