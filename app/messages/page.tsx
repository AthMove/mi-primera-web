"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  product_id: string;
  content: string;
  created_at: string;
};

export default function MessagesPage() {
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  loadMessages();

  const channel = supabase
    .channel("messages-realtime")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      () => {
        loadMessages();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const loadMessages = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth?mode=login";
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data);
    }

    setLoading(false);
  };

  const sendReply = async (message: Message) => {
    const text = replies[message.id]?.trim();

    if (!text) {
      alert("Escribe una respuesta");
      return;
    }

    const receiverId =
      message.sender_id === userId ? message.receiver_id : message.sender_id;

    const { error } = await supabase.from("messages").insert({
      sender_id: userId,
      receiver_id: receiverId,
      product_id: message.product_id,
      content: text,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setReplies((current) => ({
      ...current,
      [message.id]: "",
    }));

    await loadMessages();
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando mensajes...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>Mi cuenta</p>
        <h1 style={titleStyle}>Mensajes</h1>
        <p style={subtitleStyle}>Conversaciones con compradores y vendedores.</p>
      </section>

      {messages.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>No tienes mensajes todavía</h2>
          <p style={emptyTextStyle}>
            Cuando contactes con un vendedor, aparecerá aquí.
          </p>

          <Link href="/products" style={buttonStyle}>
            Ir al marketplace
          </Link>
        </section>
      ) : (
        <section style={listStyle}>
          {messages.map((message) => {
            const isMine = message.sender_id === userId;

            return (
              <article key={message.id} style={messageStyle}>
                <p style={messageMetaStyle}>
                  {isMine ? "Enviado por ti" : "Recibido"}
                </p>

                <p style={messageTextStyle}>{message.content}</p>

                <Link
                  href={`/products/${message.product_id}`}
                  style={productLinkStyle}
                >
                  Ver producto
                </Link>

                <div style={replyBoxStyle}>
                  <textarea
                    value={replies[message.id] || ""}
                    onChange={(e) =>
                      setReplies((current) => ({
                        ...current,
                        [message.id]: e.target.value,
                      }))
                    }
                    placeholder="Escribe una respuesta..."
                    style={textareaStyle}
                  />

                  <button
                    onClick={() => sendReply(message)}
                    style={replyButtonStyle}
                  >
                    Responder
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

const fontFamily =
  "'Manrope', 'Satoshi', 'Avenir Next', system-ui, sans-serif";

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily,
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "46px",
  fontFamily,
};

const headerStyle = {
  maxWidth: "900px",
  margin: "0 auto 44px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-2px",
};

const subtitleStyle = {
  color: "#666",
  marginTop: "12px",
};

const emptyStyle = {
  maxWidth: "720px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "48px",
  borderRadius: "32px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "32px",
  marginBottom: "12px",
};

const emptyTextStyle = {
  color: "#666",
  marginBottom: "28px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
};

const listStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const messageStyle = {
  background: "#fff",
  borderRadius: "26px",
  padding: "24px",
};

const messageMetaStyle = {
  fontSize: "12px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const messageTextStyle = {
  fontSize: "17px",
  lineHeight: 1.6,
  marginBottom: "16px",
};

const productLinkStyle = {
  color: "#111",
  fontWeight: 700,
};

const replyBoxStyle = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const textareaStyle = {
  width: "100%",
  minHeight: "90px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  padding: "14px",
  fontSize: "14px",
  resize: "none" as const,
  boxSizing: "border-box" as const,
};

const replyButtonStyle = {
  alignSelf: "flex-end",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 20px",
  fontWeight: 700,
  cursor: "pointer",
};