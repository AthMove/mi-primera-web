import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

const pageUrl = "https://athmov.com/about";

export const metadata: Metadata = {
  title: "Sobre ATHMOV | Marketplace deportivo premium",
  description:
    "Conoce ATHMOV, el marketplace especializado en material deportivo premium de segunda mano para pádel, golf, tenis y running.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Sobre ATHMOV | El juego continúa",
    description:
      "Una nueva forma de comprar y vender material deportivo premium de segunda mano.",
    url: pageUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre ATHMOV",
  url: pageUrl,
  description:
    "ATHMOV es un marketplace especializado en material deportivo premium de segunda mano.",
  mainEntity: {
    "@type": "Organization",
    name: "ATHMOV",
    url: "https://athmov.com",
    logo: "https://athmov.com/logo.png",
    description:
      "Marketplace de material deportivo premium de segunda mano para pádel, golf, tenis y running.",
  },
};

export default function AboutPage() {
  return (
   <main style={pageStyle} className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

     <AboutClient />

     
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "150px 40px 90px",
  background: "#f7f5f0",
  color: "#111",
  fontFamily: "Inter, sans-serif",
} as const;

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