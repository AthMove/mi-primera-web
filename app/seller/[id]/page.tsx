"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";
import SellerHero from "@/components/seller/SellerHero";
import SellerDashboard from "@/components/seller/SellerDashboard";
import SellerTimeline from "@/components/seller/SellerTimeline";
import SellerActiveProducts from "@/components/seller/SellerActiveProducts";
import SellerSoldProducts from "@/components/seller/SellerSoldProducts";
import SellerReviews from "@/components/seller/SellerReviews";
import SellerTabs from "@/components/seller/SellerTabs";


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
  const [isFollowing, setIsFollowing] = useState(false);
const [followersCount, setFollowersCount] = useState(0);


 useEffect(() => {
  if (!sellerId || sellerId === "undefined") return;

  loadSeller();
}, [sellerId]);

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

const { count } = await supabase
  .from("seller_followers")
  .select("*", { count: "exact", head: true })
  .eq("seller_id", sellerId);

setFollowersCount(count || 0);

if (user) {
  const { data: following } = await supabase
  .from("seller_followers")
  .select("id")
  .eq("seller_id", sellerId)
  .eq("follower_id", user.id)
  .maybeSingle();

setIsFollowing(!!following);

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

const toggleFollowSeller = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert(t.loginRequired);
    return;
  }

  if (user.id === sellerId) {
    alert("No puedes seguir tu propio perfil");
    return;
  }

  if (isFollowing) {
    const { error } = await supabase
      .from("seller_followers")
      .delete()
      .eq("seller_id", sellerId)
      .eq("follower_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setIsFollowing(false);
    setFollowersCount((prev) => Math.max(prev - 1, 0));
    return;
  }

  const { error } = await supabase
    .from("seller_followers")
    .insert([
      {
        seller_id: sellerId,
        follower_id: user.id,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  setIsFollowing(true);
  setFollowersCount((prev) => prev + 1);
};

const sellerName =
  seller?.full_name ||
  seller?.username ||
  seller?.email ||
  "Vendedor ATHMOV";

const soldCount =
  seller?.total_sales ??
  products.filter((p) => p.sold).length;

  const [activeTab, setActiveTab] = useState<
  "active" | "sold" | "reviews"
>("active");

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

    const numericAverageRating = Number(averageRating);

const memberYears = seller?.created_at
  ? Math.max(
      0,
      new Date().getFullYear() -
        new Date(seller.created_at).getFullYear()
    )
  : 0;

const sellerTrustScore = Math.min(
  10,
  Number(
    (
      6 +
      (seller?.seller_verified ? 1.2 : 0) +
      Math.min(numericAverageRating / 5, 1) * 1.4 +
      Math.min(soldCount / 20, 1) * 0.8 +
      Math.min(totalReviews / 15, 1) * 0.4 +
      Math.min(memberYears / 3, 1) * 0.2
    ).toFixed(1)
  )
);

const trustPercentage = Math.round(sellerTrustScore * 10);

const trustLabel =
  sellerTrustScore >= 9.5
    ? "EXCELENTE"
    : sellerTrustScore >= 8.5
    ? "MUY BUENO"
    : sellerTrustScore >= 7.5
    ? "BUENO"
    : seller?.seller_verified
    ? "VERIFICADO"
    : "NUEVO";

  if (loading) {
    return <main style={pageStyle}>{t.loadingSeller}</main>;
  }

  return (
    <main style={pageStyle} className="seller-page">
      <nav className="seller-breadcrumb">
  <span onClick={() => router.push("/")}>Inicio</span>

  <span className="seller-breadcrumb-separator">›</span>

  <span onClick={() => router.push("/products")}>
    Marketplace
  </span>

  <span className="seller-breadcrumb-separator">›</span>

  <strong>{sellerName}</strong>
</nav>

<button
  type="button"
  className="seller-back-button"
  onClick={() => router.back()}
>
  ← Volver
</button>
   <SellerHero
  seller={seller}
  sellerName={sellerName}
  sellerId={sellerId}
  averageRating={averageRating}
  isFollowing={isFollowing}
  scrollY={scrollY}
  safeImage={safeImage}
  onFollow={toggleFollowSeller}
  onShare={() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Enlace copiado"))
      .catch(() => alert("No se pudo copiar el enlace"));
  }}
  onLeaveReview={() =>
    router.push(`/seller/${sellerId}/review`)
  }
  verifiedSellerText={t.verifiedAthmovSeller}
  verifiedLabel={t.verifiedLabel}
  sellerLabel={t.sellerLabel}
  trustedMarketplaceText={t.trustedMarketplace}
  defaultSellerBio={t.defaultSellerBio}
  responseTimeText={t.responseTime}
  memberSinceText={t.memberSince}
  leaveReviewText={t.leaveReview}
/>

   <section
  style={floatingStatsStyle}
  className="floating-stats"
>
  {[
   {
  label: "TRUST SCORE",
  value:
    totalReviews === 0 && soldCount === 0
      ? "NEW"
      : sellerTrustScore.toFixed(1),
},
    {
      label: "VENTAS",
      value: soldCount,
    },
    {
  label: "SEGUIDORES",
  value: followersCount,
},
    {
      label: "VALORACIÓN",
      value: `★ ${averageRating}`,
    },
  ].map((item) => (
    <div key={item.label} style={floatingStatItemStyle}>
      <p style={floatingStatLabelStyle}>{item.label}</p>
      <h2 style={floatingStatValueStyle}>{item.value}</h2>
    </div>
  ))}
</section>

   <SellerDashboard
  trustLabel={trustLabel}
  trustPercentage={trustPercentage}
  sellerTrustScore={sellerTrustScore}
  totalReviews={totalReviews}
  soldCount={soldCount}
  followersCount={followersCount}
  averageRating={averageRating}
  seller={seller}
/>

<SellerTimeline
  seller={seller}
  soldCount={soldCount}
  reviews={reviews}
/>

<section style={sectionStyle}>
  <SellerTabs
    activeTab={activeTab}
    activeCount={activeCount}
    soldCount={soldCount}
    totalReviews={totalReviews}
    onChange={setActiveTab}
  />
</section>

{activeTab === "active" && (
  <SellerActiveProducts
    products={products}
    favorites={favorites}
    safeImage={safeImage}
    onProductClick={(productId) =>
      router.push(`/products/${productId}`)
    }
    onToggleFavorite={toggleProductFavorite}
    eyebrow={t.sellerInventory}
    emptyText={t.noActiveProducts}
  />
)}

{activeTab === "sold" && (
  <SellerSoldProducts
    products={products}
    safeImage={safeImage}
    onProductClick={(productId) =>
      router.push(`/products/${productId}`)
    }
  />
)}

{activeTab === "reviews" && (
  <SellerReviews
    reviews={reviews}
    eyebrow={t.buyerFeedback}
    noComment={t.noComment}
    noReviewsText={t.noReviewsYet}
  />
)}

      <style>{`

@media (max-width:700px) {
}
      .seller-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 1280px;
  margin: 0 auto 20px;
  font-size: 13px;
  color: #777;
}

.seller-breadcrumb span:not(.seller-breadcrumb-separator) {
  cursor: pointer;
  transition: color .25s ease;
}

.seller-breadcrumb span:not(.seller-breadcrumb-separator):hover {
  color: #111;
}

.seller-breadcrumb-separator {
  color: #aaa;
}

.seller-back-button {
  display: block;
  max-width: 1280px;
  margin: 0 auto 24px;
  padding: 12px 18px;
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 999px;
  background: transparent;
  color: #111;
  font-size: 13px;
  cursor: pointer;
}
        .seller-product-card,
.seller-stat-card {
  transition: all .3s ease;
}

.seller-stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 80px rgba(0,0,0,.12);
}

.seller-page section:nth-of-type(2) > div:hover{
  transform:translateY(-6px);
  box-shadow:0 30px 80px rgba(0,0,0,.12);
}

@media (max-width: 900px) {
  .floating-stats {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 700px) {
.seller-breadcrumb {
  gap: 7px;
  margin-bottom: 16px;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
}

.seller-breadcrumb strong {
  max-width: 130px;
}

.seller-back-button {
  margin-bottom: 18px;
}

  .seller-page {
    padding: 110px 18px 40px !important;
    overflow-x: hidden !important;
  }

  .seller-product-card:first-child {
    grid-column: span 1 !important;
  }

  .seller-product-card::after {
    display: none !important;
  }

  .favorite-pop:hover {
    transform: none !important;
  }

  button:hover {
    transform: none !important;
  }
}

@keyframes pulseScore {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.06);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes floatUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.seller-hero {
  animation: floatUp 0.7s ease;
}

.seller-hero + section {
  animation: floatUp 0.9s ease;
}

button {
  transition: all 0.28s ease;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
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