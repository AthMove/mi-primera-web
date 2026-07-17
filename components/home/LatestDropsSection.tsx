"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import ProductCard from "./cards/ProductCard";
import SkeletonCard from "@/components/common/SkeletonCard";

type LatestDropsSectionProps = {
  isMobile: boolean;
  products: any[];
  loading?: boolean;
};

export default function LatestDropsSection({
  isMobile,
  products,
  loading = false,
}: LatestDropsSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  if (loading) {
  return (
    <>
      <section
        className={`latest-drops-section ${
          isMobile ? "is-mobile" : ""
        }`}
      >
        <div className="latest-drops-header">
          <div className="latest-drops-heading">
            <div className="latest-drops-eyebrow-row">
              <span className="latest-drops-line" />

              <p className="latest-drops-eyebrow">
                {t.latest}
              </p>
            </div>

            <h2 className="latest-drops-title">
              {t.news}
            </h2>

            <p className="latest-drops-description">
              Cargando la selección más reciente de ATHMOV.
            </p>
          </div>
        </div>

        <div className="latest-drops-grid">
          {Array.from({ length: isMobile ? 3 : 6 }).map(
            (_, index) => (
              <SkeletonCard
                key={index}
                isMobile={isMobile}
              />
            )
          )}
        </div>
      </section>

      <style jsx>{`
        .latest-drops-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 78px 60px 54px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 95% 5%,
              rgba(255, 255, 255, 0.96),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              rgba(249, 249, 247, 0.97) 0%,
              rgba(242, 242, 238, 0.92) 100%
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 100px rgba(0, 0, 0, 0.055);
        }

        .latest-drops-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 52px;
        }

        .latest-drops-heading {
          max-width: 760px;
        }

        .latest-drops-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 19px;
        }

        .latest-drops-line {
          display: block;
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.55);
        }

        .latest-drops-eyebrow {
          margin: 0;
          color: #747474;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .latest-drops-title {
          margin: 0;
          color: #111;
          font-size: clamp(52px, 5.5vw, 78px);
          font-weight: 440;
          line-height: 0.94;
          letter-spacing: -0.062em;
        }

        .latest-drops-description {
          max-width: 520px;
          margin: 25px 0 0;
          color: #717171;
          font-size: 16px;
          line-height: 1.65;
        }

        .latest-drops-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 340px), 1fr)
          );
          gap: 28px;
        }

        .latest-drops-section.is-mobile {
          margin-bottom: 26px;
          padding: 49px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile .latest-drops-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 27px;
          margin-bottom: 32px;
        }

        .is-mobile .latest-drops-title {
          font-size: 43px;
          line-height: 0.98;
          letter-spacing: -0.052em;
        }

        .is-mobile .latest-drops-description {
          margin-top: 19px;
          font-size: 14px;
          line-height: 1.58;
        }

        .is-mobile .latest-drops-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .latest-drops-section {
            padding: 64px 38px 45px;
          }

          .latest-drops-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}

  return (
    <>
      <section
        className={`latest-drops-section fade-up ${
          isMobile ? "is-mobile" : ""
        }`}
        data-delay="120"
      >
        <div className="latest-drops-header">
          <div className="latest-drops-heading">
            <div className="latest-drops-eyebrow-row">
              <span className="latest-drops-line" />

              <p className="latest-drops-eyebrow">
                {t.latest}
              </p>
            </div>

            <h2 className="latest-drops-title">
              {t.news}
            </h2>

            <p className="latest-drops-description">
              Una selección de material deportivo premium que acaba de
              llegar a ATHMOV.
            </p>
          </div>

          <button
            type="button"
            className="latest-drops-button"
            onClick={() => router.push("/feed")}
          >
            <span>{t.viewFeed}</span>

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {products.length > 0 ? (
          <div className="latest-drops-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="latest-drops-card"
                style={
                  {
                    "--card-delay": `${index * 80}ms`,
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
        ) : (
          <div className="latest-drops-empty">
            <span className="latest-drops-empty-number">
              00
            </span>

            <h3>Próximamente</h3>

            <p>
              Estamos preparando una nueva selección de productos
              deportivos premium.
            </p>

            <button
              type="button"
              onClick={() => router.push("/feed")}
            >
              Explorar ATHMOV
            </button>
          </div>
        )}

        <div className="latest-drops-footer">
          <p>
            Nuevos productos añadidos por deportistas de la comunidad
            ATHMOV.
          </p>

          <button
            type="button"
            onClick={() => router.push("/feed")}
          >
            Explorar todos los productos

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

      <style jsx>{`
        .latest-drops-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 78px 60px 54px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 95% 5%,
              rgba(255, 255, 255, 0.96),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              rgba(249, 249, 247, 0.97) 0%,
              rgba(242, 242, 238, 0.92) 100%
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 100px rgba(0, 0, 0, 0.055);
          isolation: isolate;
        }

        .latest-drops-section::before {
          position: absolute;
          top: -160px;
          right: -110px;
          width: 430px;
          height: 430px;
          border: 1px solid rgba(17, 17, 17, 0.04);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .latest-drops-section::after {
          position: absolute;
          top: -100px;
          right: -50px;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(17, 17, 17, 0.035);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .latest-drops-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 52px;
        }

        .latest-drops-heading {
          max-width: 760px;
        }

        .latest-drops-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 19px;
        }

        .latest-drops-line {
          display: block;
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.55);
        }

        .latest-drops-eyebrow {
          margin: 0;
          color: #747474;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .latest-drops-title {
          max-width: 820px;
          margin: 0;
          color: #111111;
          font-size: clamp(52px, 5.5vw, 78px);
          font-weight: 440;
          line-height: 0.94;
          letter-spacing: -0.062em;
        }

        .latest-drops-description {
          max-width: 520px;
          margin: 25px 0 0;
          color: #717171;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: -0.012em;
        }

        .latest-drops-button {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 13px;
          min-height: 52px;
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

        .latest-drops-button svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 280ms ease;
        }

        .latest-drops-button:hover {
          background: transparent;
          color: #111111;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .latest-drops-button:hover svg {
          transform: translateX(3px);
        }

        .latest-drops-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 340px), 1fr)
          );
          gap: 28px;
        }

        .latest-drops-card {
          min-width: 0;
          opacity: 0;
          animation: latestCardReveal 700ms
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--card-delay);
          transform: translateY(24px);
        }

        .latest-drops-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-top: 42px;
          padding-top: 27px;
          border-top: 1px solid rgba(17, 17, 17, 0.09);
        }

        .latest-drops-footer p {
          margin: 0;
          color: #858585;
          font-size: 12px;
          font-weight: 450;
          line-height: 1.55;
        }

        .latest-drops-footer button {
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

        .latest-drops-footer button svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .latest-drops-footer button:hover svg {
          transform: translateX(4px);
        }

        .latest-drops-empty {
          position: relative;
          z-index: 2;
          display: flex;
          min-height: 390px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 55px 25px;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 29px;
          background: rgba(255, 255, 255, 0.56);
          text-align: center;
        }

        .latest-drops-empty-number {
          margin-bottom: 24px;
          color: rgba(17, 17, 17, 0.18);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .latest-drops-empty h3 {
          margin: 0;
          color: #151515;
          font-size: 34px;
          font-weight: 480;
          letter-spacing: -0.045em;
        }

        .latest-drops-empty p {
          max-width: 440px;
          margin: 17px auto 27px;
          color: #777777;
          font-size: 14px;
          line-height: 1.65;
        }

        .latest-drops-empty button {
          min-height: 45px;
          padding: 0 19px;
          border: 1px solid #151515;
          border-radius: 999px;
          background: #151515;
          color: #ffffff;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          font-weight: 650;
        }

        @keyframes latestCardReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .latest-drops-section.is-mobile {
          margin-bottom: 26px;
          padding: 49px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile .latest-drops-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 27px;
          margin-bottom: 32px;
        }

        .is-mobile .latest-drops-title {
          font-size: 43px;
          line-height: 0.98;
          letter-spacing: -0.052em;
        }

        .is-mobile .latest-drops-description {
          margin-top: 19px;
          font-size: 14px;
          line-height: 1.58;
        }

        .is-mobile .latest-drops-button {
          min-height: 47px;
          padding: 0 19px 0 21px;
        }

        .is-mobile .latest-drops-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .is-mobile .latest-drops-footer {
          align-items: flex-start;
          flex-direction: column;
          gap: 13px;
          margin-top: 30px;
          padding-top: 22px;
        }

        .is-mobile .latest-drops-footer p {
          max-width: 300px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .latest-drops-section {
            padding: 64px 38px 45px;
          }

          .latest-drops-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .latest-drops-card {
            opacity: 1;
            animation: none;
            transform: none;
          }

          .latest-drops-button,
          .latest-drops-button svg,
          .latest-drops-footer button svg {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}