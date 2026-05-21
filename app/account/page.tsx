"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    bio: "",
    location: "",
    avatar_url: "",
    email: "",
    stripe_account_id: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth";
      return;
    }

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
      email: data.email || "",
      stripe_account_id: data.stripe_account_id || "",
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

      alert(data.error || "Could not start Stripe onboarding");
    } catch (error) {
      console.log(error);
      alert("Stripe connection failed");
    }
  };

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      setSaving(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: profile.email,
        username: profile.username,
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        avatar_url: profile.avatar_url,
        stripe_account_id: profile.stripe_account_id,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Profile updated");
      await loadProfile();
    } finally {
      setSaving(false);
    }
  };

  const safeAvatar = (src: string) => {
    return src?.startsWith("http") ? src : "/logo.png";
  };

  if (loading) {
    return <main style={loadingStyle}>Loading profile...</main>;
  }

  return (
    <main style={pageStyle} className="account-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV PROFILE</p>

        <h1 style={titleStyle} className="account-title">
          Your Account
        </h1>

        <p style={subtitleStyle}>Manage your public seller profile.</p>
      </section>

      <section style={layoutStyle}>
        <div style={avatarCardStyle}>
          <div style={avatarWrapperStyle}>
            <Image
              src={safeAvatar(profile.avatar_url)}
              alt="Avatar"
              fill
              sizes="200px"
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
            placeholder="Avatar image URL"
            style={inputStyle}
          />

          <p style={helperStyle}>Paste an image URL for your profile photo.</p>
        </div>

        <div style={formCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Username</label>

            <input
              value={profile.username}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
              placeholder="@username"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Full Name</label>

            <input
              value={profile.full_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              placeholder="Your full name"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Location</label>

            <input
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
              placeholder="Madrid, Spain"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Bio</label>

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              placeholder="Tell buyers about yourself..."
              style={textareaStyle}
            />
          </div>

          <div style={buttonsRowStyle}>
            <button onClick={saveProfile} style={buttonStyle}>
              {saving ? "Saving..." : "Save profile"}
            </button>

            {!profile.stripe_account_id ? (
              <button
                onClick={startStripeOnboarding}
                style={connectButtonStyle}
              >
                Connect Stripe payouts
              </button>
            ) : (
              <div style={stripeConnectedStyle}>Stripe connected ✓</div>
            )}
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

const stripeConnectedStyle = {
  padding: "16px 22px",
  border: "1px solid #16a34a",
  borderRadius: "999px",
  color: "#16a34a",
  fontWeight: 800,
  width: "fit-content",
};