"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingStripe, setCheckingStripe] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    bio: "",
    location: "",
    avatar_url: "",
    email: "",
    stripe_account_id: "",
    stripe_onboarding_complete: false,
    stripe_charges_enabled: false,
    stripe_payouts_enabled: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const syncStripeStatus = async (userId: string) => {
    try {
      setCheckingStripe(true);

      await fetch("/api/stripe/connect/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.log("ERROR AL SINCRONIZAR STRIPE:", error);
    } finally {
      setCheckingStripe(false);
    }
  };

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    await syncStripeStatus(user.id);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!data) {
      await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
        },
      ]);

      setProfile({
        username: "",
        full_name: "",
        bio: "",
        location: "",
        avatar_url: "",
        email: user.email || "",
        stripe_account_id: "",
        stripe_onboarding_complete: false,
        stripe_charges_enabled: false,
        stripe_payouts_enabled: false,
      });

      setLoading(false);
      return;
    }

    setProfile({
      username: data.username || "",
      full_name: data.full_name || "",
      bio: data.bio || "",
      location: data.location || "",
      avatar_url: data.avatar_url || "",
      email: data.email || user.email || "",
      stripe_account_id: data.stripe_account_id || "",
      stripe_onboarding_complete: data.stripe_onboarding_complete || false,
      stripe_charges_enabled: data.stripe_charges_enabled || false,
      stripe_payouts_enabled: data.stripe_payouts_enabled || false,
    });

    setLoading(false);
  };

  const startStripeOnboarding = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("/api/connect/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          origin: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.error || "No se pudo iniciar la conexión con Stripe");
    } catch (error) {
      console.log(error);
      alert("No se pudo conectar Stripe");
    }
  };

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      setSaving(true);

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          username: profile.username.trim(),
          full_name: profile.full_name.trim(),
          bio: profile.bio.trim(),
          location: profile.location.trim(),
          avatar_url: profile.avatar_url.trim(),
        },
        {
          onConflict: "id",
        }
      );

      if (error) {
        alert(error.message);
        return;
      }

      alert("Perfil actualizado correctamente");
      await loadProfile();
    } finally {
      setSaving(false);
    }
  };

  const safeAvatar = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  const stripeReady =
    profile.stripe_account_id &&
    profile.stripe_onboarding_complete &&
    profile.stripe_charges_enabled &&
    profile.stripe_payouts_enabled;

  if (loading) {
    return <main style={loadingStyle}>Cargando perfil...</main>;
  }

  return (
    <main style={pageStyle} className="account-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>PERFIL ATHMOV</p>

        <h1 style={titleStyle} className="account-title">
          Tu cuenta
        </h1>

        <p style={subtitleStyle}>
          Gestiona tu perfil público de vendedor.
        </p>
      </section>

      <section style={layoutStyle} className="account-layout">
        <div style={avatarCardStyle}>
          <div style={avatarWrapperStyle}>
            <Image
              src={safeAvatar(profile.avatar_url)}
              alt="Avatar"
              fill
              sizes="220px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <input
            value={profile.avatar_url}
            onChange={(e) =>
              setProfile({
                ...profile,
                avatar_url: e.target.value,
              })
            }
            placeholder="URL de imagen de perfil"
            style={inputStyle}
          />

          <p style={helperStyle}>
            Pega una URL de imagen para tu foto de perfil.
          </p>

          <div style={stripeBoxStyle}>
            <p style={stripeTitleStyle}>Estado de Stripe</p>

            {stripeReady ? (
              <p style={stripeOkStyle}>Pagos activos ✓</p>
            ) : profile.stripe_account_id ? (
              <p style={stripePendingStyle}>Configuración pendiente</p>
            ) : (
              <p style={stripePendingStyle}>Stripe no conectado</p>
            )}
          </div>
        </div>

        <div style={formCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Usuario</label>

            <input
              value={profile.username}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
              placeholder="@usuario"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Nombre completo</label>

            <input
              value={profile.full_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              placeholder="Tu nombre completo"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Ubicación</label>

            <input
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
              placeholder="Madrid, España"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Biografía</label>

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              placeholder="Cuéntale a los compradores quién eres..."
              style={textareaStyle}
            />
          </div>

          <div style={buttonsRowStyle}>
            <button onClick={saveProfile} style={buttonStyle}>
              {saving ? "Guardando..." : "Guardar perfil"}
            </button>

            {!profile.stripe_account_id ? (
              <button onClick={startStripeOnboarding} style={connectButtonStyle}>
                Conectar pagos de Stripe
              </button>
            ) : stripeReady ? (
              <div style={stripeConnectedStyle}>
                Pagos de Stripe activos ✓
              </div>
            ) : (
              <button onClick={startStripeOnboarding} style={connectButtonStyle}>
                Completar configuración de Stripe
              </button>
            )}

            <button onClick={loadProfile} style={refreshButtonStyle}>
              {checkingStripe ? "Comprobando..." : "Actualizar estado de Stripe"}
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .account-page {
            padding: 120px 18px 34px !important;
          }

          .account-title {
            font-size: 52px !important;
            letter-spacing: -2px !important;
          }

          .account-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily: "Inter, sans-serif",
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 40px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: "14px 0",
  letterSpacing: "-4px",
};

const subtitleStyle = {
  color: "#666",
};

const layoutStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: "30px",
};

const avatarCardStyle = {
  background: "#fff",
  borderRadius: "32px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  height: "fit-content",
};

const avatarWrapperStyle = {
  position: "relative" as const,
  width: "220px",
  height: "220px",
  borderRadius: "999px",
  overflow: "hidden",
  margin: "0 auto 22px",
  background: "#f3f3ef",
};

const helperStyle = {
  color: "#666",
  fontSize: "13px",
  lineHeight: 1.6,
  marginTop: "12px",
};

const stripeBoxStyle = {
  marginTop: "20px",
  background: "#f7f7f3",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "22px",
  padding: "16px",
};

const stripeTitleStyle = {
  margin: 0,
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  opacity: 0.5,
};

const stripeOkStyle = {
  marginBottom: 0,
  color: "#16a34a",
  fontWeight: 900,
};

const stripePendingStyle = {
  marginBottom: 0,
  color: "#92400e",
  fontWeight: 900,
};

const formCardStyle = {
  background: "#fff",
  borderRadius: "32px",
  padding: "34px",
  border: "1px solid rgba(0,0,0,0.06)",
};

const fieldStyle = {
  marginBottom: "22px",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "18px",
  padding: "16px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "160px",
  resize: "none" as const,
};

const buttonsRowStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
  alignItems: "center",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px 26px",
  fontWeight: 800,
  fontSize: "15px",
  cursor: "pointer",
};

const connectButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "18px 26px",
  fontWeight: 800,
  fontSize: "15px",
  cursor: "pointer",
};

const refreshButtonStyle = {
  background: "#f5f5f2",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "18px 22px",
  fontWeight: 800,
  fontSize: "14px",
  cursor: "pointer",
};

const stripeConnectedStyle = {
  padding: "16px 22px",
  border: "1px solid #16a34a",
  borderRadius: "999px",
  color: "#16a34a",
  fontWeight: 800,
  width: "fit-content",
};