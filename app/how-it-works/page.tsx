"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const flowItems = [
  t.howPageFlowPublish,
  t.howPageFlowVerify,
  t.howPageFlowShipping,
  t.howPageFlowConfirm,
];

const sellerSteps = [
  [
    t.howPageSellerStep1Title,
    t.howPageSellerStep1Text,
  ],
  [
    t.howPageSellerStep2Title,
    t.howPageSellerStep2Text,
  ],
  [
    t.howPageSellerStep3Title,
    t.howPageSellerStep3Text,
  ],
  [
    t.howPageSellerStep4Title,
    t.howPageSellerStep4Text,
  ],
];

const verificationLevels = [
  [
    "01",
    t.howPageLevel1Title,
    t.howPageLevel1Badge,
    t.howPageLevel1Text,
  ],
  [
    "02",
    t.howPageLevel2Title,
    t.howPageLevel2Badge,
    t.howPageLevel2Text,
  ],
  [
    "03",
    t.howPageLevel3Title,
    t.howPageLevel3Badge,
    t.howPageLevel3Text,
  ],
];

const buyerSteps = [
  [
    t.howPageBuyerStep1Title,
    t.howPageBuyerStep1Text,
  ],
  [
    t.howPageBuyerStep2Title,
    t.howPageBuyerStep2Text,
  ],
  [
    t.howPageBuyerStep3Title,
    t.howPageBuyerStep3Text,
  ],
  [
    t.howPageBuyerStep4Title,
    t.howPageBuyerStep4Text,
  ],
];
  return (
    <main style={pageStyle} className="how-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>
  {t.howPageEyebrow}
</p>

       <h1 style={titleStyle}>
  {t.howPageTitle1}
  <br />
  {t.howPageTitle2}
  <br />
  <em style={mutedItalicStyle}>
    {t.howPageTitle3}
  </em>
</h1>

<p style={textStyle}>
  {t.howPageHeroText}
</p>

        <div style={flowStyle}>
          {flowItems.map(
            (item, index) => (
              <div key={item} style={flowItemStyle}>
                <span style={flowNumberStyle}>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            )
          )}
        </div>
      </section>

    <section style={sectionStyle}>
  <p style={eyebrowStyle}>
    {t.howPageSellerEyebrow}
  </p>

  <h2 style={sectionTitleStyle}>
    {t.howPageSellerTitle}
  </h2>

  <div style={cardsStyle}>
    {sellerSteps.map(([title, text], index) => (
      <article key={title} style={cardStyle}>
        <span style={cardNumberStyle}>
          {index + 1}
        </span>

        <h3 style={cardTitleStyle}>
          {title}
        </h3>

        <p style={cardTextStyle}>
          {text}
        </p>
      </article>
    ))}
  </div>
</section>

<section style={darkSectionStyle}>
  <p style={eyebrowLightStyle}>
    {t.howPageVerificationEyebrow}
  </p>

  <h2 style={darkTitleStyle}>
    {t.howPageVerificationTitle1}
    <br />
    {t.howPageVerificationTitle2}
  </h2>

  <div style={levelsStyle}>
    {verificationLevels.map(
      ([num, title, badge, text]) => (
        <article
          key={num}
          style={levelCardStyle}
        >
          <div style={levelTopStyle}>
            <span style={levelNumberStyle}>
              {num}
            </span>

            <div>
              <h3 style={levelTitleStyle}>
                {title}
              </h3>

              <span style={levelBadgeStyle}>
                {badge}
              </span>
            </div>
          </div>

          <p style={levelTextStyle}>
            {text}
          </p>
        </article>
      )
    )}
  </div>
</section>

<section style={sectionStyle}>
  <p style={eyebrowStyle}>
    {t.howPageBuyerEyebrow}
  </p>

  <h2 style={sectionTitleStyle}>
    {t.howPageBuyerTitle}
  </h2>

  <div style={cardsStyle}>
    {buyerSteps.map(([title, text], index) => (
      <article key={title} style={cardStyle}>
        <span style={cardNumberStyle}>
          {index + 1}
        </span>

        <h3 style={cardTitleStyle}>
          {title}
        </h3>

        <p style={cardTextStyle}>
          {text}
        </p>
      </article>
    ))}
  </div>
</section>

<section style={ctaStyle}>
  <p style={eyebrowLightStyle}>
    {t.howPageCtaEyebrow}
  </p>

  <h2 style={ctaTitleStyle}>
    {t.howPageCtaTitle}
  </h2>

  <div style={ctaButtonsStyle}>
    <a
      href="/products"
      style={primaryButtonStyle}
    >
      {t.howPageBuyGear}
    </a>

    <a
      href="/sell"
      style={secondaryDarkButtonStyle}
    >
      {t.howPageSellGear}
    </a>
  </div>
</section>
      <style>{`
        @media (max-width: 800px) {
          .how-page {
            padding: 120px 18px 40px !important;
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

const textStyle = {
  maxWidth: "620px",
  color: "#555",
  fontSize: "18px",
  lineHeight: 1.7,
  marginTop: "28px",
};

const flowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "14px",
  marginTop: "42px",
};

const flowItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "24px",
  padding: "22px",
};

const flowNumberStyle = {
  display: "block",
  fontSize: "11px",
  opacity: 0.4,
  marginBottom: "10px",
  fontWeight: 900,
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const sectionTitleStyle = {
  fontSize: "52px",
  letterSpacing: "-3px",
  marginTop: 0,
};

const cardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const cardNumberStyle = {
  fontSize: "32px",
  opacity: 0.15,
  fontWeight: 900,
};

const cardTitleStyle = {
  fontSize: "22px",
  marginTop: "18px",
};

const cardTextStyle = {
  color: "#666",
  lineHeight: 1.7,
};

const darkSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "54px",
};

const eyebrowLightStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
};

const darkTitleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  letterSpacing: "-3px",
  marginTop: 0,
};

const levelsStyle = {
  display: "grid",
  gap: "18px",
  marginTop: "34px",
};

const levelCardStyle = {
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "28px",
  padding: "26px",
  background: "rgba(255,255,255,0.04)",
};

const levelTopStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "flex-start",
};

const levelNumberStyle = {
  fontSize: "34px",
  opacity: 0.18,
  fontWeight: 900,
};

const levelTitleStyle = {
  margin: 0,
  fontSize: "24px",
};

const levelBadgeStyle = {
  display: "inline-block",
  marginTop: "8px",
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const levelTextStyle = {
  color: "rgba(255,255,255,0.62)",
  lineHeight: 1.7,
  marginTop: "18px",
};

const ctaStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#111",
  color: "#fff",
  borderRadius: "44px",
  padding: "56px",
  textAlign: "center" as const,
};

const ctaTitleStyle = {
  maxWidth: "780px",
  margin: "0 auto",
  fontSize: "46px",
  lineHeight: 1.05,
  letterSpacing: "-2px",
};

const ctaButtonsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap" as const,
  marginTop: "34px",
};

const primaryButtonStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryDarkButtonStyle = {
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "999px",
  padding: "16px 24px",
  textDecoration: "none",
  fontWeight: 900,
};