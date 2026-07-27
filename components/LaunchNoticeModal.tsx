"use client";

interface LaunchNoticeModalProps {
  type: "buy" | "sell";
  onClose: () => void;
  onContinue?: () => void;
}

export default function LaunchNoticeModal({
  type,
  onClose,
  onContinue,
}: LaunchNoticeModalProps) {
  const isBuy = type === "buy";

  return (
    <div
      className="launch-modal-overlay"
      onClick={onClose}
    >
      <div
        className="launch-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="launch-modal-close"
          onClick={onClose}
          aria-label="Cerrar aviso"
        >
          ×
        </button>

        <p className="launch-modal-eyebrow">
          ATHMOV · LANZAMIENTO
        </p>

        <h2 className="launch-modal-title">
          {isBuy
            ? "Las compras estarán disponibles muy pronto"
            : "Ya puedes preparar tus productos para el lanzamiento"}
        </h2>

        <p className="launch-modal-description">
          {isBuy
            ? "Estamos terminando de preparar ATHMOV para ofrecerte pagos seguros, protección al comprador y vendedores verificados."
            : "ATHMOV se encuentra en fase de lanzamiento. Ya puedes crear tu cuenta y publicar tus productos de forma gratuita para que estén preparados desde el primer día."}
        </p>

        <div className="launch-modal-highlight">
          <span className="launch-modal-dot" />

          <p>
            Lanzamiento previsto en las próximas
            semanas.
          </p>
        </div>

        <div className="launch-modal-actions">
          {!isBuy && onContinue && (
            <button
              type="button"
              className="launch-modal-primary"
              onClick={onContinue}
            >
              Subir un producto
            </button>
          )}

          <button
            type="button"
            className={
              isBuy
                ? "launch-modal-primary"
                : "launch-modal-secondary"
            }
            onClick={onClose}
          >
            {isBuy
              ? "Seguir explorando"
              : "Más tarde"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .launch-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(8, 8, 8, 0.68);
          backdrop-filter: blur(10px);
          animation: overlayIn 0.25s ease;
        }

        .launch-modal {
          position: relative;
          width: 100%;
          max-width: 540px;
          padding: 46px;
          overflow: hidden;
          background: #f8f8f4;
          border: 1px solid
            rgba(255, 255, 255, 0.24);
          border-radius: 34px;
          box-shadow: 0 40px 120px
            rgba(0, 0, 0, 0.35);
          animation: modalIn 0.3s ease;
        }

        .launch-modal::before {
          position: absolute;
          top: 0;
          left: 46px;
          width: 54px;
          height: 3px;
          background: #111;
          content: "";
        }

        .launch-modal-close {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 38px;
          height: 38px;
          padding: 0;
          font-size: 27px;
          font-weight: 300;
          line-height: 1;
          color: #111;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 999px;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .launch-modal-close:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: rotate(4deg);
        }

        .launch-modal-eyebrow {
          margin: 0 0 18px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          color: rgba(0, 0, 0, 0.45);
        }

        .launch-modal-title {
          max-width: 440px;
          margin: 0;
          font-size: clamp(31px, 5vw, 44px);
          line-height: 0.98;
          letter-spacing: -2.3px;
          color: #111;
        }

        .launch-modal-description {
          margin: 24px 0 0;
          font-size: 16px;
          line-height: 1.7;
          color: #5b5b5b;
        }

        .launch-modal-highlight {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 15px 17px;
          margin-top: 25px;
          background: #fff;
          border: 1px solid
            rgba(0, 0, 0, 0.06);
          border-radius: 16px;
        }

        .launch-modal-highlight p {
          margin: 0;
          font-size: 13px;
          font-weight: 800;
          color: #222;
        }

        .launch-modal-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          background: #111;
          border-radius: 999px;
          box-shadow: 0 0 0 5px
            rgba(0, 0, 0, 0.07);
        }

        .launch-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .launch-modal-primary,
        .launch-modal-secondary {
          min-height: 52px;
          padding: 14px 22px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          border-radius: 999px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .launch-modal-primary {
          color: #fff;
          background: #111;
          border: 1px solid #111;
        }

        .launch-modal-secondary {
          color: #111;
          background: transparent;
          border: 1px solid
            rgba(0, 0, 0, 0.14);
        }

        .launch-modal-primary:hover,
        .launch-modal-secondary:hover {
          transform: translateY(-2px);
        }

        .launch-modal-primary:hover {
          box-shadow: 0 14px 30px
            rgba(0, 0, 0, 0.18);
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(18px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0)
              scale(1);
          }
        }

        @media (max-width: 600px) {
          .launch-modal {
            padding: 38px 24px 26px;
            border-radius: 28px;
          }

          .launch-modal::before {
            left: 24px;
          }

          .launch-modal-actions {
            flex-direction: column;
          }

          .launch-modal-primary,
          .launch-modal-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}