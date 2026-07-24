"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

type SoldProduct = {
  id: string;
  title?: string;
  category?: string;
  price?: number;
  location?: string;
  image?: string;
  images?: string[];
  created_at?: string;
};

interface Props {
  soldProducts: SoldProduct[];
  loading: boolean;
}



export default function RecentlySoldSection({
  soldProducts,
  loading,
}: Props) {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const safeImage = (product: SoldProduct) => {
  if (product.images?.length) {
    return product.images[0];
  }

  if (product.image) {
    return product.image;
  }

  return "/placeholder-product.jpg";
};

const getSoldText = (date?: string) => {
  if (!date) return "Vendido recientemente";

  const createdDate = new Date(date);
  const now = new Date();

  const difference = now.getTime() - createdDate.getTime();
  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Vendido recientemente";
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours} h`;
  if (days === 1) return "Hace 1 día";

  return `Hace ${days} días`;
};

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
        threshold: 0.05,
        rootMargin: "0px 0px 120px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);

    if (loading) {
  return null;
}

if (!soldProducts.length) {
  return null;
}

  return (
    <>
      <section
        ref={sectionRef}
        className={`recently-sold-section ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="recently-sold-top">
          <div className="recently-sold-heading">
            <div className="recently-sold-eyebrow-row">
              <span className="recently-sold-line" />

              <p className="recently-sold-eyebrow">
                Actividad ATHMOV
              </p>
            </div>

            <h2 className="recently-sold-title">
              Recently
              <br />
              sold.
            </h2>

            <p className="recently-sold-description">
              El mejor material deportivo encuentra rápidamente una
              nueva historia.
            </p>
          </div>

          <div className="recently-sold-summary">
            <span className="recently-sold-summary-number">
              {String(soldProducts.slice(0, 3).length).padStart(2, "0")}
            </span>

            <p>
              Productos premium vendidos recientemente dentro de la
              comunidad ATHMOV.
            </p>
          </div>
        </div>

        <div className="recently-sold-list">
         {soldProducts.slice(0, 3).map((product, index) => (
            <article
              key={product.id}
              className="recently-sold-item"
              style={
                {
                  "--sold-delay": `${index * 110}ms`,
                } as CSSProperties
              }
            >
              <div className="recently-sold-image-wrap">
                <img
                  src={safeImage(product)}
                  alt={product.title || "Producto vendido"}
                  className="recently-sold-image"
                />

                <span className="recently-sold-position">
                  0{index + 1}
                </span>

                <span className="recently-sold-badge">
                  <span className="recently-sold-badge-dot" />
                  Vendido
                </span>
              </div>

              <div className="recently-sold-content">
                <div className="recently-sold-content-top">
                  <div>
                    <p className="recently-sold-category">
                      {product.category || "Material deportivo"}
                    </p>

                    <h3>{product.title || "Producto premium"}</h3>
                  </div>

                  <strong>
                    {formatPrice(Number(product.price || 0))}
                  </strong>
                </div>

                <div className="recently-sold-meta">
                  <span>{product.location || "España"}</span>
                  <span className="recently-sold-meta-dot" />
                  <span>{getSoldText(product.created_at)}</span>
                </div>

                <div className="recently-sold-result">
                  <span className="recently-sold-check">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>

                  <div>
                    <span>Resultado</span>
                    <strong>Producto vendido</strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="recently-sold-footer">
          <div>
            <span className="recently-sold-footer-label">
              Sell faster
            </span>

            <p>
              Publica tu material premium y encuentra a su próximo
              propietario.
            </p>
          </div>

          <button
            type="button"
            className="recently-sold-link"
            onClick={() => router.push("/sell")}
          >
            <span>Empieza a vender</span>

            <span className="recently-sold-link-circle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <style jsx global>{`
        .recently-sold-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 42px;
          padding: 82px 60px 52px;
          overflow: hidden;
          border-radius: 42px;
          background: #111111;
          color: #ffffff;
          box-shadow: 0 32px 100px rgba(0, 0, 0, 0.12);
          isolation: isolate;
        }

        .recently-sold-section::before {
          position: absolute;
          top: -230px;
          right: -160px;
          width: 620px;
          height: 620px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .recently-sold-section::after {
          position: absolute;
          top: -120px;
          right: -45px;
          width: 380px;
          height: 380px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .recently-sold-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 50px;
          margin-bottom: 58px;
          opacity: 0;
          transform: translateY(26px);
          transition:
            opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .recently-sold-section.is-visible
          .recently-sold-top {
          opacity: 1;
          transform: translateY(0);
        }

        .recently-sold-heading {
          max-width: 740px;
        }

        .recently-sold-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 20px;
        }

        .recently-sold-line {
          width: 38px;
          height: 1px;
          background: rgba(255, 255, 255, 0.58);
        }

        .recently-sold-eyebrow {
          margin: 0;
          color: rgba(255, 255, 255, 0.56);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .recently-sold-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(56px, 6vw, 88px);
          font-weight: 430;
          line-height: 0.86;
          letter-spacing: -0.065em;
        }

        .recently-sold-description {
          max-width: 530px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.58);
          font-size: 16px;
          line-height: 1.65;
        }

        .recently-sold-summary {
          max-width: 270px;
          padding-bottom: 7px;
        }

        .recently-sold-summary-number {
          display: block;
          margin-bottom: 14px;
          color: rgba(255, 255, 255, 0.23);
          font-size: 52px;
          font-weight: 450;
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .recently-sold-summary p {
          margin: 0;
          color: rgba(255, 255, 255, 0.48);
          font-size: 12px;
          line-height: 1.65;
        }

        .recently-sold-list {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 18px;
        }

        .recently-sold-item {
          display: grid;
          grid-template-columns: minmax(240px, 0.72fr) 1fr;
          min-height: 310px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.045);
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 720ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            background 300ms ease;
          transition-delay: var(--sold-delay);
        }

        .recently-sold-section.is-visible
          .recently-sold-item {
          opacity: 1;
          transform: translateY(0);
        }

        .recently-sold-item:hover {
          border-color: rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.065);
        }

        .recently-sold-image-wrap {
          position: relative;
          min-height: 310px;
          overflow: hidden;
          background: #efefec;
        }

        .recently-sold-image {
          width: 100%;
          height: 100%;
          min-height: 310px;
          object-fit: cover;
          filter: saturate(0.88);
          transition:
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 400ms ease;
        }

        .recently-sold-item:hover
          .recently-sold-image {
          transform: scale(1.035);
          filter: saturate(1);
        }

        .recently-sold-position {
          position: absolute;
          top: 20px;
          left: 20px;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 1px solid rgba(17, 17, 17, 0.09);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.78);
          color: #111111;
          font-size: 10px;
          font-weight: 700;
          backdrop-filter: blur(12px);
        }

        .recently-sold-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          padding: 0 14px;
          border-radius: 999px;
          background: #111111;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
        }

        .recently-sold-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.12);
        }

        .recently-sold-content {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          padding: 42px;
        }

        .recently-sold-content-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 30px;
        }

        .recently-sold-category {
          margin: 0 0 13px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .recently-sold-content h3 {
          max-width: 530px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(26px, 3vw, 42px);
          font-weight: 450;
          line-height: 1.02;
          letter-spacing: -0.048em;
        }

        .recently-sold-content-top > strong {
          flex: 0 0 auto;
          color: #ffffff;
          font-size: 18px;
          font-weight: 550;
          letter-spacing: -0.025em;
        }

        .recently-sold-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
        }

        .recently-sold-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
        }

        .recently-sold-result {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 34px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
        }

        .recently-sold-check {
          display: grid;
          flex: 0 0 38px;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
        }

        .recently-sold-check svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .recently-sold-result div {
          display: grid;
          gap: 4px;
        }

        .recently-sold-result div span {
          color: rgba(255, 255, 255, 0.38);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .recently-sold-result div strong {
          color: rgba(255, 255, 255, 0.82);
          font-size: 12px;
          font-weight: 550;
        }

        .recently-sold-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-top: 38px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 650ms ease 380ms,
            transform 650ms ease 380ms;
        }

        .recently-sold-section.is-visible
          .recently-sold-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .recently-sold-footer-label {
          display: block;
          margin-bottom: 7px;
          color: rgba(255, 255, 255, 0.36);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .recently-sold-footer p {
          margin: 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 13px;
          line-height: 1.5;
        }

        .recently-sold-link {
          display: inline-flex !important;
          flex: 0 0 auto;
          flex-direction: row !important;
          align-items: center !important;
          gap: 16px;
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
          color: #ffffff !important;
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          font-weight: 650;
          white-space: nowrap;
        }

        .recently-sold-link-circle {
          display: inline-flex !important;
          flex: 0 0 46px;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #ffffff;
          color: #111111;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .recently-sold-link-circle svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .recently-sold-link:hover
          .recently-sold-link-circle {
          transform: translateX(5px);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.14);
        }

        @media (max-width: 900px) {
          .recently-sold-section {
            padding: 62px 30px 38px;
            border-radius: 32px;
          }

          .recently-sold-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .recently-sold-summary {
            display: none;
          }

          .recently-sold-item {
            grid-template-columns: 1fr;
          }

          .recently-sold-image-wrap,
          .recently-sold-image {
            min-height: 370px;
          }
        }

        @media (max-width: 600px) {
          .recently-sold-section {
            margin-bottom: 26px;
            padding: 50px 20px 30px;
            border-radius: 28px;
          }

          .recently-sold-top {
            margin-bottom: 34px;
          }

          .recently-sold-title {
            font-size: 52px;
          }

          .recently-sold-description {
            margin-top: 21px;
            font-size: 14px;
          }

          .recently-sold-image-wrap,
          .recently-sold-image {
            min-height: 310px;
          }

          .recently-sold-content {
            padding: 28px 24px;
          }

          .recently-sold-content-top {
            flex-direction: column;
            gap: 14px;
          }

          .recently-sold-content h3 {
            font-size: 30px;
          }

          .recently-sold-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .recently-sold-link {
            gap: 12px;
            font-size: 12px;
          }

          .recently-sold-link-circle {
            flex-basis: 42px;
            width: 42px;
            height: 42px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .recently-sold-top,
          .recently-sold-item,
          .recently-sold-footer {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}