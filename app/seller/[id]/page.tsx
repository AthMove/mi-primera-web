"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerPage() {
  const params = useParams();
  const router = useRouter();
  const sellerId = String(params.id);

  const [products, setProducts] = useState<any[]>([]);
  const [soldCount, setSoldCount] = useState(0);
  const [sellerEmail, setSellerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState<any[]>([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    loadSeller();
  }, []);

  const loadSeller = async () => {
    const { data: sellerProducts } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .eq("sold", false)
      .order("created_at", { ascending: false });

    const { data: allSellerProducts } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId);

    setProducts(sellerProducts || []);
    setSoldCount(allSellerProducts?.filter((item) => item.sold).length || 0);
    setSellerEmail(allSellerProducts?.[0]?.seller_email || "Verified seller");

   const { data: reviewsData } = await supabase
  .from("seller_reviews")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (reviewsData) {
      setReviews(reviewsData);

      if (reviewsData.length > 0) {
        const avg =
          reviewsData.reduce((acc, item) => acc + Number(item.rating), 0) /
          reviewsData.length;

        setAverage(Number(avg.toFixed(1)));
      }
    }

    setLoading(false);
  };

  const safeImage = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const stars = (value: number) => {
    const rounded = Math.round(value || 0);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  if (loading) {
    return <main style={pageStyle}>Loading seller...</main>;
  }

  return (
    <main style={pageStyle} className="seller-page">
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>ATHMOV SELLER</p>

          <h1 style={titleStyle} className="seller-title">
            Verified Seller
          </h1>

          <p style={subtitleStyle}>{sellerEmail}</p>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statNumberStyle}>{products.length}</p>
            <p style={statLabelStyle}>Active listings</p>
          </div>

          <div style={statCardStyle}>
            <p style={statNumberStyle}>{soldCount}</p>
            <p style={statLabelStyle}>Sales</p>
          </div>

          <div style={statCardStyle}>
            <p style={statNumberStyle}>★ {average || 0}</p>
            <p style={statLabelStyle}>{reviews.length} reviews</p>
          </div>
        </div>
      </section>

      <section style={reviewsSummaryStyle}>
        <div>
          <p style={sectionEyebrowStyle}>SELLER RATING</p>
          <h2 style={sectionTitleStyle}>
            {average ? `${average}/5` : "No reviews yet"}
          </h2>
          <p style={starsLargeStyle}>{stars(average)}</p>
        </div>

        <p style={summaryTextStyle}>
          Reviews are created only after completed orders, helping buyers trust
          verified ATHMOV sellers.
        </p>
      </section>

      <section style={sectionStyle}>
        <p style={sectionEyebrowStyle}>ACTIVE LISTINGS</p>
        <h2 style={sectionTitleStyle}>Products for sale</h2>

        {products.length === 0 ? (
          <div style={emptyStyle}>This seller has no active products.</div>
        ) : (
          <div style={gridStyle} className="seller-grid">
            {products.map((product) => (
              <article
                key={product.id}
                onClick={() => router.push(`/products/${product.id}`)}
                style={cardStyle}
                className="seller-product-card"
              >
                <div style={imageWrapperStyle}>
                  <Image
                    src={safeImage(product.image)}
                    alt={product.title || "Product"}
                    fill
                    sizes="33vw"
                    className="seller-product-image"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "24px" }}>
                  <p style={brandStyle}>{product.brand}</p>
                  <h2 style={productTitleStyle}>{product.title}</h2>
                  <p style={priceStyle}>€{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <p style={sectionEyebrowStyle}>BUYER FEEDBACK</p>
        <h2 style={sectionTitleStyle}>Seller reviews</h2>

        {reviews.length === 0 ? (
          <div style={emptyStyle}>No reviews yet.</div>
        ) : (
          <div style={reviewsGridStyle}>
            {reviews.map((review) => (
              <div key={review.id} style={reviewCardStyle}>
                <p style={reviewStarsStyle}>{stars(Number(review.rating))}</p>

                <p style={reviewCommentStyle}>{review.comment}</p>

                <p style={reviewMetaStyle}>
                  {new Date(review.created_at).toLocaleDateString([], {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .seller-product-card {
          transition: transform 0.24s ease, box-shadow 0.24s ease;
        }

        .seller-product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.08);
        }

        .seller-product-image {
          transition: transform 0.45s ease;
        }

        .seller-product-card:hover .seller-product-image {
          transform: scale(1.06);
        }

        @media (max-width: 900px) {
          .seller-page {
            padding: 120px 18px 34px !important;
          }

          .seller-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .seller-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1400px",
  margin: "0 auto 34px",
  background: "#111",
  color: "#fff",
  borderRadius: "42px",
  padding: "54px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.16)",
  display: "flex",
  justifyContent: "space-between",
  gap: "30px",
  flexWrap: "wrap" as const,
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.55,
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  letterSpacing: "-4px",
  margin: 0,
};

const subtitleStyle = {
  marginTop: "18px",
  color: "rgba(255,255,255,0.7)",
};

const statsGridStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
  alignItems: "flex-end",
};

const statCardStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "24px",
  padding: "20px 24px",
  minWidth: "140px",
};

const statNumberStyle = {
  fontSize: "28px",
  fontWeight: 900,
  margin: 0,
};

const statLabelStyle = {
  fontSize: "11px",
  letterSpacing: "1.5px",
  opacity: 0.5,
  marginTop: "8px",
  marginBottom: 0,
  textTransform: "uppercase" as const,
};

const reviewsSummaryStyle = {
  maxWidth: "1400px",
  margin: "0 auto 60px",
  background: "#fff",
  borderRadius: "34px",
  padding: "34px",
  border: "1px solid rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  alignItems: "center",
};

const sectionStyle = {
  maxWidth: "1400px",
  margin: "70px auto 0",
};

const sectionEyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "10px",
};

const sectionTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const starsLargeStyle = {
  fontSize: "24px",
  marginTop: "12px",
  marginBottom: 0,
};

const summaryTextStyle = {
  maxWidth: "520px",
  color: "#666",
  lineHeight: 1.7,
};

const gridStyle = {
  marginTop: "28px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "34px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "32px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  height: "300px",
  background: "#f8f8f6",
  overflow: "hidden",
};

const brandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const productTitleStyle = {
  fontSize: "28px",
  marginTop: "10px",
  marginBottom: "16px",
};

const priceStyle = {
  fontSize: "26px",
  fontWeight: 800,
};

const reviewsGridStyle = {
  display: "grid",
  gap: "18px",
  marginTop: "28px",
};

const reviewCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const reviewStarsStyle = {
  fontSize: "18px",
  fontWeight: 900,
  marginBottom: "14px",
};

const reviewCommentStyle = {
  color: "#444",
  lineHeight: 1.7,
  marginBottom: "18px",
};

const reviewMetaStyle = {
  fontSize: "12px",
  opacity: 0.45,
};

const emptyStyle = {
  marginTop: "28px",
  background: "#fff",
  borderRadius: "28px",
  padding: "34px",
  color: "#666",
};