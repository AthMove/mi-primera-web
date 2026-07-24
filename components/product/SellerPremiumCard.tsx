"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Seller {
  id?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  seller_verified?: boolean;
  seller_badge?: string;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
}

interface Props {
  seller: Seller | null;
  reviews: Review[];
  averageRating: number | null;
  memberSince: string | number;
  responseTime: string;
  sales: number;
  safeImage: (src?: string) => string;
  verifiedLabel: string;
  sellerLabel: string;
}

export default function SellerPremiumCard({
  seller,
  reviews,
  averageRating,
  memberSince,
  responseTime,
  sales,
  safeImage,
  verifiedLabel,
  sellerLabel,
}: Props) {
  const router = useRouter();

  const sellerName =
    seller?.full_name ||
    seller?.username ||
    seller?.seller_badge ||
    sellerLabel;

  const roundedRating =
    averageRating !== null
      ? Math.max(0, Math.min(5, Math.round(averageRating)))
      : 0;

      const positiveReviews = reviews.filter(
  (review) => Number(review.rating) >= 4
).length;

const positivePercentage = reviews.length
  ? Math.round((positiveReviews / reviews.length) * 100)
  : null;

const verificationPoints = seller?.seller_verified ? 2 : 0;

const ratingPoints =
  averageRating !== null
    ? Math.min(2, (averageRating / 5) * 2)
    : 0;

const salesPoints =
  sales >= 100
    ? 2
    : sales >= 50
      ? 1.6
      : sales >= 20
        ? 1.2
        : sales >= 5
          ? 0.7
          : sales > 0
            ? 0.3
            : 0;

const responseText = responseTime.toLowerCase();

const responsePoints =
  responseText.includes("min") ||
  responseText.includes("< 1") ||
  responseText.includes("menos de 1")
    ? 2
    : responseText.includes("hora")
      ? 1.4
      : responseText.includes("día") ||
          responseText.includes("dia")
        ? 0.7
        : 0.4;

const reviewPoints =
  positivePercentage !== null
    ? positivePercentage >= 98
      ? 2
      : positivePercentage >= 90
        ? 1.6
        : positivePercentage >= 80
          ? 1.1
          : positivePercentage >= 70
            ? 0.6
            : 0.3
    : 0.5;

const trustScore = Math.min(
  10,
  verificationPoints +
    ratingPoints +
    salesPoints +
    responsePoints +
    reviewPoints
);

const trustScoreFormatted = trustScore.toFixed(1);
const trustPercentage = Math.round(trustScore * 10);

const trustLabel =
  trustScore >= 9
    ? "Confianza excelente"
    : trustScore >= 7.5
      ? "Confianza alta"
      : trustScore >= 6
        ? "Confianza sólida"
        : "Vendedor en crecimiento";

  const goToSellerProfile = () => {
    if (!seller?.id) return;

    router.push(`/seller/${seller.id}`);
  };

  return (
    <section className="seller-section">
      <div className="seller-section-header">
        <div>
          <p className="seller-section-eyebrow">
            VENDEDORES ATHMOV
          </p>

          <h2>Compra con confianza</h2>
        </div>

        {seller?.seller_verified && (
          <div className="verified-seller-badge">
            <span>✓</span>
            {verifiedLabel}
          </div>
        )}
      </div>

      <div
        className={`seller-premium-card ${
          seller?.id ? "seller-premium-card-clickable" : ""
        }`}
        onClick={goToSellerProfile}
        role={seller?.id ? "link" : undefined}
        tabIndex={seller?.id ? 0 : undefined}
        onKeyDown={(event) => {
          if (
            seller?.id &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            goToSellerProfile();
          }
        }}
      >
        <div className="seller-premium-line" />

        <div className="seller-premium-top">
          <div className="seller-premium-avatar">
            <Image
              src={safeImage(seller?.avatar_url)}
              fill
              sizes="96px"
              alt={`Perfil de ${sellerName}`}
              style={{ objectFit: "cover" }}
            />

            {seller?.seller_verified && (
              <span className="seller-avatar-check">✓</span>
            )}
          </div>

          <div className="seller-premium-identity">
            <p className="seller-verified-text">
              {seller?.seller_verified
                ? "ATHMOV VERIFIED SELLER"
                : "ATHMOV SELLER"}
            </p>

            <h3 className="seller-premium-name">
              {sellerName}
            </h3>

            <div className="seller-rating-row">
              <span className="seller-stars">
                {averageRating !== null
                  ? `${"★".repeat(roundedRating)}${"☆".repeat(
                      5 - roundedRating
                    )}`
                  : "☆☆☆☆☆"}
              </span>

              <span className="seller-rating-copy">
                {averageRating !== null
                  ? `${averageRating.toFixed(1)} · ${reviews.length} ${
                      reviews.length === 1
                        ? "reseña"
                        : "reseñas"
                    }`
                  : "Vendedor nuevo"}
              </span>
            </div>
          </div>
        </div>

        <div className="seller-trust-row">
          <div>
            <span className="seller-trust-icon">✓</span>
            Identidad revisada
          </div>

          <div>
            <span className="seller-trust-icon">✓</span>
            Pago protegido
          </div>

          <div>
            <span className="seller-trust-icon">✓</span>
            Perfil trazable
          </div>
        </div>

        <div className="seller-stats-grid">
          <div>
            <strong>{sales}</strong>
            <span>Ventas</span>
          </div>

          <div>
            <strong>
              {averageRating !== null
                ? averageRating.toFixed(1)
                : "Nuevo"}
            </strong>
            <span>Valoración</span>
          </div>

          <div>
            <strong>{responseTime}</strong>
            <span>Respuesta</span>
          </div>

          <div>
            <strong>{memberSince}</strong>
            <span>Miembro desde</span>
          </div>
        </div>

        <div className="seller-trust-score">
  <div className="seller-trust-score-heading">
    <div>
      <span className="seller-trust-score-eyebrow">
        ATHMOV TRUST SCORE
      </span>

      <strong>{trustLabel}</strong>
    </div>

    <div className="seller-trust-score-value">
      <strong>{trustScoreFormatted}</strong>
      <span>/ 10</span>
    </div>
  </div>

  <div
    className="seller-trust-score-track"
    role="progressbar"
    aria-label={`Trust Score ${trustScoreFormatted} sobre 10`}
    aria-valuemin={0}
    aria-valuemax={10}
    aria-valuenow={trustScore}
  >
    <span
      className="seller-trust-score-progress"
      style={{ width: `${trustPercentage}%` }}
    />
  </div>

  <div className="seller-trust-score-details">
    <span>
      {seller?.seller_verified
        ? "Identidad verificada"
        : "Identidad pendiente"}
    </span>

    <span>
      {positivePercentage !== null
        ? `${positivePercentage}% reseñas positivas`
        : "Sin reseñas todavía"}
    </span>
  </div>
</div>

        <div className="seller-last-active">
          <span className="seller-online-dot" />

          <div>
            <strong>Vendedor activo</strong>
            <span>
              Actividad reciente en ATHMOV
            </span>
          </div>
        </div>

        {reviews.length > 0 && (
          <div
            className="seller-review-list"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="seller-reviews-header">
              <span>Últimas reseñas</span>
              <span>{reviews.length} en total</span>
            </div>

            {reviews.slice(0, 2).map((review) => {
              const rating = Math.max(
                0,
                Math.min(5, Math.round(Number(review.rating)))
              );

              return (
                <article
                  key={review.id}
                  className="seller-review-item"
                >
                  <div className="seller-review-stars">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </div>

                  {review.comment && (
                    <p>{review.comment}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {seller?.id && (
          <button
            type="button"
            className="seller-profile-button"
            onClick={(event) => {
              event.stopPropagation();
              goToSellerProfile();
            }}
          >
            Ver perfil completo
            <span>→</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .seller-section {
          width: 100%;
          max-width: 760px;
          margin-top: 54px;
        }

        .seller-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 18px;
        }

        .seller-section-eyebrow {
          margin: 0 0 8px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.4px;
          color: #777;
        }

        .seller-section-header h2 {
          margin: 0;
          font-size: 32px;
          line-height: 1;
          letter-spacing: -1.4px;
          color: #111;
        }

        .verified-seller-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding: 10px 14px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .verified-seller-badge span {
          display: grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          color: #111;
          font-size: 11px;
        }

        .seller-premium-card {
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
          padding: 36px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 38px;
          background:
            radial-gradient(
              circle at top right,
              rgba(255, 255, 255, 0.1),
              transparent 34%
            ),
            linear-gradient(
              155deg,
              #0d0d0d 0%,
              #191919 48%,
              #292929 100%
            );
          color: #fff;
          box-shadow: 0 48px 130px rgba(0, 0, 0, 0.24);
          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        .seller-premium-card-clickable {
          cursor: pointer;
        }

        .seller-premium-card-clickable:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 65px 160px rgba(0, 0, 0, 0.32);
        }

        .seller-premium-card:focus-visible {
          outline: 3px solid rgba(17, 17, 17, 0.3);
          outline-offset: 5px;
        }

        .seller-premium-line {
          width: 90px;
          height: 3px;
          margin-bottom: 26px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #fff,
            rgba(255, 255, 255, 0.25)
          );
        }

        .seller-premium-top {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .seller-premium-avatar {
          position: relative;
          overflow: visible;
          width: 96px;
          height: 96px;
          flex-shrink: 0;
          border: 3px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          background: #fff;
          box-shadow:
            0 0 0 7px rgba(255, 255, 255, 0.04),
            0 20px 55px rgba(0, 0, 0, 0.38);
        }

        .seller-premium-avatar :global(img) {
          border-radius: 50%;
        }

        .seller-avatar-check {
          position: absolute;
          right: -3px;
          bottom: 2px;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          border: 3px solid #171717;
          border-radius: 50%;
          background: #fff;
          color: #111;
          font-size: 13px;
          font-weight: 900;
        }

        .seller-premium-identity {
          min-width: 0;
        }

        .seller-verified-text {
          margin: 0;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.5);
        }

        .seller-premium-name {
          margin: 8px 0 8px;
          font-size: 31px;
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -1.2px;
          overflow-wrap: anywhere;
        }

        .seller-rating-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .seller-stars {
          font-size: 14px;
          letter-spacing: 1px;
        }

        .seller-rating-copy {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.58);
        }

        .seller-trust-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
          padding: 17px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.04);
        }

        .seller-trust-row > div {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.68);
        }

        .seller-trust-icon {
          display: grid;
          place-items: center;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          font-size: 10px;
          font-weight: 900;
        }

        .seller-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 14px;
        }

        .seller-stats-grid > div {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 18px 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.07);
          text-align: center;
          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .seller-stats-grid > div:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.11);
        }

        .seller-stats-grid strong {
          font-size: 18px;
          line-height: 1;
          overflow-wrap: anywhere;
        }

        .seller-stats-grid span {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .seller-trust-score {
  margin-top: 16px;
  padding: 23px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.09),
      rgba(255, 255, 255, 0.035)
    );
}

.seller-trust-score-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.seller-trust-score-heading > div:first-child {
  display: grid;
  gap: 7px;
}

.seller-trust-score-eyebrow {
  color: rgba(255, 255, 255, 0.4);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.seller-trust-score-heading > div:first-child strong {
  color: #fff;
  font-size: 15px;
  font-weight: 650;
}

.seller-trust-score-value {
  display: flex;
  align-items: baseline;
  gap: 5px;
  flex-shrink: 0;
}

.seller-trust-score-value strong {
  color: #fff;
  font-size: 36px;
  font-weight: 550;
  line-height: 0.9;
  letter-spacing: -0.055em;
}

.seller-trust-score-value span {
  color: rgba(255, 255, 255, 0.42);
  font-size: 11px;
  font-weight: 600;
}

.seller-trust-score-track {
  position: relative;
  height: 8px;
  margin-top: 22px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.seller-trust-score-progress {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.62),
    #ffffff
  );
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.25);
  transition: width 850ms cubic-bezier(0.22, 1, 0.36, 1);
}

.seller-trust-score-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 13px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 10px;
  font-weight: 550;
}

        .seller-last-active {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
          padding: 0 2px;
        }

        .seller-online-dot {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #27c93f;
          box-shadow: 0 0 14px rgba(39, 201, 63, 0.65);
        }

        .seller-last-active div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .seller-last-active strong {
          font-size: 13px;
        }

        .seller-last-active div span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.48);
        }

        .seller-review-list {
          display: grid;
          gap: 10px;
          margin-top: 22px;
          cursor: default;
        }

        .seller-reviews-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 0 2px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.48);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .seller-review-item {
          padding: 17px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.055);
        }

        .seller-review-stars {
          font-size: 14px;
          letter-spacing: 1px;
        }

        .seller-review-item p {
          margin: 9px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.62);
        }

        .seller-profile-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 58px;
          margin-top: 24px;
          padding: 0 22px;
          border: none;
          border-radius: 999px;
          background: #fff;
          color: #111;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }

        .seller-profile-button span {
          font-size: 19px;
          transition: transform 0.28s ease;
        }

        .seller-profile-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.28);
        }

        .seller-profile-button:hover span {
          transform: translateX(4px);
        }

        @media (max-width: 700px) {
          .seller-section {
            margin-top: 42px;
          }

          .seller-section-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .seller-section-header h2 {
            font-size: 28px;
          }

          .seller-trust-score {
  padding: 19px;
}

.seller-trust-score-value strong {
  font-size: 31px;
}

.seller-trust-score-details {
  align-items: flex-start;
  flex-direction: column;
  gap: 6px;
}

          .seller-premium-card {
            padding: 27px 18px;
            border-radius: 30px;
          }

          .seller-premium-top {
            align-items: flex-start;
            gap: 15px;
          }

          .seller-premium-avatar {
            width: 74px;
            height: 74px;
          }

          .seller-avatar-check {
            width: 24px;
            height: 24px;
          }

          .seller-premium-name {
            font-size: 24px;
            letter-spacing: -0.7px;
          }

          .seller-trust-row {
            grid-template-columns: 1fr;
            gap: 11px;
          }

          .seller-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .seller-stats-grid > div {
            padding: 16px 8px;
          }

          .seller-reviews-header {
            font-size: 10px;
          }

          .seller-profile-button {
            height: 56px;
          }
        }
      `}</style>
    </section>
  );
}