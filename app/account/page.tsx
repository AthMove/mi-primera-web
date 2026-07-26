"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ProfileState {
  username: string;
  full_name: string;
  bio: string;
  location: string;
  avatar_url: string;
  email: string;
  stripe_account_id: string;
  stripe_onboarding_complete: boolean;
  stripe_charges_enabled: boolean;
  stripe_payouts_enabled: boolean;
}

interface StripeStatusResponse {
  connected?: boolean;
  accountId?: string;
  onboardingComplete?: boolean;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  transfersActive?: boolean;
  transfersCapability?: string | null;
  disabledReason?: string | null;
  requirementsCurrentlyDue?: string[];
  requirementsPastDue?: string[];
  requirementsEventuallyDue?: string[];
  error?: string;
}

const emptyProfile: ProfileState = {
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
};

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingStripe, setCheckingStripe] = useState(false);
  const [connectingStripe, setConnectingStripe] = useState(false);
  const [userId, setUserId] = useState("");

  const [profile, setProfile] =
    useState<ProfileState>(emptyProfile);

  useEffect(() => {
    void loadProfile();
  }, []);

  const syncStripeStatus = async (
    currentUserId: string
  ): Promise<StripeStatusResponse | null> => {
    try {
      setCheckingStripe(true);

      const response = await fetch(
        "/api/stripe/connect/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId,
          }),
          cache: "no-store",
        }
      );

      const data: StripeStatusResponse =
        await response.json();

      console.log("ESTADO REAL DE STRIPE:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo comprobar el estado de Stripe"
        );
      }

      return data;
    } catch (error) {
      console.error(
        "ERROR AL SINCRONIZAR STRIPE:",
        error
      );

      return null;
    } finally {
      setCheckingStripe(false);
    }
  };

  const loadProfile = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "ERROR OBTENIENDO USUARIO:",
          userError
        );
        return;
      }

      if (!user) {
        console.error("USUARIO NO AUTENTICADO");
        return;
      }

      setUserId(user.id);

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          `
          username,
          full_name,
          bio,
          location,
          avatar_url,
          email,
          stripe_account_id,
          stripe_onboarding_complete,
          stripe_charges_enabled,
          stripe_payouts_enabled
          `
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "ERROR AL CARGAR PERFIL:",
          profileError
        );
        return;
      }

      /*
        Consultamos Stripe después de obtener el perfil.

        La respuesta directa de Stripe tiene prioridad sobre
        los valores guardados en Supabase.
      */
      const stripeStatus =
        await syncStripeStatus(user.id);

      console.log(
        "STRIPE SINCRONIZADO:",
        stripeStatus
      );

      const stripeConnected =
        stripeStatus?.connected === true;

      setProfile({
        username: profileData?.username || "",
        full_name: profileData?.full_name || "",
        bio: profileData?.bio || "",
        location: profileData?.location || "",
        avatar_url: profileData?.avatar_url || "",
        email:
          profileData?.email ||
          user.email ||
          "",

        stripe_account_id:
          stripeStatus?.accountId ||
          profileData?.stripe_account_id ||
          "",

        stripe_onboarding_complete:
          stripeConnected
            ? stripeStatus?.onboardingComplete === true
            : profileData?.stripe_onboarding_complete ===
              true,

        stripe_charges_enabled:
          stripeConnected
            ? stripeStatus?.chargesEnabled === true
            : profileData?.stripe_charges_enabled === true,

        stripe_payouts_enabled:
          stripeConnected
            ? stripeStatus?.payoutsEnabled === true
            : profileData?.stripe_payouts_enabled === true,
      });
    } catch (error) {
      console.error(
        "ERROR GENERAL AL CARGAR PERFIL:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const startStripeOnboarding = async () => {
    try {
      setConnectingStripe(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        alert(
          "Debes iniciar sesión para conectar Stripe"
        );
        return;
      }

      const response = await fetch(
        "/api/stripe/connect/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "RESPUESTA ONBOARDING STRIPE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo iniciar la conexión con Stripe"
        );
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error(
        data.error ||
          "Stripe no devolvió un enlace de configuración"
      );
    } catch (error) {
      console.error(
        "ERROR CONECTANDO STRIPE:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "No se pudo conectar Stripe"
      );
    } finally {
      setConnectingStripe(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        alert(userError.message);
        return;
      }

      if (!user) {
        alert("Debes iniciar sesión");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            email: user.email,
            username: profile.username.trim(),
            full_name: profile.full_name.trim(),
            bio: profile.bio.trim(),
            location: profile.location.trim(),
            avatar_url:
              profile.avatar_url.trim(),
          },
          {
            onConflict: "id",
          }
        );

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Perfil actualizado correctamente"
      );

      await loadProfile();
    } catch (error) {
      console.error(
        "ERROR GUARDANDO PERFIL:",
        error
      );

      alert(
        "No se pudo actualizar el perfil"
      );
    } finally {
      setSaving(false);
    }
  };

  const safeAvatar = (src: string) => {
    if (
      src?.startsWith("http") ||
      src?.startsWith("/")
    ) {
      return src;
    }

    return "/logo.png";
  };

  const stripeReady = Boolean(
    profile.stripe_account_id &&
      profile.stripe_onboarding_complete &&
      profile.stripe_charges_enabled &&
      profile.stripe_payouts_enabled
  );

  if (loading) {
    return (
      <main style={loadingStyle}>
        Cargando perfil...
      </main>
    );
  }

  return (
    <main
      style={pageStyle}
      className="account-page"
    >
      <section style={heroStyle}>
        <p style={eyebrowStyle}>
          PERFIL ATHMOV
        </p>

        <h1
          style={titleStyle}
          className="account-title"
        >
          Tu cuenta
        </h1>

        <p style={subtitleStyle}>
          Gestiona tu perfil público de vendedor.
        </p>
      </section>

      <section
        style={layoutStyle}
        className="account-layout"
      >
        <div style={avatarCardStyle}>
          <div style={avatarWrapperStyle}>
            <Image
              src={safeAvatar(
                profile.avatar_url
              )}
              alt="Avatar"
              fill
              sizes="220px"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <input
            value={profile.avatar_url}
            onChange={(event) =>
              setProfile((currentProfile) => ({
                ...currentProfile,
                avatar_url:
                  event.target.value,
              }))
            }
            placeholder="URL de imagen de perfil"
            style={inputStyle}
          />

          <p style={helperStyle}>
            Pega una URL de imagen para tu foto
            de perfil.
          </p>

          <div style={stripeBoxStyle}>
            <p style={stripeTitleStyle}>
              Estado de Stripe
            </p>

            {stripeReady ? (
              <p style={stripeOkStyle}>
                Pagos activos ✓
              </p>
            ) : profile.stripe_account_id ? (
              <p style={stripePendingStyle}>
                Configuración pendiente
              </p>
            ) : (
              <p style={stripePendingStyle}>
                Stripe no conectado
              </p>
            )}

            {profile.stripe_account_id && (
              <div style={stripeDetailsStyle}>
                <span>
                  Formulario:{" "}
                  {profile.stripe_onboarding_complete
                    ? "completado"
                    : "pendiente"}
                </span>

                <span>
                  Cobros:{" "}
                  {profile.stripe_charges_enabled
                    ? "activos"
                    : "pendientes"}
                </span>

                <span>
                  Pagos al vendedor:{" "}
                  {profile.stripe_payouts_enabled
                    ? "activos"
                    : "pendientes"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={formCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              Usuario
            </label>

            <input
              value={profile.username}
              onChange={(event) =>
                setProfile((currentProfile) => ({
                  ...currentProfile,
                  username:
                    event.target.value,
                }))
              }
              placeholder="@usuario"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Nombre completo
            </label>

            <input
              value={profile.full_name}
              onChange={(event) =>
                setProfile((currentProfile) => ({
                  ...currentProfile,
                  full_name:
                    event.target.value,
                }))
              }
              placeholder="Tu nombre completo"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Ubicación
            </label>

            <input
              value={profile.location}
              onChange={(event) =>
                setProfile((currentProfile) => ({
                  ...currentProfile,
                  location:
                    event.target.value,
                }))
              }
              placeholder="Madrid, España"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Biografía
            </label>

            <textarea
              value={profile.bio}
              onChange={(event) =>
                setProfile((currentProfile) => ({
                  ...currentProfile,
                  bio: event.target.value,
                }))
              }
              placeholder="Cuéntale a los compradores quién eres..."
              style={textareaStyle}
            />
          </div>

          <div style={buttonsRowStyle}>
            <button
              type="button"
              onClick={saveProfile}
              style={buttonStyle}
              disabled={saving}
            >
              {saving
                ? "Guardando..."
                : "Guardar perfil"}
            </button>

            {!profile.stripe_account_id ? (
              <button
                type="button"
                onClick={
                  startStripeOnboarding
                }
                style={connectButtonStyle}
                disabled={connectingStripe}
              >
                {connectingStripe
                  ? "Conectando..."
                  : "Conectar pagos de Stripe"}
              </button>
            ) : stripeReady ? (
              <div style={stripeConnectedStyle}>
                Pagos de Stripe activos ✓
              </div>
            ) : (
              <button
                type="button"
                onClick={
                  startStripeOnboarding
                }
                style={connectButtonStyle}
                disabled={connectingStripe}
              >
                {connectingStripe
                  ? "Abriendo Stripe..."
                  : "Completar configuración de Stripe"}
              </button>
            )}

            <button
              type="button"
              onClick={loadProfile}
              style={refreshButtonStyle}
              disabled={
                checkingStripe || loading
              }
            >
              {checkingStripe
                ? "Comprobando..."
                : "Actualizar estado de Stripe"}
            </button>
          </div>

          {userId && (
            <p style={statusHelperStyle}>
              El estado se consulta directamente
              en Stripe y se sincroniza con tu
              perfil de ATHMOV.
            </p>
          )}
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

        button:disabled {
          opacity: 0.55;
          cursor: not-allowed !important;
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
  background:
    "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
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
  border:
    "1px solid rgba(0,0,0,0.06)",
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
  border:
    "1px solid rgba(0,0,0,0.06)",
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

const stripeDetailsStyle = {
  marginTop: "12px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "5px",
  color: "#666",
  fontSize: "12px",
  lineHeight: 1.5,
};

const formCardStyle = {
  background: "#fff",
  borderRadius: "32px",
  padding: "34px",
  border:
    "1px solid rgba(0,0,0,0.06)",
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
  border:
    "1px solid rgba(0,0,0,0.1)",
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
  border:
    "1px solid rgba(0,0,0,0.12)",
  borderRadius: "999px",
  padding: "18px 26px",
  fontWeight: 800,
  fontSize: "15px",
  cursor: "pointer",
};

const refreshButtonStyle = {
  background: "#f5f5f2",
  color: "#111",
  border:
    "1px solid rgba(0,0,0,0.08)",
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

const statusHelperStyle = {
  marginTop: "18px",
  marginBottom: 0,
  color: "#777",
  fontSize: "12px",
  lineHeight: 1.6,
};