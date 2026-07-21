"use client";

export default function ProductFeatureGrid() {
  const features = [
    {
      icon: "📦",
      label: "En stock",
    },
    {
      icon: "🚚",
      label: "24-72 h",
    },
    {
      icon: "🛡",
      label: "Protegido",
    },
    {
      icon: "💳",
      label: "Stripe",
    },
  ];

  return (
    <div className="product-feature-grid" style={gridStyle}>
      {features.map((feature) => (
        <div key={feature.label} style={cardStyle}>
          <div style={iconStyle}>{feature.icon}</div>
          <strong>{feature.label}</strong>
        </div>
      ))}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "14px",
  margin: "28px 0",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "20px",
  padding: "18px",
  textAlign: "center" as const,
  border: "1px solid rgba(0,0,0,.06)",
};

const iconStyle = {
  fontSize: "26px",
};