"use client";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "12px",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      <style jsx>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.07);
        }

        .skeleton::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            transparent 20%,
            rgba(255, 255, 255, 0.7) 50%,
            transparent 80%
          );
          content: "";
          transform: translateX(-100%);
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}