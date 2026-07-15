"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type FooterSectionProps = {
  isMobile: boolean;
};

export default function FooterSection({
  isMobile,
}: FooterSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
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
          gridTemplateColumns: isMobile
            ? "1fr"
            : footerGridStyle.gridTemplateColumns,
          gap: isMobile ? "38px" : footerGridStyle.gap,
        }}
      >
        <div>
          <div
            style={{
              ...footerBrandStyle,
              fontSize: isMobile ? "42px" : footerBrandStyle.fontSize,
              letterSpacing: isMobile
                ? "-2px"
                : footerBrandStyle.letterSpacing,
            }}
          >
            ATHMOV
          </div>

          <p style={footerTextStyle}>{t.footerDescription}</p>

          <a href="mailto:contact@athmov.com" style={footerEmailStyle}>
            contact@athmov.com
          </a>
        </div>

        <div style={footerColumnStyle}>
          <p style={footerTitleStyle}>{t.marketplace}</p>

          <button
            onClick={() => router.push("/products")}
            style={footerLinkStyle}
          >
            {t.buy}
          </button>

          <button
            onClick={() => router.push("/sell")}
            style={footerLinkStyle}
          >
            {t.sell}
          </button>

          <button
            onClick={() => router.push("/blog")}
            style={footerLinkStyle}
          >
            Blog
          </button>
        </div>

        <div style={footerColumnStyle}>
          <p style={footerTitleStyle}>{t.support}</p>

          <button
            onClick={() => router.push("/how-it-works")}
            style={footerLinkStyle}
          >
            {t.howWorks}
          </button>

          <button
            onClick={() => router.push("/buyer-guide")}
            style={footerLinkStyle}
          >
            {t.buyerGuide}
          </button>

          <button style={footerLinkStyle}>
            {t.buyerProtection}
          </button>
        </div>

        <div style={footerColumnStyle}>
          <p style={footerTitleStyle}>Categorías</p>

          <button
            onClick={() => router.push("/products?category=PADEL")}
            style={footerLinkStyle}
          >
            PADEL
          </button>

          <button
            onClick={() => router.push("/products?category=GOLF")}
            style={footerLinkStyle}
          >
            GOLF
          </button>

          <button
            onClick={() => router.push("/products?category=TENIS")}
            style={footerLinkStyle}
          >
            TENIS
          </button>

          <button
            onClick={() => router.push("/products?category=RUNNING")}
            style={footerLinkStyle}
          >
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
  );
}

const footerStyle = {
  marginTop: "140px",
  background: "linear-gradient(180deg,#111 0%,#080808 100%)",
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

const footerBrandStyle = {
  fontSize: "54px",
  fontWeight: 950,
  letterSpacing: "-3px",
  marginBottom: "22px",
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