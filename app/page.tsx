"use client";

import { useEffect } from "react";
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
import { useHomeData } from "@/components/home/hooks/useHomeData";
import { useIsMobile } from "@/components/home/hooks/useIsMobile";
import { useScrollY } from "@/components/home/hooks/useScrollY";
import "./home.css"



export default function Home() {

const {
  loadingHome,
  newDrops,
  soldProducts,
  followedSellers,
  followedSellerProducts,
} = useHomeData();

  const isMobile = useIsMobile();
 const scrollY = useScrollY();


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
  loading={loadingHome}
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