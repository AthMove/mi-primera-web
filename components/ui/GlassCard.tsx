"use client";

import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "small" | "medium" | "large";
  hover?: boolean;
}

export default function GlassCard({
  children,
  padding = "medium",
  hover = true,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`glass-card glass-card-${padding} ${
        hover ? "glass-card-hover" : ""
      } ${className}`}
      {...props}
    >
      <div className="glass-card-light" />

      <div className="glass-card-content">{children}</div>

      <style jsx>{`
        .glass-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.72);
          box-shadow:
            0 18px 60px rgba(0, 0, 0, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .glass-card-small {
          padding: 18px;
        }

        .glass-card-medium {
          padding: 26px;
        }

        .glass-card-large {
          padding: 36px;
        }

        .glass-card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow:
            0 28px 85px rgba(0, 0, 0, 0.11),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .glass-card-light {
          position: absolute;
          top: -70px;
          right: -70px;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.75),
            transparent 68%
          );
          filter: blur(8px);
          pointer-events: none;
        }

        .glass-card-content {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 700px) {
          .glass-card {
            border-radius: 24px;
          }

          .glass-card-small {
            padding: 16px;
          }

          .glass-card-medium {
            padding: 22px;
          }

          .glass-card-large {
            padding: 28px;
          }

          .glass-card-hover:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}