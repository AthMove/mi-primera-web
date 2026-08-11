"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminProductsPage() {
  const { lang, t } = useLanguage();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const locale =
    lang === "en"
      ? "en-GB"
      : lang === "pt"
        ? "pt-PT"
        : "es-ES";

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function toggleSold(product: any) {
    const { error } = await supabase
      .from("products")
      .update({ sold: !product.sold })
      .eq("id", product.id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProducts();
  }

  async function deleteProduct(productId: string) {
    const ok = confirm(t.adminProductsDeleteConfirm);
    if (!ok) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProducts();
  }

  const safeImage = (product: any) => {
    const src =
      product.image ||
      product.image_url ||
      product.images?.[0];

    return src?.startsWith("http") ||
      src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(Number(value || 0));

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main style={pageStyle}>
        {t.adminProductsLoading}
      </main>
    );
  }

  return (
    <main
      style={pageStyle}
      className="admin-products-page"
    >
      <section style={headerStyle}>
        <p style={eyebrowStyle}>
          {t.adminProductsEyebrow}
        </p>

        <h1
          style={titleStyle}
          className="admin-products-title"
        >
          {t.adminProducts}
        </h1>

        <p style={subtitleStyle}>
          {t.adminProductsSubtitle}
        </p>
      </section>

      <section style={listStyle}>
        {products.length === 0 ? (
          <div style={emptyStyle}>
            {t.adminProductsEmpty}
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              style={cardStyle}
              className="product-card"
            >
              <div style={imageWrapperStyle}>
                <Image
                  src={safeImage(product)}
                  alt={
                    product.title ||
                    t.adminProductsNoTitle
                  }
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p style={metaStyle}>
                  #{String(product.id).slice(0, 8)}
                </p>

                <h2 style={productTitleStyle}>
                  {product.title ||
                    t.adminProductsNoTitle}
                </h2>

                <div style={detailsStyle}>
                  <span>
                    {product.brand ||
                      t.adminProductsNoBrand}
                  </span>

                  <span>
                    {product.category ||
                      product.sport ||
                      t.adminProductsNoCategory}
                  </span>

                  <span>
                    {formatMoney(
                      Number(product.price || 0)
                    )}
                  </span>

                  <span>
                    {formatDate(product.created_at)}
                  </span>
                </div>

                <p style={sellerStyle}>
                  {t.adminProductsSeller}:{" "}
                  {product.seller_id
                    ? String(
                        product.seller_id
                      ).slice(0, 8)
                    : t.adminProductsUnknown}
                </p>
              </div>

              <div style={actionsStyle}>
                <span
                  style={{
                    ...badgeStyle,
                    ...(product.sold
                      ? soldBadgeStyle
                      : activeBadgeStyle),
                  }}
                >
                  {product.sold
                    ? t.adminProductsSoldHidden
                    : t.adminProductsActive}
                </span>

                <button
                  onClick={() =>
                    toggleSold(product)
                  }
                  style={buttonStyle}
                >
                  {product.sold
                    ? t.adminProductsRestore
                    : t.adminProductsHide}
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                  style={dangerButtonStyle}
                >
                  {t.adminProductsDelete}
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <style>{`
        @media (max-width: 800px) {
          .admin-products-page {
            padding: 120px 18px 40px !important;
          }

          .admin-products-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .product-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "150px 64px 90px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 36px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-5px",
  fontWeight: 500,
};

const subtitleStyle = {
  color: "#666",
  marginTop: "16px",
};

const listStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "42px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "22px",
  display: "flex",
  gap: "22px",
  alignItems: "center",
  border: "1px solid rgba(0,0,0,0.05)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  width: "120px",
  height: "120px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#eee",
  flexShrink: 0,
};

const metaStyle = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
};

const productTitleStyle = {
  fontSize: "28px",
  margin: "8px 0 12px",
};

const detailsStyle = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap" as const,
  color: "#555",
  fontWeight: 700,
};

const sellerStyle = {
  marginTop: "12px",
  color: "#777",
  fontSize: "13px",
};

const actionsStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "10px",
};

const badgeStyle = {
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const activeBadgeStyle = {
  background: "#dcfce7",
  color: "#166534",
};

const soldBadgeStyle = {
  background: "#eee",
  color: "#555",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const dangerButtonStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
};