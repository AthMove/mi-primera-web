"use client";

import { useEffect, useState } from "react";

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
    <div className="sticky-buy-bar">
      <div className="sticky-buy-info">
        <p>{title}</p>

        <strong>
          {new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }).format(price)}
        </strong>
      </div>

      <button
        type="button"
        onClick={onBuyNow}
        disabled={checkoutLoading}
      >
        {checkoutLoading
          ? redirectingLabel
          : buyNowLabel}
      </button>
    </div>

    <style jsx>{`
      .sticky-buy-bar {
        position: fixed;
        left: 50%;
        bottom: 22px;
        transform: translateX(-50%);

        width: min(900px, calc(100vw - 32px));

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 18px;

        padding: 18px 22px;

        border: 1px solid rgba(255,255,255,.12);
        border-radius: 22px;

        background: rgba(18,18,18,.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        box-shadow:
          0 24px 70px rgba(0,0,0,.35);

        z-index: 9998;
      }

      .sticky-buy-info{
        min-width:0;
      }

      .sticky-buy-info p{
        margin:0;

        color:#ffffff;

        font-size:14px;
        font-weight:600;

        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .sticky-buy-info strong{
        display:block;
        margin-top:4px;

        color:white;

        font-size:22px;
        font-weight:700;
      }

      button{
        height:52px;

        padding:0 28px;

        border:none;
        border-radius:999px;

        background:white;
        color:#111;

        font-size:14px;
        font-weight:700;

        cursor:pointer;

        transition:.25s;
      }

      button:hover:not(:disabled){
        transform:translateY(-2px);
      }

      button:disabled{
        opacity:.6;
        cursor:wait;
      }

      @media(max-width:700px){

        .sticky-buy-bar{
          left:0;
          right:0;
          bottom:0;

          width:100%;

          transform:none;

          border-radius:22px 22px 0 0;

          padding:16px;
        }

        .sticky-buy-info p{
          font-size:12px;
        }

        .sticky-buy-info strong{
          font-size:18px;
        }

        button{
          padding:0 22px;
        }
      }
    `}</style>
  </>
);
}