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

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [producto, setProducto] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
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
    `
      id,
      full_name,
      username,
      avatar_url,
      location,
      response_time,
      created_at,
      total_sales,
      last_active,
      seller_verified,
      seller_level,
      seller_badge,
      stripe_account_id,
      stripe_charges_enabled,
      stripe_payouts_enabled
    `
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

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  setMousePosition({
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  });
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

  const { data: checkoutSeller, error: sellerError } = await supabase
    .from("profiles")
    .select(
      `
        stripe_account_id,
        stripe_charges_enabled,
        stripe_payouts_enabled
      `
    )
    .eq("id", producto.seller_id)
    .maybeSingle();

  if (
    sellerError ||
    !checkoutSeller?.stripe_account_id ||
    !checkoutSeller?.stripe_charges_enabled ||
    !checkoutSeller?.stripe_payouts_enabled
  ) {
    alert(t.sellerStripeInactive);
    return;
  }

  try {
    setCheckoutLoading(true);

    const price = Number(producto.price);
    const platformFee = Number(((price * 8) / 100).toFixed(2));
    const sellerAmount = Number((price - platformFee).toFixed(2));
    const stripeFeeEstimate = Number(
      (price * 0.015 + 0.25).toFixed(2)
    );

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
          seller_stripe_account_id:
            checkoutSeller.stripe_account_id,
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
        stripeAccountId: checkoutSeller.stripe_account_id,
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

  useEffect(() => {
  const handleScroll = () => {
    setShowStickyBar(window.scrollY > 650);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

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
            className="buy-button"
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

    const memberSince =
  sellerProfile?.created_at
    ? new Date(sellerProfile.created_at).getFullYear()
    : "2025";

const responseTime =
  sellerProfile?.response_time || "< 1 hora";

const sales =
  sellerProfile?.total_sales || 0;

  return (
    <main className="product-detail-page" style={pageStyle}>
      <button onClick={() => window.history.back()} style={backButtonStyle}>
        {t.back}
      </button>

      <div style={layoutStyle} className="product-detail-layout">
        <div>
 <div
  style={mainImageStyle}
  className="product-detail-image"
  onMouseMove={handleImageMove}
>
  <div style={imageBadgesStyle}>
    <span style={statusBadgeStyle}>
      {getConditionLabel(producto.condition)}
    </span>

    {producto.featured && (
      <span style={featuredBadgeStyle}>⭐ Destacado</span>
    )}
  </div>

  <button onClick={toggleFavorite} style={favoriteFloatingStyle}>
    {isFavorite ? "❤️" : "🤍"}
  </button>

  <div
    style={{
      position: "absolute",
      width: "560px",
height: "560px",
      borderRadius: "50%",
      background: "rgba(255,255,255,.75)",
      filter: "blur(130px)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      pointerEvents: "none",
      zIndex: 1,
    }}
  />

  <img
    src={safeImage(selectedImage)}
    alt={producto.title || "Producto"}
    className="product-main-image product-zoom-image"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: `${mousePosition.x}% ${mousePosition.y}%`,
      padding: "56px",
      transition: "transform .35s ease, object-position .15s ease",
      filter: "drop-shadow(0 55px 90px rgba(0,0,0,.22))",
      position: "relative",
      zIndex: 2,
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
                  style={{
  objectFit: "contain",
  padding: "14px",
}}
                />
              </button>
            ))}
          </div>
        </div>

          <div
  style={productInfoStickyStyle}
  className="product-info-panel"
>
  <p style={brandStyle}>{producto.brand}</p>

          <h1 style={titleStyle} className="product-detail-title">
            {producto.title}
          </h1>

 <div
  style={{
    display: "flex",
    alignItems: "flex-end",
    gap: "14px",
    marginBottom: "34px",
  }}
>
  <span
    className="product-detail-price"
    style={{
      fontSize: "82px",
      fontWeight: 950,
      letterSpacing: "-5px",
      lineHeight: 1,
    }}
  >
    €{producto.price}
  </span>

  <span
    style={{
      marginBottom: "12px",
      color: "#888",
      fontSize: "15px",
      fontWeight: 700,
    }}
  >
    IVA incl.
  </span>
</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "34px",
  }}
>
  <span
    style={{
      background: "#111",
      color: "#fff",
      borderRadius: "999px",
      padding: "10px 18px",
      fontWeight: 800,
      fontSize: "12px",
    }}
  >
    ATHMOV PREMIUM
  </span>

  <span
    style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,.08)",
      borderRadius: "999px",
      padding: "10px 18px",
      fontWeight: 700,
      fontSize: "12px",
    }}
  >
    Pago protegido
  </span>

  <span
    style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,.08)",
      borderRadius: "999px",
      padding: "10px 18px",
      fontWeight: 700,
      fontSize: "12px",
    }}
  >
    Envío asegurado
  </span>
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "-18px",
    marginBottom: "34px",
  }}
>
  <span
    style={{
      background: "#111",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 900,
    }}
  >
    Mejor precio
  </span>

  <span
    style={{
      color: "#777",
      fontSize: "14px",
      fontWeight: 600,
    }}
  >
    Precio verificado por ATHMOV
  </span>
</div>

<div style={conditionBadgeStyle}>
  {getConditionLabel(producto.condition)}
</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "28px",
  }}
>
  <span
    style={{
      background: "#111",
      color: "#fff",
      borderRadius: "999px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 800,
    }}
  >
    ✓ Verificado
  </span>

  <span
    style={{
      background: "#f3f3ef",
      borderRadius: "999px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 800,
    }}
  >
    🚚 Envío protegido
  </span>

  <span
    style={{
      background: "#f3f3ef",
      borderRadius: "999px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 800,
    }}
  >
    ⭐ Marketplace Premium
  </span>
</div>

<div
  style={{
    background: "linear-gradient(180deg,#ffffff,#f7f7f3)",
    border: "1px solid rgba(0,0,0,.05)",
    borderRadius: "30px",
    padding: "30px",
    marginBottom: "34px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0 25px 80px rgba(0,0,0,.06)",
  }}
>
 <strong
  style={{
    fontSize: "22px",
    fontWeight: 900,
    letterSpacing: "-0.5px",
  }}
>
  Compra protegida por ATHMOV
</strong>

  <p>✓ Pago seguro mediante Stripe</p>

<p>✓ Vendedor verificado</p>

<p>✓ Envío con seguimiento</p>

<p>✓ Soporte ATHMOV hasta la entrega</p>
</div>

   <div style={marketCardStyle}>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 28,
    }}
  >
    <div>
      <p style={marketLabelStyle}>MARKET VALUE</p>

      <h3
        style={{
          margin: "6px 0 0",
          fontSize: 28,
          fontWeight: 900,
        }}
      >
        Precio del mercado
      </h3>
    </div>

    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "999px",
        fontWeight: 800,
      }}
    >
      -8%
    </div>
  </div>

  <div
    style={{
      position: "relative",
      height: 12,
      borderRadius: 999,
      background: "#ececec",
      overflow: "hidden",
      marginBottom: 28,
    }}
  >
    <div
      style={{
        width: "62%",
        height: "100%",
        background: "linear-gradient(90deg,#22c55e,#84cc16)",
      }}
    />
  </div>

  <div style={marketRowStyle}>
    <span>Precio medio</span>
    <strong>€{Math.round(Number(producto.price) * 1.08)}</strong>
  </div>

  <div style={marketRowStyle}>
    <span>Precio ATHMOV</span>
    <strong>€{producto.price}</strong>
  </div>

  <p
    style={{
      marginTop: 22,
      color: "#22a559",
      fontWeight: 800,
    }}
  >
    Este producto está un 8% por debajo del precio medio del mercado.
  </p>
</div>

<div style={trustStripStyle}>
  <div style={trustStripItemStyle}>
    <span>🛡</span>
    <span>Compra protegida</span>
  </div>

  <div style={trustStripItemStyle}>
    <span>💳</span>
    <span>Pago seguro</span>
  </div>

  <div style={trustStripItemStyle}>
    <span>🚚</span>
    <span>Envío protegido</span>
  </div>

  <div style={trustStripItemStyle}>
    <span>⭐</span>
    <span>Marketplace Premium</span>
  </div>
</div>

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

<div
  className="product-feature-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px",
    margin: "28px 0",
  }}
>
  <div
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "18px",
      textAlign: "center",
      border: "1px solid rgba(0,0,0,.06)",
    }}
  >
    <div style={{ fontSize: 26 }}>📦</div>
    <strong>En stock</strong>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "18px",
      textAlign: "center",
      border: "1px solid rgba(0,0,0,.06)",
    }}
  >
    <div style={{ fontSize: 26 }}>🚚</div>
    <strong>24-72 h</strong>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "18px",
      textAlign: "center",
      border: "1px solid rgba(0,0,0,.06)",
    }}
  >
    <div style={{ fontSize: 26 }}>🛡</div>
    <strong>Protegido</strong>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "18px",
      textAlign: "center",
      border: "1px solid rgba(0,0,0,.06)",
    }}
  >
    <div style={{ fontSize: 26 }}>💳</div>
    <strong>Stripe</strong>
  </div>
</div>

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

<div style={timelineStyle}>
  <h3 style={timelineTitleStyle}>Historial del producto</h3>

  <div style={timelineItemStyle}>
    <span>📅</span>
    <div>
      <strong>Publicado</strong>
      <p>
        {new Date(producto.created_at).toLocaleDateString("es-ES")}
      </p>
    </div>
  </div>

  <div style={timelineItemStyle}>
    <span>👁</span>
    <div>
      <strong>Visualizaciones</strong>
      <p>{producto.views || 0}</p>
    </div>
  </div>

  <div style={timelineItemStyle}>
    <span>❤</span>
    <div>
      <strong>Favoritos</strong>
      <p>{producto.favorites_count || 0}</p>
    </div>
  </div>

  <div style={timelineItemStyle}>
    <span>📍</span>
    <div>
      <strong>Ubicación</strong>
      <p>{producto.location || "España"}</p>
    </div>
  </div>

  <div style={timelineItemStyle}>
    <span>🚚</span>
    <div>
      <strong>Entrega estimada</strong>
      <p>24-72 horas</p>
    </div>
  </div>

  <div style={timelineItemStyle}>
    <span>🛡</span>
    <div>
      <strong>Estado</strong>
      <p>Verificado por ATHMOV</p>
    </div>
  </div>
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
<div
  style={{
    ...sellerPremiumCardStyle,
    cursor: "pointer",
  }}
  className="seller-premium-card"
  onClick={() =>
    window.location.href = `/profile/${sellerProfile?.id}`
  }
>
  <div
  style={{
    height: "3px",
    width: "90px",
    borderRadius: "999px",
    background: "linear-gradient(90deg,#fff,#8f8f8f)",
    marginBottom: "24px",
  }}
/>
  <div
  style={sellerPremiumTopStyle}
  className="seller-premium-top"
>
    <div
  style={sellerAvatarLargeStyle}
  className="seller-premium-avatar"
>
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

      <h3
  style={sellerPremiumNameStyle}
  className="seller-premium-name"
>
  {sellerProfile?.full_name ||
    sellerProfile?.username ||
    sellerProfile?.seller_badge ||
    t.athmovSeller}
</h3>

      <p style={sellerStarsStyle}>
        ★★★★★ <span style={{ opacity: 0.55 }}>({sellerReviews.length} reseñas)</span>
      </p>
    </div>
  </div>

<div
  style={sellerStatsGridStyle}
  className="seller-stats-grid"
>
  <div style={sellerStatCardStyle}>
    <strong>{sales}</strong>
    <span>Ventas</span>
  </div>

  <div style={sellerStatCardStyle}>
    <strong>
      {averageRating !== null ? averageRating.toFixed(1) : "Nuevo"}
    </strong>
    <span>Valoración</span>
  </div>

  <div style={sellerStatCardStyle}>
    <strong>{responseTime}</strong>
    <span>Respuesta</span>
  </div>

  <div style={sellerStatCardStyle}>
    <strong>{memberSince}</strong>
    <span>Miembro</span>
  </div>
</div>

</div>

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

<button
  onClick={buyNow}
  style={buyButtonStyle}
  className="buy-button"
>
  {checkoutLoading ? t.redirecting : t.buyNow}
</button>

<button onClick={addToCart} style={primaryButtonStyle}>
  {t.addToCart}
</button>

<div
  style={secondaryActionsGridStyle}
  className="secondary-actions-grid"
>
  <button onClick={messageSeller} style={secondaryButtonStyle}>
    {t.messageSeller}
  </button>

  <button onClick={makeOffer} style={secondaryButtonStyle}>
    {t.makeOffer}
  </button>

  <button onClick={toggleFavorite} style={secondaryButtonStyle}>
    {isFavorite ? t.inFavorites : t.addToFavorites}
  </button>
</div>
        </div>
      </div>
      </div>

{showStickyBar && (
<div style={stickyBuyBarStyle} className="sticky-buy-bar">
  <div>
    <div style={{ fontSize: 12, opacity: 0.55 }}>
      {producto.brand}
    </div>

    <div style={{ fontWeight: 800, fontSize: 18 }}>
      {producto.title}
    </div>
  </div>

 <div
  className="sticky-buy-actions"
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
)}

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
  className="product-main-image"
  style={{
    objectFit: "contain",
    objectPosition: "center",
    padding: "42px",
    transition: "transform 0.5s ease",
  }}
/>
              </div>
              <div style={{ padding: "28px" }}>
                <p style={relatedBrandStyle}>{item.brand}</p>
                <h3 style={relatedProductTitleStyle}>{item.title}</h3>
                <p
  style={{
    color: "#777",
    fontSize: "14px",
    marginTop: "-8px",
    marginBottom: "18px",
  }}
>
  Excelente estado · Vendedor verificado
</p>
                <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  }}
>
  <p style={relatedPriceStyle}>€{item.price}</p>

  <span
    style={{
      background: "#111",
      color: "#fff",
      borderRadius: "999px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: 800,
    }}
  >
    Ver
  </span>
</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`

      .seller-premium-card{
    transition:.45s ease;
}

.seller-premium-card:hover{
    transform:translateY(-10px);
    box-shadow:0 70px 180px rgba(0,0,0,.35);
}

.seller-stats-grid > div{
    transition:.35s;
}

.seller-stats-grid > div:hover{
    transform:translateY(-6px);
    background:rgba(255,255,255,.15);
}

      .buy-button{
    position:relative;
    overflow:hidden;
}

.buy-button::before{
    content:"";
    position:absolute;
    left:-120%;
    top:0;
    width:70%;
    height:100%;
    background:linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.28),
        transparent
    );
    transition:.7s;
}

.buy-button:hover::before{
    left:150%;
}

      .product-detail-layout{
    animation:fadeUp .7s ease;
}

@keyframes fadeUp{
    from{
        opacity:0;
        transform:translateY(35px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

      .product-detail-thumbs button:hover{
    transform:translateY(-6px);
    box-shadow:0 25px 70px rgba(0,0,0,.12);
}

      .product-main-image{
transition:transform .55s ease;
}

.product-main-image{
  transition: transform .6s ease;
}

 .buy-button:hover{
  transform: translateY(-3px);
  box-shadow: 0 35px 90px rgba(0,0,0,.28);
}

.buy-button:active{
  transform: translateY(-1px);
}

        .main-product-image:hover {
          transform: scale(1.04);
        }

        .image-zoom {
  overflow: hidden;
}

.product-detail-image:hover .product-zoom-image {
  transform: scale(1.12);
}

.product-detail-actions button {
  transition: all .28s ease;
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

        .seller-stats-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.seller-stats-grid > div {
  min-width: 0 !important;
  padding: 16px 8px !important;
}

.seller-stats-grid strong {
  font-size: 18px !important;
  overflow-wrap: anywhere;
}

.seller-stats-grid span {
  font-size: 11px !important;
}

.seller-premium-card {
  padding: 24px 18px !important;
  border-radius: 28px !important;
}

.seller-premium-top {
  align-items: flex-start !important;
}

.seller-premium-avatar {
  width: 72px !important;
  height: 72px !important;
  flex-shrink: 0 !important;
}

.seller-premium-name {
  font-size: 24px !important;
  line-height: 1.05 !important;
  overflow-wrap: anywhere;
}

        .product-info-panel {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  position: static !important;
}

        .product-detail-layout > div:last-child {
  min-width: 0 !important;
}

.product-detail-layout > div:last-child > div {
  position: static !important;
  top: auto !important;
  padding: 28px 20px !important;
  border-radius: 30px !important;
}

.product-feature-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.product-feature-grid > div {
  padding: 15px 8px !important;
  border-radius: 18px !important;
  font-size: 13px !important;
}

.secondary-actions-grid {
  grid-template-columns: 1fr !important;
}

.sticky-buy-bar {
  bottom: 12px !important;
  width: calc(100% - 24px) !important;
  padding: 12px !important;
  border-radius: 22px !important;
  gap: 12px !important;
}

.sticky-buy-bar > div:first-child {
  display: none !important;
}

.sticky-buy-actions {
  width: 100% !important;
  gap: 10px !important;
}

.sticky-buy-actions > div {
  font-size: 24px !important;
  white-space: nowrap !important;
}

.sticky-buy-actions button {
  height: 54px !important;
  flex: 1 !important;
  width: auto !important;
  padding: 0 20px !important;
  font-size: 14px !important;
}

.product-detail-image .product-zoom-image {
  padding: 28px !important;
  transform: none !important;
  object-position: center !important;
}

.product-detail-image:hover .product-zoom-image {
  transform: none !important;
}

.product-detail-page {
  overflow-x: hidden !important;
}

        .product-detail-page {
  padding: 130px 18px 110px !important;
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

.product-detail-price {
  animation: priceFade .8s ease;
}

.seller-premium-card {
  animation: sellerCard .9s ease;
}

@keyframes priceFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sellerCard {
  from {
    opacity: 0;
    transform: translateY(35px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
      `}</style>
    </main>
  );
}

const marketCardStyle = {
  maxWidth: "560px",
  background: "#fff",
  borderRadius: "34px",
  padding: "34px",
  border: "1px solid rgba(0,0,0,.05)",
  boxShadow: "0 28px 90px rgba(0,0,0,.07)",
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f7f3",
  paddingTop: "140px",
  paddingLeft: "60px",
  paddingRight: "60px",
  paddingBottom: "60px",
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
  gridTemplateColumns: "1.08fr .92fr",
  gap: "90px",
  maxWidth: "1500px",
  margin: "0 auto",
  alignItems: "start",
};

const mainImageStyle = {
  position: "relative" as const,
  width: "100%",
  minHeight: "720px",
  borderRadius: "42px",
  overflow: "hidden",
background:
"radial-gradient(circle at 50% 28%, #ffffff 0%, #fcfcfb 28%, #f5f5f2 58%, #ecece8 100%)",
  boxShadow:"0 60px 180px rgba(0,0,0,.14)",
  border: "1px solid rgba(0,0,0,.04)",
  cursor: "zoom-in",
};

const thumbGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
  marginTop: "18px",
};

const thumbButtonStyle = {
  position: "relative" as const,
  height: "140px",
  borderRadius: "26px",
  overflow: "hidden",
  background:"linear-gradient(180deg,#fff,#f5f5f2)",
  cursor: "pointer",
  boxShadow: "0 18px 50px rgba(0,0,0,.06)",
  transition:"all .3s ease",
};

const brandStyle = {
  fontSize: "13px",
  letterSpacing: "4px",
  opacity: 0.45,
  fontWeight: 900,
  textTransform: "uppercase" as const,
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "76px",
  lineHeight: .92,
  marginTop: "12px",
  marginBottom: "26px",
  letterSpacing: "-5px",
  fontWeight: 950,
};

const priceStyle = {
  fontSize:"82px",
fontWeight: 950,
letterSpacing:"-5px",
marginTop: "10px",
marginBottom: "36px",
  color: "#111",
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
  gridTemplateColumns: "1fr",
  gap: "14px",
  marginTop: "34px",
  maxWidth: "100%",
};

const buyButtonStyle = {
  width: "100%",
  height:"76px",
  border: "none",
  borderRadius: "999px",
  background:
"linear-gradient(135deg,#000,#2c2c2c)",
  color: "#fff",
  fontSize: "18px",
  fontWeight: 950,
  letterSpacing:"1px",
  cursor: "pointer",
  boxShadow: "0 28px 80px rgba(0,0,0,.25)",
  transition: "all .30s ease",
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
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "28px",
};

const relatedCardStyle = {
  background: "rgba(255,255,255,.86)",
  backdropFilter: "blur(20px)",
  borderRadius: "34px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(255,255,255,.65)",
  boxShadow: "0 28px 90px rgba(0,0,0,.08)",
};

const relatedImageStyle = {
  position: "relative" as const,
  height: "360px",
  background: "linear-gradient(180deg,#fff,#f4f4f0)",
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
  alignSelf: "flex-start",
  background:"rgba(255,255,255,.82)",
 backdropFilter:"blur(35px)",
  border: "1px solid rgba(255,255,255,.65)",
  borderRadius: "42px",
  padding: "48px",
  boxShadow:"0 55px 150px rgba(0,0,0,.10)",
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
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "18px",
  padding: "18px",
  backdropFilter: "blur(10px)",
};

const reviewStarsStyle = {
  fontSize: "16px",
  fontWeight: 900,
  color: "#fff",
};

const reviewCommentStyle = {
  marginTop: "10px",
  marginBottom: 0,
  color: "rgba(255,255,255,.78)",
  lineHeight: 1.6,
  fontSize: "14px",
};

const stickyBuyBarStyle = {
  position: "fixed" as const,
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "28px",
  width: "calc(100% - 36px)",
  maxWidth: "620px",
  background: "rgba(255,255,255,.94)",
  border: "1px solid rgba(255,255,255,.6)",
  backdropFilter: "blur(24px)",
  borderRadius: "24px",
  padding: "14px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 35px 90px rgba(0,0,0,.15)",
  zIndex: 80,
};

const sellerPremiumCardStyle = {
  marginTop: "28px",
  maxWidth: "560px",
  background:
"linear-gradient(160deg,#111 0%,#1d1d1d 45%,#2b2b2b 100%)",
  color: "#fff",
  borderRadius:"38px",
  padding: "32px",
  boxShadow:"0 55px 160px rgba(0,0,0,.28)",
  border: "1px solid rgba(255,255,255,.08)",
};

const sellerPremiumTopStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const sellerAvatarLargeStyle = {
  position: "relative" as const,
  overflow: "hidden",
  width:"96px",
height:"96px",
  borderRadius: "50%",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  fontWeight: 950,
  border:"3px solid rgba(255,255,255,.25)",
boxShadow:
"0 0 0 6px rgba(255,255,255,.04),0 18px 50px rgba(0,0,0,.35)",
};

const sellerVerifiedTextStyle = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const sellerPremiumNameStyle = {
  margin: "8px 0 6px",
  fontSize: "30px",
  fontWeight: 900,
  letterSpacing: "-1px",
};

const sellerStarsStyle = {
  margin: 0,
  fontSize: "14px",
};

const sellerStatsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "12px",
  marginTop: "28px",
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

const trustCardStyle = {
  background: "#fafaf8",
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: "24px",
  padding: "26px",
  margin: "26px 0",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  boxShadow: "0 18px 50px rgba(0,0,0,.05)",
};

const conditionBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  background: "#f3f3ef",
  border: "1px solid rgba(0,0,0,.06)",
  borderRadius: "999px",
  padding: "10px 18px",
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "0.5px",
  marginBottom: "24px",
};

const secondaryActionsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
};

const sellerStatCardStyle = {
  background: "rgba(255,255,255,.08)",
  borderRadius: "18px",
  padding: "18px 12px",
  textAlign: "center" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px",
};

const timelineStyle = {
  maxWidth: "560px",
  background: "#fff",
  borderRadius: "28px",
  padding: "30px",
  marginTop: "34px",
  marginBottom: "34px",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 20px 60px rgba(0,0,0,.06)",
};

const timelineTitleStyle = {
  fontSize: "24px",
  fontWeight: 900,
  marginBottom: "26px",
};

const timelineItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "18px",
  padding: "16px 0",
  borderBottom: "1px solid rgba(0,0,0,.06)",
};

const trustStripStyle = {
  maxWidth: "560px",
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "12px",
  marginTop: "24px",
  marginBottom: "32px",
};

const trustStripItemStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,.06)",
  borderRadius: "18px",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontWeight: 800,
  fontSize: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,.04)",
};