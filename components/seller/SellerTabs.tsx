"use client";

interface Props {
  activeTab: "active" | "sold" | "reviews";
  activeCount: number;
  soldCount: number;
  totalReviews: number;
  onChange: (tab: "active" | "sold" | "reviews") => void;
}

export default function SellerTabs({
  activeTab,
  activeCount,
  soldCount,
  totalReviews,
  onChange,
}: Props) {
  return (
    <div className="seller-tabs">
      <button
        onClick={() => onChange("active")}
        className={activeTab === "active" ? "tab active" : "tab"}
      >
        Activos ({activeCount})
      </button>

      <button
        onClick={() => onChange("sold")}
        className={activeTab === "sold" ? "tab active" : "tab"}
      >
        Vendidos ({soldCount})
      </button>

      <button
        onClick={() => onChange("reviews")}
        className={activeTab === "reviews" ? "tab active" : "tab"}
      >
        Valoraciones ({totalReviews})
      </button>

      <style jsx>{`
        .seller-tabs {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tab {
          padding: 14px 24px;
          border: none;
          border-radius: 999px;
          background: rgba(255,255,255,.8);
          color: #666;
          font-weight: 800;
          cursor: pointer;
          transition: .25s;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
        }

        .tab:hover {
          transform: translateY(-2px);
        }

        .active {
          background: #111;
          color: white;
          box-shadow: 0 20px 50px rgba(0,0,0,.2);
        }

        @media(max-width:700px){

          .tab{
            flex:1;
            min-width:100px;
            padding:12px 10px;
            font-size:12px;
          }

          .tab:hover{
            transform:none;
          }

        }

      `}</style>
    </div>
  );
}