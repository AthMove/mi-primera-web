import type { Metadata } from "next";
import BuyerProtectionClient from "@/components/buyer-protection/BuyerProtectionClient";

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

<BuyerProtectionClient />
    </main>
  );
}