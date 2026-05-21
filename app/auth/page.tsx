"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Introduce email y contraseña");
      return;
    }

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/products");
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV ACCOUNT</p>

        <h1 style={titleStyle}>
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

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

        <button onClick={handleAuth} style={buttonStyle}>
          {mode === "login" ? "Sign in" : "Register"}
        </button>

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          style={switchStyle}
        >
          {mode === "login"
            ? "No account? Create one"
            : "Already have an account? Sign in"}
        </button>
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

const switchStyle = {
  width: "100%",
  marginTop: "18px",
  background: "transparent",
  border: "none",
  color: "#111",
  fontWeight: 700,
  cursor: "pointer",
};