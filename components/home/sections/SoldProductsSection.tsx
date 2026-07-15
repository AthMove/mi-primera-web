"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type SoldProductsSectionProps = {
  isMobile: boolean;
  soldProducts: any[];
};

export default function SoldProductsSection({
  isMobile,
  soldProducts,
}: SoldProductsSectionProps) {
  const { t } = useLanguage();

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  if (soldProducts.length === 0) return null;

  return (
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
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
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
            className="fade-up"
            data-delay={index * 80}
            style={soldCardStyle}
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

const sectionTitleStyle = {
  fontSize: "48px",
  margin: 0,
  letterSpacing: "-2px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
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

const brandStyle = {
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "3px",
  opacity: 0.6,
  textTransform: "uppercase" as const,
};

const soldTitleStyle = {
  fontSize: "22px",
  marginTop: "10px",
};

const soldPriceStyle = {
  fontSize: "24px",
  fontWeight: 900,
};