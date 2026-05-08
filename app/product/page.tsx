"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert("Cuenta creada. Revisa tu email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert("Login correcto");
      }
    } catch (err) {
      alert("Error conectando con Supabase");
      console.error(err);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                mode === "login" ? "#111111" : "#eeeeee",
              color:
                mode === "login" ? "#ffffff" : "#111111",
              fontWeight: 700,
            }}
          >
            SIGN IN
          </button>

          <button
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                mode === "register" ? "#111111" : "#eeeeee",
              color:
                mode === "register" ? "#ffffff" : "#111111",
              fontWeight: 700,
            }}
          >
            REGISTER
          </button>
        </div>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          {mode === "register" ? "Register" : "Sign In"}
        </h1>

        <p
          style={{
            color: "#666666",
            marginBottom: "30px",
          }}
        >
          Welcome to ATHMOV
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid #dddddd",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid #dddddd",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "10px",
              background: "#111111",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "15px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {mode === "register"
              ? "Create account"
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}