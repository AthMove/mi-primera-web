"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type SellerCTASectionProps = {
  isMobile: boolean;
};

export default function SellerCTASection({
  isMobile,
}: SellerCTASectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
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
          letterSpacing: isMobile
            ? "-2px"
            : ctaTitleStyle.letterSpacing,
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
  );
}

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