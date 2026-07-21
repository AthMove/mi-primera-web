"use client";

import type { HTMLAttributes, ReactNode } from "react";

interface PremiumBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "success";
  size?: "small" | "medium";
}

export default function PremiumBadge({
  children,
  variant = "light",
  size = "medium",
  className = "",
  ...props
}: PremiumBadgeProps) {
  return (
    <span
      className={`premium-badge premium-badge-${variant} premium-badge-${size} ${className}`}
      {...props}
    >
      {children}

      <style jsx>{`
        .premium-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          border-radius: 999px;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
        }

        .premium-badge-small {
          min-height: 28px;
          padding: 7px 11px;
          font-size: 9px;
          letter-spacing: 1.1px;
        }

        .premium-badge-medium {
          min-height: 34px;
          padding: 9px 14px;
          font-size: 10px;
          letter-spacing: 1.3px;
        }

        .premium-badge-dark {
          border: 1px solid #111;
          background: #111;
          color: #fff;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }

        .premium-badge-light {
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.9);
          color: #111;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .premium-badge-outline {
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: transparent;
          color: #111;
        }

        .premium-badge-success {
          border: 1px solid rgba(19, 120, 68, 0.12);
          background: rgba(219, 247, 230, 0.94);
          color: #137844;
          box-shadow: 0 10px 28px rgba(19, 120, 68, 0.08);
        }

        @media (max-width: 700px) {
          .premium-badge-medium {
            min-height: 32px;
            padding: 8px 12px;
          }
        }
      `}</style>
    </span>
  );
}