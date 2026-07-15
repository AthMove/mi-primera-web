"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent, useState } from "react";

interface ProductCardProps {
  product: any;
  isMobile?: boolean;
  showFavorite?: boolean;
  showRating?: boolean;
  compact?: boolean;
}

export default function ProductCard({
  product,
  isMobile = false,
  showFavorite = true,
  showRating = true,
  compact = false,
}: ProductCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const productUrl = `/products/${product?.id}`;

  const safeImage = (src?: string) => {
    if (src?.startsWith("http") || src?.startsWith("/")) {
      return src;
    }

    return "/logo.png";
  };

  const productImage =
    product?.image ||
    product?.images?.[0] ||
    product?.image_url ||
    product?.photo_url;

  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(product?.price) || 0);

  const rating = Number(
  product?.rating ??
    product?.average_rating ??
    product?.seller_rating ??
    0
);

const reviewsCount =
  product?.reviews_count ??
  product?.total_reviews ??
  product?.review_count ??
  0;

  const openProduct = () => {
    if (!product?.id) return;
    router.push(productUrl);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct();
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <>
      <article
        className={`athmov-product-card fade-up ${
  compact ? "is-compact" : ""
}`}
        role="link"
        tabIndex={0}
        aria-label={`Ver ${product?.title || "producto"}`}
        onClick={openProduct}
        onKeyDown={handleKeyboard}
        onMouseMove={handleMouseMove}
      >
        <div
          className="athmov-product-media"
          style={{
           height: compact
  ? isMobile
    ? "260px"
    : "330px"
  : isMobile
    ? "320px"
    : "460px",
          }}
        >
          <div className="athmov-card-shine" />

          <span
           className={`athmov-product-badge ${
  product?.featured
    ? "is-featured"
    : product?.seller_verified
      ? "is-verified"
      : ""
}`}
          >
            <span className="athmov-badge-dot" />

            {product?.featured
  ? "Destacado"
  : product?.seller_verified
    ? "ATHMOV Verified"
    : "Recién añadido"}
          </span>

          {showFavorite && (
            <button
              type="button"
              className={`athmov-favorite-button ${
                isFavorite ? "is-active" : ""
              }`}
              aria-label={
                isFavorite
                  ? "Eliminar de favoritos"
                  : "Añadir a favoritos"
              }
              aria-pressed={isFavorite}
              onClick={(event) => {
                event.stopPropagation();
                setIsFavorite((current) => !current);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="athmov-heart-icon"
              >
                <path d="M12 20.5S4 16 4 9.8C4 6.6 6.2 5 8.4 5c1.5 0 2.9.8 3.6 2 0 0 1.3-2 3.6-2C17.8 5 20 6.6 20 9.8c0 6.2-8 10.7-8 10.7Z" />
              </svg>
            </button>
          )}

          <Image
            src={safeImage(productImage)}
            alt={product?.title || "Producto ATHMOV"}
            fill
            sizes={
              isMobile
                ? "92vw"
                : "(max-width: 900px) 50vw, 33vw"
            }
            className="athmov-product-image"
            style={{
              objectFit: "contain",
              padding: isMobile ? "26px" : "38px",
            }}
          />

          <div className="athmov-image-overlay" />

          <span className="athmov-view-product">
            Ver producto

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <div
          className="athmov-product-content"
          style={{
            padding: isMobile
              ? "25px 23px 27px"
              : "30px 30px 32px",
          }}
        >
          <div className="athmov-product-topline">
            <p className="athmov-product-brand">
              {product?.brand || "ATHMOV"}
            </p>

            {product?.category && (
              <span className="athmov-product-category">
                {product.category}
              </span>
            )}
          </div>

          <h3
            className="athmov-product-title"
            style={{
              fontSize: isMobile ? "21px" : "24px",
            }}
          >
            {product?.title || "Producto deportivo premium"}
          </h3>

          {showRating && (
  <div className="athmov-product-rating">
    <span className="athmov-rating-stars">
      {rating > 0 ? "★★★★★" : "☆☆☆☆☆"}
    </span>

    <span>
      {rating > 0
        ? `${rating.toFixed(1)}${
            reviewsCount > 0 ? ` · ${reviewsCount}` : ""
          }`
        : "Sin reseñas"}
    </span>
  </div>
)}

          <div className="athmov-price-row">
            <p
              className="athmov-product-price"
              style={{
                fontSize: isMobile ? "27px" : "31px",
              }}
            >
              {formattedPrice}
            </p>

            {product?.original_price &&
              Number(product.original_price) >
                Number(product.price) && (
                <p className="athmov-original-price">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(Number(product.original_price))}
                </p>
              )}
          </div>

          <div className="athmov-product-divider" />

        <div className="athmov-product-footer">
  <div className="athmov-product-meta">
    <span className="athmov-meta-condition">
      {product?.condition || "Muy buen estado"}
    </span>

    <span className="athmov-meta-separator" />

    <span className="athmov-meta-item">
      {product?.location || "España"}
    </span>
  </div>

  <span className="athmov-product-link">
    <span className="athmov-link-short">Ver</span>
    <span className="athmov-link-long">Ver producto</span>

    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
</div>
        </div>
      </article>

      <style jsx>{`

      .athmov-product-badge.is-verified {
  border-color: rgba(17, 17, 17, 0.86);
  background: rgba(17, 17, 17, 0.92);
  color: #ffffff;
}

.athmov-product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -8px;
  margin-bottom: 21px;
  color: #858585;
  font-size: 11px;
  font-weight: 500;
}

.athmov-rating-stars {
  color: #181818;
  font-size: 10px;
  letter-spacing: 0.06em;
}

.athmov-product-footer {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.athmov-product-link {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 7px;
  color: #171717;
  font-size: 11px;
  font-weight: 650;
}

.athmov-product-link svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 250ms ease;
}

.athmov-link-long {
  display: none;
}

.athmov-product-card:hover .athmov-link-short {
  display: none;
}

.athmov-product-card:hover .athmov-link-long {
  display: inline;
}

.athmov-product-card:hover .athmov-product-link svg {
  transform: translateX(4px);
}
        .athmov-product-card {
          --pointer-x: 50%;
          --pointer-y: 50%;

          position: relative;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 18px 60px rgba(0, 0, 0, 0.07);
          outline: none;
          transform: translateY(0);
          transition:
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 500ms ease;
          isolation: isolate;
        }

        .athmov-product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(17, 17, 17, 0.12);
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.02),
            0 30px 90px rgba(0, 0, 0, 0.13);
        }

        .athmov-product-card:focus-visible {
          box-shadow:
            0 0 0 3px rgba(17, 17, 17, 0.14),
            0 30px 90px rgba(0, 0, 0, 0.13);
        }

        .athmov-product-media {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(255, 255, 255, 1) 0%,
              rgba(247, 247, 244, 1) 52%,
              rgba(239, 239, 235, 1) 100%
            );
        }

        .athmov-card-shine {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            300px circle at var(--pointer-x) var(--pointer-y),
            rgba(255, 255, 255, 0.72),
            transparent 60%
          );
          transition: opacity 400ms ease;
        }

        .athmov-product-card:hover .athmov-card-shine {
          opacity: 1;
        }

        .athmov-product-badge {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 13px;
          border: 1px solid rgba(255, 255, 255, 0.66);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          color: #171717;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .athmov-product-badge.is-featured {
          border-color: rgba(24, 24, 24, 0.8);
          background: rgba(20, 20, 20, 0.92);
          color: #ffffff;
        }

        .athmov-badge-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.72;
        }

        .athmov-favorite-button {
          position: absolute;
          top: 17px;
          right: 17px;
          z-index: 6;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.78);
          color: #171717;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: pointer;
          transition:
            transform 250ms ease,
            color 250ms ease,
            background 250ms ease;
        }

        .athmov-favorite-button:hover {
          transform: scale(1.08);
          background: #ffffff;
        }

        .athmov-favorite-button.is-active {
          color: #111111;
          background: #ffffff;
        }

        .athmov-heart-icon {
          width: 19px;
          height: 19px;
          overflow: visible;
          fill: transparent;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: fill 250ms ease;
        }

        .athmov-favorite-button.is-active .athmov-heart-icon {
          fill: currentColor;
        }

        .athmov-product-image {
          z-index: 2;
          transform: scale(1);
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          filter: drop-shadow(0 25px 22px rgba(0, 0, 0, 0.1));
        }

        .athmov-product-card:hover .athmov-product-image {
         transform: scale(1.06);
        }

        .athmov-image-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            transparent 60%,
            rgba(10, 10, 10, 0.08) 100%
          );
        }

        .athmov-view-product {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(17, 17, 17, 0.9);
          color: white;
          opacity: 0;
          transform: translateY(10px);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.04em;
          transition:
            opacity 350ms ease,
            transform 350ms ease;
        }

        .athmov-view-product svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .athmov-product-card:hover .athmov-view-product {
          opacity: 1;
          transform: translateY(0);
        }

        .athmov-product-content {
          position: relative;
          z-index: 4;
          background: rgba(255, 255, 255, 0.96);
        }

        .athmov-product-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .athmov-product-brand {
          overflow: hidden;
          margin: 0;
          color: #747474;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.19em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .athmov-product-category {
          overflow: hidden;
          color: #9a9a9a;
          font-size: 11px;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .athmov-product-title {
          display: -webkit-box;
          overflow: hidden;
          min-height: 2.42em;
          margin: 14px 0 20px;
          color: #131313;
          font-weight: 540;
          line-height: 1.21;
          letter-spacing: -0.035em;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .athmov-price-row {
          display: flex;
          align-items: baseline;
          gap: 11px;
        }

        .athmov-product-price {
          margin: 0;
          color: #111111;
          font-weight: 630;
          line-height: 1;
          letter-spacing: -0.055em;
        }

        .athmov-original-price {
          margin: 0;
          color: #a0a0a0;
          font-size: 14px;
          font-weight: 500;
          text-decoration: line-through;
        }

        .athmov-product-divider {
          height: 1px;
          margin: 24px 0 18px;
          background: rgba(17, 17, 17, 0.08);
        }

        .athmov-product-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          color: #767676;
          font-size: 12px;
          font-weight: 500;
        }

        .athmov-meta-item {
          display: inline-flex;
          align-items: center;
          min-width: 0;
          gap: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .athmov-meta-item svg {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .athmov-meta-separator {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #b0b0b0;
        }

        .athmov-meta-condition {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .athmov-product-card {
            border-radius: 25px;
          }

          .athmov-product-badge {
            top: 14px;
            left: 14px;
            min-height: 31px;
            padding: 0 11px;
            font-size: 9px;
          }

          .athmov-favorite-button {
            top: 13px;
            right: 13px;
            width: 39px;
            height: 39px;
          }

          .athmov-view-product {
            display: none;
          }

          .athmov-product-divider {
            margin-top: 21px;
          }
            .athmov-product-footer {
  align-items: flex-start;
  flex-direction: column;
  gap: 13px;
}

.athmov-product-link {
  font-size: 12px;
}
        }

      .athmov-product-card.is-compact {
  border-radius: 24px;
}

.athmov-product-card.is-compact .athmov-product-content {
  padding: 23px !important;
}

.athmov-product-card.is-compact .athmov-product-title {
  min-height: auto;
  font-size: 20px !important;
}

.athmov-product-card.is-compact .athmov-product-divider {
  margin: 19px 0 16px;
}

@media (hover: none) {
  .athmov-product-card:hover {
    transform: none;
  }

  .athmov-card-shine {
    display: none;
  }

  .athmov-link-short {
    display: none;
  }

  .athmov-link-long {
    display: inline;
  }
}

        @media (prefers-reduced-motion: reduce) {
          .athmov-product-card,
          .athmov-product-image,
          .athmov-view-product,
          .athmov-favorite-button {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}