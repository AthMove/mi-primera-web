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

const categories = ["ALL", "PADEL", "GOLF", "TENNIS", "RUNNING"];

const brands = [
  "ALL",
  "NOX",
  "Bullpadel",
  "Siux",
  "Babolat",
  "Wilson",
  "Head",
  "Titleist",
  "TaylorMade",
  "Callaway",
  "PXG",
  "Scotty Cameron",
  "Ping",
  "Yonex",
  "Nike",
  "Hoka",
  "On",
  "ASICS",
  "New Balance",
  "Salomon",
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
          <p style={labelStyle}>DEPORTE</p>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="ALL">Todos</option>

            {categories
              .filter((category) => category !== "ALL")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p style={labelStyle}>MARCA</p>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={selectStyle}
          >
            <option value="ALL">Todas</option>

            {brands
              .filter((brand) => brand !== "ALL")
              .map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p style={labelStyle}>PRECIO MÍN.</p>

          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            type="number"
            style={inputStyle}
          />
        </div>

        <div>
          <p style={labelStyle}>PRECIO MÁX.</p>

          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="5000"
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
            onChange={(e) => setShowSold(e.target.checked)}
          />

          <span>Mostrar productos vendidos</span>
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