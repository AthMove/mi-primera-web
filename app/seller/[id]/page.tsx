"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerPage() {
  const params = useParams();
  const router = useRouter();
  const sellerId = String(params.id);

  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadSeller();
  }, []);

  const loadSeller = async () => {
    const { data: sellerProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sellerId)
      .maybeSingle();

    const { data: sellerProducts } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .eq("moderation_status", "approved")
      .order("created_at", { ascending: false });

    const { data: sellerReviews } = await supabase
      .from("reviews")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    setSeller(sellerProfile);
    setProducts(sellerProducts || []);
    setReviews(sellerReviews || []);
    setLoading(false);
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const sellerName =
    seller?.full_name ||
    seller?.username ||
    seller?.email ||
    "ATHMOV Seller";

  const soldCount = products.filter((p) => p.sold).length;
  const activeCount = products.filter((p) => !p.sold).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc, item) => acc + Number(item.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0";

  if (loading) {
    return <main style={pageStyle}>Loading seller...</main>;
  }

  return (
    <main style={pageStyle} className="seller-page">
      <section style={heroStyle} className="seller-hero">
        <div style={heroOverlayStyle} />

        <div style={avatarWrapperStyle}>
          <div style={avatarStyle}>
            <Image
              src={safeImage(seller?.avatar_url)}
              alt={sellerName}
              fill
              sizes="140px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {seller?.seller_verified && (
            <div style={verifiedCircleStyle}>✓</div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p style={eyebrowStyle}>ATHMOV VERIFIED SELLER</p>

          <h1 style={titleStyle} className="seller-title">
            {sellerName}
          </h1>

          <div style={badgesStyle}>
            {seller?.seller_verified && (
              <span style={verifiedBadgeStyle}>VERIFIED</span>
            )}

            <span style={levelBadgeStyle}>
              {(
                seller?.seller_badge ||
                seller?.seller_level ||
                "new"
              )
                .toString()
                .toUpperCase()}{" "}
              SELLER
            </span>

            <span style={trustBadgeStyle}>TRUSTED MARKETPLACE</span>
          </div>

          <p style={bioStyle}>
            {seller?.bio ||
              "Premium ATHMOV seller focused on curated sports gear, fast shipping and trusted transactions."}
          </p>

          <div style={infoRowStyle}>
            <div style={infoCardStyle}>
              <p style={infoLabelStyle}>Location</p>
              <p style={infoValueStyle}>
                {seller?.location || "Spain"}
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={infoLabelStyle}>Response time</p>
              <p style={infoValueStyle}>
                {seller?.response_time || "< 1 hour"}
              </p>
            </div>

            <div style={infoCardStyle}>
              <p style={infoLabelStyle}>Member since</p>
              <p style={infoValueStyle}>
                {seller?.created_at
                  ? new Date(seller.created_at).getFullYear()
                  : "2025"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={trustSectionStyle}>
        <div style={trustCardStyle}>✓ Verified identity</div>
        <div style={trustCardStyle}>✓ Secure payments</div>
        <div style={trustCardStyle}>✓ Premium marketplace</div>
        <div style={trustCardStyle}>✓ Trusted seller</div>
      </section>

      <section style={statsGridStyle}>
        <div style={statCardStyle}>
          <p style={statLabelStyle}>Rating</p>
          <h2 style={statValueStyle}>★ {averageRating}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Reviews</p>
          <h2 style={statValueStyle}>{reviews.length}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Active listings</p>
          <h2 style={statValueStyle}>{activeCount}</h2>
        </div>

        <div style={statCardStyle}>
          <p style={statLabelStyle}>Sold products</p>
          <h2 style={statValueStyle}>{soldCount}</h2>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}>SELLER INVENTORY</p>
            <h2 style={sectionTitleStyle}>Active Products</h2>
          </div>
        </div>

        {products.filter((p) => !p.sold).length === 0 ? (
          <div style={emptyStyle}>
            No active products from this seller.
          </div>
        ) : (
          <div style={gridStyle}>
            {products
              .filter((p) => !p.sold)
              .map((product) => (
                <article
                  key={product.id}
                  style={cardStyle}
                  className="seller-product-card"
                  onClick={() =>
                    router.push(`/products/${product.id}`)
                  }
                >
                  <div style={imageWrapperStyle}>
                    <Image
                      src={safeImage(product.image)}
                      alt={product.title || "Product"}
                      fill
                      sizes="33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={cardContentStyle}>
                    <p style={brandStyle}>
                      {product.brand || "ATHMOV"}
                    </p>

                    <h3 style={cardTitleStyle}>
                      {product.title}
                    </h3>

                    <p style={priceStyle}>€{product.price}</p>
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionEyebrowStyle}>BUYER FEEDBACK</p>
            <h2 style={sectionTitleStyle}>Reviews</h2>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div style={emptyStyle}>No reviews yet.</div>
        ) : (
          <div style={reviewsGridStyle}>
            {reviews.map((review) => (
              <article
                key={review.id}
                style={reviewCardStyle}
              >
                <p style={reviewStarsStyle}>
                  {"★".repeat(Number(review.rating || 0))}
                  {"☆".repeat(
                    5 - Number(review.rating || 0)
                  )}
                </p>

                <p style={reviewTextStyle}>
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .seller-product-card {
          transition: all 0.35s ease;
        }

        .seller-product-card:hover {
          transform: translateY(-6px);
        }

        @media (max-width: 900px) {
          .seller-hero {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 700px) {
          .seller-page {
            padding: 110px 18px 40px !important;
          }

          .seller-title {
            font-size: 44px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f2",
  padding: "80px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  position: "relative" as const,
  overflow: "hidden",
  maxWidth: "1280px",
  margin: "0 auto 40px",
  background: "#111",
  borderRadius: "42px",
  padding: "46px",
  display: "flex",
  gap: "34px",
  alignItems: "center",
  color: "#fff",
};

const heroOverlayStyle = {
  position: "absolute" as const,
  inset: 0,
  background:
    "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%)",
};

const avatarWrapperStyle = {
  position: "relative" as const,
};

const avatarStyle = {
  width: "140px",
  height: "140px",
  borderRadius: "999px",
  overflow: "hidden",
  position: "relative" as const,
  border: "4px solid rgba(255,255,255,0.12)",
};

const verifiedCircleStyle = {
  position: "absolute" as const,
  bottom: "4px",
  right: "4px",
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "74px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-5px",
};

const badgesStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginTop: "18px",
};

const verifiedBadgeStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const levelBadgeStyle = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.16)",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const trustBadgeStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 900,
};

const bioStyle = {
  marginTop: "18px",
  color: "rgba(255,255,255,0.72)",
  maxWidth: "700px",
  lineHeight: 1.8,
};

const infoRowStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
  marginTop: "26px",
};

const infoCardStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "16px 18px",
};

const infoLabelStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
  marginBottom: "6px",
};

const infoValueStyle = {
  fontSize: "14px",
  fontWeight: 700,
};

const trustSectionStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "16px",
};

const trustCardStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "22px",
  fontWeight: 800,
};

const statsGridStyle = {
  maxWidth: "1280px",
  margin: "28px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
};

const statCardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
};

const statLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const statValueStyle = {
  fontSize: "42px",
  marginTop: "14px",
};

const sectionStyle = {
  maxWidth: "1280px",
  margin: "70px auto 0",
};

const sectionHeaderStyle = {
  marginBottom: "26px",
};

const sectionEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "8px",
};

const sectionTitleStyle = {
  fontSize: "48px",
  letterSpacing: "-2px",
  margin: 0,
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "30px",
  color: "#666",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "28px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  overflow: "hidden",
  cursor: "pointer",
};

const imageWrapperStyle = {
  height: "320px",
  position: "relative" as const,
  background: "#f4f4f1",
};

const cardContentStyle = {
  padding: "24px",
};

const brandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const cardTitleStyle = {
  fontSize: "28px",
  margin: "10px 0 14px",
};

const priceStyle = {
  fontSize: "28px",
  fontWeight: 900,
};

const reviewsGridStyle = {
  display: "grid",
  gap: "18px",
};

const reviewCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "26px",
};

const reviewStarsStyle = {
  fontSize: "20px",
  marginBottom: "12px",
};

const reviewTextStyle = {
  color: "#555",
  lineHeight: 1.8,
};