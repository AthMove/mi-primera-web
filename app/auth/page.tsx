"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("athmovco@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState("");

  const handleAuth = async () => {
    try {
      setLoading(true);
      setDebug("Starting login...");

      if (!email || !password) {
        setDebug("Missing email or password");
        alert("Introduce email y contraseña");
        return;
      }

      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setDebug(`Login error: ${error.message}`);
        alert(error.message);
        return;
      }

      setDebug(`Logged in as: ${data.user?.email}`);
      if (cleanEmail === "athmovco@gmail.com") {
  window.location.href = "/admin/disputes";
  return;
}

      window.location.href = "/products";
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV ACCOUNT</p>

        <h1 style={titleStyle}>Welcome back</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleAuth} disabled={loading} style={buttonStyle}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p style={{ marginTop: 16, fontSize: 13 }}>{debug}</p>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "520px",
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "38px",
  padding: "48px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.08)",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.45,
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "54px",
  lineHeight: 1,
  letterSpacing: "-3px",
  marginBottom: "34px",
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "18px 22px",
  marginBottom: "14px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  width: "100%",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "16px",
  fontWeight: 800,
  cursor: "pointer",
  marginTop: "12px",
};