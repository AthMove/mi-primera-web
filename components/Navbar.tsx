"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [messagesCount, setMessagesCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
const [showResults, setShowResults] = useState(false);
const [scrolled, setScrolled] = useState(false);

const searchRef = useRef<HTMLDivElement>(null);

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
  .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
  .in("status", ["paid", "preparing", "shipped", "delivered"]);

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

  const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const query = searchQuery.trim();

  if (!query) return;

  window.location.href = `/products?search=${encodeURIComponent(query)}`;
};

const searchProducts = async (value: string) => {
  setSearchQuery(value);

  if (value.trim().length < 2) {
    setSearchResults([]);
    setShowResults(false);
    return;
  }

 const { data } = await supabase
  .from("products")
  .select("id,title,brand,image,price")
  .eq("moderation_status", "approved")
  .or(
    `title.ilike.%${value}%,brand.ilike.%${value}%,category.ilike.%${value}%`
  )
  .limit(5);

  setSearchResults(data || []);
  setShowResults(true);
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 40);
  };

 window.addEventListener("scroll", onScroll);
onScroll();

return () => window.removeEventListener("scroll", onScroll);
}, []);

 useEffect(() => {
  updateCartCount();
  loadNotifications();

  supabase.auth.getUser().then(({ data }: any) => {
    setUserEmail(data.user?.email ?? null);
  });

 const { data: listener } = supabase.auth.onAuthStateChange(
  (_event: any, session: any) => {
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
  const safeImage = (src?: string) => {
  return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
};

 const mobileLinks = (
  <>
    <p style={drawerSectionTitleStyle}>
  🛍️ MARKETPLACE
</p>

    <Link href="/products" style={drawerLinkStyle}>
  COMPRAR
</Link>

<Link href="/blog" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
  BLOG
</Link>

    <Link href="/products?category=PADEL" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      PÁDEL
    </Link>

    <Link href="/products?category=GOLF" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      GOLF
    </Link>

   <Link href="/products?category=TENIS" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
  TENIS
</Link>

    <Link href="/products?category=RUNNING" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      RUNNING
    </Link>

    <p style={drawerSectionTitleStyle}>
  💼 SELLER
</p>

    <Link href="/sell" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      VENDER
    </Link>

    {userEmail && (
      <>
        <Link href="/seller-dashboard" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          PANEL
        </Link>

        <Link href="/orders" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          PEDIDOS{badge(ordersCount)}
        </Link>

<Link
  href="/notifications"
  style={drawerLinkStyle}
  onClick={() => setMenuOpen(false)}
>
  NOTIFICACIONES{badge(notificationsCount)}
</Link>

        <Link href="/offers" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          OFERTAS{badge(offersCount)}
        </Link>
      </>
    )}

    <p style={drawerSectionTitleStyle}>
  👤 ACCOUNT
</p>

    <Link href="/cart" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
      CARRITO ({cartCount})
    </Link>

    {userEmail ? (
      <>
        <Link href="/favorites" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          FAVORITOS
        </Link>

        <Link href="/messages" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          MENSAJES{badge(messagesCount)}
        </Link>

        <Link href="/notifications" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          NOTIFICACIONES{badge(notificationsCount)}
        </Link>

        <Link href="/account" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          CUENTA
        </Link>

        <button onClick={handleLogout} style={drawerButtonStyle}>
          CERRAR SESIÓN
        </button>
      </>
    ) : (
      <>
        <Link href="/auth" style={drawerLinkStyle} onClick={() => setMenuOpen(false)}>
          INICIAR SESIÓN
        </Link>

        <Link href="/auth" style={drawerButtonStyle} onClick={() => setMenuOpen(false)}>
         REGISTRARSE
        </Link>
      </>
    )}
  </>
);

  return (
    <>
      <nav
  style={{
    ...navStyle,
    padding: scrolled ? "0 18px" : "0 22px",
    height: scrolled ? 74 : 90,
    transition: "all .28s ease",
  }}
  className="athmov-navbar"
>
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
            CARRITO ({cartCount})
          </Link>
          <Link href="/products" style={navMainLinkStyle}>
  Comprar
</Link>

<Link href="/sell" style={navMainLinkStyle}>
  Vender
</Link>

<Link href="/blog" style={navMainLinkStyle}>
  Blog
</Link>

<div
  ref={searchRef}
  style={searchWrapperStyle}
>
  <form onSubmit={handleSearch} style={searchFormStyle}>
    <input
      value={searchQuery}
      onChange={(e) => searchProducts(e.target.value)}
      onFocus={() => {
        if (searchResults.length > 0) setShowResults(true);
      }}
      placeholder="Buscar palas, drivers, zapatillas..."
      style={searchInputStyle}
    />

    <button type="submit" style={searchButtonStyle}>
      Buscar
    </button>
  </form>

  {showResults && searchResults.length > 0 && (
    <div style={searchDropdownStyle}>
      {searchResults.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          style={searchItemStyle}
          onClick={() => setShowResults(false)}
        >
          <Image
            src={safeImage(product.image)}
            alt={product.title}
            width={56}
            height={56}
            style={{
              borderRadius: 12,
              objectFit: "cover",
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>
              {product.title}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#666",
              }}
            >
              {product.brand}
            </div>
          </div>

          <strong>€{product.price}</strong>
        </Link>
      ))}
    </div>
  )}
</div>

          {userEmail ? (
            <>
              <Link href="/account" style={signInStyle}>
  CUENTA
</Link>
            </>
          ) : (
            <>
              <Link href="/auth" style={signInStyle}>
                INICIAR SESIÓN
              </Link>

              <Link href="/auth" style={registerStyle}>
                REGISTRARSE
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            style={menuButtonStyle}
          >
            MENÚ
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          style={menuButtonStyle}
          className="mobile-only"
        >
          MENÚ
        </button>
      </nav>

      {menuOpen && (
        <div style={overlayStyle} onClick={() => setMenuOpen(false)}>
          <aside style={drawerStyle} onClick={(e) => e.stopPropagation()}>
            <div style={drawerHeaderStyle}>
              <div>
  <div style={drawerTitleStyle}>ATHMOV</div>

  <div style={drawerSubtitleStyle}>
    Marketplace Premium
  </div>
</div>

              <button onClick={() => setMenuOpen(false)} style={closeButtonStyle}>
                ✕
              </button>
            </div>

           <div style={drawerLinksStyle}>

  <div style={drawerHeroStyle}>
    <div style={drawerHeroTitleStyle}>
      Descubre ATHMOV
    </div>

    <div style={drawerHeroTextStyle}>
      Compra y vende material deportivo premium de segunda mano.
    </div>

    <Link href="/products" style={drawerHeroButtonStyle}>
      Explorar Marketplace →
    </Link>
  </div>

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
  position: "fixed" as const,
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
  left: "50%",
transform: "translateX(-50%)",
width: "calc(100% - 40px)",
maxWidth: "1450px",
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
  height: "100dvh",
  width: "86%",
  maxWidth: "380px",
  background: "#fff",
  padding: "26px 26px 110px",
  boxShadow: "-30px 0 100px rgba(0,0,0,0.18)",
  overflowY: "auto" as const,
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

const drawerSubtitleStyle = {
  fontSize: "12px",
  color: "#777",
  marginTop: "4px",
  letterSpacing: "1px",
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
  gap: "10px",
  paddingBottom: "80px",
};

const drawerLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "16px",
  fontWeight: 850,
  letterSpacing: "1.2px",
  background: "#f7f7f4",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "18px",
  padding: "16px 18px",
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

const navMainLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "1.3px",
  textTransform: "uppercase" as const,
};

const searchFormStyle = {
  display: "flex",
  alignItems: "center",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "4px",
  minWidth: "420px",
};

const searchInputStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  padding: "10px 12px",
  fontSize: "15px",
  flex: 1,
};

const searchButtonStyle = {
  border: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
 padding: "10px 18px",
  fontSize: "11px",
  fontWeight: 900,
  cursor: "pointer",
};

const searchWrapperStyle = {
  position: "relative" as const,
};

const searchDropdownStyle = {
  position: "absolute" as const,
  top: "110%",
  left: 0,
  width: "100%",
  background: "#fff",
  borderRadius: "22px",
  overflow: "hidden",
  boxShadow: "0 25px 70px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.08)",
  zIndex: 999,
};

const searchItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "14px",
  textDecoration: "none",
  color: "#111",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};

const drawerHeroStyle = {
  background: "linear-gradient(135deg,#111,#2b2b2b)",
  color: "#fff",
  borderRadius: "24px",
  padding: "24px",
  marginBottom: "20px",
};

const drawerHeroTitleStyle = {
  fontSize: "22px",
  fontWeight: 900,
  marginBottom: "10px",
};

const drawerHeroTextStyle = {
  color: "rgba(255,255,255,.75)",
  lineHeight: 1.6,
  marginBottom: "20px",
};

const drawerHeroButtonStyle = {
  display: "inline-block",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 900,
};