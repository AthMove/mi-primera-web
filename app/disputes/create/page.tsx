"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateDisputePage() {
  return (
    <Suspense fallback={<main style={{ padding: 140 }}>Loading...</main>}>
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
    if (!reason.trim() || !description.trim() || !orderId) {
      alert("Complete all fields");
      return;
    }

    if (files.length > 5) {
      alert("You can upload up to 5 files");
      return;
    }

    setLoading(true);

    try {
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
        alert("Order not found");
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
          dispute_evidence: evidenceUrls,
        })
        .eq("id", order.id);

      if (orderUpdateError) {
        alert(orderUpdateError.message);
        return;
      }

      await supabase.from("dispute_evidence").insert([
        {
          order_id: order.id,
          user_id: user.id,
          message: description.trim(),
          file_url: evidenceUrls[0] || null,
        },
      ]);

      alert("Dispute opened");
      window.location.href = "/orders";
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV PROTECTION</p>

        <h1 style={titleStyle}>Open dispute</h1>

        <input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <div style={uploadBoxStyle}>
          <strong>Evidence photos</strong>

          <p style={hintStyle}>
            Upload up to 5 images to help ATHMOV review the case.
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
          {loading ? "Opening..." : "Submit dispute"}
        </button>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "140px 20px",
  background: "#f6f6f3",
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