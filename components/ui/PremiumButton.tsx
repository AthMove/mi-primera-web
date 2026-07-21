"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PremiumButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  fullWidth?: boolean;
}

export default function PremiumButton({
  children,
  variant = "dark",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: PremiumButtonProps) {
  return (
    <button
      type={type}
      className={`premium-button premium-button-${variant} ${
        fullWidth ? "premium-button-full" : ""
      } ${className}`}
      {...props}
    >
      <span>{children}</span>

      <style jsx>{`
        .premium-button {
          position: relative;
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 14px 24px;
          border-radius: 999px;
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.15px;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .premium-button::before {
          position: absolute;
          top: 0;
          left: -130%;
          width: 90%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent
          );
          content: "";
          transform: skewX(-20deg);
          transition: left 0.55s ease;
        }

        .premium-button:hover::before {
          left: 150%;
        }

        .premium-button:hover {
          transform: translateY(-2px);
        }

        .premium-button:active {
          transform: translateY(0) scale(0.98);
        }

        .premium-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
          transform: none;
        }

        .premium-button span {
          position: relative;
          z-index: 1;
        }

        .premium-button-dark {
          border: 1px solid #111;
          background: #111;
          color: #fff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.16);
        }

        .premium-button-dark:hover {
          background: #242424;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.22);
        }

        .premium-button-light {
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: #fff;
          color: #111;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
        }

        .premium-button-light:hover {
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.13);
        }

        .premium-button-outline {
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: transparent;
          color: #111;
          box-shadow: none;
        }

        .premium-button-outline:hover {
          border-color: rgba(0, 0, 0, 0.28);
          background: rgba(0, 0, 0, 0.04);
        }

        .premium-button-full {
          width: 100%;
        }

        @media (max-width: 700px) {
          .premium-button {
            min-height: 46px;
            padding: 13px 20px;
          }

          .premium-button:hover {
            transform: none;
          }
        }
      `}</style>
    </button>
  );
}