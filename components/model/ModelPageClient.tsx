"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

type Product = {
  id: string;
  title: string;
  slug: string | null;
  brand: string | null;
  model: string | null;
  category: string | null;
  condition: string | null;
  price: number;
  image: string | null;
};

type ModelData = {
  brand: string;
  model: string;
  category: string;
};

type Props = {
  modelData: ModelData;
  products: Product[];
  categoryHref: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ModelPageClient({
  modelData,
  products,
  categoryHref,
}: Props) {
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
    }).format(value);

    const faqItems = [
  {
    question: `${t.modelFaqGoodIdeaQuestion} ${modelData.brand} ${modelData.model}`,
    answer: t.modelFaqGoodIdeaAnswer,
  },
  {
    question: `${t.modelFaqCheckQuestion} ${modelData.brand} ${modelData.model}`,
    answer: t.modelFaqCheckAnswer,
  },
  {
    question: `${t.modelFaqSellQuestion} ${modelData.brand} ${modelData.model}`,
    answer: t.modelFaqSellAnswer,
  },
];

  return (
    <>
      <section className="model-hero">
        <nav
          className="model-breadcrumb"
          aria-label={t.modelBreadcrumbLabel}
        >
          <Link href="/">{t.home}</Link>
          <span>›</span>

          <Link href={categoryHref}>
            {modelData.category}
          </Link>

          <span>›</span>

          <Link
            href={`/brands/${slugify(modelData.brand)}`}
          >
            {modelData.brand}
          </Link>

          <span>›</span>
          <span>{modelData.model}</span>
        </nav>

        <p className="model-eyebrow">
          {t.modelPageEyebrow}
        </p>

        <h1>
          {modelData.brand} {modelData.model}
          <br />
          {t.modelSecondHand}
        </h1>

        <p className="model-description">
          {t.modelDescriptionStart}{" "}
          {modelData.brand} {modelData.model},{" "}
          {t.modelDescriptionEnd}
        </p>

        <div className="model-actions">
          <Link
            href={`/products?search=${encodeURIComponent(
              `${modelData.brand} ${modelData.model}`
            )}`}
            className="model-primary-button"
          >
            {t.modelViewProducts}
          </Link>

          <Link
            href="/sell"
            className="model-secondary-button"
          >
            {t.modelSellThisModel}
          </Link>
        </div>
      </section>

      <section className="model-catalog">
        <div className="model-section-heading">
          <p className="model-eyebrow">
            {t.modelAvailableProducts}
          </p>

          <h2>
            {modelData.brand} {modelData.model}{" "}
            {t.modelAvailableOnAthmov}
          </h2>

          <p>
            {products.length === 1
              ? t.modelOneProductAvailable
              : `${products.length} ${t.modelProductsAvailable}`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="model-products-grid">
            {products.map((product) => (
              <Link
                key={product.id}
                href={
                  product.slug
                    ? `/p/${product.slug}`
                    : `/products/${product.id}`
                }
                className="model-product-card"
              >
                <div className="model-product-image">
                  <Image
                    src={
                      product.image?.startsWith("http") ||
                      product.image?.startsWith("/")
                        ? product.image
                        : "/logo.png"
                    }
                    alt={product.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>

                <div className="model-product-content">
                  <p className="model-product-brand">
                    {product.brand} · {product.model}
                  </p>

                  <h3>{product.title}</h3>

                  <div className="model-product-footer">
                    <span>
                      {product.condition ||
                        t.modelConditionUnknown}
                    </span>

                    <strong>
                      {formatCurrency(Number(product.price))}
                    </strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="model-empty-state">
            <h3>{t.modelEmptyTitle}</h3>

            <p>
              {t.modelEmptyTextStart}{" "}
              {modelData.brand}{" "}
              {t.modelEmptyTextEnd}
            </p>

            <div className="model-actions model-empty-actions">
              <Link
                href={`/brands/${slugify(modelData.brand)}`}
                className="model-primary-button"
              >
                {t.modelViewBrand}{" "}
                {modelData.brand.toUpperCase()}
              </Link>

              <Link
                href="/sell"
                className="model-secondary-button"
              >
                {t.modelPublishProduct}
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="model-faq">
        <div className="model-section-heading">
          <p className="model-eyebrow">
            {t.modelFaqEyebrow}
          </p>

          <h2>
            {t.modelFaqTitle} {modelData.brand}{" "}
            {modelData.model} {t.modelSecondHand}
          </h2>
        </div>

        <div className="model-faq-list">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="model-faq-item"
            >
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <style>{`
  .model-faq {
    width: 100%;
    max-width: 1200px;
    margin: 90px auto 0;
  }

  .model-faq-list {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .model-faq-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .model-faq-item summary {
    position: relative;
    padding: 25px 45px 25px 0;
    cursor: pointer;
    list-style: none;
    font-size: 19px;
    font-weight: 800;
  }

  .model-faq-item summary::-webkit-details-marker {
    display: none;
  }

  .model-faq-item summary::after {
    position: absolute;
    top: 21px;
    right: 4px;
    content: "+";
    color: #a58d5a;
    font-size: 27px;
  }

  .model-faq-item[open] summary::after {
    content: "−";
  }

  .model-faq-item p {
    max-width: 850px;
    margin: 0;
    padding: 0 0 28px;
    color: #666;
    line-height: 1.8;
  }

  .model-page {
    min-height: 100vh;
    padding: 140px 40px 90px;
    background: #f7f5f0;
    color: #111;
  }

  .model-hero,
  .model-catalog {
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }

  .model-hero {
    margin-bottom: 90px;
  }

  .model-breadcrumb {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    align-items: center;
    margin-bottom: 34px;
    color: #777;
    font-size: 13px;
    font-weight: 700;
  }

  .model-breadcrumb a {
    color: inherit;
    text-decoration: none;
  }

  .model-breadcrumb a:hover {
    color: #111;
  }

  .model-eyebrow {
    margin: 0 0 15px;
    color: #a58d5a;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .model-hero h1 {
    max-width: 1000px;
    margin: 0;
    font-size: clamp(52px, 8vw, 88px);
    font-weight: 600;
    line-height: 0.97;
    letter-spacing: -5px;
  }

  .model-description {
    max-width: 760px;
    margin: 28px 0 0;
    color: #666;
    font-size: 19px;
    line-height: 1.8;
  }

  .model-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .model-primary-button,
  .model-secondary-button {
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

  .model-primary-button {
    background: #111;
    color: #fff;
  }

  .model-secondary-button {
    border: 1px solid rgba(0, 0, 0, 0.13);
    background: #fff;
    color: #111;
  }

  .model-section-heading {
    margin-bottom: 30px;
  }

  .model-section-heading h2 {
    max-width: 850px;
    margin: 0;
    font-size: clamp(36px, 5vw, 54px);
    line-height: 1.05;
    letter-spacing: -2.5px;
  }

  .model-section-heading > p:last-child {
    margin: 16px 0 0;
    color: #666;
  }

  .model-products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .model-product-card {
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    background: #fff;
    color: #111;
    text-decoration: none;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .model-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.09);
  }

  .model-product-image {
    position: relative;
    height: 330px;
    background: #f3f3ef;
  }

  .model-product-image img {
    object-fit: contain;
    padding: 20px;
  }

  .model-product-content {
    padding: 24px;
  }

  .model-product-brand {
    margin: 0 0 10px;
    color: #a58d5a;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .model-product-content h3 {
    margin: 0;
    font-size: 22px;
    line-height: 1.25;
    letter-spacing: -0.5px;
  }

  .model-product-footer {
    display: flex;
    gap: 18px;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .model-product-footer span {
    color: #777;
    font-size: 12px;
  }

  .model-product-footer strong {
    font-size: 18px;
  }

  .model-empty-state {
    padding: 60px 30px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    background: #fff;
    text-align: center;
  }

  .model-empty-state h3 {
    margin: 0;
    font-size: 30px;
    letter-spacing: -1px;
  }

  .model-empty-state p {
    margin: 14px 0 0;
    color: #666;
    line-height: 1.7;
  }

  .model-empty-actions {
    justify-content: center;
  }

  @media (max-width: 900px) {
    .model-products-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 700px) {
    .model-page {
      padding: 115px 20px 65px;
    }

    .model-hero h1 {
      letter-spacing: -3px;
    }

    .model-products-grid {
      grid-template-columns: 1fr;
    }

    .model-product-image {
      height: 300px;
    }
  }

  @media (max-width: 520px) {
    .model-actions {
      flex-direction: column;
    }

    .model-primary-button,
    .model-secondary-button {
      width: 100%;
    }
  }
`}</style>
    </>
  );
}