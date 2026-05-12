"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  condition: string;
};

export default function AccountPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth?mode=login");
      return;
    }

    setEmail(user.email || "");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

    setLoading(false);
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar este producto?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      alert(error.message);
      return;
    }

    setProducts((current) =>
      current.filter((product) => product.id !== productId)
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <main style={loadingStyle}>Cargando cuenta...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>Mi cuenta</p>
          <h1 style={titleStyle}>Mis productos</h1>
          <p style={emailStyle}>{email}</p>
        </div>

        <div style={actionsStyle}>
          <Link href="/sell" style={sellButtonStyle}>
            Vender producto
          </Link>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Cerrar sesión
          </button>
        </div>
      </section>

      {products.length === 0 ? (
        <section style={emptyStyle}>
          <h2 style={emptyTitleStyle}>Aún no has publicado productos</h2>

          <p style={emptyTextStyle}>
            Publica tu primer producto para verlo aquí.
          </p>

          <Link href="/sell" style={sellButtonStyle}>
            Publicar producto
          </Link>
        </section>
      ) : (
        <section style={gridStyle}>
          {products.map((product) => (
            <article key={product.id} style={cardStyle}>
              <Link
                href={`/products/${product.id}`}
                style={imageLinkStyle}
              >
                <div style={imageBoxStyle}>
                  <img
                    src={
                      product.image ||
                      "https://placehold.co/700x700?text=ATHMOV"
                    }
                    alt={product.title}
                    style={imageStyle}
                  />
                </div>
              </Link>

              <div style={contentStyle}>
                <p style={brandStyle}>{product.brand}</p>

                <h2 style={productTitleStyle}>
                  {product.title}
                </h2>

                <div style={rowStyle}>
                  <p style={priceStyle}>
                    €{product.price}
                  </p>

                  <span style={conditionStyle}>
                    {product.condition}
                  </span>
                </div>

                <div style={buttonsRowStyle}>
                  <Link
                    href={`/account/edit/${product.id}`}
                    style={editButtonStyle}
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    style={deleteButtonStyle}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
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
  padding: "46px",
  fontFamily,
};

const headerStyle = {
  maxWidth: "1180px",
  margin: "0 auto 44px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "24px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "56px",
  lineHeight: 1,
  margin: 0,
  letterSpacing: "-2px",
};

const emailStyle = {
  color: "#666",
  marginTop: "12px",
};

const actionsStyle = {
  display: "flex",
  gap: "12px",
};

const sellButtonStyle = {
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
  border: "none",
  cursor: "pointer",
};

const logoutButtonStyle = {
  background: "#fff",
  color: "#111",
  border: "1px solid #ddd",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};

const emptyStyle = {
  maxWidth: "720px",
  margin: "80px auto 0",
  background: "#fff",
  padding: "48px",
  borderRadius: "32px",
  textAlign: "center" as const,
};

const emptyTitleStyle = {
  fontSize: "32px",
  marginBottom: "12px",
};

const emptyTextStyle = {
  color: "#666",
  marginBottom: "28px",
};

const gridStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
};

const imageLinkStyle = {
  display: "block",
};

const imageBoxStyle = {
  height: "280px",
  background: "#efefea",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "90%",
  height: "90%",
  objectFit: "contain" as const,
};

const contentStyle = {
  padding: "24px",
};

const brandStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#777",
  marginBottom: "10px",
};

const productTitleStyle = {
  fontSize: "26px",
  lineHeight: 1,
  marginBottom: "18px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const priceStyle = {
  fontSize: "22px",
  fontWeight: 700,
};

const conditionStyle = {
  background: "#efefef",
  padding: "8px 13px",
  borderRadius: "999px",
  fontSize: "12px",
  color: "#555",
};

const buttonsRowStyle = {
  display: "flex",
  gap: "10px",
};

const editButtonStyle = {
  flex: 1,
  textAlign: "center" as const,
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "13px",
  fontWeight: 700,
  fontSize: "13px",
};

const deleteButtonStyle = {
  flex: 1,
  background: "#fff",
  color: "#c0392b",
  border: "1px solid #f0c7c1",
  borderRadius: "999px",
  padding: "13px",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
};