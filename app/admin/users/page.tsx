"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setUsers([]);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <main style={pageStyle}>Loading users...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ATHMOV ADMIN</p>
        <h1 style={titleStyle}>Users</h1>
        <p style={subtitleStyle}>
          Monitor marketplace members and Stripe status.
        </p>
      </section>

      <section style={listStyle}>
        {users.map((user) => (
          <div key={user.id} style={cardStyle}>
            <div>
              <p style={idStyle}>#{user.id?.slice(0, 8)}</p>

              <h2 style={nameStyle}>
                {user.username || user.full_name || "Unnamed User"}
              </h2>

              <p style={emailStyle}>
                {user.email || "No email"}
              </p>
            </div>

            <div>
              <p style={labelStyle}>Stripe</p>

              <span
                style={{
                  ...badgeStyle,
                  background: user.stripe_payouts_enabled
                    ? "#dcfce7"
                    : "#fee2e2",
                  color: user.stripe_payouts_enabled
                    ? "#166534"
                    : "#991b1b",
                }}
              >
                {user.stripe_payouts_enabled
                  ? "Connected"
                  : "Not Connected"}
              </span>
            </div>

            <div>
              <p style={labelStyle}>Account</p>

              <span
                style={{
                  ...badgeStyle,
                  background: "#f3f4f6",
                }}
              >
                Active
              </span>
            </div>

            <div>
              <p style={labelStyle}>Registered</p>

              <strong>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "-"}
              </strong>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  padding: "150px 64px 90px",
  fontFamily: "Inter, sans-serif",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 36px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "72px",
  margin: 0,
};

const subtitleStyle = {
  color: "#666",
};

const listStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gap: "16px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "24px",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "20px",
  alignItems: "center",
};

const idStyle = {
  fontSize: "11px",
  opacity: 0.4,
};

const nameStyle = {
  margin: "6px 0",
};

const emailStyle = {
  color: "#666",
};

const labelStyle = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  opacity: 0.45,
};

const badgeStyle = {
  padding: "8px 12px",
  borderRadius: "999px",
  fontWeight: 700,
  display: "inline-block",
};