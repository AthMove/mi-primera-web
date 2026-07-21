"use client";

import GlassCard from "./GlassCard";

interface Props {
  label: string;
  value: React.ReactNode;
  subtitle?: string;
}

export default function PremiumStatCard({
  label,
  value,
  subtitle,
}: Props) {
  return (
    <GlassCard padding="small">
      <div className="stat">
        <small>{label}</small>

        <strong>{value}</strong>

        {subtitle && <span>{subtitle}</span>}
      </div>

      <style jsx>{`
        .stat {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 86px;
          gap: 8px;
        }

        small {
          color: #8b8b8b;
          font-size: 10px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          font-weight: 700;
        }

        strong {
          font-size: 28px;
          line-height: 1;
          color: #111;
          letter-spacing: -1px;
        }

        span {
          color: #6b7280;
          font-size: 13px;
          font-weight: 500;
        }
      `}</style>
    </GlassCard>
  );
}