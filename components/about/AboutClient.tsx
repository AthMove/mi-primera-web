"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutClient() {
  const { lang, t } = useLanguage();

  const locale =
    lang === "en"
      ? "en-GB"
      : lang === "pt"
        ? "pt-PT"
        : "es-ES";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>{t.aboutEyebrow}</p>

        <h1 style={titleStyle} className="about-title">
          {t.aboutHeroTitleFirst}
          <br />
          {t.aboutHeroTitleSecond}
        </h1>

        <p style={introStyle}>{t.aboutIntro}</p>
      </section>

      <section style={storyGridStyle} className="about-story-grid">
        <article style={darkCardStyle}>
          <p style={cardEyebrowStyle}>{t.aboutIdeaEyebrow}</p>
          <h2 style={darkTitleStyle}>{t.aboutIdeaTitle}</h2>
          <p style={darkTextStyle}>{t.aboutIdeaText}</p>
        </article>

        <article style={lightCardStyle}>
          <p style={cardEyebrowDarkStyle}>{t.aboutMissionEyebrow}</p>
          <h2 style={lightTitleStyle}>{t.aboutMissionTitle}</h2>
          <p style={lightTextStyle}>{t.aboutMissionText}</p>
        </article>
      </section>

      <section style={valuesSectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>{t.aboutWhyEyebrow}</p>
          <h2 style={sectionTitleStyle}>{t.aboutWhyTitle}</h2>
        </div>

        <div style={valuesGridStyle} className="about-values-grid">
          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>01</span>
            <h3 style={valueTitleStyle}>{t.aboutValueSpecializationTitle}</h3>
            <p style={valueTextStyle}>{t.aboutValueSpecializationText}</p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>02</span>
            <h3 style={valueTitleStyle}>{t.aboutValueTrustTitle}</h3>
            <p style={valueTextStyle}>{t.aboutValueTrustText}</p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>03</span>
            <h3 style={valueTitleStyle}>{t.aboutValueQualityTitle}</h3>
            <p style={valueTextStyle}>{t.aboutValueQualityText}</p>
          </article>

          <article style={valueCardStyle}>
            <span style={valueNumberStyle}>04</span>
            <h3 style={valueTitleStyle}>{t.aboutValueSecondLifeTitle}</h3>
            <p style={valueTextStyle}>{t.aboutValueSecondLifeText}</p>
          </article>
        </div>
      </section>

      <section style={sportsSectionStyle}>
        <p style={sectionEyebrowStyle}>{t.aboutSportsEyebrow}</p>

        <div style={sportsGridStyle} className="about-sports-grid">
          <Link href="/products?category=PADEL" style={sportCardStyle}>
            <span>{t.padel.toUpperCase()}</span>
            <strong>{t.aboutExplore} →</strong>
          </Link>

          <Link href="/products?category=GOLF" style={sportCardStyle}>
            <span>{t.golf.toUpperCase()}</span>
            <strong>{t.aboutExplore} →</strong>
          </Link>

          <Link href="/products?category=TENIS" style={sportCardStyle}>
            <span>{t.tennis.toUpperCase()}</span>
            <strong>{t.aboutExplore} →</strong>
          </Link>

          <Link href="/products?category=RUNNING" style={sportCardStyle}>
            <span>{t.running.toUpperCase()}</span>
            <strong>{t.aboutExplore} →</strong>
          </Link>
        </div>
      </section>

      <section style={transparencySectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>{t.aboutBehindEyebrow}</p>
          <h2 style={sectionTitleStyle}>{t.aboutBehindTitle}</h2>
        </div>

        <div style={transparencyGridStyle} className="about-transparency-grid">
          <article style={transparencyCardStyle}>
            <span style={valueNumberStyle}>01</span>
            <h3 style={valueTitleStyle}>{t.aboutProjectTitle}</h3>
            <p style={valueTextStyle}>{t.aboutProjectText}</p>
          </article>

          <article style={transparencyCardStyle}>
            <span style={valueNumberStyle}>02</span>
            <h3 style={valueTitleStyle}>{t.aboutTeamTitle}</h3>
            <p style={valueTextStyle}>{t.aboutTeamText}</p>
          </article>

          <article style={transparencyCardStyle}>
            <span style={valueNumberStyle}>03</span>
            <h3 style={valueTitleStyle}>{t.aboutLocationTitle}</h3>
            <p style={valueTextStyle}>{t.aboutLocationText}</p>
          </article>
        </div>
      </section>

      <section style={independenceSectionStyle} className="about-independence">
        <div>
          <p style={ctaEyebrowStyle}>{t.aboutFundingEyebrow}</p>
          <h2 style={independenceTitleStyle}>{t.aboutIndependentTitle}</h2>
        </div>

        <div style={independenceTextStyle}>
          <p>{t.aboutIndependentTextOne}</p>
          <p>{t.aboutIndependentTextTwo}</p>
        </div>
      </section>

      <section style={businessSectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>{t.aboutBusinessEyebrow}</p>
          <h2 style={sectionTitleStyle}>{t.aboutBusinessTitle}</h2>
          <p style={businessIntroStyle}>{t.aboutBusinessIntro}</p>
        </div>

        <div style={pricingGridStyle} className="about-pricing-grid">
          <article style={pricingCardStyle}>
            <p style={pricingLabelStyle}>{t.aboutPublishingLabel}</p>
            <strong style={pricingPriceStyle}>{formatCurrency(0)}</strong>
            <h3 style={pricingTitleStyle}>{t.aboutPublishingTitle}</h3>
            <p style={pricingTextStyle}>{t.aboutPublishingText}</p>
          </article>

          <article style={featuredPricingCardStyle}>
            <p style={featuredPricingLabelStyle}>{t.aboutCommissionLabel}</p>
            <strong style={featuredPricingPriceStyle}>8 %</strong>
            <h3 style={featuredPricingTitleStyle}>{t.aboutCommissionTitle}</h3>
            <p style={featuredPricingTextStyle}>{t.aboutCommissionText}</p>
          </article>

          <article style={pricingCardStyle}>
            <p style={pricingLabelStyle}>{t.aboutSubscriptionLabel}</p>
            <strong style={pricingPriceStyle}>{formatCurrency(0)}</strong>
            <h3 style={pricingTitleStyle}>{t.aboutSubscriptionTitle}</h3>
            <p style={pricingTextStyle}>{t.aboutSubscriptionText}</p>
          </article>
        </div>
      </section>

      <section style={exampleSectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionEyebrowStyle}>{t.aboutSaleExampleEyebrow}</p>
          <h2 style={sectionTitleStyle}>{t.aboutSaleExampleTitle}</h2>
        </div>

        <div style={calculationCardStyle}>
          <div style={calculationRowStyle}>
            <span>{t.aboutProductPrice}</span>
            <strong>{formatCurrency(200)}</strong>
          </div>

          <div style={calculationRowStyle}>
            <span>{t.aboutAthmovCommission}</span>
            <strong>−{formatCurrency(16)}</strong>
          </div>

          <div style={calculationRowStyle}>
            <span>{t.aboutPaymentProcessing}</span>
            <strong>−{formatCurrency(3.25)}</strong>
          </div>

          <div style={calculationTotalStyle}>
            <span>{t.aboutSellerEstimatedAmount}</span>
            <strong>{formatCurrency(180.75)}</strong>
          </div>
        </div>

        <p style={calculationNoteStyle}>{t.aboutCalculationNote}</p>
      </section>

      <section style={legalSectionStyle} className="about-legal">
        <div>
          <p style={sectionEyebrowStyle}>{t.aboutCorporateEyebrow}</p>
          <h2 style={sectionTitleStyle}>{t.aboutCorporateTitle}</h2>
        </div>

        <div>
          <div style={legalCardStyle}>
            <div style={legalRowStyle}>
              <span style={legalLabelStyle}>{t.aboutTradeName}</span>
              <strong>ATHMOV</strong>
            </div>

            <div style={legalRowStyle}>
              <span style={legalLabelStyle}>{t.aboutActivity}</span>
              <strong>{t.aboutActivityValue}</strong>
            </div>

            <div style={legalRowStyle}>
              <span style={legalLabelStyle}>{t.aboutManagementCountry}</span>
              <strong>{t.aboutSpain}</strong>
            </div>

            <div style={legalLastRowStyle}>
              <span style={legalLabelStyle}>{t.aboutEmail}</span>
              <a href="mailto:contact@athmov.com" style={legalLinkStyle}>
                contact@athmov.com
              </a>
            </div>
          </div>

          <p style={legalNoteStyle}>{t.aboutLegalNote}</p>
        </div>
      </section>

      <section style={ctaStyle} className="about-cta">
        <p style={ctaEyebrowStyle}>THE GAME CONTINUES.</p>

        <h2 style={ctaTitleStyle} className="about-cta-title">
          {t.aboutCtaTitleFirst}
          <br />
          {t.aboutCtaTitleSecond}
        </h2>

        <div style={ctaButtonsStyle} className="about-cta-buttons">
          <Link href="/products" style={primaryButtonStyle}>
            {t.aboutExploreMarketplace}
          </Link>

          <Link href="/sell" style={secondaryButtonStyle}>
            {t.aboutSellEquipment}
          </Link>
        </div>
      </section>
      <style>{`
  .about-value-card,
  .about-sport-card {
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .about-value-card:hover,
  .about-sport-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.09);
  }

  @media (max-width: 850px) {
    .about-transparency-grid,
    .about-pricing-grid {
      grid-template-columns: 1fr !important;
    }

    .about-independence,
    .about-legal {
      grid-template-columns: 1fr !important;
      padding: 30px !important;
    }

    .about-title {
      font-size: 52px !important;
      letter-spacing: -3px !important;
    }

    .about-story-grid,
    .about-values-grid,
    .about-sports-grid {
      grid-template-columns: 1fr !important;
    }

    .about-card {
      padding: 30px !important;
      min-height: auto !important;
    }

    .about-cta {
      padding: 42px 26px !important;
    }

    .about-cta-title {
      font-size: 42px !important;
    }

    .about-cta-buttons {
      flex-direction: column !important;
    }
  }
`}</style>
    </>
  );
}

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
} as const;

const eyebrowStyle = {
  marginBottom: "22px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
  color: "#a58d5a",
} as const;

const titleStyle = {
  margin: 0,
  maxWidth: "1000px",
  fontSize: "82px",
  lineHeight: 0.97,
  letterSpacing: "-5px",
  fontWeight: 600,
} as const;

const introStyle = {
  maxWidth: "760px",
  marginTop: "34px",
  color: "#666",
  fontSize: "19px",
  lineHeight: 1.8,
} as const;

const storyGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
} as const;

const darkCardStyle = {
  minHeight: "430px",
  padding: "44px",
  borderRadius: "36px",
  background: "#111",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
} as const;

const lightCardStyle = {
  minHeight: "430px",
  padding: "44px",
  borderRadius: "36px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
} as const;

const cardEyebrowStyle = {
  marginBottom: "18px",
  color: "#c9b896",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const cardEyebrowDarkStyle = {
  ...cardEyebrowStyle,
  color: "#a58d5a",
} as const;

const darkTitleStyle = {
  margin: 0,
  fontSize: "40px",
  lineHeight: 1.05,
  letterSpacing: "-2px",
} as const;

const lightTitleStyle = {
  ...darkTitleStyle,
  color: "#111",
} as const;

const darkTextStyle = {
  marginTop: "22px",
  color: "rgba(255,255,255,0.65)",
  fontSize: "16px",
  lineHeight: 1.75,
} as const;

const lightTextStyle = {
  ...darkTextStyle,
  color: "#666",
} as const;

const valuesSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const sectionHeaderStyle = {
  marginBottom: "30px",
} as const;

const sectionEyebrowStyle = {
  marginBottom: "10px",
  color: "#a58d5a",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const sectionTitleStyle = {
  margin: 0,
  maxWidth: "700px",
  fontSize: "46px",
  lineHeight: 1.05,
  letterSpacing: "-2.5px",
} as const;

const valuesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "16px",
} as const;

const valueCardStyle = {
  minHeight: "230px",
  padding: "28px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
} as const;

const valueNumberStyle = {
  display: "block",
  marginBottom: "46px",
  color: "#a58d5a",
  fontSize: "12px",
  fontWeight: 900,
} as const;

const valueTitleStyle = {
  margin: "0 0 12px",
  fontSize: "23px",
} as const;

const valueTextStyle = {
  margin: 0,
  color: "#666",
  lineHeight: 1.65,
} as const;

const sportsSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const sportsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "14px",
  marginTop: "20px",
} as const;

const sportCardStyle = {
  minHeight: "130px",
  padding: "25px",
  borderRadius: "26px",
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.07)",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontSize: "14px",
  fontWeight: 900,
  letterSpacing: "1.5px",
} as const;

const transparencySectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const transparencyGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
} as const;

const transparencyCardStyle = {
  minHeight: "260px",
  padding: "30px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.07)",
} as const;

const independenceSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  padding: "55px",
  borderRadius: "38px",
  background: "#111",
  color: "#fff",
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "60px",
} as const;

const independenceTitleStyle = {
  margin: "18px 0 0",
  fontSize: "48px",
  lineHeight: 1.05,
  letterSpacing: "-2.5px",
} as const;

const independenceTextStyle = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "17px",
  lineHeight: 1.8,
} as const;

const businessSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const businessIntroStyle = {
  maxWidth: "720px",
  marginTop: "20px",
  color: "#666",
  lineHeight: 1.8,
} as const;

const pricingGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
} as const;

const pricingCardStyle = {
  minHeight: "310px",
  padding: "30px",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const featuredPricingCardStyle = {
  ...pricingCardStyle,
  background: "#111",
  color: "#fff",
} as const;

const pricingLabelStyle = {
  margin: 0,
  color: "#a58d5a",
  fontSize: "10px",
  fontWeight: 900,
  letterSpacing: "2px",
} as const;

const featuredPricingLabelStyle = {
  ...pricingLabelStyle,
  color: "#c9b896",
} as const;

const pricingPriceStyle = {
  display: "block",
  marginTop: "28px",
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
} as const;

const featuredPricingPriceStyle = {
  ...pricingPriceStyle,
  color: "#fff",
} as const;

const pricingTitleStyle = {
  margin: "28px 0 12px",
  fontSize: "24px",
} as const;

const featuredPricingTitleStyle = {
  ...pricingTitleStyle,
  color: "#fff",
} as const;

const pricingTextStyle = {
  margin: 0,
  color: "#666",
  lineHeight: 1.75,
} as const;

const featuredPricingTextStyle = {
  ...pricingTextStyle,
  color: "rgba(255,255,255,0.65)",
} as const;

const exampleSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
} as const;

const calculationCardStyle = {
  overflow: "hidden",
  borderRadius: "30px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const calculationRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "30px",
  padding: "24px 30px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
} as const;

const calculationTotalStyle = {
  ...calculationRowStyle,
  borderBottom: "none",
  background: "#111",
  color: "#fff",
} as const;

const calculationNoteStyle = {
  maxWidth: "850px",
  margin: "20px 0 0",
  color: "#777",
  fontSize: "13px",
  lineHeight: 1.75,
} as const;

const legalSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 100px",
  display: "grid",
  gridTemplateColumns: "0.8fr 1.2fr",
  gap: "55px",
} as const;

const legalCardStyle = {
  overflow: "hidden",
  borderRadius: "28px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
} as const;

const legalRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "25px",
  padding: "22px 26px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
} as const;

const legalLastRowStyle = {
  ...legalRowStyle,
  borderBottom: "none",
} as const;

const legalLabelStyle = {
  color: "#777",
  fontSize: "13px",
} as const;

const legalLinkStyle = {
  color: "#111",
  fontSize: "14px",
  fontWeight: 800,
  textDecoration: "none",
} as const;

const legalNoteStyle = {
  maxWidth: "850px",
  margin: "20px 0 0",
  color: "#777",
  fontSize: "13px",
  lineHeight: 1.75,
} as const;

const ctaStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "65px",
  borderRadius: "40px",
  background: "#111",
  color: "#fff",
} as const;

const ctaEyebrowStyle = {
  color: "#c9b896",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "3px",
} as const;

const ctaTitleStyle = {
  maxWidth: "850px",
  margin: "22px 0 36px",
  fontSize: "58px",
  lineHeight: 1,
  letterSpacing: "-3px",
} as const;

const ctaButtonsStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
} as const;

const primaryButtonStyle = {
  padding: "16px 24px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1.4px",
} as const;

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
} as const;