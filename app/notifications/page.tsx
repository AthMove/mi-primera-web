"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications]
  );

  useEffect(() => {
    loadNotifications();

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => loadNotifications()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }

    setLoading(false);
  };

  const openNotification = async (notification: any) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notification.id);

    if (notification.link) {
      router.push(notification.link);
      return;
    }

    await loadNotifications();
  };

  const markAllAsRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    await loadNotifications();
  };

  const deleteNotification = async (
    e: React.MouseEvent<HTMLButtonElement>,
    notificationId: string
  ) => {
    e.stopPropagation();

    const confirmDelete = confirm("Delete this notification?");
    if (!confirmDelete) return;

    await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    await loadNotifications();
  };

  const getIcon = (type?: string, title?: string) => {
  const value = `${type || ""} ${title || ""}`.toLowerCase();

  if (value.includes("message")) return "✉";
  if (value.includes("offer")) return "€";
  if (value.includes("review")) return "★";
  if (value.includes("shipped") || value.includes("tracking")) return "↗";
  if (value.includes("payout")) return "€";
  if (value.includes("order") || value.includes("sold") || value.includes("completed")) return "✓";
  if (value.includes("verified") || value.includes("approved")) return "✓";

  return "•";
};

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <main style={pageStyle}>Loading notifications...</main>;
  }

  return (
    <main style={pageStyle} className="notifications-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV ALERTS</p>

        <div style={headerRowStyle}>
          <div>
            <h1 style={titleStyle} className="notifications-title">
              Notifications
            </h1>

            <p style={subtitleStyle}>
              Messages, offers, orders and reviews.
            </p>
          </div>

          {unreadCount > 0 && (
            <button onClick={markAllAsRead} style={markButtonStyle}>
              Mark all as read
            </button>
          )}
        </div>

        {unreadCount > 0 && (
          <div style={summaryPillStyle}>
            <span style={pulseDotStyle} />
            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
          </div>
        )}
      </section>

      {notifications.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>No notifications yet</h2>

          <p style={emptyTextStyle}>
            Your marketplace activity will appear here.
          </p>
        </section>
      ) : (
        <section style={listStyle}>
          {notifications.map((notification) => (
            <article
              key={notification.id}
              onClick={() => openNotification(notification)}
              style={{
                ...notificationStyle,
                background: notification.is_read
                  ? "rgba(255,255,255,0.68)"
                  : "#fff",
                border: notification.is_read
                  ? "1px solid rgba(0,0,0,0.06)"
                  : "1px solid rgba(0,0,0,0.16)",
              }}
              className="notification-card"
            >
              <div style={leftStyle}>
                <div
                  style={{
                    ...iconStyle,
                    background: notification.is_read ? "#f1f1ef" : "#111",
                    color: notification.is_read ? "#111" : "#fff",
                  }}
                >
                  {getIcon(notification.type, notification.title)}
                </div>

                <div>
                  <div style={titleRowStyle}>
                    <h2 style={notificationTitleStyle}>
                      {notification.title}
                    </h2>

                    {!notification.is_read && <span style={newBadgeStyle}>NEW</span>}
                  </div>

                  <p style={messageStyle}>{notification.message}</p>

                  <p style={dateStyle}>
                    {formatDate(notification.created_at)}
                  </p>
                </div>
              </div>

              <div style={rightStyle}>
                <span style={openStyle}>Open →</span>

                <button
                  onClick={(e) => deleteNotification(e, notification.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .notification-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .notification-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 90px rgba(0,0,0,0.07) !important;
        }

        @keyframes pulseNotification {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.35); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        @media (max-width: 700px) {
          .notifications-page {
            padding: 120px 18px 34px !important;
          }

          .notification-card {
  flex-direction: column !important;
}

.notification-card > div {
  width: 100% !important;
}

.notification-card button {
  align-self: flex-start !important;
}

          .notifications-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .notification-card {
            padding: 18px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </main>
  );
}

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

const headerRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
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

const markButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "13px 18px",
  fontWeight: 800,
  cursor: "pointer",
};

const summaryPillStyle = {
  marginTop: "24px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "12px 16px",
  fontSize: "13px",
  fontWeight: 800,
};

const pulseDotStyle = {
  width: "9px",
  height: "9px",
  borderRadius: "999px",
  background: "#ff3b30",
  animation: "pulseNotification 1.2s ease infinite",
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
};

const listStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const notificationStyle = {
  borderRadius: "30px",
  padding: "24px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const leftStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "flex-start",
};

const iconStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 900,
  flexShrink: 0,
};

const titleRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap" as const,
};

const notificationTitleStyle = {
  fontSize: "22px",
  margin: 0,
  letterSpacing: "-1px",
};

const newBadgeStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "5px 8px",
  fontSize: "9px",
  fontWeight: 900,
};

const messageStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: "12px",
};

const dateStyle = {
  fontSize: "12px",
  opacity: 0.45,
};

const rightStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "10px",
};

const openStyle = {
  fontSize: "13px",
  fontWeight: 800,
  opacity: 0.55,
};

const deleteButtonStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "11px",
  fontWeight: 800,
  cursor: "pointer",
};