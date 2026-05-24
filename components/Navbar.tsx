"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [messagesCount, setMessagesCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const updateCartCount = useCallback(() => {
    const cart = localStorage.getItem("athmov_cart");

    if (!cart) {
      setCartCount(0);
      return;
    }

    try {
      const parsedCart = JSON.parse(cart);
      setCartCount(Array.isArray(parsedCart) ? parsedCart.length : 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessagesCount(0);
      setOffersCount(0);
      setOrdersCount(0);
      setNotificationsCount(0);
      return;
    }

    const { data: conversations } = await supabase
      .from("conversations")
      .select("id,buyer_id,seller_id,archived_by_buyer,archived_by_seller")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

    let unreadTotal = 0;

    for (const conversation of conversations || []) {
      const isSeller = conversation.seller_id === user.id;

      const archived = isSeller
        ? conversation.archived_by_seller
        : conversation.archived_by_buyer;

      if (archived) continue;

      let query = supabase
        .from("conversation_messages")
        .select("id")
        .eq("conversation_id", conversation.id)
        .neq("sender_id", user.id);

      query = isSeller
        ? query.eq("read_by_seller", false)
        : query.eq("read_by_buyer", false);

      const { data: unreadMessages } = await query;

      unreadTotal += unreadMessages?.length || 0;
    }

    const { data: offers } = await supabase
      .from("offers")
      .select("id")
      .eq("seller_id", user.id)
      .eq("status", "pending");

    const { data: orders } = await supabase
      .from("orders")
      .select("id")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

    const { data: notifications } = await supabase
      .from("notifications")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_read", false);

    setMessagesCount(unreadTotal);
    setOffersCount(offers?.length || 0);
    setOrdersCount(orders?.length || 0);
    setNotificationsCount(notifications?.length || 0);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUserEmail(null);
    setMessagesCount(0);
    setOffersCount(0);
    setOrdersCount(0);
    setNotificationsCount(0);

    window.location.href = "/";
  };

  useEffect(() => {
    updateCartCount();
    loadNotifications();

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
        loadNotifications();
      }
    );

    const channel = supabase
      .channel("navbar-notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversation_messages" },
        loadNotifications
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        loadNotifications
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "offers" },
        loadNotifications
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        loadNotifications
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        loadNotifications
      )
      .subscribe();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("focus", updateCartCount);
    window.addEventListener("focus", loadNotifications);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("focus", updateCartCount);
      window.removeEventListener("focus", loadNotifications);

      listener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [loadNotifications, updateCartCount]);

  const badge = (count: number) => (count > 0 ? ` (${count})` : "");

 const mobileLinks = (
  <>
    <p style={drawerSectionTitleStyle}>MARKETPLACE</p>

    <Link href="/products" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      SHOP
    </Link>

    <Link href="/products?category=PADEL" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      PADEL
    </Link>

    <Link href="/products?category=GOLF" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      GOLF
    </Link>

    <Link href="/products?category=TENNIS" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      TENNIS
    </Link>

    <Link href="/products?category=RUNNING" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      RUNNING
    </Link>

    <p style={drawerSectionTitleStyle}>SELLER</p>

    <Link href="/sell" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      SELL
    </Link>

    {userEmail && (
      <>
        <Link href="/seller-dashboard" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          DASHBOARD
        </Link>

        <Link href="/orders" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          ORDERS{badge(ordersCount)}
        </Link>

        <Link href="/offers" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          OFFERS{badge(offersCount)}
        </Link>
      </>
    )}

    <p style={drawerSectionTitleStyle}>ACCOUNT</p>

    <Link href="/cart" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      CART ({cartCount})
    </Link>

    {userEmail ? (
      <>
        <Link href="/favorites" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          FAVORITES
        </Link>

        <Link href="/messages" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          MESSAGES{badge(messagesCount)}
        </Link>

        <Link href="/notifications" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          NOTIFICATIONS{badge(notificationsCount)}
        </Link>

        <Link href="/account" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          ACCOUNT
        </Link>

        <button onClick={handleLogout} style={drawerButtonStyle}>
          LOG OUT
        </button>
      </>
    ) : (
      <>
        <Link href="/auth" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          SIGN IN
        </Link>

        <Link href="/auth" style={drawerButtonStyle} onClick={() => setMenuOpen(false)}>
          REGISTER
        </Link>
      </>
    )}
  </>
);

  return (
    <>
      <nav style={navStyle} className="athmov-navbar">
        <Link href="/" style={logoStyle}>
          <Image
            src="/logo.png"
            alt="ATHMOV"
            fill
            sizes="220px"
            style={{
              objectFit: "contain",
              objectPosition: "left center",
            }}
            priority
          />
        </Link>

        <div style={rightLinksStyle} className="desktop-only">
          <Link href="/cart" style={cartLinkStyle}>
            CART ({cartCount})
          </Link>

          {userEmail ? (
            <>
              <Link href="/favorites" style={signInStyle}>
                FAVORITES
              </Link>

              <Link href="/messages" style={signInStyle}>
                MESSAGES{badge(messagesCount)}
              </Link>

              <Link href="/offers" style={signInStyle}>
                OFFERS{badge(offersCount)}
              </Link>

              <Link href="/orders" style={signInStyle}>
                ORDERS{badge(ordersCount)}
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth" style={signInStyle}>
                SIGN IN
              </Link>

              <Link href="/auth" style={registerStyle}>
                REGISTER
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            style={menuButtonStyle}
          >
            MENU
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          style={menuButtonStyle}
          className="mobile-only"
        >
          MENU
        </button>
      </nav>

      {menuOpen && (
        <div style={overlayStyle} onClick={() => setMenuOpen(false)}>
          <aside style={drawerStyle} onClick={(e) => e.stopPropagation()}>
            <div style={drawerHeaderStyle}>
              <span style={drawerTitleStyle}>ATHMOV</span>

              <button onClick={() => setMenuOpen(false)} style={closeButtonStyle}>
                ✕
              </button>
            </div>

            <div style={drawerLinksStyle}>
              {mobileLinks}
            </div>
          </aside>
        </div>
      )}

      <style>{`
        .mobile-only {
          display: none !important;
        }

        @media (max-width: 1100px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          .athmov-navbar {
            padding: 14px 18px !important;
          }
        }

        @media (max-width: 700px) {
          .athmov-navbar {
            top: 10px !important;
            border-radius: 26px !important;
          }
        }
      `}</style>
    </>
  );
}

const navStyle = {
  position: "sticky" as const,
  top: "16px",
  zIndex: 100,
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.72)",
  border: "1px solid rgba(255,255,255,0.4)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
  borderRadius: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 22px",
  gap: "20px",
};

const logoStyle = {
  position: "relative" as const,
  width: "220px",
  height: "86px",
  display: "block",
  flexShrink: 0,
};

const rightLinksStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap" as const,
};

const cartLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "1.3px",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "10px 14px",
};

const signInStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "1.6px",
};

const registerStyle = {
  textDecoration: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "12px 18px",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "1.5px",
};

const menuButtonStyle = {
  display: "flex",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "1.5px",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 999,
  background: "rgba(0,0,0,0.28)",
  backdropFilter: "blur(8px)",
};

const drawerStyle = {
  position: "absolute" as const,
  right: 0,
  top: 0,
  height: "100%",
  width: "86%",
  maxWidth: "380px",
  background: "#fff",
  padding: "26px",
  boxShadow: "-30px 0 100px rgba(0,0,0,0.18)",
};

const drawerHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const drawerTitleStyle = {
  fontSize: "22px",
  fontWeight: 900,
  letterSpacing: "2px",
};

const closeButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  width: "38px",
  height: "38px",
  cursor: "pointer",
};

const drawerLinksStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const drawerLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "18px",
  fontWeight: 800,
  letterSpacing: "1.8px",
};

const drawerButtonStyle = {
  textDecoration: "none",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "15px 18px",
  fontSize: "14px",
  fontWeight: 800,
  letterSpacing: "1.5px",
  cursor: "pointer",
  textAlign: "center" as const,
};

const drawerSectionTitleStyle = {
  fontSize: "10px",
  letterSpacing: "3px",
  opacity: 0.35,
  marginTop: "18px",
  marginBottom: "-4px",
};