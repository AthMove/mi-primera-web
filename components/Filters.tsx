"use client";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  selectedBrand: string;
  setSelectedBrand: (value: string) => void;

  minPrice: string;
  setMinPrice: (value: string) => void;

  maxPrice: string;
  setMaxPrice: (value: string) => void;

  showSold: boolean;
  setShowSold: (value: boolean) => void;
};

const categories = [
  "ALL",
  "PADEL",
  "GOLF",
  "TENNIS",
  "CYCLING",
  "RUNNING",
];

const brands = [
  "ALL",
  "Nike",
  "Adidas",
  "Wilson",
  "Babolat",
  "Head",
  "Yonex",
  "Bullpadel",
];

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  showSold,
  setShowSold,
}: Props) {
  return (
    <section style={wrapperStyle}>
      <div style={filtersGridStyle}>
        <div>
          <p style={labelStyle}>CATEGORY</p>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
          >
            {categories.map((category) => (
              <option key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p style={labelStyle}>BRAND</p>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={selectStyle}
          >
            {brands.map((brand) => (
              <option key={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p style={labelStyle}>MIN PRICE</p>

          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            type="number"
            style={inputStyle}
          />
        </div>

        <div>
          <p style={labelStyle}>MAX PRICE</p>

          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000"
            type="number"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={bottomStyle}>
        <label style={checkboxWrapperStyle}>
          <input
            type="checkbox"
            checked={showSold}
            onChange={(e) =>
              setShowSold(e.target.checked)
            }
          />

          <span>Show sold items</span>
        </label>
      </div>
    </section>
  );
}

const wrapperStyle = {
  background: "#fff",
  borderRadius: "32px",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.04)",
};

const filtersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "18px",
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "10px",
};

const selectStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "18px",
  padding: "14px",
  background: "#f8f8f4",
  outline: "none",
};

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "18px",
  padding: "14px",
  background: "#f8f8f4",
  outline: "none",
};

const bottomStyle = {
  marginTop: "22px",
};

const checkboxWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
};