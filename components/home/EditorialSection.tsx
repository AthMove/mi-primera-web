"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

export default function EditorialSection({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const editorialItems = [
    {
      number: "01",
      title: "Solo material premium",
      description:
        "Productos seleccionados para deportistas que valoran la calidad.",
    },
    {
      number: "02",
      title: "Compra protegida",
      description:
        "Verificación, pagos seguros y protección durante todo el proceso.",
    },
    {
      number: "03",
      title: "Comunidad deportiva",
      description:
        "Pádel, golf, tenis y running reunidos en un mismo lugar.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`editorial-section ${
        isMobile ? "is-mobile" : ""
      } ${isVisible ? "is-visible" : ""}`}
    >
      <div className="editorial-decoration" />

      <div className="editorial-left">
        <div className="editorial-eyebrow-row">
          <span className="editorial-eyebrow-line" />

          <p className="editorial-eyebrow">
            ATHMOV EDITORIAL
          </p>
        </div>

        <h2>
          El mejor material deportivo no debería terminar en un
          armario.
        </h2>

        <p className="editorial-description">
          En ATHMOV creemos que una pala, un driver o unas zapatillas
          premium todavía tienen muchas victorias por delante.
          Conectamos deportistas que cuidan su material con otros que
          buscan calidad sin pagar el precio de un producto nuevo.
        </p>

        <button
          type="button"
          className="editorial-button"
          onClick={() => router.push("/how-it-works")}
        >
          <span>Descubrir ATHMOV</span>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="editorial-right">
        {editorialItems.map((item, index) => (
          <article
            key={item.number}
            className="editorial-card"
            style={
              {
                "--editorial-delay": `${index * 110}ms`,
              } as CSSProperties
            }
          >
            <div className="editorial-card-header">
              <span>{item.number}</span>
              <span className="editorial-card-line" />
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        .editorial-section {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(360px, 0.82fr);
          gap: 80px;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 92px 60px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 92% 10%,
              rgba(255, 255, 255, 0.98),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              rgba(247, 247, 244, 0.98),
              rgba(237, 237, 232, 0.94)
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 100px rgba(0, 0, 0, 0.055);
          isolation: isolate;
        }

        .editorial-decoration {
          position: absolute;
          right: -170px;
          bottom: -230px;
          width: 520px;
          height: 520px;
          border: 1px solid rgba(17, 17, 17, 0.04);
          border-radius: 50%;
          pointer-events: none;
        }

        .editorial-decoration::after {
          position: absolute;
          inset: 80px;
          border: 1px solid rgba(17, 17, 17, 0.035);
          border-radius: inherit;
          content: "";
        }

        .editorial-left,
        .editorial-right {
          position: relative;
          z-index: 2;
        }

        .editorial-left {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .editorial-section.is-visible .editorial-left {
          opacity: 1;
          transform: translateY(0);
        }

        .editorial-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 22px;
        }

        .editorial-eyebrow-line {
          display: block;
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.55);
        }

        .editorial-eyebrow {
          margin: 0;
          color: #797979;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        h2 {
          max-width: 790px;
          margin: 0;
          color: #111111;
          font-size: clamp(52px, 6vw, 84px);
          font-weight: 430;
          line-height: 0.93;
          letter-spacing: -0.062em;
          text-wrap: balance;
        }

        .editorial-description {
          max-width: 620px;
          margin: 34px 0 0;
          color: #666666;
          font-size: 18px;
          line-height: 1.78;
          letter-spacing: -0.012em;
        }

        .editorial-button {
          display: inline-flex;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 40px;
          padding: 0 25px 0 28px;
          border: 1px solid #111111;
          border-radius: 999px;
          background: #111111;
          color: #ffffff;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.13);
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          font-weight: 650;
          transition:
            background 280ms ease,
            color 280ms ease,
            transform 280ms ease,
            box-shadow 280ms ease;
        }

        .editorial-button svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 280ms ease;
        }

        .editorial-button:hover {
          background: transparent;
          color: #111111;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .editorial-button:hover svg {
          transform: translateX(4px);
        }

        .editorial-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .editorial-card {
          position: relative;
          overflow: hidden;
          padding: 31px 32px 30px;
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 18px 50px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          opacity: 0;
          transform: translateY(26px);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 300ms ease,
            border-color 300ms ease;
          transition-delay: var(--editorial-delay);
        }

        .editorial-section.is-visible .editorial-card {
          opacity: 1;
          transform: translateY(0);
        }

        .editorial-card:hover {
          border-color: rgba(17, 17, 17, 0.12);
          transform: translateY(-6px);
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.03),
            0 26px 72px rgba(0, 0, 0, 0.09);
        }

        .editorial-card-header {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .editorial-card-header > span:first-child {
          color: #929292;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .editorial-card-line {
          width: 35px;
          height: 1px;
          background: rgba(17, 17, 17, 0.2);
        }

        .editorial-card h3 {
          margin: 20px 0 13px;
          color: #111111;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }

        .editorial-card p {
          max-width: 470px;
          margin: 0;
          color: #666666;
          font-size: 14px;
          line-height: 1.7;
        }

        .editorial-section.is-mobile {
          grid-template-columns: 1fr;
          gap: 42px;
          margin-bottom: 26px;
          padding: 54px 20px 30px;
          border-radius: 28px;
        }

        .is-mobile h2 {
          font-size: 44px;
          line-height: 0.98;
          letter-spacing: -0.052em;
        }

        .is-mobile .editorial-description {
          margin-top: 25px;
          font-size: 15px;
          line-height: 1.68;
        }

        .is-mobile .editorial-button {
          width: 100%;
          margin-top: 31px;
        }

        .is-mobile .editorial-card {
          padding: 26px;
          border-radius: 23px;
        }

        .is-mobile .editorial-card h3 {
          font-size: 25px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .editorial-section {
            grid-template-columns: 1fr 0.9fr;
            gap: 46px;
            padding: 70px 38px;
          }

          .editorial-description {
            font-size: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .editorial-left,
          .editorial-card {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .editorial-button,
          .editorial-button svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}