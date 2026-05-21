"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div style={wrapperStyle}>
      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search products, brands, categories..."
        style={inputStyle}
      />
    </div>
  );
}

const wrapperStyle = {
  width: "100%",
};

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "18px 24px",
  fontSize: "15px",
  outline: "none",
  boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
};