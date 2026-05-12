"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Usada");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth?mode=login");
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !data) {
      alert("Producto no encontrado");
      router.push("/account");
      return;
    }

    if (data.seller_id !== user.id) {
      router.push("/account");
      return;
    }

    setBrand(data.brand || "");
    setTitle(data.title || "");
    setPrice(data.price?.toString() || "");
    setCondition(data.condition || "Usada");
    setDescription(data.description || "");

    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!brand || !title || !price) {
      alert("Completa todos los campos");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("products")
      .update({
        brand,
        title,
        price: Number(price),
        condition,
        description,
      })
      .eq("id", productId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto actualizado correctamente");

    router.push("/account");
  };

  if (loading) {
    return (
      <main style={loadingStyle}>
        Cargando producto...
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <h1 style={titleStyle}>
          Editar producto
        </h1>

        <div style={fieldStyle}>
          <label style={labelStyle}>Marca</label>

          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Modelo</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Precio</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Estado</label>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={inputStyle}
          >
            <option>Nueva</option>
            <option>Como nueva</option>
            <option>Usada</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={textareaStyle}
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          style={buttonStyle}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </section>
    </main>
  );
}

const fontFamily =
  "'Manrope', 'Satoshi', 'Avenir Next', system-ui, sans-serif";

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f6f3",
  fontFamily,
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
  fontFamily,
};

const cardStyle = {
  width: "100%",
  maxWidth: "720px",
  background: "#fff",
  borderRadius: "32px",
  padding: "40px",
};

const titleStyle = {
  fontSize: "42px",
  marginBottom: "30px",
  letterSpacing: "-1px",
};

const fieldStyle = {
  marginBottom: "24px",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontWeight: 600,
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "130px",
  resize: "none" as const,
};

const buttonStyle = {
  width: "100%",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "12px",
};