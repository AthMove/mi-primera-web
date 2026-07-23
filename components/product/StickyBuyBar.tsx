"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import PremiumButton from "@/components/ui/PremiumButton";

type StickyBuyBarProps = {
  title: string;
  price: number;
  checkoutLoading: boolean;
  buyNowLabel: string;
  redirectingLabel: string;
  onBuyNow: () => void;
};

export default function StickyBuyBar({
  title,
  price,
  checkoutLoading,
  buyNowLabel,
  redirectingLabel,
  onBuyNow,
}: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
   const onScroll = () => {
  const panel = document.getElementById("purchase-panel");

  if (!panel) {
    setVisible(window.scrollY > 700);
    return;
  }

  const rect = panel.getBoundingClientRect();

  setVisible(rect.bottom < 120);
};

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

if (!visible) return null;

return (
 <>
  <div className="sticky-buy-wrapper">
    <GlassCard padding="small" hover={false}>
      <div className="sticky-buy-content">
        <div className="sticky-buy-info">
          <p>{title}</p>

          <strong>
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(price)}
          </strong>

          <span className="sticky-buy-trust">
            ✓ Compra protegida
          </span>
        </div>

        <PremiumButton
          onClick={onBuyNow}
          disabled={checkoutLoading}
        >
          {checkoutLoading
            ? redirectingLabel
            : buyNowLabel}
        </PremiumButton>
      </div>
    </GlassCard>
  </div>

 <style jsx>{`
  .sticky-buy-wrapper {
    position: fixed;
    left: 50%;
    bottom: 22px;
    width: min(920px, calc(100vw - 32px));
    transform: translateX(-50%);
    z-index: 9998;
  }

  .sticky-buy-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    animation: stickyAppear 0.35s ease;
  }

  .sticky-buy-info {
    min-width: 0;
  }

  .sticky-buy-info p {
    margin: 0;
    color: #111111;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sticky-buy-info strong {
    display: block;
    margin-top: 4px;
    color: #111111;
    font-size: 22px;
    font-weight: 700;
  }

  .sticky-buy-trust {
    display: block;
    margin-top: 6px;
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
  }

  @media (max-width: 700px) {
    .sticky-buy-wrapper {
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      transform: none;
      padding: 12px;
    }

    .sticky-buy-content {
      gap: 14px;
    }

    .sticky-buy-info p {
      max-width: 145px;
      font-size: 12px;
    }

    .sticky-buy-info strong {
      font-size: 18px;
    }

    .sticky-buy-trust {
      font-size: 11px;
    }
  }

  @keyframes stickyAppear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sticky-buy-content {
      animation: none;
    }
  }
`}</style>
  </>
);
}