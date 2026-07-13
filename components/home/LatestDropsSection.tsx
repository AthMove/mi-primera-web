"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type LatestDropsSectionProps = {
  isMobile: boolean;
  products: any[];
};

export default function LatestDropsSection({
  isMobile,
  products,
}: LatestDropsSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  return (
    <section
      className="fade-up"
      data-delay="120"
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
          <p style={eyebrowStyle}>{t.latest}</p>

          <h2
            style={{
              ...sectionTitleStyle,
              fontSize: isMobile
                ? "38px"
                : sectionTitleStyle.fontSize,
              lineHeight: isMobile ? 1.05 : undefined,
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
            }}
          >
            {t.news}
          </h2>
        </div>

        <button
          onClick={() => router.push("/feed")}
          style={smallButtonStyle}
        >
          {t.viewFeed}
        </button>
      </div>

      <div
        style={{
          ...gridStyle,
          gridTemplateColumns: isMobile
            ? "1fr"
            : gridStyle.gridTemplateColumns,
          gap: isMobile ? "22px" : gridStyle.gap,
        }}
      >
        {products.map((product, index) => (
          <article
            key={product.id}
            data-delay={index * 80}
            className="home-card fade-up"
            onMouseMove={(event) => {
              const rect =
                event.currentTarget.getBoundingClientRect();

              event.currentTarget.style.setProperty(
                "--x",
                `${event.clientX - rect.left}px`
              );

              event.currentTarget.style.setProperty(
                "--y",
                `${event.clientY - rect.top}px`
              );
            }}
            onClick={() =>
              router.push(`/products/${product.id}`)
            }
            style={cardStyle}
          >
            <div
              style={{
                ...cardImageStyle,
                height: isMobile
                  ? "300px"
                  : cardImageStyle.height,
              }}
            >
              <span style={featuredBadgeStyle}>
                {product.featured
                  ? "⭐ DESTACADO"
                  : "🔥 NUEVO"}
              </span>

              <button
                type="button"
                aria-label="Añadir a favoritos"
                style={favoriteButtonStyle}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                ♡
              </button>

              <Image
                src={safeImage(product.image)}
                alt={product.title || "Producto"}
                fill
                sizes="33vw"
                className="card-img"
                onLoad={(event) => {
                  event.currentTarget.classList.add("loaded");
                }}
                style={{
                  objectFit: "contain",
                  padding: "22px",
                }}
              />
            </div>

            <div
              style={{
                ...cardContentStyle,
                padding: isMobile
                  ? "24px"
                  : cardContentStyle.padding,
              }}
            >
              <p style={brandStyle}>
                {product.brand || "ATHMOV"}
              </p>

              <h3 style={cardTitleStyle}>
                {product.title}
              </h3>

              <p
                style={{
                  ...priceStyle,
                  fontSize: isMobile
                    ? "30px"
                    : priceStyle.fontSize,
                }}
              >
                €{product.price}
              </p>

              <div style={productFooterStyle}>
                <span>{product.location || "España"}</span>
                <span>•</span>
                <span>
                  {product.condition || "Muy buen estado"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

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

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
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
  gridTemplateColumns:
    "repeat(auto-fit,minmax(min(100%, 360px),1fr))",
  gap: "32px",
};

const cardStyle = {
  background: "rgba(255,255,255,.82)",
  backdropFilter: "blur(22px)",
  borderRadius: "36px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(255,255,255,.55)",
  boxShadow: "0 35px 120px rgba(0,0,0,.08)",
  transition: "all .45s ease",
  position: "relative" as const,
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
  opacity: 0.6,
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