"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function SellerPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const sellerId = String(params.id);

  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadSeller();
  }, []);

  useEffect(() => {
  const onScroll = () => setScrollY(window.scrollY);

  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
}, []);

  const loadSeller = async () => {
    const { data: sellerProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sellerId)
      .maybeSingle();

    const { data: sellerProducts } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .eq("moderation_status", "approved")
      .order("created_at", { ascending: false });

 const { data: sellerReviews } = await supabase
  .from("reviews")
  .select("*")
  .eq("seller_id", sellerId)
  .order("created_at", { ascending: false });

    setSeller(sellerProfile);
    setProducts(sellerProducts || []);
    setReviews(sellerReviews || []);

const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  const { data } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", user.id);

  setFavorites(data?.map((f: any) => String(f.product_id)) || []);
}

    setLoading(false);
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const toggleProductFavorite = async (product: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert(t.loginRequired);
    return;
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (existing) {
   await supabase
  .from("favorites")
  .delete()
  .eq("user_id", user.id)
  .eq("product_id", product.id);

setFavorites((prev) =>
  prev.filter((id) => id !== String(product.id))
);

alert("Eliminado de favoritos");
return;
  }

await supabase.from("favorites").insert([
  {
    user_id: user.id,
    product_id: product.id,
    user_email: user.email,
  },
]);

setFavorites((prev) => [...prev, String(product.id)]);

alert("Añadido a favoritos");
};

const sellerName =
  seller?.full_name ||
  seller?.username ||
  seller?.email ||
  "Vendedor ATHMOV";

const soldCount =
  seller?.total_sales ??
  products.filter((p) => p.sold).length;

const activeCount =
  products.filter((p) => !p.sold).length;

const totalReviews = reviews.length;

const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce(
          (acc, review) => acc + Number(review.rating || 0),
          0
        ) / reviews.length
      ).toFixed(1)
    : "0.0";

  if (loading) {
    return <main style={pageStyle}>{t.loadingSeller}</main>;
  }

  return (
    <main style={pageStyle} className="seller-page">
     <section
  style={{
    ...heroStyle,
    backgroundPosition: `center ${scrollY * 0.18}px`,
  }}
  className="seller-hero"
>
  <div
style={{
position:"absolute",
top:-180,
right:-120,
width:500,
height:500,
borderRadius:"50%",
background:
"radial-gradient(circle, rgba(255,255,255,.22), transparent 70%)",
filter:"blur(40px)",
pointerEvents:"none",
}}
/>
<div
  style={{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    background:
      "linear-gradient(to top, rgba(0,0,0,.72), transparent)",
    pointerEvents: "none",
  }}
/>
        <div style={avatarWrapperStyle}>
          <div style={avatarStyle}>
            <Image
              src={safeImage(seller?.avatar_url)}
              alt={sellerName}
              fill
              sizes="140px"
style={{
  objectFit: "cover",
  padding: "4px",
  background: "#fff",
}}
            />
          </div>

          {seller?.seller_verified && (
            <div style={verifiedCircleStyle}>✓</div>
          )}
        </div>

        <div
  style={{
    flex: 1,
    position: "relative",
    zIndex: 2,
  }}
>
          <p style={eyebrowStyle}>{t.verifiedAthmovSeller}</p>

          <h1 style={titleStyle} className="seller-title">
            {sellerName}
          </h1>

          <div style={badgesStyle}>
  {seller?.seller_verified && (
    <span style={verifiedBadgeStyle}>{t.verifiedLabel}</span>
  )}

  <span style={levelBadgeStyle}>
    {(seller?.seller_badge || seller?.seller_level || "new")
      .toString()
      .toUpperCase()}{" "}
    {t.sellerLabel}
  </span>

  <span style={trustBadgeStyle}>{t.trustedMarketplace}</span>
</div>

<div style={heroActionsStyle}>
  <button style={heroPrimaryButtonStyle}>
    Seguir vendedor
  </button>

  <button
    onClick={() => navigator.clipboard.writeText(window.location.href)}
    style={heroSecondaryButtonStyle}
  >
    Compartir perfil
  </button>
</div>

          <p style={bioStyle}>
            {seller?.bio ||
              t.defaultSellerBio}
          </p>
          <button
  onClick={() => router.push(`/seller/${sellerId}/review`)}
  style={reviewButtonStyle}
>
  {t.leaveReview}
</button>
          <div style={infoRowStyle}>
            <div style={infoCardStyle}>
              <p style={infoLabelStyle}>Ubicación</p>
              <p style={infoValueStyle}>
               {seller?.location || "España"}
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={infoLabelStyle}>{t.responseTime}</p>
              <p style={infoValueStyle}>
               {seller?.response_time || "< 1 hora"}
              </p>
            </div>

            <div style={infoCardStyle}>
             <p style={infoLabelStyle}>{t.memberSince}</p>
              <p style={infoValueStyle}>
                {seller?.created_at
                  ? new Date(seller.created_at).getFullYear()
                  : "2025"}
              </p>
            </div>
<div style={infoCardStyle}>
  <p style={infoLabelStyle}>Valoración</p>
  <p style={infoValueStyle}>★ {averageRating}</p>
</div>
          </div>
        </div>
      </section>

   <section style={floatingStatsStyle}>
  {[
    {
      label: "TRUST SCORE",
      value: averageRating === "0.0" ? "NEW" : "9.8",
    },
    {
      label: "VENTAS",
      value: soldCount,
    },
    {
      label: "VALORACIÓN",
      value: `★ ${averageRating}`,
    },
    {
      label: "PRODUCTOS",
      value: activeCount,
    },
  ].map((item) => (
    <div key={item.label} style={floatingStatItemStyle}>
      <p style={floatingStatLabelStyle}>{item.label}</p>
      <h2 style={floatingStatValueStyle}>{item.value}</h2>
    </div>
  ))}
</section>

      <section style={trustSectionStyle}>
        <div style={trustCardStyle}>✓ {t.verifiedIdentity}</div>
        <div style={trustCardStyle}>✓ {t.securePayments}</div>
        <div style={trustCardStyle}>✓ {t.premiumMarketplace}</div>
        <div style={trustCardStyle}>✓ {t.trustedSeller}</div>
      </section>

      <section style={trustScoreSectionStyle}>
        <div
style={{
position:"absolute",
right:-120,
top:-120,
width:300,
height:300,
borderRadius:"50%",
background:"rgba(0,0,0,.03)",
filter:"blur(30px)"
}}
/>
  <div>
    <p style={trustScoreLabelStyle}>SELLER TRUST SCORE</p>
    <h2 style={trustScoreTitleStyle}>
      Compra con confianza
    </h2>

    <p style={trustScoreTextStyle}>
      Este vendedor ha sido verificado por ATHMOV y dispone de un historial
      público de valoraciones, productos vendidos y actividad dentro del
      marketplace.
    </p>
  </div>

  <div style={trustScoreCircleStyle}>
    {averageRating === "0.0"
      ? "NEW"
      : Number(averageRating) >= 4.8
      ? "9.8"
      : Number(averageRating) >= 4.5
      ? "9.5"
      : Number(averageRating) >= 4
      ? "9.0"
      : "8.5"}
  </div>
</section>

<section style={statsGridStyle}>
  <div style={statCardStyle} className="seller-stat-card">
    <p style={statLabelStyle}>Valoraciones</p>
    <h2 style={statValueStyle}>{totalReviews}</h2>
  </div>

  <div style={statCardStyle} className="seller-stat-card">
    <p style={statLabelStyle}>{t.reviewsLabel}</p>
    <h2 style={statValueStyle}>★ {averageRating}</h2>
  </div>

  <div style={statCardStyle} className="seller-stat-card">
    <p style={statLabelStyle}>{t.activeProducts}</p>
    <h2 style={statValueStyle}>{activeCount}</h2>
  </div>

  <div style={statCardStyle} className="seller-stat-card">
    <p style={statLabelStyle}>{t.soldProducts}</p>
    <h2 style={statValueStyle}>{soldCount}</h2>
  </div>
</section>

<section style={activitySectionStyle}>
  <div style={activityCardStyle}>
    <span style={activityIconStyle}>🛡️</span>

    <div>
      <strong>Perfil verificado</strong>
      <p>Identidad revisada por ATHMOV.</p>
    </div>
  </div>

  <div style={activityCardStyle}>
    <span style={activityIconStyle}>📦</span>

    <div>
      <strong>{soldCount} ventas realizadas</strong>
      <p>Historial público de ventas.</p>
    </div>
  </div>

  <div style={activityCardStyle}>
    <span style={activityIconStyle}>⚡</span>

    <div>
      <strong>Respuesta rápida</strong>
      <p>{seller?.response_time || "< 1 hora"}</p>
    </div>
  </div>

  <div style={activityCardStyle}>
    <span style={activityIconStyle}>⭐</span>

    <div>
      <strong>{averageRating}/5</strong>
      <p>{totalReviews} valoraciones verificadas.</p>
    </div>
  </div>
</section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}> {t.sellerInventory}</p>
            <h2 style={sectionTitleStyle}>Productos activos</h2>
          </div>
        </div>

        {products.filter((p) => !p.sold).length === 0 ? (
          <div style={emptyStyle}>
          {t.noActiveProducts}
          </div>
        ) : (
          <div style={gridStyle}>
            {products
  .filter((p) => !p.sold)
  .map((product) => (
    <article
      key={product.id}
      style={cardStyle}
      className="seller-product-card"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div style={imageWrapperStyle}>
        <span style={productBadgeStyle}>
          {product.featured ? "⭐ DESTACADO" : "DISPONIBLE"}
        </span>

        <button
          className="favorite-pop"
          style={favoriteButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            toggleProductFavorite(product);
          }}
        >
          {favorites.includes(String(product.id)) ? "❤️" : "🤍"}
        </button>

        <Image
          className="seller-product-image"
          src={safeImage(product.image)}
          alt={product.title || "Product"}
          fill
          sizes="33vw"
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            padding: 0,
            transform: "scale(1.24)",
            transition: "transform .6s ease",
            filter: "drop-shadow(0 35px 70px rgba(0,0,0,.18))",
          }}
        />
      </div>

      <div style={cardContentStyle}>
        <p style={brandStyle}>{product.brand || "ATHMOV"}</p>

        <h3 style={cardTitleStyle}>{product.title}</h3>

        <p style={priceStyle}>{product.price} €</p>

        <div style={productMetaStyle}>
          <span>{product.location || "España"}</span>
          <span>•</span>
          <span>{product.condition || "Excelente"}</span>
        </div>
      </div>
    </article>
  ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}>{t.buyerFeedback}</p>
            <h2 style={sectionTitleStyle}>Valoraciones</h2>
          </div>
        </div>

        {reviews.length === 0 ? (
       <div style={emptyStyle}>{t.noReviewsYet}</div>
        ) : (
          <div style={reviewsGridStyle}>
            {reviews.map((review) => (
              <article
  key={review.id}
  style={reviewCardStyle}
  className="seller-review-card"
>
                <p style={reviewStarsStyle}>
                  {"★".repeat(Number(review.rating || 0))}
                  {"☆".repeat(
                    5 - Number(review.rating || 0)
                  )}
                </p>

                <p style={reviewTextStyle}>
  {review.comment || t.noComment}
</p>

<p style={reviewDateStyle}>
  {review.created_at
    ? new Date(review.created_at).toLocaleDateString()
    : ""}
</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
      .seller-product-card:hover{

transform:
translateY(-14px)
scale(1.015);

box-shadow:
0 60px 140px rgba(0,0,0,.15);
}

.seller-product-card:hover .seller-product-image{

transform:
scale(1.30)
translateY(-10px);

}

      .seller-hero:hover img{
  transform:scale(1.04);
}

.seller-hero img{
  transition:transform .5s ease;
}
        .seller-product-card {
          transition: all 0.35s ease;
        }
.seller-product-card:hover{
  transform:
      perspective(1000px)
      rotateX(2deg)
      translateY(-12px);

  box-shadow:
      0 45px 120px rgba(0,0,0,.16);
}
  .seller-product-image{
  transition: transform .45s ease;
}

.seller-product-card:hover .seller-product-image{
  transform: scale(1.12) translateY(-8px);
  filter: drop-shadow(0 25px 35px rgba(0,0,0,.18));
}
  .seller-review-card{
  transition: all .35s ease;
}

.seller-review-card:hover{
  transform: translateY(-8px);
  box-shadow: 0 28px 80px rgba(0,0,0,.10);
}

        .seller-product-card,
.seller-stat-card {
  transition: all .3s ease;
}

.seller-stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 80px rgba(0,0,0,.12);
}

.seller-product-card::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(
      130deg,
      transparent 20%,
      rgba(255,255,255,.35) 50%,
      transparent 80%);
  transform:translateX(-130%);
  transition:.8s;
}

.seller-product-card:hover::after{
  transform:translateX(130%);
}

.seller-page section:nth-of-type(2) > div:hover{
  transform:translateY(-6px);
  box-shadow:0 30px 80px rgba(0,0,0,.12);
}
            .favorite-pop{
  transition: transform .22s ease, box-shadow .22s ease;
}

.favorite-pop:hover{
  transform: scale(1.08);
}

.favorite-pop:active{
  transform: scale(.86);
}

@media (max-width: 900px) {
          .seller-hero {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 700px) {
  .seller-page {
  padding: 110px 18px 40px !important;
}

.seller-product-card:first-child {
  grid-column: span 1 !important;
}
          }

          .seller-title {
            font-size: 44px !important;
            letter-spacing: -2px !important;
          }
        }
  @keyframes pulseScore{
  0%{ transform:scale(1); }
  50%{ transform:scale(1.06); }
  100%{ transform:scale(1); }
}

@keyframes floatUp{
  from{
    opacity:0;
    transform:translateY(40px);
  }

  to{
    opacity:1;
    transform:translateY(0);
  }
}

.seller-hero{
    animation:floatUp .7s ease;
}

.seller-hero + section{
    animation:floatUp .9s ease;
}
}

button{
  transition:all .28s ease;
}

button:hover{
  transform:translateY(-3px);
  box-shadow:0 18px 40px rgba(0,0,0,.18);
}
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background:`
radial-gradient(circle at top left,#ffffff 0%,transparent 30%),
radial-gradient(circle at bottom right,#efede7 0%,transparent 35%),
linear-gradient(
180deg,
#fafaf8 0%,
#f4f3ef 45%,
#efeee9 100%)
`,
  padding: "140px 60px 80px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  position: "relative" as const,
  overflow: "visible",
  maxWidth: "1280px",
 margin: "0 auto 0",
  minHeight: "520px",
  justifyContent: "space-between",
background: `
linear-gradient(
rgba(0,0,0,.30),
rgba(0,0,0,.58)
),
url("/seller-cover.png")
`,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
boxShadow: "0 45px 120px rgba(0,0,0,.25)",
  borderRadius: "42px",
backdropFilter: "blur(18px)",
border: "1px solid rgba(255,255,255,.08)",
  padding: "60px",
  display: "flex",
  gap: "34px",
  alignItems: "center",
  color: "#fff",
};


const avatarWrapperStyle = {
  position: "relative" as const,
  zIndex: 2,
};

const avatarStyle = {
  width: "190px",
  height: "190px",
  borderRadius: "999px",
  overflow: "hidden",
  position: "relative" as const,
  border: "8px solid rgba(255,255,255,.18)",
boxShadow:
"0 35px 90px rgba(0,0,0,.45), 0 0 0 10px rgba(255,255,255,.06)",
transition: "all .35s ease",
background: "#fff",
transform:"translateY(70px)",
zIndex: 3,
};

const verifiedCircleStyle = {
  position: "absolute" as const,
  bottom: "4px",
  right: "4px",
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "76px",
  textShadow: "0 8px 30px rgba(0,0,0,.25)",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-5px",
  fontWeight: 950,
  textTransform: "capitalize",
};

const badgesStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginTop: "18px",
};

const verifiedBadgeStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const levelBadgeStyle = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.16)",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const trustBadgeStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const bioStyle = {
  marginTop: "18px",
  color: "rgba(255,255,255,0.72)",
  maxWidth: "700px",
  lineHeight: 1.8,
};

const infoRowStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
  marginTop: "26px",
};

const infoCardStyle = {
  flex: 1,
  minWidth: "170px",
  background: "rgba(255,255,255,.10)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: "20px",
  padding: "20px",
};

const infoLabelStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
  marginBottom: "6px",
};

const infoValueStyle = {
  fontSize: "14px",
  fontWeight: 700,
};

const trustSectionStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "16px",
};

const trustCardStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "22px",
  fontWeight: 800,
  border: "1px solid rgba(0,0,0,.05)",
  boxShadow: "0 15px 45px rgba(0,0,0,.05)",
  transition: "all .3s ease",
};

const statsGridStyle = {
  maxWidth: "1280px",
  margin: "28px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
};

const statCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "32px",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 18px 60px rgba(0,0,0,.05)",
  transition: "all .3s ease",
};

const statLabelStyle = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  opacity: .45,
};

const statValueStyle = {
  fontSize: "62px",
  fontWeight: 900,
  letterSpacing: "-3px",
  marginTop: "8px",
  lineHeight: 1,
};

const sectionStyle = {
  maxWidth: "1280px",
 margin: "90px auto 0",
};

const sectionHeaderStyle = {
  marginBottom: "26px",
};

const sectionEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "8px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  letterSpacing: "-2px",
  margin: 0,
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "30px",
  color: "#666",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "42px",
};

const cardStyle = {
  background: `
linear-gradient(
180deg,
rgba(255,255,255,.92),
rgba(250,250,248,.82)
),
`,
backdropFilter: "blur(18px)",
  borderRadius: "32px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,.04)",
  boxShadow:
  "0 35px 120px rgba(0,0,0,.08), 0 8px 30px rgba(255,255,255,.6) inset",
  transition: "transform .35s ease, box-shadow .35s ease",
  position: "relative" as const,
};

const imageWrapperStyle = {
  height: "560px",
  position: "relative" as const,
  background:
"radial-gradient(circle at center,#ffffff 0%,#f7f7f3 55%,#ecece8 100%)",
boxShadow: "inset 0 120px 180px rgba(255,255,255,.35)",
borderBottom:"1px solid rgba(0,0,0,.05)",

backgroundImage:`
radial-gradient(circle at top,
rgba(255,255,255,.9),
transparent 55%)
`,
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "34px",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  color: "#999",
  fontWeight: 700,
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  fontSize: "34px",
  fontWeight: 900,
  letterSpacing: "-1.8px",
  lineHeight: 1.08,
  margin: "10px 0 18px",
};

const priceStyle = {
  fontSize: "56px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginTop: "18px",
  color: "#111",
};

const reviewsGridStyle = {
  display: "grid",
  gap: "18px",
};

const reviewCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "30px",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 16px 60px rgba(0,0,0,.05)",
};

const reviewStarsStyle = {
  fontSize: "20px",
  marginBottom: "12px",
};

const reviewTextStyle = {
  color: "#555",
  lineHeight: 1.8,
};

const reviewDateStyle = {
  marginTop: "14px",
  fontSize: "12px",
  color: "#999",
};

const reviewButtonStyle = {
  marginTop: "18px",
  background: "#fff",
  color: "#111",
  border: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 800,
  cursor: "pointer",
};

const favoriteButtonStyle = {
  position: "absolute" as const,
  top: "16px",
  right: "16px",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,.7)",
  background: "rgba(255,255,255,.85)",
backdropFilter: "blur(16px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,.12)",
};

const productBadgeStyle = {
  position: "absolute" as const,
  top: "18px",
  left: "18px",
  zIndex: 10,

  background: "#111",
  color: "#fff",

  borderRadius: "999px",

  padding: "9px 16px",

  fontSize: "10px",

  letterSpacing: "1px",

  fontWeight: 800,
};

const productMetaStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "18px",
  color: "#8a8a8a",
  fontSize: "14px",
  fontWeight: 600,
};

const trustScoreSectionStyle = {
  maxWidth: "1280px",
  margin: "34px auto",
  background: "#fff",
  borderRadius: "34px",
  padding: "34px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,.05)",
  overflow: "hidden",
position: "relative" as const,
};

const trustScoreLabelStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const trustScoreTitleStyle = {
  fontSize: "34px",
  margin: "10px 0",
  letterSpacing: "-1px",
};

const trustScoreTextStyle = {
  maxWidth: "560px",
  color: "#666",
  lineHeight: 1.7,
};

const trustScoreCircleStyle = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  fontWeight: 900,
  animation: "pulseScore 3s infinite",
boxShadow: "0 18px 50px rgba(0,0,0,.25)",
};

const heroActionsStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap" as const,
  marginTop: "24px",
};

const heroPrimaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "none",
  borderRadius: "999px",
  padding: "15px 24px",
  fontWeight: 900,
  cursor: "pointer",
};

const heroSecondaryButtonStyle = {
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.18)",
  borderRadius: "999px",
  padding: "15px 24px",
  fontWeight: 900,
  cursor: "pointer",
};

const activitySectionStyle = {
  maxWidth: "1280px",
  margin: "34px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "18px",
};

const activityCardStyle = {
  background: "rgba(255,255,255,.82)",
backdropFilter: "blur(20px)",
border: "1px solid rgba(255,255,255,.7)",
  borderRadius: "28px",
  padding: "26px",
  display: "flex",
  gap: "18px",
  alignItems: "center",
  boxShadow: "0 20px 60px rgba(0,0,0,.05)",
};

const activityIconStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  flexShrink: 0,
};

const floatingStatsStyle = {
  maxWidth: "1100px",
  margin: "-70px auto 50px",
  position: "relative" as const,
  zIndex: 5,
  background: "rgba(255,255,255,.88)",
  backdropFilter: "blur(28px)",
  border: "1px solid rgba(255,255,255,.65)",
  borderRadius: "34px",
  padding: "28px",
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "18px",
  boxShadow: "0 35px 110px rgba(0,0,0,.16)",
};

const floatingStatItemStyle = {
  textAlign: "center" as const,
};

const floatingStatLabelStyle = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#888",
  fontWeight: 800,
};

const floatingStatValueStyle = {
  margin: "14px 0 0",
  fontSize: "52px",
  fontWeight: 900,
  letterSpacing: "-3px",
};