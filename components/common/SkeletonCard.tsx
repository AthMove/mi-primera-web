"use client";

type Props = {
  isMobile?: boolean;
};

export default function SkeletonCard({
  isMobile = false,
}: Props) {
  return (
    <article
      style={{
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(22px)",
        borderRadius: "36px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.55)",
        boxShadow: "0 35px 120px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          height: isMobile ? "260px" : "420px",
          background:
            "linear-gradient(90deg,#efefef 25%,#f8f8f8 50%,#efefef 75%)",
          backgroundSize: "400% 100%",
          animation: "skeleton-loading 1.4s infinite",
        }}
      />

      <div style={{ padding: "28px" }}>
        <div
          style={{
            width: "90px",
            height: "12px",
            borderRadius: "999px",
            marginBottom: "18px",
            background:
              "linear-gradient(90deg,#efefef 25%,#f8f8f8 50%,#efefef 75%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s infinite",
          }}
        />

        <div
          style={{
            width: "75%",
            height: "26px",
            borderRadius: "8px",
            marginBottom: "20px",
            background:
              "linear-gradient(90deg,#efefef 25%,#f8f8f8 50%,#efefef 75%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s infinite",
          }}
        />

        <div
          style={{
            width: "110px",
            height: "34px",
            borderRadius: "8px",
            background:
              "linear-gradient(90deg,#efefef 25%,#f8f8f8 50%,#efefef 75%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes skeleton-loading{
          0%{
            background-position:100% 0;
          }
          100%{
            background-position:-100% 0;
          }
        }
      `}</style>
    </article>
  );
}