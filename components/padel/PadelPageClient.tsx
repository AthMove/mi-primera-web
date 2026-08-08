"use client";

import Link from "next/link";
import { Suspense } from "react";
import ProductsClient from "@/app/products/ProductsClient";
import ProductsLoading from "@/components/ProductsLoading";
import { useLanguage } from "@/components/LanguageProvider";

export default function PadelPageClient() {
  const { t } = useLanguage();

  const popularBrands = [
    {
      name: "Bullpadel",
      href: "/brands/bullpadel",
      text: t.padelBullpadelText,
    },
    {
      name: "Nox",
      href: "/brands/nox",
      text: t.padelNoxText,
    },
    {
      name: "Adidas",
      href: "/brands/adidas",
      text: t.padelAdidasText,
    },
    {
      name: "Head",
      href: "/brands/head",
      text: t.padelHeadText,
    },
    {
      name: "Siux",
      href: "/brands/siux",
      text: t.padelSiuxText,
    },
    {
      name: "Babolat",
      href: "/brands/babolat",
      text: t.padelBabolatText,
    },
  ];

  const buyingTips = [
    {
      number: "01",
      title: t.padelTipFrameTitle,
      text: t.padelTipFrameText,
    },
    {
      number: "02",
      title: t.padelTipFacesTitle,
      text: t.padelTipFacesText,
    },
    {
      number: "03",
      title: t.padelTipWeightTitle,
      text: t.padelTipWeightText,
    },
    {
      number: "04",
      title: t.padelTipModelTitle,
      text: t.padelTipModelText,
    },
  ];

  const faqItems = [
    {
      question: t.padelFaqSafeQuestion,
      answer: t.padelFaqSafeAnswer,
    },
    {
      question: t.padelFaqBrandsQuestion,
      answer: t.padelFaqBrandsAnswer,
    },
    {
      question: t.padelFaqWearQuestion,
      answer: t.padelFaqWearAnswer,
    },
    {
      question: t.padelFaqSellQuestion,
      answer: t.padelFaqSellAnswer,
    },
  ];

  const relatedGuides = [
    {
      title:
        "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",
      href: "/blog/bullpadel-vertex-04-segunda-mano",
    },
    {
      title: "Cómo detectar una pala de pádel falsa",
      href: "/blog/como-detectar-pala-padel-falsa",
    },
    {
      title: "Cómo valorar una pala de pádel de segunda mano",
      href: "/blog/como-valorar-pala-padel-segunda-mano",
    },
  ];

  return (
    <>
      <section className="padel-hero">
        <nav className="padel-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t.home}</Link>
          <span>›</span>
          <span>{t.padel}</span>
        </nav>

        <p className="padel-eyebrow">{t.padelPageEyebrow}</p>

        <h1>{t.padelPageTitle}</h1>

        <p className="padel-intro">{t.padelPageIntro}</p>

        <div className="padel-actions">
          <Link
            href="/products?category=PADEL"
            className="padel-primary-button"
          >
            {t.padelViewAllRackets}
          </Link>

          <Link href="/sell" className="padel-secondary-button">
            {t.padelSellRacket}
          </Link>
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">{t.padelWhyUsedEyebrow}</p>
          <h2>{t.padelWhyUsedTitle}</h2>
        </div>

        <div className="padel-text-grid">
          <p>{t.padelWhyUsedTextOne}</p>
          <p>{t.padelWhyUsedTextTwo}</p>
          <p>{t.padelWhyUsedTextThree}</p>
        </div>
      </section>

      <section className="padel-products-section">
        <div className="padel-catalog-heading">
          <div>
            <p className="padel-eyebrow">
              {t.padelMarketplaceEyebrow}
            </p>

            <h2>{t.padelAvailableTitle}</h2>
          </div>

          <Link
            href="/products?category=PADEL"
            className="padel-text-link"
          >
            {t.padelViewFullCatalog} →
          </Link>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <ProductsClient fixedCategory="PADEL" />
        </Suspense>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">
            {t.padelPopularBrandsEyebrow}
          </p>

          <h2>{t.padelPopularBrandsTitle}</h2>
        </div>

        <div className="padel-brands-grid">
          {popularBrands.map((brand) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="padel-brand-card"
            >
              <span>{t.padelBrandLabel}</span>

              <h3>{brand.name}</h3>

              <p>{brand.text}</p>

              <strong>{t.padelViewProducts} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">
            {t.padelBuyingGuideEyebrow}
          </p>

          <h2>{t.padelBuyingGuideTitle}</h2>
        </div>

        <div className="padel-tips-grid">
          {buyingTips.map((tip) => (
            <article key={tip.number} className="padel-tip-card">
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>

        <div className="padel-guide-action">
          <Link href="/buyer-guide">
            {t.padelViewBuyerGuide} →
          </Link>
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">
            {t.padelJournalEyebrow}
          </p>

          <h2>{t.padelJournalTitle}</h2>
        </div>

        <div className="padel-guides-grid">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="padel-guide-card"
            >
              <span>{t.padelGuideLabel}</span>
              <h3>{guide.title}</h3>
              <strong>{t.padelReadArticle} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="padel-content-section">
        <div className="padel-section-heading">
          <p className="padel-eyebrow">
            {t.padelFaqEyebrow}
          </p>

          <h2>{t.padelFaqTitle}</h2>
        </div>

        <div className="padel-faq-list">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="padel-faq-item"
            >
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="padel-final-cta">
        <p className="padel-eyebrow">
          {t.padelFinalEyebrow}
        </p>

        <h2>{t.padelFinalTitle}</h2>

        <p>{t.padelFinalText}</p>

        <div className="padel-actions">
          <Link
            href="/products?category=PADEL"
            className="padel-cta-primary"
          >
            {t.padelExplore}
          </Link>

          <Link
            href="/sell"
            className="padel-cta-secondary"
          >
            {t.padelPublishRacket}
          </Link>
        </div>
      </section>
         <style>{`
        .padel-page {
          min-height: 100vh;
          padding: 140px 40px 90px;
          background: #f7f5f0;
          color: #111;
        }

        .padel-hero,
        .padel-content-section,
        .padel-products-section,
        .padel-final-cta {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .padel-hero {
          margin-bottom: 90px;
        }

        .padel-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 34px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .padel-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .padel-eyebrow {
          margin: 0 0 15px;
          color: #a58d5a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .padel-hero h1 {
          max-width: 980px;
          margin: 0;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 600;
          line-height: 0.97;
          letter-spacing: -5px;
        }

        .padel-intro {
          max-width: 750px;
          margin: 28px 0 0;
          color: #666;
          font-size: 19px;
          line-height: 1.8;
        }

        .padel-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .padel-primary-button,
        .padel-secondary-button,
        .padel-cta-primary,
        .padel-cta-secondary {
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

        .padel-primary-button,
        .padel-cta-primary {
          background: #111;
          color: #fff;
        }

        .padel-secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.13);
          background: #fff;
          color: #111;
        }

        .padel-content-section,
        .padel-products-section {
          margin-bottom: 92px;
        }

        .padel-section-heading {
          margin-bottom: 30px;
        }

        .padel-section-heading h2,
        .padel-catalog-heading h2,
        .padel-final-cta h2 {
          max-width: 820px;
          margin: 0;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2.5px;
        }

        .padel-text-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.68);
        }

        .padel-text-grid p {
          margin: 0;
          color: #626262;
          line-height: 1.85;
        }

        .padel-catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 28px;
        }

        .padel-text-link {
          padding-bottom: 4px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .padel-loading {
          padding: 44px;
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .padel-brands-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .padel-brand-card,
        .padel-guide-card {
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

        .padel-brand-card > span,
        .padel-guide-card > span {
          color: #a58d5a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .padel-brand-card h3,
        .padel-guide-card h3 {
          margin: 20px 0 12px;
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .padel-brand-card p {
          margin: 0;
          color: #666;
          line-height: 1.7;
        }

        .padel-brand-card strong,
        .padel-guide-card strong {
          margin-top: auto;
          padding-top: 28px;
          font-size: 12px;
        }

        .padel-tips-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .padel-tip-card {
          min-height: 230px;
          padding: 26px;
          border-radius: 27px;
          background: #111;
          color: #fff;
        }

        .padel-tip-card > span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .padel-tip-card h3 {
          margin: 42px 0 12px;
          font-size: 22px;
        }

        .padel-tip-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
        }

        .padel-guide-action {
          margin-top: 24px;
        }

        .padel-guide-action a {
          color: #111;
          font-weight: 900;
          text-decoration: none;
        }

        .padel-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .padel-faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .padel-faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .padel-faq-item summary {
          position: relative;
          padding: 25px 45px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
        }

        .padel-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .padel-faq-item summary::after {
          position: absolute;
          top: 22px;
          right: 4px;
          content: "+";
          color: #a58d5a;
          font-size: 27px;
        }

        .padel-faq-item[open] summary::after {
          content: "−";
        }

        .padel-faq-item p {
          max-width: 840px;
          margin: 0;
          padding: 0 0 28px;
          color: #666;
          line-height: 1.8;
        }

        .padel-final-cta {
          padding: 58px;
          border-radius: 40px;
          background: #111;
          color: #fff;
          text-align: center;
        }

        .padel-final-cta h2 {
          margin-left: auto;
          margin-right: auto;
        }

        .padel-final-cta > p:not(.padel-eyebrow) {
          max-width: 620px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .padel-final-cta .padel-actions {
          justify-content: center;
        }

        .padel-final-cta .padel-cta-primary {
          background: #fff;
          color: #111;
        }

        .padel-final-cta .padel-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        @media (max-width: 980px) {
          .padel-text-grid {
            grid-template-columns: 1fr;
          }

          .padel-brands-grid,
          .padel-guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .padel-tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .padel-page {
            padding: 115px 20px 65px;
          }

          .padel-hero h1 {
            letter-spacing: -3px;
          }

          .padel-catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .padel-brands-grid,
          .padel-guides-grid,
          .padel-tips-grid {
            grid-template-columns: 1fr;
          }

          .padel-text-grid,
          .padel-final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .padel-final-cta {
            text-align: left;
          }

          .padel-final-cta .padel-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .padel-actions {
            flex-direction: column;
          }

          .padel-primary-button,
          .padel-secondary-button,
          .padel-cta-primary,
          .padel-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}