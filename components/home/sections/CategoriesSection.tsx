"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useLanguage } from "@/components/LanguageProvider";

type CategoriesSectionProps = {
  isMobile: boolean;
};

export default function CategoriesSection({
  isMobile,
}: CategoriesSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    {
      title: "PÁDEL",
      text: "Palas y material premium",
      href: "/products?category=PADEL",
      image: "/padel.jpg",
    },
    {
      title: "GOLF",
      text: "Palos, bolsas y accesorios",
      href: "/products?category=GOLF",
      image: "/golf.jpg",
    },
    {
      title: "TENIS",
      text: "Raquetas y piezas de alto rendimiento",
      href: "/products?category=TENIS",
      image: "/tennis.jpg",
    },
    {
      title: "RUNNING",
      text: "Calzado técnico y ropa deportiva",
      href: "/products?category=RUNNING",
      image: "/running.jpg",
    },
  ];

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

    return () => observer.disconnect();
  }, []);

  const openCategory = (href: string) => {
    router.push(href);
  };

  const handleKeyboard = (
    event: KeyboardEvent<HTMLElement>,
    href: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCategory(href);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`categories-section ${
          isMobile ? "is-mobile" : ""
        } ${isVisible ? "is-visible" : ""}`}
      >
        <div className="categories-header">
          <div>
            <div className="categories-eyebrow-row">
              <span className="categories-line" />

              <p className="categories-eyebrow">
                {t.categories}
              </p>
            </div>

            <h2 className="categories-title">
              {t.exploreSports}
            </h2>
          </div>

          <button
            type="button"
            className="categories-view-all"
            onClick={() => router.push("/products")}
          >
            Ver todo

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="category-card"
              role="link"
              tabIndex={0}
              aria-label={`Explorar ${category.title}`}
              style={
                {
                  "--category-delay": `${index * 110}ms`,
                } as CSSProperties
              }
              onClick={() => openCategory(category.href)}
              onKeyDown={(event) =>
                handleKeyboard(event, category.href)
              }
            >
              <Image
                src={category.image}
                alt={`Material premium de ${category.title.toLowerCase()}`}
                fill
                sizes={
                  isMobile
                    ? "92vw"
                    : "(max-width: 1100px) 50vw, 33vw"
                }
                className="category-image"
              />

              <div className="category-overlay" />
              <div className="category-glow" />

              <div className="category-number">
                0{index + 1}
              </div>

              <div className="category-content">
                <p className="category-kicker">DEPORTE</p>

                <h3>{category.title}</h3>

                <p className="category-description">
                  {category.text}
                </p>

                <span className="category-link">
                  Explorar

                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx>{`
        .categories-section {
          position: relative;
          max-width: 1400px;
          margin: 0 auto 34px;
          padding: 72px 60px 60px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(255, 255, 255, 0.96),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              #f7f7f4 0%,
              #eeeeea 100%
            );
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.02),
            0 30px 90px rgba(0, 0, 0, 0.055);
        }

        .categories-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 42px;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .categories-section.is-visible
          .categories-header {
          opacity: 1;
          transform: translateY(0);
        }

        .categories-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
        }

        .categories-line {
          width: 38px;
          height: 1px;
          background: rgba(17, 17, 17, 0.52);
        }

        .categories-eyebrow {
          margin: 0;
          color: #777777;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .categories-title {
          margin: 0;
          color: #111111;
          font-size: clamp(48px, 5vw, 70px);
          font-weight: 450;
          line-height: 0.96;
          letter-spacing: -0.058em;
        }

        .categories-view-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 50px;
          padding: 0 21px 0 23px;
          border: 1px solid #161616;
          border-radius: 999px;
          background: transparent;
          color: #161616;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 650;
          transition:
            background 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        .categories-view-all:hover {
          background: #161616;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .categories-view-all svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .categories-view-all:hover svg {
          transform: translateX(3px);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .category-card {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 34px;
          background: #171717;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.08),
            0 28px 80px rgba(0, 0, 0, 0.18);
          cursor: pointer;
          outline: none;
          opacity: 0;
          transform: translateY(28px);
          isolation: isolate;
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 450ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--category-delay);
        }

        .categories-section.is-visible
          .category-card {
          opacity: 1;
          transform: translateY(0);
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.12),
            0 38px 100px rgba(0, 0, 0, 0.26);
        }

        .category-card:focus-visible {
          box-shadow:
            0 0 0 3px rgba(17, 17, 17, 0.16),
            0 38px 100px rgba(0, 0, 0, 0.26);
        }

        .category-image {
          object-fit: cover;
          transform: scale(1.04);
          transition: transform 900ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .category-card:hover .category-image {
          transform: scale(1.11);
        }

        .category-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.05) 0%,
              rgba(0, 0, 0, 0.18) 42%,
              rgba(0, 0, 0, 0.88) 100%
            );
          transition: background 450ms ease;
        }

        .category-card:hover .category-overlay {
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08) 0%,
              rgba(0, 0, 0, 0.26) 42%,
              rgba(0, 0, 0, 0.94) 100%
            );
        }

        .category-glow {
          position: absolute;
          top: -120px;
          right: -110px;
          z-index: 2;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          filter: blur(48px);
          pointer-events: none;
          transition: transform 600ms ease;
        }

        .category-card:hover .category-glow {
          transform: translate(-20px, 20px) scale(1.08);
        }

        .category-number {
          position: absolute;
          top: 28px;
          right: 28px;
          z-index: 3;
          color: rgba(255, 255, 255, 0.52);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .category-content {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          padding: 36px;
          color: #ffffff;
          transform: translateY(0);
          transition: transform 400ms ease;
        }

        .category-card:hover .category-content {
          transform: translateY(-4px);
        }

        .category-kicker {
          margin: 0 0 13px;
          color: rgba(255, 255, 255, 0.56);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
        }

        .category-content h3 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(38px, 4vw, 58px);
          font-weight: 480;
          line-height: 0.95;
          letter-spacing: -0.055em;
        }

        .category-description {
          max-width: 380px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 14px;
          line-height: 1.55;
        }

        .category-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 25px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 650;
        }

        .category-link svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 250ms ease;
        }

        .category-card:hover .category-link svg {
          transform: translateX(5px);
        }

        .categories-section.is-mobile {
          margin-bottom: 26px;
          padding: 48px 20px 28px;
          border-radius: 28px;
        }

        .is-mobile .categories-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 30px;
        }

        .is-mobile .categories-title {
          font-size: 42px;
          line-height: 0.98;
        }

        .is-mobile .categories-view-all {
          min-height: 46px;
        }

        .is-mobile .categories-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .is-mobile .category-card {
          min-height: 520px;
          border-radius: 28px;
        }

        .is-mobile .category-content {
          padding: 28px;
        }

        .is-mobile .category-content h3 {
          font-size: 44px;
        }

        .is-mobile .category-description {
          font-size: 14px;
        }

        @media (max-width: 1050px) and (min-width: 701px) {
          .categories-section {
            padding: 62px 38px 44px;
          }
        }

        @media (hover: none) {
          .categories-section.is-visible
            .category-card:hover {
            transform: translateY(0);
          }

          .category-card:hover .category-image {
            transform: scale(1.04);
          }

          .category-card:hover .category-content {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .categories-header,
          .category-card,
          .category-image,
          .category-overlay,
          .category-glow,
          .category-content,
          .category-link svg,
          .categories-view-all,
          .categories-view-all svg {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}