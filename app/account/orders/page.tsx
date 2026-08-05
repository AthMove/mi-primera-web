"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";


export default function OrdersPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const locale =
  lang === "en"
    ? "en-GB"
    : lang === "pt"
      ? "pt-PT"
      : "es-ES";
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const getOrderStatusLabel = (status?: string) => {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase();

  const labels: Record<string, string> = {
    pending: t.orderStatusPending,
    paid: t.orderStatusPaid,
    preparing: t.orderStatusPreparing,
    shipped: t.orderStatusShipped,
    delivered: t.orderStatusDelivered,
    completed: t.orderStatusCompleted,
    cancelled: t.orderStatusCancelled,
    canceled: t.orderStatusCancelled,
    refunded: t.orderStatusRefunded,
  };

  return labels[normalizedStatus] || status || t.orderStatusPending;
};

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
  return (
    <main style={pageStyle}>
      {t.ordersLoading}
    </main>
  );
}

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
      <p style={eyebrowStyle}>
  {t.ordersEyebrow}
</p>

<h1 style={titleStyle}>
  {t.ordersTitle}
</h1>
      </section>

      {orders.length === 0 ? (
  <section style={emptyStyle}>
  <h2 style={{ margin: 0 }}>
    {t.ordersEmptyTitle}
  </h2>

  <p style={{ color: "#666" }}>
    {t.ordersEmptyText}
  </p>
</section>
      ) : (
        <section style={ordersStyle}>
          {orders.map((order) => (
            <article key={order.id} style={orderCardStyle}>
              <div style={topRowStyle}>
                <div>
                 <p style={eyebrowStyle}>
  {t.orderLabel}
</p>
                  <h2 style={orderTitleStyle}>
                   {new Date(order.created_at).toLocaleDateString(locale)}
                  </h2>
                </div>

                <strong style={totalStyle}>
  {new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(Number(order.total || 0))}
</strong>
              </div>

              <div style={statusStyle}>
  {getOrderStatusLabel(order.status)}
</div>

              <div style={itemsStyle}>
                {(order.items || []).map((item: any, index: number) => (
                  <div key={index} style={itemStyle}>
                  <span>
  {item.nombre ||
    item.title ||
    t.orderProductFallback}
</span>

<strong>
  {new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(
    Number(
      item.precio ??
        item.price ??
        0
    )
  )}
</strong>
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