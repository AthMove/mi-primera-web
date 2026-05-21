"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(ordersData || []);
    setProducts(productsData || []);
    setLoading(false);
  };

  const totalSales = orders.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );

  const athmovFees = orders.reduce(
    (acc, item) => acc + Number(item.platform_fee || 0),
    0
  );

  const sellerPayouts = orders.reduce(
    (acc, item) => acc + Number(item.seller_amount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status !== "completed"
  ).length;

  if (loading) {
    return <main style={pageStyle}>Loading admin...</main>;
  }

  return (
    <main style={pageStyle} className="admin-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV ADMIN</p>

        <h1 style={titleStyle} className="admin-title">
          Marketplace Control
        </h1>

        <p style={subtitleStyle}>
          Revenue, orders, products and marketplace performance.
        </p>
      </section>

      <section style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={labelStyle}>Gross Sales</p>
          <h2 style={valueStyle}>€{totalSales}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>ATHMOV Fees</p>
          <h2 style={valueStyle}>€{athmovFees}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Seller Payouts</p>
          <h2 style={valueStyle}>€{sellerPayouts}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Orders</p>
          <h2 style={valueStyle}>{orders.length}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Pending Orders</p>
          <h2 style={valueStyle}>{pendingOrders}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Products</p>
          <h2 style={valueStyle}>{products.length}</h2>
        </div>
      </section>

      <section style={actionsStyle}>
        <Link href="/orders" style={buttonStyle}>
          View Orders
        </Link>

        <Link href="/products" style={buttonStyle}>
          View Marketplace
        </Link>

        <Link href="/dashboard" style={buttonStyle}>
          Seller Dashboard
        </Link>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>No orders yet.</div>
        ) : (
          <div style={listStyle}>
            {orders.slice(0, 8).map((order) => (
              <article key={order.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>ORDER</p>
                  <h3 style={rowTitleStyle}>€{order.amount}</h3>
                  <p style={rowTextStyle}>
                    ATHMOV fee: €{order.platform_fee || 0} · Seller payout: €
                    {order.seller_amount || 0}
                  </p>
                </div>

                <span style={statusStyle}>{order.status || "paid"}</span>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Latest Products</h2>
        </div>

        {products.length === 0 ? (
          <div style={emptyStyle}>No products yet.</div>
        ) : (
          <div style={listStyle}>
            {products.slice(0, 8).map((product) => (
              <article key={product.id} style={rowStyle}>
                <div>
                  <p style={rowMetaStyle}>{product.brand || "ATHMOV"}</p>
                  <h3 style={rowTitleStyle}>{product.title}</h3>
                  <p style={rowTextStyle}>
                    €{product.price} · {product.sold ? "Sold" : "Active"}
                  </p>
                </div>

                <Link href={`/products/${product.id}`} style={smallLinkStyle}>
                  Open →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .admin-page {
            padding: 120px 18px 34px !important;
          }

          .admin-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
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

const heroStyle = {
  maxWidth: "1200px",
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
  marginTop: "18px",
};

const statsGridStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "30px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const labelStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  opacity: 0.5,
  textTransform: "uppercase" as const,
};

const valueStyle = {
  fontSize: "42px",
  marginTop: "18px",
  marginBottom: 0,
  letterSpacing: "-2px",
};

const actionsStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "15px 22px",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "13px",
  letterSpacing: "1px",
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "50px auto 0",
};

const sectionHeaderStyle = {
  marginBottom: "24px",
};

const sectionTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "32px",
};

const listStyle = {
  display: "grid",
  gap: "16px",
};

const rowStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const rowMetaStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "8px",
  textTransform: "uppercase" as const,
};

const rowTitleStyle = {
  fontSize: "30px",
  margin: 0,
  letterSpacing: "-1px",
};

const rowTextStyle = {
  color: "#666",
  marginTop: "10px",
  marginBottom: 0,
};

const statusStyle = {
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "11px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
};

const smallLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 900,
};