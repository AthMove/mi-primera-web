"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      style={selectStyle}
    >
      <option value="newest">
        Newest
      </option>

      <option value="price-low">
        Price: Low to High
      </option>

      <option value="price-high">
        Price: High to Low
      </option>

      <option value="popular">
        Most Popular
      </option>
    </select>
  );
}

const selectStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "14px 18px",
  background: "#fff",
  outline: "none",
  fontWeight: 700,
};