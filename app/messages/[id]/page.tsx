"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createNotification } from "@/lib/createNotification";

const PROFILE_TABLE = "profiles";

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_image?: boolean;
  is_offer?: boolean;
  offer_price?: number | null;
  offer_status?: "pending" | "accepted" | "rejected";
  read_by_buyer?: boolean;
  read_by_seller?: boolean;
};

export default function ConversationPage() {
  const params = useParams();
  const conversationId = String(params.id);

  const invalidConversationId =
    !conversationId ||
    conversationId === "[id]" ||
    !isValidUuid(conversationId);

  const [conversationData, setConversationData] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState("");
  const [otherUserId, setOtherUserId] = useState("");
  const [otherOnline, setOtherOnline] = useState(false);
  const [otherLastSeen, setOtherLastSeen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [otherTyping, setOtherTyping] = useState(false);
  const [currentUserIsSeller, setCurrentUserIsSeller] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingChannelRef = useRef<any>(null);
  const userIdRef = useRef("");
  const otherUserIdRef = useRef("");

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const formatLastSeen = (dateString: string | null) => {
    if (!dateString) return "Last seen recently";

    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Last seen just now";
    if (minutes === 1) return "Last seen 1 min ago";
    if (minutes < 60) return `Last seen ${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "Last seen 1 hour ago";
    if (hours < 24) return `Last seen ${hours} hours ago`;

    return "Last seen yesterday";
  };

  const updateMyPresence = async (online: boolean, currentUserId?: string) => {
    const id = currentUserId || userIdRef.current;
    if (!id) return;

    await supabase
      .from(PROFILE_TABLE)
      .update({
        is_online: online,
        last_seen: new Date().toISOString(),
      })
      .eq("id", id);
  };

  const loadOtherProfile = async (otherId: string) => {
    if (!otherId) return;

    const { data } = await supabase
      .from(PROFILE_TABLE)
      .select("is_online,last_seen")
      .eq("id", otherId)
      .maybeSingle();

    if (data) {
      setOtherOnline(!!data.is_online);
      setOtherLastSeen(data.last_seen || null);
    }
  };

  const markMessagesAsRead = async (currentUserId: string) => {
    const { data: conversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .maybeSingle();

    if (!conversation) return;

    setConversationData(conversation);

    if (conversation.product_id) {
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", conversation.product_id)
        .maybeSingle();

      setProductData(product);
    }

    const isSeller = conversation.seller_id === currentUserId;
    setCurrentUserIsSeller(isSeller);

    const otherId = isSeller ? conversation.buyer_id : conversation.seller_id;
    setOtherUserId(otherId);
    otherUserIdRef.current = otherId;

    await loadOtherProfile(otherId);

    await supabase
      .from("conversation_messages")
      .update(isSeller ? { read_by_seller: true } : { read_by_buyer: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", currentUserId);

    await supabase
      .from("conversations")
      .update(isSeller ? { unread_seller: 0 } : { unread_buyer: 0 })
      .eq("id", conversationId);
  };

  const getSeenStatus = (message: Message) => {
    if (message.sender_id !== userId) return "";

    const otherHasRead = currentUserIsSeller
      ? message.read_by_buyer
      : message.read_by_seller;

    return otherHasRead ? "Seen" : "Delivered";
  };

  const loadMessages = async () => {
    if (invalidConversationId) {
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);
      userIdRef.current = user.id;

      await updateMyPresence(true, user.id);
      await markMessagesAsRead(user.id);
    }

    const { data, error } = await supabase
      .from("conversation_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (invalidConversationId) {
      setLoading(false);
      return;
    }

    loadMessages();

    const channel = supabase
      .channel(`chat-room-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversation_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const updatedMessage = payload.new as Message;

          setMessages((current) => {
            const exists = current.some((item) => item.id === updatedMessage.id);

            if (exists) {
              return current.map((item) =>
                item.id === updatedMessage.id ? updatedMessage : item
              );
            }

            return [...current, updatedMessage];
          });

          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user && updatedMessage.sender_id !== user.id) {
            await markMessagesAsRead(user.id);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: PROFILE_TABLE,
        },
        (payload) => {
          const profile = payload.new as any;

          if (profile.id === otherUserIdRef.current) {
            setOtherOnline(!!profile.is_online);
            setOtherLastSeen(profile.last_seen || null);
          }
        }
      )
      .on("broadcast", { event: "typing" }, (payload) => {
        if (payload.payload.user_id === userIdRef.current) return;

        setOtherTyping(true);

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setOtherTyping(false);
        }, 1800);
      })
      .subscribe();

    typingChannelRef.current = channel;

    const onBeforeUnload = () => {
      updateMyPresence(false);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      updateMyPresence(false);
      window.removeEventListener("beforeunload", onBeforeUnload);
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, otherTyping]);

  const sendTyping = () => {
    if (!typingChannelRef.current || !userIdRef.current) return;

    typingChannelRef.current.send({
      type: "broadcast",
      event: "typing",
      payload: {
        user_id: userIdRef.current,
      },
    });
  };

  const updateConversationUnread = async (
    text: string,
    currentUserId: string
  ) => {
    const { data: conversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .maybeSingle();

    if (!conversation) return;

    const senderIsSeller = conversation.seller_id === currentUserId;

    await supabase
      .from("conversations")
      .update({
        last_message: text,
        last_message_at: new Date().toISOString(),
        archived_by_buyer: false,
        archived_by_seller: false,
        unread_buyer: senderIsSeller
          ? Number(conversation.unread_buyer || 0) + 1
          : Number(conversation.unread_buyer || 0),
        unread_seller: senderIsSeller
          ? Number(conversation.unread_seller || 0)
          : Number(conversation.unread_seller || 0) + 1,
      })
      .eq("id", conversationId);
  };

  const sendMessage = async (imageUrl?: string) => {
    const text = content.trim();

    if (!text && !imageUrl) return;
    if (invalidConversationId) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await updateMyPresence(true, user.id);

    setContent("");

    const { data, error } = await supabase
      .from("conversation_messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: imageUrl || text,
        is_image: !!imageUrl,
        is_offer: false,
        read_by_buyer: false,
        read_by_seller: false,
      })
      .select("*")
      .single();

    if (error) {
      console.log("MESSAGE ERROR:", error);
      alert(error.message);
      return;
    }

    await updateConversationUnread(imageUrl ? "Image" : text, user.id);

    if (otherUserId) {
      await createNotification({
        user_id: otherUserId,
        title: "New message",
        message: imageUrl ? "You received an image" : text,
        link: `/messages/${conversationId}`,
      });
    }

    if (data) {
      setMessages((current) => {
        const exists = current.some((item) => item.id === data.id);
        if (exists) return current;
        return [...current, data];
      });
    }
  };

  const sendOffer = async () => {
    const amount = prompt("Introduce tu oferta (€)");
    if (!amount) return;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Introduce una cantidad válida");
      return;
    }

    if (invalidConversationId) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await updateMyPresence(true, user.id);

    const { data, error } = await supabase
      .from("conversation_messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: `Offer: €${numericAmount}`,
        is_offer: true,
        offer_price: numericAmount,
        offer_status: "pending",
        is_image: false,
        read_by_buyer: false,
        read_by_seller: false,
      })
      .select("*")
      .single();

    if (error) {
      console.log(error);
      alert("No se pudo enviar la oferta");
      return;
    }

    await updateConversationUnread(`Offer: €${numericAmount}`, user.id);

    if (otherUserId) {
      await createNotification({
        user_id: otherUserId,
        title: "New offer received",
        message: `You received an offer of €${numericAmount}`,
        link: `/messages/${conversationId}`,
      });
    }

    if (data) {
      setMessages((current) => {
        const exists = current.some((item) => item.id === data.id);
        if (exists) return current;
        return [...current, data];
      });
    }
  };

  const updateOfferStatus = async (
    messageId: string,
    status: "accepted" | "rejected",
    message?: Message
  ) => {
    if (invalidConversationId) return;

    const { error } = await supabase
      .from("conversation_messages")
      .update({ offer_status: status })
      .eq("id", messageId);

    if (error) {
      console.log(error);
      alert("No se pudo actualizar la oferta");
      return;
    }

    setMessages((current) =>
      current.map((item) =>
        item.id === messageId ? { ...item, offer_status: status } : item
      )
    );

    if (status !== "accepted" || !message) return;

    const { data: conversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .maybeSingle();

    if (!conversation) return;

    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", conversation.product_id)
      .maybeSingle();

    if (!product) return;

    if (product.sold) {
      alert("This product has already been sold");
      return;
    }

    const { data: sellerProfile } = await supabase
      .from("profiles")
      .select("stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled")
      .eq("id", conversation.seller_id)
      .maybeSingle();

    if (
      !sellerProfile?.stripe_account_id ||
      !sellerProfile?.stripe_charges_enabled ||
      !sellerProfile?.stripe_payouts_enabled
    ) {
      alert("Seller has not connected Stripe payouts");
      return;
    }

    const price = Number(message.offer_price);
    const platformFee = Number(((price * 8) / 100).toFixed(2));
    const sellerAmount = Number((price - platformFee).toFixed(2));
    const stripeFeeEstimate = Number((price * 0.015 + 0.25).toFixed(2));

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        product_id: product.id,
        seller_id: conversation.seller_id,
        buyer_id: conversation.buyer_id,
        amount: price,
        platform_fee_percent: 8,
        platform_fee: platformFee,
        seller_amount: sellerAmount,
        stripe_fee_estimate: stripeFeeEstimate,
        seller_stripe_account_id: sellerProfile.stripe_account_id,
        status: "pending",
        payment_status: "pending",
        transfer_status: "pending",
      })
      .select("*")
      .single();

    if (orderError || !order) {
      console.log(orderError);
      alert("No se pudo crear la orden");
      return;
    }

    const response = await fetch("/api/checkout-offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        offerId: message.id,
        title: product.title,
        image: product.image,
        price,
        productId: product.id,
        sellerId: conversation.seller_id,
        buyerId: conversation.buyer_id,
        stripeAccountId: sellerProfile.stripe_account_id,
        conversationId,
        origin: window.location.origin,
      }),
    });

    const checkoutData = await response.json();

    if (!response.ok || !checkoutData.url) {
      alert(checkoutData.error || "Checkout error");
      return;
    }

    window.location.href = checkoutData.url;
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (invalidConversationId) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("chat-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.log("UPLOAD ERROR:", error);
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("chat-images")
        .getPublicUrl(fileName);

      await sendMessage(data.publicUrl);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (invalidConversationId) {
    return (
      <main style={pageStyle}>
        <div style={chatStyle}>
          <div style={emptyStateStyle}>
            Invalid conversation. Open the chat from Messages, not from
            /messages/[id].
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle} className="chat-page">
      <div style={chatStyle} className="chat-shell">
        <div style={headerStyle} className="chat-header">
          <button onClick={() => window.history.back()} style={backButtonStyle}>
            ← Back
          </button>

          <div>
            <p style={headerEyebrowStyle}>ATHMOV CHAT</p>

            <h1 style={headerTitleStyle}>Conversation</h1>

            <p style={statusTextStyle}>
              <span
                style={{
                  ...statusDotStyle,
                  background: otherOnline ? "#20c95a" : "#999",
                }}
              />
              {otherOnline ? "Online now" : formatLastSeen(otherLastSeen)}
            </p>
          </div>
        </div>

        {productData && (
          <div style={orderPreviewStyle}>
            <div style={orderPreviewImageStyle}>
              <Image
                src={
                  productData.image ||
                  productData.image_url ||
                  productData.images?.[0] ||
                  "/logo.png"
                }
                alt={productData.title || "Product"}
                fill
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <strong>{productData.title || productData.nombre || "Product"}</strong>
              {conversationData?.order_id && (
                <p style={orderPreviewTextStyle}>
                  Order #{conversationData.order_id.slice(0, 8)}
                </p>
              )}
            </div>
          </div>
        )}

        <div style={messagesStyle} className="chat-messages">
          {loading ? (
            <div style={emptyStateStyle}>Loading conversation...</div>
          ) : messages.length === 0 ? (
            <div style={emptyStateStyle}>
              No messages yet. Start the conversation.
            </div>
          ) : (
            messages.map((message) => {
              const mine = message.sender_id === userId;
              const seenStatus = getSeenStatus(message);

              return (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: mine ? "flex-end" : "flex-start",
                  }}
                >
                  {message.is_offer ? (
                    <div
                      className="chat-bubble"
                      style={{
                        ...offerCardStyle,
                        borderBottomRightRadius: mine ? "8px" : "26px",
                        borderBottomLeftRadius: mine ? "26px" : "8px",
                      }}
                    >
                      <p style={offerEyebrowStyle}>OFFER</p>

                      <h2 style={offerPriceStyle}>€{message.offer_price}</h2>

                      <p style={offerStatusStyle}>
                        Status: {message.offer_status || "pending"}
                      </p>

                      {!mine && message.offer_status === "pending" && (
                        <div style={offerActionsStyle}>
                          <button
                            onClick={() =>
                              updateOfferStatus(message.id, "accepted", message)
                            }
                            style={acceptButtonStyle}
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              updateOfferStatus(message.id, "rejected")
                            }
                            style={rejectButtonStyle}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="chat-bubble"
                      style={{
                        ...bubbleStyle,
                        background: message.is_image
                          ? "transparent"
                          : mine
                            ? "#111"
                            : "#fff",
                        color: mine ? "#fff" : "#111",
                        padding: message.is_image ? 0 : "16px 20px",
                        boxShadow: message.is_image
                          ? "none"
                          : mine
                            ? "0 10px 30px rgba(0,0,0,0.18)"
                            : "0 6px 24px rgba(0,0,0,0.05)",
                        borderBottomRightRadius: mine ? "8px" : "26px",
                        borderBottomLeftRadius: mine ? "26px" : "8px",
                      }}
                    >
                      {message.is_image ? (
                        <div style={chatImageWrapperStyle}>
                          <Image
                            src={message.content}
                            alt="Chat image"
                            fill
                            sizes="280px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  )}

                  <span style={timeStyle}>
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {seenStatus ? ` · ${seenStatus}` : ""}
                  </span>
                </div>
              );
            })
          )}

          {otherTyping && (
            <div style={typingStyle}>
              Typing<span className="typing-dots">...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={inputWrapperStyle} className="chat-input-wrapper">
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              sendTyping();
              updateMyPresence(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Write a message..."
            style={inputStyle}
          />

          <label style={uploadButtonStyle}>
            {uploading ? "..." : "+"}

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              style={{ display: "none" }}
            />
          </label>

          <button onClick={sendOffer} style={offerButtonStyle}>
            Offer
          </button>

          <button onClick={() => sendMessage()} style={buttonStyle}>
            Send
          </button>
        </div>
      </div>

      <style>{`
        .chat-bubble {
          animation: bubbleIn 0.22s ease;
        }

        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .typing-dots {
          animation: typingPulse 1s infinite;
        }

        @keyframes typingPulse {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        @media (max-width: 700px) {
          .chat-page {
            padding: 120px 12px 18px !important;
          }

          .chat-shell {
            height: calc(100vh - 138px) !important;
            border-radius: 28px !important;
          }

          .chat-header {
            padding: 18px !important;
          }

          .chat-messages {
            padding: 18px !important;
            gap: 14px !important;
          }

          .chat-input-wrapper {
            padding: 12px !important;
          }

          .chat-input-wrapper input {
            padding: 14px 16px !important;
          }

          .chat-input-wrapper button {
            padding: 0 16px !important;
          }

          .chat-bubble {
            max-width: 82% !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "40px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "24px 28px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  background: "#fff",
  backdropFilter: "blur(18px)",
  position: "sticky" as const,
  top: 0,
  zIndex: 20,
};

const backButtonStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 600,
};

const headerEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  margin: 0,
};

const headerTitleStyle = {
  fontSize: "24px",
  margin: "6px 0 0",
  letterSpacing: "-1px",
};

const statusTextStyle = {
  margin: "8px 0 0",
  fontSize: "13px",
  color: "#666",
  display: "flex",
  alignItems: "center",
  gap: "7px",
};

const statusDotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  display: "inline-block",
};

const chatStyle = {
  maxWidth: "980px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "34px",
  height: "86vh",
  display: "flex",
  flexDirection: "column" as const,
  overflow: "hidden",
  boxShadow: "0 20px 80px rgba(0,0,0,0.06)",
};

const messagesStyle = {
  flex: 1,
  padding: "34px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "22px",
  overflowY: "auto" as const,
  background: "linear-gradient(to bottom, #f8f8f4 0%, #f3f2ed 100%)",
  scrollBehavior: "smooth" as const,
};

const inputWrapperStyle = {
  display: "flex",
  padding: "18px",
  borderTop: "1px solid rgba(0,0,0,0.06)",
  gap: "12px",
  background: "#fff",
};

const bubbleStyle = {
  maxWidth: "68%",
  padding: "16px 20px",
  borderRadius: "26px",
  fontSize: "15px",
  lineHeight: 1.5,
  wordBreak: "break-word" as const,
  backdropFilter: "blur(20px)",
};

const chatImageWrapperStyle = {
  position: "relative" as const,
  width: "280px",
  height: "220px",
  borderRadius: "24px",
  overflow: "hidden",
  background: "#eee",
};

const offerCardStyle = {
  maxWidth: "320px",
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "26px",
  padding: "20px",
  boxShadow: "0 14px 44px rgba(0,0,0,0.08)",
};

const offerEyebrowStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
  margin: 0,
};

const offerPriceStyle = {
  fontSize: "38px",
  margin: "8px 0",
  letterSpacing: "-2px",
};

const offerStatusStyle = {
  margin: 0,
  color: "#666",
  fontSize: "13px",
  textTransform: "uppercase" as const,
};

const offerActionsStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "16px",
};

const acceptButtonStyle = {
  flex: 1,
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: 800,
};

const rejectButtonStyle = {
  flex: 1,
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: 800,
};

const inputStyle = {
  flex: 1,
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "16px 20px",
  fontSize: "15px",
  outline: "none",
  background: "#f7f7f3",
};

const uploadButtonStyle = {
  width: "54px",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: 300,
  flexShrink: 0,
};

const offerButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "0 22px",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "14px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "0 28px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "14px",
};

const timeStyle = {
  fontSize: "11px",
  opacity: 0.4,
  marginTop: "6px",
  padding: "0 6px",
};

const typingStyle = {
  alignSelf: "flex-start",
  background: "#fff",
  color: "#777",
  padding: "12px 16px",
  borderRadius: "999px",
  fontSize: "13px",
  boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
};

const emptyStateStyle = {
  margin: "auto",
  color: "#777",
  fontSize: "14px",
};

const orderPreviewStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "14px 24px",
  background: "#fff",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const orderPreviewImageStyle = {
  position: "relative" as const,
  width: "64px",
  height: "64px",
  borderRadius: "16px",
  overflow: "hidden",
  background: "#eee",
  flexShrink: 0,
};

const orderPreviewTextStyle = {
  margin: "4px 0 0",
  fontSize: "12px",
  color: "#666",
};