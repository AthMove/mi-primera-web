"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type HeroSectionProps = {
  isMobile: boolean;
  scrollY: number;
};

export default function HeroSection({
  isMobile,
  scrollY,
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section
      style={{
        ...heroStyle,
        minHeight: isMobile ? "auto" : heroStyle.minHeight,
        padding: isMobile ? "120px 24px 56px" : heroStyle.padding,
        marginBottom: isMobile ? "34px" : heroStyle.marginBottom,
        borderRadius: isMobile
          ? "0 0 34px 34px"
          : heroStyle.borderRadius,
        alignItems: isMobile ? "flex-start" : heroStyle.alignItems,
      }}
      className="hero-section"
    >
      <div
        className="hero-background-luxury"
        style={{
          ...heroBackgroundStyle,
          transform: isMobile
            ? "none"
            : `translateY(${Math.min(scrollY * 0.14, 90)}px)`,
          transition: "transform .08s linear",
        }}
      >
        <Image
          src="/hero-premium.jpg"
          alt="ATHMOV premium sports marketplace"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            padding: "14px",
          }}
        />

        <div style={heroOverlayStyle} />
      </div>

      <div
        style={{
          ...heroContentStyle,
          transform: isMobile
            ? "none"
            : `translateY(${Math.min(scrollY * 0.045, 28)}px)`,
        }}
      >
        <p style={eyebrowStyle}>ATHMOV PREMIUM SECOND HAND</p>

        <h1
          style={{
            ...heroTitleStyle,
            fontSize: isMobile ? "48px" : heroTitleStyle.fontSize,
            lineHeight: isMobile ? 1 : heroTitleStyle.lineHeight,
            letterSpacing: isMobile
              ? "-2.6px"
              : heroTitleStyle.letterSpacing,
          }}
          className="hero-title"
        >
          Luxury sports.
          <br />
          Second hand.
        </h1>

        <p
          style={{
            ...heroTextStyle,
            fontSize: isMobile ? "17px" : heroTextStyle.fontSize,
            lineHeight: isMobile ? 1.55 : heroTextStyle.lineHeight,
          }}
        >
          Compra y vende material deportivo premium de segunda mano con
          vendedores verificados, pagos seguros y protección al comprador.
        </p>

        <div style={heroTrustBadgesStyle}>
          <span style={trustBadgeStyle}>✓ Pagos seguros</span>

          <span style={trustBadgeStyle}>✓ Vendedores verificados</span>

          <span style={trustBadgeStyle}>✓ Protección al comprador</span>
        </div>

        <div
          style={{
            ...heroActionsStyle,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onClick={() => router.push("/products")}
            style={{
              ...heroPrimaryButtonStyle,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Shop Gear
          </button>

          <button
            onClick={() => router.push("/sell")}
            style={{
              ...heroSecondaryButtonStyle,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Sell Yours
          </button>
        </div>
      </div>
    </section>
  );
}

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
  border: "none",
  background: "#fff",
  color: "#111",
  fontWeight: 900,
  fontSize: "15px",
  cursor: "pointer",
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
  fontWeight: 900,
  fontSize: "15px",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: "all .25s ease",
};

const heroTrustBadgesStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "16px",
  marginTop: "18px",
};

const trustBadgeStyle = {
  padding: "12px 20px",
  borderRadius: "999px",
  background: "rgba(255,255,255,.10)",
  border: "1px solid rgba(255,255,255,.12)",
  backdropFilter: "blur(12px)",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 800,
};