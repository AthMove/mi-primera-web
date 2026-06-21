"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/";
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !profile || profile.role !== "admin") {
        window.location.href = "/";
        return;
      }

      setAuthorized(true);
    } catch (error) {
      console.log("ERROR AL COMPROBAR ADMIN:", error);
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main style={loadingStyle}>
        Comprobando acceso de administrador...
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter, sans-serif",
};