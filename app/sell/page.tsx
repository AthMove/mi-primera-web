"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PREMIUM_BRANDS: Record<string, string[]> = {
  PADEL: ["NOX", "Bullpadel", "Siux", "Babolat", "Wilson", "Head"],
  GOLF: ["Titleist", "TaylorMade", "Callaway", "PXG", "Scotty Cameron", "Ping"],
  TENNIS: ["Nike", "Wilson", "Yonex", "Lacoste", "Babolat", "Head"],
  RUNNING: ["Nike", "Hoka", "On", "ASICS", "New Balance", "Salomon"],
};

const SPORTS = ["PADEL", "GOLF", "TENNIS", "RUNNING"];
const GENDERS = ["MEN", "WOMEN", "UNISEX", "JUNIOR"];

export default function SellPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState(PREMIUM_BRANDS.PADEL[0]);
  const [category, setCategory] = useState("PADEL");
  const [gender, setGender] = useState("UNISEX");
  const [condition, setCondition] = useState("Excellent");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const availableBrands = useMemo(() => {
    return PREMIUM_BRANDS[category] || [];
  }, [category]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setBrand(PREMIUM_BRANDS[value]?.[0] || "");
  };

  const handleImage = (file: File | null) => {
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const publishProduct = async () => {
    if (
      !title.trim() ||
      !brand.trim() ||
      !category.trim() ||
      !gender.trim() ||
      !price.trim() ||
      !description.trim()
    ) {
      alert("Completa todos los campos");
      return;
    }

    const numericPrice = Number(price);

    if (!numericPrice || numericPrice <= 0) {
      alert("Introduce un precio válido");
      return;
    }

    if (!SPORTS.includes(category)) {
      alert("Categoría no permitida");
      return;
    }

    if (!GENDERS.includes(gender)) {
      alert("Género no permitido");
      return;
    }

    if (!availableBrands.includes(brand)) {
      alert("Marca no permitida para esta categoría");
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "stripe_account_id, stripe_onboarding_complete, stripe_charges_enabled, stripe_payouts_enabled"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      alert("No se pudo comprobar tu perfil de vendedor");
      return;
    }

    const stripeReady =
      profile.stripe_account_id &&
      profile.stripe_onboarding_complete &&
      profile.stripe_charges_enabled &&
      profile.stripe_payouts_enabled;

    if (!stripeReady) {
      alert("Debes conectar Stripe payouts antes de vender.");
      router.push("/account");
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
            brand,
            category,
            sport: category,
            gender,
            condition,
            price: numericPrice,
            description: description.trim(),
            image: imageUrl,
            images: [imageUrl],
            seller_id: user.id,
            seller_email: user.email,
            sold: false,
            moderation_status: "pending",
          },
        ])
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      alert("Product submitted for review");
      router.push(`/products/${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle} className="sell-page">
      <section style={heroStyle}>
        <p style={heroEyebrowStyle}>ATHMOV CURATED MARKETPLACE</p>

        <h1 style={heroTitleStyle} className="sell-title">
          Sell Premium
          <br />
          Sports Gear
        </h1>

        <p style={heroTextStyle}>
          Only selected premium brands in padel, golf, tennis and running are
          accepted. Every listing is reviewed before going live.
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

          <div style={rowStyle}>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={inputStyle}
            >
              {SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={inputStyle}
            >
              {availableBrands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div style={rowStyle}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={inputStyle}
            >
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="UNISEX">UNISEX</option>
              <option value="JUNIOR">JUNIOR</option>
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
            <strong>Curated listing:</strong> your product will be reviewed by
            ATHMOV before appearing publicly.
          </div>

          <div style={trustRowStyle}>
            <div style={trustBadgeStyle}>✓ PREMIUM BRANDS ONLY</div>
            <div style={trustBadgeStyle}>✓ BUYER PROTECTION</div>
            <div style={trustBadgeStyle}>✓ MANUAL REVIEW</div>
          </div>

          <button onClick={publishProduct} style={submitButtonStyle}>
            {loading ? "Submitting..." : "Submit for review"}
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
  boxSizing: "border-box" as const,
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
  boxSizing: "border-box" as const,
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