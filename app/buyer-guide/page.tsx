"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function BuyerGuidePage() {
  const { t } = useLanguage();
 const sports = [
  {
    name: t.padel,
    title: t.buyerPagePadelTitle,
    intro: t.buyerPageSportIntro,
    theme: "light",
    tips: [
      [
        t.buyerPagePadelTip1Title,
        t.buyerPagePadelTip1Text,
      ],
      [
        t.buyerPagePadelTip2Title,
        t.buyerPagePadelTip2Text,
      ],
      [
        t.buyerPagePadelTip3Title,
        t.buyerPagePadelTip3Text,
      ],
      [
        t.buyerPagePadelTip4Title,
        t.buyerPagePadelTip4Text,
      ],
    ],
    buyerTip: t.buyerPagePadelBuyerTip,
  },
  {
    name: t.tennis,
    title: t.buyerPageTennisTitle,
    intro: t.buyerPageSportIntro,
    theme: "light",
    tips: [
      [
        t.buyerPageTennisTip1Title,
        t.buyerPageTennisTip1Text,
      ],
      [
        t.buyerPageTennisTip2Title,
        t.buyerPageTennisTip2Text,
      ],
      [
        t.buyerPageTennisTip3Title,
        t.buyerPageTennisTip3Text,
      ],
      [
        t.buyerPageTennisTip4Title,
        t.buyerPageTennisTip4Text,
      ],
    ],
    buyerTip: t.buyerPageTennisBuyerTip,
  },
  {
    name: t.golf,
    title: t.buyerPageGolfTitle,
    intro: t.buyerPageSportIntro,
    theme: "dark",
    tips: [
      [
        t.buyerPageGolfTip1Title,
        t.buyerPageGolfTip1Text,
      ],
      [
        t.buyerPageGolfTip2Title,
        t.buyerPageGolfTip2Text,
      ],
      [
        t.buyerPageGolfTip3Title,
        t.buyerPageGolfTip3Text,
      ],
      [
        t.buyerPageGolfTip4Title,
        t.buyerPageGolfTip4Text,
      ],
    ],
    buyerTip: t.buyerPageGolfBuyerTip,
  },
];

  return (
    <main style={pageStyle} className="buyer-guide-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>
  {t.buyerPageEyebrow}
</p>

        <h1 style={titleStyle} className="buyer-guide-title">
  {t.buyerPageTitle1}
  <br />
  {t.buyerPageTitle2}{" "}
  <em style={mutedItalicStyle}>
    {t.buyerPageTitle3}
  </em>
</h1>

      <p style={heroTextStyle}>
  {t.buyerPageHeroText}
</p>

      <div style={chipsStyle}>
  <span style={chipStyle}>{t.padel}</span>
  <span style={chipStyle}>{t.tennis}</span>
  <span style={chipStyle}>{t.golf}</span>
  <span style={betaChipStyle}>
    {t.buyerPageBetaGuide}
  </span>
</div>
      </section>

      {sports.map((sport) => {
        const isDark = sport.theme === "dark";

        return (
          <section
            key={sport.name}
            style={{
              ...sportSectionStyle,
              ...(isDark ? darkSectionStyle : lightSectionStyle),
            }}
          >
            <p style={isDark ? eyebrowLightStyle : eyebrowStyle}>
              {sport.name}
            </p>

            <h2
              style={{
                ...sectionTitleStyle,
                color: isDark ? "#fff" : "#111",
              }}
            >
              {sport.title}
            </h2>

            <p
              style={{
                ...sectionIntroStyle,
                color: isDark ? "rgba(255,255,255,0.55)" : "#666",
              }}
            >
              {sport.intro}
            </p>

            <div style={cardsStyle}>
              {sport.tips.map(([tipTitle, text], index) => (
                <article
                  key={tipTitle}
                  style={{
                    ...cardStyle,
                    ...(isDark ? darkCardStyle : {}),
                  }}
                >
                  <span
                    style={{
                      ...numberStyle,
                      color: isDark
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(0,0,0,0.16)",
                    }}
                  >
                    {index + 1}
                  </span>

                  <h3
                    style={{
                      ...cardTitleStyle,
                      color: isDark ? "#fff" : "#111",
                    }}
                  >
                    {tipTitle}
                  </h3>

                  <p
                    style={{
                      ...cardTextStyle,
                      color: isDark ? "rgba(255,255,255,0.48)" : "#666",
                    }}
                  >
                    {text}
                  </p>
                </article>
              ))}
            </div>

            <div
              style={{
                ...tipBarStyle,
                ...(isDark ? darkTipBarStyle : {}),
              }}
            >
              <span>💡</span>
              <span>{sport.buyerTip}</span>
            </div>
          </section>
        );
      })}

      <section style={checklistStyle}>
       <p style={eyebrowLightStyle}>
  {t.buyerPageChecklistEyebrow}
</p>

        <h2 style={checklistTitleStyle}>
  {t.buyerPageChecklistTitle}
</h2>

        <p style={checklistTextStyle}>
  {t.buyerPageChecklistText}
</p>

       <div style={rulesStyle}>
  <div style={ruleStyle}>
    <span style={ruleIconStyle}>🔍</span>

    <div>
      <strong>{t.buyerPageRule1Title}</strong>
      <p>{t.buyerPageRule1Text}</p>
    </div>
  </div>

  <div style={ruleStyle}>
    <span style={ruleIconStyle}>📋</span>

    <div>
      <strong>{t.buyerPageRule2Title}</strong>
      <p>{t.buyerPageRule2Text}</p>
    </div>
  </div>

  <div style={ruleStyle}>
    <span style={ruleIconStyle}>🧾</span>

    <div>
      <strong>{t.buyerPageRule3Title}</strong>
      <p>{t.buyerPageRule3Text}</p>
    </div>
  </div>
</div>

<p style={betaTextStyle}>
  {t.buyerPageBetaText}
</p>

     <div style={buttonsStyle}>
  <Link href="/products" style={primaryButtonStyle}>
    {t.exploreAthmov}
  </Link>

  <Link href="/how-it-works" style={secondaryButtonStyle}>
    {t.howItWorks}
  </Link>
</div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .buyer-guide-page {
            padding: 120px 18px 40px !important;
          }

          .buyer-guide-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
  color: "#111",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
  textTransform: "uppercase" as const,
};

const eyebrowLightStyle = {
  ...eyebrowStyle,
  color: "rgba(255,255,255,0.55)",
  opacity: 1,
};

const titleStyle = {
  fontSize: "82px",
  lineHeight: 0.95,
  letterSpacing: "-5px",
  margin: 0,
};

const mutedItalicStyle = {
  fontStyle: "italic",
  opacity: 0.35,
};

const heroTextStyle = {
  maxWidth: "620px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "28px",
};

const chipsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "32px",
};

const chipStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1px",
};

const betaChipStyle = {
  ...chipStyle,
  background: "#111",
  color: "#fff",
};

const sportSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 70px",
  borderRadius: "44px",
  padding: "46px",
};

const lightSectionStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.04)",
};

const darkSectionStyle = {
  background: "#111",
  color: "#fff",
};

const sectionTitleStyle = {
  fontSize: "52px",
  lineHeight: 1,
  letterSpacing: "-3px",
  margin: 0,
};

const sectionIntroStyle = {
  marginTop: "14px",
  marginBottom: "28px",
  fontSize: "16px",
};

const cardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "rgba(0,0,0,0.025)",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: "26px",
  padding: "24px",
};

const darkCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const numberStyle = {
  fontSize: "34px",
  fontWeight: 900,
};

const cardTitleStyle = {
  fontSize: "20px",
  marginTop: "18px",
  marginBottom: "10px",
};

const cardTextStyle = {
  lineHeight: 1.7,
  fontSize: "14px",
};

const tipBarStyle = {
  marginTop: "22px",
  borderRadius: "22px",
  padding: "18px",
  background: "rgba(0,0,0,0.03)",
  border: "1px solid rgba(0,0,0,0.07)",
  display: "flex",
  gap: "12px",
  color: "#555",
  lineHeight: 1.6,
};

const darkTipBarStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.55)",
};

const checklistStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const checklistTitleStyle = {
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
  margin: 0,
};

const checklistTextStyle = {
  color: "rgba(255,255,255,0.62)",
  fontSize: "17px",
  lineHeight: 1.7,
  maxWidth: "620px",
  marginTop: "18px",
};

const rulesStyle = {
  display: "grid",
  gap: "14px",
  marginTop: "32px",
};

const ruleStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  padding: "18px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const ruleIconStyle = {
  fontSize: "24px",
};

const betaTextStyle = {
  color: "rgba(255,255,255,0.42)",
  lineHeight: 1.7,
  marginTop: "28px",
};

const buttonsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
  marginTop: "30px",
};

const primaryButtonStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryButtonStyle = {
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};