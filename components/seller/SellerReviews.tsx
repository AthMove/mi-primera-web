"use client";

interface Review {
  id: string;
  rating?: number;
  comment?: string;
  created_at?: string;
}

interface Props {
  reviews: Review[];
  noComment: string;
  noReviewsText: string;
  eyebrow: string;
}

export default function SellerReviews({
  reviews,
  noComment,
  noReviewsText,
  eyebrow,
}: Props) {
  return (
    <section className="seller-reviews">
      <div className="section-header">
        <p>{eyebrow}</p>
        <h2>Valoraciones</h2>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          {noReviewsText}
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="review-card"
            >
              <p className="stars">
                {"★".repeat(Number(review.rating || 0))}
                {"☆".repeat(5 - Number(review.rating || 0))}
              </p>

              <p className="comment">
                {review.comment || noComment}
              </p>

              <p className="date">
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : ""}
              </p>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        .seller-reviews{
          max-width:1280px;
          margin:90px auto 0;
        }

        .section-header{
          margin-bottom:26px;
        }

        .section-header p{
          margin:0 0 8px;
          font-size:11px;
          letter-spacing:3px;
          opacity:.5;
        }

        .section-header h2{
          margin:0;
          font-size:48px;
          letter-spacing:-2px;
        }

        .empty-state{
          padding:30px;
          background:#fff;
          border-radius:30px;
          color:#666;
        }

        .reviews-grid{
          display:grid;
          gap:18px;
        }

        .review-card{
          padding:30px;
          border-radius:30px;
          background:#fff;
          border:1px solid rgba(0,0,0,.06);
          box-shadow:0 16px 60px rgba(0,0,0,.05);
          transition:.35s;
        }

        .review-card:hover{
          transform:translateY(-8px);
          box-shadow:0 28px 80px rgba(0,0,0,.10);
        }

        .stars{
          margin:0 0 12px;
          font-size:20px;
        }

        .comment{
          line-height:1.8;
          color:#555;
        }

        .date{
          margin-top:14px;
          font-size:12px;
          color:#999;
        }

        @media(max-width:700px){

          .seller-reviews{
            margin-top:60px;
          }

          .section-header h2{
            font-size:38px;
          }

          .review-card:hover{
            transform:none;
          }

        }

      `}</style>
    </section>
  );
}