"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");

    if (urlMode === "login") setMode("login");
    if (urlMode === "register") setMode("register");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Introduce email y contraseña");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Cuenta creada correctamente");
      window.location.href = "/";
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Sesión iniciada correctamente");
    window.location.href = "/";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "42px",
          borderRadius: "26px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: mode === "login" ? "#111" : "#eee",
              color: mode === "login" ? "#fff" : "#111",
              fontWeight: 700,
            }}
          >
            SIGN IN
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: mode === "register" ? "#111" : "#eee",
              color: mode === "register" ? "#fff" : "#111",
              fontWeight: 700,
            }}
          >
            REGISTER
          </button>
        </div>

        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          {mode === "register" ? "Register" : "Sign In"}
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Welcome to ATHMOV
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "24px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "999px",
            border: "none",
            background: "#111",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {mode === "register" ? "Create account" : "Sign In"}
        </button>
      </form>
    </main>
  );
}