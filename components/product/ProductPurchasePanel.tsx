"use client";

import PremiumButton from "@/components/ui/PremiumButton";
import PremiumBadge from "@/components/ui/PremiumBadge";
import InfoCard from "@/components/ui/InfoCard";
import GlassCard from "@/components/ui/GlassCard";

type ProductPurchasePanelProps = {
  brand?: string;
  title: string;
  price: number | string;
  originalPrice?: number | string;
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
  vatSecurePaymentLabel: string;
  newPriceLabel: string;
  athmovPriceLabel: string;
  youSaveLabel: string;
  securePaymentLabel: string;
  verifiedSellerLabel: string;
  protectedShippingLabel: string;
  estimatedDeliveryLabel: string;
  estimatedDeliveryText: string;
  protectedPaymentLabel: string;
  availableLabel: string;
  availableDescription: string;
  athmovProtectionLabel: string;
  athmovProtectionText: string;
  stripePaymentLabel: string;
  stripePaymentText: string;
  trackingLabel: string;
  trackingText: string;
  protectionLabel: string;
  protectionText: string;
  singleUnitLabel: string;
  paymentNoteLabel: string;
  countryFallbackLabel: string;
  locale: string;

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
  originalPrice,
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

  vatSecurePaymentLabel,
newPriceLabel,
athmovPriceLabel,
youSaveLabel,
securePaymentLabel,
verifiedSellerLabel,
protectedShippingLabel,
estimatedDeliveryLabel,
estimatedDeliveryText,
protectedPaymentLabel,
availableLabel,
availableDescription,
athmovProtectionLabel,
athmovProtectionText,
stripePaymentLabel,
stripePaymentText,
trackingLabel,
trackingText,
protectionLabel,
protectionText,
singleUnitLabel,
paymentNoteLabel,
countryFallbackLabel,
locale,

  onBuyNow,
  onAddToCart,
  onMakeOffer,
  onMessageSeller,
  onToggleFavorite,
}: ProductPurchasePanelProps) {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

  const currentPrice = Number(price) || 0;
const newPrice = Number(originalPrice) || 0;

const hasSaving =
  newPrice > 0 &&
  currentPrice > 0 &&
  newPrice > currentPrice;

const savingAmount = hasSaving
  ? newPrice - currentPrice
  : 0;

const savingPercentage = hasSaving
  ? Math.round((savingAmount / newPrice) * 100)
  : 0;

const formattedOriginalPrice = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
}).format(newPrice);

const formattedSaving = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
}).format(savingAmount);

return (
  <aside className="purchase-panel">
 <GlassCard padding="large" hover={false}>
      <div className="purchase-heading">
<p className="purchase-brand">{brand || "ATHMOV"}</p>

<div className="purchase-price premium-price">{formattedPrice}</div>

<p className="purchase-product-name">
  {title}
</p>

        <p className="purchase-price-caption">
          {vatSecurePaymentLabel}
        </p>

        {hasSaving && (
  <div className="purchase-saving-card">
    <div className="purchase-saving-column">
      <span>{newPriceLabel}</span>

      <strong className="purchase-original-price">
        {formattedOriginalPrice}
      </strong>
    </div>

    <div className="purchase-saving-divider" />

    <div className="purchase-saving-column">
      <span>{athmovPriceLabel}</span>

      <strong>{formattedPrice}</strong>
    </div>

    <div className="purchase-saving-result">
      <span>{youSaveLabel}</span>

      <strong>
        {formattedSaving}
        <small>−{savingPercentage}%</small>
      </strong>
    </div>
  </div>
)}

   <div className="purchase-trust-strip">
  <div>
  <span className="trust-icon">✓</span>
  {securePaymentLabel}
</div>

{sellerVerified && (
  <div>
    <span className="trust-icon">✓</span>
    {verifiedSellerLabel}
  </div>
)}

<div>
  <span className="trust-icon">✓</span>
  {protectedShippingLabel}
</div>
</div>

 <InfoCard
  icon="🚚"
  title={estimatedDeliveryLabel}
  description={estimatedDeliveryText}
  variant="accent"
/>
      </div>

<div className="purchase-badges">
  <PremiumBadge variant="dark" size="small">
    {condition}
  </PremiumBadge>

  <PremiumBadge variant="light" size="small">
    {protectedPaymentLabel}
  </PremiumBadge>

  {sellerVerified && (
    <PremiumBadge variant="success" size="small">
      {verifiedSellerLabel}
    </PremiumBadge>
  )}
</div>

      <div className="purchase-location">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>

       <span>{location || countryFallbackLabel}</span>
      </div>

 <InfoCard
  icon="✓"
  title={availableLabel}
  description={availableDescription}
  variant="success"
/>

      <div className="purchase-trust-card">
        <div className="purchase-trust-heading">
          <span className="purchase-shield">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 5.5 5.8v5.1c0 4.5 2.7 7.9 6.5 10.1 3.8-2.2 6.5-5.6 6.5-10.1V5.8L12 3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>

          <div>
<strong>{athmovProtectionLabel}</strong>
<p>{athmovProtectionText}</p>
          </div>
        </div>

<div className="purchase-trust-list">
  <div className="trust-item">
    <strong>{stripePaymentLabel}</strong>
    <span>{stripePaymentText}</span>
  </div>

  <div className="trust-item">
    <strong>{trackingLabel}</strong>
    <span>{trackingText}</span>
  </div>

  <div className="trust-item">
    <strong>{protectionLabel}</strong>
    <span>{protectionText}</span>
  </div>
</div>
      </div>

<div className="purchase-stock">
  {singleUnitLabel}
</div>

<div className="purchase-main-actions">
  <PremiumButton
    variant="dark"
    fullWidth
    onClick={onBuyNow}
    disabled={checkoutLoading}
  >
    {checkoutLoading ? redirectingLabel : buyNowLabel}
  </PremiumButton>

  <PremiumButton
    variant="outline"
    fullWidth
    onClick={onAddToCart}
  >
    {addToCartLabel}
  </PremiumButton>
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
          className={`purchase-favorite-action ${
            isFavorite ? "is-favorite" : ""
          }`}
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5S4 16 4 9.8C4 6.6 6.2 5 8.4 5c1.5 0 2.9.8 3.6 2 0 0 1.3-2 3.6-2C17.8 5 20 6.6 20 9.8c0 6.2-8 10.7-8 10.7Z" />
          </svg>

          {isFavorite ? inFavoritesLabel : addToFavoritesLabel}
        </button>
      </div>

      <div className="purchase-note">
        <span className="purchase-note-dot" />

      <p>{paymentNoteLabel}</p>
      </div>

      <style jsx>{`
 .purchase-panel {
    position: sticky;
    top: 118px;
    align-self: flex-start;
    min-width: 0;
}

        .purchase-heading {
          min-width: 0;
        }

        .purchase-brand {
          margin: 0 0 15px;
          overflow: hidden;
          color: #777;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.22em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

.purchase-product-name {
  margin: 14px 0 0;
  color: #4f4f4f;
  font-size: 15px;
  font-weight: 550;
  line-height: 1.45;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

        .purchase-price {
  margin-top: 10px;
          color: #111;
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.062em;
        }

        .purchase-price-caption {
          margin: 10px 0 0;
          color: #7d7d7d;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .purchase-saving-card {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 18px;
  margin-top: 24px;
  padding: 21px;
  border: 1px solid rgba(17, 17, 17, 0.07);
  border-radius:26px;
 background:linear-gradient(
180deg,
#fafaf8 0%,
#f3f3ef 100%
);
box-shadow:
0 15px 40px rgba(0,0,0,.04);
}

.purchase-saving-column {
  display: grid;
  align-content: center;
  gap: 7px;
}

.purchase-saving-column span,
.purchase-saving-result > span {
  color: #898989;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.purchase-saving-column strong {
  color: #171717;
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -0.035em;
}

.purchase-original-price {
  color: #929292 !important;
  font-weight: 500 !important;
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}

.purchase-saving-divider {
  width: 1px;
  min-height: 43px;
  background: rgba(17, 17, 17, 0.09);
}

.purchase-saving-result {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-top: 17px;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
}

.purchase-saving-result strong {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #171717;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.purchase-saving-result small {
  display: inline-flex;
  min-height: 25px;
  align-items: center;
  padding: 0 9px;
  border-radius: 999px;
  background: #171717;
  color: #fff;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.04em;
}

        .purchase-trust-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 18px 0 24px;
        }

        .purchase-trust-strip div {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid rgba(17, 17, 17, 0.06);
  border-radius: 999px;
  background: #f5f5f3;
  color: #333;
  font-size: 12px;
  font-weight: 600;
}
  .premium-price {
  animation: premiumPrice .65s ease;
}

@keyframes premiumPrice {

  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}

.trust-icon {
  display: grid;
  width: 17px;
  height: 17px;
  place-items: center;
  border-radius: 50%;
  background: #171717;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
}

        .purchase-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 27px;
        }

        .purchase-location {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 21px;
          color: #777;
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
          background: linear-gradient(145deg, #f8f8f5 0%, #f1f1ed 100%);
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
          color: #fff;
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
          color: #777;
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

      .purchase-trust-list {
  display: grid;
  gap: 16px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid rgba(17,17,17,.08);
}

.trust-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.trust-item strong {
  color: #171717;
  font-size: 13px;
  font-weight: 700;
}

.trust-item span {
  color: #777;
  font-size: 12px;
  line-height: 1.45;
}

        .purchase-stock {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 24px;
  color: #222;
  font-size: 12px;
  font-weight: 650;
}

.purchase-stock::before {
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #228b45;
  box-shadow: 0 0 0 5px rgba(34, 139, 69, 0.1);
  content: "";
}

       .purchase-main-actions {
  display: grid;
  gap: 11px;
  margin-top: 18px;
}

        .purchase-secondary-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
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

        .purchase-secondary-actions .purchase-favorite-action {
          grid-column: 1 / -1;
        }

        .purchase-secondary-actions button:hover {
          transform: translateY(-2px);
          background: #171717;
          color: #fff;
        }

        .purchase-secondary-actions button.is-favorite {
          background: #171717;
          color: #fff;
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
}
            .purchase-saving-card {
  gap: 14px;
  padding: 18px;
}

.purchase-saving-column strong {
  font-size: 17px;
}

.purchase-saving-result strong {
  font-size: 19px;
}

          .purchase-price {
            margin-top: 24px;
            font-size: clamp(58px, 14vw, 76px);
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
  .purchase-secondary-actions button {
    transition: none;
  }
        }
      `}</style>
       </GlassCard>
  </aside>
  );
}