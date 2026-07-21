"use client";

import type { HTMLAttributes, ReactNode } from "react";

interface PremiumSectionProps
  extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  spacing?: "small" | "medium" | "large";
}

export default function PremiumSection({
  children,
  eyebrow,
  title,
  description,
  align = "left",
  spacing = "large",
  className = "",
  ...props
}: PremiumSectionProps) {
  return (
    <section
      className={`premium-section premium-section-${align} premium-section-${spacing} ${className}`}
      {...props}
    >
      {(eyebrow || title || description) && (
        <div className="premium-section-header">
          {eyebrow && (
            <p className="premium-section-eyebrow">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="premium-section-title">
              {title}
            </h2>
          )}

          {description && (
            <p className="premium-section-description">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="premium-section-content">
        {children}
      </div>

      <style jsx>{`
        .premium-section {
          width: 100%;
          max-width: 1280px;
          margin-right: auto;
          margin-left: auto;
        }

        .premium-section-small {
          margin-top: 48px;
        }

        .premium-section-medium {
          margin-top: 72px;
        }

        .premium-section-large {
          margin-top: 96px;
        }

        .premium-section-header {
          max-width: 760px;
          margin-bottom: 32px;
        }

        .premium-section-center .premium-section-header {
          margin-right: auto;
          margin-left: auto;
          text-align: center;
        }

        .premium-section-eyebrow {
          margin: 0 0 10px;
          color: rgba(17, 17, 17, 0.48);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.8px;
          text-transform: uppercase;
        }

        .premium-section-title {
          margin: 0;
          color: #111;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -3px;
        }

        .premium-section-description {
          max-width: 680px;
          margin: 18px 0 0;
          color: rgba(17, 17, 17, 0.58);
          font-size: 16px;
          line-height: 1.75;
        }

        .premium-section-center
          .premium-section-description {
          margin-right: auto;
          margin-left: auto;
        }

        .premium-section-content {
          width: 100%;
        }

        @media (max-width: 700px) {
          .premium-section-small {
            margin-top: 36px;
          }

          .premium-section-medium {
            margin-top: 52px;
          }

          .premium-section-large {
            margin-top: 68px;
          }

          .premium-section-header {
            margin-bottom: 24px;
          }

          .premium-section-title {
            font-size: 38px;
            letter-spacing: -2px;
          }

          .premium-section-description {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}