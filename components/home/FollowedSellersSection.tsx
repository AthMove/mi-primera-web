"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type FollowedSellersSectionProps = {
  isMobile: boolean;
  sellers: any[];
};

export default function FollowedSellersSection({
  isMobile,
  sellers,
}: FollowedSellersSectionProps) {
  const router = useRouter();

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  if (!sellers?.length) return null;

  return (
    <>
      <section
        className={`followed-sellers-section fade-up ${
          isMobile ? "is-mobile" : ""
        }`}
        data-delay="175"
      >
        <div className="followed-sellers-header">
          <div>
            <div className="followed-sellers-eyebrow-row">
              <span className="followed-sellers-line" />

              <p className="followed-sellers-eyebrow">
                Tu comunidad
              </p>
            </div>

            <h2 className="followed-sellers-title">
              Vendedores que sigues
            </h2>

            <p className="followed-sellers-description">
              Descubre las nuevas piezas publicadas por vendedores de
              confianza dentro de ATHMOV.
            </p>
          </div>

          <button
            type="button"
            className="followed-sellers-view-all"
            onClick={() => router.push("/following")}
          >
            Ver comunidad

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="followed-sellers-grid">
          {sellers.map((seller) => {
            const sellerName =
              seller.full_name ||
              seller.username ||
              seller.seller_badge ||
              "Vendedor ATHMOV";

            const totalSales =
              seller.total_sales ??
              seller.sales_count ??
              seller.completed_sales ??
              0;

            const rating = Number(
              seller.rating ??
                seller.average_rating ??
                seller.seller_rating ??
                0
            );

            const reviews =
              seller.reviews_count ??
              seller.total_reviews ??
              seller.review_count ??
              0;

            return (
              <article
                key={seller.id}
                className="followed-seller-card"
                role="link"
                tabIndex={0}
                aria-label={`Ver perfil de ${sellerName}`}
                onClick={() =>
                  router.push(`/seller/${seller.id}`)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    router.push(`/seller/${seller.id}`);
                  }
                }}
              >
                <div className="followed-seller-glow" />

                <div className="followed-seller-top">
                  <div className="followed-seller-avatar-wrap">
                    <Image
                      src={safeImage(seller.avatar_url)}
                      alt={sellerName}
                      fill
                      sizes={isMobile ? "78px" : "90px"}
                      className="followed-seller-avatar"
                    />

                    {seller.seller_verified && (
                      <span
                        className="followed-seller-verified-icon"
                        aria-label="Vendedor verificado"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="m8.4 12.4 2.2 2.2 5-5" />
                          <path d="M12 2.8 14 4l2.3-.1.9 2.1 1.9 1.3-.5 2.3.8 2.1-1.6 1.7-.2 2.3-2.2.7-1.4 1.9-2.1-.9-2.1.9-1.4-1.9-2.2-.7-.2-2.3-1.6-1.7.8-2.1-.5-2.3L6.8 6l.9-2.1L10 4l2-1.2Z" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <span className="followed-seller-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>

                <div className="followed-seller-badges">
                  {seller.seller_verified && (
                    <span className="followed-seller-badge primary">
                      Verificado
                    </span>
                  )}

                  <span className="followed-seller-badge">
                    {String(
                      seller.seller_badge ||
                        seller.seller_level ||
                        "ATHMOV Seller"
                    )}
                  </span>
                </div>

                <div className="followed-seller-content">
                  <h3>{sellerName}</h3>

                  <div className="followed-seller-location">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                      <circle cx="12" cy="10" r="2.2" />
                    </svg>

                    <span>{seller.location || "España"}</span>
                  </div>

                  <div className="followed-seller-divider" />

                  <div className="followed-seller-stats">
                    <div>
                      <strong>{totalSales}</strong>
                      <span>Ventas</span>
                    </div>

                    <div>
                      <strong>
                        {rating > 0 ? rating.toFixed(1) : "—"}
                      </strong>
                      <span>
                        {reviews > 0
                          ? `${reviews} reseñas`
                          : "Valoración"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        {seller.response_time || "< 1 h"}
                      </strong>
                      <span>Respuesta</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        .followed-sellers-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 74px 60px 58px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(255, 255, 255, 0.95),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #f7f7f4 0%,
              #eeeeea 100%
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 90px rgba(0, 0, 0, 0.055);
        }

        .followed-sellers-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 44px;
        }

        .followed-sellers-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
        }

        .followed-sellers-line {
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.52);
        }

        .followed-sellers-eyebrow {
          margin: 0;
          color: #777777;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .followed-sellers-title {
          margin: 0;
          color: #111111;
          font-size: clamp(48px, 5vw, 70px);
          font-weight: 440;
          line-height: 0.95;
          letter-spacing: -0.058em;
        }

        .followed-sellers-description {
          max-width: 510px;
          margin: 23px 0 0;
          color: #737373;
          font-size: 15px;
          line-height: 1.65;
        }

        .followed-sellers-view-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 50px;
          padding: 0 21px 0 23px;
          border: 1px solid #161616;
          border-radius: 999px;
          background: transparent;
          color: #161616;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
          transition:
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        .followed-sellers-view-all:hover {
          background: #161616;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .followed-sellers-view-all svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .followed-sellers-view-all:hover svg {
          transform: translateX(3px);
        }

        .followed-sellers-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 300px), 1fr)
          );
          gap: 24px;
        }

        .followed-seller-card {
          position: relative;
          min-height: 350px;
          overflow: hidden;
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 31px;
          background:
            linear-gradient(
              145deg,
              #141414 0%,
              #1c1c1c 52%,
              #252525 100%
            );
          color: #ffffff;
          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.08),
            0 22px 65px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          outline: none;
          transform: translateY(0);
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 450ms ease;
        }

        .followed-seller-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow:
            0 3px 8px rgba(0, 0, 0, 0.11),
            0 32px 85px rgba(0, 0, 0, 0.23);
        }

        .followed-seller-card:focus-visible {
          box-shadow:
            0 0 0 3px rgba(17, 17, 17, 0.17),
            0 32px 85px rgba(0, 0, 0, 0.23);
        }

        .followed-seller-glow {
          position: absolute;
          top: -105px;
          right: -90px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.09);
          filter: blur(35px);
          pointer-events: none;
          transition: transform 500ms ease;
        }

        .followed-seller-card:hover
          .followed-seller-glow {
          transform: translate(-16px, 16px) scale(1.08);
        }

        .followed-seller-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .followed-seller-avatar-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          border: 3px solid rgba(255, 255, 255, 0.16);
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
        }

        .followed-seller-avatar {
          border-radius: 50%;
          object-fit: cover;
        }

        .followed-seller-verified-icon {
          position: absolute;
          right: -3px;
          bottom: -2px;
          z-index: 2;
          display: grid;
          width: 27px;
          height: 27px;
          place-items: center;
          border: 3px solid #1d1d1d;
          border-radius: 50%;
          background: #ffffff;
          color: #111111;
        }

        .followed-seller-verified-icon svg {
          width: 16px;
          height: 16px;
          fill: #ffffff;
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .followed-seller-arrow {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.76);
          transition:
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        .followed-seller-card:hover
          .followed-seller-arrow {
          background: #ffffff;
          color: #111111;
          transform: translateX(3px);
        }

        .followed-seller-arrow svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .followed-seller-badges {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }

        .followed-seller-badge {
          display: inline-flex;
          align-items: center;
          min-height: 29px;
          padding: 0 11px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.74);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .followed-seller-badge.primary {
          border-color: #ffffff;
          background: #ffffff;
          color: #111111;
        }

        .followed-seller-content {
          position: relative;
          z-index: 2;
          margin-top: 18px;
        }

        .followed-seller-content h3 {
          margin: 0;
          overflow: hidden;
          color: #ffffff;
          font-size: 28px;
          font-weight: 510;
          line-height: 1.05;
          letter-spacing: -0.045em;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .followed-seller-location {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 11px;
          color: rgba(255, 255, 255, 0.56);
          font-size: 12px;
          font-weight: 500;
        }

        .followed-seller-location svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .followed-seller-divider {
          height: 1px;
          margin: 24px 0 20px;
          background: rgba(255, 255, 255, 0.1);
        }

        .followed-seller-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .followed-seller-stats div {
          min-width: 0;
        }

        .followed-seller-stats strong {
          display: block;
          overflow: hidden;
          color: #ffffff;
          font-size: 18px;
          font-weight: 560;
          letter-spacing: -0.025em;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .followed-seller-stats span {
          display: block;
          overflow: hidden;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .followed-sellers-section.is-mobile {
          margin-bottom: 26px;
          padding: 48px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile .followed-sellers-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 26px;
          margin-bottom: 31px;
        }

        .is-mobile .followed-sellers-title {
          font-size: 42px;
          line-height: 0.98;
        }

        .is-mobile .followed-sellers-description {
          margin-top: 18px;
          font-size: 14px;
        }

        .is-mobile .followed-sellers-view-all {
          min-height: 46px;
        }

        .is-mobile .followed-sellers-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .is-mobile .followed-seller-card {
          min-height: 330px;
          padding: 24px;
          border-radius: 27px;
        }

        .is-mobile .followed-seller-avatar-wrap {
          width: 78px;
          height: 78px;
        }

        .is-mobile .followed-seller-content h3 {
          font-size: 25px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .followed-sellers-section {
            padding: 62px 38px 44px;
          }

          .followed-sellers-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (hover: none) {
          .followed-seller-card:hover {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .followed-seller-card,
          .followed-seller-glow,
          .followed-seller-arrow,
          .followed-sellers-view-all,
          .followed-sellers-view-all svg {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}