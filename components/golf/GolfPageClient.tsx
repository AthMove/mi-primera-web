"use client";

import Link from "next/link";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";
import ProductsLoading from "@/components/ProductsLoading";
import { useLanguage } from "@/components/LanguageProvider";

export default function GolfPageClient() {
  const { t } = useLanguage();

  const popularBrands = [
    {
      name: "TaylorMade",
      href: "/brands/taylormade",
      text: t.golfPageTaylorMadeText,
    },
    {
      name: "Callaway",
      href: "/brands/callaway",
      text: t.golfPageCallawayText,
    },
    {
      name: "Titleist",
      href: "/brands/titleist",
      text: t.golfPageTitleistText,
    },
    {
      name: "Ping",
      href: "/brands/ping",
      text: t.golfPagePingText,
    },
    {
      name: "Mizuno",
      href: "/brands/mizuno",
      text: t.golfPageMizunoText,
    },
    {
      name: "Cobra",
      href: "/brands/cobra",
      text: t.golfPageCobraText,
    },
  ];

  const buyingTips = [
    {
      number: "01",
      title: t.golfPageTipHeadTitle,
      text: t.golfPageTipHeadText,
    },
    {
      number: "02",
      title: t.golfPageTipShaftTitle,
      text: t.golfPageTipShaftText,
    },
    {
      number: "03",
      title: t.golfPageTipMeasurementsTitle,
      text: t.golfPageTipMeasurementsText,
    },
    {
      number: "04",
      title: t.golfPageTipAuthenticityTitle,
      text: t.golfPageTipAuthenticityText,
    },
  ];

  const faqItems = [
    {
      question: t.golfPageFaqQuestion1,
      answer: t.golfPageFaqAnswer1,
    },
    {
      question: t.golfPageFaqQuestion2,
      answer: t.golfPageFaqAnswer2,
    },
    {
      question: t.golfPageFaqQuestion3,
      answer: t.golfPageFaqAnswer3,
    },
    {
      question: t.golfPageFaqQuestion4,
      answer: t.golfPageFaqAnswer4,
    },
  ];

  const relatedGuides = [
    {
      title: "Cómo verificar unos palos de golf originales",
      href: "/blog/verificar-palos-golf",
    },
    {
      title: "Cómo calcular el precio de palos de golf de segunda mano",
      href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
    },
    {
      title: "Cuándo comprar y vender palos de golf de segunda mano",
      href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    },
    {
      title: "Qué revisar antes de comprar un driver de segunda mano",
      href: "/blog/que-revisar-driver-golf-segunda-mano",
    },
    {
      title: "Qué revisar antes de comprar unos hierros usados",
      href: "/blog/que-revisar-hierros-golf-segunda-mano",
    },
    {
      title: "Los mejores campos de golf de España",
      href: "/blog/mejores-campos-golf-espana",
    },
  ];

  return (
    <>
      <section className="golf-hero">
        <nav className="golf-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t.home}</Link>
          <span>›</span>
          <span>{t.golf}</span>
        </nav>

        <p className="golf-eyebrow">{t.golfPageEyebrow}</p>

        <h1>{t.golfPageTitle}</h1>

        <p className="golf-intro">{t.golfPageIntro}</p>

        <div className="golf-actions">
          <Link
            href="/products?category=GOLF"
            className="golf-primary-button"
          >
            {t.golfPageViewAll}
          </Link>

          <Link href="/sell" className="golf-secondary-button">
            {t.golfPageSellEquipment}
          </Link>
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">
            {t.golfPageWhyUsedEyebrow}
          </p>

          <h2>{t.golfPageWhyUsedTitle}</h2>
        </div>

        <div className="golf-text-grid">
          <p>{t.golfPageWhyUsedTextOne}</p>
          <p>{t.golfPageWhyUsedTextTwo}</p>
          <p>{t.golfPageWhyUsedTextThree}</p>
        </div>
      </section>

      <section className="golf-products-section">
        <div className="golf-catalog-heading">
          <div>
            <p className="golf-eyebrow">
              {t.golfPageMarketplaceEyebrow}
            </p>

            <h2>{t.golfPageAvailableTitle}</h2>
          </div>

          <Link
            href="/products?category=GOLF"
            className="golf-text-link"
          >
            {t.golfPageViewFullCatalog} →
          </Link>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <ProductsClient fixedCategory="GOLF" />
        </Suspense>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">
            {t.golfPagePopularBrandsEyebrow}
          </p>

          <h2>{t.golfPagePopularBrandsTitle}</h2>
        </div>

        <div className="golf-brands-grid">
          {popularBrands.map((brand) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="golf-brand-card"
            >
              <span>{t.golfPageBrandLabel}</span>

              <h3>{brand.name}</h3>

              <p>{brand.text}</p>

              <strong>{t.golfPageViewProducts} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">
            {t.golfPageBuyingGuideEyebrow}
          </p>

          <h2>{t.golfPageBuyingGuideTitle}</h2>
        </div>

        <div className="golf-tips-grid">
          {buyingTips.map((tip) => (
            <article
              key={tip.number}
              className="golf-tip-card"
            >
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>

        <div className="golf-guide-action">
          <Link href="/buyer-guide">
            {t.golfPageViewBuyerGuide} →
          </Link>
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">
            {t.golfPageJournalEyebrow}
          </p>

          <h2>{t.golfPageJournalTitle}</h2>
        </div>

        <div className="golf-guides-grid">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="golf-guide-card"
            >
              <span>{t.golfPageGuideLabel}</span>
              <h3>{guide.title}</h3>
              <strong>{t.golfPageReadArticle} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="golf-content-section">
        <div className="golf-section-heading">
          <p className="golf-eyebrow">
            {t.golfPageFaqEyebrow}
          </p>

          <h2>{t.golfPageFaqTitle}</h2>
        </div>

        <div className="golf-faq-list">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="golf-faq-item"
            >
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="golf-final-cta">
        <p className="golf-eyebrow">
          THE GAME CONTINUES
        </p>

        <h2>{t.golfPageFinalTitle}</h2>

        <p>{t.golfPageFinalText}</p>

        <div className="golf-actions">
          <Link
            href="/products?category=GOLF"
            className="golf-cta-primary"
          >
            {t.golfPageExplore}
          </Link>

          <Link
            href="/sell"
            className="golf-cta-secondary"
          >
            {t.golfPagePublishEquipment}
          </Link>
        </div>
      </section>
       <style>{`
        .golf-page {
          min-height: 100vh;
          padding: 140px 40px 90px;
          background: #f7f5f0;
          color: #111;
        }

        .golf-hero,
        .golf-content-section,
        .golf-products-section,
        .golf-final-cta {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .golf-hero {
          margin-bottom: 90px;
        }

        .golf-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 34px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .golf-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .golf-eyebrow {
          margin: 0 0 15px;
          color: #a58d5a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .golf-hero h1 {
          max-width: 980px;
          margin: 0;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 600;
          line-height: 0.97;
          letter-spacing: -5px;
        }

        .golf-intro {
          max-width: 770px;
          margin: 28px 0 0;
          color: #666;
          font-size: 19px;
          line-height: 1.8;
        }

        .golf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .golf-primary-button,
        .golf-secondary-button,
        .golf-cta-primary,
        .golf-cta-secondary {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .golf-primary-button,
        .golf-cta-primary {
          background: #111;
          color: #fff;
        }

        .golf-secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.13);
          background: #fff;
          color: #111;
        }

        .golf-content-section,
        .golf-products-section {
          margin-bottom: 92px;
        }

        .golf-section-heading {
          margin-bottom: 30px;
        }

        .golf-section-heading h2,
        .golf-catalog-heading h2,
        .golf-final-cta h2 {
          max-width: 840px;
          margin: 0;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2.5px;
        }

        .golf-text-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.68);
        }

        .golf-text-grid p {
          margin: 0;
          color: #626262;
          line-height: 1.85;
        }

        .golf-catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 28px;
        }

        .golf-text-link {
          padding-bottom: 4px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .golf-loading {
          padding: 44px;
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .golf-brands-grid,
        .golf-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .golf-brand-card,
        .golf-guide-card {
          display: flex;
          min-height: 245px;
          flex-direction: column;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
        }

        .golf-brand-card > span,
        .golf-guide-card > span {
          color: #a58d5a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .golf-brand-card h3,
        .golf-guide-card h3 {
          margin: 20px 0 12px;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .golf-brand-card p {
          margin: 0;
          color: #666;
          line-height: 1.7;
        }

        .golf-brand-card strong,
        .golf-guide-card strong {
          margin-top: auto;
          padding-top: 28px;
          font-size: 12px;
        }

        .golf-tips-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .golf-tip-card {
          min-height: 230px;
          padding: 26px;
          border-radius: 27px;
          background: #111;
          color: #fff;
        }

        .golf-tip-card > span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .golf-tip-card h3 {
          margin: 42px 0 12px;
          font-size: 22px;
        }

        .golf-tip-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
        }

        .golf-guide-action {
          margin-top: 24px;
        }

        .golf-guide-action a {
          color: #111;
          font-weight: 900;
          text-decoration: none;
        }

        .golf-faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .golf-faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .golf-faq-item summary {
          position: relative;
          padding: 25px 45px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
        }

        .golf-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .golf-faq-item summary::after {
          position: absolute;
          top: 22px;
          right: 4px;
          content: "+";
          color: #a58d5a;
          font-size: 27px;
        }

        .golf-faq-item[open] summary::after {
          content: "−";
        }

        .golf-faq-item p {
          max-width: 840px;
          margin: 0;
          padding: 0 0 28px;
          color: #666;
          line-height: 1.8;
        }

        .golf-final-cta {
          padding: 58px;
          border-radius: 40px;
          background: #111;
          color: #fff;
          text-align: center;
        }

        .golf-final-cta h2 {
          margin-left: auto;
          margin-right: auto;
        }

        .golf-final-cta > p:not(.golf-eyebrow) {
          max-width: 620px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .golf-final-cta .golf-actions {
          justify-content: center;
        }

        .golf-final-cta .golf-cta-primary {
          background: #fff;
          color: #111;
        }

        .golf-final-cta .golf-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        @media (max-width: 980px) {
          .golf-text-grid {
            grid-template-columns: 1fr;
          }

          .golf-brands-grid,
          .golf-guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .golf-tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .golf-page {
            padding: 115px 20px 65px;
          }

          .golf-hero h1 {
            letter-spacing: -3px;
          }

          .golf-catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .golf-brands-grid,
          .golf-guides-grid,
          .golf-tips-grid {
            grid-template-columns: 1fr;
          }

          .golf-text-grid,
          .golf-final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .golf-final-cta {
            text-align: left;
          }

          .golf-final-cta .golf-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .golf-actions {
            flex-direction: column;
          }

          .golf-primary-button,
          .golf-secondary-button,
          .golf-cta-primary,
          .golf-cta-secondary {
            width: 100%;
          }
        }
      `}</style>

    </>
  );
}