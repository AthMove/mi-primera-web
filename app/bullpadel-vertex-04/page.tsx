import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bullpadel Vertex 04 de segunda mano | ATHMOV",

  description:
    "Compra y vende la Bullpadel Vertex 04 de segunda mano. Descubre qué revisar antes de comprar, precios orientativos y productos disponibles en ATHMOV.",

  alternates: {
    canonical: "https://athmov.com/bullpadel-vertex-04",
  },
};

export default function BullpadelVertex04Page() {
  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "150px 24px 80px",
      }}
    >
      <p
        style={{
          color: "#999",
          letterSpacing: 3,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        ATHMOV · PÁDEL
      </p>

      <h1
        style={{
          fontSize: 70,
          lineHeight: 1,
          letterSpacing: "-3px",
          marginBottom: 24,
        }}
      >
        Bullpadel Vertex 04
        <br />
        de segunda mano
      </h1>

      <p
        style={{
          maxWidth: 760,
          fontSize: 19,
          color: "#666",
          lineHeight: 1.8,
        }}
      >
        Todo lo que debes revisar antes de comprar una Bullpadel Vertex 04 de
        segunda mano. Aprende a detectar falsificaciones, valorar su estado y
        encontrar las mejores oportunidades.
      </p>
    </main>
  );
}