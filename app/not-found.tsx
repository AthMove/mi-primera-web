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
          borderRadius: "28px",
          padding: "44px",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "3px",
            opacity: 0.5,
            marginBottom: "12px",
          }}
        >
          ATHMOV
        </p>

        <h1 style={{ fontSize: "54px", margin: "0 0 16px" }}>
          Page not found
        </h1>

        <p style={{ color: "#666", marginBottom: "28px" }}>
          The page you are looking for does not exist.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            background: "#111",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Go home
        </a>
      </div>
    </main>
  );
}