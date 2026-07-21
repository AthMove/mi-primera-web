"use client";

interface DividerProps {
  label?: string;
  spacing?: "small" | "medium" | "large";
}

export default function Divider({
  label,
  spacing = "medium",
}: DividerProps) {
  return (
    <div className={`divider divider-${spacing}`}>
      <span className="divider-line" />

      {label && <span className="divider-label">{label}</span>}

      <span className="divider-line" />

      <style jsx>{`
        .divider {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 16px;
        }

        .divider-small {
          margin: 24px 0;
        }

        .divider-medium {
          margin: 40px 0;
        }

        .divider-large {
          margin: 64px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 0, 0, 0.12),
            transparent
          );
        }

        .divider-label {
          color: rgba(17, 17, 17, 0.42);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .divider-small {
            margin: 20px 0;
          }

          .divider-medium {
            margin: 32px 0;
          }

          .divider-large {
            margin: 48px 0;
          }

          .divider {
            gap: 12px;
          }

          .divider-label {
            font-size: 9px;
            letter-spacing: 1.8px;
          }
        }
      `}</style>
    </div>
  );
}