"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";
import ProductCard from "@/components/home/cards/ProductCard";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LaunchNoticeModal from "@/components/LaunchNoticeModal";

interface ProductsClientProps {
  fixedCategory?: string;
  fixedBrand?: string;
  embedded?: boolean;
}

type SortOption =
  | "latest"
  | "price_low"
  | "price_high";

const normalizeCategory = (
  value?: string | null
) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const aliases: Record<string, string> = {
    padel: "padel",
    paddle: "padel",
    pala: "padel",
    palas: "padel",

    tenis: "tenis",
    tennis: "tenis",
    raqueta: "tenis",
    raquetas: "tenis",

    golf: "golf",
    palos: "golf",

    running: "running",
    correr: "running",
    zapatillas: "running",

    fitness: "fitness",
    gimnasio: "fitness",
  };

  return aliases[normalized] || normalized;
};

const normalizeSearchText = (
  value?: string | null
) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function ProductsClient({
  fixedCategory,
  fixedBrand,
  embedded = false,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();
  const locale =
  lang === "en"
    ? "en-GB"
    : lang === "pt"
      ? "pt-PT"
      : "es-ES";
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const categoryFilter =
    fixedCategory ||
    searchParams.get("category") ||
    "";

  const [productos, setProductos] =
    useState<any[]>([]);

  const [
    featuredProducts,
    setFeaturedProducts,
  ] = useState<any[]>([]);

  const [feedPosts, setFeedPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [isMobile, setIsMobile] =
    useState(false);

  const [debug, setDebug] =
    useState("");

const [search, setSearch] = useState(
  searchParams.get("search") || ""
);

useEffect(() => {
  setSearch(searchParams.get("search") || "");
}, [searchParams]);

  const [sort, setSort] =
    useState<SortOption>("latest");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 700
      );
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  useEffect(() => {
    void loadMarketplace();

    const channel = supabase
      .channel(
        "products-marketplace-realtime"
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        () => {
          void loadMarketplace();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "feed_posts",
        },
        () => {
          void loadMarketplace();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(
        channel
      );
    };
 }, [fixedBrand, t]);

  async function loadMarketplace() {
    try {
      setLoading(true);
      setDebug("");

      let productsQuery = supabase
        .from("products")
        .select("*")
        .eq("sold", false)
        .eq(
          "moderation_status",
          "approved"
        );

      if (fixedBrand) {
        productsQuery =
          productsQuery.ilike(
            "brand",
            fixedBrand.trim()
          );
      }

      const {
        data: productsData,
        error: productsError,
      } = await productsQuery.order(
        "created_at",
        {
          ascending: false,
        }
      );

      if (productsError) {
        console.error(
          "ERROR CARGANDO PRODUCTOS:",
          productsError
        );

        setDebug(
          productsError.message
        );

        setProductos([]);
        return;
      }

      let featuredQuery = supabase
        .from("products")
        .select("*")
        .eq("sold", false)
        .eq(
          "moderation_status",
          "approved"
        )
        .eq("featured", true);

      if (fixedBrand) {
        featuredQuery =
          featuredQuery.ilike(
            "brand",
            fixedBrand.trim()
          );
      }

      const {
        data: featuredData,
        error: featuredError,
      } = await featuredQuery
        .order("created_at", {
          ascending: false,
        })
        .limit(12);

      if (featuredError) {
        console.error(
          "ERROR CARGANDO DESTACADOS:",
          featuredError
        );
      }

      const {
        data: postsData,
        error: postsError,
      } = await supabase
        .from("feed_posts")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(4);

      if (postsError) {
        console.error(
          "ERROR CARGANDO FEED:",
          postsError
        );
      }

      /*
       * Guardamos todos los productos.
       *
       * El filtro por categoría se aplica
       * después mediante useMemo.
       */
      setProductos(
        productsData || []
      );

      setFeaturedProducts(
        featuredData || []
      );

      setFeedPosts(
        postsData || []
      );
    } catch (error: unknown) {
      console.error(
        "ERROR GENERAL DEL MARKETPLACE:",
        error
      );

      setDebug(
        error instanceof Error
          ? error.message
          : t.productsLoadError
      );

      setProductos([]);
      setFeaturedProducts([]);
      setFeedPosts([]);
    } finally {
      setLoading(false);
    }
  }

  const safeImage = (
    src?: string
  ) => {
    if (
      src?.startsWith("http") ||
      src?.startsWith("/")
    ) {
      return src;
    }

    return "/logo.png";
  };

  const filteredProducts =
    useMemo(() => {
      let result = [...productos];

      const normalizedFilter =
        normalizeCategory(
          categoryFilter
        );

      /*
       * Filtro por categoría.
       *
       * Valores equivalentes:
       *
       * PADEL / Pádel / padel
       * TENNIS / Tenis / tenis
       * GOLF / Golf / golf
       */
      if (normalizedFilter) {
        result = result.filter(
          (product: any) => {
            const productCategory =
              normalizeCategory(
                product.category
              );

            const productSport =
              normalizeCategory(
                product.sport
              );

            return (
              productCategory ===
                normalizedFilter ||
              productSport ===
                normalizedFilter
            );
          }
        );
      }

      if (search.trim()) {
        const searchValue =
          normalizeSearchText(
            search
          );

        result = result.filter(
          (product: any) => {
            const searchableText = [
              product.title,
              product.brand,
              product.category,
              product.sport,
              product.description,
            ]
              .map((item) =>
                normalizeSearchText(
                  item
                )
              )
              .join(" ");

            return searchableText.includes(
              searchValue
            );
          }
        );
      }

      if (
        sort === "price_low"
      ) {
        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );
      }

      if (
        sort === "price_high"
      ) {
        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );
      }

      if (sort === "latest") {
        result.sort((a, b) => {
          const dateA = new Date(
            a.created_at || 0
          ).getTime();

          const dateB = new Date(
            b.created_at || 0
          ).getTime();

          return dateB - dateA;
        });
      }

      return result;
    }, [
      productos,
      categoryFilter,
      search,
      sort,
    ]);

  const filteredFeaturedProducts =
    useMemo(() => {
      const normalizedFilter =
        normalizeCategory(
          categoryFilter
        );

      const result =
        featuredProducts.filter(
          (product: any) => {
            if (
              !normalizedFilter
            ) {
              return true;
            }

            const productCategory =
              normalizeCategory(
                product.category
              );

            const productSport =
              normalizeCategory(
                product.sport
              );

            return (
              productCategory ===
                normalizedFilter ||
              productSport ===
                normalizedFilter
            );
          }
        );

      return result.slice(0, 3);
    }, [
      featuredProducts,
      categoryFilter,
    ]);

  const categories = [
  {
    label: t.allCategory,
    value: "",
    route: "/products",
  },
  {
    label: t.padel,
    value: "PADEL",
    route: "/padel",
  },
  {
    label: t.tennis,
    value: "TENNIS",
    route: "/tenis",
  },
  {
    label: t.golf,
    value: "GOLF",
    route: "/golf",
  },
  {
    label: t.running,
    value: "RUNNING",
    route: "/running",
  },
  {
    label: t.fitness,
    value: "FITNESS",
    route: "/products?category=FITNESS",
  },
];

  const isGolfCategory =
  !embedded &&
  !fixedBrand &&
  normalizeCategory(categoryFilter) ===
    "golf";

  const visibleCategoryTitle =
    (() => {
      if (fixedBrand) {
        return fixedBrand;
      }

      if (!categoryFilter) {
        return t.allProducts;
      }

      const normalized =
        normalizeCategory(
          categoryFilter
        );

     const labels: Record<string, string> = {
  padel: t.padel,
  tenis: t.tennis,
  golf: t.golf,
  running: t.running,
};

      return (
        labels[normalized] ||
        categoryFilter
      );
    })();

      return (
    <div
      style={
        embedded
          ? embeddedPageStyle
          : pageStyle
      }
      className={
        embedded
          ? "marketplace-embedded"
          : "marketplace-page"
      }
    >
      {!embedded && (
        <section style={heroStyle}>
          <div>
            <p style={eyebrowStyle}>
              {t.marketplaceEyebrow}
            </p>

            <h1
              style={titleStyle}
              className="marketplace-title"
            >
              {t.marketplaceTitle1}
              <br />
              {t.marketplaceTitle2}
            </h1>

            <p style={subtitleStyle}>
              {t.marketplaceSubtitle}
            </p>

            <div style={heroActionsStyle}>
             <button
  type="button"
  onClick={() =>
    setShowLaunchModal(true)
  }
  style={primaryButtonStyle}
>
  {t.sellProduct}
</button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/buyer-guide"
                  )
                }
                style={
                  secondaryButtonStyle
                }
              >
                {t.buyerGuide}
              </button>
            </div>
          </div>

          <div style={heroCardStyle}>
            <p
              style={
                heroCardEyebrowStyle
              }
            >
              {t.protectionEyebrow}
            </p>

            <h2
              style={heroCardTitleStyle}
            >
              {t.buyWithConfidence}
            </h2>

            <div style={trustGridStyle}>
              <span>
                ✓ {t.securePayment}
              </span>

              <span>
                ✓ {t.buyerProtection}
              </span>

              <span>
                ✓ {t.verifiedSellers}
              </span>

              <span>
                ✓ {t.selectedMarketplace}
              </span>
            </div>
          </div>
        </section>
      )}

      {filteredFeaturedProducts.length >
        0 && (
        <FeaturedProducts
          featuredProducts={
            filteredFeaturedProducts
          }
          isMobile={isMobile}
        />
      )}

      <section style={filtersSectionStyle}>
        {!embedded && (
          <div style={categoryRowStyle}>
            {categories.map(
              (category) => {
                const active =
                  (!categoryFilter &&
                    category.value ===
                      "") ||
                  normalizeCategory(
                    categoryFilter
                  ) ===
                    normalizeCategory(
                      category.value
                    );

                return (
                  <button
                    type="button"
                    key={category.label}
                    onClick={() =>
                      router.push(
                        category.route
                      )
                    }
                    style={{
                      ...categoryButtonStyle,
                      ...(active
                        ? activeCategoryButtonStyle
                        : {}),
                    }}
                  >
                    {category.label}
                  </button>
                );
              }
            )}
          </div>
        )}

        <div style={searchSortRowStyle}>
          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder={
              t.searchMarketplace
            }
            style={searchInputStyle}
          />

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as SortOption
              )
            }
            style={sortSelectStyle}
          >
            <option value="latest">
              {t.sortLatest}
            </option>

            <option value="price_low">
              {t.sortPriceLow}
            </option>

            <option value="price_high">
              {t.sortPriceHigh}
            </option>
          </select>
        </div>
      </section>

      {debug && (
        <p style={debugStyle}>
          {debug}
        </p>
      )}

      <section style={productsSectionStyle}>
        <div
          style={{
            ...sectionHeaderStyle,
            ...(embedded
              ? embeddedSectionHeaderStyle
              : {}),
          }}
        >
          {!embedded && (
            <div>
           <p style={eyebrowStyle}>
  {t.marketplace.toUpperCase()}
</p>

              <h2
                style={sectionTitleStyle}
              >
                {visibleCategoryTitle}
              </h2>
            </div>
          )}

          <p style={countStyle}>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? t.productCountSingular
              : t.productCountPlural}
          </p>
        </div>

        {loading ? (
          <div style={emptyStyle}>
            {t.productsLoading}
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div style={emptyStyle}>
           {fixedBrand
  ? `${t.noBrandProductsPrefix} ${fixedBrand} ${t.noBrandProductsSuffix}`
  : t.noProducts}
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredProducts.map(
              (product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  compact
                  showFavorite
                  showRating
                />
              )
            )}
          </div>
        )}
      </section>

            {isGolfCategory && (
        <section
          style={golfSeoSectionStyle}
          aria-labelledby="golf-seo-title"
        >
          <div style={golfSeoIntroStyle}>
           <p style={eyebrowStyle}>
  {t.golfGuideEyebrow}
</p>

<h2
  id="golf-seo-title"
  style={golfSeoTitleStyle}
>
  {t.golfSeoTitle}
</h2>

<p style={golfSeoLeadStyle}>
  {t.golfSeoLead}
</p>
          </div>

          <div style={golfSeoContentGridStyle}>
            <article style={golfSeoCardStyle}>
  <h3 style={golfSeoCardTitleStyle}>
    {t.golfCheckBeforeBuyingTitle}
  </h3>

  <p style={golfSeoParagraphStyle}>
    {t.golfCheckBeforeBuyingText1}
  </p>

  <p style={golfSeoParagraphStyle}>
    {t.golfCheckBeforeBuyingText2}
  </p>
</article>

        <article style={golfSeoCardStyle}>
  <h3 style={golfSeoCardTitleStyle}>
    {t.golfPremiumForLessTitle}
  </h3>

  <p style={golfSeoParagraphStyle}>
    {t.golfPremiumForLessText1}
  </p>

  <p style={golfSeoParagraphStyle}>
    {t.golfPremiumForLessText2}
  </p>
</article>
          </div>

          <div style={golfLinksBlockStyle}>
            <div>
              <p style={golfLinksEyebrowStyle}>
  {t.golfExploreMarketplace}
</p>

<h3 style={golfLinksTitleStyle}>
  {t.golfFindYourGear}
</h3>
            </div>

            <nav
              style={golfLinksStyle}
             aria-label={t.golfMaterialTypesAria}
            >
              <Link
                href="/golf?search=driver"
                style={golfSeoLinkStyle}
              >
               {t.golfDrivers}
              </Link>

              <Link
                href="/golf?search=hierros"
                style={golfSeoLinkStyle}
              >
                {t.golfIrons}
              </Link>

              <Link
                href="/golf?search=wedge"
                style={golfSeoLinkStyle}
              >
               {t.golfWedges}
              </Link>

              <Link
                href="/golf?search=putter"
                style={golfSeoLinkStyle}
              >
                {t.golfPutters}
              </Link>

              <Link
                href="/golf?search=bolsa"
                style={golfSeoLinkStyle}
              >
                {t.golfBags}
              </Link>

              <Link
                href="/buyer-guide"
                style={golfSeoLinkStyle}
              >
                {t.buyerGuide}
              </Link>
            </nav>
          </div>

          <div
  style={golfFaqStyle}
  className="golf-seo-faq"
>
            <div style={golfFaqHeaderStyle}>
              <p style={eyebrowStyle}>
  {t.faqEyebrow}
</p>

<h2 style={golfFaqTitleStyle}>
  {t.golfFaqTitle}
</h2>
            </div>

            <div style={golfFaqListStyle}>
              <details style={golfFaqItemStyle}>
               <summary style={golfFaqSummaryStyle}>
  {t.golfFaqQuestion1}
</summary>

<p style={golfFaqAnswerStyle}>
  {t.golfFaqAnswer1}
</p>
              </details>

              <details style={golfFaqItemStyle}>
             <summary style={golfFaqSummaryStyle}>
  {t.golfFaqQuestion2}
</summary>

<p style={golfFaqAnswerStyle}>
  {t.golfFaqAnswer2}
</p>
              </details>

              <details style={golfFaqItemStyle}>
              <summary style={golfFaqSummaryStyle}>
  {t.golfFaqQuestion3}
</summary>

<p style={golfFaqAnswerStyle}>
  {t.golfFaqAnswer3}
</p>
              </details>

              <details style={golfFaqItemStyle}>
               <summary style={golfFaqSummaryStyle}>
  {t.golfFaqQuestion4}
</summary>

<p style={golfFaqAnswerStyle}>
  {t.golfFaqAnswer4}
</p>
              </details>
            </div>
          </div>

          <div style={golfCtaStyle}>
            <div>
              <p style={golfCtaEyebrowStyle}>
  THE GAME CONTINUES
</p>

<h2 style={golfCtaTitleStyle}>
  {t.golfCtaTitle}
</h2>
            </div>

            <div style={golfCtaActionsStyle}>
              <Link
                href="/golf"
                style={golfCtaPrimaryStyle}
              >
                {t.viewProducts}
              </Link>

              <button
                type="button"
                onClick={() =>
                  setShowLaunchModal(true)
                }
                style={golfCtaSecondaryStyle}
              >
               {t.sellGear}
              </button>
            </div>
          </div>
        </section>
      )}

      {!embedded &&
        feedPosts.length > 0 && (
          <section style={feedSectionStyle}>
            <div style={sectionHeaderStyle}>
              <div>
                <p style={eyebrowStyle}>
                  {t.communityEyebrow}
                </p>

                <h2
                  style={sectionTitleStyle}
                >
                  {t.communityTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push("/feed")
                }
                style={smallButtonStyle}
              >
                {t.openFeed}
              </button>
            </div>

            <div style={feedGridStyle}>
              {feedPosts.map(
                (post: any) => (
                  <article
                    key={post.id}
                    style={feedCardStyle}
                  >
                    <div
                      style={feedHeaderStyle}
                    >
                      <div
                        style={
                          feedAvatarStyle
                        }
                      >
                        {post.user_email
                          ?.charAt(0)
                          .toUpperCase() ||
                          "A"}
                      </div>

                      <div>
                        <p
                          style={
                            feedEmailStyle
                          }
                        >
                         {post.user_email || t.athmovUser}
                        </p>

                        <p
                          style={
                            feedDateStyle
                          }
                        >
                          {post.created_at
                            ? new Date(
                                post.created_at
                              ).toLocaleDateString(locale)
                            : ""}
                        </p>
                      </div>
                    </div>

                    {post.content && (
                      <p
                        style={
                          feedContentStyle
                        }
                      >
                        {post.content}
                      </p>
                    )}

                    {post.image && (
                      <div
                        style={
                          feedImageStyle
                        }
                      >
                        <Image
                          src={safeImage(
                            post.image
                          )}
                          alt={t.feedImageAlt}
                          fill
                          sizes="300px"
                          style={{
                            objectFit:
                              "cover",
                          }}
                        />
                      </div>
                    )}

                    <p
                      style={
                        feedLikesStyle
                      }
                    >
                      ♥️ {post.likes || 0}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {showLaunchModal && (
  <LaunchNoticeModal
    type="sell"
    onClose={() =>
      setShowLaunchModal(false)
    }
    onContinue={() => {
      setShowLaunchModal(false);
      router.push("/sell");
    }}
  />
)}

      <style>{`
        .marketplace-card {
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .marketplace-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 30px 90px
            rgba(0, 0, 0, 0.08);
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

  .golf-seo-faq {
    grid-template-columns: 1fr !important;
  }
}

        @media (max-width: 650px) {
          .marketplace-page {
            padding:
              110px 14px 34px !important;
          }

          .marketplace-title {
            font-size: 44px !important;
            letter-spacing: -2px !important;
          }
.golf-seo-faq {
  gap: 28px !important;
}

.golf-seo-faq > div:first-child {
  position: static !important;
}
        }
      `}</style>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const embeddedPageStyle = {
  width: "100%",
  background: "transparent",
  padding: 0,
  fontFamily: "Inter, sans-serif",
};

const embeddedSectionHeaderStyle = {
  justifyContent: "flex-end",
  marginBottom: "20px",
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
  boxSizing: "border-box" as const,
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
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 340px))",
  justifyContent: "center",
  gap: "36px",
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

const golfSeoSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 80px",
};

const golfSeoIntroStyle = {
  maxWidth: "900px",
  marginBottom: "40px",
};

const golfSeoTitleStyle = {
  margin: 0,
  maxWidth: "900px",
  fontSize: "clamp(38px, 5vw, 68px)",
  lineHeight: 0.98,
  letterSpacing: "-3px",
};

const golfSeoLeadStyle = {
  maxWidth: "820px",
  marginTop: "26px",
  marginBottom: 0,
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.8,
};

const golfSeoContentGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const golfSeoCardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "30px",
  padding: "clamp(26px, 4vw, 44px)",
};

const golfSeoCardTitleStyle = {
  margin: "0 0 20px",
  fontSize: "28px",
  lineHeight: 1.1,
  letterSpacing: "-1px",
};

const golfSeoParagraphStyle = {
  margin: "0 0 18px",
  color: "#595959",
  fontSize: "16px",
  lineHeight: 1.8,
};

const golfLinksBlockStyle = {
  marginTop: "20px",
  padding: "clamp(28px, 5vw, 52px)",
  background: "#111",
  color: "#fff",
  borderRadius: "32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap" as const,
};

const golfLinksEyebrowStyle = {
  margin: "0 0 12px",
  fontSize: "11px",
  letterSpacing: "3px",
  color: "rgba(255,255,255,0.5)",
};

const golfLinksTitleStyle = {
  maxWidth: "530px",
  margin: 0,
  fontSize: "clamp(28px, 4vw, 42px)",
  lineHeight: 1.05,
  letterSpacing: "-2px",
};

const golfLinksStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "flex-end",
  gap: "10px",
  maxWidth: "570px",
};

const golfSeoLinkStyle = {
  padding: "12px 18px",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "999px",
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 800,
};

const golfFaqStyle = {
  marginTop: "70px",
  display: "grid",
  gridTemplateColumns:
    "minmax(260px, 0.7fr) minmax(300px, 1.3fr)",
  gap: "50px",
  alignItems: "start",
};

const golfFaqHeaderStyle = {
  position: "sticky" as const,
  top: "120px",
};

const golfFaqTitleStyle = {
  margin: 0,
  fontSize: "clamp(34px, 4vw, 54px)",
  lineHeight: 1,
  letterSpacing: "-2px",
};

const golfFaqListStyle = {
  display: "grid",
  gap: "12px",
};

const golfFaqItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: "22px",
  padding: "0 22px",
};

const golfFaqSummaryStyle = {
  padding: "22px 0",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: 900,
  lineHeight: 1.4,
};

const golfFaqAnswerStyle = {
  margin: "0 0 24px",
  paddingRight: "20px",
  color: "#5b5b5b",
  fontSize: "15px",
  lineHeight: 1.8,
};

const golfCtaStyle = {
  marginTop: "70px",
  padding: "clamp(30px, 5vw, 60px)",
  background: "#dfff00",
  borderRadius: "36px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap" as const,
};

const golfCtaEyebrowStyle = {
  margin: "0 0 14px",
  fontSize: "11px",
  letterSpacing: "3px",
  fontWeight: 900,
};

const golfCtaTitleStyle = {
  maxWidth: "720px",
  margin: 0,
  fontSize: "clamp(34px, 5vw, 58px)",
  lineHeight: 0.98,
  letterSpacing: "-3px",
};

const golfCtaActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "12px",
};

const golfCtaPrimaryStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};

const golfCtaSecondaryStyle = {
  background: "transparent",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.25)",
  borderRadius: "999px",
  padding: "16px 24px",
  fontWeight: 900,
  cursor: "pointer",
};