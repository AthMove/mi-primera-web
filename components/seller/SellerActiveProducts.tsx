"use client";

import Image from "next/image";

interface Product {
  id: string | number;
  title?: string;
  brand?: string;
  price?: number | string;
  image?: string;
  location?: string;
  condition?: string;
  featured?: boolean;
  sold?: boolean;
}

interface Props {
  products: Product[];
  favorites: string[];
  safeImage: (src?: string) => string;
  onProductClick: (productId: string | number) => void;
  onToggleFavorite: (product: Product) => void;
  eyebrow?: string;
  emptyText?: string;
}

export default function SellerActiveProducts({
  products,
  favorites,
  safeImage,
  onProductClick,
  onToggleFavorite,
  eyebrow = "INVENTARIO DEL VENDEDOR",
  emptyText = "Este vendedor todavía no tiene productos activos.",
}: Props) {
  const activeProducts = products.filter((product) => !product.sold);

  return (
    <section className="seller-active-section">
      <div className="section-header">
        <p>{eyebrow}</p>
        <h2>Productos activos</h2>
      </div>

      {activeProducts.length === 0 ? (
        <div className="empty-state">{emptyText}</div>
      ) : (
        <div className="products-grid">
          {activeProducts.map((product) => {
            const isFavorite = favorites.includes(String(product.id));

            return (
              <article
                key={product.id}
                className="product-card"
                onClick={() => onProductClick(product.id)}
              >
                <div className="image-wrapper">
                  <span className="product-badge">
                    {product.featured ? "⭐ DESTACADO" : "DISPONIBLE"}
                  </span>

                  <button
                    type="button"
                    className="favorite-button"
                    aria-label={
                      isFavorite
                        ? "Eliminar de favoritos"
                        : "Añadir a favoritos"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(product);
                    }}
                  >
                    {isFavorite ? "❤️" : "🤍"}
                  </button>

                  <Image
                    className="product-image"
                    src={safeImage(product.image)}
                    alt={product.title || "Producto ATHMOV"}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>

                <div className="card-content">
                  <p className="brand">{product.brand || "ATHMOV"}</p>

                  <h3>{product.title}</h3>

                  <p className="price">{product.price} €</p>

                  <div className="product-meta">
                    <span>{product.location || "España"}</span>
                    <span>•</span>
                    <span>{product.condition || "Excelente"}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .seller-active-section {
          max-width: 1280px;
          margin: 90px auto 0;
        }

        .section-header {
          margin-bottom: 26px;
        }

        .section-header p {
          margin: 0 0 8px;
          font-size: 11px;
          letter-spacing: 3px;
          opacity: 0.5;
        }

        .section-header h2 {
          margin: 0;
          font-size: 48px;
          letter-spacing: -2px;
        }

        .empty-state {
          padding: 30px;
          border-radius: 30px;
          background: #fff;
          color: #666;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 42px;
        }

        .product-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 32px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.92),
            rgba(250, 250, 248, 0.82)
          );
          box-shadow:
            0 35px 120px rgba(0, 0, 0, 0.08),
            0 8px 30px rgba(255, 255, 255, 0.6) inset;
          backdrop-filter: blur(18px);
          cursor: pointer;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .product-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            130deg,
            transparent 20%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 80%
          );
          pointer-events: none;
          transform: translateX(-130%);
          transition: transform 0.8s ease;
        }

        .product-card:hover {
          transform: perspective(1000px) rotateX(2deg) translateY(-12px);
          box-shadow: 0 45px 120px rgba(0, 0, 0, 0.16);
        }

        .product-card:hover::after {
          transform: translateX(130%);
        }

        .image-wrapper {
          position: relative;
          height: 560px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          background:
            radial-gradient(
              circle at top,
              rgba(255, 255, 255, 0.9),
              transparent 55%
            ),
            radial-gradient(
              circle at center,
              #fff 0%,
              #f7f7f3 55%,
              #ecece8 100%
            );
          box-shadow: inset 0 120px 180px rgba(255, 255, 255, 0.35);
        }

        .product-image {
          object-fit: contain;
          object-position: center bottom;
          transform: scale(1.24);
          filter: drop-shadow(0 35px 70px rgba(0, 0, 0, 0.18));
          transition:
            transform 0.6s ease,
            filter 0.6s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.34) translateY(-8px);
          filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.22));
        }

        .product-badge {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 10;
          padding: 9px 16px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .favorite-button {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          display: flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(16px);
          font-size: 20px;
          cursor: pointer;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .favorite-button:hover {
          transform: scale(1.08);
        }

        .favorite-button:active {
          transform: scale(0.86);
        }

        .card-content {
          padding: 34px;
        }

        .brand {
          margin: 0;
          color: #999;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .card-content h3 {
          margin: 10px 0 18px;
          font-size: 34px;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -1.8px;
        }

        .price {
          margin: 18px 0 0;
          color: #111;
          font-size: 56px;
          font-weight: 950;
          letter-spacing: -3px;
        }

        .product-meta {
          display: flex;
          gap: 10px;
          margin-top: 18px;
          color: #8a8a8a;
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 700px) {
          .seller-active-section {
            margin-top: 60px;
          }

          .section-header h2 {
            font-size: 38px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .image-wrapper {
            height: 430px;
          }

          .product-card:hover {
            transform: none;
          }

          .product-card::after {
            display: none;
          }

          .product-card:hover .product-image {
            transform: scale(1.24);
          }

          .favorite-button:hover {
            transform: none;
          }

          .card-content {
            padding: 26px;
          }

          .card-content h3 {
            font-size: 28px;
          }

          .price {
            font-size: 46px;
          }
        }
      `}</style>
    </section>
  );
}