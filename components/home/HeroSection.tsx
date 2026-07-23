"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type HeroSectionProps = {
  isMobile: boolean;
  scrollY: number;
};

export default function HeroSection({
  isMobile,
  scrollY,
}: HeroSectionProps) {
  const router = useRouter();

  const backgroundMovement = isMobile
    ? 0
    : Math.min(scrollY * 0.12, 80);

  const contentMovement = isMobile
    ? 0
    : Math.min(scrollY * 0.035, 24);

  return (
    <section className="hero-section">
      <div
        className="hero-background"
        style={{
          transform: `translate3d(0, ${backgroundMovement}px, 0) scale(1.04)`,
        }}
      >
        <Image
          src="/hero-premium.jpg"
          alt="Material deportivo premium en ATHMOV"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />

        <div className="hero-overlay" />
        <div className="hero-light hero-light-top" />
        <div className="hero-light hero-light-bottom" />
      </div>

      <div
        className="hero-content"
        style={{
          transform: `translate3d(0, ${contentMovement}px, 0)`,
        }}
      >
        <div className="hero-eyebrow-row">
          <span className="hero-eyebrow-line" />

          <p className="hero-eyebrow">
            ATHMOV · PREMIUM SECOND HAND
          </p>
        </div>

        <h1 className="hero-title">
          <span>Luxury sports.</span>
          <span className="hero-title-secondary">Second hand.</span>
        </h1>

        <p className="hero-description">
          Compra y vende material deportivo premium de segunda mano
          con vendedores verificados, pagos seguros y protección al
          comprador.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="hero-button hero-button-primary"
            onClick={() => router.push("/products")}
          >
            <span>Explorar material</span>
            <span className="hero-button-arrow">↗</span>
          </button>

          <button
            type="button"
            className="hero-button hero-button-secondary"
            onClick={() => router.push("/sell")}
          >
            Vender en ATHMOV
          </button>
        </div>

        <div className="hero-trust">
          <div className="hero-trust-item">
            <span className="hero-trust-icon">✓</span>

            <div>
              <strong>Pagos seguros</strong>
              <small>Operaciones protegidas</small>
            </div>
          </div>

          <div className="hero-trust-item">
            <span className="hero-trust-icon">✓</span>

            <div>
              <strong>Vendedores verificados</strong>
              <small>Más confianza al comprar</small>
            </div>
          </div>

          <div className="hero-trust-item">
            <span className="hero-trust-icon">✓</span>

            <div>
              <strong>Protección al comprador</strong>
              <small>Compra con tranquilidad</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span />
        Descubre ATHMOV
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          display: flex;
          min-height: 88vh;
          align-items: center;
          overflow: hidden;
          margin-bottom: 54px;
          padding: 140px 90px 92px;
          border-radius: 0 0 64px 64px;
          background: #0b0b0b;
          box-shadow: 0 60px 160px rgba(0, 0, 0, 0.25);
          isolation: isolate;
        }

        .hero-background {
          position: absolute;
          inset: -5% 0;
          z-index: 0;
          will-change: transform;
          transition: transform 80ms linear;
        }

        .hero-background :global(.hero-image) {
          object-fit: cover;
          object-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              rgba(4, 4, 4, 0.92) 0%,
              rgba(4, 4, 4, 0.79) 32%,
              rgba(4, 4, 4, 0.46) 62%,
              rgba(4, 4, 4, 0.1) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.5) 0%,
              transparent 42%
            );
        }

        .hero-light {
          position: absolute;
          z-index: 2;
          border-radius: 999px;
          pointer-events: none;
        }

        .hero-light-top {
          top: -200px;
          right: -120px;
          width: 620px;
          height: 620px;
          background: rgba(255, 255, 255, 0.11);
          filter: blur(140px);
        }

        .hero-light-bottom {
          bottom: -220px;
          left: 15%;
          width: 520px;
          height: 520px;
          background: rgba(194, 164, 88, 0.08);
          filter: blur(150px);
        }

        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 860px;
          color: #ffffff;
          will-change: transform;
        }

        .hero-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          opacity: 0;
          animation: heroReveal 700ms ease forwards;
        }

        .hero-eyebrow-line {
          width: 38px;
          height: 1px;
          background: rgba(255, 255, 255, 0.48);
        }

        .hero-eyebrow {
          margin: 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          margin: 0;
          color: #ffffff;
          font-size: clamp(68px, 8.5vw, 128px);
          font-weight: 800;
          line-height: 0.86;
          letter-spacing: -0.075em;
          text-wrap: balance;
          text-shadow: 0 24px 70px rgba(0, 0, 0, 0.4);
        }

        .hero-title span {
          display: block;
          opacity: 0;
          transform: translateY(34px);
          animation: heroTitleReveal 850ms
            cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .hero-title-secondary {
          color: rgba(255, 255, 255, 0.72);
          animation-delay: 100ms !important;
        }

        .hero-description {
          max-width: 650px;
          margin: 34px 0 0;
          color: rgba(255, 255, 255, 0.76);
          font-size: clamp(17px, 1.55vw, 22px);
          font-weight: 450;
          line-height: 1.6;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transform: translateY(22px);
          animation: heroReveal 750ms ease 220ms forwards;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 38px;
          opacity: 0;
          transform: translateY(22px);
          animation: heroReveal 750ms ease 340ms forwards;
        }

        .hero-button {
          display: inline-flex;
          min-height: 58px;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 0 30px;
          border-radius: 999px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 250ms ease,
            background 250ms ease,
            border-color 250ms ease,
            box-shadow 250ms ease;
        }

        .hero-button-primary {
          border: 1px solid #ffffff;
          background: #ffffff;
          color: #111111;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
        }

        .hero-button-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.3);
        }

        .hero-button-arrow {
          font-size: 18px;
          font-weight: 400;
          transition: transform 250ms ease;
        }

        .hero-button-primary:hover .hero-button-arrow {
          transform: translate(3px, -3px);
        }

        .hero-button-secondary {
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .hero-button-secondary:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.13);
        }

        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 26px;
          margin-top: 52px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.13);
          opacity: 0;
          animation: heroReveal 750ms ease 480ms forwards;
        }

        .hero-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .hero-trust-icon {
          display: grid;
          flex: 0 0 auto;
          width: 24px;
          height: 24px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.09);
          color: #ffffff;
          font-size: 11px;
        }

        .hero-trust-item div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hero-trust-item strong {
          color: #ffffff;
          font-size: 12px;
          font-weight: 650;
        }

        .hero-trust-item small {
          color: rgba(255, 255, 255, 0.46);
          font-size: 10px;
          font-weight: 450;
        }

        .hero-scroll-indicator {
          position: absolute;
          right: 40px;
          bottom: 42px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        .hero-scroll-indicator span {
          width: 1px;
          height: 44px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.22);
        }

        @keyframes heroTitleReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            min-height: 780px;
            padding: 130px 48px 70px;
            border-radius: 0 0 46px 46px;
          }

          .hero-title {
            font-size: clamp(66px, 11vw, 94px);
          }

          .hero-scroll-indicator {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .hero-section {
            min-height: auto;
            align-items: flex-start;
            margin-bottom: 34px;
            padding: 118px 22px 46px;
            border-radius: 0 0 34px 34px;
          }

          .hero-background {
            inset: 0;
            transform: none !important;
          }

          .hero-background :global(.hero-image) {
            object-position: 61% center;
          }

          .hero-overlay {
            background:
              linear-gradient(
                180deg,
                rgba(4, 4, 4, 0.55) 0%,
                rgba(4, 4, 4, 0.72) 35%,
                rgba(4, 4, 4, 0.96) 100%
              ),
              linear-gradient(
                90deg,
                rgba(4, 4, 4, 0.65),
                rgba(4, 4, 4, 0.16)
              );
          }

          .hero-content {
            transform: none !important;
          }

          .hero-eyebrow-row {
            margin-bottom: 20px;
          }

          .hero-eyebrow-line {
            width: 25px;
          }

          .hero-eyebrow {
            font-size: 9px;
            letter-spacing: 0.22em;
          }

          .hero-title {
            font-size: clamp(48px, 15vw, 68px);
            line-height: 0.92;
            letter-spacing: -0.065em;
          }

          .hero-description {
            margin-top: 26px;
            font-size: 16px;
            line-height: 1.55;
          }

          .hero-actions {
            display: grid;
            width: 100%;
            margin-top: 30px;
          }

          .hero-button {
            width: 100%;
            min-height: 56px;
          }

          .hero-trust {
            display: grid;
            gap: 16px;
            margin-top: 34px;
            padding-top: 24px;
          }

          .hero-trust-item small {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-background {
            transform: none !important;
            transition: none;
          }

          .hero-content {
            transform: none !important;
          }

          .hero-eyebrow-row,
          .hero-title span,
          .hero-description,
          .hero-actions,
          .hero-trust {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .hero-button,
          .hero-button-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}