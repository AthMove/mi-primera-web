"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type FollowedSellersSectionProps = {
  isMobile: boolean;
  sellers: any[];
};

export default function FollowedSellersSection({
  isMobile,
  sellers,
}: FollowedSellersSectionProps) {
  const router = useRouter();

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  if (sellers.length === 0) return null;

  return (
    <section
      className="fade-up"
      data-delay="175"
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
          <p style={eyebrowStyle}>TU COMUNIDAD</p>

          <h2
            style={{
              ...sectionTitleStyle,
              fontSize: isMobile
                ? "38px"
                : sectionTitleStyle.fontSize,
              lineHeight: isMobile ? 1.05 : undefined,
              letterSpacing: isMobile
                ? "-2px"
                : sectionTitleStyle.letterSpacing,
            }}
          >
            Vendedores que sigues
          </h2>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? "18px" : "24px",
        }}
      >
        {sellers.map((seller) => {
          const sellerName =
            seller.full_name ||
            seller.username ||
            seller.seller_badge ||
            "Vendedor ATHMOV";

          return (
            <article
              key={seller.id}
              className="followed-seller-card"
              onClick={() =>
                router.push(`/seller/${seller.id}`)
              }
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: "310px",
                padding: isMobile ? "24px" : "30px",
                borderRadius: isMobile ? "28px" : "34px",
                background:
                  "linear-gradient(145deg, #111 0%, #1d1d1d 55%, #2a2a2a 100%)",
                color: "#fff",
                cursor: "pointer",
                boxShadow:
                  "0 32px 90px rgba(0,0,0,.16)",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  top: "-100px",
                  right: "-80px",
                  background: "rgba(255,255,255,.08)",
                  filter: "blur(25px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  width: isMobile ? "82px" : "96px",
                  height: isMobile ? "82px" : "96px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#fff",
                  border:
                    "3px solid rgba(255,255,255,.18)",
                  boxShadow:
                    "0 20px 55px rgba(0,0,0,.3)",
                }}
              >
                <Image
                  src={safeImage(seller.avatar_url)}
                  alt={sellerName}
                  fill
                  sizes="96px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  position: "relative",
                  marginTop: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "14px",
                  }}
                >
                  {seller.seller_verified && (
                    <span
                      style={{
                        background: "#fff",
                        color: "#111",
                        borderRadius: "999px",
                        padding: "7px 12px",
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "1px",
                      }}
                    >
                      ✓ VERIFICADO
                    </span>
                  )}

                  <span
                    style={{
                      background:
                        "rgba(255,255,255,.08)",
                      border:
                        "1px solid rgba(255,255,255,.1)",
                      borderRadius: "999px",
                      padding: "7px 12px",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "1px",
                    }}
                  >
                    {String(
                      seller.seller_badge ||
                        seller.seller_level ||
                        "SELLER"
                    ).toUpperCase()}
                  </span>
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "26px" : "30px",
                    lineHeight: 1,
                    letterSpacing: "-1.4px",
                    fontWeight: 950,
                  }}
                >
                  {sellerName}
                </h3>

                <p
                  style={{
                    marginTop: "12px",
                    marginBottom: 0,
                    color: "rgba(255,255,255,.62)",
                    fontSize: "14px",
                    fontWeight: 650,
                  }}
                >
                  {seller.location || "España"}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    marginTop: "24px",
                  }}
                >
                  <div style={statCardStyle}>
                    <strong style={statValueStyle}>
                      {seller.total_sales || 0}
                    </strong>

                    <span style={statLabelStyle}>
                      Ventas
                    </span>
                  </div>

                  <div style={statCardStyle}>
                    <strong
                      style={{
                        ...statValueStyle,
                        fontSize: "16px",
                      }}
                    >
                      {seller.response_time || "< 1 hora"}
                    </strong>

                    <span style={statLabelStyle}>
                      Respuesta
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
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

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  margin: 0,
  letterSpacing: "-2px",
};

const statCardStyle = {
  background: "rgba(255,255,255,.07)",
  borderRadius: "17px",
  padding: "14px",
};

const statValueStyle = {
  display: "block",
  fontSize: "20px",
};

const statLabelStyle = {
  fontSize: "11px",
  opacity: 0.55,
};