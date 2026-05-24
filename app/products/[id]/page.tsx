"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductDetail() {
  const params = useParams();
  const id = String(params.id);

  const [producto, setProducto] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [sellerProfile, setSellerProfile] = useState<any>(null);

  useEffect(() => {
    if (!id || id === "undefined") {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const getProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error || !data) {
          setProducto(null);
          setNotFound(true);
          return;
        }

        setProducto(data);

        const { data: sellerData } = await supabase
  .from("profiles")
  .select("seller_verified, seller_level, seller_badge")
  .eq("id", data.seller_id)
  .maybeSingle();

setSellerProfile(sellerData);

        const images =
          data.images && Array.isArray(data.images) ? data.images : [data.image];

        setSelectedImage(images[0] || "/logo.png");

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: favorite } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", user.id)
            .eq("product_id", data.id)
            .maybeSingle();

          setIsFavorite(!!favorite);
        }

        const { data: relatedProducts } = await supabase
  .from("products")
  .select("*")
  .neq("id", data.id)
  .eq("sold", false)
  .eq("moderation_status", "approved")
  .limit(3);

        setRelated(relatedProducts || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const getBuyerGuide = () => {
    const category = String(producto?.category || producto?.brand || "")
      .toLowerCase()
      .trim();

    if (category.includes("padel") || category.includes("pádel")) {
      return {
        sport: "Pádel",
        title: "Cómo revisar una pala antes de comprar",
        tips: [
          "Pide foto clara del QR, holograma o número de serie.",
          "Comprueba el peso: normalmente debe estar entre 350 y 390 g.",
          "Revisa bordes, serigrafía, grietas y acabado del marco.",
        ],
      };
    }

    if (category.includes("tennis") || category.includes("tenis")) {
      return {
        sport: "Tenis",
        title: "Cómo revisar una raqueta antes de comprar",
        tips: [
          "Pide vídeo mostrando el código del mástil.",
          "Compara medidas y modelo con la ficha oficial de la marca.",
          "Revisa grip, encordado, marco y posibles fisuras.",
        ],
      };
    }

    if (category.includes("golf")) {
      return {
        sport: "Golf",
        title: "Cómo revisar palos de golf antes de comprar",
        tips: [
          "Pide foto del serial grabado en el hosel.",
          "Revisa soldaduras, cromado, face y shaft.",
          "Si dudas, llévalo a una tienda de golf antes de aceptarlo.",
        ],
      };
    }

    return {
      sport: "Buyer Guide",
      title: "Qué revisar antes de comprar",
      tips: [
        "Pide fotos reales del producto, serial y detalles de desgaste.",
        "Compara el modelo con la web oficial de la marca.",
        "Solicita ticket, factura o prueba de compra si es posible.",
      ],
    };
  };

  const buyNow = async () => {
    if (!producto) return;

    if (producto.sold) {
      alert("This product has already been sold");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (user.id === producto.seller_id) {
      alert("No puedes comprar tu propio producto");
      return;
    }

const { data: sellerProfile, error: sellerError } = await supabase
  .from("profiles")
  .select(
    "seller_verified, seller_level, seller_badge, stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled"
  )
  .eq("id", producto.seller_id)
  .maybeSingle();

    if (
      sellerError ||
      !sellerProfile?.stripe_account_id ||
      !sellerProfile?.stripe_charges_enabled ||
      !sellerProfile?.stripe_payouts_enabled
    ) {
      alert("Seller has not connected Stripe payouts");
      return;
    }

    try {
      setCheckoutLoading(true);

      const price = Number(producto.price);
      const platformFee = Number(((price * 8) / 100).toFixed(2));
      const sellerAmount = Number((price - platformFee).toFixed(2));
      const stripeFeeEstimate = Number((price * 0.015 + 0.25).toFixed(2));

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            product_id: producto.id,
            buyer_id: user.id,
            seller_id: producto.seller_id,
            amount: price,
            platform_fee_percent: 8,
            platform_fee: platformFee,
            seller_amount: sellerAmount,
            stripe_fee_estimate: stripeFeeEstimate,
            seller_stripe_account_id: sellerProfile.stripe_account_id,
            status: "pending",
            payment_status: "pending",
            transfer_status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError || !order) {
        alert(orderError?.message || "Could not create order");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          title: producto.title,
          image: safeImage(producto.image),
          price,
          productId: producto.id,
          sellerId: producto.seller_id,
          buyerId: user.id,
          stripeAccountId: sellerProfile.stripe_account_id,
          origin: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.error || "No se pudo iniciar el checkout");
    } catch (error) {
      console.log(error);
      alert("Error starting checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const toggleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (!producto) return;

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", producto.id);

      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert([
        {
          user_id: user.id,
          product_id: producto.id,
          user_email: user.email,
        },
      ]);

      setIsFavorite(true);
    }
  };

  const makeOffer = async () => {
    if (!producto) return;

    if (producto.sold) {
      alert("This product has already been sold");
      return;
    }

    if (!producto?.seller_id) {
      alert("Este producto no tiene vendedor asociado");
      return;
    }

    const amount = prompt("Enter your offer");
    if (!amount) return;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Introduce una cantidad válida");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must sign in");
      return;
    }

    if (user.id === producto.seller_id) {
      alert("No puedes hacer una oferta sobre tu propio producto");
      return;
    }

    const { error } = await supabase.from("offers").insert([
      {
        product_id: producto.id,
        seller_id: producto.seller_id,
        buyer_id: user.id,
        buyer_email: user.email,
        amount: numericAmount,
        status: "pending",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Offer sent");
  };

  const messageSeller = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (!producto?.seller_id) {
      alert("Este producto no tiene vendedor asociado");
      return;
    }

    if (user.id === producto.seller_id) {
      alert("No puedes escribirte a ti mismo");
      return;
    }

    const { data: existingConversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("buyer_id", user.id)
      .eq("seller_id", producto.seller_id)
      .eq("product_id", producto.id)
      .maybeSingle();

    let conversationId = existingConversation?.id;

    if (!conversationId) {
      const { data: newConversation, error } = await supabase
        .from("conversations")
        .insert([
          {
            buyer_id: user.id,
            seller_id: producto.seller_id,
            product_id: producto.id,
          },
        ])
        .select()
        .single();

      if (error || !newConversation) {
        alert(error?.message || "No se pudo crear la conversación");
        return;
      }

      conversationId = newConversation.id;
    }

    await supabase.from("messages").insert([
      {
        conversation_id: conversationId,
        sender_id: user.id,
        text: `Hi! Could you send me a verification video of "${producto.title}" showing serial numbers, condition and branding?`,
      },
    ]);

    window.location.href = `/messages/${conversationId}`;
  };

  const safeImage = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  if (loading) {
    return <div style={{ padding: "60px" }}>Cargando producto...</div>;
  }

  if (notFound || !producto) {
    return <div style={{ padding: "60px" }}>Product not found</div>;
  }

  if (producto.sold) {
    return (
      <main style={pageStyle}>
        <button onClick={() => window.history.back()} style={backButtonStyle}>
          ← Back
        </button>

        <section style={soldCardStyle}>
          <p style={soldEyebrowStyle}>ATHMOV MARKETPLACE</p>
          <h1 style={soldTitleStyle}>This product has been sold</h1>
          <p style={soldTextStyle}>
            This item is no longer available. You can continue browsing similar
            premium sports gear.
          </p>

          <button
            onClick={() => {
              window.location.href = "/products";
            }}
            style={buyButtonStyle}
          >
            Back to marketplace
          </button>
        </section>
      </main>
    );
  }

  const images =
    producto.images && Array.isArray(producto.images)
      ? producto.images
      : [producto.image];

  const buyerGuide = getBuyerGuide();

  return (
    <main className="product-detail-page" style={pageStyle}>
      <button onClick={() => window.history.back()} style={backButtonStyle}>
        ← Back
      </button>

      <div style={layoutStyle} className="product-detail-layout">
        <div>
          <div style={mainImageStyle} className="product-detail-image">
            <Image
              src={safeImage(selectedImage)}
              alt={producto.title || "Product"}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="main-product-image"
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
            />
          </div>

          <div style={thumbGridStyle} className="product-detail-thumbs">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                style={{
                  ...thumbButtonStyle,
                  border:
                    selectedImage === img
                      ? "2px solid #111"
                      : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src={safeImage(img)}
                  alt={`Product ${index + 1}`}
                  fill
                  sizes="180px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p style={brandStyle}>{producto.brand}</p>

          <h1 style={titleStyle} className="product-detail-title">
            {producto.title}
          </h1>

          <p style={priceStyle} className="product-detail-price">
            €{producto.price}
          </p>

          <p style={descriptionStyle}>{producto.description}</p>

          <div style={metaGridStyle} className="product-detail-meta">
            {[
              ["CONDITION", producto.condition || "Excellent"],
              ["SELLER", "Verified"],
              ["LOCATION", "Spain"],
            ].map(([label, value]) => (
              <div key={label} style={metaCardStyle}>
                <p style={metaLabelStyle}>{label}</p>
                <p style={metaValueStyle}>{value}</p>
              </div>
            ))}
          </div>

        <div style={trustPanelStyle}>
  <div style={trustPanelItemStyle}>✓ Buyer Protection</div>
  <div style={trustPanelItemStyle}>✓ Secure Checkout</div>
  <div style={trustPanelItemStyle}>
    {sellerProfile?.seller_verified ? "✓ Verified Seller" : "Seller Profile Available"}
  </div>
  <div style={trustPanelItemStyle}>✓ Curated Marketplace</div>
</div>

          <section style={buyerGuideStyle}>
            <div style={buyerGuideHeaderStyle}>
              <div>
                <p style={buyerGuideEyebrowStyle}>BUYER GUIDE · BETA</p>
                <h2 style={buyerGuideTitleStyle}>{buyerGuide.title}</h2>
              </div>

              <div style={buyerGuideBadgeStyle}>{buyerGuide.sport}</div>
            </div>

            <p style={buyerGuideTextStyle}>
              Learn how to verify this product before purchasing. We recommend
              checking serials, asking for videos and comparing details with the
              official brand catalog.
            </p>

            <div style={buyerGuideCardsStyle}>
              {buyerGuide.tips.map((tip, index) => {
                const icons = ["🔍", "🎥", "📋"];

                return (
                  <div key={tip} style={buyerGuideCardStyle}>
                    <div style={buyerGuideIconStyle}>{icons[index] || "✓"}</div>

                    <div>
                      <h4 style={buyerGuideCardTitleStyle}>
                        {index === 0
                          ? "Check authenticity marks"
                          : index === 1
                            ? "Request extra proof"
                            : "Compare condition"}
                      </h4>

                      <p style={buyerGuideCardTextStyle}>{tip}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={buyerGuideFooterStyle}>
              ATHMOV is currently in beta. Verification tools are educational
              and designed to help buyers make safer decisions independently.
            </div>
          </section>

{sellerProfile?.seller_verified && (
  <div style={verifiedSellerBadgeStyle}>
    ✓ Verified seller
  </div>
)}
          {producto.seller_id && (
            <button
              onClick={() => {
                window.location.href = `/seller/${producto.seller_id}`;
              }}
              style={sellerButtonStyle}
            >
              View seller profile
            </button>
          )}

          <div style={actionsStyle} className="product-detail-actions">
            <button onClick={messageSeller} style={secondaryButtonStyle}>
              Request verification video
            </button>

            <button onClick={buyNow} style={buyButtonStyle}>
              {checkoutLoading ? "Redirecting..." : "Buy now"}
            </button>

            <button
              onClick={() => {
                const cart = JSON.parse(
                  localStorage.getItem("athmov_cart") || "[]"
                );
                const exists = cart.some((item: any) => item.id === producto.id);

                if (!exists) {
                  cart.push({
                    id: producto.id,
                    nombre: producto.title,
                    precio: `€${producto.price}`,
                    imagen: producto.image,
                    deporte: producto.brand,
                  });

                  localStorage.setItem("athmov_cart", JSON.stringify(cart));
                }

                alert("Added to cart");
              }}
              style={primaryButtonStyle}
            >
              Add to cart
            </button>

            <button onClick={toggleFavorite} style={secondaryButtonStyle}>
              {isFavorite ? "❤️ Favorited" : "🤍 Add to favorites"}
            </button>

            <button onClick={messageSeller} style={secondaryButtonStyle}>
              Message seller
            </button>

            <button onClick={makeOffer} style={secondaryButtonStyle}>
              Make offer
            </button>
          </div>
        </div>
      </div>

      <section style={relatedSectionStyle}>
        <p style={relatedEyebrowStyle}>ATHMOV SELECTION</p>
        <h2 style={relatedTitleStyle}>You may also like</h2>

        <div style={relatedGridStyle} className="product-detail-related">
          {related.map((item) => (
            <div
              key={item.id}
              onClick={() => (window.location.href = `/products/${item.id}`)}
              style={relatedCardStyle}
            >
              <div style={relatedImageStyle}>
                <Image
                  src={safeImage(item.image)}
                  alt={item.title || "Product"}
                  fill
                  sizes="33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "24px" }}>
                <p style={relatedBrandStyle}>{item.brand}</p>
                <h3 style={relatedProductTitleStyle}>{item.title}</h3>
                <p style={relatedPriceStyle}>€{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .main-product-image:hover {
          transform: scale(1.04);
        }

        @media (max-width: 1000px) {
          .product-detail-layout {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }

          .product-detail-image {
            height: 560px !important;
          }

          .product-detail-related {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 700px) {
          .product-detail-page {
            padding: 30px 18px !important;
          }

          .product-detail-image {
            height: 420px !important;
            border-radius: 28px !important;
          }

          .product-detail-thumbs {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }

          .product-detail-thumbs button {
            height: 88px !important;
            border-radius: 16px !important;
          }

          .product-detail-title {
            font-size: 44px !important;
            letter-spacing: -2px !important;
          }

          .product-detail-price {
            font-size: 38px !important;
          }

          .product-detail-meta {
            grid-template-columns: 1fr !important;
          }

          .product-detail-actions {
            flex-direction: column !important;
          }

          .product-detail-actions button {
            width: 100% !important;
          }

          .product-detail-related {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f7f3",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};

const backButtonStyle = {
  marginBottom: "32px",
  background: "transparent",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "12px 18px",
  fontSize: "13px",
  cursor: "pointer",
};

const soldCardStyle = {
  maxWidth: "760px",
  margin: "80px auto 0",
  background: "#fff",
  borderRadius: "34px",
  padding: "60px",
  textAlign: "center" as const,
  boxShadow: "0 20px 80px rgba(0,0,0,0.06)",
};

const soldEyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "14px",
};

const soldTitleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  letterSpacing: "-3px",
  margin: 0,
};

const soldTextStyle = {
  color: "#666",
  fontSize: "17px",
  lineHeight: 1.7,
  margin: "22px auto 34px",
  maxWidth: "520px",
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  maxWidth: "1400px",
  margin: "0 auto",
  alignItems: "start",
};

const mainImageStyle = {
  position: "relative" as const,
  height: "700px",
  borderRadius: "40px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 40px 120px rgba(0,0,0,0.08)",
};

const thumbGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
  marginTop: "18px",
};

const thumbButtonStyle = {
  position: "relative" as const,
  height: "120px",
  borderRadius: "22px",
  overflow: "hidden",
  background: "#fff",
  cursor: "pointer",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  marginTop: "10px",
  marginBottom: "24px",
};

const priceStyle = {
  fontSize: "48px",
  fontWeight: 700,
  marginBottom: "32px",
};

const descriptionStyle = {
  fontSize: "18px",
  color: "#555",
  lineHeight: 1.7,
  maxWidth: "520px",
};

const metaGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginTop: "34px",
  maxWidth: "520px",
};

const metaCardStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "18px",
  background: "rgba(255,255,255,0.55)",
};

const metaLabelStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
  margin: 0,
};

const metaValueStyle = {
  fontSize: "15px",
  fontWeight: 700,
  marginTop: "8px",
  marginBottom: 0,
};

const buyerGuideStyle = {
  marginTop: "28px",
  maxWidth: "560px",
  background: "#111",
  color: "#fff",
  borderRadius: "28px",
  padding: "26px",
  boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
};

const buyerGuideEyebrowStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "8px",
};

const buyerGuideTitleStyle = {
  fontSize: "28px",
  lineHeight: 1.05,
  letterSpacing: "-1px",
  margin: 0,
};

const buyerGuideBadgeStyle = {
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 900,
  whiteSpace: "nowrap" as const,
};

const buyerGuideTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.5,
  fontSize: "13px",
};

const sellerButtonStyle = {
  marginTop: "24px",
  background: "transparent",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.14)",
  padding: "14px 22px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 800,
  cursor: "pointer",
};

const actionsStyle = {
  display: "flex",
  gap: "14px",
  marginTop: "40px",
  flexWrap: "wrap" as const,
};

const buyButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "18px 36px",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: 900,
  cursor: "pointer",
};

const primaryButtonStyle = {
  background: "#222",
  color: "#fff",
  border: "none",
  padding: "18px 36px",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  padding: "18px 36px",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const relatedSectionStyle = {
  maxWidth: "1400px",
  margin: "90px auto 0",
};

const relatedEyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "10px",
};

const relatedTitleStyle = {
  fontSize: "42px",
  marginBottom: "30px",
  letterSpacing: "-2px",
};

const relatedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "28px",
};

const relatedCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
};

const relatedImageStyle = {
  position: "relative" as const,
  height: "260px",
  background: "#f8f8f6",
};

const relatedBrandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
};

const relatedProductTitleStyle = {
  fontSize: "26px",
  marginTop: "10px",
  marginBottom: "14px",
};

const relatedPriceStyle = {
  fontSize: "24px",
  fontWeight: 700,
};

const buyerGuideHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "18px",
  marginBottom: "18px",
};

const trustBadgesStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "22px",
  marginBottom: "10px",
};

const trustBadgeStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "1.5px",
  color: "#111",
};

const buyerGuideCardsStyle = {
  display: "grid",
  gap: "12px",
  marginTop: "20px",
};

const buyerGuideCardStyle = {
  display: "flex",
  gap: "14px",
  padding: "15px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const buyerGuideIconStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const buyerGuideCardTitleStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#fff",
};

const buyerGuideCardTextStyle = {
  marginTop: "6px",
  marginBottom: 0,
  color: "rgba(255,255,255,0.55)",
  fontSize: "12px",
  lineHeight: 1.6,
};

const buyerGuideFooterStyle = {
  marginTop: "18px",
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.42)",
  fontSize: "12px",
  lineHeight: 1.6,
};

const verifiedSellerBadgeStyle = {
  marginTop: "24px",
  display: "inline-flex",
  alignItems: "center",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const trustPanelStyle = {
  marginTop: "24px",
  maxWidth: "560px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "26px",
  padding: "18px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
};

const trustPanelItemStyle = {
  background: "#f7f7f3",
  borderRadius: "999px",
  padding: "12px 14px",
  fontSize: "12px",
  fontWeight: 900,
};