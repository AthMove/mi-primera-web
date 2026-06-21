"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PREMIUM_BRANDS: Record<string, string[]> = {
  PADEL: ["NOX", "Bullpadel", "Siux", "Babolat", "Wilson", "Head"],
  GOLF: ["Titleist", "TaylorMade", "Callaway", "PXG", "Scotty Cameron", "Ping"],
  TENNIS: ["Nike", "Wilson", "Yonex", "Lacoste", "Babolat", "Head"],
  RUNNING: ["Nike", "Hoka", "On", "ASICS", "New Balance", "Salomon"],
};

const SPORTS = ["PADEL", "GOLF", "TENNIS", "RUNNING"];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("PADEL");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const availableBrands = useMemo(() => {
    return PREMIUM_BRANDS[category] || [];
  }, [category]);

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
    setCategory(data.category || data.sport || "PADEL");
    setPrice(String(data.price || ""));
    setCondition(data.condition || "");
    setDescription(data.description || "");

    const images =
      data.images && Array.isArray(data.images)
        ? data.images
        : data.image
          ? [data.image]
          : [];

    setCurrentImages(images);
    setLoading(false);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setBrand(PREMIUM_BRANDS[value]?.[0] || "");
  };

  const handleNewImages = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...fileArray]);
    setNewPreviews((prev) => [
      ...prev,
      ...fileArray.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeCurrentImage = (image: string) => {
    setCurrentImages((prev) => prev.filter((item) => item !== image));
  };

  const removeNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !brand.trim() || !price.trim() || !description.trim()) {
      alert("Completa todos los campos");
      return;
    }

    const numericPrice = Number(price);

    if (!numericPrice || numericPrice <= 0) {
      alert("Introduce un precio válido");
      return;
    }

    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const uploadedImages: string[] = [];

      for (const file of newFiles) {
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${user.id}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        uploadedImages.push(data.publicUrl);
      }

      const finalImages = [...currentImages, ...uploadedImages];
      const mainImage = finalImages[0] || "/logo.png";

      const { error } = await supabase
        .from("products")
        .update({
          title: title.trim(),
          brand,
          category,
          sport: category,
          price: numericPrice,
          condition,
          description: description.trim(),
          image: mainImage,
          images: finalImages,
        })
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Producto actualizado correctamente");
      router.push("/account");
    } finally {
      setSaving(false);
    }
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  if (loading) {
    return <main style={pageStyle}>Cargando...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>VENDEDOR ATHMOV</p>
        <h1 style={titleStyle}>Editar producto</h1>

        <form onSubmit={saveProduct} style={formStyle}>
          <div style={imagesGridStyle}>
            {currentImages.map((image) => (
              <div key={image} style={imageBoxStyle}>
                <Image
                  src={safeImage(image)}
                  alt="Imagen del producto"
                  fill
                  style={{ objectFit: "cover" }}
                />

                <button
                  type="button"
                  onClick={() => removeCurrentImage(image)}
                  style={removeImageButtonStyle}
                >
                  ✕
                </button>
              </div>
            ))}

            {newPreviews.map((preview, index) => (
              <div key={preview} style={imageBoxStyle}>
                <Image
                  src={preview}
                  alt="Nueva imagen"
                  fill
                  style={{ objectFit: "cover" }}
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  style={removeImageButtonStyle}
                >
                  ✕
                </button>
              </div>
            ))}

            <label style={uploadBoxStyle}>
              ＋
              <span>Añadir fotos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleNewImages(e.target.files)}
                style={{ display: "none" }}
              />
            </label>
          </div>

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

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            style={inputStyle}
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            type="number"
            style={inputStyle}
          />

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={inputStyle}
          >
            <option value="">Estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Usado">Usado</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            style={textareaStyle}
          />

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </section>

      <style>{`
        @media (max-width: 800px) {
          main {
            padding: 120px 18px 40px !important;
          }

          section {
            padding: 28px !important;
            border-radius: 28px !important;
          }

          h1 {
            font-size: 42px !important;
            letter-spacing: -2px !important;
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

const cardStyle = {
  maxWidth: "720px",
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

const imagesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "14px",
  marginBottom: "10px",
};

const imageBoxStyle = {
  position: "relative" as const,
  height: "150px",
  borderRadius: "22px",
  overflow: "hidden",
  background: "#f4f4f1",
};

const uploadBoxStyle = {
  height: "150px",
  borderRadius: "22px",
  border: "2px dashed rgba(0,0,0,0.14)",
  background: "#fafaf8",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontWeight: 900,
  cursor: "pointer",
  color: "#111",
};

const removeImageButtonStyle = {
  position: "absolute" as const,
  top: "10px",
  right: "10px",
  width: "32px",
  height: "32px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "999px",
  padding: "17px 20px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
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