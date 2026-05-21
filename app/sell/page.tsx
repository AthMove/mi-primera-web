"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("PADEL");
  const [condition, setCondition] = useState("Excellent");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (file: File | null) => {
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const publishProduct = async () => {
    if (!title.trim() || !brand.trim() || !price.trim() || !description.trim()) {
      alert("Completa todos los campos");
      return;
    }

    const numericPrice = Number(price);

    if (!numericPrice || numericPrice <= 0) {
      alert("Introduce un precio válido");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión para vender");
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "/logo.png";

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop() || "jpg";
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            title: title.trim(),
            brand: brand.trim(),
            category,
            condition,
            price: numericPrice,
            description: description.trim(),
            image: imageUrl,
            images: [imageUrl],
            seller_id: user.id,
            seller_email: user.email,
            sold: false,
          },
        ])
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      alert("Product published");
      router.push(`/products/${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle} className="sell-page">
      <section style={heroStyle}>
        <p style={heroEyebrowStyle}>ATHMOV VERIFIED MARKETPLACE</p>

        <h1 style={heroTitleStyle} className="sell-title">
          Sell Premium
          <br />
          Sports Gear
        </h1>

        <p style={heroTextStyle}>
          List your second-hand sports equipment in a curated premium marketplace.
        </p>
      </section>

      <section style={formWrapperStyle} className="sell-form-wrapper">
        <label style={uploadBoxStyle}>
          {preview ? (
            <Image
              src={preview}
              alt="Product preview"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div style={emptyUploadStyle}>
              <div style={uploadIconStyle}>＋</div>
              <p style={uploadTitleStyle}>Product image</p>
              <span style={uploadTextStyle}>Upload a clear premium photo</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files?.[0] || null)}
            style={{ display: "none" }}
          />
        </label>

        <div style={formStyle}>
          <input
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={inputStyle}
          />

          <div style={rowStyle}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="PADEL">PADEL</option>
              <option value="GOLF">GOLF</option>
              <option value="TENNIS">TENNIS</option>
              <option value="CYCLING">CYCLING</option>
              <option value="RUNNING">RUNNING</option>
            </select>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={inputStyle}
            >
              <option value="New">New</option>
              <option value="Like new">Like new</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <input
            placeholder="Price (€)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Describe condition, usage, serial number, invoice availability..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <div style={noticeStyle}>
            <strong>Beta trust tip:</strong> include serial numbers, close-up
            photos and any proof of purchase to increase buyer confidence.
          </div>

          <div style={trustRowStyle}>
            <div style={trustBadgeStyle}>✓ VERIFIED MARKETPLACE</div>
            <div style={trustBadgeStyle}>✓ BUYER PROTECTION</div>
            <div style={trustBadgeStyle}>✓ PREMIUM SPORTS COMMUNITY</div>
          </div>

          <button onClick={publishProduct} style={submitButtonStyle}>
            {loading ? "Publishing..." : "Publish product"}
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .sell-page {
            padding: 120px 18px 34px !important;
          }

          .sell-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }

          .sell-form-wrapper {
            grid-template-columns: 1fr !important;
            padding: 18px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "0 auto 50px",
};

const heroEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const heroTitleStyle = {
  fontSize: "82px",
  lineHeight: 0.95,
  letterSpacing: "-5px",
  marginTop: "20px",
  marginBottom: "24px",
};

const heroTextStyle = {
  fontSize: "18px",
  color: "#666",
  maxWidth: "620px",
  lineHeight: 1.7,
};

const formWrapperStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "34px",
  background: "#fff",
  borderRadius: "40px",
  padding: "34px",
  boxShadow: "0 25px 90px rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.05)",
};

const uploadBoxStyle = {
  position: "relative" as const,
  height: "620px",
  borderRadius: "34px",
  border: "2px dashed rgba(0,0,0,0.12)",
  background: "#f8f8f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column" as const,
  cursor: "pointer",
  overflow: "hidden",
};

const emptyUploadStyle = {
  textAlign: "center" as const,
};

const uploadIconStyle = {
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  margin: "0 auto 18px",
};

const uploadTitleStyle = {
  margin: 0,
  fontWeight: 900,
};

const uploadTextStyle = {
  color: "#777",
  fontSize: "13px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "18px 22px",
  borderRadius: "18px",
  fontSize: "15px",
  background: "#fafaf8",
  border: "1px solid rgba(0,0,0,0.08)",
  outline: "none",
  marginBottom: "14px",
};

const textareaStyle = {
  width: "100%",
  minHeight: "170px",
  padding: "18px 22px",
  borderRadius: "24px",
  fontSize: "15px",
  background: "#fafaf8",
  border: "1px solid rgba(0,0,0,0.08)",
  outline: "none",
  resize: "none" as const,
};

const noticeStyle = {
  marginTop: "16px",
  background: "#f5f5f1",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: "22px",
  padding: "16px",
  color: "#555",
  lineHeight: 1.6,
};

const trustRowStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  marginTop: "18px",
};

const trustBadgeStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "10px 14px",
  fontSize: "10px",
  fontWeight: 900,
  letterSpacing: "1.2px",
};

const submitButtonStyle = {
  width: "100%",
  marginTop: "24px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "22px",
  fontSize: "16px",
  fontWeight: 800,
  cursor: "pointer",
};