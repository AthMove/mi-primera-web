"use client";

interface Props {
  createdAt: string;
  views?: number;
  favorites?: number;
  location?: string;
}

export default function ProductTimeline({
  createdAt,
  views,
  favorites,
  location,
}: Props) {
  return (
    <div style={timelineStyle}>
      <h3 style={timelineTitleStyle}>Historial del producto</h3>

      <TimelineItem
        icon="📅"
        title="Publicado"
        value={new Date(createdAt).toLocaleDateString("es-ES")}
      />

      <TimelineItem
        icon="👁"
        title="Visualizaciones"
        value={String(views || 0)}
      />

      <TimelineItem
        icon="❤"
        title="Favoritos"
        value={String(favorites || 0)}
      />

      <TimelineItem
        icon="📍"
        title="Ubicación"
        value={location || "España"}
      />

      <TimelineItem
        icon="🚚"
        title="Entrega estimada"
        value="24-72 horas"
      />

      <TimelineItem
        icon="🛡"
        title="Estado"
        value="Verificado por ATHMOV"
      />
    </div>
  );
}

function TimelineItem({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div style={timelineItemStyle}>
      <span>{icon}</span>

      <div>
        <strong>{title}</strong>
        <p>{value}</p>
      </div>
    </div>
  );
}

const timelineStyle = {
  maxWidth: "560px",
  background: "#fff",
  borderRadius: "28px",
  padding: "30px",
  marginTop: "34px",
  marginBottom: "34px",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 20px 60px rgba(0,0,0,.06)",
};

const timelineTitleStyle = {
  fontSize: "24px",
  fontWeight: 900,
  marginBottom: "26px",
};

const timelineItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "18px",
  padding: "16px 0",
  borderBottom: "1px solid rgba(0,0,0,.06)",
};