"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import BrandProductsClient from "@/app/brands/BrandProductsClient";

interface BrandConfig {
  name: string;
  description: string;
  categoryLabel: string;
  categoryHref: string;
  categoryBrandHref: string;
  intro: string[];
  models: string[];
  buyingTips: string[];
  relatedGuides: {
    title: string;
    href: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

type Props = {
  brand: BrandConfig;
  availableModels: string[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BrandPageClient({
  brand,
  availableModels,
}: Props) {
  const { t } = useLanguage();

  return (
    <>
      <section className="brand-hero">
        <nav className="breadcrumb" aria-label={t.brandBreadcrumbLabel}>
          <Link href="/">{t.home}</Link>
          <span>›</span>
          <Link href="/brands">{t.brands}</Link>
          <span>›</span>
          <span>{brand.name}</span>
        </nav>

        <p className="eyebrow">{t.brandPageEyebrow}</p>

        <h1>
          {brand.name} {t.brandSecondHand}
        </h1>

        <p className="hero-description">{brand.description}</p>

        <div className="hero-actions">
          <Link
            href={brand.categoryBrandHref}
            className="primary-button"
          >
            {t.brandViewProducts} {brand.name}
          </Link>

          <Link href="/sell" className="secondary-button">
            {t.brandSellEquipment}
          </Link>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-heading">
          <p className="eyebrow">{t.brandGuideEyebrow}</p>

          <h2>
            {t.brandBuySecondHand} {brand.name}
          </h2>
        </div>

        <div className="intro-grid">
          {brand.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">{t.brandAvailableProducts}</p>

            <h2>
              {brand.name} {t.brandPublishedOnAthmov}
            </h2>
          </div>

          <Link href={brand.categoryHref} className="text-link">
            {t.brandViewAllCategory} {brand.categoryLabel} →
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="loading-box">
              {t.brandLoadingProducts} {brand.name}...
            </div>
          }
        >
          <BrandProductsClient brand={brand.name} />
        </Suspense>
      </section>

      {availableModels.length > 0 && (
        <section className="models-section">
          <div className="section-heading">
            <p className="eyebrow">{t.brandAvailableModels}</p>

            <h2>
              {t.brandPublishedModels} {brand.name}
            </h2>
          </div>

          <div className="models-grid">
            {availableModels.map((model) => {
              const modelSlug = slugify(`${brand.name} ${model}`);

              return (
                <Link
                  key={modelSlug}
                  href={`/model/${modelSlug}`}
                  className="model-card"
                >
                  <span>{brand.name}</span>
                  <h3>{model}</h3>
                  <strong>{t.brandViewProducts} →</strong>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="tips-section">
        <div className="section-heading">
          <p className="eyebrow">{t.brandBeforeBuying}</p>

          <h2>
            {t.brandWhatToCheck} {brand.name}
          </h2>
        </div>

        <div className="tips-grid">
          {brand.buyingTips.map((tip, index) => (
            <article key={tip} className="tip-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{tip}</p>
            </article>
          ))}
        </div>
      </section>

      {brand.relatedGuides.length > 0 && (
        <section className="guides-section">
          <div className="section-heading">
            <p className="eyebrow">{t.brandGuidesEyebrow}</p>

            <h2>{t.brandLearnBeforeBuying}</h2>
          </div>

          <div className="guides-grid">
            {brand.relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="guide-card"
              >
                <span>{t.brandGuideLabel}</span>
                <h3>{guide.title}</h3>
                <p>{t.brandReadArticle} →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="faq-section">
        <div className="section-heading">
          <p className="eyebrow">{t.brandFaqEyebrow}</p>

          <h2>
            {brand.name} {t.brandSecondHand}
          </h2>
        </div>

        <div className="faq-list">
          {brand.faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">THE GAME CONTINUES</p>

        <h2>
          {t.brandFinalTitle} {brand.name} {t.brandFinalTitleEnd}
        </h2>

        <p>{t.brandFinalDescription}</p>

        <div className="hero-actions">
          <Link
            href={brand.categoryBrandHref}
            className="cta-primary"
          >
            {t.brandExplore} {brand.name}
          </Link>

          <Link href="/sell" className="cta-secondary">
            {t.brandPublishProduct}
          </Link>
        </div>
      </section>
            <style>{`

        .brand-hero,
        .intro-section,
        .catalog-section,
        .models-section,
        .tips-section,
        .guides-section,
        .faq-section,
        .final-cta {
          max-width: 1200px;
          margin-right: auto;
          margin-left: auto;
        }

        .brand-page {
  min-height: 100vh;
  padding: 130px 40px 90px;
  background: #f7f5f0;
  color: #111;
  font-family: Inter, sans-serif;
}

        .brand-hero {
          margin-bottom: 72px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 36px;
          color: #777;
          font-size: 13px;
          font-weight: 700;
        }

        .breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #111;
        }

        .eyebrow {
          margin: 0 0 14px;
          color: #a9946d;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .brand-hero h1 {
          max-width: 940px;
          margin: 0;
          font-size: clamp(52px, 8vw, 82px);
          font-weight: 600;
          line-height: 0.98;
          letter-spacing: -4px;
        }

        .hero-description {
          max-width: 760px;
          margin: 26px 0 0;
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .primary-button,
        .secondary-button,
        .cta-primary,
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 49px;
          padding: 0 23px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .primary-button,
        .cta-primary {
          background: #111;
          color: #fff;
        }

        .secondary-button {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #fff;
          color: #111;
        }

        .primary-button:hover,
        .secondary-button:hover,
        .cta-primary:hover,
        .cta-secondary:hover {
          transform: translateY(-2px);
        }

        .intro-section,
        .models-section,
        .tips-section,
        .guides-section,
        .faq-section {
          margin-bottom: 84px;
        }

        .intro-section {
          padding: 42px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.62);
        }

        .section-heading {
          margin-bottom: 28px;
        }

        .section-heading h2,
        .catalog-heading h2,
        .final-cta h2 {
          max-width: 850px;
          margin: 0;
          font-size: clamp(34px, 5vw, 48px);
          line-height: 1.08;
          letter-spacing: -2px;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
        }

        .intro-grid p {
          margin: 0;
          color: #626262;
          font-size: 16px;
          line-height: 1.85;
        }

        .catalog-section {
          margin-bottom: 84px;
        }

        .catalog-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 26px;
        }

        .text-link {
          padding-bottom: 5px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          white-space: nowrap;
        }

        .loading-box {
          padding: 40px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 26px;
          background: #fff;
          color: #666;
          text-align: center;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .model-card {
          display: flex;
          min-height: 145px;
          flex-direction: column;
          padding: 26px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 26px;
          background: #fff;
          color: #111;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .model-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.08);
        }

        .model-card strong {
          margin-top: auto;
          padding-top: 24px;
          font-size: 12px;
        }

        .model-card span,
        .guide-card span {
          color: #a9946d;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .model-card h3 {
          margin: 18px 0 0;
          font-size: 25px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .tip-card {
          min-height: 210px;
          padding: 24px;
          border-radius: 25px;
          background: #111;
          color: #fff;
        }

        .tip-card span {
          color: #c9b896;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .tip-card p {
          margin: 52px 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          line-height: 1.65;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .guide-card {
          display: flex;
          min-height: 260px;
          flex-direction: column;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          background: #fff;
          color: #111;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.08);
        }

        .guide-card h3 {
          margin: 18px 0 0;
          font-size: 27px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .guide-card p {
          margin: auto 0 0;
          padding-top: 28px;
          color: #555;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .faq-list {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .faq-item summary {
          position: relative;
          padding: 25px 44px 25px 0;
          cursor: pointer;
          list-style: none;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.4;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary::after {
          position: absolute;
          top: 24px;
          right: 4px;
          content: "+";
          color: #a9946d;
          font-size: 25px;
          font-weight: 400;
        }

        .faq-item[open] summary::after {
          content: "−";
        }

        .faq-item p {
          max-width: 850px;
          margin: 0;
          padding: 0 0 27px;
          color: #666;
          line-height: 1.8;
        }

        .final-cta {
          padding: 58px;
          border-radius: 38px;
          background: #0f0e0c;
          color: #fff;
          text-align: center;
        }

        .final-cta h2 {
          margin-right: auto;
          margin-left: auto;
        }

        .final-cta > p:not(.eyebrow) {
          max-width: 660px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.75;
        }

        .final-cta .hero-actions {
          justify-content: center;
        }

        .final-cta .cta-primary {
          background: #fff;
          color: #111;
        }

        .final-cta .cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
        }

        @media (max-width: 980px) {
          .intro-grid {
            grid-template-columns: 1fr;
          }

          .models-grid,
          .guides-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tips-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
        .brand-page {
  padding: 110px 22px 70px;
}
          .brand-hero h1 {
            letter-spacing: -2.5px;
          }

          .intro-section,
          .final-cta {
            padding: 28px;
            border-radius: 28px;
          }

          .catalog-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .models-grid,
          .tips-grid,
          .guides-grid {
            grid-template-columns: 1fr;
          }

          .tip-card {
            min-height: 165px;
          }

          .tip-card p {
            margin-top: 34px;
          }

          .final-cta {
            text-align: left;
          }

          .final-cta .hero-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .hero-actions {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button,
          .cta-primary,
          .cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

    