export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f3ee",
        fontFamily: "Inter, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "54px",
          maxWidth: "560px",
          textAlign: "center",
          boxShadow: "0 30px 100px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "3px",
            opacity: 0.5,
            marginBottom: "14px",
          }}
        >
          ATHMOV
        </p>

        <h1
          style={{
            fontSize: "64px",
            letterSpacing: "-3px",
            margin: "0 0 18px",
            lineHeight: 1,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "34px",
            margin: "0 0 16px",
            letterSpacing: "-1px",
          }}
        >
          Página no encontrada
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: 1.7,
            marginBottom: "34px",
          }}
        >
          La página que buscas no existe o ha sido movida. Puedes volver al
          marketplace y seguir explorando material deportivo premium.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            padding: "16px 24px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}