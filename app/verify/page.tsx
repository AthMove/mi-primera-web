"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VerifyPage() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("unverified");
  const [uploading, setUploading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");

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

    setUserId(user.id);

    const { data } = await supabase
      .from("profiles")
      .select("verification_status, verification_document")
      .eq("id", user.id)
      .maybeSingle();

    if (data) {
      setStatus(data.verification_status || "unverified");
      setDocumentUrl(data.verification_document || "");
    }
  };

  const uploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !userId || uploading) return;

    try {
      setUploading(true);

      const filePath = `${userId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("verification-documents")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("verification-documents")
        .getPublicUrl(filePath);

      const { error } = await supabase
        .from("profiles")
        .update({
          verification_status: "pending",
          verification_document: publicUrl,
          verification_submitted_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        alert(error.message);
        return;
      }

      setStatus("pending");
      setDocumentUrl(publicUrl);

      alert("Verificación enviada");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV VERIFICACIÓN</p>

        <h1 style={titleStyle}>Verificación de vendedor</h1>

        <p style={textStyle}>
          Sube tu DNI, pasaporte o permiso de conducir para convertirte en
          vendedor verificado de ATHMOV.
        </p>

        <div style={statusBoxStyle}>
          <strong>Estado:</strong>{" "}
          {status === "verified"
            ? "Verificado ✓"
            : status === "pending"
              ? "Pendiente de revisión"
              : "No verificado"}
        </div>

        {documentUrl && (
          <a
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Ver documento subido →
          </a>
        )}

        {status !== "verified" && (
          <>
            <label
              style={{
                ...uploadBoxStyle,
                opacity: uploading ? 0.6 : 1,
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={uploadDocument}
                disabled={uploading}
                style={{ display: "none" }}
              />

              {uploading ? "Subiendo..." : "Subir DNI o pasaporte"}
            </label>

            <p style={smallTextStyle}>
              Aceptado: DNI, pasaporte o permiso de conducir.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f3ee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#fff",
  borderRadius: "34px",
  padding: "46px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 30px 90px rgba(0,0,0,0.06)",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-3px",
};

const textStyle = {
  color: "#666",
  marginTop: "18px",
  lineHeight: 1.7,
};

const statusBoxStyle = {
  marginTop: "28px",
  background: "#f8f8f6",
  padding: "18px",
  borderRadius: "18px",
};

const uploadBoxStyle = {
  marginTop: "28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 22px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  fontWeight: 800,
};

const smallTextStyle = {
  marginTop: "14px",
  color: "#888",
  fontSize: "13px",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "18px",
  color: "#111",
  fontWeight: 800,
  textDecoration: "none",
};