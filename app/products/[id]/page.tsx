"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FavoriteButton from "@/app/components/FavoriteButton";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  condition: string;
  seller_id?: string;
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error cargando producto:", error);
    }

    if (data) {
      setProduct(data);

      const firstImage =
        data.images?.[0] ||
        data.image ||
        "https://placehold.co/900x900?text=ATHMOV";

      setSelectedImage(firstImage);
    }

    setLoading(false);
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando producto...</main>;
  }

  if (!product) {
    return <main style={loadingStyle}>Producto no encontrado</main>;
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <section>
          <div style={imageSectionStyle}>
            <img
              src={
                selectedImage ||
                product.image ||
                "https://placehold.co/900x900?text=ATHMOV"
              }
              alt={product.title}
              style={imageStyle}
            />
          </div>

          <div style={thumbsStyle}>
            {productImages.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(img)}
                style={{
                  ...thumbButtonStyle,
                  border:
                    selectedImage === img
                      ? "2px solid #111"
                      : "1px solid #ddd",
                }}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  style={thumbImageStyle}
                />
              </button>
            ))}
          </div>
        </section>

        <section style={infoStyle}>
          <p style={brandStyle}>{product.brand}</p>
          <h1 style={titleStyle}>{product.title}</h1>
          <p style={priceStyle}>€{product.price}</p>
          <FavoriteButton productId={product.id} />
          <span style={conditionStyle}>{product.condition}</span>
          <p style={descriptionStyle}>{product.description}</p>

          {product.seller_id && (
  <>
    <Link
      href={`/seller/${product.seller_id}`}
      style={sellerBoxStyle}
    >
      <span style={sellerLabelStyle}>Vendedor</span>
      <strong style={sellerNameStyle}>Ver perfil del vendedor</strong>
      <span style={sellerArrowStyle}>→</span>
    </Link>

    <button
      onClick={async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          alert("Inicia sesión para contactar con el vendedor");
          return;
        }

        if (user.id === product.seller_id) {
          alert("No puedes enviarte un mensaje a ti mismo");
          return;
        }

        const { error } = await supabase.from("messages").insert({
          sender_id: user.id,
          receiver_id: product.seller_id,
          product_id: product.id,
          content: `Hola, me interesa tu producto: ${product.brand} ${product.title}`,
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert("Mensaje enviado al vendedor");
        window.location.href = "/messages";
      }}
      style={contactButtonStyle}
    >
      Contactar vendedor
    </button>
  </>
)}

          <div style={buttonsWrapperStyle}>
  <button
    onClick={() => {
      const existingCart = localStorage.getItem("athmov_cart");

      const cart = existingCart
        ? JSON.parse(existingCart)
        : [];

      const alreadyExists = cart.find(
        (item: any) => item.id === product.id
      );

      if (!alreadyExists) {
        cart.push({
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          image: product.image,
        });

        localStorage.setItem(
          "athmov_cart",
          JSON.stringify(cart)
        );
      }

      alert("Producto añadido al carrito");
    }}
    style={secondaryButtonStyle}
  >
    Añadir al carrito
  </button>

  <a
    href={`/api/checkout?productId=${product.id}`}
    style={buttonStyle}
  >
    Comprar ahora
  </a>
</div>
        </section>
      </div>
    </main>
  );
}

const fontFamily = "'Manrope', 'Satoshi', 'Avenir Next', sans-serif";

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily,
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f6f3",
  padding: "40px",
  fontFamily,
};

const containerStyle = {
  maxWidth: "1080px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "480px 1fr",
  gap: "54px",
  alignItems: "center",
};

const imageSectionStyle = {
  background: "#efefea",
  borderRadius: "28px",
  height: "520px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "90%",
  height: "90%",
  objectFit: "contain" as const,
  display: "block",
};

const thumbsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "10px",
  marginTop: "14px",
};

const thumbButtonStyle = {
  height: "78px",
  borderRadius: "14px",
  overflow: "hidden",
  background: "#efefea",
  padding: 0,
  cursor: "pointer",
};

const thumbImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block",
};

const infoStyle = {
  maxWidth: "420px",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#666",
  marginBottom: "14px",
  fontWeight: 600,
};

const titleStyle = {
  fontSize: "42px",
  lineHeight: 1,
  marginBottom: "22px",
  fontWeight: 700,
  color: "#111",
};

const priceStyle = {
  fontSize: "28px",
  marginBottom: "22px",
  fontWeight: 600,
  color: "#111",
};

const conditionStyle = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "#e7e7e2",
  color: "#666",
  fontSize: "12px",
  fontWeight: 700,
  marginBottom: "28px",
};

const descriptionStyle = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#444",
  marginBottom: "24px",
};

const sellerBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
  border: "1px solid #e5e5df",
  borderRadius: "22px",
  padding: "16px 18px",
  marginBottom: "24px",
};

const sellerLabelStyle = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1.5px",
  color: "#777",
};

const sellerNameStyle = {
  flex: 1,
  fontSize: "14px",
};

const sellerArrowStyle = {
  fontSize: "18px",
};

const buttonStyle = {
  width: "100%",
  display: "block",
  textAlign: "center" as const,
  textDecoration: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
};
const buttonsWrapperStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const secondaryButtonStyle = {
  width: "100%",
  background: "#fff",
  color: "#111",
  border: "1px solid #ddd",
  borderRadius: "999px",
  padding: "18px",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
};
const contactButtonStyle = {
  width: "100%",
  background: "#fff",
  color: "#111",
  border: "1px solid #ddd",
  borderRadius: "999px",
  padding: "16px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: "24px",
};