"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MessagesPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();

    const channel = supabase
      .channel("inbox-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversation_messages",
        },
        () => loadConversations()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => loadConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    setUserId(user.id);

    const { data: conversationsData, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order("last_message_at", { ascending: false });

    if (error || !conversationsData) {
      setLoading(false);
      return;
    }

    const visibleConversations = conversationsData.filter((conversation: any) => {
  const isSeller = conversation.seller_id === user.id;
  return isSeller
    ? !conversation.archived_by_seller
    : !conversation.archived_by_buyer;
});

    const enriched = await Promise.all(
  visibleConversations.map(async (conversation: any) => {
        const isSeller = conversation.seller_id === user.id;

        const { data: product } = await supabase
          .from("products")
          .select("*")
          .eq("id", conversation.product_id)
          .maybeSingle();

        const { data: lastMessage } = await supabase
          .from("conversation_messages")
          .select("*")
          .eq("conversation_id", conversation.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        let unreadQuery = supabase
          .from("conversation_messages")
          .select("id")
          .eq("conversation_id", conversation.id)
          .neq("sender_id", user.id);

        unreadQuery = isSeller
          ? unreadQuery.eq("read_by_seller", false)
          : unreadQuery.eq("read_by_buyer", false);

        const { data: unreadMessages } = await unreadQuery;

        return {
          ...conversation,
          product,
          lastMessage,
          unreadCount: unreadMessages?.length || 0,
        };
      })
    );

   setConversations(
  enriched.sort((a: any, b: any) => {
    const dateA = new Date(a.lastMessage?.created_at || a.created_at).getTime();
    const dateB = new Date(b.lastMessage?.created_at || b.created_at).getTime();
    return dateB - dateA;
  })
);

    setLoading(false);
  };

  const archiveConversation = async (
    e: React.MouseEvent<HTMLButtonElement>,
    conversation: any
  ) => {
    e.stopPropagation();

    const confirmArchive = confirm("Archive this conversation?");
    if (!confirmArchive) return;

    const isSeller = conversation.seller_id === userId;

    const updatePayload = isSeller
      ? { archived_by_seller: true }
      : { archived_by_buyer: true };

    const { error } = await supabase
      .from("conversations")
      .update(updatePayload)
      .eq("id", conversation.id);

    if (error) {
      console.log(error);
      alert("No se pudo archivar la conversación");
      return;
    }

    setConversations((current) =>
  current.filter((item: any) => item.id !== conversation.id)
);
  };

  const safeImage = (src?: string) => {
  return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
};

  if (loading) {
    return <main style={loadingStyle}>Loading messages...</main>;
  }

  return (
    <main style={pageStyle} className="messages-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV INBOX</p>
        <h1 style={titleStyle} className="messages-title">Messages</h1>
        <p style={subtitleStyle}>Conversations with buyers and sellers.</p>
      </section>

      {conversations.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>No conversations yet</h2>

          <p style={emptyTextStyle}>
            When you contact a seller, your conversations will appear here.
          </p>

          <button onClick={() => router.push("/products")} style={buttonStyle}>
            Go to marketplace
          </button>
        </section>
      ) : (
        <section style={listStyle}>
          {conversations.map((conversation: any) => {
            const product = conversation.product;
            const lastMessage = conversation.lastMessage;
            const isSeller = conversation.seller_id === userId;
            const hasUnread = conversation.unreadCount > 0;

            return (
              <article
                key={conversation.id}
                onClick={() => router.push(`/messages/${conversation.id}`)}
                style={{
                  ...conversationStyle,
                  border: hasUnread
                    ? "1px solid rgba(0,0,0,0.18)"
                    : "1px solid rgba(0,0,0,0.06)",
                  background: hasUnread
                    ? "#fff"
                    : "rgba(255,255,255,0.82)",
                }}
                className="conversation-card"
              >
                <div style={imageWrapperStyle}>
                  <Image
                    src={safeImage(product?.image)}
                    alt={product?.title || "Product"}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                  />

                  {hasUnread && <span style={unreadDotStyle} />}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={metaStyle}>
                    {isSeller ? "Buyer conversation" : "Seller conversation"}
                  </p>

                  <h2 style={conversationTitleStyle}>
                    {product?.title || "Product"}
                  </h2>

                  <p
                    style={{
                      ...lastMessageStyle,
                      fontWeight: hasUnread ? 800 : 400,
                      color: hasUnread ? "#111" : "#666",
                    }}
                  >
                    {lastMessage?.is_image
                      ? "Image sent"
                      : lastMessage?.is_offer
                        ? `Offer: €${lastMessage?.offer_price}`
                        : lastMessage?.content || "No messages yet"}
                  </p>

                  <p style={timeStyle}>
                    {lastMessage?.created_at
                      ? new Date(lastMessage.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>

                <div style={rightStyle}>
                  {hasUnread && (
                    <span style={unreadBadgeStyle}>
                      {conversation.unreadCount}
                    </span>
                  )}

                  <strong style={priceStyle}>
                    {product?.price ? `€${product.price}` : ""}
                  </strong>

                  <span style={openStyle}>Open →</span>

                  <button
                    onClick={(e) => archiveConversation(e, conversation)}
                    style={archiveButtonStyle}
                  >
                    Archive
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <style>{`
        .conversation-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .conversation-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 90px rgba(0,0,0,0.07) !important;
        }

       @media (max-width: 700px) {
  .messages-page {
    padding: 120px 18px 34px !important;
  }

  .messages-title {
    font-size: 48px !important;
    letter-spacing: -2px !important;
  }

  .conversation-card {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 14px !important;
    padding: 16px !important;
  }

  .conversation-card > div {
    width: 100% !important;
  }
}
      `}</style>
    </main>
  );
}

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily: "Inter, sans-serif",
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1100px",
  margin: "0 auto 44px",
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
  letterSpacing: "-4px",
};

const subtitleStyle = {
  color: "#666",
  marginTop: "16px",
};

const emptyStyle = {
  maxWidth: "760px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "54px",
  borderRadius: "34px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "34px",
  marginBottom: "12px",
};

const emptyTextStyle = {
  color: "#666",
  marginBottom: "28px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "15px 24px",
  fontWeight: 800,
  cursor: "pointer",
};

const listStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const conversationStyle = {
  display: "flex",
  alignItems: "center",
  gap: "22px",
  borderRadius: "30px",
  padding: "20px",
  cursor: "pointer",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const imageWrapperStyle = {
  position: "relative" as const,
  width: "110px",
  height: "110px",
  borderRadius: "24px",
  overflow: "hidden",
  background: "#f6f6f3",
  flexShrink: 0,
};

const unreadDotStyle = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  background: "#ff3b30",
  border: "2px solid #fff",
};

const metaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  textTransform: "uppercase" as const,
  marginBottom: "8px",
};

const conversationTitleStyle = {
  fontSize: "26px",
  margin: 0,
  letterSpacing: "-1px",
};

const lastMessageStyle = {
  marginTop: "10px",
  marginBottom: 0,
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "12px",
};

const unreadBadgeStyle = {
  background: "#ff3b30",
  color: "#fff",
  minWidth: "24px",
  height: "24px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 900,
};

const priceStyle = {
  fontSize: "24px",
};

const openStyle = {
  fontSize: "13px",
  fontWeight: 800,
  opacity: 0.55,
};

const archiveButtonStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "9px 13px",
  fontSize: "11px",
  fontWeight: 800,
  cursor: "pointer",
};

const timeStyle = {
  fontSize: "12px",
  color: "#999",
  marginTop: "8px",
  marginBottom: 0,
};