"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";
import HeroSection from "@/components/home/HeroSection";
import EditorialSection from "@/components/home/EditorialSection";
import LatestDropsSection from "@/components/home/LatestDropsSection";
import FollowedSellersSection from "@/components/home/FollowedSellersSection";

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

  const categories = [
    {
      title: "PÁDEL",
      text: "Palas y material premium",
     href: "/products?category=PADEL",
      image: "/padel.jpg",
    },
    {
      title: "GOLF",
      text: "Palos, bolsas y accesorios",
      href: "/products?category=GOLF",
      image: "/golf.jpg",
    },
    {
      title: "TENIS",
      text: "Raquetas y piezas de alto rendimiento",
      href: "/products?category=TENIS",
      image: "/tennis.jpg",
    },
    {
      title: "RUNNING",
      text: "Calzado técnico y ropa deportiva",
      href: "/products?category=RUNNING",
      image: "/running.jpg",
    },
  ];

  const popularBrands = [
  "TaylorMade",
  "Callaway",
  "Ping",
  "Titleist",
  "Bullpadel",
  "Nox",
  "Nike",
  "ASICS",
];

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

<FollowedSellersSection
  isMobile={isMobile}
  sellers={followedSellers}
/>
      <section
      className="fade-up"
      data-delay="180"
  style={{
    ...darkSectionStyle,
    margin: isMobile ? "24px 18px" : darkSectionStyle.margin,
    padding: isMobile ? "38px 24px" : darkSectionStyle.padding,
    borderRadius: isMobile ? "30px" : darkSectionStyle.borderRadius,
  }}
>
        <p style={eyebrowLightStyle}>{t.whyAthmov}</p>

<h2
  style={{
    ...darkTitleStyle,
    fontSize: isMobile ? "38px" : darkTitleStyle.fontSize,
    letterSpacing: isMobile ? "-2px" : darkTitleStyle.letterSpacing,
  }}
>
          {t.whyTitle}
        </h2>

        <div style={trustGridStyle}>
          <div>
            <h3 style={trustTitleStyle}>{t.why1Title}</h3>
            <p style={trustTextStyle}>
              {t.why1Text}
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>{t.why2Title}</h3>
            <p style={trustTextStyle}>
              {t.why2Text}
            </p>
          </div>

          <div>
            <h3 style={trustTitleStyle}>{t.why3Title}</h3>
            <p style={trustTextStyle}>
              {t.why3Text}
            </p>
          </div>
        </div>
      </section>

   <section
   className="fade-up"
   data-delay="240"
  style={{
    ...sectionStyle,
    marginBottom: "34px",
    padding: isMobile ? "42px 24px" : sectionStyle.padding,
  }}
>
        <div
  style={{
    ...sectionHeaderStyle,
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "flex-end",
    gap: isMobile ? "16px" : sectionHeaderStyle.gap,
  }}
>
          <div>
            <p style={eyebrowStyle}>{t.categories}</p>
<h2
  style={{
    ...sectionTitleStyle,
    fontSize: isMobile ? "38px" : sectionTitleStyle.fontSize,
    lineHeight: isMobile ? 1.05 : undefined,
    letterSpacing: isMobile ? "-2px" : sectionTitleStyle.letterSpacing,
  }}
>
 {t.exploreSports}
</h2>
          </div>
        </div>

        <div
  style={{
    ...gridStyle,
    gridTemplateColumns: isMobile ? "1fr" : gridStyle.gridTemplateColumns,
    gap: isMobile ? "24px" : gridStyle.gap,
  }}
>
          {categories.map((category, index) => (
<article
  key={category.title}
  data-delay={index * 80}
  onClick={() => router.push(category.href)}
  style={categoryCardStyle}
  className="home-card fade-up"
>
              <div
  style={{
    ...cardImageStyle,
    height: isMobile ? "260px" : cardImageStyle.height,
  }}
>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="33vw"
                  className="card-img"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={cardContentStyle}>
                <p style={brandStyle}>DEPORTE</p>
                <h3 style={cardTitleStyle}>{category.title}</h3>
                <p style={categoryTextStyle}>{category.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

     <section
  className="fade-up"
  data-delay="300"
  style={{
    ...sectionStyle,
    marginBottom: "34px",
    padding: isMobile ? "42px 24px" : sectionStyle.padding,
  }}
>
  <div
  style={{
    ...sectionHeaderStyle,
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "flex-end",
    gap: isMobile ? "16px" : sectionHeaderStyle.gap,
  }}
>
    <div>
     <p style={eyebrowStyle}>{t.brands}</p>
 <h2
  style={{
    ...sectionTitleStyle,
    fontSize: isMobile ? "38px" : sectionTitleStyle.fontSize,
    lineHeight: isMobile ? 1.05 : undefined,
    letterSpacing: isMobile ? "-2px" : sectionTitleStyle.letterSpacing,
  }}
>
 {t.popularBrands}
</h2>
    </div>

    <button onClick={() => router.push("/products")} style={smallButtonStyle}>
      {t.viewAll}
    </button>
  </div>

<div
  style={{
    ...brandGridHomeStyle,
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : brandGridHomeStyle.gridTemplateColumns,
    gap: isMobile ? "12px" : brandGridHomeStyle.gap,
  }}
>
   {popularBrands.map((brand, index) => (
  <button
    className="brand-home-card fade-up"
    data-delay={index * 40}
        key={brand}
        onClick={() => router.push(`/products?brand=${encodeURIComponent(brand)}`)}
       style={{
  ...brandHomeCardStyle,
  height: isMobile ? "72px" : brandHomeCardStyle.height,
  fontSize: isMobile ? "15px" : brandHomeCardStyle.fontSize,
  borderRadius: isMobile ? "18px" : brandHomeCardStyle.borderRadius,
}}
      >
        {brand}
      </button>
    ))}
  </div>
</section>

          {soldProducts.length > 0 && (
       <section
  className="fade-up"
  data-delay="360"
  style={{
    ...sectionStyle,
    marginBottom: "34px",
    padding: isMobile ? "42px 24px" : sectionStyle.padding,
  }}
>
         <div
  style={{
    ...sectionHeaderStyle,
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "flex-end",
    gap: isMobile ? "16px" : sectionHeaderStyle.gap,
  }}
>
            <div>
              <p style={eyebrowStyle}>{t.marketActivity}</p>
<h2
  style={{
    ...sectionTitleStyle,
    fontSize: isMobile ? "38px" : sectionTitleStyle.fontSize,
    lineHeight: isMobile ? 1.05 : undefined,
    letterSpacing: isMobile ? "-2px" : sectionTitleStyle.letterSpacing,
  }}
>
 {t.soldRecently}
</h2>
            </div>
          </div>

          <div style={soldGridStyle}>
            {soldProducts.map((product, index) => (
  <article
    key={product.id}
    style={soldCardStyle}
    className="fade-up"
    data-delay={index * 80}
  >
                <div style={soldImageStyle}>
                  <Image
                    src={safeImage(product.image)}
                    alt={product.title || "Producto vendido"}
                    fill
                    sizes="25vw"
                    style={{ objectFit: "cover" }}
                  />

                  <span style={soldBadgeStyle}>VENDIDO</span>
                </div>

                <div style={soldContentStyle}>
                  <p style={brandStyle}>{product.brand}</p>
                  <h3 style={soldTitleStyle}>{product.title}</h3>
                  <p style={soldPriceStyle}>€{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* BLOG ATHMOV */}
      <section
      className="fade-up"
      data-delay="420"
  style={{
    ...sectionStyle,
    marginBottom: "34px",
    padding: isMobile ? "42px 24px" : sectionStyle.padding,
  }}
>
 <div
  style={{
    ...sectionHeaderStyle,
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "flex-end",
    gap: isMobile ? "16px" : sectionHeaderStyle.gap,
  }}
>
    <div>
      <p style={eyebrowStyle}>{t.blogEyebrow}</p>
<h2
  style={{
    ...sectionTitleStyle,
    fontSize: isMobile ? "38px" : sectionTitleStyle.fontSize,
    lineHeight: isMobile ? 1.05 : undefined,
    letterSpacing: isMobile ? "-2px" : sectionTitleStyle.letterSpacing,
  }}
>
  {t.blogTitle}
</h2>
    </div>

    <button
      onClick={() => router.push("/blog")}
      style={{
  ...smallButtonStyle,
  padding: isMobile ? "10px 16px" : smallButtonStyle.padding,
  fontSize: isMobile ? "12px" : smallButtonStyle.fontSize,
}}
    >
      {t.viewBlog}
    </button>
  </div>

  <div
  style={{
    ...gridStyle,
    gridTemplateColumns: isMobile ? "1fr" : gridStyle.gridTemplateColumns,
    gap: isMobile ? "24px" : gridStyle.gap,
  }}
>
 <article
  data-delay="0"
      onClick={() =>
        router.push(
          "/blog/cuando-comprar-vender-palos-golf-segunda-mano"
        )
      }
      style={cardStyle}
      className="home-card fade-up"
    >
      <div
  style={{
    ...cardContentStyle,
    padding: isMobile ? "24px" : cardContentStyle.padding,
  }}
>
        <p style={brandStyle}>GOLF · MERCADO</p>

        <h3
  style={{
    ...cardTitleStyle,
    fontSize: isMobile ? "22px" : cardTitleStyle.fontSize,
  }}
>
          Cuándo comprar y vender palos de golf de segunda mano
        </h3>

        <p style={categoryTextStyle}>
          El calendario clave para compradores y vendedores de golf premium.
        </p>
      </div>
    </article>
  </div>
</section>

<section
  className="fade-up"
  data-delay="480"
  style={{
    ...sellerCtaStyle,
    padding: isMobile ? "48px 24px" : sellerCtaStyle.padding,
    margin: isMobile ? "40px 18px 70px" : sellerCtaStyle.margin,
    borderRadius: isMobile ? "30px" : sellerCtaStyle.borderRadius,
  }}
>
  <h2
    style={{
      ...ctaTitleStyle,
      fontSize: isMobile ? "40px" : ctaTitleStyle.fontSize,
      letterSpacing: isMobile ? "-2px" : ctaTitleStyle.letterSpacing,
      lineHeight: isMobile ? 1.05 : undefined,
    }}
  >
    {t.readyTitle}
  </h2>

  <p style={ctaTextStyle}>{t.readyText}</p>

  <button
    onClick={() => router.push("/sell")}
    style={{
      ...heroPrimaryButtonStyle,
      width: isMobile ? "100%" : "auto",
    }}
  >
    {t.startSelling}
  </button>
</section>

<footer
  style={{
    ...footerStyle,
    padding: isMobile ? "64px 24px 36px" : footerStyle.padding,
    marginTop: isMobile ? "70px" : footerStyle.marginTop,
    borderTopLeftRadius: isMobile
      ? "30px"
      : footerStyle.borderTopLeftRadius,
    borderTopRightRadius: isMobile
      ? "30px"
      : footerStyle.borderTopRightRadius,
  }}
>
        <div
  style={{
    ...footerGridStyle,
    gridTemplateColumns: isMobile ? "1fr" : footerGridStyle.gridTemplateColumns,
    gap: isMobile ? "38px" : footerGridStyle.gap,
  }}
>
          <div>
<div
  style={{
    ...footerBrandStyle,
    fontSize: isMobile ? "42px" : footerBrandStyle.fontSize,
    letterSpacing: isMobile ? "-2px" : footerBrandStyle.letterSpacing,
  }}
>
  ATHMOV
</div>

            <p style={footerTextStyle}>
  {t.footerDescription}
</p>

<a href="mailto:contact@athmov.com" style={footerEmailStyle}>
  contact@athmov.com
</a>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>{t.marketplace}</p>

            <button onClick={() => router.push("/products")} style={footerLinkStyle}>
             {t.buy}
            </button>

            <button onClick={() => router.push("/sell")} style={footerLinkStyle}>
              {t.sell}
            </button>

            <button onClick={() => router.push("/blog")} style={footerLinkStyle}>
  Blog
</button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>{t.support}</p>

            <button onClick={() => router.push("/how-it-works")} style={footerLinkStyle}>
              {t.howWorks}
            </button>

            <button onClick={() => router.push("/buyer-guide")} style={footerLinkStyle}>
              {t.buyerGuide}
            </button>

            <button style={footerLinkStyle}>{t.buyerProtection}</button>
          </div>

          <div style={footerColumnStyle}>
            <p style={footerTitleStyle}>Categorías</p>

            <button onClick={() => router.push("/products?category=PADEL")} style={footerLinkStyle}>
              PADEL
            </button>

            <button onClick={() => router.push("/products?category=GOLF")} style={footerLinkStyle}>
              GOLF
            </button>

            <button onClick={() => router.push("/products?category=TENIS")} style={footerLinkStyle}>
              TENIS
            </button>

            <button onClick={() => router.push("/products?category=RUNNING")} style={footerLinkStyle}>
              RUNNING
            </button>
          </div>
        </div>

      <div
  style={{
    ...footerBottomStyle,
    marginTop: isMobile ? "42px" : footerBottomStyle.marginTop,
    lineHeight: isMobile ? 1.6 : undefined,
  }}
>
  {t.rights} · Contacto: contact@athmov.com
</div>
      </footer>

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

const brandGridHomeStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: "16px",
};

const brandHomeCardStyle = {
  height: "92px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  fontSize: "18px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 18px 60px rgba(0,0,0,0.04)",
};

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

const heroStyle = {
  position: "relative" as const,
  minHeight: "88vh",
  borderRadius: "0 0 64px 64px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  padding: "120px 90px 90px",
  marginBottom: "50px",
  background: "#111",
  boxShadow: "0 60px 160px rgba(0,0,0,.26)",
};

const heroBackgroundStyle = {
  position: "absolute" as const,
  inset: 0,
  zIndex: 0,
};

const heroOverlayStyle = {
  position: "absolute" as const,
  inset: 0,

  background: `
radial-gradient(
circle at top right,
rgba(255,255,255,.12),
transparent 35%
),

radial-gradient(
circle at bottom left,
rgba(201,175,92,.08),
transparent 45%
),

linear-gradient(
  90deg,
  rgba(0,0,0,.78) 0%,
  rgba(0,0,0,.55) 45%,
  rgba(0,0,0,.20) 75%,
  transparent 100%
)
`,

  zIndex: 1,
};

const heroContentStyle = {
  position: "relative" as const,
  zIndex: 2,
  maxWidth: "760px",
  color: "#fff",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const heroTitleStyle = {
  fontSize: "104px",
  color: "#fff",
  lineHeight: 0.9,
  margin: 0,
  letterSpacing: "-7px",
  fontWeight: 950,
  maxWidth: "820px",
  textShadow: "0 18px 50px rgba(0,0,0,.35)",
};

const heroTextStyle = {
  marginTop: "34px",
  color: "rgba(255,255,255,0.82)",
  fontSize: "24px",
  lineHeight: 1.6,
  fontWeight: 650,
  maxWidth: "680px",
  textShadow: "0 8px 24px rgba(0,0,0,.25)",
};

const heroActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "18px",
  marginTop: "44px",
};

const heroPrimaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 34px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "15px",
  boxShadow: "0 14px 40px rgba(0,0,0,.18)",
  transition: "all .25s ease",
};

const heroSecondaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 34px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,.18)",
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "15px",
  backdropFilter: "blur(10px)",
  transition: "all .25s ease",
};

const heroImageStyle = {
  position: "relative" as const,
  height: "560px",
  borderRadius: "44px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 50px 150px rgba(0,0,0,0.16)",
};

const heroBadgeStyle = {
  position: "absolute" as const,
  left: "24px",
  bottom: "24px",
  background: "#fff",
  borderRadius: "999px",
  padding: "13px 18px",
  fontSize: "12px",
  fontWeight: 900,
};

const trustSectionStyle = {
  maxWidth: "1400px",
  margin: "40px auto 80px",
  padding: "0 60px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const trustCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const trustCardTitleStyle = {
  fontSize: "18px",
  fontWeight: 800,
  marginBottom: "12px",
};

const trustCardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
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

const darkSectionStyle = {
  maxWidth: "1280px",
  margin: "40px auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const eyebrowLightStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.55,
};

const darkTitleStyle = {
  fontSize: "52px",
  lineHeight: 1.05,
  letterSpacing: "-3px",
  maxWidth: "760px",
};

const trustGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "28px",
  marginTop: "38px",
};

const trustTitleStyle = {
  fontSize: "22px",
};

const trustTextStyle = {
  color: "rgba(255,255,255,0.68)",
  lineHeight: 1.7,
};

const soldGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "24px",
};

const soldCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
};

const soldImageStyle = {
  position: "relative" as const,
  height: "230px",
};

const soldBadgeStyle = {
  position: "absolute" as const,
  top: "14px",
  right: "14px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "10px",
  fontWeight: 900,
};

const soldContentStyle = {
  padding: "20px",
};

const soldTitleStyle = {
  fontSize: "22px",
  marginTop: "10px",
};

const soldPriceStyle = {
  fontSize: "24px",
  fontWeight: 900,
};

const sellerCtaStyle = {
  maxWidth: "1280px",
  margin: "70px auto 110px",
  background: "linear-gradient(135deg,#111 0%,#1d1d1d 100%)",
  color: "#fff",
  borderRadius: "44px",
  padding: "80px 60px",
  textAlign: "center" as const,
  boxShadow: "0 40px 120px rgba(0,0,0,.18)",
};

const ctaTitleStyle = {
  fontSize: "64px",
  letterSpacing: "-3px",
  margin: 0,
};

const ctaTextStyle = {
  color: "rgba(255,255,255,.70)",
  marginTop: "18px",
  marginBottom: "34px",
  fontSize: "18px",
};

const footerStyle = {
  marginTop: "140px",
  background:
"linear-gradient(180deg,#111 0%,#080808 100%)",
  color: "#fff",
  padding: "120px 80px 60px",
  borderTopLeftRadius: "42px",
  borderTopRightRadius: "42px",
};

const footerGridStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "70px",
};

const footerColumnStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
};

const footerLogoStyle = {
  fontSize: "42px",
  fontWeight: 900,
  letterSpacing: "-2px",
  marginBottom: "24px",
};

const footerTitleStyle = {
  color: "#fff",
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  marginBottom: "20px",
};

const footerTextStyle = {
  color: "rgba(255,255,255,.65)",
  fontSize: "16px",
  lineHeight: 1.8,
  maxWidth: "420px",
};

const footerLinkStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  textAlign: "left" as const,
  cursor: "pointer",
  color: "rgba(255,255,255,.58)",
  fontSize: "15px",
  fontWeight: 600,
};

const footerBottomStyle = {
  maxWidth: "1400px",
  marginTop: "60px",
  marginLeft: "auto",
  marginRight: "auto",
  borderTop: "1px solid rgba(255,255,255,.12)",
  paddingTop: "28px",
  color: "rgba(255,255,255,.45)",
  fontSize: "13px",
};

const footerEmailStyle = {
  display: "inline-block",
  marginTop: "22px",
  color: "#fff",
  fontWeight: 900,
  textDecoration: "none",
};

const productMetaStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const conditionBadgeStyle = {
  background: "#f4f4f4",
  color: "#111",
  borderRadius: "999px",
  padding: "6px 12px",
  fontSize: "12px",
  fontWeight: 800,
};

const heroProofStyle = {
  marginTop: "18px",
  color: "#777",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.3px",
};

const productFooterStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginTop: "24px",
  color: "#8a8a8a",
  fontSize: "15px",
  fontWeight: 700,
};

const featuredBadgeStyle = {
  position: "absolute" as const,
  top: "16px",
  left: "16px",
  zIndex: 5,
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "0.5px",
};

const favoriteButtonStyle = {
  position: "absolute" as const,
  top: "22px",
right: "22px",
  zIndex: 5,
 width: "44px",
height: "44px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(12px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "22px",
  cursor: "pointer",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
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

const editorialSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 10px",
  padding: "80px 60px",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "60px",
  alignItems: "center",
};

const editorialTitleStyle = {
  fontSize: "72px",
  lineHeight: 0.95,
  letterSpacing: "-4px",
  margin: 0,
  maxWidth: "850px",
};

const editorialTextStyle = {
  marginTop: "26px",
  fontSize: "20px",
  lineHeight: 1.7,
  color: "#666",
  maxWidth: "620px",
};

const editorialGridStyle = {
  display: "grid",
  gap: "14px",
  fontSize: "18px",
  fontWeight: 900,
};