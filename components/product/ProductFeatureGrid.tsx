"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ProductFeatureGrid() {
  const { t } = useLanguage();

  const features = [
    {
      icon: "📦",
      label: t.featureInStock,
    },
    {
      icon: "🚚",
      label: t.featureDeliveryTime,
    },
    {
      icon: "🛡",
      label: t.featureProtected,
    },
    {
      icon: "💳",
      label: t.featureStripe,
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