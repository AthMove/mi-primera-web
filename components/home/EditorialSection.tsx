"use client";

export default function EditorialSection({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <>
      <section
        className={`editorial-section ${
          isMobile ? "mobile" : ""
        } fade-up`}
      >
        <div className="editorial-left">
          <p className="eyebrow">ATHMOV EDITORIAL</p>

          <h2>
            El mejor material deportivo no debería terminar en un
            armario.
          </h2>

          <p className="description">
            En ATHMOV creemos que una pala, un driver o unas zapatillas
            premium todavía tienen muchas victorias por delante.
            Conectamos deportistas que cuidan su material con otros que
            buscan calidad sin pagar el precio de un producto nuevo.
          </p>

          <button>
            Descubrir ATHMOV

            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="editorial-right">
          <div className="editorial-card">
            <span>01</span>
            <h3>Solo material premium</h3>
            <p>
              Productos seleccionados para deportistas que valoran la
              calidad.
            </p>
          </div>

          <div className="editorial-card">
            <span>02</span>
            <h3>Compra protegida</h3>
            <p>
              Verificación, pagos seguros y protección durante todo el
              proceso.
            </p>
          </div>

          <div className="editorial-card">
            <span>03</span>
            <h3>Comunidad deportiva</h3>
            <p>
              Pádel, golf, tenis y running reunidos en un mismo lugar.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .editorial-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 90px 60px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }

        .eyebrow {
          margin: 0 0 22px;
          color: #8d8d8d;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        h2 {
          margin: 0;
          max-width: 760px;
          font-size: clamp(52px,6vw,82px);
          line-height: .93;
          letter-spacing: -.06em;
          font-weight: 430;
          color: #111;
        }

        .description {
          margin-top: 34px;
          max-width: 620px;
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        button {
          margin-top: 42px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 0 26px;
          height: 56px;
          border-radius: 999px;
          border: 1px solid #111;
          background: #111;
          color: white;
          cursor: pointer;
          transition: .3s;
          font-size: 13px;
          font-weight: 650;
        }

        button:hover {
          background: white;
          color: #111;
        }

        button svg{
          width:17px;
          height:17px;
          fill:none;
          stroke:currentColor;
          stroke-width:1.7;
          stroke-linecap:round;
          stroke-linejoin:round;
        }

        .editorial-right{
          display:flex;
          flex-direction:column;
          gap:22px;
        }

        .editorial-card{
          padding:34px;
          border-radius:28px;
          background:white;
          border:1px solid rgba(0,0,0,.06);
          box-shadow:
            0 1px 2px rgba(0,0,0,.02),
            0 18px 50px rgba(0,0,0,.05);
          transition:.35s;
        }

        .editorial-card:hover{
          transform:translateY(-6px);
          box-shadow:
            0 2px 6px rgba(0,0,0,.03),
            0 25px 70px rgba(0,0,0,.09);
        }

        .editorial-card span{
          color:#999;
          font-size:12px;
          letter-spacing:.18em;
        }

        .editorial-card h3{
          margin:18px 0 14px;
          font-size:28px;
          font-weight:500;
          letter-spacing:-.03em;
          color:#111;
        }

        .editorial-card p{
          margin:0;
          color:#666;
          line-height:1.7;
          font-size:15px;
        }

        .mobile{
          padding:55px 22px;
          grid-template-columns:1fr;
          gap:42px;
        }

        .mobile h2{
          font-size:44px;
          line-height:1;
        }

        .mobile .description{
          font-size:16px;
        }

        .mobile .editorial-card{
          padding:26px;
        }
      `}</style>
    </>
  );
}