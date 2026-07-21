"use client";

import Image from "next/image";
import PremiumButton from "@/components/ui/PremiumButton";

interface Seller {
  avatar_url?: string;
  seller_verified?: boolean;
  seller_badge?: string;
  seller_level?: string;
  bio?: string;
  location?: string;
  response_time?: string;
  created_at?: string;
}

interface SellerHeroProps {
  seller: Seller | null;
  sellerName: string;
  sellerId: string;
  averageRating: string;
  isFollowing: boolean;
  scrollY: number;
  safeImage: (src?: string) => string;
  onFollow: () => void;
  onShare: () => void;
  onLeaveReview: () => void;
  verifiedSellerText: string;
  verifiedLabel: string;
  sellerLabel: string;
  trustedMarketplaceText: string;
  defaultSellerBio: string;
  responseTimeText: string;
  memberSinceText: string;
  leaveReviewText: string;
}

export default function SellerHero({
  seller,
  sellerName,
  averageRating,
  isFollowing,
  scrollY,
  safeImage,
  onFollow,
  onShare,
  onLeaveReview,
  verifiedSellerText,
  verifiedLabel,
  sellerLabel,
  trustedMarketplaceText,
  defaultSellerBio,
  responseTimeText,
  memberSinceText,
  leaveReviewText,
}: SellerHeroProps) {
  const sellerLevel = (
    seller?.seller_badge ||
    seller?.seller_level ||
    "new"
  )
    .toString()
    .toUpperCase();

  const memberYear = seller?.created_at
    ? new Date(seller.created_at).getFullYear()
    : "2025";

  return (
    <section
      className="seller-hero"
      style={{
        backgroundPosition: `center ${scrollY * 0.18}px`,
      }}
    >
      <div className="hero-light" />
      <div className="hero-overlay" />

      <div className="avatar-wrapper">
        <div className="avatar">
          <Image
            src={safeImage(seller?.avatar_url)}
            alt={sellerName}
            fill
            sizes="190px"
          />
        </div>

        {seller?.seller_verified && (
          <div className="verified-circle">✓</div>
        )}
      </div>

      <div className="hero-content">
        <p className="eyebrow">{verifiedSellerText}</p>

        <h1>{sellerName}</h1>

        <div className="badges">
          {seller?.seller_verified && (
            <span className="verified-badge">
              {verifiedLabel}
            </span>
          )}

          <span className="level-badge">
            {sellerLevel} {sellerLabel}
          </span>

          <span className="trust-badge">
            {trustedMarketplaceText}
          </span>
        </div>

  <div className="hero-actions">
  <PremiumButton
    variant={isFollowing ? "outline" : "dark"}
    onClick={onFollow}
  >
    {isFollowing ? "Siguiendo" : "Seguir vendedor"}
  </PremiumButton>

  <PremiumButton
    variant="light"
    onClick={onShare}
  >
    Compartir perfil
  </PremiumButton>
</div>

        <p className="bio">
          {seller?.bio || defaultSellerBio}
        </p>

        <PremiumButton
  variant="light"
  onClick={onLeaveReview}
>
  {leaveReviewText}
</PremiumButton>

        <div className="info-row">
          <div className="info-card">
            <p>Ubicación</p>
            <strong>{seller?.location || "España"}</strong>
          </div>

          <div className="info-card">
            <p>{responseTimeText}</p>
            <strong>{seller?.response_time || "< 1 hora"}</strong>
          </div>

          <div className="info-card">
            <p>{memberSinceText}</p>
            <strong>{memberYear}</strong>
          </div>

          <div className="info-card">
            <p>Valoración</p>
            <strong>★ {averageRating}</strong>
          </div>
        </div>
      </div>

      <style jsx>{`
        .seller-hero {
          position: relative;
          display: flex;
          max-width: 1280px;
          min-height: 520px;
          align-items: center;
          justify-content: space-between;
          gap: 34px;
          margin: 0 auto;
          padding: 60px;
          overflow: visible;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 42px;
          background:
            linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.58)
            ),
            url("/seller-cover.png");
          background-size: cover;
          background-repeat: no-repeat;
          box-shadow: 0 45px 120px rgba(0, 0, 0, 0.25);
          color: #fff;
          backdrop-filter: blur(18px);
          animation: float-up 0.7s ease;
        }

        .hero-light {
          position: absolute;
          top: -180px;
          right: -120px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.22),
            transparent 70%
          );
          filter: blur(40px);
          pointer-events: none;
        }

        .hero-overlay {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 220px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.72),
            transparent
          );
          pointer-events: none;
        }

        .avatar-wrapper {
          position: relative;
          z-index: 2;
        }

        .avatar {
          position: relative;
          z-index: 3;
          width: 190px;
          height: 190px;
          overflow: hidden;
          border: 8px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: #fff;
          box-shadow:
            0 35px 90px rgba(0, 0, 0, 0.45),
            0 0 0 10px rgba(255, 255, 255, 0.06);
          transform: translateY(70px);
          transition: transform 0.35s ease;
        }

        .avatar :global(img) {
          object-fit: cover;
          padding: 4px;
          background: #fff;
          transition: transform 0.5s ease;
        }

        .seller-hero:hover .avatar :global(img) {
          transform: scale(1.04);
        }

        .verified-circle {
          position: absolute;
          right: 4px;
          bottom: 4px;
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #fff;
          color: #111;
          font-weight: 900;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .eyebrow {
          margin: 0 0 12px;
          font-size: 11px;
          letter-spacing: 3px;
          opacity: 0.5;
        }

        h1 {
          margin: 0;
          font-size: 76px;
          font-weight: 950;
          line-height: 1;
          letter-spacing: -5px;
          text-transform: capitalize;
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .badges span {
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
        }

        .verified-badge {
          background: #fff;
          color: #111;
        }

        .level-badge {
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .trust-badge {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .hero-actions button,
        .review-button {
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }

        .hero-actions button:hover,
        .review-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        }

        .bio {
          max-width: 700px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.8;
        }

        .info-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 26px;
        }

        .info-card {
          flex: 1;
          min-width: 170px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
        }

        .info-card p {
          margin: 0 0 6px;
          font-size: 10px;
          letter-spacing: 2px;
          opacity: 0.5;
        }

        .info-card strong {
          font-size: 14px;
        }

        @keyframes float-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .seller-hero {
            flex-direction: column;
            align-items: flex-start;
            padding: 42px;
          }

          .avatar {
            transform: none;
          }
        }

        @media (max-width: 700px) {
          .seller-hero {
            min-height: auto;
            gap: 24px;
            padding: 34px 22px 60px;
            border-radius: 30px;
            background-position: center !important;
          }

          .avatar {
            width: 130px;
            height: 130px;
            border-width: 5px;
          }

          h1 {
            overflow-wrap: anywhere;
            font-size: 44px;
            line-height: 1;
            letter-spacing: -2px;
          }

          .hero-actions {
            width: 100%;
          }

          .hero-actions button {
            flex: 1;
            min-width: 145px;
          }

          .info-row {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .info-card {
            min-width: 0;
          }

          .hero-actions button:hover,
          .review-button:hover {
            transform: none;
          }
        }

        @media (max-width: 430px) {
          .info-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}