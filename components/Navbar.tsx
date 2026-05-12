"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("athmov_cart");

      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCartCount(parsedCart.length);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
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
        <Link
          href="/products"
          style={{
            textDecoration: "none",
            color: "#444",
            fontWeight: 500,
          }}
        >
          Marketplace
        </Link>

        <Link
          href="/sell"
          style={{
            textDecoration: "none",
            color: "#444",
            fontWeight: 500,
          }}
        >
          Vender
        </Link>

        <Link
          href="/cart"
          style={{
            textDecoration: "none",
            color: "#111",
            fontWeight: 700,
          }}
        >
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