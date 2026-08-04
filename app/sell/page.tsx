"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  getBrandsByCategory,
  getModelsByBrand,
} from "@/lib/sportsCatalog";
import { useLanguage } from "@/components/LanguageProvider";


const SPORTS = ["PADEL", "GOLF", "TENIS", "RUNNING"];
const GENDERS = ["MEN", "WOMEN", "UNISEX", "JUNIOR"];

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SellPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("PADEL");
  const [gender, setGender] = useState("UNISEX");
  const [condition, setCondition] = useState("Excellent");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("");
const [customModel, setCustomModel] = useState("");


const availableBrands = useMemo(() => {
  return getBrandsByCategory(category as any);
}, [category]);

const availableModels = useMemo(() => {
  return getModelsByBrand(category as any, brand);
}, [category, brand]);

const handleCategoryChange = (newCategory: string) => {
  setCategory(newCategory);
  setBrand("");
  setModel("");
  setCustomModel("");
};

  const handleImage = (file: File | null) => {
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const publishProduct = async () => {

    const numericPrice = Number(price);

    if (!numericPrice || numericPrice <= 0) {
      alert(t.sellInvalidPrice);
      return;
    }

    if (!SPORTS.includes(category)) {
      alert(t.sellInvalidCategory);
      return;
    }

    if (!GENDERS.includes(gender)) {
      alert(t.sellInvalidGender);
      return;
    }

    if (!availableBrands.includes(brand)) {
      alert(t.sellInvalidBrand);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.sellLoginRequired);
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
      alert(t.sellProfileError);
      return;
    }

    const stripeReady =
      profile.stripe_account_id &&
      profile.stripe_onboarding_complete &&
      profile.stripe_charges_enabled &&
      profile.stripe_payouts_enabled;

    if (!stripeReady) {
     alert(t.sellStripeRequired);
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

const productId = crypto.randomUUID();

const finalModel =
  model === "OTRO" ? customModel.trim() : model.trim();

if (!category) {
 alert(t.sellSelectSportAlert);
  return;
}

if (!brand) {
  alert(t.sellSelectBrandAlert);
  return;
}

if (!finalModel) {
  alert(t.sellSelectModelAlert);
  return;
}

const seoTitle =
  title.trim() ||
  `${brand} ${finalModel} ${t.sellSecondHandSuffix}`;

const productSlug = generateSlug(
  `${brand} ${finalModel} segunda mano`
);

const { data, error } = await supabase
  .from("products")
  .insert([
    {
      id: productId,
      title: seoTitle,
      slug: productSlug,
      brand,
      model: finalModel,
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
      moderation_status: "approved",
      approved_at: new Date().toISOString(),
    },
  ])
  .select()
  .single();

      if (error) {
        alert(error.message);
        return;
      }

     alert(t.sellPublishedSuccess);
      router.push(`/products/${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle} className="sell-page">
      <section style={heroStyle}>
        <p style={heroEyebrowStyle}>{t.sellHeroEyebrow}</p>

<h1 style={heroTitleStyle} className="sell-title">
  {t.sellHeroTitle1}
  <br />
  {t.sellHeroTitle2}
</h1>

<p style={heroTextStyle}>
  {t.sellHeroText}
</p>
      </section>

      <section style={formWrapperStyle} className="sell-form-wrapper">
        <label style={uploadBoxStyle}>
          {preview ? (
            <Image
              src={preview}
              alt={t.sellPreviewAlt}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div style={emptyUploadStyle}>
              <div style={uploadIconStyle}>＋</div>
              <p style={uploadTitleStyle}>{t.sellProductImage}</p>
<span style={uploadTextStyle}>
  {t.sellUploadImageText}
</span>
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
           placeholder={t.sellCustomTitlePlaceholder}
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
   <option value="">{t.sellSelectSport}</option>

    {SPORTS.map((sport) => (
      <option key={sport} value={sport}>
        {sport}
      </option>
    ))}
  </select>

  <select
    value={brand}
    onChange={(e) => {
      setBrand(e.target.value);
      setModel("");
    }}
    style={inputStyle}
    disabled={!category}
  >
    <option value="">{t.sellSelectBrand}</option>

    {availableBrands.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>

<div style={rowStyle}>
  <select
    value={model}
    onChange={(e) => {
      setModel(e.target.value);
      setCustomModel("");
    }}
    style={inputStyle}
    disabled={!brand}
  >
   <option value="">{t.sellSelectModel}</option>

    {availableModels.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}

   <option value="OTRO">{t.sellOtherModel}</option>
  </select>

  {model === "OTRO" ? (
    <input
      value={customModel}
      placeholder={t.sellWriteModel}
      onChange={(e) => setCustomModel(e.target.value)}
      style={inputStyle}
    />
  ) : (
    <div />
  )}
</div>

          <div style={rowStyle}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={inputStyle}
            >
<option value="MEN">{t.genderMen}</option>
<option value="WOMEN">{t.genderWomen}</option>
<option value="UNISEX">{t.genderUnisex}</option>
<option value="JUNIOR">{t.genderJunior}</option>
            </select>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={inputStyle}
            >
<option value="New">{t.conditionNew}</option>
<option value="Like new">{t.conditionLikeNew}</option>
<option value="Excellent">{t.conditionExcellent}</option>
<option value="Good">{t.conditionGood}</option>
<option value="Used">{t.conditionUsed}</option>
            </select>
          </div>

          <input
           placeholder={t.sellPricePlaceholder}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <textarea
           placeholder={t.sellDescriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

<div style={noticeStyle}>
  <strong>{t.sellImmediateTitle}</strong>{" "}
  {t.sellImmediateText}
</div>

          <div style={trustRowStyle}>
<div style={trustBadgeStyle}>
  ✓ {t.sellPremiumBrandsBadge}
</div>

<div style={trustBadgeStyle}>
  ✓ {t.sellBuyerProtectionBadge}
</div>

<div style={trustBadgeStyle}>
  ✓ {t.sellImmediateBadge}
</div>
          </div>

          <button
  onClick={publishProduct}
  disabled={loading}
  style={{
    ...submitButtonStyle,
    opacity: loading ? 0.6 : 1,
    cursor: loading ? "not-allowed" : "pointer",
  }}
>
  {loading ? t.sellPublishing : t.sellPublishProduct}
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