"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import StickyBuyBar from "@/components/product/StickyBuyBar";
import dynamic from "next/dynamic";

const ProductFeatureGrid = dynamic(
  () => import("@/components/product/ProductFeatureGrid")
);

const ProductTimeline = dynamic(
  () => import("@/components/product/ProductTimeline")
);

const ProductBuyerGuide = dynamic(
  () => import("@/components/product/ProductBuyerGuide")
);

const SellerPremiumCard = dynamic(
  () => import("@/components/product/SellerPremiumCard")
);

const RelatedProducts = dynamic(
  () => import("@/components/product/RelatedProducts")
);

const LaunchNoticeModal = dynamic(
  () => import("@/components/LaunchNoticeModal"),
  {
    ssr: false,
  }
);

interface ProductDetailProps {
  productId?: string;
  initialProduct?: any;
}
export default function ProductDetail({
  productId,
  initialProduct,
}: ProductDetailProps) {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();

const locale =
  lang === "en"
    ? "en-GB"
    : lang === "pt"
      ? "pt-PT"
      : "es-ES";

  const id = productId || String(params.id || "");

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [producto, setProducto] = useState<any>(
  initialProduct || null
);
  const [related, setRelated] = useState<any[]>([]);
 const [selectedImage, setSelectedImage] = useState(() => {
  if (
    Array.isArray(initialProduct?.images) &&
    initialProduct.images.length > 0
  ) {
    return initialProduct.images[0];
  }

  return initialProduct?.image || "/logo.png";
});
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(
  !initialProduct
);
const [notFound, setNotFound] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [sellerReviews, setSellerReviews] = useState<any[]>([]);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
 

  useEffect(() => {
  if (initialProduct) {
    setProducto(initialProduct);
    setNotFound(false);
  }

  if ((!id || id === "undefined") && !initialProduct) {
    setLoading(false);
    setNotFound(true);
    return;
  }

const getProduct = async () => {
  try {
    setLoading(!initialProduct);
    setNotFound(false);

  let data = initialProduct;

if (data) {
  setProducto(data);
  setNotFound(false);
}

if (!data) {
      const { data: fetchedProduct, error } = await supabase
        .from("products")
        .select(
          `
            id,
            title,
            description,
            price,
            original_price,
            brand,
            category,
            condition,
            image,
            images,
            location,
            sold,
            moderation_status,
            seller_id,
            created_at,
            views,
            favorites_count,
            featured
          `
        )
        .eq("id", id)
        .eq("moderation_status", "approved")
        .maybeSingle();

      if (error || !fetchedProduct) {
        setProducto(null);
        setNotFound(true);
        return;
      }

      data = fetchedProduct;
      setProducto(fetchedProduct);
    }

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

     let relatedQuery = supabase
  .from("products")
  .select("*")
  .neq("id", data.id)
  .eq("sold", false)
  .eq("moderation_status", "approved");

if (data.category) {
  relatedQuery = relatedQuery.eq("category", data.category);
}

const { data: relatedProducts } = await relatedQuery
  .order("created_at", { ascending: false })
  .limit(8);

setRelated(relatedProducts || []);
    } catch (error) {
  console.error("Error cargando detalles secundarios:", error);

  if (!initialProduct) {
    setNotFound(true);
  }
} finally {
  setLoading(false);
}
    };

    getProduct();
 }, [id, initialProduct]);

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
  if (condition === "New") return t.conditionNew;
  if (condition === "Like new") return t.conditionLikeNew;
  if (condition === "Excellent") return t.conditionExcellent;
  if (condition === "Good") return t.conditionGood;
  if (condition === "Used") return t.conditionUsed;

  return condition || t.conditionExcellent;
};

  const getCategoryRoute = (category?: string) => {
  const normalizedCategory = String(category || "")
    .toLowerCase()
    .trim();

  if (normalizedCategory.includes("golf")) {
    return "/golf";
  }

  if (
    normalizedCategory.includes("pádel") ||
    normalizedCategory.includes("padel")
  ) {
    return "/padel";
  }

  if (
    normalizedCategory.includes("tenis") ||
    normalizedCategory.includes("tennis")
  ) {
    return "/tenis";
  }

  if (normalizedCategory.includes("running")) {
    return "/running";
  }

  return `/products?category=${encodeURIComponent(category || "")}`;
};

 const getBuyerGuide = () => {
  const category = String(
    producto?.category || producto?.brand || ""
  )
    .toLowerCase()
    .trim();

  if (category.includes("padel") || category.includes("pádel")) {
    return {
      sport: t.buyerGuidePadelSport,
      title: t.buyerGuidePadelTitle,
      tips: [
        t.buyerGuidePadelTip1,
        t.buyerGuidePadelTip2,
        t.buyerGuidePadelTip3,
      ],
    };
  }

  if (category.includes("tennis") || category.includes("tenis")) {
    return {
      sport: t.buyerGuideTennisSport,
      title: t.buyerGuideTennisTitle,
      tips: [
        t.buyerGuideTennisTip1,
        t.buyerGuideTennisTip2,
        t.buyerGuideTennisTip3,
      ],
    };
  }

  if (category.includes("golf")) {
    return {
      sport: t.buyerGuideGolfSport,
      title: t.buyerGuideGolfTitle,
      tips: [
        t.buyerGuideGolfTip1,
        t.buyerGuideGolfTip2,
        t.buyerGuideGolfTip3,
      ],
    };
  }

  return {
    sport: t.buyerGuideGenericSport,
    title: t.buyerGuideGenericTitle,
    tips: [
      t.buyerGuideGenericTip1,
      t.buyerGuideGenericTip2,
      t.buyerGuideGenericTip3,
    ],
  };
};

const buyNow = async () => {
  setShowLaunchModal(true);
  return;

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

   const firstMessage = `${t.verificationRequestMessage} "${producto.title}"`;

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
  return (
    <div
      style={{
        padding: "180px 60px 60px",
        fontSize: "20px",
        color: "#111",
      }}
    >
      {t.loadingProduct}
    </div>
  );
}

if (notFound || !producto) {
  return (
    <div
      style={{
        padding: "180px 60px 60px",
        fontSize: "20px",
        color: "#111",
      }}
    >
     {t.productNotFound}
    </div>
  );
}
if (producto.sold) {
  return (
    <main style={pageStyle}>
      <button
        onClick={() => window.history.back()}
        style={backButtonStyle}
      >
        {t.back}
      </button>

      <section style={soldCardStyle}>
        <p style={soldEyebrowStyle}>ATHMOV MARKETPLACE</p>

        <h1 style={soldTitleStyle}>
          {t.productSoldTitle}
        </h1>

        <p style={soldTextStyle}>
          {t.productSoldText}
        </p>

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
  sellerProfile?.response_time || t.defaultResponseTime;

const sales =
  sellerProfile?.total_sales || 0;

return (
  <main className="product-detail-page" style={pageStyle}>
  <nav
  className="product-breadcrumb"
  aria-label={t.brandBreadcrumbLabel}
>
  <span onClick={() => router.push("/")}>
   {t.home}
  </span>

  <span className="breadcrumb-separator">›</span>

  <span
    onClick={() =>
      router.push(getCategoryRoute(producto.category))
    }
  >
    {producto.category}
  </span>

  {producto.brand && (
    <>
      <span className="breadcrumb-separator">›</span>

      <span
        onClick={() =>
          router.push(
            `/brands/${String(producto.brand)
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")}`
          )
        }
      >
        {producto.brand}
      </span>
    </>
  )}

  <span className="breadcrumb-separator">›</span>

  <strong>{producto.title}</strong>
</nav>

    <button onClick={() => window.history.back()} style={backButtonStyle}>
      {t.back}
    </button>

    <section className="product-hero-header premium-reveal premium-delay-0">

  <p className="product-brand">
    {producto.brand}
  </p>

  <h1 className="product-main-title">
    {producto.title}
  </h1>

  <div className="product-meta-row">

    <div className="product-meta-rating">
      ★★★★★

      <span>
        {averageRating !== null
          ? averageRating.toFixed(1)
          : t.newSeller}
      </span>

    </div>

    <span className="product-meta-dot" />

    <span>{producto.location || t.sellerLocationFallback}</span>

    {sellerProfile?.seller_verified && (
      <>
        <span className="product-meta-dot" />
       <span>✔ {t.verifiedSellerLabel}</span>
      </>
    )}

  </div>

</section>

     <div style={layoutStyle} className="product-detail-layout">

  <div className="premium-reveal premium-delay-0">
    <ProductGallery
      title={producto.title}
      images={images}
      selectedImage={selectedImage}
      conditionLabel={getConditionLabel(producto.condition)}
      featured={producto.featured}
      isFavorite={isFavorite}
      mousePosition={mousePosition}
      onSelectImage={setSelectedImage}
      onToggleFavorite={toggleFavorite}
      onImageMove={handleImageMove}
      onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
    />
  </div>

  <div
    id="purchase-panel"
    className="premium-reveal premium-delay-1"
  >
    <ProductPurchasePanel
      brand={producto.brand}
      title={producto.title}
      price={producto.price}
      originalPrice={producto.original_price}
      condition={getConditionLabel(producto.condition)}
      location={producto.location || t.countryFallbackLabel}
      sellerVerified={Boolean(sellerProfile?.seller_verified)}
      checkoutLoading={checkoutLoading}
      isFavorite={isFavorite}
        vatSecurePaymentLabel={t.vatSecurePaymentLabel}
  newPriceLabel={t.newPriceLabel}
  athmovPriceLabel={t.athmovPriceLabel}
  youSaveLabel={t.youSaveLabel}
  securePaymentLabel={t.securePaymentLabel}
  verifiedSellerLabel={t.verifiedSellerLabel}
  protectedShippingLabel={t.protectedShippingLabel}
  estimatedDeliveryLabel={t.estimatedDeliveryLabel}
  estimatedDeliveryText={t.estimatedDeliveryText}
  protectedPaymentLabel={t.protectedPaymentLabel}
  availableLabel={t.availableLabel}
  availableDescription={t.availableDescription}
  athmovProtectionLabel={t.athmovProtectionLabel}
  athmovProtectionText={t.athmovProtectionText}
  stripePaymentLabel={t.stripePaymentLabel}
  stripePaymentText={t.stripePaymentText}
  trackingLabel={t.trackingLabel}
  trackingText={t.trackingText}
  protectionLabel={t.protectionLabel}
  protectionText={t.protectionText}
  singleUnitLabel={t.singleUnitLabel}
  paymentNoteLabel={t.paymentNoteLabel}
  countryFallbackLabel={t.countryFallbackLabel}
      buyNowLabel={t.buyNow}
      redirectingLabel={t.redirecting}
      addToCartLabel={t.addToCart}
      makeOfferLabel={t.makeOffer}
      messageSellerLabel={t.messageSeller}
      addToFavoritesLabel={t.addToFavorites}
      inFavoritesLabel={t.inFavorites}
      locale={locale}
      onBuyNow={buyNow}
      onAddToCart={addToCart}
      onMakeOffer={makeOffer}
      onMessageSeller={messageSeller}
      onToggleFavorite={toggleFavorite}
    />
  </div>

  <StickyBuyBar
    title={producto.title}
    price={producto.price}
    checkoutLoading={checkoutLoading}
    buyNowLabel={t.buyNow}
    redirectingLabel={t.redirecting}
    onBuyNow={buyNow}
  />

</div>

 <p style={descriptionStyle}>{producto.description}</p>

<div className="premium-reveal premium-delay-2">
  <ProductFeatureGrid />
</div>

<div className="premium-reveal premium-delay-3">
  <ProductTimeline
    createdAt={producto.created_at}
    views={producto.views}
    favorites={producto.favorites_count}
    location={producto.location}
  />
</div>

<div className="premium-reveal premium-delay-4">
  <ProductBuyerGuide
    guide={buyerGuide}
    eyebrow={t.buyerGuideBeta}
  />
</div>

<div className="premium-reveal premium-delay-5">
  <SellerPremiumCard
    seller={sellerProfile}
    reviews={sellerReviews}
    averageRating={averageRating}
    memberSince={memberSince}
    responseTime={responseTime}
    sales={sales}
    safeImage={safeImage}
    verifiedLabel={t.sellerVerified}
    sellerLabel={t.athmovSeller}
  />
</div>

<div className="premium-reveal premium-delay-6">
  <RelatedProducts
    products={related}
    safeImage={safeImage}
  />
</div>

{showLaunchModal && (
  <LaunchNoticeModal
    type="buy"
    onClose={() => setShowLaunchModal(false)}
  />
)}

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

.product-navigation{
  display:flex;
  justify-content:space-between;
  align-items:center;

  margin:60px auto 0;
  max-width:1500px;
}

.product-navigation button{
  border:none;
  border-radius:999px;

  padding:14px 22px;

  background:#111;
  color:#fff;

  font-size:14px;
  cursor:pointer;

  transition:all .25s ease;
}

.product-navigation button:hover{
  transform:translateY(-3px);
  box-shadow:0 18px 45px rgba(0,0,0,.18);
}

.product-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 1500px;
  margin: 0 auto 22px;
  font-size: 13px;
  color: #777;
}

.product-breadcrumb span:not(.breadcrumb-separator) {
  cursor: pointer;
  transition: color .25s ease;
}

.product-breadcrumb span:not(.breadcrumb-separator):hover {
  color: #111;
}

.product-breadcrumb .breadcrumb-separator {
  cursor: default;
  color: #aaa;
}

.product-breadcrumb strong {
  color: #111;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 420px;
}
  .premium-reveal{
    width:100%;
    min-width:0;

    opacity:0;
    transform:translateY(28px);

    animation:premiumReveal .8s cubic-bezier(.22,1,.36,1) forwards;
}

.premium-delay-0{animation-delay:.05s;}
.premium-delay-1{animation-delay:.14s;}
.premium-delay-2{animation-delay:.22s;}
.premium-delay-3{animation-delay:.30s;}
.premium-delay-4{animation-delay:.38s;}
.premium-delay-5{animation-delay:.46s;}
.premium-delay-6{animation-delay:.54s;}

@keyframes premiumReveal{

from{
opacity:0;
transform:translateY(28px);
}

to{
opacity:1;
transform:translateY(0);
}
      }
.product-hero-header{

max-width:1500px;

margin:0 auto 46px;

}

.product-brand{

margin:0;

font-size:12px;

font-weight:800;

letter-spacing:.32em;

text-transform:uppercase;

color:#888;

}

.product-main-title{

margin:10px 0 18px;

font-size:68px;

line-height:.95;

letter-spacing:-3px;

font-weight:900;

color:#111;

max-width:900px;

}

.product-meta-row{

display:flex;

align-items:center;

gap:14px;

flex-wrap:wrap;

font-size:15px;

color:#666;

}

.product-meta-rating{

display:flex;

align-items:center;

gap:8px;

font-weight:700;

color:#111;

}

.product-meta-dot{

width:5px;

height:5px;

border-radius:50%;

background:#bbb;

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
        .product-main-title{

font-size:42px;

letter-spacing:-2px;

}

.product-meta-row{

font-size:13px;

gap:10px;

}

        .product-breadcrumb {
  gap: 7px;
  margin-bottom: 18px;
  font-size: 12px;
  flex-wrap: nowrap;
  overflow: hidden;
}

.product-breadcrumb strong {
  max-width: 150px;
}

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

const descriptionStyle = {
  fontSize: "18px",
  color: "#555",
  lineHeight: 1.7,
  maxWidth: "520px",
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