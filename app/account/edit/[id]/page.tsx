"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      alert("Producto no encontrado");
      router.push("/account");
      return;
    }

    setTitle(data.title || "");
    setBrand(data.brand || "");
    setPrice(String(data.price || ""));
    setCondition(data.condition || "");
    setDescription(data.description || "");
    setLoading(false);
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("products")
      .update({
        title,
        brand,
        price: Number(price),
        condition,
        description,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto actualizado");
    router.push("/account");
  };

  if (loading) {
    return <main style={pageStyle}>Loading...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>ATHMOV SELLER</p>
        <h1 style={titleStyle}>Edit product</h1>

        <form onSubmit={saveProduct} style={formStyle}>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
            style={inputStyle}
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={inputStyle}
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            style={inputStyle}
          />

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={inputStyle}
          >
            <option value="">Condition</option>
            <option value="Nueva">Nueva</option>
            <option value="Como nueva">Como nueva</option>
            <option value="Usada">Usada</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={textareaStyle}
          />

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 60px",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  maxWidth: "640px",
  margin: "0 auto",
  background: "#fff",
  padding: "44px",
  borderRadius: "36px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.08)",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  letterSpacing: "-3px",
  marginTop: "12px",
  marginBottom: "34px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "17px 20px",
  fontSize: "15px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "140px",
  borderRadius: "24px",
  resize: "none" as const,
};

const buttonStyle = {
  marginTop: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "16px",
  fontWeight: 800,
  cursor: "pointer",
};