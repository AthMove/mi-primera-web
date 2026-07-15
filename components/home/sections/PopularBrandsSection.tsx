"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type PopularBrandsSectionProps = {
  isMobile: boolean;
};

export default function PopularBrandsSection({
  isMobile,
}: PopularBrandsSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

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
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
            }}
          >
            {t.popularBrands}
          </h2>
        </div>

        <button
          onClick={() => router.push("/products")}
          style={smallButtonStyle}
        >
          {t.viewAll}
        </button>
      </div>

      <div
        style={{
          ...brandGridHomeStyle,
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : brandGridHomeStyle.gridTemplateColumns,
          gap: isMobile ? "12px" : brandGridHomeStyle.gap,
        }}
      >
        {popularBrands.map((brand, index) => (
          <button
            key={brand}
            className="brand-home-card fade-up"
            data-delay={index * 40}
            onClick={() =>
              router.push(
                `/products?brand=${encodeURIComponent(brand)}`
              )
            }
            style={{
              ...brandHomeCardStyle,
              height: isMobile ? "72px" : brandHomeCardStyle.height,
              fontSize: isMobile ? "15px" : brandHomeCardStyle.fontSize,
              borderRadius: isMobile
                ? "18px"
                : brandHomeCardStyle.borderRadius,
            }}
          >
            {brand}
          </button>
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