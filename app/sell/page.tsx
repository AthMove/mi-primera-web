"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("Como nuevo");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!imageFile) {
      alert("Selecciona una imagen");
      return;
    }

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert("Error subiendo imagen");
      return;
    }

    const { data: imageData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const imageUrl = imageData.publicUrl;

    const { error } = await supabase.from("products").insert([
      {
        title,
        description,
        price,
        image: imageUrl,
        category,
        brand,
        condition,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Producto publicado 🚀");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setCondition("Como nuevo");
      setImageFile(null);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 800,
            marginBottom: "40px",
          }}
        >
          Subir producto
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              ...inputStyle,
              minHeight: "140px",
            }}
          />

          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            placeholder="Deporte"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            placeholder="Marca"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            style={inputStyle}
          />

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={inputStyle}
          >
            <option>Como nuevo</option>
            <option>Excelente estado</option>
            <option>Buen estado</option>
            <option>Usado</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => setImageFile(e.target.files[0])}
            required
          />

          <button
            type="submit"
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              padding: "22px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Publicar producto
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  fontSize: "16px",
};