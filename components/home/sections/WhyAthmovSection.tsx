"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { CSSProperties } from "react";

const darkSectionStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "72px 64px",
  borderRadius: "40px",
 background:
  "linear-gradient(135deg, #151515 0%, #080808 55%, #111111 100%)",

color: "#ffffff",
  overflow: "hidden",
  position: "relative",
};

const eyebrowLightStyle: CSSProperties = {
  margin: "0 0 20px",
  color: "rgba(255, 255, 255, 0.55)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const darkTitleStyle: CSSProperties = {
  maxWidth: "900px",
  margin: "0 0 56px",
  color: "#ffffff",
  fontSize: "64px",
  fontWeight: 400,
  lineHeight: 1.02,
  letterSpacing: "-0.045em",
};

const trustGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "24px",
};

const trustCardStyle: CSSProperties = {
  padding: "28px 0",
  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
};

const trustTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: 1.25,
  letterSpacing: "-0.025em",
};

const trustTextStyle: CSSProperties = {
  maxWidth: "360px",
  margin: 0,
  color: "rgba(255, 255, 255, 0.6)",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: 1.65,
};

type WhyAthmovSectionProps = {
  isMobile: boolean;
};

export default function WhyAthmovSection({
  isMobile,
}: WhyAthmovSectionProps) {
  const { t } = useLanguage();

  return (
   <section
  className="fade-up"
  data-delay="180"
  style={{
    ...darkSectionStyle,
    margin: isMobile ? "24px 18px" : darkSectionStyle.margin,
    padding: isMobile ? "38px 24px" : darkSectionStyle.padding,
    borderRadius: isMobile ? "30px" : darkSectionStyle.borderRadius,
  }}
>
        <p style={eyebrowLightStyle}>{t.whyAthmov}</p>

<h2
  style={{
    ...darkTitleStyle,
    fontSize: isMobile ? "38px" : darkTitleStyle.fontSize,
    letterSpacing: isMobile ? "-2px" : darkTitleStyle.letterSpacing,
  }}
>
          {t.whyTitle}
        </h2>

       
          <div
  style={{
    ...trustGridStyle,
    gridTemplateColumns: isMobile
      ? "1fr"
      : trustGridStyle.gridTemplateColumns,
    gap: isMobile ? "8px" : trustGridStyle.gap,
  }}
>
  <div style={trustCardStyle}>
            <h3 style={trustTitleStyle}>{t.why1Title}</h3>
            <p style={trustTextStyle}>
              {t.why1Text}
            </p>
          </div>

          <div style={trustCardStyle}>
            <h3 style={trustTitleStyle}>{t.why2Title}</h3>
            <p style={trustTextStyle}>
              {t.why2Text}
            </p>
          </div>

         <div style={trustCardStyle}>
            <h3 style={trustTitleStyle}>{t.why3Title}</h3>
            <p style={trustTextStyle}>
              {t.why3Text}
            </p>
          </div>
        </div>
      </section>
  );
}