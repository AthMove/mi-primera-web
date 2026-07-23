"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import ProductCard from "@/components/home/cards/ProductCard";

interface Props {
  featuredProducts: any[];
  isMobile: boolean;
}

export default function FeaturedProducts({
  featuredProducts,
  isMobile,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (featuredProducts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`featured-section ${
        isMobile ? "is-mobile" : ""
      } ${isVisible ? "is-visible" : ""}`}
    >
      <div className="featured-decoration" />

      <div className="featured-header">
        <div className="featured-heading">
          <div className="featured-eyebrow-row">
            <span className="featured-eyebrow-line" />

            <p className="featured-eyebrow">
              {t.curatedDrops}
            </p>
          </div>

          <h2 className="featured-title">
            {t.featuredProducts}
          </h2>

          <p className="featured-description">
            Una selección cuidada de productos premium destacados por
            ATHMOV.
          </p>
        </div>

        <button
          type="button"
          className="featured-button"
          onClick={() => router.push("/products")}
        >
          <span>{t.viewAll}</span>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="featured-card"
            style={
              {
                "--featured-delay": `${index * 90}ms`,
              } as CSSProperties
            }
          >
            <ProductCard
              product={product}
              isMobile={isMobile}
              showFavorite
            />
          </div>
        ))}
      </div>

      <div className="featured-footer">
        <span>Selección editorial ATHMOV</span>

        <button
          type="button"
          onClick={() => router.push("/products")}
        >
          Ver colección completa
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .featured-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 76px 60px 52px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 8% 0%,
              rgba(255, 255, 255, 0.98),
              transparent 31%
            ),
            linear-gradient(
              145deg,
              rgba(248, 248, 245, 0.98),
              rgba(238, 238, 233, 0.94)
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 100px rgba(0, 0, 0, 0.055);
          isolation: isolate;
        }

        .featured-decoration {
          position: absolute;
          top: -190px;
          left: -140px;
          width: 470px;
          height: 470px;
          border: 1px solid rgba(17, 17, 17, 0.04);
          border-radius: 50%;
          pointer-events: none;
        }

        .featured-decoration::after {
          position: absolute;
          inset: 70px;
          border: 1px solid rgba(17, 17, 17, 0.035);
          border-radius: inherit;
          content: "";
        }

        .featured-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .featured-section.is-visible .featured-header {
          opacity: 1;
          transform: translateY(0);
        }

        .featured-heading {
          max-width: 760px;
        }

        .featured-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 19px;
        }

        .featured-eyebrow-line {
          display: block;
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.55);
        }

        .featured-eyebrow {
          margin: 0;
          color: #747474;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .featured-title {
          margin: 0;
          color: #111111;
          font-size: clamp(50px, 5.2vw, 76px);
          font-weight: 440;
          line-height: 0.95;
          letter-spacing: -0.06em;
        }

        .featured-description {
          max-width: 520px;
          margin: 24px 0 0;
          color: #717171;
          font-size: 16px;
          line-height: 1.65;
          letter-spacing: -0.012em;
        }

        .featured-button {
          display: inline-flex;
          flex: 0 0 auto;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          gap: 13px;
          padding: 0 22px 0 25px;
          border: 1px solid #111111;
          border-radius: 999px;
          background: #111111;
          color: #ffffff;
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.13);
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
          letter-spacing: 0.02em;
          transition:
            background 280ms ease,
            color 280ms ease,
            transform 280ms ease,
            box-shadow 280ms ease;
        }

        .featured-button svg,
        .featured-footer button svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 280ms ease;
        }

        .featured-button:hover {
          background: transparent;
          color: #111111;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .featured-button:hover svg,
        .featured-footer button:hover svg {
          transform: translateX(4px);
        }

        .featured-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 300px), 1fr)
          );
          gap: 28px;
        }

        .featured-card {
          min-width: 0;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--featured-delay);
        }

        .featured-section.is-visible .featured-card {
          opacity: 1;
          transform: translateY(0);
        }

        .featured-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          margin-top: 40px;
          padding-top: 26px;
          border-top: 1px solid rgba(17, 17, 17, 0.09);
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 650ms ease 420ms,
            transform 650ms ease 420ms;
        }

        .featured-section.is-visible .featured-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .featured-footer span {
          color: #858585;
          font-size: 12px;
          font-weight: 450;
        }

        .featured-footer button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: #171717;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
        }

        .featured-section.is-mobile {
          margin-bottom: 26px;
          padding: 48px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile .featured-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 26px;
          margin-bottom: 32px;
        }

        .is-mobile .featured-title {
          font-size: 43px;
          line-height: 0.98;
          letter-spacing: -0.052em;
        }

        .is-mobile .featured-description {
          margin-top: 18px;
          font-size: 14px;
          line-height: 1.58;
        }

        .is-mobile .featured-button {
          min-height: 47px;
          padding: 0 19px 0 21px;
        }

        .is-mobile .featured-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .is-mobile .featured-footer {
          align-items: flex-start;
          flex-direction: column;
          gap: 13px;
          margin-top: 30px;
          padding-top: 22px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .featured-section {
            padding: 64px 38px 44px;
          }

          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-header,
          .featured-card,
          .featured-footer {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .featured-button,
          .featured-button svg,
          .featured-footer button svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}