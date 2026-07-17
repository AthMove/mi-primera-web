"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../cards/ProductCard";
import SkeletonCard from "@/components/common/SkeletonCard";

type FollowedSellerProductsSectionProps = {
  isMobile: boolean;
  products: any[];
  loading?: boolean;
};

export default function FollowedSellerProductsSection({
  isMobile,
  products,
  loading = false,
}: FollowedSellerProductsSectionProps) {
  const router = useRouter();

  if (!products?.length) {
    return null;
  }

  return (
    <>
      <section
        className={`followed-products-section fade-up ${
          isMobile ? "is-mobile" : ""
        }`}
        data-delay="160"
      >
        <div className="followed-products-header">
          <div className="followed-products-heading">
            <div className="followed-products-eyebrow-row">
              <span className="followed-products-line" />

              <p className="followed-products-eyebrow">
                Novedades de tu comunidad
              </p>
            </div>

            <h2 className="followed-products-title">
              Productos de vendedores que sigues
            </h2>

            <p className="followed-products-description">
              Nuevas piezas publicadas por vendedores que ya forman
              parte de tu selección personal en ATHMOV.
            </p>
          </div>

          <button
            type="button"
            className="followed-products-button"
            onClick={() => router.push("/feed")}
          >
            Ver novedades

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="followed-products-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="followed-products-card"
              style={
                {
                  "--followed-product-delay": `${index * 80}ms`,
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

        <div className="followed-products-footer">
          <div className="followed-products-footer-copy">
            <span className="followed-products-footer-dot" />

            <p>
              Contenido actualizado según los vendedores que sigues.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/following")}
          >
            Gestionar vendedores seguidos

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

      <style jsx>{`
        .followed-products-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 76px 60px 54px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 88% 0%,
              rgba(255, 255, 255, 0.09),
              transparent 31%
            ),
            linear-gradient(
              145deg,
              #101010 0%,
              #181818 48%,
              #202020 100%
            );
          color: #ffffff;
          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.1),
            0 32px 100px rgba(0, 0, 0, 0.18);
          isolation: isolate;
        }

        .followed-products-section::before {
          position: absolute;
          top: -170px;
          right: -90px;
          width: 420px;
          height: 420px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .followed-products-section::after {
          position: absolute;
          top: -95px;
          right: -25px;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(255, 255, 255, 0.045);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .followed-products-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 42px;
          margin-bottom: 50px;
        }

        .followed-products-heading {
          max-width: 830px;
        }

        .followed-products-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 19px;
        }

        .followed-products-line {
          width: 38px;
          height: 1px;
          background: rgba(255, 255, 255, 0.52);
        }

        .followed-products-eyebrow {
          margin: 0;
          color: rgba(255, 255, 255, 0.52);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .followed-products-title {
          max-width: 860px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 430;
          line-height: 0.96;
          letter-spacing: -0.058em;
        }

        .followed-products-description {
          max-width: 560px;
          margin: 24px 0 0;
          color: rgba(255, 255, 255, 0.55);
          font-size: 15px;
          line-height: 1.68;
        }

        .followed-products-button {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 51px;
          padding: 0 22px 0 24px;
          border: 1px solid rgba(255, 255, 255, 0.92);
          border-radius: 999px;
          background: #ffffff;
          color: #111111;
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
          transition:
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        .followed-products-button:hover {
          background: transparent;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .followed-products-button svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .followed-products-button:hover svg {
          transform: translateX(3px);
        }

        .followed-products-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 340px), 1fr)
          );
          gap: 28px;
        }

        .followed-products-card {
          min-width: 0;
          opacity: 0;
          animation: followedProductReveal 700ms
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--followed-product-delay);
          transform: translateY(24px);
        }

        .followed-products-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-top: 42px;
          padding-top: 26px;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
        }

        .followed-products-footer-copy {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .followed-products-footer-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.58);
        }

        .followed-products-footer p {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 12px;
          line-height: 1.55;
        }

        .followed-products-footer button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.82);
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
        }

        .followed-products-footer button svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .followed-products-footer button:hover svg {
          transform: translateX(4px);
        }

        @keyframes followedProductReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .followed-products-section.is-mobile {
          margin-bottom: 26px;
          padding: 49px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile .followed-products-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 27px;
          margin-bottom: 32px;
        }

        .is-mobile .followed-products-title {
          font-size: 42px;
          line-height: 0.98;
          letter-spacing: -0.052em;
        }

        .is-mobile .followed-products-description {
          margin-top: 19px;
          font-size: 14px;
          line-height: 1.6;
        }

        .is-mobile .followed-products-button {
          min-height: 47px;
        }

        .is-mobile .followed-products-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .is-mobile .followed-products-footer {
          align-items: flex-start;
          flex-direction: column;
          gap: 13px;
          margin-top: 30px;
          padding-top: 22px;
        }

        .is-mobile .followed-products-footer-copy {
          align-items: flex-start;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .followed-products-section {
            padding: 63px 38px 44px;
          }

          .followed-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .followed-products-card {
            opacity: 1;
            animation: none;
            transform: none;
          }

          .followed-products-button,
          .followed-products-button svg,
          .followed-products-footer button svg {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}