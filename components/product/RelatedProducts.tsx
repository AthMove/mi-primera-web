"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type RelatedProductsProps = {
  products: any[];
  safeImage: (src?: string) => string;
};

export default function RelatedProducts({
  products,
  safeImage,
}: RelatedProductsProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section style={relatedSectionStyle}>
      <p style={relatedEyebrowStyle}>
        {t.relatedProductsEyebrow}
      </p>

      <h2 style={relatedTitleStyle}>
        {t.relatedProductsTitle}
      </h2>

      {products.length === 0 ? (
        <p style={relatedEmptyStyle}>
          {t.relatedProductsEmpty}
        </p>
      ) : (
        <div style={relatedGridStyle}>
          {products.map((item) => (
            <div
              key={item.id}
              style={relatedCardStyle}
              onClick={() =>
                router.push(
                  item.slug
                    ? `/p/${item.slug}`
                    : `/products/${item.id}`
                )
              }
            >
              <div style={relatedImageStyle}>
                <Image
                  src={safeImage(item.image)}
                  alt={item.title || t.productFallback}
                  fill
                  sizes="33vw"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "42px",
                  }}
                />
              </div>

              <div style={relatedContentStyle}>
                <p style={relatedBrandStyle}>
                  {item.brand}
                </p>

                <h3 style={relatedProductTitleStyle}>
                  {item.title}
                </h3>

                <p style={relatedSubtitleStyle}>
                  {t.relatedProductSubtitle}
                </p>

                <div style={relatedFooterStyle}>
                  <p style={relatedPriceStyle}>
                    €{item.price}
                  </p>

                  <span style={relatedViewStyle}>
                    {t.relatedView}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const relatedSectionStyle: React.CSSProperties = {
  marginTop: "96px",
  paddingTop: "48px",
  borderTop: "1px solid rgba(17, 17, 17, 0.08)",
};

const relatedEyebrowStyle: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  color: "#8a8a8a",
};

const relatedTitleStyle: React.CSSProperties = {
  margin: "0 0 32px",
  fontSize: "clamp(28px, 4vw, 44px)",
  fontWeight: 500,
  letterSpacing: "-0.04em",
  color: "#111111",
};

const relatedEmptyStyle: React.CSSProperties = {
  margin: 0,
  color: "#777777",
  fontSize: "15px",
  lineHeight: 1.6,
};

const relatedGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const relatedCardStyle: React.CSSProperties = {
  overflow: "hidden",
  borderRadius: "22px",
  background: "#ffffff",
  border: "1px solid rgba(17, 17, 17, 0.08)",
  cursor: "pointer",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const relatedImageStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  background: "#f5f5f3",
};

const relatedContentStyle: React.CSSProperties = {
  padding: "20px",
};

const relatedBrandStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#8a8a8a",
};

const relatedProductTitleStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: 1.25,
  color: "#111111",
};

const relatedSubtitleStyle: React.CSSProperties = {
  margin: "10px 0 22px",
  fontSize: "13px",
  lineHeight: 1.5,
  color: "#777777",
};

const relatedFooterStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
};

const relatedPriceStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 600,
  color: "#111111",
};

const relatedViewStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#111111",
};