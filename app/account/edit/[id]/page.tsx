"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("Usada");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
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
      .eq("id", id)
      .eq("seller_id", user.id)
      .single();

    if (error || !data) {
      router.push("/account");
      return;
    }

    setTitle(data.title || "");
    setBrand(data.brand || "");
    setPrice(data.price?.toString() || "");
    setDescription(data.description || "");
    setCondition(data.condition || "Usada");

    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const { error } = await supabase
        .from("products")
        .update({
          title,
          brand,
          price: Number(price),
          description,
          condition,
        })
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Producto actualizado correctamente");

      router.push("/account");
    } catch (error: any) {
      alert(error.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando producto...</main>;
  }

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Editar producto</h1>

        <form onSubmit={handleUpdate} style={formStyle}>
          <div>
            <label>Marca</label>

            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label>Modelo</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label>Precio</label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label>Estado</label>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={inputStyle}
            >
              <option>Usada</option>
              <option>Como nueva</option>
              <option>Nueva</option>
            </select>
          </div>

          <div>
            <label>Descripción</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textareaStyle}
              required
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={saving}>
            {saving ? "GUARDANDO..." : "Guardar cambios"}
          </button>
        </form>
      </div>
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
  padding: "60px 20px",
  fontFamily,
};

const cardStyle = {
  maxWidth: "620px",
  margin: "0 auto",
  background: "#fff",
  padding: "36px",
  borderRadius: "30px",
  boxShadow: "0 8px 28px rgba(0,0,0,0.045)",
};

const titleStyle = {
  fontSize: "42px",
  marginBottom: "30px",
  fontWeight: 700,
  letterSpacing: "-1.5px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #ddd",
  marginTop: "8px",
  fontSize: "15px",
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