"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

type BrandItem = {
  name: string;
  count: number;
  category: string;
};

type Props = {
  brands: BrandItem[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BrandsClient({ brands }: Props) {
  const { t } = useLanguage();

  const groupedBrands = {
    PADEL: brands.filter((b) => b.category === "PADEL"),
    GOLF: brands.filter((b) => b.category === "GOLF"),
    TENIS: brands.filter((b) => b.category === "TENIS"),
    RUNNING: brands.filter((b) => b.category === "RUNNING"),
  };

  const categoryLabels: Record<string, string> = {
    PADEL: t.padel,
    GOLF: t.golf,
    TENIS: t.tennis,
    RUNNING: t.running,
  };

  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <p style={eyebrowStyle}>
          {t.brandsPageEyebrow}
        </p>

        <h1 style={titleStyle}>
          {t.brandsPageTitle}
        </h1>

        <p style={descriptionStyle}>
          {t.brandsPageDescription}
        </p>
      </header>

      <div style={sectionHeadingStyle}>
        <h2 style={sectionTitleStyle}>
          {t.brandsExploreTitle}
        </h2>

        <p style={sectionDescriptionStyle}>
          {t.brandsExploreDescription}
        </p>
      </div>

      {brands.length > 0 ? (
        <>
          {Object.entries(groupedBrands).map(([category, items]) =>
            items.length > 0 ? (
              <section
                key={category}
                style={{ marginBottom: 70 }}
              >
                <h2
                  style={{
                    fontSize: 34,
                    marginBottom: 28,
                    letterSpacing: "-1px",
                  }}
                >
                  {categoryLabels[category]}
                </h2>

                <div style={gridStyle}>
                  {items.map((brand) => (
                    <Link
                      key={`${category}-${slugify(brand.name)}`}
                      href={`/brands/${slugify(brand.name)}`}
                      style={brandCardStyle}
                    >
                      <span>
                        <span style={brandNameStyle}>
                          {brand.name}
                        </span>

                        <span style={brandCountStyle}>
                          {brand.count}{" "}
                          {brand.count === 1
                            ? t.brandsProductAvailable
                            : t.brandsProductsAvailable}
                        </span>
                      </span>

                      <span style={brandLinkStyle}>
                        {t.brandsViewProducts} →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null
          )}
        </>
      ) : (
        <section style={emptyStateStyle}>
          <h2 style={emptyTitleStyle}>
            {t.brandsComingSoon}
          </h2>

          <p style={emptyTextStyle}>
            {t.brandsNoProducts}
          </p>

          <Link href="/products" style={emptyLinkStyle}>
            {t.exploreMarketplace}
          </Link>
        </section>
      )}
    </main>
  );
}

const mainStyle: CSSProperties = {
  width: "100%",
  maxWidth: 1240,
  minHeight: "70vh",
  margin: "0 auto",
  padding: "150px 24px 100px",
};

const headerStyle: CSSProperties = {
  maxWidth: 760,
  marginBottom: 56,
};

const eyebrowStyle: CSSProperties = {
  margin: "0 0 16px",
  color: "#8a8a8a",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.18em",
};

const titleStyle: CSSProperties = {
  margin: "0 0 20px",
  color: "#111111",
  fontSize: "clamp(42px, 7vw, 72px)",
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "-0.055em",
};

const descriptionStyle: CSSProperties = {
  maxWidth: 680,
  margin: 0,
  color: "#686868",
  fontSize: 17,
  lineHeight: 1.75,
};

const sectionHeadingStyle: CSSProperties = {
  marginBottom: 40,
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  color: "#111111",
  fontSize: 34,
  fontWeight: 600,
  letterSpacing: "-0.03em",
};

const sectionDescriptionStyle: CSSProperties = {
  maxWidth: 650,
  margin: 0,
  color: "#666666",
  lineHeight: 1.7,
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill, minmax(250px, 1fr))",
  gap: 18,
};

const brandCardStyle: CSSProperties = {
  display: "flex",
  minHeight: 210,
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 28,
  border: "1px solid rgba(17, 17, 17, 0.08)",
  borderRadius: 24,
  background: "#ffffff",
  color: "#111111",
  boxShadow: "0 16px 45px rgba(0, 0, 0, 0.045)",
  textDecoration: "none",
};

const brandNameStyle: CSSProperties = {
  display: "block",
  fontSize: 25,
  fontWeight: 600,
  lineHeight: 1.1,
  letterSpacing: "-0.035em",
};

const brandCountStyle: CSSProperties = {
  display: "block",
  marginTop: 18,
  color: "#7c7c7c",
  fontSize: 13,
  lineHeight: 1.5,
};

const brandLinkStyle: CSSProperties = {
  display: "block",
  marginTop: 32,
  color: "#111111",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.04em",
};

const emptyStateStyle: CSSProperties = {
  padding: "56px 28px",
  border: "1px solid rgba(17, 17, 17, 0.08)",
  borderRadius: 24,
  background: "#f7f7f4",
  textAlign: "center",
};

const emptyTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  fontSize: 28,
  fontWeight: 600,
};

const emptyTextStyle: CSSProperties = {
  margin: "0 0 26px",
  color: "#707070",
};

const emptyLinkStyle: CSSProperties = {
  display: "inline-flex",
  padding: "13px 20px",
  borderRadius: 999,
  background: "#111111",
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 700,
  textDecoration: "none",
};