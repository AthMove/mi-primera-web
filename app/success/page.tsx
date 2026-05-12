import Link from "next/link";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f5",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "620px",
          background: "#ffffff",
          borderRadius: "32px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "999px",
            background: "#8d9134",
            margin: "0 auto 30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            fontSize: "42px",
            fontWeight: 900,
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
            color: "#111111",
          }}
        >
          Pago completado
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#666666",
            marginBottom: "40px",
          }}
        >
          Tu compra se ha realizado correctamente.
          <br />
          Gracias por confiar en ATHMOV.
        </p>

        <Link href="/">
          <button
            style={{
              background: "#111111",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "16px 34px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Volver al inicio
          </button>
        </Link>
      </div>
    </main>
  );
}