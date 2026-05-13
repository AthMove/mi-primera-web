"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
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
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("focus", updateCartCount);

    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("focus", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav
      style={{
        width: "100%",
        padding: "22px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/products"
        style={{
          textDecoration: "none",
          color: "#111",
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        ATHMOV
      </Link>

      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
        }}
      >
        <Link href="/products" style={linkStyle}>
          Marketplace
        </Link>

        <Link href="/sell" style={linkStyle}>
          Vender
        </Link>

        <Link href="/cart" style={cartLinkStyle}>
          Carrito ({cartCount})
        </Link>

        <button
          style={{
            background: "#111",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "999px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#444",
  fontWeight: 500,
};

const cartLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 800,
};