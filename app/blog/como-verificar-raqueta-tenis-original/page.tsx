import type { Metadata } from "next";
import ArticleSEO from "@/components/ArticleSEO";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Cómo verificar una raqueta de tenis original | ATHMOV",
  description:
    "Guía para comprobar si una raqueta de tenis es original. Seriales, códigos de fabricante, acabados y señales de falsificación.",
  openGraph: {
    title: "Cómo verificar una raqueta de tenis original",
    description:
      "Todo lo que necesitas comprobar antes de comprar una raqueta de segunda mano.",
    siteName: "ATHMOV",
    type: "article",
    images: ["/tennis.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cómo verificar una raqueta de tenis original",
    description:
      "Todo lo que necesitas comprobar antes de comprar una raqueta de segunda mano.",
    images: ["/tennis.jpg"],
  },
};

export default function ComoDetectarPalaFalsa() {
 return (
  <>
    <ArticleSEO
      title="Cómo verificar una raqueta de tenis original"
      description="Guía para comprobar si una raqueta de tenis es original antes de comprarla de segunda mano."
      image="/tennis.jpg"
      url="/blog/como-verificar-raqueta-tenis-original"
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
  font-family: 'Inter', sans-serif;
  font-size: 64px;
  line-height: 1;
  letter-spacing: -4px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 22px;
}
        .hero h1 em {
  color: #c8b490;
  font-style: italic;
}
  .hero-lead {
  font-size: 17px;
  line-height: 1.8;
  color: rgba(255,255,255,0.58);
  max-width: 560px;
  margin-top: 26px;
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
  font-size: 24px;
  line-height: 1.65;
  color: #111;
  margin-bottom: 44px;
  padding-bottom: 34px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  font-style: normal;
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
  font-size: 42px;
  line-height: 1.08;
  letter-spacing: -2px;
  font-weight: 600;
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
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 800;
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
  font-family: 'Inter', sans-serif;
  font-size: 30px;
  line-height: 1.45;
  font-weight: 500;
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
  font-family: 'Inter', sans-serif;
  font-size: 40px;
  line-height: 1.08;
  letter-spacing: -2px;
  font-weight: 600;
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
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
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
            <span className="breadcrumb-current">
  Tenis
</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header className="hero">
         <div className="hero-watermark">
  tenis
</div>
          <div className="hero-inner">
            <p className="hero-eyebrow">
  Guía de verificación · Tenis
</p>
<h1>
  Cómo verificar una
  <br />
  raqueta de tenis
  <br />
  <em>original</em>
</h1>
            <p className="hero-lead">
  Las falsificaciones en tenis son menos comunes que en pádel,
  pero existen. Aprende a comprobar una raqueta antes de comprarla
  y evita pagar por un producto que no corresponde con el modelo original.
</p>
            <div className="hero-meta">
              <div className="meta-item">
                <div className="meta-label">Lectura</div>
                <div className="meta-val">6 minutos</div>
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
  Una buena raqueta puede durar muchos años, por eso el mercado de
  segunda mano mueve modelos premium de Wilson, Babolat, Head y Yonex.
  Antes de comprar, merece la pena dedicar unos minutos a verificar
  que la raqueta es auténtica y que sus especificaciones coinciden con
  las del fabricante.
</p>

          {/* SECTION 1 */}
          <div className="section-block">
  <span className="section-eyebrow">
    Lo primero
  </span>

  <h2>
    Dónde encontrar el
    <br />
    <em>número de serie</em>
  </h2>

  <p>
    Cada fabricante utiliza una ubicación diferente para marcar sus
    raquetas. El número de serie es la primera comprobación que debes
    realizar antes de revisar peso, balance o acabados.
  </p>

  <div className="steps">

    <div className="step">
      <div className="step-num">W</div>

      <div className="step-body">
        <h3>Wilson</h3>

        <p>
          El serial suele encontrarse en el interior del throat
          o garganta de la raqueta.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">B</div>

      <div className="step-body">
        <h3>Babolat</h3>

        <p>
          Normalmente aparece grabado en la parte interior
          del marco.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">H</div>

      <div className="step-body">
        <h3>Head</h3>

        <p>
          Puede encontrarse en la garganta y también
          en etiquetas de identificación.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">Y</div>

      <div className="step-body">
        <h3>Yonex</h3>

        <p>
          Utiliza grabados láser directamente
          sobre el marco.
        </p>
      </div>
    </div>

  </div>

  <div className="callout callout-tip">
    <span className="callout-icon">🎾</span>

    <div className="callout-content">
      <h4>Primer filtro de autenticidad</h4>

      <p>
        Si una raqueta premium no tiene número de serie visible,
        o el vendedor evita mostrarlo, es mejor seguir buscando.
      </p>
    </div>
  </div>
</div>

          {/* SECTION 2 */}
<div className="section-block">
  <span className="section-eyebrow">Los 5 puntos</span>

  <h2>
    Qué revisar cuando
    <br />
    <em>tienes la raqueta en la mano</em>
  </h2>

  <p>
    Una falsificación puede parecer convincente en fotos, pero suele fallar en
    los detalles técnicos: peso, balance, acabados y piezas pequeñas.
  </p>

  <div className="steps">
    <div className="step">
      <div className="step-num">1</div>
      <div className="step-body">
        <h3>Número de serie</h3>
        <p>
          Comprueba que está grabado de forma limpia y que coincide con el
          formato utilizado por la marca.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">2</div>
      <div className="step-body">
        <h3>Peso</h3>
        <p>
          Pesa la raqueta sin accesorios añadidos. Una diferencia importante
          respecto a la especificación oficial es una señal de alerta.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">3</div>
      <div className="step-body">
        <h3>Balance</h3>
        <p>
          Las falsificaciones suelen copiar el aspecto exterior, pero rara vez
          replican el balance real del modelo original.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">4</div>
      <div className="step-body">
        <h3>Pintura y serigrafía</h3>
        <p>
          Compara colores, tipografías y posición de logotipos con fotografías
          oficiales del fabricante.
        </p>
      </div>
    </div>

    <div className="step">
      <div className="step-num">5</div>
      <div className="step-body">
        <h3>Grommets y acabados</h3>
        <p>
          Los protectores de cordaje y los acabados del marco suelen revelar
          rápidamente una falsificación.
        </p>
      </div>
    </div>
  </div>
</div>

<blockquote className="pull-quote">
  Una raqueta falsa suele copiar el diseño.
  <br />
  <em>Una original copia también los detalles.</em>
</blockquote>

{/* SECTION 3 */}
<div className="section-block">
  <span className="section-eyebrow">Comparativa rápida</span>

  <h2>
    Original vs
    <br />
    <em>sospechosa</em>
  </h2>

  <p>
    Si dudas, compara lo que ves con una ficha oficial del fabricante. Las
    diferencias pequeñas suelen ser las más importantes.
  </p>

  <div className="marks-grid">
    <div className="mark-card green">
      <div className="mc-icon">✔</div>
      <h4>Serial grabado</h4>
      <p>Número visible, limpio y coherente con el formato de la marca.</p>
    </div>

    <div className="mark-card red">
      <div className="mc-icon">✕</div>
      <h4>Sin serial</h4>
      <p>El vendedor no lo muestra o el grabado parece superficial.</p>
    </div>

    <div className="mark-card green">
      <div className="mc-icon">✔</div>
      <h4>Peso correcto</h4>
      <p>Coincide con el rango oficial del modelo sin accesorios añadidos.</p>
    </div>

    <div className="mark-card red">
      <div className="mc-icon">✕</div>
      <h4>Variaciones altas</h4>
      <p>Diferencias grandes frente a la ficha técnica del fabricante.</p>
    </div>

    <div className="mark-card green">
      <div className="mc-icon">✔</div>
      <h4>Acabados limpios</h4>
      <p>Marco uniforme, grommets bien asentados y pintura regular.</p>
    </div>

    <div className="mark-card red">
      <div className="mc-icon">✕</div>
      <h4>Rebabas visibles</h4>
      <p>Plásticos mal colocados, pintura irregular o bordes poco limpios.</p>
    </div>
  </div>
</div>

          {/* SECTION 4 */}
<div className="section-block">
  <span className="section-eyebrow">Compras online</span>

  <h2>
    Qué pedir antes
    <br />
    <em>de pagar</em>
  </h2>

  <p>
    Comprar online no es un problema si el vendedor puede demostrar lo que vende.
    La clave es pedir pruebas claras antes de enviar dinero.
  </p>

  <div className="callout callout-tip">
    <span className="callout-icon">📦</span>

    <div className="callout-content">
      <h4>Pide siempre vídeo completo</h4>

      <p>
        Solicita un vídeo donde se vea la raqueta completa, el número de serie,
        el marco, los grommets y una foto del grip retirado si tienes dudas.
      </p>
    </div>
  </div>

  <p>
    Si el vendedor evita mostrar el número de serie, no responde a preguntas
    básicas o solo manda fotos borrosas, es mejor seguir buscando.
  </p>
</div>

{/* CTA */}
<div className="cta-section">
  <div className="cta-inner">
    <span className="cta-eyebrow">ATHMOV · TENIS</span>

    <h3>
      Compra raquetas verificadas
      <br />
      por la comunidad ATHMOV
    </h3>

    <p>
      Encuentra material de tenis de segunda mano con más información,
      fotografías y transparencia.
    </p>

    <a href="/products?category=TENIS" className="cta-btn">
      Ver raquetas →
    </a>
  </div>
</div>

<RelatedArticles
  category="tenis"
  currentHref="/blog/como-verificar-raqueta-tenis-original"
/>
        </main>

        {/* ── FOOTER ── */}
        <footer className="blog-footer">
          <div className="footer-inner">
            <span className="footer-logo-text">ATH<span>MOV</span></span>
            <div className="footer-tags">
              <span className="footer-tag">🎾 Tenis</span>
<span className="footer-tag">Verificación</span>
<span className="footer-tag">Segunda mano</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
