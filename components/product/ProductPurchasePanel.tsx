"use client";

type ProductPurchasePanelProps = {
  brand?: string;
  title: string;
  price: number | string;
  condition: string;
  location?: string;
  sellerVerified?: boolean;
  checkoutLoading?: boolean;
  isFavorite?: boolean;

  buyNowLabel: string;
  redirectingLabel: string;
  addToCartLabel: string;
  makeOfferLabel: string;
  messageSellerLabel: string;
  addToFavoritesLabel: string;
  inFavoritesLabel: string;

  onBuyNow: () => void;
  onAddToCart: () => void;
  onMakeOffer: () => void;
  onMessageSeller: () => void;
  onToggleFavorite: () => void;
};

export default function ProductPurchasePanel({
  brand,
  title,
  price,
  condition,
  location,
  sellerVerified = false,
  checkoutLoading = false,
  isFavorite = false,

  buyNowLabel,
  redirectingLabel,
  addToCartLabel,
  makeOfferLabel,
  messageSellerLabel,
  addToFavoritesLabel,
  inFavoritesLabel,

  onBuyNow,
  onAddToCart,
  onMakeOffer,
  onMessageSeller,
  onToggleFavorite,
}: ProductPurchasePanelProps) {
  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

  return (
    <aside className="purchase-panel">
      <div className="purchase-heading">
        <p className="purchase-brand">
          {brand || "ATHMOV"}
        </p>

        <h1>{title}</h1>

        <div className="purchase-price">
          {formattedPrice}
        </div>
      </div>

      <div className="purchase-badges">
        <span className="purchase-badge primary">
          {condition}
        </span>

        <span className="purchase-badge">
          Pago protegido
        </span>

        {sellerVerified && (
          <span className="purchase-badge">
            Vendedor verificado
          </span>
        )}
      </div>

      <div className="purchase-location">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>

        <span>{location || "España"}</span>
      </div>

      <div className="purchase-trust-card">
        <div className="purchase-trust-heading">
          <span className="purchase-shield">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 5.5 5.8v5.1c0 4.5 2.7 7.9 6.5 10.1 3.8-2.2 6.5-5.6 6.5-10.1V5.8L12 3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>

          <div>
            <strong>Compra protegida por ATHMOV</strong>
            <p>
              Te acompañamos durante el pago y la entrega.
            </p>
          </div>
        </div>

        <div className="purchase-trust-list">
          <span>Pago seguro mediante Stripe</span>
          <span>Envío con seguimiento</span>
          <span>Soporte hasta completar la entrega</span>
        </div>
      </div>

      <div className="purchase-main-actions">
        <button
          type="button"
          className="purchase-buy-button"
          onClick={onBuyNow}
          disabled={checkoutLoading}
        >
          <span>
            {checkoutLoading
              ? redirectingLabel
              : buyNowLabel}
          </span>

          {!checkoutLoading && (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="purchase-cart-button"
          onClick={onAddToCart}
        >
          {addToCartLabel}
        </button>
      </div>

      <div className="purchase-secondary-actions">
        <button type="button" onClick={onMakeOffer}>
          {makeOfferLabel}
        </button>

        <button type="button" onClick={onMessageSeller}>
          {messageSellerLabel}
        </button>

        <button
          type="button"
          className={isFavorite ? "is-favorite" : ""}
          onClick={onToggleFavorite}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5S4 16 4 9.8C4 6.6 6.2 5 8.4 5c1.5 0 2.9.8 3.6 2 0 0 1.3-2 3.6-2C17.8 5 20 6.6 20 9.8c0 6.2-8 10.7-8 10.7Z" />
          </svg>

          {isFavorite
            ? inFavoritesLabel
            : addToFavoritesLabel}
        </button>
      </div>

      <div className="purchase-note">
        <span className="purchase-note-dot" />

        <p>
          No se realiza ningún cargo hasta acceder al pago
          seguro.
        </p>
      </div>

      <style jsx>{`
        .purchase-panel {
          position: sticky;
          top: 118px;
          align-self: flex-start;
          min-width: 0;
          padding: 42px;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 38px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.025),
            0 35px 110px rgba(0, 0, 0, 0.09);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
        }

        .purchase-heading {
          min-width: 0;
        }

        .purchase-brand {
          margin: 0 0 15px;
          overflow: hidden;
          color: #777777;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.22em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        h1 {
          margin: 0;
          color: #111111;
          font-size: clamp(42px, 4.2vw, 66px);
          font-weight: 470;
          line-height: 0.97;
          letter-spacing: -0.058em;
          overflow-wrap: anywhere;
        }

        .purchase-price {
          margin-top: 29px;
          color: #111111;
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.062em;
        }

        .purchase-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 27px;
        }

        .purchase-badge {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          padding: 0 13px;
          border: 1px solid rgba(17, 17, 17, 0.08);
          border-radius: 999px;
          background: #f4f4f1;
          color: #4d4d4d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .purchase-badge.primary {
          border-color: #171717;
          background: #171717;
          color: #ffffff;
        }

        .purchase-location {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 21px;
          color: #777777;
          font-size: 13px;
          font-weight: 500;
        }

        .purchase-location svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .purchase-trust-card {
          margin-top: 31px;
          padding: 23px;
          border: 1px solid rgba(17, 17, 17, 0.065);
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              #f8f8f5 0%,
              #f1f1ed 100%
            );
        }

        .purchase-trust-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .purchase-shield {
          display: grid;
          width: 39px;
          height: 39px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 50%;
          background: #171717;
          color: #ffffff;
        }

        .purchase-shield svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .purchase-trust-heading strong {
          display: block;
          color: #171717;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.3;
        }

        .purchase-trust-heading p {
          margin: 6px 0 0;
          color: #777777;
          font-size: 12px;
          line-height: 1.5;
        }

        .purchase-trust-list {
          display: grid;
          gap: 10px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
        }

        .purchase-trust-list span {
          position: relative;
          padding-left: 17px;
          color: #5e5e5e;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.45;
        }

        .purchase-trust-list span::before {
          position: absolute;
          top: 0.42em;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #171717;
          content: "";
        }

        .purchase-main-actions {
          display: grid;
          gap: 11px;
          margin-top: 27px;
        }

        .purchase-buy-button,
        .purchase-cart-button {
          display: flex;
          width: 100%;
          min-height: 62px;
          align-items: center;
          justify-content: center;
          gap: 13px;
          padding: 0 25px;
          border-radius: 999px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 680;
          transition:
            transform 280ms ease,
            box-shadow 280ms ease,
            background 280ms ease,
            color 280ms ease;
        }

        .purchase-buy-button {
          position: relative;
          overflow: hidden;
          border: 1px solid #111111;
          background: #111111;
          color: #ffffff;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.2);
        }

        .purchase-buy-button::before {
          position: absolute;
          top: 0;
          left: -100%;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.24),
            transparent
          );
          content: "";
          transition: left 650ms ease;
        }

        .purchase-buy-button:hover:not(:disabled)::before {
          left: 140%;
        }

        .purchase-buy-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 23px 55px rgba(0, 0, 0, 0.26);
        }

        .purchase-buy-button:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        .purchase-buy-button span,
        .purchase-buy-button svg {
          position: relative;
          z-index: 2;
        }

        .purchase-buy-button svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .purchase-cart-button {
          border: 1px solid rgba(17, 17, 17, 0.13);
          background: #ffffff;
          color: #171717;
        }

        .purchase-cart-button:hover {
          background: #f4f4f1;
          transform: translateY(-2px);
        }

        .purchase-secondary-actions {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .purchase-secondary-actions button {
          display: flex;
          min-width: 0;
          min-height: 47px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border: 1px solid rgba(17, 17, 17, 0.09);
          border-radius: 15px;
          background: #f7f7f4;
          color: #474747;
          cursor: pointer;
          font-family: inherit;
          font-size: 10px;
          font-weight: 650;
          line-height: 1.25;
          text-align: center;
          transition:
            background 230ms ease,
            color 230ms ease,
            transform 230ms ease;
        }

        .purchase-secondary-actions button:hover {
          background: #171717;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .purchase-secondary-actions button.is-favorite {
          background: #171717;
          color: #ffffff;
        }

        .purchase-secondary-actions svg {
          width: 14px;
          height: 14px;
          flex: 0 0 auto;
          fill: transparent;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .purchase-secondary-actions .is-favorite svg {
          fill: currentColor;
        }

        .purchase-note {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-top: 19px;
        }

        .purchase-note-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          margin-top: 6px;
          border-radius: 50%;
          background: #8b8b8b;
        }

        .purchase-note p {
          margin: 0;
          color: #919191;
          font-size: 10px;
          line-height: 1.5;
        }

        @media (max-width: 1000px) {
          .purchase-panel {
            position: relative;
            top: auto;
          }
        }

        @media (max-width: 700px) {
          .purchase-panel {
            width: 100%;
            padding: 27px 20px;
            border-radius: 29px;
          }

          h1 {
            font-size: 43px;
          }

          .purchase-price {
            font-size: 48px;
          }

          .purchase-secondary-actions {
            grid-template-columns: 1fr;
          }

          .purchase-secondary-actions button {
            min-height: 49px;
            border-radius: 999px;
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .purchase-buy-button,
          .purchase-cart-button,
          .purchase-secondary-actions button {
            transition: none;
          }

          .purchase-buy-button::before {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}