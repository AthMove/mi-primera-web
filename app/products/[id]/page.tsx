"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductDetail() {
  const params = useParams();
  const { t } = useLanguage();
  const id = String(params.id);

  const [producto, setProducto] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [sellerReviews, setSellerReviews] = useState<any[]>([]);

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
          .select(
            "seller_verified, seller_level, seller_badge, stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled"
          )
          .eq("id", data.seller_id)
          .maybeSingle();

        setSellerProfile(sellerData);

        const { data: reviewsData } = await supabase
  .from("reviews")
  .select("*")
  .eq("seller_id", data.seller_id)
  .order("created_at", { ascending: false });

setSellerReviews(reviewsData || []);

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
          .limit(8);

        setRelated(relatedProducts || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const getConditionLabel = (condition?: string) => {
    if (condition === "New") return "Nuevo";
    if (condition === "Like new") return "Como nuevo";
    if (condition === "Excellent") return "Excelente";
    if (condition === "Good") return "Buen estado";
    if (condition === "Used") return "Usado";
    return condition || "Excelente";
  };

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
      sport: "Guía del comprador",
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
      alert(t.productAlreadySold);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.loginRequired);
      return;
    }

    if (user.id === producto.seller_id) {
      alert(t.cannotBuyOwnProduct);
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
     alert(t.sellerStripeInactive);
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
        alert(orderError?.message || t.orderCreateError);
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

      alert(data.error || t.checkoutError);
    } catch (error) {
      console.log(error);
      alert(t.checkoutStartError);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const toggleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.loginRequired);
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
      alert(t.productAlreadySold);
      return;
    }

    if (!producto?.seller_id) {
      alert(t.sellerNotAssociated);
      return;
    }

    const amount = prompt(t.enterOffer)
    if (!amount) return;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert(t.invalidAmount);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.loginRequired);
      return;
    }

    if (user.id === producto.seller_id) {
      alert(t.cannotOfferOwnProduct);
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

    await fetch("/api/email/offer-received", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: producto.id,
        sellerId: producto.seller_id,
        buyerEmail: user.email,
        amount: numericAmount,
      }),
    });

    alert(t.offerSent);
  };
    const messageSeller = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.loginRequired);
      return;
    }

    if (!producto?.seller_id) {
      alert(t.sellerNotAssociated);
      return;
    }

    if (user.id === producto.seller_id) {
      alert(t.cannotMessageYourself);
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
        alert(error?.message || t.conversationError);
        return;
      }

      conversationId = newConversation.id;
    }

    const firstMessage = `Hola, ¿podrías enviarme un vídeo de verificación de "${producto.title}" mostrando números de serie, estado y detalles de la marca?`;

    const { error: messageError } = await supabase
      .from("conversation_messages")
      .insert([
        {
          conversation_id: conversationId,
          sender_id: user.id,
          content: firstMessage,
          is_image: false,
          is_offer: false,
          read_by_buyer: false,
          read_by_seller: false,
        },
      ]);

    if (messageError) {
      alert(messageError.message);
      return;
    }

    await supabase
      .from("conversations")
      .update({
        last_message: firstMessage,
        last_message_at: new Date().toISOString(),
        unread_seller: 1,
        archived_by_buyer: false,
        archived_by_seller: false,
      })
      .eq("id", conversationId);

    window.location.href = `/messages/${conversationId}`;
  };

  const addToCart = () => {
    if (!producto) return;

    const cart = JSON.parse(localStorage.getItem("athmov_cart") || "[]");
    const exists = cart.some((item: any) => item.id === producto.id);

    if (!exists) {
      cart.push({
        id: producto.id,
        nombre: producto.title,
        precio: `€${producto.price}`,
        imagen: producto.image,
        deporte: producto.brand,
        seller_id: producto.seller_id,
        stripe_account_id: sellerProfile?.stripe_account_id || "",
      });

      localStorage.setItem("athmov_cart", JSON.stringify(cart));
    }

    alert(t.addedToCart);
  };

  if (loading) {
    return <div style={{ padding: "60px" }}>{t.loadingProduct}</div>;
  }

  if (notFound || !producto) {
    return <div style={{ padding: "60px" }}>{t.productNotFound}</div>;
  }

  if (producto.sold) {
    return (
      <main style={pageStyle}>
       <button onClick={() => window.history.back()} style={backButtonStyle}>
  {t.back}
</button>

        <section style={soldCardStyle}>
          <p style={soldEyebrowStyle}>ATHMOV MARKETPLACE</p>
          <h1 style={soldTitleStyle}>{t.productSoldTitle}</h1>
          <p style={soldTextStyle}>{t.productSoldText}</p>

          <button
            onClick={() => {
              window.location.href = "/products";
            }}
            style={buyButtonStyle}
          >
            {t.backToMarketplace}
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

  const averageRating =
  sellerReviews.length > 0
    ? sellerReviews.reduce((sum, review) => sum + Number(review.rating), 0) /
      sellerReviews.length
    : null;

  return (
    <main className="product-detail-page" style={pageStyle}>
      <button onClick={() => window.history.back()} style={backButtonStyle}>
        {t.back}
      </button>

      <div style={layoutStyle} className="product-detail-layout">
        <div>
          <div
  style={mainImageStyle}
  className="product-detail-image image-zoom"
>
            <div style={imageBadgesStyle}>
  <span style={statusBadgeStyle}>
    {getConditionLabel(producto.condition)}
  </span>

  {producto.featured && (
    <span style={featuredBadgeStyle}>
      ⭐ Destacado
    </span>
  )}
</div>

<button
  onClick={toggleFavorite}
  style={favoriteFloatingStyle}
>
  {isFavorite ? "❤️" : "🤍"}
</button>
            <Image
              src={safeImage(selectedImage)}
              alt={producto.title || "Producto"}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="main-product-image zoom-image"
style={{
  objectFit: "contain",
  padding: "18px",
  transform: "scale(1.12)",
}}
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
                  alt={`Producto ${index + 1}`}
                  fill
                  sizes="180px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

          <div style={productInfoStickyStyle}>
  <p style={brandStyle}>{producto.brand}</p>

          <h1 style={titleStyle} className="product-detail-title">
            {producto.title}
          </h1>

          <p style={priceStyle} className="product-detail-price">
            €{producto.price}
          </p>

          <section style={marketInsightStyle}>
  <p style={marketLabelStyle}>MARKET INSIGHTS</p>

  <div style={marketRowStyle}>
    <span>Precio medio</span>
    <strong>
      €
      {Math.round(Number(producto.price) * 1.08)}
    </strong>
  </div>

  <div style={marketRowStyle}>
    <span>Tu precio</span>
    <strong>€{producto.price}</strong>
  </div>

  <div style={marketStatusStyle}>
    ✓ Buen precio
  </div>

  <div style={marketFooterStyle}>
    Tiempo medio de venta: 6-10 días
  </div>
</section>

<div style={quickInfoStyle}>
  <span style={quickInfoItemStyle}>🚚 {t.protectedShipping}</span>
  <span style={quickInfoItemStyle}>✓ {t.securePaymentShort}</span>
  <span style={quickInfoItemStyle}>↩ {t.incidentWindow}</span>
</div>

<div style={trustScoreStyle}>
  <div>
   <p style={trustScoreLabelStyle}>{t.trustScore}</p>
<h3 style={trustScoreTitleStyle}>{t.buyWithConfidenceShort}</h3>
  </div>

  <div style={trustScoreBadgeStyle}>9.2</div>
</div>

          <p style={descriptionStyle}>{producto.description}</p>

          <div style={metaGridStyle} className="product-detail-meta">
            {[
  [t.condition, getConditionLabel(producto.condition)],
  [
    t.seller,
    sellerProfile?.seller_verified ? t.verified : t.available,
  ],
  [t.location, producto.location || "España"],
].map(([label, value]) => (
              <div key={label} style={metaCardStyle}>
                <p style={metaLabelStyle}>{label}</p>
                <p style={metaValueStyle}>{value}</p>
              </div>
            ))}
          </div>

        <div style={trustPanelStyle}>
  <div style={trustPanelItemStyle}>✓ {t.buyerProtection}</div>
  <div style={trustPanelItemStyle}>✓ {t.securePaymentShort}</div>
  <div style={trustPanelItemStyle}>
    {sellerProfile?.seller_verified
      ? `✓ ${t.sellerVerified}`
      : t.sellerProfileAvailable}
  </div>
  <div style={trustPanelItemStyle}>✓ {t.selectedMarketplace}</div>
</div>

          <section style={buyerGuideStyle}>
            <div style={buyerGuideHeaderStyle}>
              <div>
               <p style={buyerGuideEyebrowStyle}>{t.buyerGuideBeta}</p>
                <h2 style={buyerGuideTitleStyle}>{buyerGuide.title}</h2>
              </div>

              <div style={buyerGuideBadgeStyle}>{buyerGuide.sport}</div>
            </div>

            <p style={buyerGuideTextStyle}>
              Aprende cómo verificar este producto antes de comprarlo.
              Recomendamos comprobar números de serie, pedir vídeos y comparar
              detalles con el catálogo oficial de la marca.
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
                          ? "Revisa marcas de autenticidad"
                          : index === 1
                            ? "Pide pruebas adicionales"
                            : "Compara el estado"}
                      </h4>

                      <p style={buyerGuideCardTextStyle}>{tip}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={buyerGuideFooterStyle}>
              ATHMOV está actualmente en beta. Las herramientas de verificación
              son educativas y están diseñadas para ayudar a los compradores a
              tomar decisiones más seguras.
            </div>
          </section>

          {sellerProfile?.seller_verified && (
  <div style={verifiedSellerBadgeStyle}>
    ✓ {t.sellerVerified}
  </div>
)}
 <div style={sellerPremiumCardStyle}>
  <div style={sellerPremiumTopStyle}>
    <div style={sellerAvatarLargeStyle}>
     <Image
    src={safeImage(sellerProfile?.avatar_url)}
    fill
    style={{ objectFit:"cover" }}
    alt=""
/>
    </div>

    <div>
      <p style={sellerVerifiedTextStyle}>
        ATHMOV VERIFIED SELLER
      </p>

      <h3 style={sellerPremiumNameStyle}>
        {sellerProfile?.seller_badge || t.athmovSeller}
      </h3>

      <p style={sellerStarsStyle}>
        ★★★★★ <span style={{ opacity: 0.55 }}>({sellerReviews.length} reseñas)</span>
      </p>
    </div>
  </div>

  <div style={sellerStatsGridStyle}>
    <div>✓ Vendedor verificado</div>
    <div>✓ Pagos seguros</div>
    <div>✓ Perfil revisado</div>
    <div>✓ Marketplace premium</div>
  </div>
</div>

          {producto.seller_id && (
            <button
              onClick={() => {
                window.location.href = `/seller/${producto.seller_id}`;
              }}
              style={sellerButtonStyle}
            >
              {t.viewSellerProfile}
            </button>
          )}

          {sellerReviews.length > 0 && (
  <div style={sellerRatingStyle}>
    <div style={{ fontSize: "22px" }}>
      {"★".repeat(Math.round(averageRating!))}
      {"☆".repeat(5 - Math.round(averageRating!))}
    </div>

    <div style={{ fontWeight: 700 }}>
      {averageRating?.toFixed(1)} / 5
    </div>

    <div
      style={{
        fontSize: 13,
        color: "#666",
      }}
    >
      Basado en {sellerReviews.length} valoración
      {sellerReviews.length > 1 ? "es" : ""}
    </div>
  </div>
)}

{sellerReviews.length > 0 && (
  <div style={reviewListStyle}>
    {sellerReviews.slice(0, 3).map((review) => (
      <div key={review.id} style={reviewItemStyle}>
        <div style={reviewStarsStyle}>
          {"★".repeat(Number(review.rating))}
          {"☆".repeat(5 - Number(review.rating))}
        </div>

        {review.comment && (
          <p style={reviewCommentStyle}>{review.comment}</p>
        )}
      </div>
    ))}
  </div>
)}

          <div style={actionsStyle} className="product-detail-actions">
           <button onClick={messageSeller} style={secondaryButtonStyle}>
  {t.requestVerificationVideo}
</button>

<button onClick={buyNow} style={buyButtonStyle}>
  {checkoutLoading ? t.redirecting : t.buyNow}
</button>

<button onClick={addToCart} style={primaryButtonStyle}>
  {t.addToCart}
</button>

<button onClick={toggleFavorite} style={secondaryButtonStyle}>
  {isFavorite ? t.inFavorites : t.addToFavorites}
</button>

<button onClick={messageSeller} style={secondaryButtonStyle}>
  {t.messageSeller}
</button>

<button onClick={makeOffer} style={secondaryButtonStyle}>
  {t.makeOffer}
</button>
          </div>
        </div>
      </div>

<div style={stickyBuyBarStyle}>
  <div>
    <div style={{ fontSize: 12, opacity: 0.55 }}>
      {producto.brand}
    </div>

    <div style={{ fontWeight: 800, fontSize: 18 }}>
      {producto.title}
    </div>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
    }}
  >
    <div
      style={{
        fontSize: 28,
        fontWeight: 900,
      }}
    >
      €{producto.price}
    </div>

    <button
      onClick={buyNow}
      style={buyButtonStyle}
    >
      {t.buyNow}
    </button>
  </div>
</div>

      <section style={relatedSectionStyle}>
        <p style={relatedEyebrowStyle}>SELECCIÓN ATHMOV</p>
        <h2 style={relatedTitleStyle}>También te puede gustar</h2>

        <div style={relatedGridStyle} className="product-detail-related">
          {related.map((item) => (
            <div
  key={item.id}
  className="related-card"
              onClick={() => (window.location.href = `/products/${item.id}`)}
              style={relatedCardStyle}
            >
              <div style={relatedImageStyle}>
                <Image
                  src={safeImage(item.image)}
                  alt={item.title || "Producto"}
                  fill
                  sizes="33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "0px" }}>
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

        .image-zoom {
  overflow: hidden;
}

.image-zoom:hover .zoom-image {
  transform: scale(1.12);
}

.product-detail-actions button{
  transition:all .28s ease;
}

.product-detail-actions button:hover{
  transform:translateY(-3px);
  box-shadow:0 18px 45px rgba(0,0,0,.14);
}

.related-card{
    transition:all .35s ease;
}

.related-card:hover{
    transform:translateY(-10px);
    box-shadow:0 35px 90px rgba(0,0,0,.14);
}

.product-detail-meta > div{
    transition:all .3s ease;
}

.product-detail-meta > div:hover{
    transform:translateY(-6px);
    box-shadow:0 22px 60px rgba(0,0,0,.08);
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

          .related-card {
  transition: transform .3s ease, box-shadow .3s ease;
}

.related-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 80px rgba(0,0,0,.12);
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
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: "70px",
  maxWidth: "1480px",
  margin: "0 auto",
  alignItems: "start",
};

const mainImageStyle = {
  position: "relative" as const,
  height: "760px",
  borderRadius: "38px",
  overflow: "hidden",
  background: `
    radial-gradient(circle at top,#ffffff,#f2f2f2)
  `,
  border: "1px solid rgba(0,0,0,.05)",
  boxShadow: "0 40px 120px rgba(0,0,0,.10)",
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
 fontSize: "62px",
fontWeight: 900,
letterSpacing: "-3px",
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
  border: "1px solid rgba(0,0,0,.05)",
  borderRadius: "22px",
  padding: "22px",
  background: "#fff",
  boxShadow: "0 15px 40px rgba(0,0,0,.05)",
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
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
  marginTop: "40px",
  maxWidth: "560px",
};

const buyButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "22px",
  fontSize: "20px",
  fontWeight: 900,
  boxShadow: "0 25px 60px rgba(0,0,0,.25)",
}
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
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
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

const imageBadgesStyle = {
  position: "absolute" as const,
  top: "22px",
  left: "22px",
  display: "flex",
  gap: "10px",
  zIndex: 20,
};

const statusBadgeStyle = {
  background: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  fontWeight: 800,
  fontSize: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
};

const featuredBadgeStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  fontWeight: 800,
  fontSize: "12px",
};

const favoriteFloatingStyle = {
  position: "absolute" as const,
  top: "22px",
  right: "22px",
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  border: "none",
  background: "#fff",
  fontSize: "24px",
  cursor: "pointer",
  zIndex: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
};

const productInfoStickyStyle = {
  position: "sticky" as const,
  top: "120px",
  alignSelf: "start",
};

const quickInfoStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "18px",
  marginBottom: "26px",
};

const quickInfoItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: 800,
};

const trustScoreStyle = {
  maxWidth: "560px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "26px",
  padding: "22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};

const trustScoreLabelStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
  margin: 0,
};

const trustScoreTitleStyle = {
  fontSize: "22px",
  margin: "8px 0 0",
};

const trustScoreBadgeStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: 900,
};

const sellerCardStyle = {
  marginTop: "22px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  padding: "20px",
  maxWidth: "560px",
};

const sellerAvatarStyle = {
  width: "62px",
  height: "62px",
  borderRadius: "50%",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: 900,
};

const sellerNameStyle = {
  margin: 0,
  fontSize: "18px",
};

const sellerMetaStyle = {
  marginTop: "6px",
  color: "#666",
  fontSize: "14px",
};

const sellerRatingStyle = {
  marginTop: "18px",
  padding: "18px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: "22px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
  maxWidth: "320px",
};

const reviewListStyle = {
  marginTop: "14px",
  display: "grid",
  gap: "10px",
  maxWidth: "560px",
};

const reviewItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "18px",
  padding: "16px",
};

const reviewStarsStyle = {
  fontSize: "16px",
  fontWeight: 900,
};

const reviewCommentStyle = {
  marginTop: "8px",
  marginBottom: 0,
  color: "#555",
  lineHeight: 1.6,
  fontSize: "14px",
};

const stickyBuyBarStyle = {
  position: "sticky" as const,
  bottom: "20px",
  marginTop: "60px",
  maxWidth: "1400px",
  marginLeft: "auto",
  marginRight: "auto",
  background: "rgba(255,255,255,.94)",
  border: "1px solid rgba(255,255,255,.6)",
backdropFilter: "blur(24px)",
  borderRadius: "24px",
  padding: "18px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 35px 90px rgba(0,0,0,.15)",
  zIndex: 100,
};

const sellerPremiumCardStyle = {
  marginTop: "28px",
  maxWidth: "560px",
  background: "#111",
  color: "#fff",
  borderRadius: "30px",
  padding: "28px",
  boxShadow: "0 28px 90px rgba(0,0,0,.16)",
};

const sellerPremiumTopStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const sellerAvatarLargeStyle = {
  width: "76px",
  height: "76px",
  borderRadius: "50%",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  fontWeight: 900,
};

const sellerVerifiedTextStyle = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const sellerPremiumNameStyle = {
  margin: "8px 0 6px",
  fontSize: "24px",
};

const sellerStarsStyle = {
  margin: 0,
  fontSize: "14px",
};

const sellerStatsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
  marginTop: "22px",
  color: "rgba(255,255,255,.72)",
  fontSize: "13px",
  fontWeight: 800,
};

const marketInsightStyle = {
  maxWidth: "560px",
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,.05)",
  boxShadow: "0 20px 60px rgba(0,0,0,.06)",
};

const marketLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: .5,
  marginBottom: "18px",
};

const marketRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "14px",
  fontSize: "16px",
};

const marketStatusStyle = {
  marginTop: "18px",
  display: "inline-block",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "8px 16px",
  fontWeight: 800,
  fontSize: "13px",
};

const marketFooterStyle = {
  marginTop: "18px",
  color: "#666",
  fontSize: "13px",
};