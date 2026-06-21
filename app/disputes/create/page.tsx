"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CreateDisputePage() {
  return (
    <Suspense fallback={<main style={{ padding: 140 }}>Cargando...</main>}>
      <CreateDisputeContent />
    </Suspense>
  );
}

function CreateDisputeContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const submitDispute = async () => {
    if (!orderId) {
      alert("Pedido no encontrado");
      return;
    }

    if (!reason.trim() || !description.trim()) {
      alert("Completa todos los campos");
      return;
    }

    if (files.length > 5) {
      alert("Puedes subir un máximo de 5 archivos");
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth";
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

      if (orderError || !order) {
        alert(orderError?.message || "Pedido no encontrado");
        return;
      }

      if (user.id !== order.buyer_id && user.id !== order.seller_id) {
        alert("No tienes permiso para abrir una disputa en este pedido");
        return;
      }

      if (order.dispute_status === "open") {
        alert("Este pedido ya tiene una disputa abierta");
        return;
      }

      const evidenceUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${order.id}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("dispute-evidence")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("dispute-evidence")
          .getPublicUrl(fileName);

        if (data.publicUrl) {
          evidenceUrls.push(data.publicUrl);
        }
      }

      const { error: disputeError } = await supabase.from("disputes").insert({
        order_id: order.id,
        buyer_id: order.buyer_id,
        seller_id: order.seller_id,
        reason: reason.trim(),
        description: description.trim(),
        status: "open",
      });

      if (disputeError) {
        alert(disputeError.message);
        return;
      }

      const { error: orderUpdateError } = await supabase
        .from("orders")
        .update({
          dispute_status: "open",
          dispute_reason: reason.trim(),
          dispute_opened_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (orderUpdateError) {
        alert(orderUpdateError.message);
        return;
      }

      const evidenceRows =
        evidenceUrls.length > 0
          ? evidenceUrls.map((url) => ({
              order_id: order.id,
              user_id: user.id,
              message: description.trim(),
              file_url: url,
            }))
          : [
              {
                order_id: order.id,
                user_id: user.id,
                message: description.trim(),
                file_url: null,
              },
            ];

      const { error: evidenceError } = await supabase
        .from("dispute_evidence")
        .insert(evidenceRows);

      if (evidenceError) {
        alert(evidenceError.message);
        return;
      }

      await fetch("/api/email/dispute-opened", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
        }),
      });

      alert("Disputa abierta");
      window.location.href = "/orders";
    } catch (err) {
      console.error("ERROR AL CREAR DISPUTA:", err);
      alert("Error inesperado al abrir la disputa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <p style={eyebrowStyle}>PROTECCIÓN ATHMOV</p>
        <h1 style={titleStyle}>Abrir disputa</h1>

        <input
          placeholder="Motivo"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Describe el problema"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <div style={uploadBoxStyle}>
          <strong>Fotos como prueba</strong>

          <p style={hintStyle}>
            Sube hasta 5 imágenes para ayudar a ATHMOV a revisar el caso.
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const selected = Array.from(e.target.files || []).slice(0, 5);
              setFiles(selected);
            }}
          />

          {files.length > 0 && (
            <div style={previewGridStyle}>
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} style={previewItemStyle}>
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={submitDispute} disabled={loading} style={buttonStyle}>
          {loading ? "Abriendo..." : "Enviar disputa"}
        </button>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "140px 20px",
  background: "#f6f6f3",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "32px",
  padding: "40px",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "52px",
  marginBottom: "30px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  marginBottom: "18px",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  width: "100%",
  minHeight: "180px",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  marginBottom: "24px",
  boxSizing: "border-box" as const,
  resize: "none" as const,
};

const uploadBoxStyle = {
  background: "#f7f7f7",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "24px",
};

const hintStyle = {
  color: "#666",
  fontSize: "14px",
};

const previewGridStyle = {
  display: "grid",
  gap: "8px",
  marginTop: "14px",
};

const previewItemStyle = {
  background: "#fff",
  padding: "10px",
  borderRadius: "12px",
  fontSize: "13px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "18px 28px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 800,
};