"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadMessages();
    setupRealtime();
  }, []);

  const loadMessages = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const { data } = await supabase
      .from("conversation_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
    }
  };

  const setupRealtime = () => {
    supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversation_messages",
        },
        (payload) => {
          setMessages((current) => [
            ...current,
            payload.new as Message,
          ]);
        }
      )
      .subscribe();
  };

  const sendMessage = async () => {
    if (!content.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("conversation_messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content,
    });

    setContent("");
  };

  return (
    <main style={pageStyle}>
      <div style={chatStyle}>
        <div style={messagesStyle}>
          {messages.map((message) => {
            const mine = message.sender_id === userId;

            return (
              <div
                key={message.id}
                style={{
                  ...bubbleStyle,
                  alignSelf: mine ? "flex-end" : "flex-start",
                  background: mine ? "#111" : "#fff",
                  color: mine ? "#fff" : "#111",
                }}
              >
                {message.content}
              </div>
            );
          })}
        </div>

        <div style={inputWrapperStyle}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un mensaje..."
            style={inputStyle}
          />

          <button
            onClick={sendMessage}
            style={buttonStyle}
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "40px",
};

const chatStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "28px",
  height: "80vh",
  display: "flex",
  flexDirection: "column" as const,
  overflow: "hidden",
};

const messagesStyle = {
  flex: 1,
  padding: "24px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
  overflowY: "auto" as const,
};

const bubbleStyle = {
  maxWidth: "70%",
  padding: "14px 18px",
  borderRadius: "22px",
  fontSize: "15px",
  lineHeight: 1.5,
};

const inputWrapperStyle = {
  display: "flex",
  padding: "18px",
  borderTop: "1px solid #eee",
  gap: "12px",
};

const inputStyle = {
  flex: 1,
  border: "1px solid #ddd",
  borderRadius: "999px",
  padding: "14px 18px",
  fontSize: "15px",
  outline: "none",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "0 24px",
  fontWeight: 700,
  cursor: "pointer",
};