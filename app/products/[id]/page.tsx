"use client";

import Image from "next/image";
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
          .select(
            "seller_verified, seller_level, seller_badge, stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled"
          )
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
      alert("Este producto ya se ha vendido");
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
      alert("El vendedor todavía no tiene los pagos de Stripe activos");
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
        alert(orderError?.message || "No se pudo crear el pedido");
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
      alert("Error al iniciar el checkout");
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
      alert("Este producto ya se ha vendido");
      return;
    }

    if (!producto?.seller_id) {
      alert("Este producto no tiene vendedor asociado");
      return;
    }

    const amount = prompt("Introduce tu oferta");
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
      alert("Debes iniciar sesión");
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

    alert("Oferta enviada");
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

    alert("Añadido al carrito");
  };

  if (loading) {
    return <div style={{ padding: "60px" }}>Cargando producto...</div>;
  }

  if (notFound || !producto) {
    return <div style={{ padding: "60px" }}>Producto no encontrado</div>;
  }

  if (producto.sold) {
    return (
      <main style={pageStyle}>
        <button onClick={() => window.history.back()} style={backButtonStyle}>
          ← Volver
        </button>

        <section style={soldCardStyle}>
          <p style={soldEyebrowStyle}>ATHMOV MARKETPLACE</p>
          <h1 style={soldTitleStyle}>Este producto se ha vendido</h1>
          <p style={soldTextStyle}>
            Este artículo ya no está disponible. Puedes seguir explorando
            material deportivo premium similar.
          </p>

          <button
            onClick={() => {
              window.location.href = "/products";
            }}
            style={buyButtonStyle}
          >
            Volver al marketplace
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
        ← Volver
      </button>

      <div style={layoutStyle} className="product-detail-layout">
        <div>
          <div style={mainImageStyle} className="product-detail-image">
            <Image
              src={safeImage(selectedImage)}
              alt={producto.title || "Producto"}
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
                  alt={`Producto ${index + 1}`}
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
              ["ESTADO", getConditionLabel(producto.condition)],
              [
                "VENDEDOR",
                sellerProfile?.seller_verified ? "Verificado" : "Disponible",
              ],
              ["UBICACIÓN", producto.location || "España"],
            ].map(([label, value]) => (
              <div key={label} style={metaCardStyle}>
                <p style={metaLabelStyle}>{label}</p>
                <p style={metaValueStyle}>{value}</p>
              </div>
            ))}
          </div>

          <div style={trustPanelStyle}>
            <div style={trustPanelItemStyle}>✓ Protección al comprador</div>
            <div style={trustPanelItemStyle}>✓ Pago seguro</div>
            <div style={trustPanelItemStyle}>
              {sellerProfile?.seller_verified
                ? "✓ Vendedor verificado"
                : "Perfil del vendedor disponible"}
            </div>
            <div style={trustPanelItemStyle}>✓ Marketplace seleccionado</div>
          </div>

          <section style={buyerGuideStyle}>
            <div style={buyerGuideHeaderStyle}>
              <div>
                <p style={buyerGuideEyebrowStyle}>GUÍA DEL COMPRADOR · BETA</p>
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
            <div style={verifiedSellerBadgeStyle}>✓ Vendedor verificado</div>
          )}

          {producto.seller_id && (
            <button
              onClick={() => {
                window.location.href = `/seller/${producto.seller_id}`;
              }}
              style={sellerButtonStyle}
            >
              Ver perfil del vendedor
            </button>
          )}

          <div style={actionsStyle} className="product-detail-actions">
            <button onClick={messageSeller} style={secondaryButtonStyle}>
              Solicitar vídeo de verificación
            </button>

            <button onClick={buyNow} style={buyButtonStyle}>
              {checkoutLoading ? "Redirigiendo..." : "Comprar ahora"}
            </button>

            <button onClick={addToCart} style={primaryButtonStyle}>
              Añadir al carrito
            </button>

            <button onClick={toggleFavorite} style={secondaryButtonStyle}>
              {isFavorite ? "❤️ En favoritos" : "🤍 Añadir a favoritos"}
            </button>

            <button onClick={messageSeller} style={secondaryButtonStyle}>
              Escribir al vendedor
            </button>

            <button onClick={makeOffer} style={secondaryButtonStyle}>
              Hacer oferta
            </button>
          </div>
        </div>
      </div>

      <section style={relatedSectionStyle}>
        <p style={relatedEyebrowStyle}>SELECCIÓN ATHMOV</p>
        <h2 style={relatedTitleStyle}>También te puede gustar</h2>

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
                  alt={item.title || "Producto"}
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