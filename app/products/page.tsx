import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <main style={{ padding: "40px" }}>Error cargando productos</main>;
  }

  const visibleProducts = products?.filter((product) => product.title !== "EMPTY");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "32px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          marginBottom: "32px",
        }}
      >
        Productos disponibles
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {visibleProducts?.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "28px",
                padding: "20px",
                border: "1px solid #eee",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "contain",
                  borderRadius: "20px",
                  background: "#fafafa",
                }}
              />

              <h2
                style={{
                  fontSize: "24px",
                  marginTop: "20px",
                  marginBottom: "8px",
                }}
              >
                {product.title}
              </h2>

              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: "0 0 8px",
                }}
              >
                {product.price} €
              </p>

              <p
                style={{
                  color: "#666",
                  margin: 0,
                }}
              >
                {product.brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}