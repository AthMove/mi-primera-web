"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function BuyerProtectionClient() {
  const { t } = useLanguage();

  const protections = [
    {
      number: "01",
      title: t.buyerProtectionSecurePaymentTitle,
      text: t.buyerProtectionSecurePaymentText,
    },
    {
      number: "02",
      title: t.buyerProtectionTrackingTitle,
      text: t.buyerProtectionTrackingText,
    },
    {
      number: "03",
      title: t.buyerProtectionCommunicationTitle,
      text: t.buyerProtectionCommunicationText,
    },
    {
      number: "04",
      title: t.buyerProtectionIssuesTitle,
      text: t.buyerProtectionIssuesText,
    },
  ];

  const situations = [
    {
      title: t.buyerProtectionNotArrivedTitle,
      text: t.buyerProtectionNotArrivedText,
    },
    {
      title: t.buyerProtectionDamagedTitle,
      text: t.buyerProtectionDamagedText,
    },
    {
      title: t.buyerProtectionNotAsDescribedTitle,
      text: t.buyerProtectionNotAsDescribedText,
    },
  ];

  const steps = [
    t.buyerProtectionStep1,
    t.buyerProtectionStep2,
    t.buyerProtectionStep3,
    t.buyerProtectionStep4,
    t.buyerProtectionStep5,
  ];

  const faqItems = [
    {
      question: t.buyerProtectionFaqDamagedQuestion,
      answer: t.buyerProtectionFaqDamagedAnswer,
    },
    {
      question: t.buyerProtectionFaqEvidenceQuestion,
      answer: t.buyerProtectionFaqEvidenceAnswer,
    },
    {
      question: t.buyerProtectionFaqSellerQuestion,
      answer: t.buyerProtectionFaqSellerAnswer,
    },
    {
      question: t.buyerProtectionFaqOrderQuestion,
      answer: t.buyerProtectionFaqOrderAnswer,
    },
  ];

  return (
    <>
      <section className="buyer-protection-hero">
        <p className="buyer-protection-eyebrow">
          {t.buyerProtectionPageEyebrow}
        </p>

        <h1>
          {t.buyerProtectionPageTitleFirst}
          <br />
          {t.buyerProtectionPageTitleSecond}
        </h1>

        <p className="buyer-protection-intro">
          {t.buyerProtectionPageIntro}
        </p>

        <div className="buyer-protection-actions">
          <Link
            href="/products"
            className="buyer-protection-primary"
          >
            {t.buyerProtectionExploreProducts}
          </Link>

          <Link
            href="/how-it-works"
            className="buyer-protection-secondary"
          >
            {t.buyerProtectionHowItWorks}
          </Link>
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>{t.buyerProtectionHowEyebrow}</p>
          <h2>{t.buyerProtectionHowTitle}</h2>
        </div>

        <div className="buyer-protection-grid">
          {protections.map((item) => (
            <article
              key={item.number}
              className="buyer-protection-card"
            >
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="buyer-protection-dark">
        <div>
          <p className="buyer-protection-dark-eyebrow">
            {t.buyerProtectionProblemEyebrow}
          </p>

          <h2>{t.buyerProtectionProblemTitle}</h2>

          <p className="buyer-protection-dark-text">
            {t.buyerProtectionProblemText}
          </p>
        </div>

        <div className="buyer-protection-situations">
          {situations.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>{t.buyerProtectionOpenIssueEyebrow}</p>
          <h2>{t.buyerProtectionOpenIssueTitle}</h2>
        </div>

        <div className="buyer-protection-steps">
          {steps.map((step, index) => (
            <div
              key={step}
              className="buyer-protection-step"
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>{t.buyerProtectionFaqEyebrow}</p>
          <h2>{t.buyerProtectionFaqTitle}</h2>
        </div>

        <div className="buyer-protection-faq">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="buyer-protection-cta">
        <p>THE GAME CONTINUES.</p>

        <h2>{t.buyerProtectionFinalTitle}</h2>

        <Link href="/products">
          {t.buyerProtectionViewMarketplace}
        </Link>
      </section>
    </>
  );
}