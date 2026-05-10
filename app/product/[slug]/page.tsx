import { supabase } from "@/lib/supabase";
import BuyButton from "./BuyButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", slug)
    .single();

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "32px",
            padding: "24px",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          />
        </div>

        <div>
          <p
            style={{
              letterSpacing: "4px",
              color: "#777",
              fontSize: "12px",
              marginBottom: "12px",
            }}
          >
            {product.brand}
          </p>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              margin: "0 0 20px",
              fontWeight: "900",
              lineHeight: "1",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: "700",
              margin: "0 0 28px",
            }}
          >
            {product.price} €
          </p>

          <p
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              marginBottom: "28px",
              lineHeight: "1.4",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div style={boxStyle}>
              <p style={labelStyle}>SPORT</p>
              <h3>{product.category}</h3>
            </div>

            <div style={boxStyle}>
              <p style={labelStyle}>CONDITION</p>
              <h3>{product.condition}</h3>
            </div>
          </div>

          <BuyButton product={product} />
        </div>
      </div>
    </main>
  );
}

const boxStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "24px",
};

const labelStyle = {
  color: "#888",
  fontSize: "12px",
  letterSpacing: "2px",
};