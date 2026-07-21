"use client";

import type { ReactNode } from "react";
import PremiumButton from "@/components/ui/PremiumButton";

interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  eyebrow,
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-glow" />

      <div className="empty-state-content">
        {icon && <div className="empty-state-icon">{icon}</div>}

        {eyebrow && (
          <p className="empty-state-eyebrow">{eyebrow}</p>
        )}

        <h3>{title}</h3>

        {description && (
          <p className="empty-state-description">
            {description}
          </p>
        )}

        {actionLabel && onAction && (
          <PremiumButton onClick={onAction}>
            {actionLabel}
          </PremiumButton>
        )}
      </div>

      <style jsx>{`
        .empty-state {
          position: relative;
          display: flex;
          min-height: 300px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 48px 28px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 30px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.94),
              rgba(245, 245, 241, 0.88)
            );
          box-shadow:
            0 20px 70px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          text-align: center;
        }

        .empty-state-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          width: 340px;
          height: 340px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95),
            transparent 70%
          );
          filter: blur(12px);
          transform: translateX(-50%);
          pointer-events: none;
        }

        .empty-state-content {
          position: relative;
          z-index: 1;
          display: flex;
          max-width: 560px;
          flex-direction: column;
          align-items: center;
        }

        .empty-state-icon {
          display: flex;
          width: 64px;
          height: 64px;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          font-size: 26px;
        }

        .empty-state-eyebrow {
          margin: 0 0 10px;
          color: rgba(17, 17, 17, 0.42);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.6px;
          text-transform: uppercase;
        }

        h3 {
          margin: 0;
          color: #111;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1;
          letter-spacing: -2px;
        }

        .empty-state-description {
          max-width: 500px;
          margin: 16px 0 24px;
          color: rgba(17, 17, 17, 0.58);
          font-size: 15px;
          line-height: 1.7;
        }

        @media (max-width: 700px) {
          .empty-state {
            min-height: 260px;
            padding: 38px 20px;
            border-radius: 24px;
          }

          h3 {
            font-size: 34px;
          }
        }
      `}</style>
    </div>
  );
}