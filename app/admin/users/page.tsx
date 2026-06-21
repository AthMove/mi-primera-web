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
      console.log("ERROR ADMIN USUARIOS:", error);
      setUsers([]);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <main style={pageStyle}>Cargando usuarios...</main>;
  }

  return (
    <main style={pageStyle} className="admin-users-page">
      <section style={headerStyle}>
        <p style={eyebrowStyle}>ADMIN ATHMOV</p>

        <h1 style={titleStyle} className="admin-users-title">
          Usuarios
        </h1>

        <p style={subtitleStyle}>
          Controla los miembros del marketplace y el estado de Stripe.
        </p>
      </section>

      <section style={listStyle}>
        {users.length === 0 ? (
          <div style={emptyStyle}>No se han encontrado usuarios.</div>
        ) : (
          users.map((user) => (
            <div key={user.id} style={cardStyle} className="user-card">
              <div>
                <p style={idStyle}>#{user.id?.slice(0, 8)}</p>

                <h2 style={nameStyle}>
                  {user.username || user.full_name || "Usuario sin nombre"}
                </h2>

                <p style={emailStyle}>{user.email || "Sin email"}</p>
              </div>

              <div>
                <p style={labelStyle}>Stripe</p>

                <span
                  style={{
                    ...badgeStyle,
                    background: user.stripe_payouts_enabled
                      ? "#dcfce7"
                      : "#fee2e2",
                    color: user.stripe_payouts_enabled ? "#166534" : "#991b1b",
                  }}
                >
                  {user.stripe_payouts_enabled ? "Conectado" : "No conectado"}
                </span>
              </div>

              <div>
                <p style={labelStyle}>Cuenta</p>

                <span
                  style={{
                    ...badgeStyle,
                    background: "#f3f4f6",
                  }}
                >
                  Activa
                </span>
              </div>

              <div>
                <p style={labelStyle}>Registro</p>

                <strong>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </strong>
              </div>
            </div>
          ))
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .admin-users-page {
            padding: 120px 18px 40px !important;
          }

          .admin-users-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .user-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
  letterSpacing: "-5px",
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

const emptyStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "34px",
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