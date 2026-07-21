"use client";

interface Review {
  id?: string;
  rating?: number | string;
  created_at?: string;
}

interface Seller {
  created_at?: string;
  seller_verified?: boolean;
}

interface SellerTimelineProps {
  seller: Seller | null;
  soldCount: number;
  reviews: Review[];
}

export default function SellerTimeline({
  seller,
  soldCount,
  reviews,
}: SellerTimelineProps) {
  const latestReview = reviews[0];

  const memberYear = seller?.created_at
    ? new Date(seller.created_at).getFullYear()
    : "2025";

  const latestReviewDate = latestReview?.created_at
    ? new Date(latestReview.created_at).toLocaleDateString("es-ES")
    : "";

  return (
    <section className="seller-timeline">
      <div className="timeline-heading">
        <p>SELLER HISTORY</p>
        <h2>Historial del vendedor</h2>
      </div>

      <div className="timeline">
        <article className="timeline-item">
          <div className="timeline-dot">✓</div>

          <div className="timeline-content">
            <strong>Se unió a ATHMOV</strong>
            <p>Miembro desde {memberYear}</p>
          </div>
        </article>

        {seller?.seller_verified && (
          <article className="timeline-item">
            <div className="timeline-dot">✓</div>

            <div className="timeline-content">
              <strong>Perfil verificado</strong>
              <p>Identidad comprobada por ATHMOV</p>
            </div>
          </article>
        )}

        {soldCount > 0 && (
          <article className="timeline-item">
            <div className="timeline-dot">📦</div>

            <div className="timeline-content">
              <strong>
                {soldCount} {soldCount === 1 ? "venta completada" : "ventas completadas"}
              </strong>

              <p>Productos vendidos a través de ATHMOV</p>
            </div>
          </article>
        )}

        {latestReview && (
          <article className="timeline-item">
            <div className="timeline-dot">★</div>

            <div className="timeline-content">
              <strong>
                Última valoración: {Number(latestReview.rating || 0)}/5
              </strong>

              <p>
                {latestReviewDate
                  ? `Publicada el ${latestReviewDate}`
                  : "Valoración verificada"}
              </p>
            </div>
          </article>
        )}
      </div>

      <style jsx>{`
        .seller-timeline {
          max-width: 1280px;
          margin: 70px auto;
        }

        .timeline-heading p {
          margin: 0 0 8px;
          color: #888;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .timeline-heading h2 {
          margin: 0 0 40px;
          color: #111;
          font-size: 42px;
          line-height: 1;
          letter-spacing: -2px;
        }

        .timeline {
          display: grid;
          gap: 34px;
          margin-left: 18px;
          padding-left: 34px;
          border-left: 2px solid #e5e5e1;
        }

        .timeline-item {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .timeline-dot {
          position: absolute;
          left: -52px;
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
        }

        .timeline-content {
          padding: 2px 0 4px;
        }

        .timeline-content strong {
          color: #111;
          font-size: 17px;
        }

        .timeline-content p {
          margin: 7px 0 0;
          color: #777;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 700px) {
          .seller-timeline {
            margin: 55px auto;
          }

          .timeline-heading h2 {
            margin-bottom: 32px;
            font-size: 34px;
            letter-spacing: -1.5px;
          }

          .timeline {
            margin-left: 14px;
            padding-left: 28px;
          }

          .timeline-dot {
            left: -45px;
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}