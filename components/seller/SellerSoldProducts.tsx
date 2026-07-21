"use client";

import Image from "next/image";

interface Product {
  id: string | number;
  title?: string;
  brand?: string;
  price?: number | string;
  image?: string;
  sold?: boolean;
}

interface Props {
  products: Product[];
  safeImage: (src?: string) => string;
  onProductClick: (productId: string | number) => void;
}

export default function SellerSoldProducts({
  products,
  safeImage,
  onProductClick,
}: Props) {
  const soldProducts = products.filter((product) => product.sold);

  return (
    <section className="seller-sold-section">
      <div className="section-header">
        <p>HISTORIAL DEL VENDEDOR</p>
        <h2>Productos vendidos</h2>
      </div>

      {soldProducts.length === 0 ? (
        <div className="empty-state">
          Este vendedor todavía no tiene productos vendidos.
        </div>
      ) : (
        <div className="sold-products-grid">
          {soldProducts.slice(0, 6).map((product) => (
            <article
              key={product.id}
              className="sold-product-card"
              onClick={() => onProductClick(product.id)}
            >
              <div className="sold-product-image">
                <Image
                  src={safeImage(product.image)}
                  alt={product.title || "Producto vendido"}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />

                <span className="sold-product-badge">VENDIDO</span>
              </div>

              <div className="sold-product-content">
                <p className="sold-product-brand">
                  {product.brand || "ATHMOV"}
                </p>

                <h3>{product.title}</h3>

                <div className="sold-product-footer">
                  <span>{product.price} €</span>
                  <span>Venta completada</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        .seller-sold-section {
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

        .sold-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 22px;
        }

        .sold-product-card {
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.76);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .sold-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.1);
        }

        .sold-product-image {
          position: relative;
          height: 250px;
          overflow: hidden;
          background: radial-gradient(
            circle at center,
            #fff 0%,
            #f4f4f0 65%,
            #e9e9e4 100%
          );
        }

        .sold-product-image :global(img) {
          object-fit: contain;
          padding: 22px;
          opacity: 0.72;
        }

        .sold-product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          padding: 8px 13px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.2px;
        }

        .sold-product-content {
          padding: 22px;
        }

        .sold-product-brand {
          margin: 0;
          color: #999;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .sold-product-content h3 {
          margin: 8px 0 18px;
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.7px;
        }

        .sold-product-footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #777;
          font-size: 12px;
        }

        @media (max-width: 700px) {
          .seller-sold-section {
            margin-top: 60px;
          }

          .section-header h2 {
            font-size: 38px;
          }

          .sold-products-grid {
            grid-template-columns: 1fr;
          }

          .sold-product-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}