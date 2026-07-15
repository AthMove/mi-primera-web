"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type BlogSectionProps = {
  isMobile: boolean;
};

export default function BlogSection({
  isMobile,
}: BlogSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
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
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
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
          gridTemplateColumns: isMobile
            ? "1fr"
            : gridStyle.gridTemplateColumns,
          gap: isMobile ? "24px" : gridStyle.gap,
        }}
      >
        <article
          className="home-card fade-up"
          data-delay="0"
          onClick={() =>
            router.push(
              "/blog/cuando-comprar-vender-palos-golf-segunda-mano"
            )
          }
          style={cardStyle}
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

const categoryTextStyle = {
  color: "#666",
};