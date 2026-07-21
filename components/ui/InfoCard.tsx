"use client";

import type { ReactNode } from "react";

type InfoCardVariant = "default" | "accent" | "success";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  variant?: InfoCardVariant;
  compact?: boolean;
  className?: string;
};

export default function InfoCard({
  icon,
  title,
  description,
  variant = "default",
  compact = false,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={[
        "info-card",
        `info-card-${variant}`,
        compact ? "info-card-compact" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="info-card-icon">{icon}</div>

      <div className="info-card-content">
        <strong>{title}</strong>

        {description && <p>{description}</p>}
      </div>

      <style jsx>{`
        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          width: 100%;
          padding: 18px;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 20px;
          background: #fafaf8;
        }

        .info-card-accent {
          border-left: 3px solid #111111;
        }

        .info-card-success {
          background: linear-gradient(
            145deg,
            rgba(244, 250, 246, 0.96),
            rgba(248, 250, 247, 0.96)
          );
        }

        .info-card-compact {
          gap: 11px;
          padding: 14px;
          border-radius: 16px;
        }

        .info-card-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 50%;
          background: #ffffff;
          color: #111111;
          font-size: 20px;
          line-height: 1;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
        }

        .info-card-accent .info-card-icon {
          background: #111111;
          color: #ffffff;
        }

        .info-card-success .info-card-icon {
          background: rgba(40, 180, 99, 0.12);
          color: #18854a;
          box-shadow: none;
        }

        .info-card-content {
          min-width: 0;
        }

        .info-card-content strong {
          display: block;
          color: #111111;
          font-size: 14px;
          font-weight: 650;
          line-height: 1.35;
        }

        .info-card-content p {
          margin: 5px 0 0;
          color: #6d6d6d;
          font-size: 12px;
          line-height: 1.55;
        }

        .info-card-compact .info-card-icon {
          width: 32px;
          height: 32px;
          font-size: 17px;
        }

        .info-card-compact .info-card-content strong {
          font-size: 13px;
        }

        .info-card-compact .info-card-content p {
          font-size: 11px;
        }
      `}</style>
    </div>
  );
}