"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";
import HeroSection from "@/components/home/HeroSection";
import EditorialSection from "@/components/home/EditorialSection";
import LatestDropsSection from "@/components/home/LatestDropsSection";
import FollowedSellersSection from "@/components/home/FollowedSellersSection";
import FollowedSellerProductsSection from "@/components/home/sections/FollowedSellerProductsSection";
import WhyAthmovSection from "@/components/home/sections/WhyAthmovSection";
import CategoriesSection from "@/components/home/sections/CategoriesSection";
import PopularBrandsSection from "@/components/home/sections/PopularBrandsSection";
import SoldProductsSection from "@/components/home/sections/SoldProductsSection";
import BlogSection from "@/components/home/sections/BlogSection";
import SellerCTASection from "@/components/home/sections/SellerCTASection";
import FooterSection from "@/components/home/sections/FooterSection";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const [newDrops, setNewDrops] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [followedSellers, setFollowedSellers] = useState<any[]>([]);
 const [followedSellerProducts, setFollowedSellerProducts] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);


const loadFollowedSellers = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setFollowedSellers([]);
    setFollowedSellerProducts([]);
    return;
  }

  const { data: follows, error: followsError } = await supabase
    .from("seller_follows")
    .select("seller_id")
    .eq("follower_id", user.id);

  if (followsError || !follows?.length) {
    setFollowedSellers([]);
    setFollowedSellerProducts([]);
    return;
  }

  const sellerIds = (follows as { seller_id: string }[]).map(
    (follow) => follow.seller_id
  );

  const { data: sellers, error: sellersError } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      username,
      avatar_url,
      location,
      seller_verified,
      seller_level,
      seller_badge,
      total_sales,
      response_time
    `)
    .in("id", sellerIds);

  if (sellersError) {
    console.log("Error cargando vendedores seguidos:", sellersError);
    setFollowedSellers([]);
    setFollowedSellerProducts([]);
    return;
  }

  setFollowedSellers(sellers || []);

  const { data: sellerProducts, error: sellerProductsError } = await supabase
    .from("products")
    .select("*")
    .in("seller_id", sellerIds)
    .eq("moderation_status", "approved")
    .eq("sold", false)
    .order("created_at", { ascending: false })
    .limit(8);

  if (sellerProductsError) {
    console.log(
      "Error cargando productos de vendedores seguidos:",
      sellerProductsError
    );

    setFollowedSellerProducts([]);
    return;
  }

  setFollowedSellerProducts(sellerProducts || []);
};

useEffect(() => {
  loadHome();
  loadFollowedSellers();
}, []);

 useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
         const originalDelay =
  Number(entry.target.getAttribute("data-delay")) || 0;

const delay = window.innerWidth <= 768
  ? Math.min(originalDelay, 80)
  : originalDelay;

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const loadHome = async () => {
    const { data: drops } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);

    const { data: sold } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", true)
      .order("created_at", { ascending: false })
      .limit(4);

    setNewDrops(drops || []);
    setSoldProducts(sold || []);
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };


  return (
    <main style={pageStyle} className="home-page">
      <div className="ambient-light" />
    
    <HeroSection
  isMobile={isMobile}
  scrollY={scrollY}
/>

<EditorialSection
  isMobile={isMobile}
/>

<LatestDropsSection
  isMobile={isMobile}
  products={newDrops}
/>

<FollowedSellerProductsSection
  isMobile={isMobile}
  products={followedSellerProducts}
/>

<FollowedSellersSection
  isMobile={isMobile}
  sellers={followedSellers}
/>

<WhyAthmovSection
  isMobile={isMobile}
/>

<CategoriesSection
  isMobile={isMobile}
/>

 <PopularBrandsSection isMobile={isMobile} />

    <SoldProductsSection
  isMobile={isMobile}
  soldProducts={soldProducts}
/>

   <BlogSection isMobile={isMobile} />

<SellerCTASection
  isMobile={isMobile}
/>

<FooterSection isMobile={isMobile} />

      <style>{`
        .home-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }

        .home-card::after{
    content:"";
    position:absolute;
    inset:0;

    background:
      linear-gradient(
        125deg,
        transparent 25%,
        rgba(255,255,255,.35) 50%,
        transparent 75%
      );

    transform:translateX(-130%);
    transition:.9s;
}

.home-card:hover::after{
    transform:translateX(130%);
}

.home-card:hover{
    transform: translateY(-16px) scale(1.015);

    box-shadow:
        0 80px 180px rgba(0,0,0,.18);

    border-color: rgba(255,255,255,.95);
}

.home-card::before{
    content:"";
    position:absolute;
    inset:0;
    pointer-events:none;

    background:
        radial-gradient(
            circle at var(--x,50%) var(--y,50%),
            rgba(255,255,255,.18),
            transparent 45%
        );

    opacity:0;
    transition:.35s;
}

.home-card:hover::before{
    opacity:1;
}

.card-img{
    transition:
        transform .6s ease,
        opacity .45s ease,
        filter .45s ease;

    opacity:.0;

    filter:
        blur(8px)
        drop-shadow(0 35px 55px rgba(0,0,0,.18));
}

.card-img.loaded{
    opacity:1;

    filter:
        blur(0)
        drop-shadow(0 35px 55px rgba(0,0,0,.18));
}
        .hero-img {
          transition: transform 0.55s ease;
        }

       .home-card:hover .card-img{
    transform: scale(1.03);
}

        .brand-home-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.brand-home-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 26px 80px rgba(0,0,0,0.09) !important;
}

button{
transition:.28s;
}

button:hover{
transform:translateY(-2px);
}

.athmov-navbar a{
transition:.25s;
}

.athmov-navbar a:hover{
opacity:.72;
}

.fade-up{
  opacity:0;
  transform:translateY(60px);
  transition:
      opacity .8s ease,
      transform .8s ease;
}

.fade-up.visible{
  opacity:1;
  transform:translateY(0);
}

.fade-up h2{
    opacity:0;
    transform:translateY(18px);
    transition:
        opacity .65s ease,
        transform .65s ease;
    transition-delay:.18s;
}

.fade-up.visible h2{
    opacity:1;
    transform:translateY(0);
}

.fade-up p{
    transition:opacity .65s ease;
}

.fade-up button{
    transition:
        opacity .65s ease,
        transform .65s ease;
}

.fade-up.visible button{
    transition-delay:.30s;
}

.ambient-light{
    position:fixed;
    inset:-30%;
    pointer-events:none;
    z-index:0;

    background:
      radial-gradient(circle, rgba(201,175,92,.10), transparent 45%),
      radial-gradient(circle, rgba(255,255,255,.18), transparent 40%);

    filter:blur(140px);

    animation:ambientMove 22s ease-in-out infinite alternate;
}

@keyframes ambientMove{

    0%{
        transform:
            translate(-8%,-5%)
            rotate(0deg);
    }

    100%{
        transform:
            translate(8%,6%)
            rotate(10deg);
    }

}

@media (max-width: 700px) {
  .fade-up {
    transform: translateY(28px);
    transition:
      opacity .55s ease,
      transform .55s ease;
  }
}
  .followed-seller-card {
  transition:
    transform .4s ease,
    box-shadow .4s ease,
    border-color .4s ease;
}

.followed-seller-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 55px 140px rgba(0,0,0,.25) !important;
  border-color: rgba(255,255,255,.2) !important;
}

.followed-seller-card img {
  transition: transform .5s ease;
}

.followed-seller-card:hover img {
  transform: scale(1.06);
}

.hero-section {
  isolation: isolate;
}

@keyframes heroLuxuryZoom {
  0% {
    scale: 1.05;
  }

  100% {
    scale: 1.10;
  }
}

@media (min-width: 769px) and (prefers-reduced-motion: no-preference) {
  .hero-background-luxury {
    animation: heroLuxuryZoom 14s ease-in-out infinite alternate;
    transform-origin: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-up,
  .hero-section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

      @media (max-width: 700px) {
  .home-page {
    padding-top: 92px !important;
    overflow-x: hidden !important;
  }

  .home-card::before,
.home-card::after {
  display: none !important;
}

  .home-card:hover {
  transform: none !important;
  box-shadow: 0 24px 70px rgba(0,0,0,.08) !important;
}

.home-card:hover .card-img {
  transform: none !important;
}

.brand-home-card:hover {
  transform: none !important;
}

  .hero-section {
    min-height: auto !important;
    height: auto !important;
    padding: 120px 22px 54px !important;
    margin: 0 0 34px !important;
    border-radius: 0 0 34px 34px !important;
    align-items: flex-start !important;
  }

  .hero-section img {
    object-fit: cover !important;
    object-position: center bottom !important;
    opacity: .52 !important;
    padding: 0 !important;
  }

  .hero-title {
    font-size: 48px !important;
    line-height: 1 !important;
    letter-spacing: -2.6px !important;
    max-width: 100% !important;
  }

  .hero-section p {
    font-size: 16px !important;
    line-height: 1.55 !important;
    max-width: 100% !important;
  }

  .hero-section button {
    width: 100% !important;
    height: 58px !important;
    justify-content: center !important;
  }

  .hero-section > div:last-child {
    max-width: 100% !important;
  }

  .hero-section div[style*="flex-wrap"] {
    width: 100% !important;
  }

  section {
    padding-left: 18px !important;
    padding-right: 18px !important;
  }

  h2 {
    font-size: 38px !important;
    line-height: 1.05 !important;
    letter-spacing: -2px !important;
  }

  .home-card {
    border-radius: 28px !important;
  }

  .home-card > div:first-child {
    height: 330px !important;
  }

  .card-img {
  padding: 18px !important;
}

.category-img {
  padding: 0 !important;
}

  .trust-grid {
    grid-template-columns: 1fr !important;
  }
}
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: `
radial-gradient(circle at 15% 15%, rgba(201,175,92,.08), transparent 28%),
radial-gradient(circle at 85% 30%, rgba(255,255,255,.35), transparent 26%),
radial-gradient(circle at 40% 85%, rgba(220,220,220,.22), transparent 30%),
linear-gradient(to bottom,#f8f8f4,#eeeeea)
`,
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const sectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "48px 60px",
  background: "rgba(255,255,255,.55)",
backdropFilter: "blur(26px)",
border: "1px solid rgba(255,255,255,.55)",
borderRadius: "42px",
boxShadow: "0 30px 90px rgba(0,0,0,.05)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  marginBottom: "34px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  margin: 0,
  letterSpacing: "-2px",
};

const smallButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "999px",
  padding: "12px 22px",
  fontWeight: 800,
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 360px),1fr))",
  gap: "32px",
};

const cardStyle = {
  background: "rgba(255,255,255,.82)",
  backdropFilter: "blur(22px)",

  borderRadius: "36px",

  overflow: "hidden",

  cursor: "pointer",

  border: "1px solid rgba(255,255,255,.55)",

  boxShadow:
    "0 35px 120px rgba(0,0,0,.08)",

  transition: "all .45s ease",

  position: "relative" as const,
};

const categoryCardStyle = {
  ...cardStyle,
};

const cardImageStyle = {
  position: "relative" as const,
 height: "460px",
  background: "#fafaf7",
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "40px 34px",
};

const brandStyle = {
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "3px",
  opacity: .60,
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  fontSize: "26px",
  fontWeight: 950,
  lineHeight: 1.02,
  marginTop: "14px",
  marginBottom: "22px",
  letterSpacing: "-1px",
  color: "#111",
};

const priceStyle = {
  fontSize: "38px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginTop: "18px",
  marginBottom: "18px",
  color: "#111",
};

const categoryTextStyle = {
  color: "#666",
};

const heroTrustBadgesStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "16px",
  marginTop: "18px",
};

const footerBrandStyle = {
  fontSize: "54px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginBottom: "22px",
};