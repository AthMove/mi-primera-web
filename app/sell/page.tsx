"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PADEL");
  const [condition, setCondition] = useState("Usada");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setImageFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión para vender");
      router.push("/auth?mode=login");
      return;
    }

    if (imageFiles.length < 3) {
      alert("Sube al menos 3 fotos reales del producto.");
      return;
    }

    try {
      setLoading(true);

      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        const fileExt = file.type.split("/")[1] || "jpg";
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          alert(`Error subiendo imagen: ${uploadError.message}`);
          return;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrls.push(data.publicUrl);
      }

      const { error } = await supabase.from("products").insert([
        {
          title,
          brand,
          price: Number(price),
          description,
          category,
          condition,
          image: imageUrls[0],
          images: imageUrls,
          seller_id: user.id,
        },
      ]);

      if (error) {
        alert(`Error guardando producto: ${error.message}`);
        return;
      }

      alert("Producto publicado correctamente");
      router.push("/products");
    } catch (error: any) {
      alert(error.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Vender producto</h1>

        <p style={subtitleStyle}>
          Sube entre 3 y 5 fotos reales. La primera será la portada del producto.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label>Marca</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ej: Bullpadel"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Modelo</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Vertex 03 2024"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Precio</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: 185"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              <option>PADEL</option>
              <option>TENNIS</option>
              <option>GOLF</option>
              <option>RUNNING</option>
              <option>ROPA</option>
            </select>
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
              placeholder="Describe el estado real del producto..."
              required
              style={textareaStyle}
            />
          </div>

          <div>
            <label>Fotos reales del producto</label>

            <label style={uploadButtonStyle}>
              Subir fotos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                style={{ display: "none" }}
              />
            </label>

            <p style={helpTextStyle}>
              Mínimo 3 fotos, máximo 5. La primera será la imagen principal.
            </p>

            {previews.length > 0 && (
              <div style={previewGridStyle}>
                {previews.map((preview, index) => (
                  <div key={index} style={previewBoxStyle}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={previewImageStyle}
                    />

                    {index === 0 && (
                      <span style={mainBadgeStyle}>Portada</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "PUBLICANDO..." : "Publicar producto"}
          </button>
        </form>
      </div>
    </main>
  );
}

const fontFamily =
  "'Manrope', 'Satoshi', 'Avenir Next', system-ui, sans-serif";

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
  fontSize: "40px",
  marginBottom: "10px",
  fontWeight: 650,
  letterSpacing: "-1.4px",
};

const subtitleStyle = {
  color: "#666",
  marginBottom: "34px",
  fontSize: "15px",
  lineHeight: 1.6,
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
  minHeight: "120px",
  resize: "none" as const,
};

const uploadButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#111",
  color: "#fff",
  padding: "14px 22px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "10px",
  width: "fit-content",
};

const helpTextStyle = {
  color: "#777",
  fontSize: "13px",
  marginTop: "8px",
};

const previewGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "10px",
  marginTop: "14px",
};

const previewBoxStyle = {
  position: "relative" as const,
  height: "90px",
  borderRadius: "14px",
  overflow: "hidden",
  background: "#f4f4f1",
};

const previewImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const mainBadgeStyle = {
  position: "absolute" as const,
  left: "6px",
  bottom: "6px",
  background: "#111",
  color: "#fff",
  fontSize: "10px",
  padding: "4px 7px",
  borderRadius: "999px",
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "16px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "14px",
};