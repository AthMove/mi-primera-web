import { supabase } from "@/lib/supabase";
import BuyButton from "./[slug]/BuyButton";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "60px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "40px",
            padding: "40px",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <p
            style={{
              letterSpacing: "4px",
              color: "#777",
              fontSize: "12px",
            }}
          >
            {product.brand}
          </p>

          <h1
            style={{
              fontSize: "72px",
              margin: "20px 0",
              fontWeight: "900",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
            {product.price} €
          </p>

          <p
            style={{
              fontSize: "28px",
              marginBottom: "40px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "24px",
              }}
            >
              <p style={{ color: "#888", fontSize: "12px" }}>SPORT</p>
              <h3>{product.sport}</h3>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "24px",
              }}
            >
              <p style={{ color: "#888", fontSize: "12px" }}>CONDITION</p>
              <h3>{product.condition}</h3>
            </div>
          </div>

          <BuyButton product={product} />
        </div>
      </div>
    </div>
  );
}