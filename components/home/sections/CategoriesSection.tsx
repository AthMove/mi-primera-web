"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type CategoriesSectionProps = {
  isMobile: boolean;
};

export default function CategoriesSection({
  isMobile,
}: CategoriesSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

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

  return (
    <section
      className="fade-up"
      data-delay="240"
      style={{
        ...sectionStyle,
        marginBottom: "34px",
        padding: isMobile ? "42px 24px" : sectionStyle.padding,
      }}
    >
      <div
        style={{
          ...sectionHeaderStyle,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? "16px" : sectionHeaderStyle.gap,
        }}
      >
        <div>
          <p style={eyebrowStyle}>{t.categories}</p>

          <h2
            style={{
              ...sectionTitleStyle,
              fontSize: isMobile ? "38px" : sectionTitleStyle.fontSize,
              lineHeight: isMobile ? 1.05 : undefined,
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
            }}
          >
            {t.exploreSports}
          </h2>
        </div>
      </div>

      <div
        style={{
          ...gridStyle,
          gridTemplateColumns: isMobile
            ? "1fr"
            : gridStyle.gridTemplateColumns,
          gap: isMobile ? "24px" : gridStyle.gap,
        }}
      >
        {categories.map((category, index) => (
          <article
            key={category.title}
            data-delay={index * 80}
            onClick={() => router.push(category.href)}
            style={categoryCardStyle}
            className="home-card fade-up"
          >
            <div
              style={{
                ...cardImageStyle,
                height: isMobile ? "260px" : cardImageStyle.height,
              }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="33vw"
                className="card-img category-img"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={cardContentStyle}>
              <p style={brandStyle}>DEPORTE</p>
              <h3 style={cardTitleStyle}>{category.title}</h3>
              <p style={categoryTextStyle}>{category.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const sectionStyle = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "48px 60px",
  background: "rgba(255,255,255,.55)",
  backdropFilter: "blur(26px)",
  border: "1px solid rgba(255,255,255,.55)",
  borderRadius: "42px",
  boxShadow: "0 30px 90px rgba(0,0,0,.05)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  marginBottom: "34px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  margin: 0,
  letterSpacing: "-2px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(min(100%, 360px),1fr))",
  gap: "32px",
};

const categoryCardStyle = {
  background: "rgba(255,255,255,.82)",
  backdropFilter: "blur(22px)",
  borderRadius: "36px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(255,255,255,.55)",
  boxShadow: "0 35px 120px rgba(0,0,0,.08)",
  transition: "all .45s ease",
  position: "relative" as const,
};

const cardImageStyle = {
  position: "relative" as const,
  height: "460px",
  background: "#fafaf7",
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "40px 34px",
};

const brandStyle = {
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "3px",
  opacity: 0.6,
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  fontSize: "26px",
  fontWeight: 950,
  lineHeight: 1.02,
  marginTop: "14px",
  marginBottom: "22px",
  letterSpacing: "-1px",
  color: "#111",
};

const categoryTextStyle = {
  color: "#666",
};