import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://athmov.com/buyer-protection";

export const metadata: Metadata = {
  title: "Protección al comprador",
  description:
    "Descubre cómo funciona la protección al comprador de ATHMOV, los pagos seguros, el seguimiento del envío y la gestión de incidencias.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Protección al comprador | ATHMOV",
    description:
      "Compra material deportivo premium de segunda mano con mayor seguridad, seguimiento y soporte.",
    url: pageUrl,
    siteName: "ATHMOV",
    type: "website",
    locale: "es_ES",
  },
};

const buyerProtectionSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Protección al comprador",
  url: pageUrl,
  description:
    "Información sobre la protección al comprador, los pagos seguros, el envío y la gestión de incidencias en ATHMOV.",
  isPartOf: {
    "@id": "https://athmov.com/#website",
  },
  about: {
    "@id": "https://athmov.com/#organization",
  },
};

const protections = [
  {
    number: "01",
    title: "Pago seguro",
    text: "El pago se procesa a través de una pasarela segura. ATHMOV registra la operación para que exista trazabilidad durante todo el proceso de compra.",
  },
  {
    number: "02",
    title: "Seguimiento del pedido",
    text: "Cuando el vendedor prepara y envía el producto, el comprador puede consultar el estado del pedido y los datos de seguimiento disponibles.",
  },
  {
    number: "03",
    title: "Comunicación centralizada",
    text: "Las conversaciones, ofertas y detalles de la operación quedan vinculados al producto y al pedido dentro de ATHMOV.",
  },
  {
    number: "04",
    title: "Gestión de incidencias",
    text: "Si el producto no llega, llega dañado o no coincide con la descripción, el comprador puede abrir una incidencia y aportar pruebas.",
  },
];

const situations = [
  {
    title: "El producto no llega",
    text: "Revisa primero el seguimiento del transportista. Si el envío no avanza o aparece una incidencia, comunícalo desde el pedido.",
  },
  {
    title: "El producto llega dañado",
    text: "Haz fotografías claras del embalaje, del daño y del producto completo antes de utilizarlo.",
  },
  {
    title: "No coincide con la descripción",
    text: "Documenta las diferencias entre el anuncio y el producto recibido y abre una incidencia desde tu pedido.",
  },
];

const steps = [
  "Accede a tu cuenta de ATHMOV.",
  "Entra en la sección de pedidos.",
  "Selecciona la compra afectada.",
  "Pulsa la opción para informar de un problema.",
  "Explica lo ocurrido y añade fotografías o documentación.",
];

const faqItems = [
  {
    question: "¿Qué debo hacer si el paquete llega dañado?",
    answer:
      "Debes conservar el embalaje, hacer fotografías claras y comunicar la incidencia desde el pedido lo antes posible.",
  },
  {
    question: "¿Qué pruebas debo aportar?",
    answer:
      "Fotografías del embalaje, del producto completo, del daño o diferencia detectada y cualquier información relevante del transporte.",
  },
  {
    question: "¿Puedo hablar con el vendedor antes de comprar?",
    answer:
      "Sí. Puedes utilizar la mensajería de ATHMOV para resolver dudas sobre el estado, las medidas, el modelo o el envío.",
  },
  {
    question: "¿Dónde puedo consultar el estado del pedido?",
    answer:
      "Dentro de tu cuenta, en la sección de pedidos, podrás consultar el estado disponible de cada compra.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function BuyerProtectionPage() {
  return (
    <main className="buyer-protection-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buyerProtectionSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="buyer-protection-hero">
        <p className="buyer-protection-eyebrow">PROTECCIÓN AL COMPRADOR</p>

        <h1>
          Compra con más confianza.
          <br />
          Juega con tranquilidad.
        </h1>

        <p className="buyer-protection-intro">
          ATHMOV conecta a compradores y vendedores de material deportivo
          premium de segunda mano y centraliza la compra, la comunicación, el
          seguimiento y la gestión de posibles incidencias.
        </p>

        <div className="buyer-protection-actions">
          <Link href="/products" className="buyer-protection-primary">
            EXPLORAR PRODUCTOS
          </Link>

          <Link href="/how-it-works" className="buyer-protection-secondary">
            CÓMO FUNCIONA
          </Link>
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>CÓMO TE PROTEGEMOS</p>
          <h2>Más claridad durante toda la operación.</h2>
        </div>

        <div className="buyer-protection-grid">
          {protections.map((item) => (
            <article key={item.number} className="buyer-protection-card">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="buyer-protection-dark">
        <div>
          <p className="buyer-protection-dark-eyebrow">
            CUANDO ALGO NO SALE BIEN
          </p>

          <h2>
            Una incidencia debe quedar documentada desde el primer momento.
          </h2>

          <p className="buyer-protection-dark-text">
            No utilices el producto, conserva el embalaje y reúne pruebas antes
            de comunicar el problema.
          </p>
        </div>

        <div className="buyer-protection-situations">
          {situations.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>ABRIR UNA INCIDENCIA</p>
          <h2>Qué debes hacer paso a paso.</h2>
        </div>

        <div className="buyer-protection-steps">
          {steps.map((step, index) => (
            <div key={step} className="buyer-protection-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="buyer-protection-section">
        <div className="buyer-protection-heading">
          <p>PREGUNTAS FRECUENTES</p>
          <h2>Respuestas antes de comprar.</h2>
        </div>

        <div className="buyer-protection-faq">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="buyer-protection-cta">
        <p>THE GAME CONTINUES.</p>

        <h2>Encuentra tu próximo equipo en ATHMOV.</h2>

        <Link href="/products">VER MARKETPLACE</Link>
      </section>
    </main>
  );
}