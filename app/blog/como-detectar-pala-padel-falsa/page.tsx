import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Cómo detectar una pala de pádel falsa · ATHMOV",
  description:
    "Guía completa para verificar la autenticidad de una pala de pádel antes de comprarla de segunda mano. Serial, peso, serigrafía y más.",
  openGraph: {
    title: "Cómo detectar una pala de pádel falsa",
    description:
      "Todo lo que necesitas comprobar antes de comprar una pala de segunda mano.",
    siteName: "ATHMOV",
    type: "article",
    images: ["/padel.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cómo detectar una pala de pádel falsa",
    description:
      "Todo lo que necesitas comprobar antes de comprar una pala de segunda mano.",
  images: ["/padel.jpg"],
},
};

export default function ComoDetectarPalaFalsa() {
  return (
    <>
      <ArticleSEO
        title="Cómo detectar una pala de pádel falsa"
        description="Guía completa para verificar la autenticidad de una pala de pádel antes de comprarla de segunda mano."
        image="/padel.jpg"
        url="/blog/como-detectar-pala-padel-falsa"
        category="padel"
      />

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ── RESET ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── TOKENS ── */
        :root {
          --ink:       #0f0e0c;
          --white:     #ffffff;
          --parchment: #f5f3ee;
          --field:     #2d3a28;
          --field-lt:  #4a6040;
          --dust:      #c8b490;
          --dust-lt:   #e8dcca;
          --mid:       #7a7870;
          --rule:      rgba(0,0,0,0.10);
        }

        /* ── PAGE WRAPPER ── */
        .athmov-blog {
  font-family: 'Inter', sans-serif;
          background: var(--parchment);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        /* ── BREADCRUMB ── */
        .breadcrumb {
          background: var(--ink);
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .breadcrumb-inner {
          max-width: 780px; margin: 0 auto; padding: 0 28px;
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.35); text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: rgba(255,255,255,0.7); }
        .breadcrumb-sep { color: rgba(255,255,255,0.18); }
        .breadcrumb-current { color: var(--dust); }
        .breadcrumb-logo {
          font-size: 11px; font-weight: 800; letter-spacing: 5px;
          color: var(--white); margin-right: auto;
        }
        .breadcrumb-logo span { opacity: 0.3; }

        /* ── HERO ── */
        .hero {
          background: var(--ink);
          padding: 72px 0 60px;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 60% at 90% 15%, rgba(74,96,64,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 8% 90%,  rgba(200,180,144,0.10) 0%, transparent 60%);
        }
        .hero-watermark {
          position: absolute; right: -30px; top: 50%;
          transform: translateY(-50%);
          font-family: 'Inter', sans-serif; font-style: italic;
          font-size: 260px; line-height: 1;
          color: rgba(255,255,255,0.025);
          user-select: none; pointer-events: none;
          letter-spacing: -6px;
        }
        .hero-inner {
          max-width: 780px; margin: 0 auto; padding: 0 28px;
          position: relative; z-index: 2;
        }
        .hero-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; color: var(--dust);
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .hero-eyebrow::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .hero h1 {
          font-family: 'Instrument Serif', serif; font-weight: 400;
          font-size: clamp(38px, 6vw, 58px);
          line-height: 1.08; letter-spacing: -1px;
          color: var(--white); margin-bottom: 22px;
        }
        .hero h1 em { font-style: italic; color: var(--dust); }
        .hero-lead {
          font-size: 16px; font-weight: 300; line-height: 1.75;
          color: rgba(255,255,255,0.52); max-width: 560px;
          margin-bottom: 32px;
        }
        .hero-meta {
          display: flex; gap: 28px; flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .meta-item .meta-label {
          font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          margin-bottom: 4px;
        }
        .meta-item .meta-val {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.65);
        }

        /* ── ARTICLE ── */
        .article-wrap {
          max-width: 780px; margin: 0 auto;
          padding: 60px 28px 100px;
        }

        /* Opening pull */
        .opening {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 22px; line-height: 1.6; color: var(--ink);
          margin-bottom: 44px; padding-bottom: 36px;
          border-bottom: 1px solid var(--rule);
        }

        /* Body copy */
        .article-wrap p {
          font-size: 16px; line-height: 1.85;
          color: #3a3830; margin-bottom: 22px;
        }
        .article-wrap p strong { color: var(--ink); font-weight: 700; }
        .article-wrap p:last-of-type { margin-bottom: 0; }

        /* Section headings */
        .section-block { margin-top: 60px; }
        .section-eyebrow {
          font-size: 9px; font-weight: 800; letter-spacing: 3.5px;
          text-transform: uppercase; color: var(--field-lt);
          display: block; margin-bottom: 10px;
        }
        .section-block h2 {
          font-family: 'Instrument Serif', serif; font-weight: 400;
          font-size: clamp(28px, 4vw, 38px);
          line-height: 1.12; letter-spacing: -0.5px;
          color: var(--ink); margin-bottom: 18px;
        }
        .section-block h2 em { font-style: italic; color: var(--field-lt); }

        /* ── VERIFICATION STEPS ── */
        .steps { display: flex; flex-direction: column; gap: 12px; margin: 28px 0 36px; }
        .step {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 0;
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
          background: var(--white);
          transition: box-shadow 0.2s;
        }
        .step:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .step-num {
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Instrument Serif', serif; font-size: 26px;
          font-weight: 400; color: rgba(255,255,255,0.22);
          flex-shrink: 0;
        }
        .step-body { padding: 18px 20px; }
        .step-body h3 {
          font-size: 14px; font-weight: 800;
          color: var(--ink); margin-bottom: 5px;
          letter-spacing: 0.1px;
        }
        .step-body p {
          font-size: 13px; line-height: 1.65;
          color: var(--mid); margin-bottom: 0;
        }
        .step-badge {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 8px;
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 4px 10px;
          border-radius: 6px; border: 1px solid rgba(0,0,0,0.08);
          color: var(--field-lt);
        }

        /* ── WARNING MARKS TABLE ── */
        .marks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 28px 0 36px; }
        @media (max-width: 560px) { .marks-grid { grid-template-columns: 1fr; } }
        .mark-card {
          border-radius: 12px; padding: 18px;
          border: 1px solid;
        }
        .mark-card.red {
          background: rgba(180,50,40,0.04);
          border-color: rgba(180,50,40,0.14);
        }
        .mark-card.green {
          background: rgba(45,58,40,0.04);
          border-color: rgba(45,58,40,0.14);
        }
        .mark-card .mc-icon { font-size: 20px; margin-bottom: 8px; }
        .mark-card h4 { font-size: 13px; font-weight: 800; margin-bottom: 5px; }
        .mark-card.red h4 { color: #8b1f18; }
        .mark-card.green h4 { color: var(--field); }
        .mark-card p { font-size: 12px; line-height: 1.6; color: var(--mid); margin-bottom: 0; }

        /* ── PULL QUOTE ── */
        .pull-quote {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: clamp(20px, 3.5vw, 26px); line-height: 1.45;
          color: var(--ink); text-align: center;
          padding: 40px 16px; margin: 44px 0;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
        }
        .pull-quote em { font-style: normal; color: var(--field-lt); }

        /* ── CALLOUT ── */
        .callout {
          border-radius: 14px; padding: 22px 24px; margin: 32px 0;
          display: flex; gap: 16px; align-items: flex-start;
        }
        .callout-tip {
          background: var(--dust-lt);
          border: 1px solid rgba(200,180,144,0.45);
        }
        .callout-warn {
          background: rgba(180,50,40,0.05);
          border: 1px solid rgba(180,50,40,0.16);
        }
        .callout-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .callout-content h4 {
          font-size: 13px; font-weight: 800;
          color: var(--ink); margin-bottom: 6px;
        }
        .callout-content p {
          font-size: 13px; line-height: 1.7;
          color: #4a4640; margin-bottom: 0;
        }

        /* ── BRAND WEIGHTS ── */
        .weight-table {
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--rule);
          margin: 28px 0 36px;
        }
        .wt-head {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          background: var(--ink); padding: 12px 20px;
          font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .wt-row {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          padding: 14px 20px; background: var(--white);
          border-top: 1px solid var(--rule);
          font-size: 13px;
          transition: background 0.15s;
        }
        .wt-row:hover { background: var(--parchment); }
        .wt-brand { font-weight: 700; color: var(--ink); }
        .wt-model { color: var(--mid); }
        .wt-weight { font-weight: 700; color: var(--field-lt); font-variant-numeric: tabular-nums; }

        /* ── CTA ── */
        .cta-section {
          background: var(--ink); border-radius: 16px;
          padding: 40px 36px; margin-top: 56px;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 50% at 85% 25%, rgba(74,96,64,0.25) 0%, transparent 60%);
        }
        .cta-inner { position: relative; z-index: 2; }
        .cta-eyebrow {
          font-size: 9px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: var(--dust);
          margin-bottom: 12px; display: block;
        }
        .cta-section h3 {
          font-family: 'Instrument Serif', serif; font-weight: 400;
          font-size: clamp(26px, 4vw, 36px);
          line-height: 1.12; color: var(--white);
          letter-spacing: -0.5px; margin-bottom: 12px;
        }
        .cta-section h3 em { font-style: italic; color: var(--dust); }
        .cta-section > .cta-inner > p {
          font-size: 14px; font-weight: 300; line-height: 1.7;
          color: rgba(255,255,255,0.48); max-width: 440px;
          margin-bottom: 24px;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--white); color: var(--ink);
          font-size: 11px; font-weight: 800; letter-spacing: 2.5px;
          text-transform: uppercase; padding: 14px 28px;
          border-radius: 100px; text-decoration: none;
          transition: opacity 0.2s;
        }
        .cta-btn:hover { opacity: 0.88; }

        /* ── RELATED ── */
        .related { margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--rule); }
        .related-label {
          font-size: 9px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: var(--mid);
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
        }
        .related-label::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
        .related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (max-width: 520px) { .related-grid { grid-template-columns: 1fr; } }
        .related-card {
          border: 1px solid var(--rule); border-radius: 12px;
          padding: 20px; background: var(--white);
          text-decoration: none;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .related-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .rc-sport {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--dust);
          margin-bottom: 8px; display: block;
        }
        .rc-title {
          font-family: 'Instrument Serif', serif; font-size: 20px;
          font-weight: 400; color: var(--ink); line-height: 1.2;
          margin-bottom: 6px;
        }
        .rc-desc { font-size: 12px; color: var(--mid); line-height: 1.5; }

        /* ── FOOTER ── */
        .blog-footer {
          background: var(--ink); padding: 28px 0;
          margin-top: 0;
        }
        .footer-inner {
          max-width: 780px; margin: 0 auto; padding: 0 28px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-logo-text {
          font-size: 12px; font-weight: 800; letter-spacing: 5px;
          text-transform: uppercase; color: var(--white);
        }
        .footer-logo-text span { opacity: 0.3; }
        .footer-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .footer-tag {
          font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px; padding: 5px 12px;
          color: rgba(255,255,255,0.35);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .hero { padding: 52px 0 44px; }
          .hero-watermark { font-size: 160px; }
          .hero-meta { gap: 16px 24px; }
          .article-wrap { padding: 44px 20px 80px; }
          .cta-section { padding: 30px 22px; }
          .wt-head, .wt-row { grid-template-columns: 1fr 1fr; }
          .wt-model { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .step, .related-card, .cta-btn { transition: none; }
        }
      `}</style>

      <div className="athmov-blog">

        {/* ── BREADCRUMB ── */}
        <nav className="breadcrumb" aria-label="Navegación">
          <div className="breadcrumb-inner">
            <span className="breadcrumb-logo">ATH<span>MOV</span></span>
            <a href="/blog">Blog</a>
            <span className="breadcrumb-sep">·</span>
            <span className="breadcrumb-current">Pádel</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header className="hero">
          <div className="hero-watermark" aria-hidden="true">pala</div>
          <div className="hero-inner">
            <p className="hero-eyebrow">Guía de verificación · Pádel</p>
            <h1>
              Cómo detectar<br />
              una pala de pádel<br />
              <em>falsa</em>
            </h1>
            <p className="hero-lead">
              El mercado de segunda mano de pádel está lleno de réplicas que se hacen pasar por originales. Esta guía te enseña a verificar una pala en menos de 10 minutos, antes de pagar.
            </p>
            <div className="hero-meta">
              <div className="meta-item">
                <div className="meta-label">Lectura</div>
                <div className="meta-val">7 minutos</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Dificultad</div>
                <div className="meta-val">Fácil</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Para</div>
                <div className="meta-val">Compradores de segunda mano</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── ARTICLE ── */}
        <main className="article-wrap">

          <p className="opening">
            Una pala de pádel falsa puede costar entre 30 y 80 euros de fabricación y venderse por 250. El comprador que no sabe qué mirar no nota la diferencia hasta que la tiene en la mano y ya ha pagado. Esta guía existe para que eso no te pase a ti.
          </p>

          {/* SECTION 1 */}
          <div className="section-block">
            <span className="section-eyebrow">Lo primero</span>
            <h2>Antes de ver la pala en persona,<br /><em>pide estos tres datos</em></h2>
            <p>
              Si compras de segunda mano — especialmente online — tienes todo el derecho de pedir información antes de desplazarte o de pagar. Un vendedor de buena fe siempre puede facilitar esto. Uno que no puede o no quiere, ya te está diciendo algo.
            </p>

            <div className="callout callout-tip">
              <span className="callout-icon">📋</span>
              <div className="callout-content">
                <h4>Pide siempre antes de quedar</h4>
                <p>Número de serie visible en foto o vídeo, ticket o factura de compra original y, si la pala lleva QR, una foto del código escaneado con la web del fabricante abierta en pantalla. Si el vendedor tarda más de un día en enviarlo, algo no cuadra.</p>
              </div>
            </div>

            <p>
              El número de serie es lo más importante. <strong>Las réplicas no tienen serial válido</strong> — o tienen uno genérico que no existe en la base de datos del fabricante. Antes de quedar, comprueba ese número en la web oficial de la marca.
            </p>
          </div>

          {/* SECTION 2 */}
          <div className="section-block">
            <span className="section-eyebrow">Los 5 pasos</span>
            <h2>Qué comprobar cuando<br /><em>tienes la pala en la mano</em></h2>
            <p>
              Si la primera barrera (serial y ticket) la ha pasado, ahora toca la revisión física. Son cinco comprobaciones que puedes hacer en menos de diez minutos con tus propias manos y sin ningún equipo especializado.
            </p>

            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h3>Localiza y verifica el número de serie</h3>
                  <p>
                    Está grabado en el marco, normalmente en la parte inferior o en el lateral del canto. Escríbelo o fotografíalo y búscalo en la web oficial del fabricante. Si no aparece, es falsa. Si el grabado es superficial o poco nítido, también es señal de réplica.
                  </p>
                  <span className="step-badge">🔢 Serial en el marco</span>
                </div>
              </div>

              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h3>Pesa la pala en una báscula</h3>
                  <p>
                    Las réplicas suelen pesar más o menos de lo especificado — y el balance suele ser incorrecto. Cada modelo tiene un rango de peso oficial publicado. Una báscula de cocina es suficiente. Si pesa más de 5 gramos por encima del rango oficial, alerta.
                  </p>
                  <span className="step-badge">⚖️ Tabla de pesos más abajo</span>
                </div>
              </div>

              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h3>Compara la serigrafía con el catálogo oficial</h3>
                  <p>
                    Abre la web de la marca en el móvil y pon la pala al lado de la foto oficial. Fíjate en los colores exactos, el grosor de los logos, la tipografía y la posición de cada elemento. Las réplicas tienen tonos ligeramente distintos y bordes del logo menos nítidos.
                  </p>
                  <span className="step-badge">🎨 Catálogo vs realidad</span>
                </div>
              </div>

              <div className="step">
                <div className="step-num">4</div>
                <div className="step-body">
                  <h3>Revisa el acabado de los bordes y el canto</h3>
                  <p>
                    Pasa el dedo por todo el perímetro del canto. Un original tiene un acabado uniforme, sin rebabas ni irregularidades. Las réplicas suelen tener el plástico del canto mal sellado, con pequeñas rebabas o cambios de textura donde se une con el marco.
                  </p>
                  <span className="step-badge">🔍 Tacto y uniformidad</span>
                </div>
              </div>

              <div className="step">
                <div className="step-num">5</div>
                <div className="step-body">
                  <h3>Escanea el QR si lo tiene</h3>
                  <p>
                    Las marcas premium han incorporado QR en sus modelos más recientes. Si la pala lo tiene, escanearlo debe llevarte a una página de verificación oficial de la marca. Si el QR no escanea, lleva a una web genérica o da error, no es original.
                  </p>
                  <span className="step-badge">📱 QR oficial de la marca</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3 - WEIGHT TABLE */}
          <div className="section-block">
            <span className="section-eyebrow">Referencia rápida</span>
            <h2>Pesos oficiales de los<br /><em>modelos más vendidos</em></h2>
            <p>
              Estos son los rangos de peso publicados por los fabricantes para sus modelos de referencia. Si la pala que tienes en la mano cae fuera de estos rangos, algo no cuadra.
            </p>

            <div className="weight-table">
              <div className="wt-head">
                <span>Marca</span>
                <span>Modelo</span>
                <span>Peso oficial</span>
              </div>
              <div className="wt-row">
                <span className="wt-brand">Bullpadel</span>
                <span className="wt-model">Hack 03</span>
                <span className="wt-weight">355–375 g</span>
              </div>
              <div className="wt-row">
                <span className="wt-brand">Nox</span>
                <span className="wt-model">AT10 Luxury Genius</span>
                <span className="wt-weight">360–380 g</span>
              </div>
              <div className="wt-row">
                <span className="wt-brand">Babolat</span>
                <span className="wt-model">Juan Lebrón</span>
                <span className="wt-weight">355–375 g</span>
              </div>
              <div className="wt-row">
                <span className="wt-brand">Head</span>
                <span className="wt-model">Delta Pro</span>
                <span className="wt-weight">360–380 g</span>
              </div>
              <div className="wt-row">
                <span className="wt-brand">Adidas</span>
                <span className="wt-model">Adipower Multiweight</span>
                <span className="wt-weight">355–390 g</span>
              </div>
            </div>

            <div className="callout callout-warn">
              <span className="callout-icon">⚠️</span>
              <div className="callout-content">
                <h4>Fuera de rango no significa necesariamente falsa</h4>
                <p>Algunos modelos tienen variantes de peso o versiones limitadas con especificaciones distintas. Si el peso no cuadra, contrasta con las especificaciones exactas del modelo y año en la web oficial antes de rechazarla.</p>
              </div>
            </div>
          </div>

          {/* PULL QUOTE */}
          <blockquote className="pull-quote">
            "Un vendedor que tarda más de un día en mandarte el serial
            ya te está diciendo lo que necesitas saber."
          </blockquote>

          {/* SECTION 4 - RED FLAGS */}
          <div className="section-block">
            <span className="section-eyebrow">Señales de alerta</span>
            <h2>Lo que ves en un original<br />vs <em>lo que ves en una réplica</em></h2>
            <p>
              Más allá de los pasos técnicos, hay señales que puedes detectar a simple vista. Aquí tienes las más comunes, comparando qué esperar en cada caso.
            </p>

            <div className="marks-grid">
              <div className="mark-card green">
                <div className="mc-icon">✔</div>
                <h4>Original</h4>
                <p>Serial grabado con profundidad uniforme. Logo nítido con bordes definidos. Color exacto al catálogo. Canto sin rebabas. Cuerdas con tensión consistente en toda la superficie.</p>
              </div>
              <div className="mark-card red">
                <div className="mc-icon">✕</div>
                <h4>Réplica</h4>
                <p>Serial superficial o ausente. Logo con bordes difusos o color ligeramente diferente. Canto con plástico mal sellado. Cuerdas con tensión irregular. Peso fuera de especificaciones.</p>
              </div>
              <div className="mark-card green">
                <div className="mc-icon">✔</div>
                <h4>Precio coherente</h4>
                <p>Una pala de 350 € nueva se vende usada entre 150 y 220 €, dependiendo del estado y del tiempo de uso. Precio dentro de ese rango con ticket y serial = buena señal.</p>
              </div>
              <div className="mark-card red">
                <div className="mc-icon">✕</div>
                <h4>Precio sospechoso</h4>
                <p>Precio muy por debajo del mercado de segunda mano habitual es la señal más clara de réplica. Si algo parece demasiado bueno para ser verdad en pádel, lo es.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-section">
            <div className="cta-inner">
              <span className="cta-eyebrow">ATHMOV · Pádel verificado</span>
              <h3>
                En ATHMOV cada pala<br />
                pasa por <em>este proceso</em>
              </h3>
              <p>
                Antes de publicarse en la plataforma, verificamos autenticidad y estado de cada artículo. Compras con la misma confianza que si fuera nuevo.
              </p>
          <a href="/products?category=PADEL" className="cta-btn">
  Ver palas verificadas →
</a>
            </div>
          </div>
          <RelatedArticles
  category="padel"
  currentHref="/blog/como-detectar-pala-padel-falsa"
/>

        </main>

        {/* ── FOOTER ── */}
        <footer className="blog-footer">
          <div className="footer-inner">
            <span className="footer-logo-text">ATH<span>MOV</span></span>
            <div className="footer-tags">
              <span className="footer-tag">🏓 Pádel</span>
              <span className="footer-tag">Verificación</span>
              <span className="footer-tag">Segunda mano</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
