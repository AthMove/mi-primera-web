"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import ProductCard from "@/components/home/cards/ProductCard";

interface Props {
  featuredProducts: any[];
  isMobile: boolean;
}

export default function FeaturedProducts({
  featuredProducts,
  isMobile,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  if (featuredProducts.length === 0) return null;

  return (
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
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}

const featuredSectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto 42px",
  padding: "64px 60px",
  borderRadius: "40px",
  background:
    "linear-gradient(145deg, rgba(249,249,247,.98), rgba(240,240,236,.94))",
  border: "1px solid rgba(17,17,17,.06)",
  boxShadow: "0 28px 90px rgba(0,0,0,.055)",
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "28px",
  marginBottom: "36px",
};

const eyebrowStyle = {
  margin: "0 0 13px",
  color: "#777",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
};

const sectionTitleStyle = {
  margin: 0,
  color: "#111",
  fontSize: "48px",
  fontWeight: 470,
  lineHeight: 1,
  letterSpacing: "-0.045em",
};

const smallButtonStyle = {
  minHeight: "46px",
  padding: "0 20px",
  border: "1px solid #111",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 650,
};

const featuredGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: "28px",
};