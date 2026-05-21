"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <main style={pageStyle}>Loading...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV ACCOUNT</p>
        <h1 style={titleStyle}>My orders</h1>
      </section>

      {orders.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={{ margin: 0 }}>No orders yet</h2>
          <p style={{ color: "#666" }}>
            Your purchases will appear here after checkout.
          </p>
        </section>
      ) : (
        <section style={ordersStyle}>
          {orders.map((order) => (
            <article key={order.id} style={orderCardStyle}>
              <div style={topRowStyle}>
                <div>
                  <p style={eyebrowStyle}>ORDER</p>
                  <h2 style={orderTitleStyle}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </h2>
                </div>

                <strong style={totalStyle}>€{order.total}</strong>
              </div>

              <div style={statusStyle}>{order.status}</div>

              <div style={itemsStyle}>
                {(order.items || []).map((item: any, index: number) => (
                  <div key={index} style={itemStyle}>
                    <span>{item.nombre}</span>
                    <strong>{item.precio}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
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
  margin: "0 auto 50px",
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
  letterSpacing: "-4px",
  margin: 0,
};

const emptyStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "34px",
  padding: "50px",
};

const ordersStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gap: "22px",
};

const orderCardStyle = {
  background: "#fff",
  borderRadius: "34px",
  padding: "34px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
};

const orderTitleStyle = {
  fontSize: "30px",
  margin: 0,
};

const totalStyle = {
  fontSize: "34px",
};

const statusStyle = {
  display: "inline-block",
  marginTop: "22px",
  background: "#111",
  color: "#fff",
  padding: "9px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
};

const itemsStyle = {
  marginTop: "28px",
  display: "grid",
  gap: "12px",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid rgba(0,0,0,0.06)",
  paddingTop: "14px",
};